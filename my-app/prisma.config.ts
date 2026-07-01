// @ts-ignore: package may not have types or be missing in some environments
import { defineConfig } from "prisma";
// @ts-ignore: package may not have types or be missing in some environments
const { PrismaMySQL } = require("@prisma/adapter-mysql");
// @ts-ignore: package may not have types or be missing in some environments
const mysql = require("mysql2/promise");

export default defineConfig({
  earlyAccess: true,
  schema: "prisma/schema.prisma",
  migrate: {
    async adapter() {
      const pool = mysql.createPool(process.env.DATABASE_URL!);
      return new PrismaMySQL(pool);
    },
  },
});