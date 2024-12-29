import { RGB, HSL, ColorScale, StatusColors } from "@/types/color";

export function hexToRGB(hex: string): RGB {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

export function hexToHSL(hex: string): HSL {
  // Remove # if present
  hex = hex.replace("#", "");

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;

  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

export function hslToHex({ h, s, l }: HSL): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function rgbToHSL({ r, g, b }: RGB): HSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

export function generateColorScale(
  baseColor: string,
  scalePosition: "1" | "3" | "5" | "7" | "9",
): ColorScale {
  const hsl = rgbToHSL(hexToRGB(baseColor));
  const basePositions = {
    "1": 100,
    "3": 300,
    "5": 500,
    "7": 700,
    "9": 900,
  };

  const baseIndex = basePositions[scalePosition];
  const stepSize = 10;

  // Calculate steps needed for each position relative to base
  const getStep = (position: number) => {
    const steps = (baseIndex - position) / 100;
    return hslToHex({
      ...hsl,
      l: Math.max(0, Math.min(100, hsl.l + steps * stepSize)),
    });
  };

  return {
    50: getStep(50),
    100: getStep(100),
    200: getStep(200),
    300: getStep(300),
    400: getStep(400),
    500: getStep(500),
    600: getStep(600),
    700: getStep(700),
    800: getStep(800),
    900: getStep(900),
    950: getStep(950),
  };
}

export function getContrastColor(hex: string): string {
  const { r, g, b } = hexToRGB(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

function blendColors(base: HSL, target: HSL, ratio: number = 0.3): HSL {
  // Weighted blend of hue values
  const hueWeight = 0.7; // Preserve more of the target hue for recognition
  const h = target.h * hueWeight + base.h * (1 - hueWeight);

  // Mix saturation and lightness more evenly
  const s = base.s * (1 - ratio) + target.s * ratio;
  const l = base.l * (1 - ratio) + target.l * ratio;

  return { h, s, l };
}

export function generateStatusColors(
  primaryColor: string,
  secondaryColor: string,
  accentColor: string,
): StatusColors {
  const primaryHSL = hexToHSL(primaryColor);
  const secondaryHSL = hexToHSL(secondaryColor);
  const accentHSL = hexToHSL(accentColor);

  const SEMANTIC_BASES = {
    success: { h: 142, s: 70, l: 45 }, // Green
    warning: { h: 45, s: 93, l: 47 }, // Amber
    error: { h: 0, s: 84, l: 60 }, // Red
  };

  return {
    info: {
      base: primaryColor,
      light: adjustColor(primaryColor, { lightness: 15 }),
      dark: adjustColor(primaryColor, { lightness: -15 }),
    },
    success: {
      base: hslToHex(blendColors(primaryHSL, SEMANTIC_BASES.success, 0.6)),
      light: hslToHex(blendColors(secondaryHSL, SEMANTIC_BASES.success, 0.4)),
      dark: hslToHex(blendColors(primaryHSL, SEMANTIC_BASES.success, 0.8)),
    },
    warning: {
      base: hslToHex(blendColors(secondaryHSL, SEMANTIC_BASES.warning, 0.6)),
      light: hslToHex(blendColors(accentHSL, SEMANTIC_BASES.warning, 0.4)),
      dark: hslToHex(blendColors(secondaryHSL, SEMANTIC_BASES.warning, 0.8)),
    },
    error: {
      base: hslToHex(blendColors(accentHSL, SEMANTIC_BASES.error, 0.6)),
      light: hslToHex(blendColors(primaryHSL, SEMANTIC_BASES.error, 0.4)),
      dark: hslToHex(blendColors(accentHSL, SEMANTIC_BASES.error, 0.8)),
    },
  };
}

function adjustColor(hex: string, { lightness }: { lightness: number }): string {
  const hsl = rgbToHSL(hexToRGB(hex));
  return hslToHex({
    ...hsl,
    l: Math.max(0, Math.min(100, hsl.l + lightness)),
  });
}

export function formatColor(hex: string, format: "HEX" | "RGB" | "HSL"): string {
  switch (format) {
    case "RGB": {
      const { r, g, b } = hexToRGB(hex);
      return `rgb(${r}, ${g}, ${b})`;
    }
    case "HSL": {
      const { h, s, l } = hexToHSL(hex);
      return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
    }
    default:
      return hex.toUpperCase();
  }
}
