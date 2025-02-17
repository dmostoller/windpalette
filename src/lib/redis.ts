import { Redis } from "@upstash/redis";
import { Theme } from "@/types/theme";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function saveTheme({
  userId,
  name,
  colors,
  gradients,
}: {
  userId: string;
  name: string;
  colors: Record<string, string>;
  gradients?: {
    colors: Array<{ color: string; active: boolean }>;
  };
}) {
  const themeId = `theme:${Date.now()}`;
  const theme: Theme = {
    id: themeId,
    name,
    userId,
    colors,
    gradients: gradients || { colors: [] },
    createdAt: Date.now(),
  };

  await redis.hset(themeId, theme as Record<string, unknown>);
  await redis.zadd(`user:${userId}:themes`, {
    score: theme.createdAt,
    member: themeId,
  });

  return theme;
}

export async function getUserThemes(userId: string): Promise<Theme[]> {
  const themeIds = await redis.zrange(`user:${userId}:themes`, 0, -1);
  if (!themeIds.length) return [];

  const themes = await Promise.all(
    (themeIds as string[]).map((id) => redis.hgetall<Record<string, unknown>>(id)),
  );

  return themes.filter(
    (theme): theme is Theme =>
      theme !== null &&
      typeof theme === "object" &&
      "id" in theme &&
      "colors" in theme &&
      "gradients" in theme,
  ) as Theme[];
}

export async function deleteTheme(themeId: string, userId: string) {
  await redis.del(themeId);
  await redis.zrem(`user:${userId}:themes`, themeId);
}
