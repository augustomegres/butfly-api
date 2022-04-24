import jestConfig from "./jest.config";

export default {
  ...jestConfig,
  testEnvironment: "./src/infra/database/prisma/prisma.test.environment.ts",
};
