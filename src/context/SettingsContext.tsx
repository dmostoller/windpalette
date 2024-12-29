"use client";

import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Settings } from "../types/settings";

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  themeMode: "system",
  colorFormat: "HEX",
  exportFormat: "Tailwind Variables",
  colorScale: "5",
  initialColors: "1",
  sidebarState: "expanded",
  defaultTab: "colors",
};

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!isClient) return;

    const applyTheme = (isDark: boolean) => {
      document.documentElement.classList.toggle("dark", isDark);
      // Force re-render of CSS variables
      document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    };

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (settings.themeMode === "system") {
        applyTheme(e.matches);
      }
    };

    // Set up system theme listener
    const systemThemeMedia = window.matchMedia("(prefers-color-scheme: dark)");
    systemThemeMedia.addEventListener("change", handleSystemThemeChange);

    // Apply initial theme
    if (settings.themeMode === "system") {
      applyTheme(systemThemeMedia.matches);
    } else {
      applyTheme(settings.themeMode === "dark");
    }

    return () => {
      systemThemeMedia.removeEventListener("change", handleSystemThemeChange);
    };
  }, [settings.themeMode, isClient]);

  // Add debug logging
  const updateSettings = (newSettings: Partial<Settings>) => {
    // console.log("Updating settings:", newSettings);
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      // console.log("Updated settings:", updated);
      return updated;
    });
  };

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("theme-generator-settings");
    if (saved) {
      try {
        const parsedSettings = JSON.parse(saved);
        // console.log("Loading saved settings:", parsedSettings);
        setSettings(parsedSettings);
      } catch (error) {
        console.error("Failed to parse settings:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;
    // console.log("Saving settings to localStorage:", settings);
    try {
      localStorage.setItem("theme-generator-settings", JSON.stringify(settings));
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  }, [settings, isClient]);

  return <SettingsContext.Provider value={{ settings, updateSettings }}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
