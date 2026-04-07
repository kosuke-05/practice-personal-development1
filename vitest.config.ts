import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    css: false,
  },
  optimizeDeps: {
    include: [
      "@csstools/css-calc",
      "@asamuzakjp/css-color"
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  ssr: {
    noExternal: [
      "@mui/material",
      "@mui/system",
      "@emotion/react",
      "@emotion/styled",
      "@asamuzakjp/css-color",
      "@csstools/css-calc"
    ]
  }
});