import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { redis } from "../lib/redis";
import { startOfDay } from "date-fns";

type StatsData = Prisma.StatsCreateInput;
type DailyStatsData = Prisma.DailyStatsCreateInput;

async function migrateStats() {
  try {
    console.log("Starting stats migration...");

    // Get all user:*:themes sorted sets from Redis
    const userKeys = await redis.keys("user:*:themes");
    console.log(`Found ${userKeys.length} user theme keys`);

    // Count total saved themes
    let totalSavedThemes = 0;
    for (const userKey of userKeys) {
      try {
        // Get all theme IDs for this user using zrange
        const themeIds = await redis.zrange(userKey, 0, -1);
        totalSavedThemes += themeIds.length;
        console.log(`User ${userKey}: ${themeIds.length} themes`);
      } catch (error) {
        console.warn(`Error processing ${userKey}:`, error);
        continue;
      }
    }

    const today = startOfDay(new Date());

    // Get unique user IDs from theme keys (format: user:{userId}:themes)
    const userIds = userKeys
      .map((key) => {
        const match = key.match(/user:(.+):themes/);
        return match ? match[1] : null;
      })
      .filter((id): id is string => id !== null);

    console.log(`Found ${userIds.length} unique users`);

    // Create or update global stats
    const statsData: StatsData = {
      id: "global-stats",
      totalSavedThemes,
      lastUpdated: new Date(),
    };

    await prisma.$transaction(async (tx) => {
      console.log("Starting database transaction...");

      // Update global stats
      await tx.stats.upsert({
        where: {
          id: "global-stats",
        },
        create: statsData,
        update: {
          totalSavedThemes,
          lastUpdated: new Date(),
        },
      });

      // Create initial daily stats
      const dailyStatsData: DailyStatsData = {
        date: today,
        activeUsers: userIds.length,
        savedThemes: 0,
      };

      await tx.dailyStats.upsert({
        where: {
          date: today,
        },
        create: dailyStatsData,
        update: dailyStatsData,
      });

      // Create daily user records for existing users
      console.log("Creating daily user records...");
      for (const userId of userIds) {
        try {
          await tx.dailyUser.create({
            data: {
              userId,
              date: today,
            },
          });
          console.log(`Created daily record for user ${userId}`);
        } catch (error) {
          if (error instanceof Error && error.message.includes("Unique constraint")) {
            console.log(`User ${userId} already has a daily record`);
          } else {
            console.error(`Error creating daily record for user ${userId}:`, error);
          }
        }
      }
    });

    console.log("Migration completed successfully!");
    console.log({
      totalSavedThemes,
      initialActiveUsers: userIds.length,
      date: today,
    });
  } catch (error) {
    console.error("Migration failed:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}

migrateStats();
