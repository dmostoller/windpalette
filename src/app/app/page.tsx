"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import ColorPicker from "@/components/ColorPicker";
import ColorScale from "@/components/ColorScale";
import PreviewComponents from "@/components/PreviewComponents";
import CopyStatusColorsButton from "@/components/CopyStatusColorsButton";
import CopyGradientsButton from "@/components/CopyGradientsButton";
import { ShareThemeModal } from "@/components/ShareThemeModal";
import PlusButton from "@/components/buttons/PlusButton";
import { Menu, Save, Share } from "lucide-react";
import HelpSection from "@/components/HelpSection";
import PreviewButton from "@/components/PreviewButton";
import GradientPreview from "@/components/GradientPreview";
import BrowseColors from "@/components/BrowseColors";
import { SaveThemeModal } from "@/components/SaveThemeModal";
import ThemeSettings from "@/components/user/ThemeSettings";
import { ThemesList } from "@/components/ThemesList";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import UserPage from "@/components/user/UserPage";
import { DemoButton } from "@/components/buttons/DemoButton";
import { GenerateRandomThemeButton } from "@/components/GenerateRandomTheme";
import { useSettings } from "@/hooks/useSettings";
import { DefaultTab } from "@/types/settings";
import { SunIcon, MoonIcon, CpuIcon } from "@/components/icons";
import { Drawer } from "vaul";
import { SidebarContent } from "@/components/SidebarContent";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import GenerateAiPalette from "@/components/GenerateAiPalette";
import { ShadcnDemoButton } from "@/components/buttons/ShadcnDemoButton";
import { Tooltip } from "@/components/Tooltip";
import CommunityPage from "@/components/CommunityPage";

