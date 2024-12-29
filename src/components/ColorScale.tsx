"use client";

import { useTheme } from "@/context/ThemeContext";
import { ScaleKeys } from "@/types/color";
import { ThemeColors } from "@/types/theme";
import ColorSwatch from "./ColorSwatch";
import CopyStylesButton from "./CopyStylesButton";

const SCALE_VALUES: ScaleKeys[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const COLOR_KEYS: (keyof ThemeColors)[] = ["primary", "secondary", "accent"];
interface ColorScaleProps {
  visibleColors?: number;
}

export default function ColorScale({ visibleColors = 3 }: ColorScaleProps) {
  const { scale } = useTheme();

  const visibleColorKeys = COLOR_KEYS.slice(0, visibleColors);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Color Scales</h3>
        <CopyStylesButton visibleColorKeys={visibleColorKeys} />
      </div>
      {visibleColorKeys.map((colorKey) => (
        <div key={colorKey} className="space-y-2">
          <h4 className="text-sm font-medium capitalize">{colorKey}</h4>
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-1">
            {SCALE_VALUES.map((value) => (
              <ColorSwatch
                key={`${colorKey}-${value}`}
                shade={value}
                color={scale[colorKey][value]}
                darkColor={scale[colorKey][900]}
                showHex={true}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
