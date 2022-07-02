import { exec } from "node:child_process"
import util from "node:util"
import { Client } from "pg"
import { v4 } from "uuid"
import { afterAll, beforeAll } from "vitest"
import dotenvExpand, { DotenvExpandOptions } from "dotenv-expand"

const execSync = util.promisify(exec)

const prismaBinary = "./node_modules/.bin/prisma"
const SCHEMA = v4()
dotenvExpand.expand({ parsed: { DATABASE_URL: process.env.DATABASE_URL, SCHEMA: SCHEMA, JWT_SECRET: "123456" } } as DotenvExpandOptions)

async function setup() {
  await execSync(`${prismaBinary} migrate deploy`)
}

async function teardown() {
  const client = new Client({ connectionString: process.env.DATABASE_URL })

  await client.connect()
  await client.query(`DROP SCHEMA IF EXISTS "${SCHEMA}" CASCADE`)
  await client.end()
}

beforeAll(async (context) => {
  if (context?.filepath?.includes("tests/e2e")) {
    await setup()
  }
})

afterAll(async (context) => {
  if (context?.filepath?.includes("tests/e2e")) {
    await teardown()
  }
})
