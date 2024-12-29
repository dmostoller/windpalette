import { colord, extend, Colord } from "colord";
import harmoniesPlugin from "colord/plugins/harmonies";
import mixPlugin from "colord/plugins/mix";
import a11yPlugin from "colord/plugins/a11y";
import { ThemeColors } from "@/types/theme";
import { colorFamilies } from "@/lib/colors";

extend([harmoniesPlugin, mixPlugin, a11yPlugin]);

interface ThemePreferences {
  baseColor: "warm" | "cool" | "neutral";
  style: "natural" | "modern" | "vintage" | "bold";
  mood: "calm" | "energetic" | "professional" | "playful";
  contrast: "subtle" | "balanced" | "strong";
  colorFamily: keyof typeof colorFamilies;
}

type ColorHarmony = "analogous" | "triadic" | "complementary" | "monochromatic" | "splitComplementary";

type ColorRange = {
  hueRange?: number[];
  saturationRange?: number[];
};

const COLOR_FAMILY_RANGES: Record<keyof typeof colorFamilies, ColorRange> = {
  all: {},
  red: { hueRange: [-10, 10], saturationRange: [70, 90] },
  orange: { hueRange: [20, 40], saturationRange: [65, 85] },
  yellow: { hueRange: [45, 65], saturationRange: [70, 90] },
  green: { hueRange: [90, 150], saturationRange: [60, 80] },
  blue: { hueRange: [200, 240], saturationRange: [65, 85] },
  purple: { hueRange: [270, 310], saturationRange: [60, 80] },
  neutral: { saturationRange: [5, 15] },
};

const GOLDEN_RATIO = 0.618033988749895;
const MIN_CONTRAST = 4.5;

const PRESET_PALETTES = {
  nature: { hueRange: [80, 150], saturation: [60, 80], lightness: [45, 65] },
  ocean: { hueRange: [180, 240], saturation: [50, 70], lightness: [40, 60] },
  sunset: { hueRange: [0, 60], saturation: [70, 90], lightness: [50, 70] },
  forest: { hueRange: [90, 150], saturation: [40, 60], lightness: [30, 50] },
};

function generateBaseColor(colorFamily: keyof typeof colorFamilies = "all"): string {
  // If "all" is selected, use golden ratio for complete randomness
  if (colorFamily === "all") {
    const hue = ((Math.random() + GOLDEN_RATIO) % 1) * 360;
    const saturation = 65 + Math.random() * 20;
    const lightness = 45 + Math.random() * 15;
    return colord({ h: hue, s: saturation, l: lightness }).toHex();
  }

  const familyRange = COLOR_FAMILY_RANGES[colorFamily];
  const defaultLightness = 45 + Math.random() * 15;

  if (familyRange.hueRange) {
    const hue = familyRange.hueRange[0] + Math.random() * (familyRange.hueRange[1] - familyRange.hueRange[0]);
    const saturation = familyRange.saturationRange
      ? familyRange.saturationRange[0] +
        Math.random() * (familyRange.saturationRange[1] - familyRange.saturationRange[0])
      : 70 + Math.random() * 20;
    return colord({ h: hue, s: saturation, l: defaultLightness }).toHex();
  }

  // Handle neutral colors
  if (familyRange.saturationRange) {
    const hue = Math.random() * 360;
    const saturation =
      familyRange.saturationRange[0] +
      Math.random() * (familyRange.saturationRange[1] - familyRange.saturationRange[0]);
    return colord({ h: hue, s: saturation, l: defaultLightness }).toHex();
  }

  return colord({ h: Math.random() * 360, s: 70, l: defaultLightness }).toHex();
}

function generateHarmonies(baseColor: string, type: ColorHarmony): string[] {
  const color = colord(baseColor);

  switch (type) {
    case "monochromatic":
      return [
        color.toHex(),
        color.saturate(0.1).lighten(0.2).toHex(),
        color.saturate(0.2).darken(0.1).toHex(),
      ];
    case "complementary":
      const complement = color.rotate(180);
      return [color.toHex(), complement.toHex(), color.mix(complement, 0.5).toHex()];
    case "analogous":
      return [color.toHex(), color.rotate(30).toHex(), color.rotate(-30).toHex()];
    case "splitComplementary":
      return [color.toHex(), color.rotate(150).toHex(), color.rotate(210).toHex()];
    case "triadic":
      return [color.toHex(), color.rotate(120).toHex(), color.rotate(240).toHex()];
  }
}

