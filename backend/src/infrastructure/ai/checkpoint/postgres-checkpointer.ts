import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";
import { Pool } from "pg";

import { env } from "@/config/env";
import { logger } from "@/shared";

let checkpointerInstance: PostgresSaver | undefined;

export function getCheckpointer(): PostgresSaver {
  if (!checkpointerInstance) {
    const pool = new Pool({ connectionString: env.DATABASE_URL });
    pool.on("error", (error) => {
      logger.error("Postgres pool error", { error: error.message });
    });
    checkpointerInstance = new PostgresSaver(pool);
  }
  return checkpointerInstance;
}

export async function setup(): Promise<void> {
  await getCheckpointer().setup();
}
