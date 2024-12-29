import { useTheme } from "@/context/ThemeContext";
import { useEffect, useMemo } from "react";

const GRADIENT_VARIANTS = [
  { name: "Left to Right", className: "bg-gradient-to-r" },
  { name: "Right to Left", className: "bg-gradient-to-l" },
  { name: "Bottom to Top", className: "bg-gradient-to-t" },
  { name: "Top to Bottom", className: "bg-gradient-to-b" },
  { name: "Diagonal", className: "bg-gradient-to-br" },
  { name: "Radial", className: "bg-[--radial-gradient]" },
];

export default function GradientPreview() {
  const { gradients, getActiveGradientColors } = useTheme();

  const activeColors = gradients.colors.filter((c) => c.active).map((c) => c.color);

  const gradientColors = useMemo(() => {
    return getActiveGradientColors();
  }, [getActiveGradientColors]);

  useEffect(() => {
    const root = document.documentElement;

    // Set up to 3 gradient colors
    gradientColors.forEach((color, index) => {
      root.style.setProperty(`--gradient-color-${index}`, color);
    });

    // Create gradient string based on number of colors
    const radialGradient =
      gradientColors.length === 3
        ? `radial-gradient(circle, ${gradientColors[0]} 0%, ${gradientColors[1]} 50%, ${gradientColors[2]} 100%)`
        : `radial-gradient(circle, ${gradientColors[0]}, ${gradientColors[1]})`;

    root.style.setProperty("--radial-gradient", radialGradient);

    return () => {
      // Clean up all possible gradient colors
      [0, 1, 2].forEach((index) => {
        root.style.removeProperty(`--gradient-color-${index}`);
      });
      root.style.removeProperty("--radial-gradient");
    };
  }, [gradientColors]);

  const gradientStyle = (variant: string) => {
    if (variant === "bg-[--radial-gradient]") {
      return { background: `var(--radial-gradient)` };
    }

    const direction = variant.replace("bg-gradient-to-", "");
    const gradientMap = {
      r: "90deg",
      l: "270deg",
      t: "0deg",
      b: "180deg",
      br: "135deg",
    };

    const angle = gradientMap[direction as keyof typeof gradientMap];
    const colorStops =
      gradientColors.length === 3
        ? `var(--gradient-color-0), var(--gradient-color-1), var(--gradient-color-2)`
        : `var(--gradient-color-0), var(--gradient-color-1)`;

    return {
      background: `linear-gradient(${angle}, ${colorStops})`,
    };
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 p-4">
        {GRADIENT_VARIANTS.map((variant) => (
          <div
            key={variant.name}
            className="group space-y-4 p-4 rounded-2xl bg-[var(--card-background)] border border-[var(--card-border)]
            hover:scale-[1.02] transition-all duration-300 ease-out"
          >
            <h4 className="text-sm font-medium">{variant.name}</h4>
            <div
              className="relative min-h-48 min-w-48 aspect-square md:min-h-72 md:min-w-72 rounded-full shadow-lg transition-all duration-300
              transform perspective-1000 cursor-pointer
              before:absolute before:inset-0 before:rounded-xl before:opacity-50
              before:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)]
              after:absolute after:inset-0 after:rounded-xl after:opacity-20
              after:shadow-[0_8px_24px_rgba(0,0,0,0.2)]
              group-hover:shadow-2xl"
              style={{
                ...gradientStyle(variant.className),
              }}
            >
              <div className="absolute inset-0 rounded-xl bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            </div>
            <button
              className="relative w-full text-white px-4 py-3 rounded-xl font-medium overflow-hidden
              transform transition-all duration-200
              shadow-lg hover:shadow-xl hover:-translate-y-0.5
              before:absolute before:inset-0 before:rounded-xl 
              before:opacity-90 before:transition-opacity
              hover:before:opacity-100
              after:absolute after:inset-0 after:rounded-xl
              after:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]
              active:scale-95"
              style={gradientStyle(variant.className)}
            >
              <span className="relative z-10">Gradient Button</span>
              <div className="absolute inset-0 rounded-xl transition-colors duration-300 bg-black/0 hover:bg-black/20" />
            </button>
          </div>
        ))}
      </div>
      {activeColors.length < 2 && (
        <p className="text-sm text-gray-500 mt-4 text-center">
          Select at least 2 colors in the color pickers above to customize gradients
        </p>
      )}
    </div>
  );
}
