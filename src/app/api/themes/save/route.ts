import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { saveThemeToArchive } from "@/lib/themes";
// import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { themeId } = await req.json();
    if (!themeId) {
      return NextResponse.json({ error: "Theme ID is required" }, { status: 400 });
    }

    try {
      const result = await saveThemeToArchive(themeId, session.user.id);
      return NextResponse.json(result);
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(
          { error: error.message },
          { status: error.message.includes("already exists") ? 409 : 500 },
        );
      }
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 },
    );
  }
}
