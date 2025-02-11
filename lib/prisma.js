import { PrismaClient } from "@prisma/client";
const globalForPrisma = globalThis;
const db = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
export { db };
//this global.env.NODE_ENV ensures during hot reloads no new client is created.
