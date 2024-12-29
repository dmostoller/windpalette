"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ColorPicker from "@/components/ColorPicker";
import ColorScale from "@/components/ColorScale";
import PreviewComponents from "@/components/PreviewComponents";
import CopyStatusColorsButton from "@/components/CopyStatusColorsButton";
import CopyGradientsButton from "@/components/CopyGradientsButton";
import { ShareThemeModal } from "@/components/ShareThemeModal";
import AuthButton from "@/components/buttons/AuthButton";
import PlusButton from "@/components/buttons/PlusButton";
import {
  ChevronLeft,
  Palette,
  Layout,
  Save,
  Search,
  Layers,
  Square,
  Library,
  User,
  Share,
  HelpCircle,
} from "lucide-react";
import HelpSection from "@/components/HelpSection";
import PreviewButton from "@/components/PreviewButton";
import GradientPreview from "@/components/GradientPreview";
import BrowseColors from "@/components/BrowseColors";
import { SaveThemeModal } from "@/components/SaveThemeModal";
import ThemeSettings from "@/components/user/ThemeSettings";
import { ThemesList } from "@/components/ThemesList";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import Link from "next/link";
import UserPage from "@/components/user/UserPage";
import Image from "next/image";
import { DemoButton } from "@/components/buttons/DemoButton";
import { GenerateRandomThemeButton } from "@/components/buttons/GenerateRandomThemeButton";
import { useSettings } from "@/hooks/useSettings";
import { DefaultTab } from "@/types/settings";

export default function Home() {
  const { data: session } = useSession();
  const { settings, updateSettings } = useSettings();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { colors, showColor, hideColor, gradients, visibleColors } = useTheme();
  const [activeTab, setActiveTab] = useState<DefaultTab>(settings.defaultTab);
  const isSidebarCollapsed = settings.sidebarState === "collapsed";

  const toggleSidebar = () => {
    updateSettings({
      sidebarState: isSidebarCollapsed ? "expanded" : "collapsed",
    });
  };

  // Sync with settings.defaultTab changes
  useEffect(() => {
    setActiveTab(settings.defaultTab);
  }, [settings.defaultTab]);

  const handleTabChange = (tabId: DefaultTab) => {
    setActiveTab(tabId);
  };

  const navigationItems = [
    { id: "browse" as const, icon: <Search className="w-5 h-5" /> },
    { id: "colors" as const, icon: <Palette className="w-5 h-5" /> },
    { id: "components" as const, icon: <Layout className="w-5 h-5" /> },
    { id: "gradients" as const, icon: <Layers className="w-5 h-5" /> },
    { id: "buttons" as const, icon: <Square className="w-5 h-5" /> },
    { id: "saved themes" as const, icon: <Library className="w-5 h-5" /> },
    { id: "help" as const, icon: <HelpCircle className="w-5 h-5" /> },
    {
      id: "user" as const,
      icon: <User className="w-5 h-5" />,
      hidden: !session?.user,
    },
  ];

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
      <motion.nav
        layout
        className={`h-screen bg-[var(--card-background)] border-r border-[var(--card-border)] px-3 py-4 flex flex-col`}
        animate={{
          width: isSidebarCollapsed ? 64 : 256, // 16 -> 64px, 64 -> 256px
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
      >
        <div className="flex items-center justify-between mb-8 relative">
          <motion.div
            className="flex flex-col"
            animate={{
              opacity: isSidebarCollapsed ? 0 : 1,
              width: isSidebarCollapsed ? 0 : "auto",
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <div className="flex items-center gap-2">
              <Image
                src="/windpalletelogo.png"
                alt="WindPallete Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <motion.h1
                layout
                className="font-bold text-xl whitespace-nowrap overflow-hidden"
                animate={{
                  opacity: isSidebarCollapsed ? 0 : 1,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                WindPallete
              </motion.h1>
            </div>
            <motion.p
              layout
              className="font-bold text-sm text-gray-600 whitespace-nowrap overflow-hidden mt-2"
              animate={{
                opacity: isSidebarCollapsed ? 0 : 1,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              Tailwind Color Theme Builder
            </motion.p>
          </motion.div>
          <motion.button
            layout
            onClick={toggleSidebar}
            className={`min-w-[32px] flex items-center justify-center`}
          >
            <motion.div
              animate={{
                rotate: isSidebarCollapsed ? 180 : 0,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <ChevronLeft />
            </motion.div>
          </motion.button>
        </div>
        <div className="space-y-4 flex-1">
          {navigationItems
            .filter((item) => !item.hidden) // Filter out hidden items
            .map((item) => (
              <motion.button
                layout
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center rounded-lg
          ${isSidebarCollapsed ? "justify-center px-3 py-2" : "justify-start px-4 py-3"}
          ${activeTab === item.id ? "bg-[var(--primary)] text-white" : "hover:bg-[var(--primary-hover)] hover:bg-opacity-10"}`}
              >
                <div className="w-6 h-6 flex items-center justify-center">{item.icon}</div>
                <motion.span
                  layout
                  className={`capitalize overflow-hidden whitespace-nowrap ${isSidebarCollapsed ? "" : "ml-3"}`}
                  animate={{
                    opacity: isSidebarCollapsed ? 0 : 1,
                    x: isSidebarCollapsed ? -10 : 0,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  {item.id}
                </motion.span>
              </motion.button>
            ))}
        </div>
        <div>
          <AuthButton isSidebarCollapsed={isSidebarCollapsed} setActiveTab={setActiveTab} />
          <motion.div
            className="mt-4 pt-4 border-t border-[var(--card-border)]"
            animate={{
              opacity: isSidebarCollapsed ? 0 : 1,
            }}
          >
            <div className="flex justify-center gap-2 text-sm text-[var(--muted-foreground)]">
              <Link href="/docs" className="hover:text-[var(--foreground)]">
                Docs
              </Link>
              <Link href="/about" className="hover:text-[var(--foreground)]">
                About
              </Link>
              <Link href="/privacy" className="hover:text-[var(--foreground)]">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-[var(--foreground)]">
                Terms
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-screen-2xl mx-auto">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSaveModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 border border-[var(--card-border)] hover:bg-[var(--card-background)] rounded-lg"
              >
                <Save className="w-4 h-4" />
                Save Theme
              </button>
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
              <button
                type="button"
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 border border-[var(--card-border)] hover:bg-[var(--card-background)] rounded-lg"
              >
                <Share className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "colors" && (
            <div className="space-y-8">
              <GenerateRandomThemeButton />

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

          {activeTab === "browse" && <BrowseColors />}

          {activeTab === "saved themes" && <ThemesList />}

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
