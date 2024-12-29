"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Modal } from "./ui/Modal";
import { hexToHSL, hexToRGB } from "@/utils/color";

type OutputFormat = "hex" | "tailwind" | "scss" | "css-hex" | "css-hsl" | "css-rgb" | "figma";

export default function CopyStatusColorsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<OutputFormat>("hex");
  const { statusColors } = useTheme();

  const allColors = {
    // Base colors
    primary: {
      base: getComputedStyle(document.documentElement).getPropertyValue("--primary").trim(),
      dark: getComputedStyle(document.documentElement).getPropertyValue("--primary-dark").trim(),
      light: getComputedStyle(document.documentElement).getPropertyValue("--primary-light").trim(),
    },
    secondary: {
      base: getComputedStyle(document.documentElement).getPropertyValue("--secondary").trim(),
      dark: getComputedStyle(document.documentElement).getPropertyValue("--secondary-dark").trim(),
      light: getComputedStyle(document.documentElement).getPropertyValue("--secondary-light").trim(),
    },
    accent: {
      base: getComputedStyle(document.documentElement).getPropertyValue("--accent").trim(),
      dark: getComputedStyle(document.documentElement).getPropertyValue("--accent-dark").trim(),
      light: getComputedStyle(document.documentElement).getPropertyValue("--accent-light").trim(),
    },
    // Status colors
    ...statusColors,
  };

  const formatOutputs = {
    hex: Object.entries(allColors)
      .map(
        ([colorName, variants]) =>
          `${colorName}:\n${Object.entries(variants)
            .map(([variant, value]) => `  ${variant}: ${value}`)
            .join("\n")}`,
      )
      .join("\n\n"),

    tailwind: Object.entries(allColors)
      .map(
        ([colorName, variants]) =>
          `${colorName}: {\n${Object.entries(variants)
            .map(([variant, value]) => `    ${variant}: '${value}'`)
            .join(",\n")}\n  }`,
      )
      .join(",\n"),

    scss: Object.entries(allColors)
      .map(
        ([colorName, variants]) =>
          `$${colorName}: (\n${Object.entries(variants)
            .map(([variant, value]) => `  ${variant}: ${value}`)
            .join(",\n")}\n);`,
      )
      .join("\n\n"),

    "css-hex": Object.entries(allColors)
      .map(([colorName, variants]) =>
        Object.entries(variants)
          .map(([variant, value]) =>
            variant === "base" ? `--${colorName}: ${value};` : `--${colorName}-${variant}: ${value};`,
          )
          .join("\n"),
      )
      .join("\n"),

    "css-hsl": Object.entries(allColors)
      .map(([colorName, variants]) =>
        Object.entries(variants)
          .map(([variant, value]) => {
            const { h, s, l } = hexToHSL(value);
            return variant === "base"
              ? `--${colorName}: hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%);`
              : `--${colorName}-${variant}: hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%);`;
          })
          .join("\n"),
      )
      .join("\n"),

    "css-rgb": Object.entries(allColors)
      .map(([colorName, variants]) =>
        Object.entries(variants)
          .map(([variant, value]) => {
            const { r, g, b } = hexToRGB(value);
            return variant === "base"
              ? `--${colorName}: rgb(${r}, ${g}, ${b});`
              : `--${colorName}-${variant}: rgb(${r}, ${g}, ${b});`;
          })
          .join("\n"),
      )
      .join("\n"),

    figma: Object.entries(allColors)
      .map(([colorName, variants]) =>
        Object.entries(variants)
          .map(([variant, value]) => `${colorName}/${variant}\n${value}`)
          .join("\n"),
      )
      .join("\n\n"),
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
        Copy Button Colors
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Copy Status Colors</h3>
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(formatOutputs) as OutputFormat[]).map((f) => (
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
