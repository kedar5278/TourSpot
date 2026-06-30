import { defineConfig } from "prisma/config";
import { PrismaMySQL } from "@prisma/adapter-mysql";
import mysql from "mysql2/promise";

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