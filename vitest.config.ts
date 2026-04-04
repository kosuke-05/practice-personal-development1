import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node", // React用
    globals: true
  },
});