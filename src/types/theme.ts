import { ScaleKeys } from "./color";

export interface ColorWithVariants {
  base: string;
  light?: string;
  dark?: string;
}

export interface ThemeColors {
  primary: string | ColorWithVariants;
  secondary: string | ColorWithVariants;
  accent: string | ColorWithVariants;
}

export interface Theme {
  id: string;
  name: string;
  userId: string;
  colors: Record<string, string>;
  gradients: {
    colors: Array<{ color: string; active: boolean }>;
  };
  createdAt: number;
  [key: string]:
    | string
    | number
    | boolean
    | Record<string, string>
    | { colors: Array<{ color: string; active: boolean }> };
}

export interface CommunityTheme {
  id: string;
  name: string;
  saveCount: number;
  published: boolean;
  visibleColors: number;
  author: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
  colors: Array<{
    id: string;
    name: string;
    value: string;
  }>;
  gradients: Array<{
    id: string;
    color: string;
    active: boolean;
  }>;
}

export interface StatusColors {
  info: { base: string; light: string; dark: string };
  success: { base: string; light: string; dark: string };
  warning: { base: string; light: string; dark: string };
  error: { base: string; light: string; dark: string };
}

export interface GradientColor {
  color: string;
  active: boolean;
}

export interface GradientState {
  colors: GradientColor[];
}

export interface ThemeColorUpdate {
  colors: ThemeColors;
  visibleColors?: number;
  gradients?: string[];
}

// Update ThemeContextType
export interface ThemeContextType {
  colors: ThemeColors;
  setColor: (key: keyof ThemeColors, value: string) => void;
  scale: Record<keyof ThemeColors, Record<ScaleKeys, string>>;
  gradients: GradientState;
  toggleGradientColor: (key: keyof ThemeColors) => void;
  getActiveGradientColors: () => string[];
  statusColors: StatusColors;
  visibleColors: number;
  showColor: () => void;
  hideColor: () => void;
  getEffectiveColors: () => ThemeColors;
  setThemeColors: (update: ThemeColorUpdate) => void;
  setThemeGradients: (colors: ThemeColors, gradients?: string[]) => void;
  setVisibleColors: (count: number) => void;
}