function ensureGoodContrast(colors: string[]): string[] {
  return colors.map((color, i) => {
    if (i === 0) return color;
    const currentContrast = colord(colors[0]).contrast(colord(color));
    if (currentContrast < MIN_CONTRAST) {
      const adjusted = colord(color);
      return adjusted.lighten(0.2).saturate(0.1).toHex();
    }
    return color;
  });
}

function applyColorPreset(color: string, preset: keyof typeof PRESET_PALETTES): string {
  const { hueRange, saturation, lightness } = PRESET_PALETTES[preset];
  const c = colord(color);
  const hsl = c.toHsl();

  hsl.h = hueRange[0] + Math.random() * (hueRange[1] - hueRange[0]);
  hsl.s = saturation[0] + Math.random() * (saturation[1] - saturation[0]);
  hsl.l = lightness[0] + Math.random() * (lightness[1] - lightness[0]);

  return colord(hsl).toHex();
}

function adjustForPreferences(color: Colord, preferences: ThemePreferences): Colord {
  let adjusted = color;

  // Base color temperature adjustments
  if (preferences.baseColor === "warm") {
    adjusted = adjusted.rotate(15).saturate(0.1);
  } else if (preferences.baseColor === "cool") {
    adjusted = adjusted.rotate(-15).saturate(0.1);
  } else if (preferences.baseColor === "neutral") {
    adjusted = adjusted.desaturate(0.2);
  }

  // Style adjustments
  switch (preferences.style) {
    case "natural":
      adjusted = adjusted.desaturate(0.1).mix("#a8996c", 0.1);
      break;
    case "modern":
      adjusted = adjusted.saturate(0.1);
      break;
    case "vintage":
      adjusted = adjusted.desaturate(0.15).mix("#d4c5b2", 0.15);
      break;
    case "bold":
      adjusted = adjusted.saturate(0.2).lighten(0.1);
      break;
  }

  // Mood adjustments
  switch (preferences.mood) {
    case "calm":
      adjusted = adjusted.desaturate(0.1).lighten(0.05);
      break;
    case "energetic":
      adjusted = adjusted.saturate(0.15).lighten(0.1);
      break;
    case "professional":
      adjusted = adjusted.desaturate(0.05).mix("#4a4a4a", 0.1);
      break;
    case "playful":
      adjusted = adjusted.saturate(0.2).rotate(5);
      break;
  }

  // Contrast adjustments
  switch (preferences.contrast) {
    case "subtle":
      adjusted = adjusted.desaturate(0.1);
      break;
    case "balanced":
      // Keep as is
      break;
    case "strong":
      adjusted = adjusted.saturate(0.15);
      break;
  }

  return adjusted;
}

export function generateRandomTheme(colorCount: number = 3, preferences: ThemePreferences): ThemeColors {
  const harmonies: ColorHarmony[] = [
    "analogous",
    "triadic",
    "complementary",
    "splitComplementary",
    "monochromatic",
  ];
  const harmonyType = harmonies[Math.floor(Math.random() * harmonies.length)];

  // Generate base color directly from preferences.colorFamily
  let baseColor = colord(generateBaseColor(preferences.colorFamily));

  // Only apply preset if no specific color family is selected
  if (preferences.colorFamily === "all") {
    const presets = Object.keys(PRESET_PALETTES) as (keyof typeof PRESET_PALETTES)[];
    const selectedPreset = presets[Math.floor(Math.random() * presets.length)];
    baseColor = colord(applyColorPreset(baseColor.toHex(), selectedPreset));
  }

  // Apply preferences after establishing base color
  baseColor = adjustForPreferences(baseColor, preferences);

  // Generate and ensure contrast for harmony colors
  const colors = generateHarmonies(baseColor.toHex(), harmonyType);
  const contrastedColors = ensureGoodContrast(colors);

  return {
    primary: contrastedColors[0],
    secondary: colorCount >= 2 ? contrastedColors[1] : "",
    accent: colorCount >= 3 ? contrastedColors[2] : "",
  };
}

export function hasGoodContrast(color1: string, color2: string): boolean {
  return colord(color1).contrast(colord(color2)) >= MIN_CONTRAST;
}
