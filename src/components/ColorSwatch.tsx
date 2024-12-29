import { Lock, Unlock } from "lucide-react";
import { ScaleKeys } from "@/types/color";

interface ColorSwatchProps {
  shade: ScaleKeys;
  color: string;
  isLocked?: boolean;
  onClick?: () => void;
  showHex?: boolean;
  darkColor?: string;
}

export default function ColorSwatch({
  shade,
  color,
  isLocked,
  onClick,
  showHex = false,
  darkColor,
}: ColorSwatchProps) {
  const textColor =
    parseInt(shade.toString()) <= 300 ? darkColor || "black" : "white";
  return (
    <button
      onClick={onClick}
      className="group relative lg:aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      style={{ minWidth: "20px", minHeight: "50px" }}
    >
      <div
        className="w-full h-full transition-colors"
        style={{ backgroundColor: color }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-xs font-medium drop-shadow-md"
          style={{ color: textColor }}
        >
          {shade}
        </span>
        {showHex && (
          <span
            className="text-[0.6rem] drop-shadow-md mt-0.5"
            style={{ color: textColor }}
          >
            {color}
          </span>
        )}
        {isLocked !== undefined &&
          (isLocked ? (
            <Lock className="w-3 h-3 text-white drop-shadow-md mt-1" />
          ) : (
            <Unlock className="w-3 h-3 text-white drop-shadow-md mt-1" />
          ))}
      </div>
    </button>
  );
}
