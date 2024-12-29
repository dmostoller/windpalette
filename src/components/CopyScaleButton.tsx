"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Modal } from "./ui/Modal";
import { hexToHSL, hexToRGB } from "@/utils/color";

type OutputFormat =
  | "hex"
  | "tailwind3"
  | "tailwind4"
  | "scss"
  | "css-hex"
  | "css-hsl"
  | "css-rgb"
  | "figma";

interface CopyScaleButtonProps {
  colors: string[];
  name: string;
}

export default function CopyScaleButton({
  colors,
  name,
}: CopyScaleButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<OutputFormat>("hex");

  const formatOutputs = {
    hex: `${name}:\n${colors.map((color, i) => `  ${i * 50 + 50}: ${color}`).join("\n")}`,

    tailwind3: `${name}: {
${colors.map((color, i) => `    ${i * 50 + 50}: '${color}'`).join(",\n")}
  }`,

    tailwind4: `{
  "--${name}-50": "${colors[0]}",
${colors
  .slice(1)
  .map((color, i) => `  "--${name}-${(i + 1) * 100}": "${color}"`)
  .join(",\n")}
}`,

    scss: `$${name}: (\n${colors.map((color, i) => `  '${i * 50 + 50}': ${color}`).join(",\n")}\n);`,

    "css-hex": `:root {
${colors.map((color, i) => `  --${name}-${i * 50 + 50}: ${color};`).join("\n")}
}`,

    "css-hsl": `:root {
${colors
  .map((color, i) => {
    const hsl = hexToHSL(color);
    return `  --${name}-${i * 50 + 50}: hsl(${Math.round(hsl.h)}deg ${Math.round(hsl.s)}% ${Math.round(hsl.l)}%);`;
  })
  .join("\n")}
}`,

    "css-rgb": `:root {
${colors
  .map((color, i) => {
    const rgb = hexToRGB(color);
    return `  --${name}-${i * 50 + 50}: rgb(${rgb.r} ${rgb.g} ${rgb.b});`;
  })
  .join("\n")}
}`,

    figma: colors
      .map((color, i) => `${name}-${i * 50 + 50} = ${color.toUpperCase()}`)
      .join("\n"),
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
        className="absolute top-2 right-2 p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100/50"
      >
        <Copy size={14} />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="space-y-4">
          <h3 className="text-lg font-medium capitalize">{name} Scale</h3>
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
              ] as OutputFormat[]
            ).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`px-3 py-1.5 rounded-md text-sm ${
                  format === f
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {f.replace("-", " ").toUpperCase()}
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
