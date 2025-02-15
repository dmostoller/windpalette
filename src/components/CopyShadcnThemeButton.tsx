"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Modal } from "./ui/Modal";
import { hexToHSL } from "@/utils/color";

export default function CopyShadcnThemeButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { colors } = useTheme();

  const generateShadcnTheme = () => {
    const primary = hexToHSL(colors.primary as string);
    const secondary = colors.secondary ? hexToHSL(colors.secondary as string) : { h: 0, s: 0, l: 96.1 };
    const accent = colors.accent ? hexToHSL(colors.accent as string) : { h: 0, s: 0, l: 96.1 };

    // Generate variations for backgrounds and borders
    const subtleBackground = { ...primary, s: primary.s * 0.02, l: 100 };
    const subtleCard = { ...primary, s: primary.s * 0.05, l: 99 };
    const subtleBorder = { ...primary, s: primary.s * 0.1, l: 90 };

    // Generate chart colors based on primary hue shifts
    const chartColors = [
      { h: primary.h, s: 70, l: 50 },
      { h: (primary.h + 72) % 360, s: 65, l: 45 },
      { h: (primary.h + 144) % 360, s: 60, l: 55 },
      { h: (primary.h + 216) % 360, s: 55, l: 60 },
      { h: (primary.h + 288) % 360, s: 50, l: 65 },
    ];

    return `@layer base {
  :root {
    --background: ${Math.round(subtleBackground.h)} ${Math.round(subtleBackground.s)}% ${Math.round(subtleBackground.l)}%;
    --foreground: ${Math.round(primary.h)} ${Math.round(primary.s)}% 3.9%;
    --card: ${Math.round(subtleCard.h)} ${Math.round(subtleCard.s)}% ${Math.round(subtleCard.l)}%;
    --card-foreground: ${Math.round(primary.h)} ${Math.round(primary.s)}% 3.9%;
    --popover: ${Math.round(subtleCard.h)} ${Math.round(subtleCard.s)}% ${Math.round(subtleCard.l)}%;
    --popover-foreground: ${Math.round(primary.h)} ${Math.round(primary.s)}% 3.9%;
    --primary: ${Math.round(primary.h)} ${Math.round(primary.s)}% ${Math.round(primary.l)}%;
    --primary-foreground: ${Math.round(primary.h)} ${Math.round(primary.s)}% 98%;
    --secondary: ${Math.round(secondary.h)} ${Math.round(secondary.s)}% ${Math.round(secondary.l)}%;
    --secondary-foreground: ${Math.round(secondary.h)} ${Math.round(secondary.s)}% 95%;
    --muted: ${Math.round(primary.h)} ${Math.round(primary.s * 0.1)}% 96.1%;
    --muted-foreground: ${Math.round(primary.h)} ${Math.round(primary.s * 0.2)}% 45.1%;
    --accent: ${Math.round(accent.h)} ${Math.round(accent.s)}% ${Math.round(accent.l)}%;
    --accent-foreground: ${Math.round(accent.h)} ${Math.round(accent.s)}% 95%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: ${Math.round(subtleBorder.h)} ${Math.round(subtleBorder.s)}% ${Math.round(subtleBorder.l)}%;
    --input: ${Math.round(subtleBorder.h)} ${Math.round(subtleBorder.s)}% ${Math.round(subtleBorder.l)}%;
    --ring: ${Math.round(primary.h)} ${Math.round(primary.s)}% ${Math.round(primary.l)}%;
    --radius: 0.5rem;
    --chart-1: ${Math.round(chartColors[0].h)} ${Math.round(chartColors[0].s)}% ${Math.round(chartColors[0].l)}%;
    --chart-2: ${Math.round(chartColors[1].h)} ${Math.round(chartColors[1].s)}% ${Math.round(chartColors[1].l)}%;
    --chart-3: ${Math.round(chartColors[2].h)} ${Math.round(chartColors[2].s)}% ${Math.round(chartColors[2].l)}%;
    --chart-4: ${Math.round(chartColors[3].h)} ${Math.round(chartColors[3].s)}% ${Math.round(chartColors[3].l)}%;
    --chart-5: ${Math.round(chartColors[4].h)} ${Math.round(chartColors[4].s)}% ${Math.round(chartColors[4].l)}%;
  }

  .dark {
    --background: ${Math.round(primary.h)} ${Math.round(primary.s * 0.1)}% 3.9%;
    --foreground: ${Math.round(primary.h)} ${Math.round(primary.s * 0.1)}% 98%;
    --card: ${Math.round(primary.h)} ${Math.round(primary.s * 0.15)}% 4.9%;
    --card-foreground: ${Math.round(primary.h)} ${Math.round(primary.s * 0.1)}% 98%;
    --popover: ${Math.round(primary.h)} ${Math.round(primary.s * 0.15)}% 4.9%;
    --popover-foreground: ${Math.round(primary.h)} ${Math.round(primary.s * 0.1)}% 98%;
    --primary: ${Math.round(primary.h)} ${Math.round(primary.s)}% ${Math.round(primary.l)}%;
    --primary-foreground: ${Math.round(primary.h)} ${Math.round(primary.s)}% 9%;
    --secondary: ${Math.round(secondary.h)} ${Math.round(secondary.s)}% ${Math.round(secondary.l)}%;
    --secondary-foreground: ${Math.round(secondary.h)} ${Math.round(secondary.s)}% 95%;
    --muted: ${Math.round(primary.h)} ${Math.round(primary.s * 0.1)}% 14.9%;
    --muted-foreground: ${Math.round(primary.h)} ${Math.round(primary.s * 0.2)}% 63.9%;
    --accent: ${Math.round(accent.h)} ${Math.round(accent.s)}% ${Math.round(accent.l)}%;
    --accent-foreground: ${Math.round(accent.h)} ${Math.round(accent.s)}% 95%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: ${Math.round(primary.h)} ${Math.round(primary.s * 0.2)}% 14.9%;
    --input: ${Math.round(primary.h)} ${Math.round(primary.s * 0.2)}% 14.9%;
    --ring: ${Math.round(primary.h)} ${Math.round(primary.s)}% ${Math.round(primary.l)}%;
    --chart-1: ${Math.round(chartColors[0].h)} ${Math.round(chartColors[0].s - 10)}% ${Math.round(chartColors[0].l + 10)}%;
    --chart-2: ${Math.round(chartColors[1].h)} ${Math.round(chartColors[1].s - 10)}% ${Math.round(chartColors[1].l + 10)}%;
    --chart-3: ${Math.round(chartColors[2].h)} ${Math.round(chartColors[2].s - 10)}% ${Math.round(chartColors[2].l + 10)}%;
    --chart-4: ${Math.round(chartColors[3].h)} ${Math.round(chartColors[3].s - 10)}% ${Math.round(chartColors[3].l + 10)}%;
    --chart-5: ${Math.round(chartColors[4].h)} ${Math.round(chartColors[4].s - 10)}% ${Math.round(chartColors[4].l + 10)}%;
  }
}`;
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generateShadcnTheme());
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
        Copy shadcn Theme
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Copy shadcn Theme</h3>
          <div className="relative">
            <pre className="bg-[var(--card-background)] p-4 rounded-md overflow-x-auto max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              <code>{generateShadcnTheme()}</code>
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
