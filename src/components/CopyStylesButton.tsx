"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Modal } from "./ui/Modal";
import { ThemeColors } from "@/types/theme";
import { hexToHSL, hexToRGB } from "@/utils/color";

type OutputFormat =
  | "hex"
  | "tailwind3"
  | "tailwind4"
  | "scss"
  | "css-hex"
  | "css-hsl"
  | "css-rgb"
  | "figma"
  | "tailwindConfig";

interface CopyStylesButtonProps {
  visibleColorKeys: (keyof ThemeColors)[];
}

export default function CopyStylesButton({ visibleColorKeys }: CopyStylesButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<OutputFormat>("hex");
  const { scale } = useTheme();

  const visibleScales = Object.entries(scale).filter(([key]) =>
    visibleColorKeys.includes(key as keyof ThemeColors),
  );

  const formatOutputs = {
    hex: visibleScales
      .map(
        ([colorKey, colorScale]) =>
          `${colorKey}:\n${Object.entries(colorScale)
            .map(([shade, value]) => `  ${shade}: ${value}`)
            .join("\n")}`,
      )
      .join("\n\n"),

    tailwind3: visibleScales
      .map(
        ([colorKey, colorScale]) =>
          `${colorKey}: {\n${Object.entries(colorScale)
            .map(([shade, value]) => `    ${shade}: '${value}'`)
            .join(",\n")}\n  }`,
      )
      .join(",\n"),

    tailwind4: visibleScales
      .map(
        ([colorKey, colorScale]) =>
          `{\n${Object.entries(colorScale)
            .map(([shade, value]) => `  "--${colorKey}-${shade}": "${value}"`)
            .join(",\n")}\n}`,
      )
      .join(",\n"),

    scss: visibleScales
      .map(
        ([colorKey, colorScale]) =>
          `$${colorKey}: (\n${Object.entries(colorScale)
            .map(([shade, value]) => `  '${shade}': ${value}`)
            .join(",\n")}\n);`,
      )
      .join("\n\n"),

    "css-hex": `:root {\n${visibleScales
      .map(([colorKey, colorScale]) =>
        Object.entries(colorScale)
          .map(([shade, value]) => `  --${colorKey}-${shade}: ${value};`)
          .join("\n"),
      )
      .join("\n")}\n}`,

    "css-hsl": `:root {\n${visibleScales
      .map(([colorKey, colorScale]) =>
        Object.entries(colorScale)
          .map(([shade, value]) => {
            const hsl = hexToHSL(value);
            return `  --${colorKey}-${shade}: hsl(${Math.round(hsl.h)}deg ${Math.round(
              hsl.s,
            )}% ${Math.round(hsl.l)}%);`;
          })
          .join("\n"),
      )
      .join("\n")}\n}`,

    "css-rgb": `:root {\n${visibleScales
      .map(([colorKey, colorScale]) =>
        Object.entries(colorScale)
          .map(([shade, value]) => {
            const rgb = hexToRGB(value);
            return `  --${colorKey}-${shade}: rgb(${rgb.r} ${rgb.g} ${rgb.b});`;
          })
          .join("\n"),
      )
      .join("\n")}\n}`,

    figma: visibleScales
      .map(([colorKey, colorScale]) =>
        Object.entries(colorScale)
          .map(([shade, value]) => `${colorKey}-${shade} = ${value.toUpperCase()}`)
          .join("\n"),
      )
      .join("\n"),

    tailwindConfig: `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        ${visibleScales
          .map(
            ([colorKey, colorScale]) =>
              `${colorKey}: {\n${Object.entries(colorScale)
                .map(([shade, value]) => `          ${shade}: '${value}'`)
                .join(",\n")}\n        }`,
          )
          .join(",\n        ")}
      }
    }
  }
}`,
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(formatOutputs[format]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm border border-primary text-primary hover:bg-primary hover:text-white rounded-md hover:opacity-90"
      >
        <Copy size={16} />
        Copy Scales
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Copy Color Scales</h3>
          <div className="flex flex-wrap gap-2">
            {(
              [
                "hex",
                "tailwind3",
                "tailwind4",
                "scss",
                "css-hex",
                "css-hsl",
                "css-rgb",
                "figma",
                "tailwindConfig",
              ] as OutputFormat[]
            ).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`px-3 py-1.5 rounded-md text-sm ${
                  format === f ? "bg-primary text-white" : "bg-gray-100 text-gray-700"
                }`}
              >
                {f.replace("-", " ").toUpperCase()}
              </button>
            ))}
          </div>
          <div className="relative">
            <pre className="bg-[var(--card-background)] p-4 rounded-md overflow-x-auto max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
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
