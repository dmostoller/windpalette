export type ThemeMode = "system" | "light" | "dark";
export type ColorFormat = "HEX" | "RGB" | "HSL";
export type ExportFormat = "Tailwind Variables" | "CSS Variables" | "Tailwind Config" | "SCSS Variables";
export type ColorScale = "1" | "3" | "5" | "7" | "9";
export type DefaultTab =
  | "colors"
  | "create"
  | "components"
  | "gradients"
  | "buttons"
  | "archive"
  | "help"
  | "user"
  | "settings"
  | "community";

export interface Settings {
  themeMode: ThemeMode;
  colorFormat: ColorFormat;
  exportFormat: ExportFormat;
  colorScale: ColorScale;
  initialColors: string;
  sidebarState: string;
  defaultTab: DefaultTab;
}
