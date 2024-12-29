import { saveTheme, getUserThemes, deleteTheme } from "@/lib/redis";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { name, colors, gradients } = await req.json();
  await saveTheme({
    userId: session.user.id,
    name,
    colors,
    gradients: gradients || { colors: [] },
  });

  return NextResponse.json({ success: true });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const themes = await getUserThemes(session.user.id);
  return NextResponse.json(themes);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { themeId } = await req.json();
  await deleteTheme(themeId, session.user.id);
  return NextResponse.json({ success: true });
}
