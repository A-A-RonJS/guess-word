import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    env: {
      SUPABASE_URL: "http://127.0.0.1:54321",
      SUPABASE_SECRET: "test-secret",
    },
    coverage: {
      include: ["src/**/*.ts"],
      exclude: ["src/resources/**", "src/types/**", "src/index.ts"],
      reporter: ["text", "html"],
    },
  },
});
