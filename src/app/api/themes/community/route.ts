import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getPopularThemes, publishTheme } from "@/lib/themes";
import { prisma } from "@/lib/prisma";

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

    // Ensure user exists in database
    const user = await prisma.user.upsert({
      where: {
        email: session.user.email as string,
      },
      update: {
        name: session.user.name,
      },
      create: {
        email: session.user.email as string,
        name: session.user.name,
      },
    });

    const data = await req.json();

    // Validate required fields
    const validationErrors = {
      name: !data.name?.trim(),
      colors: !data.colors || Object.keys(data.colors).length === 0,
      gradients: !data.gradients?.colors,
    };

    if (Object.values(validationErrors).some(Boolean)) {
      return NextResponse.json(
        {
          error: "Missing or invalid fields",
          details: validationErrors,
        },
        { status: 400 },
      );
    }

    const theme = await publishTheme({
      name: data.name.trim(),
      colors: data.colors,
      gradients: data.gradients,
      visibleColors: data.visibleColors || 1,
      authorId: user.id, // Use the upserted user's ID
    });

    return NextResponse.json({
      success: true,
      theme: {
        id: theme.id,
        name: theme.name,
        colors: theme.colors,
        gradients: theme.gradients,
        author: theme.author,
        visibleColors: theme.visibleColors,
      },
    });
  } catch (error) {
    console.error("Failed to publish theme:", error);

    if (error instanceof Error) {
      if (error.message.includes("Invalid author ID")) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      if (error.message.includes("Unique constraint")) {
        return NextResponse.json({ error: "Theme name already exists" }, { status: 409 });
      }
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
