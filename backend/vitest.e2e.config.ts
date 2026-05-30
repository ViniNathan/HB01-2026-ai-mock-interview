import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      bun: path.resolve(__dirname, "./src/test/mocks/bun-password.ts"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.e2e.test.ts"],
    exclude: ["node_modules/**"],
    globalSetup: ["./src/test/containers/vitest.e2e.global-setup.ts"],
    setupFiles: [
      "./src/test/containers/inject-env.setup.ts",
      "./vitest.setup.ts",
      "./vitest.e2e.setup.ts",
    ],
    fileParallelism: false,
    hookTimeout: 120_000,
    testTimeout: 90_000,
  },
});
