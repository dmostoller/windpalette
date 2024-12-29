import { useEffect } from "react";
import { useSettings } from "@/context/SettingsContext";

export function useThemeApplication() {
  const { settings } = useSettings();

  useEffect(() => {
    // Apply theme mode
    if (settings.themeMode === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      document.documentElement.classList.toggle("dark", settings.themeMode === "dark");
    }

    // Apply sidebar state
    document.body.setAttribute("data-sidebar", settings.sidebarState);

    // Store color format preference
    document.documentElement.setAttribute("data-color-format", settings.colorFormat);
  }, [settings.themeMode, settings.sidebarState, settings.colorFormat]);
}
