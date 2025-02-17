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

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to save theme");
        return;
      }

      // Refresh themes
      const updatedRes = await fetch("/api/themes/community");
      const updated = await updatedRes.json();
      setThemes(updated);
      toast.success("Theme saved successfully");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save theme");
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
    <div className="max-w-5xl mx-auto p-4">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Community Themes</h1>
        <p className="text-[var(--muted-foreground)] mb-6 max-w-2xl">
          Discover and save themes created by the community. Each theme can be previewed, saved to your
          personal archive, or used directly in your projects. Want to share your own themes? Publish them
          from your archive to inspire others.
        </p>
        <div className="flex gap-4 items-center p-4 bg-[var(--card)] rounded-lg border border-[var(--card-border)]">
          <Palette className="w-5 h-5 text-[var(--primary)]" />
          <p className="text-sm">
            <span className="font-medium">Pro tip:</span> Click the buttons to see how a theme looks in
            real-time, demo it with shadcn components, or save it to your archive for later use.
          </p>
        </div>
      </div>

      {/* Theme List */}
      <div className="space-y-4">
        {themes.map((theme) => (
          <motion.div
            key={theme.id}
            className="py-4 px-6 bg-[var(--card-background)] rounded-lg border-transparent border transition-colors"
            style={
              {
                "--hover-border-color":
                  theme.colors.find((c) => c.name === "primary")?.value || "var(--primary)",
              } as React.CSSProperties
            }
            whileHover={{
              borderColor: "var(--hover-border-color)",
              y: -2,
            }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Author and Theme Info */}
              <div className="flex items-start gap-4 md:w-1/3">
                <div
                  className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2"
                  style={{
                    borderColor:
                      theme.colors.find((c) => c.name === "primary")?.value || "var(--card-border)",
                  }}
                >
                  {theme.author.image ? (
                    <Image
                      src={theme.author.image}
                      alt={theme.author.name || "Author"}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-foreground text-xl font-medium"
                      style={{
                        borderColor:
                          theme.colors.find((c) => c.name === "primary")?.value || "var(--primary)",
                      }}
                    >
                      {theme.author.name
                        ? theme.author.name
                            .split(" ")
                            .map((name) => name[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase() || "?"
                        : "?"}{" "}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl font-semibold leading-tight tracking-tight">{theme.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-[var(--muted-foreground)]">
                      by {theme.author.name || "Anonymous"}
                    </p>
                    <span className="text-[var(--muted-foreground)]">&middot;</span>
                    <p className="text-sm font-medium">
                      {theme.saveCount} {theme.saveCount === 1 ? "save" : "saves"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Colors Preview */}
              <div className="flex-1 flex items-center gap-3">
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
                          className="w-24 h-28 rounded-lg cursor-help"
                          style={{ backgroundColor: color.value }}
                        />
                        {theme.gradients?.some((g) => g.color === color.value && g.active) && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--card-background)] rounded-full flex items-center justify-center">
                            <Blend className="w-3 h-3 text-[var(--foreground)]" />
                          </div>
                        )}
                      </div>
                    </Tooltip>
                  ))
                ) : (
                  <div className="text-sm text-[var(--muted-foreground)]">No colors defined</div>
                )}
              </div>

              {/* Actions */}
              <div className="flex md:flex-col gap-2 justify-end md:w-36">
                <button
                  onClick={() => handlePreview(theme)}
                  style={{
                    borderColor:
                      theme.colors.find((c) => c.name === "primary")?.value || "var(--button-bordercolor)",
                    ["--hover-color" as string]:
                      theme.colors.find((c) => c.name === "primary")?.value || "var(--primary)",
                  }}
                  className="p-2 border rounded-lg transition-colors flex items-center justify-center gap-2 hover:bg-[var(--hover-color)] hover:text-white group"
                >
                  <Eye className="w-4 h-4" />
                  <span className="hidden md:inline">Preview</span>
                </button>

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
                  className="p-2 border rounded-lg transition-colors flex items-center justify-center gap-2 hover:bg-[var(--hover-color)] hover:text-white group"
                  style={{
                    borderColor:
                      theme.colors.find((c) => c.name === "secondary")?.value || "var(--button-bordercolor)",
                    ["--hover-color" as string]:
                      theme.colors.find((c) => c.name === "secondary")?.value || "var(--secondary)",
                  }}
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
                      <Eye
                        className="w-2 h-2"
                        style={{
                          color:
                            theme.colors.find((c) => c.name === "secondary")?.value || "var(--secondary)",
                        }}
                      />
                    </div>
                  </div>
                  <span className="hidden md:inline">shadcn</span>
                </a>

                <button
                  onClick={() => handleSave(theme.id)}
                  disabled={!session || saving === theme.id}
                  className="p-2 border rounded-lg transition-colors flex items-center justify-center gap-2 hover:bg-[var(--hover-color)] hover:text-white group"
                  style={{
                    borderColor:
                      theme.colors.find((c) => c.name === "accent")?.value || "var(--button-bordercolor)",
                    ["--hover-color" as string]:
                      theme.colors.find((c) => c.name === "accent")?.value || "var(--accent)",
                  }}
                >
                  {saving === theme.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span className="hidden md:inline">Save</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
