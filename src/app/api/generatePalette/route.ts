import { NextResponse } from "next/server";
import OpenAI from "openai";
import NodeCache from "node-cache";
import { rateLimit } from "@/lib/rate-limit";
import { ThemeColors, ColorWithVariants } from "@/types/theme";

interface Palette {
  primary: ColorWithVariants;
  secondary: ColorWithVariants;
  accent: ColorWithVariants;
}

interface PaletteResponse {
  colors: ThemeColors;
  error?: string;
}

// Cache and OpenAI setup
const cache = new NodeCache({ stdTTL: 3600 }); // 1 hour cache
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Rate limiting and IP helper
const getIpAddress = (request: Request): string => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  return forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || "anonymous";
};

async function generatePaletteWithRetry(keywords: string, retries = 3): Promise<Palette> {
  const prompt = `Create a color palette that accurately reflects the essence of these keywords: "${keywords}".
  Consider the emotional, contextual, and stylistic implications of the keywords when selecting colors.

  The palette should:
  - Contain colors that are strongly associated with the given keywords
  - Have colors that work well together and follow color theory principles
  - Use appropriate color psychology to evoke the right mood and associations
  - Be visually appealing and balanced

  Ensure the palette follows fundamental color theory principles such as:
  - Complementary colors
  - Analogous colors
  - Triadic harmony
  - Proper contrast and accessibility
  - Visual balance and cohesion
  
  The palette should include:
  - Primary color: Main thematic color
  - Secondary color: Supporting color that complements the primary
  - Accent color: Bold contrasting color for emphasis
  
  Each color should have a base, light, and dark variant that maintains consistent harmony across the palette.
  The light and dark variants should be generated using proper color theory techniques:
  - Light variants should be created by adding white
  - Dark variants should be created by adding black
  - Ensure all variants maintain readability and sufficient contrast

Return only a JSON object in this exact format:
{
  "primary": {
    "base": "#<hex>",
    "light": "#<hex>",
    "dark": "#<hex>"
  },
  "secondary": {
    "base": "#<hex>",
    "light": "#<hex>",
    "dark": "#<hex>"
  },
  "accent": {
    "base": "#<hex>",
    "light": "#<hex>",
    "dark": "#<hex>"
  }
}
Ensure all colors are valid 6-digit hex codes.`;

  for (let i = 0; i < retries; i++) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 150,
      });

      const result = response.choices[0]?.message?.content;
      if (!result) throw new Error("Empty response from OpenAI");

      const palette = JSON.parse(result) as Palette;

      // Validate hex codes for all color variants
      const hexRegex = /^#[0-9A-Fa-f]{6}$/;
      const validateColor = (color: ColorWithVariants) => {
        return (
          hexRegex.test(color.base) && hexRegex.test(color.light || "") && hexRegex.test(color.dark || "")
        );
      };

      if (
        !validateColor(palette.primary) ||
        !validateColor(palette.secondary) ||
        !validateColor(palette.accent)
      ) {
        throw new Error("Invalid hex code in response");
      }

      return palette;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error("Max retries reached");
}

export async function POST(request: Request) {
  const ip = getIpAddress(request);

  // Rate limiting
  const { success } = await rateLimit.limit(ip);
  if (!success) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  try {
    const { keywords } = await request.json();

    if (!keywords || typeof keywords !== "string") {
      return NextResponse.json({ error: "Invalid keywords provided" }, { status: 400 });
    }

    // Check cache
    const cacheKey = `palette-${keywords}`;
    const cached = cache.get<PaletteResponse>(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    // Generate new palette
    const palette = await generatePaletteWithRetry(keywords);

    const response: PaletteResponse = { colors: palette };

    // Cache the response
    cache.set(cacheKey, response);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Palette generation error:", error);
    return NextResponse.json({ error: "Failed to generate palette" }, { status: 500 });
  }
}
