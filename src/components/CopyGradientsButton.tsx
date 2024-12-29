"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Modal } from "./ui/Modal";

type OutputFormat = "tailwind" | "css-vars" | "css-static" | "scss";

export default function CopyGradientsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<OutputFormat>("tailwind");
  const { gradients, colors } = useTheme();

  const activeColors = gradients.colors.filter((c) => c.active).map((c) => c.color.toString());

  const gradientColors =
    activeColors.length >= 2 ? activeColors : [colors.primary.toString(), colors.secondary.toString()];

  function generateLinearGradient(colors: string[], angle: number) {
    return colors.length === 3
      ? `linear-gradient(${angle}deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`
      : `linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]})`;
  }

  const formatOutputs = {
    tailwind: `module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': '${generateRadialGradient(gradientColors)}',
        'gradient-linear': '${generateLinearGradient(gradientColors, 90)}',
        'gradient-linear-45': '${generateLinearGradient(gradientColors, 45)}',
        'gradient-linear-135': '${generateLinearGradient(gradientColors, 135)}',
        'gradient-linear-180': '${generateLinearGradient(gradientColors, 180)}',
      }
    }
  }
}`,
    "css-vars": `:root {
  --gradient-color-0: ${gradientColors[0]};
  --gradient-color-1: ${gradientColors[1]};
  ${gradientColors[2] ? `--gradient-color-2: ${gradientColors[2]};` : ""}
  --gradient-radial: ${generateRadialGradient(gradientColors)};
  --gradient-linear: ${generateLinearGradient(gradientColors, 90)};
  --gradient-linear-45: ${generateLinearGradient(gradientColors, 45)};
  --gradient-linear-135: ${generateLinearGradient(gradientColors, 135)};
  --gradient-linear-180: ${generateLinearGradient(gradientColors, 180)};
}`,
    "css-static": `.gradient-radial {
  background: ${generateRadialGradient(gradientColors)};
}
.gradient-linear {
  background: ${generateLinearGradient(gradientColors, 90)};
}
.gradient-linear-45 {
  background: ${generateLinearGradient(gradientColors, 45)};
}
.gradient-linear-135 {
  background: ${generateLinearGradient(gradientColors, 135)};
}
.gradient-linear-180 {
  background: ${generateLinearGradient(gradientColors, 180)};
}`,
    scss: `@mixin gradient-radial {
  background: ${generateRadialGradient(gradientColors)};
}

@mixin gradient-linear($angle: 90deg) {
  background: linear-gradient($angle, ${gradientColors.join(", ")});
}

// Usage:
.element {
  @include gradient-radial;
  // or
  @include gradient-linear(45deg);
}`,
  };

  function generateRadialGradient(colors: string[]) {
    return colors.length === 3
      ? `radial-gradient(circle, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`
      : `radial-gradient(circle, ${colors[0]}, ${colors[1]})`;
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(formatOutputs[format]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-1.5 border border-primary text-sm text-primary hover:bg-primary hover:text-white rounded-lg"
      >
        <Copy size={16} />
        Copy Gradients
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Copy Gradient Configuration</h3>
          <div className="flex gap-2">
            {(["tailwind", "css-vars", "css-static", "scss"] as OutputFormat[]).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`px-3 py-1.5 rounded-md text-sm ${
                  format === f ? "bg-primary text-white" : "bg-gray-100 text-gray-700"
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="relative">
            <pre className="bg-[var(--card-background)] p-4 rounded-md overflow-x-auto">
              <code>{formatOutputs[format]}</code>
            </pre>
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
