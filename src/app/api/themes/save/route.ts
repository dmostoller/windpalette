import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { saveThemeToArchive } from "@/lib/themes";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { themeId } = await req.json();
    if (!themeId) {
      return new NextResponse("Theme ID is required", { status: 400 });
    }

    const result = await saveThemeToArchive(themeId, session.user.id);
    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return new NextResponse(`Database error: ${error.message}`, { status: 400 });
    }

    return new NextResponse(error instanceof Error ? error.message : "Internal Server Error", {
      status: 500,
    });
  }
}
