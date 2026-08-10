// @ts-ignore: package may not have types or be missing in some environments
import { defineConfig } from "prisma";
// @ts-ignore: package may not have types or be missing in some environments
const { PrismaNeonHTTP } = require("@prisma/adapter-neon");
// @ts-ignore: package may not have types or be missing in some environments
const { neon } = require("@neondatabase/serverless");

export default defineConfig({
  earlyAccess: true,
  schema: "prisma/schema.prisma",
  migrate: {
    async adapter() {
      const sql = neon(process.env.DATABASE_URL!);
      return new PrismaNeonHTTP(sql);
    },
  },
});
