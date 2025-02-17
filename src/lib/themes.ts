import { prisma } from "@/lib/prisma";
import { saveTheme, getUserThemes } from "@/lib/redis";

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
    // Validate input data
    if (!themeData.name?.trim()) {
      throw new Error("Theme name is required");
    }
    if (!themeData.colors || Object.keys(themeData.colors).length === 0) {
      throw new Error("At least one color is required");
    }
    if (!themeData.authorId) {
      throw new Error("Author ID is required");
    }

    // Check for existing published theme by this author with the same name
    const themeToSave = await prisma.theme.findFirst({
      where: {
        name: themeData.name.trim(),
        authorId: themeData.authorId,
        published: true,
      },
    });

    if (themeToSave) {
      throw new Error("You have already published a theme with this name");
    }

    // First check if user exists
    const user = await prisma.user.findUnique({
      where: { id: themeData.authorId },
      select: { id: true },
    });

    if (!user) {
      throw new Error("Invalid author ID");
    }

    // Create theme with transaction
    const theme = await prisma.$transaction(async (tx) => {
      const newTheme = await tx.theme.create({
        data: {
          name: themeData.name.trim(),
          visibleColors: themeData.visibleColors || 1,
          authorId: themeData.authorId,
          published: true,
          saveCount: 0,
          colors: {
            createMany: {
              data: Object.entries(themeData.colors).map(([name, value]) => ({
                name: name.toLowerCase(),
                value: value.toLowerCase(),
              })),
            },
          },
          gradients: {
            createMany: {
              data: (themeData.gradients?.colors || []).map((gradient) => ({
                color: gradient.color.toLowerCase(),
                active: gradient.active,
              })),
            },
          },
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
            },
          },
        },
      });

      return newTheme;
    });

    return theme;
  } catch (error) {
    console.error("Error publishing theme:", {
      error,
      code: error instanceof Error ? (error as { code?: string | number }).code : undefined,
      message: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
}
interface RedisThemePayload {
  userId: string;
  name: string;
  colors: Record<string, string>;
  gradients: {
    colors: Array<{ color: string; active: boolean }>;
  };
  visibleColors: number;
}

export async function saveThemeToArchive(themeId: string, userId: string) {
  if (!themeId || !userId) {
    throw new Error("Theme ID and User ID are required");
  }

  try {
    const themeToSave = await prisma.theme.findUnique({
      where: { id: themeId },
      select: {
        id: true,
        name: true,
        visibleColors: true,
        colors: {
          select: {
            name: true,
            value: true,
          },
        },
        gradients: {
          select: {
            color: true,
            active: true,
          },
        },
      },
    });

    if (!themeToSave) {
      throw new Error("Theme not found");
    }

    // Check if theme with same name exists in user's Redis archive
    const userThemes = await getUserThemes(userId);
    const hasThemeInRedis = userThemes?.some(
      (theme) => theme.name.toLowerCase() === themeToSave.name.toLowerCase(),
    );

    // Check if theme with same name exists in user's Prisma archive
    const existingUserTheme = await prisma.theme.findFirst({
      where: {
        name: themeToSave.name,
        authorId: userId,
        published: false, // Only check unpublished themes in their archive
      },
    });

    if (hasThemeInRedis || existingUserTheme) {
      throw new Error("A theme with this name already exists in your archive");
    }

    // Update theme save count
    const updatedTheme = await prisma.theme.update({
      where: { id: themeId },
      data: {
        saveCount: { increment: 1 },
      },
      select: {
        id: true,
        name: true,
        saveCount: true,
      },
    });

    // Prepare and save to Redis
    const redisPayload: RedisThemePayload = {
      userId,
      name: themeToSave.name,
      colors: themeToSave.colors.reduce(
        (acc, color) => ({
          ...acc,
          [color.name]: color.value,
        }),
        {} as Record<string, string>,
      ),
      gradients: {
        colors: themeToSave.gradients.map((g) => ({
          color: g.color,
          active: g.active,
        })),
      },
      visibleColors: themeToSave.visibleColors,
    };

    console.log("Saving theme to Redis:", redisPayload);
    const redisResult = await saveTheme(redisPayload);

    return {
      theme: updatedTheme,
      redis: redisResult,
    };
  } catch (error) {
    console.error("Error saving theme:", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
}
