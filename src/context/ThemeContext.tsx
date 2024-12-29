"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { ThemeColors, ThemeContextType, GradientState, StatusColors } from "@/types/theme";
import { ScaleKeys } from "@/types/color";
import { generateColorScale, generateStatusColors } from "@/utils/color";
import { useSettings } from "@/hooks/useSettings";

interface ThemeProviderProps {
  children: React.ReactNode;
  initialVisibleColors?: number;
  initialColors?: Partial<ThemeColors>;
  previewMode?: boolean;
}

type ThemeColorUpdate =
  | ThemeColors
  | {
      colors: ThemeColors;
      gradients?: string[];
      visibleColors?: number;
    };

const defaultColors: ThemeColors = {
  primary: "#38B2AC",
  secondary: "#A78BFA",
  accent: "#006EDB",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  initialVisibleColors = 1,
  initialColors,
  previewMode = false,
}: ThemeProviderProps) {
  const { settings } = useSettings();
  const [visibleColors, setVisibleColors] = useState<number>(
    previewMode ? initialVisibleColors : Number(settings.initialColors) || initialVisibleColors,
  );
  const [colors, setColors] = useState<ThemeColors>(
    initialColors ? { ...defaultColors, ...initialColors } : defaultColors,
  );
  const [scale, setScale] = useState<Record<keyof ThemeColors, Record<ScaleKeys, string>>>({
    primary: {} as Record<ScaleKeys, string>,
    secondary: {} as Record<ScaleKeys, string>,
    accent: {} as Record<ScaleKeys, string>,
  });

  const [gradients, setGradients] = useState<GradientState>({
    colors: [
      {
        color: typeof defaultColors.primary === "string" ? defaultColors.primary : defaultColors.primary.base,
        active: true,
      },
      {
        color:
          typeof defaultColors.secondary === "string"
            ? defaultColors.secondary
            : defaultColors.secondary.base,
        active: false,
      },
      {
        color: typeof defaultColors.accent === "string" ? defaultColors.accent : defaultColors.accent.base,
        active: false,
      },
    ],
  });

  const [statusColors, setStatusColors] = useState<StatusColors>(
    generateStatusColors(
      typeof defaultColors.primary === "string" ? defaultColors.primary : defaultColors.primary.base,
      typeof defaultColors.secondary === "string" ? defaultColors.secondary : defaultColors.secondary.base,
      typeof defaultColors.accent === "string" ? defaultColors.accent : defaultColors.accent.base,
    ),
  );

  const setThemeGradients = (colors: ThemeColors, gradients?: string[]) => {
    setGradients({
      colors: [
        { color: typeof colors.primary === "string" ? colors.primary : colors.primary.base, active: true },
        {
          color:
            typeof colors.secondary === "string"
              ? colors.secondary
              : typeof colors.secondary?.base === "string"
                ? colors.secondary.base
                : typeof colors.primary === "string"
                  ? colors.primary
                  : colors.primary.base,
          active: Array.isArray(gradients)
            ? gradients.includes(
                typeof colors.secondary === "string" ? colors.secondary : colors.secondary?.base || "",
              )
            : false,
        },
        {
          color:
            typeof colors.accent === "string"
              ? colors.accent
              : colors.accent?.base ||
                (typeof colors.primary === "string" ? colors.primary : colors.primary.base),
          active: Array.isArray(gradients)
            ? gradients.includes(
                typeof colors.accent === "string" ? colors.accent : colors.accent?.base || "",
              )
            : false,
        },
      ],
    });
  };

  const getActiveGradientColors = () => {
    const activeColors = gradients.colors.filter((c) => c.active);
    if (activeColors.length === 1) {
      const baseColor = activeColors[0].color;
      const colorKey = Object.entries(colors).find(
        ([, value]) => value === baseColor,
      )?.[0] as keyof ThemeColors;

      if (colorKey && scale.primary[200] && scale.primary[800]) {
        return [scale.primary[200], scale.primary[800]];
      }
      return [baseColor, baseColor]; // Fallback
    }
    return activeColors.map((c) => c.color);
  };

  const toggleGradientColor = (key: keyof ThemeColors) => {
    setGradients((prev) => ({
      colors: prev.colors.map((c) => (c.color === colors[key] ? { ...c, active: !c.active } : c)),
    }));
  };

  const setColor = (key: keyof ThemeColors, value: string) => {
    setColors((prev) => ({ ...prev, [key]: value }));
    const newScale = generateColorScale(value, settings.colorScale);
    setScale((prev) => ({
      ...prev,
      [key]: newScale,
    }));
    setGradients((prev) => ({
      colors: prev.colors.map((c) => (c.color === colors[key] ? { ...c, color: value } : c)),
    }));
  };

  const setThemeColors = (update: ThemeColorUpdate) => {
    // Handle both formats
    const newColors = "colors" in update ? update.colors : update;
    setColors(newColors);

    if ("visibleColors" in update && update.visibleColors) {
      setVisibleColors(update.visibleColors);
    }
    setThemeGradients(newColors, "gradients" in update ? update.gradients : undefined);
  };

  const getEffectiveColors = useCallback(
    (): ThemeColors => ({
      primary: colors.primary,
      secondary: visibleColors >= 2 ? colors.secondary : colors.primary,
      accent: visibleColors >= 3 ? colors.accent : colors.primary,
    }),
    [colors, visibleColors],
  );

  const showColor = () => {
    setVisibleColors((prev) => Math.min(prev + 1, 3));
  };

  const hideColor = () => {
    setVisibleColors((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    // Initialize color scales on mount or when scale setting changes
    const effectiveColors = getEffectiveColors();
    const scales = {
      primary: generateColorScale(
        typeof effectiveColors.primary === "string" ? effectiveColors.primary : effectiveColors.primary.base,
        settings.colorScale,
      ),
      secondary: generateColorScale(
        typeof effectiveColors.secondary === "string"
          ? effectiveColors.secondary
          : effectiveColors.secondary.base,
        settings.colorScale,
      ),
      accent: generateColorScale(
        typeof effectiveColors.accent === "string" ? effectiveColors.accent : effectiveColors.accent.base,
        settings.colorScale,
      ),
    };
    setScale(scales);

    // Update CSS variables
    const root = document.documentElement;
    Object.entries(effectiveColors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    const newStatusColors = generateStatusColors(
      typeof effectiveColors.primary === "string" ? effectiveColors.primary : effectiveColors.primary.base,
      typeof effectiveColors.secondary === "string"
        ? effectiveColors.secondary
        : effectiveColors.secondary.base,
      typeof effectiveColors.accent === "string" ? effectiveColors.accent : effectiveColors.accent.base,
    );
    setStatusColors(newStatusColors);

    // Set color scale CSS variables for all colors
    Object.entries(scales).forEach(([colorKey, colorScale]) => {
      Object.entries(colorScale).forEach(([scaleKey, value]) => {
        root.style.setProperty(`--${colorKey}-${scaleKey}`, value);
      });
    });

    // Set status color CSS variables
    Object.entries(newStatusColors).forEach(([status, variants]) => {
      Object.entries(variants).forEach(([variant, value]) => {
        root.style.setProperty(`--status-${status}-${variant}`, value as string);
      });
    });
  }, [colors, visibleColors, settings.colorScale, getEffectiveColors]);

  useEffect(() => {
    // Skip settings effect in preview mode
    if (previewMode) return;

    const newValue = Number(settings.initialColors);
    if (newValue >= 1 && newValue <= 3) {
      setVisibleColors(newValue);
    }
  }, [settings.initialColors, previewMode]);

  return (
    <ThemeContext.Provider
      value={{
        colors,
        setColor,
        scale,
        gradients,
        toggleGradientColor,
        getActiveGradientColors,
        statusColors,
        visibleColors,
        showColor,
        hideColor,
        getEffectiveColors,
        setThemeColors,
        setThemeGradients,
        setVisibleColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
