import { config } from "dotenv";
import { testDatabaseConnection } from "../lib/prisma";

// Load environment variables from .env file
config();

async function main() {
  console.log("Testing database connection...");
  const isConnected = await testDatabaseConnection();

  if (!isConnected) {
    console.error("Database connection test failed");
    process.exit(1);
  }

  console.log("Database connection test passed");
  process.exit(0);
}

main().catch((error) => {
  console.error("Test failed with error:", error);
  process.exit(1);
});
