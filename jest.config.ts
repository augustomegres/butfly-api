/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

const tsconfig = require("./tsconfig.json");
const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig);
export default {
  clearMocks: true,
  setupFiles: ["dotenv/config"],
  coverageProvider: "v8",
  collectCoverage: true,
  testRegex: ".test.ts$",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/server.ts",
    "!<rootDir>/src/**/*.test.environment.ts",
    "!<rootDir>/src/**/*.d.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text-summary", "lcov"],
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  moduleNameMapper,
};
