import { readdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { Client } from "pg";

const migrationsDirPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../prisma/migrations",
);

function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required for E2E tests");
  }

  return databaseUrl;
}

function getDatabaseName(databaseUrl: string): string {
  const url = new URL(databaseUrl);
  const databaseName = decodeURIComponent(url.pathname.replace(/^\//, ""));

  if (!databaseName) {
    throw new Error(`Invalid DATABASE_URL: ${databaseUrl}`);
  }

  return databaseName;
}

function getAdminDatabaseUrl(databaseUrl: string): string {
  const url = new URL(databaseUrl);
  url.pathname = "/postgres";
  url.search = "";
  return url.toString();
}

function quoteIdentifier(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

export async function initializeE2EDatabase(): Promise<void> {
  const databaseUrl = getDatabaseUrl();
  const databaseName = getDatabaseName(databaseUrl);
  const migrationSql = await readAllMigrationSql();

  const adminClient = new Client({
    connectionString: getAdminDatabaseUrl(databaseUrl),
  });
  await adminClient.connect();

  try {
    const existingDatabase = await adminClient.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [databaseName],
    );

    if (existingDatabase.rowCount === 0) {
      await adminClient.query(
        `CREATE DATABASE ${quoteIdentifier(databaseName)}`,
      );
    }
  } finally {
    await adminClient.end();
  }

  const databaseClient = new Client({
    connectionString: databaseUrl,
  });
  await databaseClient.connect();

  try {
    await databaseClient.query('DROP SCHEMA IF EXISTS "public" CASCADE;');
    await databaseClient.query('CREATE SCHEMA "public";');
    await databaseClient.query(migrationSql);
  } finally {
    await databaseClient.end();
  }
}

export async function truncateE2ETables(): Promise<void> {
  const databaseClient = new Client({
    connectionString: getDatabaseUrl(),
  });
  await databaseClient.connect();

  try {
    await databaseClient.query(
      'TRUNCATE TABLE "review_items", "interview_messages", "interview_sessions", "resumes", "refresh_tokens", "users" RESTART IDENTITY CASCADE;',
    );
  } finally {
    await databaseClient.end();
  }
}

async function readAllMigrationSql(): Promise<string> {
  const entries = await readdir(migrationsDirPath, { withFileTypes: true });
  const directories = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const sqlParts = await Promise.all(
    directories.map((directory) =>
      readFile(resolve(migrationsDirPath, directory, "migration.sql"), "utf8"),
    ),
  );

  return sqlParts.join("\n\n");
}
