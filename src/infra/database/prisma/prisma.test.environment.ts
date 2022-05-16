import { exec } from "node:child_process";
import util from "node:util";
import { Client } from "pg";
import { v4 } from "uuid";
import { afterAll, beforeAll } from "vitest";

const execSync = util.promisify(exec);

const prismaBinary = "./node_modules/.bin/prisma";
const SCHEMA = v4();
process.env.SCHEMA = SCHEMA;

async function setup() {
  await execSync(`${prismaBinary} migrate deploy`);
}

async function teardown() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });

  await client.connect();
  await client.query(`DROP SCHEMA IF EXISTS "${SCHEMA}" CASCADE`);
  await client.end();
}

beforeAll(async () => {
  if (process.env.MODE !== "unit") {
    await setup();
  }
});

afterAll(async () => {
  if (process.env.MODE !== "unit") {
    await teardown();
  }
});
