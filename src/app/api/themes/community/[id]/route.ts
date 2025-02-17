import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const ADMIN_EMAIL = "dmostoller@gmail.com";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Wait for session
    const session = await getServerSession(authOptions);
    const resolvedParams = await Promise.resolve(params);
    const id = resolvedParams.id;
    // Check if user is admin
    if (!session?.user || session.user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Unauthorized - Admin access required" }, { status: 403 });
    }

    // Validate id exists
    if (!id) {
      return NextResponse.json({ error: "Theme ID is required" }, { status: 400 });
    }

    // Delete in transaction to ensure all related records are deleted
    await prisma.$transaction(async (tx) => {
      // Delete related theme colors first
      await tx.themeColor.deleteMany({
        where: { themeId: id },
      });

      // Delete related gradients
      await tx.gradient.deleteMany({
        where: { themeId: id },
      });

      // Finally delete the theme
      await tx.theme.delete({
        where: { id },
      });
    });

    return NextResponse.json({ success: true, themeId: id });
  } catch (error) {
    // Properly handle Prisma errors
    if (error instanceof Error) {
      console.error("Delete theme error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
