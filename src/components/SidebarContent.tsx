import React, { JSX } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Palette,
  Layout,
  Search,
  Layers,
  Square,
  Library,
  User,
  HelpCircle,
} from "lucide-react";
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
}

const navigationItems: NavigationItem[] = [
  { id: "browse", icon: <Search className="w-5 h-5" /> },
  { id: "colors", icon: <Palette className="w-5 h-5" /> },
  { id: "components", icon: <Layout className="w-5 h-5" /> },
  { id: "gradients", icon: <Layers className="w-5 h-5" /> },
  { id: "buttons", icon: <Square className="w-5 h-5" /> },
  { id: "saved themes", icon: <Library className="w-5 h-5" /> },
  { id: "help", icon: <HelpCircle className="w-5 h-5" /> },
  { id: "user", icon: <User className="w-5 h-5" /> },
];

export function SidebarContent({
  isSidebarCollapsed,
  handleTabChange,
  activeTab,
  setActiveTab,
  toggleSidebar,
  showToggle = true,
}: SidebarContentProps) {
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
        {navigationItems
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
    </div>
  );
}
