import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserThemes } from "@/lib/redis";
import { NextResponse } from "next/server";
import { Theme } from "@/types/theme";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const themes = await getUserThemes(session.user.id);

    // Get date 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Initialize all days with zero count
    const allDays: { [key: string]: number } = {};
    for (let d = new Date(thirtyDaysAgo); d <= new Date(); d.setDate(d.getDate() + 1)) {
      const dayStr = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      allDays[dayStr] = 0;
    }

    // Process themes by day
    themes.forEach((theme) => {
      const date = new Date(theme.createdAt);
      if (date >= thirtyDaysAgo) {
        const dayStr = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        allDays[dayStr] = (allDays[dayStr] || 0) + 1;
      }
    });

    const themesPerDay = Object.entries(allDays).map(([name, count]) => ({
      name,
      count,
    }));

    const analyticsData = {
      themesPerMonth: themesPerDay,
      colorStats: Object.entries(
        themes.reduce((acc: Record<string, number>, theme) => {
          Object.values(theme.colors).forEach((color: string) => {
            acc[color] = (acc[color] || 0) + 1;
          });
          return acc;
        }, {}),
      )
        .map(([color, usage]) => ({ color, usage }))
        .sort((a, b) => b.usage - a.usage),
      exportStats: Object.entries(
        themes.reduce((acc: Record<string, number>, theme) => {
          const format = (theme as Theme & { exportFormat?: string }).exportFormat || "CSS Variables";
          acc[format] = (acc[format] || 0) + 1;
          return acc;
        }, {}),
      )
        .map(([format, count]) => ({ format, count }))
        .sort((a, b) => b.count - a.count),
    };

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error("Analytics error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
