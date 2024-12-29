import { ChevronDown, ChevronUp, Wand2 } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { generateRandomTheme } from "@/utils/theme";
import { colorFamilies } from "@/lib/colors";

interface ThemePreferences {
  baseColor: "warm" | "cool" | "neutral";
  style: "natural" | "modern" | "vintage" | "bold";
  mood: "calm" | "energetic" | "professional" | "playful";
  contrast: "subtle" | "balanced" | "strong";
  colorFamily: keyof typeof colorFamilies;
}

export function GenerateRandomThemeButton() {
  const { visibleColors, setThemeColors } = useTheme();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [preferences, setPreferences] = useState<ThemePreferences>({
    baseColor: "warm",
    style: "modern",
    mood: "professional",
    contrast: "balanced",
    colorFamily: "all",
  });

  const handleGenerateTheme = () => {
    const newTheme = generateRandomTheme(visibleColors, preferences);
    setThemeColors({ colors: newTheme });
  };

  return (
    <div className="space-y-6 p-4 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
      <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-4 lg:space-y-0 lg:grid lg:grid-cols-5 lg:gap-4">
        {/* Add new Color Family Dropdown */}
        <div className="space-y-2">
          <label htmlFor="colorFamily" className="block text-sm font-medium">
            Color Family
          </label>
          <select
            id="colorFamily"
            value={preferences.colorFamily}
            onChange={(e) =>
              setPreferences({
                ...preferences,
                colorFamily: e.target.value as keyof typeof colorFamilies,
              })
            }
            className="w-full p-2 rounded-md border border-[var(--card-border)] bg-[var(--background)]"
          >
            {Object.entries(colorFamilies).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        {/* Base Color Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Base Color Temperature</label>
          <div className="flex flex-wrap gap-2">
            {["warm", "cool", "neutral"].map((color) => (
              <label key={color} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="baseColor"
                  value={color}
                  checked={preferences.baseColor === color}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      baseColor: e.target.value as ThemePreferences["baseColor"],
                    })
                  }
                  className="text-[var(--primary)]"
                />
                <span className="capitalize">{color}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Style Dropdown */}
        <div className="space-y-2">
          <label htmlFor="style" className="block text-sm font-medium">
            Style
          </label>
          <select
            id="style"
            value={preferences.style}
            onChange={(e) =>
              setPreferences({ ...preferences, style: e.target.value as ThemePreferences["style"] })
            }
            className="w-full p-2 rounded-md border border-[var(--card-border)] bg-[var(--background)]"
          >
            <option value="natural">Natural & Organic</option>
            <option value="modern">Modern & Minimal</option>
            <option value="vintage">Vintage & Classic</option>
            <option value="bold">Bold & Vibrant</option>
          </select>
        </div>

        {/* Mood Dropdown */}
        <div className="space-y-2">
          <label htmlFor="mood" className="block text-sm font-medium">
            Mood
          </label>
          <select
            id="mood"
            value={preferences.mood}
            onChange={(e) =>
              setPreferences({ ...preferences, mood: e.target.value as ThemePreferences["mood"] })
            }
            className="w-full p-2 rounded-md border border-[var(--card-border)] bg-[var(--background)]"
          >
            <option value="calm">Calm & Serene</option>
            <option value="energetic">Energetic & Dynamic</option>
            <option value="professional">Professional & Corporate</option>
            <option value="playful">Playful & Creative</option>
          </select>
        </div>

        {/* Contrast Selection */}
        <div className="space-y-2">
          <label htmlFor="contrast" className="block text-sm font-medium">
            Contrast Level
          </label>
          <select
            id="contrast"
            value={preferences.contrast}
            onChange={(e) =>
              setPreferences({ ...preferences, contrast: e.target.value as ThemePreferences["contrast"] })
            }
            className="w-full p-2 rounded-md border border-[var(--card-border)] bg-[var(--background)]"
          >
            <option value="subtle">Subtle</option>
            <option value="balanced">Balanced</option>
            <option value="strong">Strong</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleGenerateTheme}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 font-semibold border border-primary text-primary hover:bg-primary hover:text-white rounded-lg"
      >
        <Wand2 className="w-4 h-4" />
        Generate Theme
      </button>

      <div className="border-t border-[var(--card-border)] pt-4">
        <button
          onClick={() => setIsInfoOpen(!isInfoOpen)}
          className="flex items-center justify-between w-full text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
        >
          How does it work?
          {isInfoOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isInfoOpen && (
          <div className="mt-4 space-y-3 text-sm text-[var(--muted-foreground)] animate-in slide-in-from-top-2">
            <p>The theme generator creates color schemes based on your preferences:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <strong>Color Family:</strong> Determines the main color range
              </li>
              <li>
                <strong>Base Temperature:</strong> Affects the overall warmth of colors
              </li>
              <li>
                <strong>Style:</strong> Influences saturation and brightness levels
              </li>
              <li>
                <strong>Mood:</strong> Adjusts color harmony and combinations
              </li>
              <li>
                <strong>Contrast:</strong> Controls the difference between colors
              </li>
            </ul>
            <p>Colors are generated using color theory principles and tested for accessibility standards.</p>
          </div>
        )}
      </div>
    </div>
  );
}
