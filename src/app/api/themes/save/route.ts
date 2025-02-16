import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { saveThemeToArchive } from "@/lib/themes";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { themeId } = await req.json();
  const result = await saveThemeToArchive(themeId, session.user.id);

  return NextResponse.json(result);
}
