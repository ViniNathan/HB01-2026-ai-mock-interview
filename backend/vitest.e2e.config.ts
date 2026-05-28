import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.e2e.test.ts"],
    exclude: ["node_modules/**"],
    setupFiles: ["./vitest.setup.ts", "./vitest.e2e.setup.ts"],
    fileParallelism: false,
    hookTimeout: 90_000,
    testTimeout: 90_000,
  },
});
