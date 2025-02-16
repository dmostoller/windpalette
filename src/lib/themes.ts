import { prisma } from "./prisma";
import { PrismaClient } from "@prisma/client";
import { CommunityTheme } from "@/types/theme";

interface PublishThemeData {
  name: string;
  colors: Record<string, string>;
  gradients: {
    colors: Array<{ color: string; active: boolean }>;
  };
  visibleColors: number;
  authorId: string;
}

export async function publishTheme(data: PublishThemeData) {
  try {
    console.log("========================");
    console.log("Starting publishTheme");
    console.log("Data:", JSON.stringify(data, null, 2));
    console.log("========================");

    if (!data.name || !data.colors || !data.gradients || !data.authorId) {
      throw new Error("Missing required fields");
    }

    // Use a regular create instead of transaction first to test
    const theme = await prisma.theme.create({
      data: {
        name: data.name,
        visibleColors: data.visibleColors,
        published: true,
        saveCount: 0,
        authorId: data.authorId,
      },
    });
    console.log("Theme created:", theme);

    // Create colors
    const colorEntries = Object.entries(data.colors).map(([name, value]) => ({
      themeId: theme.id,
      name,
      value,
    }));
    console.log("Creating colors:", colorEntries);

    await prisma.themeColor.createMany({
      data: colorEntries,
    });

    // Create gradients
    const gradientEntries = data.gradients.colors.map((g) => ({
      themeId: theme.id,
      color: g.color,
      active: g.active,
    }));
    console.log("Creating gradients:", gradientEntries);

    await prisma.gradient.createMany({
      data: gradientEntries,
    });

    // Get complete theme
    const completeTheme = await prisma.theme.findUnique({
      where: { id: theme.id },
      include: {
        colors: true,
        gradients: true,
        author: {
          select: { name: true },
        },
      },
    });

    if (!completeTheme) {
      throw new Error("Theme creation failed");
    }

    console.log("Theme creation completed successfully");
    console.log("Result:", completeTheme);
    console.log("========================");

    return completeTheme;
  } catch (error) {
    console.error("========================");
    console.error("Error in publishTheme:", error);
    console.error("Stack trace:", error instanceof Error ? error.stack : "No stack trace");
    console.error("========================");
    throw error;
  }
}

export async function saveThemeToArchive(themeId: string, userId: string) {
  interface ThemeSave {
    themeId: string;
    userId: string;
  }

  interface ThemeUpdate {
    id: string;
    saveCount: number;
  }

  const [theme, save] = await prisma.$transaction(
    async (tx: PrismaClient): Promise<[ThemeUpdate, ThemeSave]> => {
      const save = await tx.themeSave.create({
        data: {
          themeId,
          userId,
        },
      });

      const theme = await tx.theme.update({
        where: { id: themeId },
        data: { saveCount: { increment: 1 } },
      });

      return [theme, save];
    },
  );

  return { theme, save };
}

export async function getPopularThemes(limit = 20): Promise<CommunityTheme[]> {
  try {
    const themes = await prisma.theme.findMany({
      take: limit,
      orderBy: { saveCount: "desc" },
      include: {
        author: {
          select: { name: true },
        },
      },
    });

    return themes as CommunityTheme[];
  } catch (error) {
    console.error("Error fetching popular themes:", error);
    return prisma.theme.findMany({
      take: limit,
      orderBy: { saveCount: "desc" },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
  }
}
