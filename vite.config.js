"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_tsconfig_paths_1 = __importDefault(require("vite-tsconfig-paths"));
const config_1 = require("vitest/config");
const dotenv_1 = __importDefault(require("dotenv"));
exports.default = () => {
    dotenv_1.default.config({ path: `./.env.test` });
    const config = (0, config_1.defineConfig)({
        plugins: [(0, vite_tsconfig_paths_1.default)()],
        test: {
            setupFiles: ["./src/infra/database/prisma/prisma.test.environment.ts"],
            clearMocks: true,
            globals: true,
        },
    });
    return config;
};
