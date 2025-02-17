import { prisma } from "@/lib/prisma";
import { saveTheme } from "@/lib/redis";

export async function getPopularThemes() {
  try {
    const themes = await prisma.theme.findMany({
      where: {
        published: true,
      },
      orderBy: {
        saveCount: "desc",
      },
      include: {
        colors: {
          select: {
            id: true,
            name: true,
            value: true,
          },
        },
        gradients: {
          select: {
            id: true,
            color: true,
            active: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        saves: {
          select: {
            id: true,
            userId: true,
            createdAt: true,
          },
        },
        _count: {
          select: {
            saves: true,
          },
        },
      },
    });

    console.log("Fetched themes:", JSON.stringify(themes, null, 2));
    return themes;
  } catch (error) {
    console.error("Error fetching popular themes:", error);
    return [];
  }
}
interface PublishThemeParams {
  name: string;
  colors: Record<string, string>;
  gradients: {
    colors: Array<{ color: string; active: boolean }>;
  };
  visibleColors: number;
  authorId: string;
}

export async function publishTheme(themeData: PublishThemeParams) {
  try {
    if (!themeData.colors) {
      console.error("themeData.colors is null or undefined");
      return null;
    }

    const theme = await prisma.theme.create({
      data: {
        name: themeData.name,
        visibleColors: themeData.visibleColors,
        authorId: themeData.authorId,
        published: true,
        colors: {
          createMany: {
            data: Object.entries(themeData.colors).map(([name, value]) => ({
              name,
              value,
            })),
          },
        },
        gradients: {
          createMany: {
            data: (themeData.gradients.colors || []).map((gradient) => ({
              color: gradient.color,
              active: gradient.active,
            })),
          },
        },
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return theme;
  } catch (error) {
    console.error("Error publishing theme:", error);
    return null;
  }
}

export async function saveThemeToArchive(themeId: string, userId: string) {
  if (!themeId || !userId) {
    throw new Error("Theme ID and User ID are required");
  }

  try {
    // First check if theme exists
    const theme = await prisma.theme.findUnique({
      where: { id: themeId },
      include: {
        colors: true,
        gradients: true,
      },
    });

    if (!theme) {
      throw new Error("Theme not found");
    }

    // Use a single transaction for all DB operations
    const result = await prisma.$transaction(async (tx) => {
      // Create theme save
      const themeSave = await tx.themeSave.create({
        data: {
          userId,
          themeId,
        },
      });

      // Update theme save count
      const updatedTheme = await tx.theme.update({
        where: { id: themeId },
        data: { saveCount: { increment: 1 } },
        include: {
          colors: true,
          gradients: true,
          author: {
            select: { name: true },
          },
        },
      });

      return { themeSave, updatedTheme };
    });

    // After successful DB transaction, save to Redis
    const redisResult = await saveTheme({
      userId,
      name: theme.name,
      colors: theme.colors.reduce(
        (acc, color) => ({
          ...acc,
          [color.name]: color.value,
        }),
        {},
      ),
      gradients: {
        colors: theme.gradients.map((g) => ({
          color: g.color,
          active: g.active,
        })),
      },
    });

    return {
      ...result,
      redis: redisResult,
    };
  } catch (error) {
    console.error("Error saving theme to archive:", error);
    throw error;
  }
}
