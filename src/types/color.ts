export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface HSLColor extends HSL {
  hex: string;
  rgb: RGB;
}

export interface ColorState {
  hex: string;
  hsl: HSL;
  rgb: RGB;
}

export type ScaleKeys =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 950;
export type ColorScale = Record<ScaleKeys, string>;

export interface ColorShade {
  base: string;
  light: string;
  dark: string;
}

export interface StatusColors {
  info: ColorShade;
  success: ColorShade;
  warning: ColorShade;
  error: ColorShade;
}
