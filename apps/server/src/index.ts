import "@hackathon2026/env/server";

import { env } from "@hackathon2026/env/server";

import { createApp } from "./config/app";

async function main(): Promise<void> {
  const app = await createApp();
  const port = env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

main().catch((error: unknown) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
