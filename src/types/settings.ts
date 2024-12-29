export type ThemeMode = "system" | "light" | "dark";
export type ColorFormat = "HEX" | "RGB" | "HSL";
export type ExportFormat = "Tailwind Variables" | "CSS Variables" | "Tailwind Config" | "SCSS Variables";
export type ColorScale = "1" | "3" | "5" | "7" | "9";
export type DefaultTab =
  | "browse"
  | "colors"
  | "components"
  | "gradients"
  | "buttons"
  | "saved themes"
  | "help"
  | "user"
  | "settings";

export interface Settings {
  themeMode: ThemeMode;
  colorFormat: ColorFormat;
  exportFormat: ExportFormat;
  colorScale: ColorScale;
  initialColors: string;
  sidebarState: string;
  defaultTab: DefaultTab;
}
