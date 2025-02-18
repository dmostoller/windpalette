import { NextResponse } from "next/server";
import { getDailyStats } from "@/lib/stats";

export async function GET() {
  try {
    const stats = await getDailyStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
