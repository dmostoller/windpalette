import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getPopularThemes, publishTheme } from "@/lib/themes";

export async function GET() {
  const themes = await getPopularThemes();
  return NextResponse.json(themes);
}

export async function POST(req: Request) {
  console.log("Publishing theme...");
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = await req.json();
    // Validate required fields with more detail
    if (!data.name || !data.colors || !data.gradients) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          details: {
            name: !data.name,
            colors: !data.colors,
            gradients: !data.gradients,
          },
        },
        { status: 400 },
      );
    }

    const theme = await publishTheme({
      name: data.name,
      colors: data.colors,
      gradients: data.gradients,
      visibleColors: data.visibleColors || 1,
      authorId: session.user.id,
    });

    if (!theme) {
      throw new Error("Failed to create theme");
    }

    return NextResponse.json({ success: true, theme });
  } catch (error) {
    console.error("Failed to publish theme:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
