import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    // Try to query a simple table
    const userCount = await prisma.user.count();
    console.log("Database connection successful. User count:", userCount);
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}
