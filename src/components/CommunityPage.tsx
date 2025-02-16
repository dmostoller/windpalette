"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useTheme } from "@/context/ThemeContext";
import { ThemeColors } from "@/types/theme";
import { Eye, Save, Loader2 } from "lucide-react";
import { Tooltip } from "@/components/Tooltip";
import { CommunityTheme } from "@/types/theme";

export default function CommunityPage() {
  const [themes, setThemes] = useState<CommunityTheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const { data: session } = useSession();
  const { setThemeColors } = useTheme();

  useEffect(() => {
    fetch("/api/themes/community")
      .then((res) => res.json())
      .then(setThemes)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (themeId: string) => {
    if (!session) return;

    setSaving(themeId);
    try {
      await fetch("/api/themes/save", {
        method: "POST",
        body: JSON.stringify({ themeId }),
      });

      // Refresh themes
      const res = await fetch("/api/themes/community");
      const updated = await res.json();
      setThemes(updated);
    } finally {
      setSaving(null);
    }
  };

  const handlePreview = (theme: CommunityTheme) => {
    setThemeColors({
      colors: {
        primary: theme.colors.primary || "",
        secondary: theme.colors.secondary || "",
        accent: theme.colors.accent || "",
      },
      gradients: theme.gradients.colors.map((g) => g.color),
      visibleColors: theme.visibleColors,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="w-6 h-6 animate-spin text-[var(--muted-foreground)]" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Community Themes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <motion.div
            key={theme.id}
            className="p-6 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)]"
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white">
                {theme.author.name?.[0] || "?"}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{theme.name}</h3>
                <p className="text-sm text-[var(--muted-foreground)]">by {theme.author.name}</p>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              {Object.entries(theme.colors)
                .filter(([_, value]) => value) // Only show non-empty colors
                .map(([key, color]) => (
                  <Tooltip key={key} content={key}>
                    <div className="w-12 h-12 rounded-lg cursor-help" style={{ backgroundColor: color }} />
                  </Tooltip>
                ))}
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-[var(--muted-foreground)]">{theme.saveCount} saves</span>
              <div className="flex gap-2">
                <Tooltip content="Preview Theme">
                  <button
                    onClick={() => handlePreview(theme)}
                    className="p-2 hover:bg-[var(--card)] rounded-lg transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </Tooltip>
                <button
                  onClick={() => handleSave(theme.id)}
                  disabled={!session || saving === theme.id}
                  className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg disabled:opacity-50 flex items-center gap-2"
                >
                  {saving === theme.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>Save Theme</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
