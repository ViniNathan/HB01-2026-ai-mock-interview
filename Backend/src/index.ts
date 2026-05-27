import "@/config/env";

import { env } from "@/config/env";

import { createApp } from "@/config/app";
import { setup as setupCheckpointer } from "@/infrastructure/ai/checkpoint/postgres-checkpointer";

async function main(): Promise<void> {
  await setupCheckpointer();
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
