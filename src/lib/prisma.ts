import { PrismaClient } from "@prisma/client";
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

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
