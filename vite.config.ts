import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";
import dotenv from "dotenv";

export default () => {
  dotenv.config({ path: `./.env.test` });
  const config = defineConfig({
    plugins: [tsconfigPaths()],
    test: {
      setupFiles: ["./src/infra/database/prisma/prisma.test.environment.ts"],
      clearMocks: true,
      globals: true,
    },
  });

  return config;
};
