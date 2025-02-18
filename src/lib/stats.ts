import { prisma } from "./prisma";
import { startOfDay } from "date-fns";

export async function trackDailyUser(userId: string) {
  const today = startOfDay(new Date());

  try {
    // Create daily user record
    await prisma.dailyUser.create({
      data: {
        userId,
        date: today,
      },
    });

    // Upsert daily stats for today
    await prisma.dailyStats.upsert({
      where: {
        date: today,
      },
      create: {
        date: today,
        activeUsers: 1,
        savedThemes: 0,
      },
      update: {
        activeUsers: {
          increment: 1,
        },
      },
    });
  } catch (error) {
    // If error is due to unique constraint, user already counted today
    if (!(error instanceof Error && error.message.includes("Unique constraint"))) {
      throw error;
    }
  }
}

export async function getDailyStats() {
  const today = new Date();
  const startDay = startOfDay(today);

  const [globalStats, todayStats, historicalStats] = await prisma.$transaction([
    // Get global stats
    prisma.stats.findUnique({
      where: { id: "global-stats" },
    }),
    // Get today's stats
    prisma.dailyStats.findUnique({
      where: { date: startDay },
    }),
    // Get last 30 days of stats
    prisma.dailyStats.findMany({
      where: {
        date: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
      },
      orderBy: {
        date: "desc",
      },
    }),
  ]);

  return {
    today: {
      activeUsers: todayStats?.activeUsers || 0,
      savedThemes: todayStats?.savedThemes || 0,
    },
    total: {
      savedThemes: globalStats?.totalSavedThemes || 0,
    },
    historical: historicalStats,
    lastUpdated: globalStats?.lastUpdated || today,
  };
}

export async function incrementSavedThemesCount() {
  const today = startOfDay(new Date());

  await prisma.$transaction([
    // Update global stats
    prisma.stats.update({
      where: { id: "global-stats" },
      data: {
        totalSavedThemes: { increment: 1 },
        lastUpdated: new Date(),
      },
    }),
    // Update daily stats
    prisma.dailyStats.upsert({
      where: { date: today },
      create: {
        date: today,
        savedThemes: 1,
      },
      update: {
        savedThemes: { increment: 1 },
      },
    }),
  ]);
}
