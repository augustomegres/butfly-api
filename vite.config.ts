import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default () => {
  const config = defineConfig({
    plugins: [tsconfigPaths()],
    test: {
      env: {
        DATABASE_URL: "postgresql://user:Butfly123@localhost:5401/testing?schema=${SCHEMA}",
        JWT_SECRET: '123456789'
      },
      setupFiles: ["./src/infra/database/prisma/prisma.test.environment.ts"],
      globals: true,
    },
  });

  return config;
};
