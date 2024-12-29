"use client";

import { useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { ThemeColors, ColorWithVariants } from "@/types/theme";
import { useColor } from "@/hooks/useColor";
import { X } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { formatColor } from "@/utils/color";

interface ColorPickerProps {
  colorKey: keyof ThemeColors;
  label: string;
  onRemove?: () => void;
  canRemove?: boolean;
}

const formatNumber = (num: number): string => num.toFixed(2);

export default function ColorPicker({ colorKey, label, onRemove, canRemove }: ColorPickerProps) {
  const { settings } = useSettings();
  const { setColor, gradients, toggleGradientColor, getEffectiveColors } = useTheme();
  const effectiveColors = getEffectiveColors();
  const { hsl, updateHSL, hex, updateFromHex } = useColor(
    typeof effectiveColors[colorKey] === "string"
      ? (effectiveColors[colorKey] as string)
      : (effectiveColors[colorKey] as ColorWithVariants).base,
  );
  const isActiveInGradient = gradients.colors.find((c) => c.color === effectiveColors[colorKey])?.active;
  const currentColor = effectiveColors[colorKey];

  useEffect(() => {
    const colorValue = typeof currentColor === "string" ? currentColor : currentColor.base;
    updateFromHex(colorValue);
  }, [currentColor, updateFromHex]);

  return (
    <div className="relative p-4 border border-[var(--card-border)] rounded-lg bg-[var(--card-background)] shadow-sm">
      {canRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-[var(--background)] transition-colors"
        >
          <X className="w-6 h-6 text-[var(--primary)]" />
        </button>
      )}
      <label htmlFor={colorKey} className="block text-md font-medium mb-2">
        {label}
      </label>
      <div className="flex gap-6">
        {/* Left Column - Color Picker */}
        <div className="flex flex-col gap-4">
          <input
            type="color"
            id={colorKey}
            value={
              typeof effectiveColors[colorKey] === "string"
                ? (effectiveColors[colorKey] as string)
                : (effectiveColors[colorKey] as ColorWithVariants).base
            }
            onChange={(e) => setColor(colorKey, e.target.value)}
            className="w-24 h-24 rounded-lg cursor-pointer bg-[var(--background)]"
          />
          <div className="space-y-2">
            <code className="block text-md px-2 py-1 rounded bg-[var(--background)]">
              {formatColor(
                typeof effectiveColors[colorKey] === "string"
                  ? (effectiveColors[colorKey] as string)
                  : (effectiveColors[colorKey] as ColorWithVariants).base,
                settings.colorFormat,
              )}
            </code>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`gradient-${colorKey}`}
                checked={isActiveInGradient}
                onChange={() => toggleGradientColor(colorKey)}
                className="rounded border-gray-300"
              />
              <label htmlFor={`gradient-${colorKey}`} className="text-sm">
                Use in gradients
              </label>
            </div>
          </div>
        </div>

        {/* Right Column - HSL Sliders */}
        <div className="flex-1 space-y-2">
          <div>
            <label className="text-sm">Hue ({formatNumber(hsl.h)}°)</label>
            <input
              type="range"
              min="0"
              max="360"
              value={hsl.h}
              onChange={(e) => {
                updateHSL({ h: Number(e.target.value) });
                setColor(colorKey, hex);
              }}
              style={{
                background:
                  "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
              }}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label className="text-sm">Saturation ({formatNumber(hsl.s)}%)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={hsl.s}
              onChange={(e) => {
                updateHSL({ s: Number(e.target.value) });
                setColor(colorKey, hex);
              }}
              style={{
                background: `linear-gradient(to right, hsl(${hsl.h}, 0%, ${hsl.l}%), hsl(${hsl.h}, 100%, ${hsl.l}%))`,
              }}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label className="text-sm">Lightness ({formatNumber(hsl.l)}%)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={hsl.l}
              onChange={(e) => {
                updateHSL({ l: Number(e.target.value) });
                setColor(colorKey, hex);
              }}
              style={{
                background: `linear-gradient(to right, hsl(${hsl.h}, ${hsl.s}%, 0%), hsl(${hsl.h}, ${hsl.s}%, 50%), hsl(${hsl.h}, ${hsl.s}%, 100%))`,
              }}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
