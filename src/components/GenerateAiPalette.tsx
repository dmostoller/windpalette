import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Wand2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function GenerateAiPalette() {
  const { setThemeColors } = useTheme();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/generatePalette", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keywords: input }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate palette");
      }
      // Format colors to use base values
      const formattedColors = {
        primary: data.colors.primary.base,
        secondary: data.colors.secondary.base,
        accent: data.colors.accent.base,
      };

      // Set theme with all colors visible and initialize gradients
      setThemeColors({
        colors: formattedColors,
        visibleColors: 3,
        gradients: [formattedColors.primary, formattedColors.secondary],
      });

      setInput("");
      toast.success("Theme generated successfully!");
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="aiPrompt" className="block text-sm font-medium">
          AI Theme Generation
        </label>
        <div className="flex gap-2">
          <input
            id="aiPrompt"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. sunset in hawaii, cyberpunk city..."
            className="flex-1 p-2 rounded-md border border-[var(--card-border)] bg-[var(--background)]"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !input.trim()}
            className="min-w-36 lg:min-w-40 2xl:min-w-60 flex items-center justify-center gap-2 px-4 py-2 font-semibold border border-primary text-primary hover:bg-primary hover:text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
            Generate
          </button>
        </div>
      </div>

      {error && <div className="text-sm text-[var(--destructive)] mt-2">{error}</div>}

      <p className="text-sm text-[var(--muted-foreground)]">
        Enter any descriptive text and AI will generate a matching color palette. Try describing a scene,
        mood, or style you want to capture.
      </p>
    </div>
  );
}
