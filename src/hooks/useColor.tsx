import { useState, useCallback } from "react";
import { generateColorScale, getContrastColor, rgbToHSL, hexToRGB, hslToHex } from "@/utils/color";
import type { ColorState, HSL } from "@/types/color";

export function useColor(initialColor: string) {
  const [colorState, setColorState] = useState<ColorState>(() => ({
    hex: initialColor,
    hsl: rgbToHSL(hexToRGB(initialColor)),
    rgb: hexToRGB(initialColor),
  }));

  const updateHSL = useCallback(({ h, s, l }: Partial<HSL>) => {
    setColorState((prev) => {
      const newHSL = {
        ...prev.hsl,
        h: h ?? prev.hsl.h,
        s: s ?? prev.hsl.s,
        l: l ?? prev.hsl.l,
      };
      const newHex = hslToHex(newHSL);
      return {
        hex: newHex,
        hsl: newHSL,
        rgb: hexToRGB(newHex),
      };
    });
  }, []);

  const updateFromHex = useCallback((hex: string) => {
    setColorState({
      hex,
      hsl: rgbToHSL(hexToRGB(hex)),
      rgb: hexToRGB(hex),
    });
  }, []);

  return {
    ...colorState,
    updateHSL,
    updateFromHex,
    scale: generateColorScale(colorState.hex, "5"),
    contrastColor: getContrastColor(colorState.hex),
  };
}
