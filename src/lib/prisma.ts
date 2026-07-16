// src/lib/prisma.ts
import "server-only";
import { PrismaClient } from "../generated/prisma"; 
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("❌ DATABASE_URL environment variable is completely missing.");
}

const adapter = new PrismaNeon({
  options: connectionString,
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter, // ✅ Neon driver handles routing natively now
    // ❌ REMOVED the 'datasources' block to fix the TypeScript error
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
