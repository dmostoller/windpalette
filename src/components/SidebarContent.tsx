import React, { JSX } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Palette } from "lucide-react";
import {
  UserIcon,
  LayersIcon,
  SearchIcon,
  CircleHelpIcon,
  LayoutPanelTopIcon,
  ArchiveIcon,
  SquareStackIcon,
} from "./icons";
import AuthButton from "./buttons/AuthButton";
import { DefaultTab } from "@/types/settings";

type NavigationItem = {
  id: DefaultTab;
  icon: JSX.Element;
  hidden?: boolean;
};

interface SidebarContentProps {
  isSidebarCollapsed: boolean;
  handleTabChange: (id: DefaultTab) => void;
  activeTab: DefaultTab;
  setActiveTab: (tab: DefaultTab) => void;
  toggleSidebar?: () => void;
  showToggle?: boolean;
  isLoggedIn?: boolean;
}

const navigationItems: NavigationItem[] = [
  { id: "browse", icon: <SearchIcon /> },
  { id: "colors", icon: <Palette className="w-5 h-5" /> },
  { id: "components", icon: <LayoutPanelTopIcon /> },
  { id: "gradients", icon: <LayersIcon /> },
  { id: "buttons", icon: <SquareStackIcon /> },
  { id: "saved themes", icon: <ArchiveIcon /> },
  { id: "help", icon: <CircleHelpIcon /> },
  { id: "user", icon: <UserIcon /> },
];

export function SidebarContent({
  isSidebarCollapsed,
  handleTabChange,
  activeTab,
  setActiveTab,
  toggleSidebar,
  showToggle = true,
  isLoggedIn = false,
}: SidebarContentProps) {
  const visibleNavigationItems = navigationItems.filter(
    (item) => !item.hidden && (item.id !== "user" || isLoggedIn),
  );
  return (
    <div className="h-full flex flex-col">
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
              src="/windpalettelogo.png"
              alt="WindPalette Logo"
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
              WindPalette
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
        {showToggle && toggleSidebar && (
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
        )}
      </div>

      <div className="space-y-4 flex-1">
        {visibleNavigationItems
          .filter((item) => !item.hidden)
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
        <AnimatePresence mode="wait">
          {!isSidebarCollapsed && (
            <motion.div
              className="mt-4 pt-4 border-t border-[var(--card-border)]"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: {
                  height: { delay: 0, duration: 0.4 },
                  opacity: { delay: 0.4, duration: 0.2 },
                },
              }}
              exit={{
                opacity: 0,
                height: 0,
                transition: {
                  opacity: { duration: 0 },
                  height: { duration: 0 },
                },
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
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