function AppContent() {
  const { data: session } = useSession();
  const { settings, updateSettings } = useSettings();
  const searchParams = useSearchParams();
  const prompt = searchParams.get("prompt");
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { colors, showColor, hideColor, gradients, visibleColors } = useTheme();
  const [activeTab, setActiveTab] = useState<DefaultTab>(settings.defaultTab);
  const isSidebarCollapsed = settings.sidebarState === "collapsed";
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeGenerationTab, setActiveGenerationTab] = useState<"ai" | "random">("ai");

  type ThemeMode = "light" | "dark" | "system";
  const [theme, setTheme] = useState<ThemeMode>("system");

  const toggleSidebar = () => {
    updateSettings({
      sidebarState: isSidebarCollapsed ? "expanded" : "collapsed",
    });
  };

  useEffect(() => {
    setTheme(settings.themeMode);
    // console.log("Theme Mode", settings.themeMode);
  }, [settings.themeMode]);

  useEffect(() => {
    setActiveTab(settings.defaultTab);
  }, [settings.defaultTab]);

  const cycleTheme = () => {
    const modes: ThemeMode[] = ["light", "dark", "system"];
    const currentIndex = modes.indexOf(theme);
    const nextTheme = modes[(currentIndex + 1) % modes.length];

    setTheme(nextTheme);
    if (nextTheme === "system") {
      // Remove class to let system preference take over
      document.documentElement.classList.remove("dark", "light");
    } else {
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(nextTheme);
    }
  };

  const handleTabChange = (tabId: DefaultTab) => {
    setActiveTab(tabId);
  };

  const handleSaveTheme = async (name: string) => {
    const theme = {
      name,
      colors: {
        primary: colors.primary,
        ...(visibleColors >= 2 && { secondary: colors.secondary }),
        ...(visibleColors >= 3 && { accent: colors.accent }),
      },
      gradients,
    };

    await fetch("/api/themes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(theme),
    });
  };

  return (
    <div className="flex h-screen bg-[var(--background)]">
      {/* Desktop Sidebar - hidden on mobile */}
      <motion.nav
        layout
        className={`hidden md:flex h-screen bg-[var(--card-background)] border-r border-[var(--card-border)] px-3 py-4 flex-col`}
        animate={{
          width: isSidebarCollapsed ? 64 : 256,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <SidebarContent
          isSidebarCollapsed={isSidebarCollapsed}
          handleTabChange={handleTabChange}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          toggleSidebar={toggleSidebar}
          isLoggedIn={!!session?.user}
        />
      </motion.nav>

      {/* Mobile Drawer - visible only on mobile */}
      <div className="md:hidden">
        <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <Drawer.Trigger className="fixed bottom-4 left-4 p-3 rounded-full border border-[var(--card-border)] bg-[var(--primary)] text-white shadow-lg hover:bg-[var(--primary-dark)] transition-all z-20">
            <Menu className="w-8 h-8" />
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="bg-[var(--card-background)] flex flex-col rounded-t-[10px] h-[96vh] mt-24 fixed bottom-0 left-0 right-0 z-50">
              <div className="p-4 bg-[var(--card-background)] rounded-t-[10px] flex-1">
                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-[var(--card-border)] mb-8" />
                <Drawer.Title asChild>
                  <VisuallyHidden>Navigation Menu</VisuallyHidden>
                </Drawer.Title>
                <SidebarContent
                  isSidebarCollapsed={false}
                  handleTabChange={handleTabChange}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  isLoggedIn={!!session?.user}
                  setIsDrawerOpen={setIsDrawerOpen}
                />
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-screen-2xl mx-auto">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg md:text-2xl font-bold capitalize">{activeTab}</h2>
            <div className="flex items-center gap-1 md:gap-4">
              <div className="relative group">
                <Tooltip content={`Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`}>
                  <button
                    onClick={cycleTheme}
                    className="border border-[var(--card-border)] hover:bg-[var(--card-background)] p-2 md:p-2.5 rounded-lg"
                    aria-label="Toggle theme"
                  >
                    {theme === "light" && <SunIcon />}
                    {theme === "dark" && <MoonIcon />}
                    {theme === "system" && <CpuIcon />}
                  </button>
                </Tooltip>
              </div>
              <Tooltip content={session?.user ? "Save Theme" : "Sign in to save themes"}>
                <button
                  onClick={() => setIsSaveModalOpen(true)}
                  disabled={!session?.user}
                  className="flex items-center gap-2 p-2 border border-[var(--card-border)] hover:bg-[var(--card-background)] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  <Save className="w-5 h-5" />
                  <span className="hidden md:inline">Save</span>
                </button>
              </Tooltip>
              <Tooltip content="Preview your theme">
                <DemoButton
                  colors={{
                    primary: (typeof colors.primary === "string"
                      ? colors.primary
                      : "value" in colors.primary
                        ? colors.primary.value
                        : "") as string,
                    ...(colors.secondary && {
                      secondary: (typeof colors.secondary === "string"
                        ? colors.secondary
                        : "value" in colors.secondary
                          ? colors.secondary.value
                          : "") as string,
                    }),
                    ...(colors.accent && {
                      accent: (typeof colors.accent === "string"
                        ? colors.accent
                        : "value" in colors.accent
                          ? colors.accent.value
                          : "") as string,
                    }),
                  }}
                  gradients={gradients}
                  visibleColors={visibleColors}
                />
              </Tooltip>
              <Tooltip content="Preview your theme on real shadcn/ui components">
                <ShadcnDemoButton
                  colors={{
                    primary: (typeof colors.primary === "string"
                      ? colors.primary
                      : "value" in colors.primary
                        ? colors.primary.value
                        : "") as string,
                    ...(colors.secondary && {
                      secondary: (typeof colors.secondary === "string"
                        ? colors.secondary
                        : "value" in colors.secondary
                          ? colors.secondary.value
                          : "") as string,
                    }),
                    ...(colors.accent && {
                      accent: (typeof colors.accent === "string"
                        ? colors.accent
                        : "value" in colors.accent
                          ? colors.accent.value
                          : "") as string,
                    }),
                  }}
                />
              </Tooltip>
              <Tooltip content="Share Theme">
                <button
                  type="button"
                  onClick={() => setIsShareModalOpen(true)}
                  className="flex items-center gap-2 p-2 border border-[var(--card-border)] hover:bg-[var(--card-background)] rounded-lg"
                >
                  <Share className="w-5 h-5" />
                  <span className="hidden md:inline">Share</span>
                </button>
              </Tooltip>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "create" && (
            <div className="space-y-8">
              <div className="space-y-6 p-4 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
                {/* Tabs */}
                <div className="flex space-x-1 border-b border-[var(--card-border)]">
                  <button
                    onClick={() => setActiveGenerationTab("ai")}
                    className={`px-4 py-2 text-sm font-medium -mb-px ${
                      activeGenerationTab === "ai"
                        ? "border-b-2 border-[var(--primary)] text-[var(--primary)]"
                        : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    Generate with AI
                  </button>
                  <button
                    onClick={() => setActiveGenerationTab("random")}
                    className={`px-4 py-2 text-sm font-medium -mb-px ${
                      activeGenerationTab === "random"
                        ? "border-b-2 border-[var(--primary)] text-[var(--primary)]"
                        : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    Generate with Options
                  </button>
                </div>

                {/* Tab Content */}
                {activeGenerationTab === "ai" ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">AI Theme Generation</h3>
                      <div className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                        Fast & Easy
                      </div>
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Simply describe your desired theme using keywords, and AI will generate a matching color
                      palette.
                    </p>
                    <GenerateAiPalette initialPrompt={prompt || ""} />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">Customer Theme Generation</h3>
                      <div className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                        Explore & Discover
                      </div>
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Fine-tune your theme by adjusting specific parameters for more controlled results.
                    </p>
                    <GenerateRandomThemeButton />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                <ColorPicker colorKey="primary" label="Primary Color" />

                {visibleColors < 2 ? (
                  <div className="h-60">
                    <PlusButton onClick={showColor} />
                  </div>
                ) : (
                  <ColorPicker colorKey="secondary" label="Secondary Color" canRemove onRemove={hideColor} />
                )}

                {visibleColors < 3 ? (
                  <div className="h-60">{visibleColors === 2 && <PlusButton onClick={showColor} />}</div>
                ) : (
                  <ColorPicker colorKey="accent" label="Accent Color" canRemove onRemove={hideColor} />
                )}
              </div>
              <div className="p-6 border border-[var(--card-border)] rounded-lg bg-[var(--card-background)] shadow-sm">
                <ColorScale visibleColors={visibleColors} />
              </div>
            </div>
          )}

          {activeTab === "components" && (
            <div className="space-y-8">
              <PreviewComponents />
            </div>
          )}
          {activeTab === "buttons" && (
            <>
              <div className="flex justify-start items-center mb-6 px-4">
                <CopyStatusColorsButton />
              </div>
              <PreviewButton />
            </>
          )}

          {activeTab === "gradients" && (
            <>
              <div className="flex justify-start items-center mb-6 px-4">
                <CopyGradientsButton />
              </div>
              <GradientPreview />
            </>
          )}

          {activeTab === "colors" && <BrowseColors />}

          {activeTab === "archive" && <ThemesList />}

          {activeTab === "community" && (
            <div className="space-y-8">
              <CommunityPage />
            </div>
          )}

          {activeTab === "help" && <HelpSection />}

          {activeTab === "user" && session?.user && <UserPage />}

          {activeTab === "settings" && (
            <div className="p-6 border border-[var(--card-border)] rounded-lg bg-[var(--card-background)]">
              <ThemeSettings />
            </div>
          )}

          <SaveThemeModal
            isOpen={isSaveModalOpen}
            onClose={() => setIsSaveModalOpen(false)}
            onSave={handleSaveTheme}
          />
          <ShareThemeModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-[var(--background)]">
          <div className="animate-pulse text-lg text-[var(--muted-foreground)]">Loading...</div>
        </div>
      }
    >
      <AppContent />
    </Suspense>
  );
}
