"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useTheme } from "@/context/ThemeContext";
import { ThemeColors, CommunityTheme, ThemeColorUpdate } from "@/types/theme";
import { Eye, Save, Loader2, Blend, Palette } from "lucide-react";
import { Tooltip } from "@/components/Tooltip";
import { toast } from "sonner";
import Image from "next/image";

export default function CommunityPage() {
  const [themes, setThemes] = useState<CommunityTheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const { data: session } = useSession();
  const { setThemeColors } = useTheme();

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const res = await fetch("/api/themes/community");
        if (!res.ok) throw new Error("Failed to fetch themes");
        const data = await res.json();
        setThemes(data);
      } catch (error) {
        toast.error("Failed to load community themes");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  console.log(themes);

  const handleSave = async (themeId: string) => {
    if (!session) {
      toast.error("Please sign in to save themes");
      return;
    }

    setSaving(themeId);
    try {
      const res = await fetch("/api/themes/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ themeId }),
      });

      if (!res.ok) throw new Error("Failed to save theme");

      // Refresh themes
      const updatedRes = await fetch("/api/themes/community");
      const updated = await updatedRes.json();
      setThemes(updated);
      toast.success("Theme saved successfully");
    } catch (error) {
      toast.error("Failed to save theme");
      console.error(error);
    } finally {
      setSaving(null);
    }
  };

  const handlePreview = (theme: CommunityTheme) => {
    const themeColors: ThemeColors = {
      primary: theme.colors.find((c) => c.name === "primary")?.value || "",
      secondary: theme.colors.find((c) => c.name === "secondary")?.value || "",
      accent: theme.colors.find((c) => c.name === "accent")?.value || "",
    };

    const update: ThemeColorUpdate = {
      colors: themeColors,
      gradients: theme.gradients.filter((g) => g.active).map((g) => g.color),
      visibleColors: theme.visibleColors,
    };

    setThemeColors(update);
    toast.success("Theme preview applied");
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
            className="p-6 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)] hover:border-[var(--primary)] transition-colors"
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white">
                {theme.author.name?.[0] || "?"}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{theme.name}</h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  by {theme.author.name || "Anonymous"}
                </p>
              </div>
              <div className="flex gap-1.5">
                <Tooltip content="Preview Theme">
                  <button
                    onClick={() => handlePreview(theme)}
                    className="p-1.5 hover:bg-[var(--card)] rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </Tooltip>
                <Tooltip content="Preview in Shadcn/ui">
                  <a
                    href={`/shadcn?${new URLSearchParams({
                      primary: theme.colors.find((c) => c.name === "primary")?.value || "",
                      ...(theme.visibleColors >= 2 && {
                        secondary: theme.colors.find((c) => c.name === "secondary")?.value || "",
                      }),
                      ...(theme.visibleColors >= 3 && {
                        accent: theme.colors.find((c) => c.name === "accent")?.value || "",
                      }),
                    }).toString()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 hover:bg-[var(--card)] rounded-lg transition-colors inline-flex items-center justify-center"
                  >
                    <div className="relative">
                      <Image
                        src="https://github.com/shadcn.png"
                        alt="shadcn/ui"
                        width={16}
                        height={16}
                        className="rounded-full"
                      />
                      <div className="absolute -right-1 -bottom-1 bg-[var(--card-background)] rounded-full p-0.5">
                        <Palette className="w-2 h-2 text-[var(--primary)]" />
                      </div>
                    </div>
                  </a>
                </Tooltip>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              {Array.isArray(theme.colors) && theme.colors.length > 0 ? (
                theme.colors.map((color) => (
                  <Tooltip
                    key={color.name}
                    content={`${color.name} (${color.value})${
                      theme.gradients?.some((g) => g.color === color.value && g.active)
                        ? " • in gradient"
                        : ""
                    }`}
                  >
                    <div className="relative">
                      <div
                        className="w-12 h-12 rounded-lg cursor-help"
                        style={{ backgroundColor: color.value }}
                      />
                      {theme.gradients?.some((g) => g.color === color.value && g.active) && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--card-background)] rounded-full flex items-center justify-center">
                          <Blend className="w-3 h-3 text-[var(--primary)]" />
                        </div>
                      )}
                    </div>
                  </Tooltip>
                ))
              ) : (
                <div className="text-sm text-[var(--muted-foreground)]">No colors defined</div>
              )}
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-[var(--muted-foreground)]">{theme.saveCount} saves</span>
              <button
                onClick={() => handleSave(theme.id)}
                disabled={!session || saving === theme.id}
                className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg disabled:opacity-50 flex items-center gap-2 hover:bg-[var(--primary-dark)] transition-colors"
              >
                {saving === theme.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>Save Theme</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
