"use client";

import { ScaleKeys } from "@/types/color";
import ColorSwatch from "./ColorSwatch";

const SCALE_VALUES: ScaleKeys[] = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
];

interface PreviewColorScaleProps {
  colors: string[];
  name?: string;
}

export default function PreviewColorScale({
  colors,
  name,
}: PreviewColorScaleProps) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 lg:grid-cols-11 gap-1">
        {SCALE_VALUES.map((value, index) => (
          <ColorSwatch
            key={`${name}-${value}`}
            shade={value}
            color={colors[index]}
            showHex={true}
            darkColor={colors[9]}
          />
        ))}
      </div>
    </div>
  );
}
