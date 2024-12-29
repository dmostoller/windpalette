"use client";

import { useState } from "react";
import {
  Check,
  Copy,
  Edit,
  Trash,
  Settings,
  Loader2,
  MessageSquare,
  LogOut,
  Plus,
  ChevronRight,
  BookOpen,
  Bell,
  Search,
  Heart,
  Share2,
  Flag,
  Calendar,
  Users,
  Star,
  Download,
  Mail,
} from "lucide-react";

const BUTTON_VARIANTS = [
  { name: "Primary", color: "primary" },
  { name: "Secondary", color: "secondary" },
  { name: "Accent", color: "accent" },
  { name: "Info", color: "info" },
  { name: "Success", color: "success" },
  { name: "Warning", color: "warning" },
  { name: "Error", color: "error" },
  { name: "Neutral", color: "neutral" },
  { name: "Icons", color: "icons" },
] as const;

export default function PreviewButton() {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const generateButtonClasses = (
    color: string,
    variant: "default" | "outline" | "disabled" | "icon" = "default",
    name: string,
  ) => {
    const classes = {
      default: `export function ${name}Button() {
  return (
    <button
      className="bg-${color} text-white px-4 py-2 rounded-md font-medium
        transition-all duration-200 
        hover:bg-${color}-dark 
        focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2 
        active:bg-${color}-700"
    >
      ${name} Button
    </button>
  );
}`,

      outline: `export function ${name}OutlineButton() {
  return (
    <button
      className="border-2 border-${color} text-${color} bg-transparent 
        px-4 py-2 rounded-md font-medium
        transition-all duration-200 
        hover:bg-${color}
        hover:text-white
        focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2 
        active:bg-${color}/20"
    >
      Outline ${name}
    </button>
  );
}`,

      disabled: `export function ${name}DisabledButton() {
  return (
    <button
      disabled
      className="bg-${color}/10 text-${color} 
        px-4 py-2 rounded-md font-medium
        transition-all duration-200 
        cursor-not-allowed"
    >
      Disabled ${name}
    </button>
  );
}`,

      icon: `import { Edit, Trash, Download } from 'lucide-react';

export function IconButtons() {
  return (
    <div className="flex gap-2">
      <button className="p-2 rounded-lg bg-${color} hover:bg-${color}-dark text-white">
        <Edit size={22} />
      </button>
      <button className="p-2 rounded-lg bg-${color} hover:bg-${color}-dark text-white">
        <Trash size={22} />
      </button>
      <button className="p-2 rounded-lg bg-${color} hover:bg-${color}-dark text-white">
        <Download size={22} />
      </button>
    </div>
  );
}`,
    };

    return classes[variant];
  };

  const copyToClipboard = async (name: string, color: string) => {
    let textToCopy = "";

    if (color === "icons") {
      textToCopy = [
        `import { Loader2 } from 'lucide-react';\n`,
        generateButtonClasses(color, "icon", name),
        `\nexport function OutlineIconButton() {
  return (
    <div className="flex gap-2">
      <button className="p-2 rounded-full border-2 border-${color} text-${color} bg-transparent hover:bg-${color} hover:text-white">
        <ChevronRight size={22} />
      </button>
    </div>
  );
}`,
        `\nexport function LoadingButton() {
  return (
    <button
      disabled
      className="flex items-center justify-center gap-2 bg-${color} text-white px-4 py-2 rounded-md font-medium
        transition-all duration-200 disabled:opacity-50"
    >
      <Loader2 size={16} className="animate-spin" />
      Loading
    </button>
  );
}`,
      ].join("\n");
    } else {
      textToCopy = [
        generateButtonClasses(color, "default", name),
        generateButtonClasses(color, "outline", name),
        generateButtonClasses(color, "disabled", name),
      ].join("\n\n");
    }

    await navigator.clipboard.writeText(textToCopy);
    const key = `${name}-${color}`;
    setCopiedStates({ ...copiedStates, [key]: true });
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {BUTTON_VARIANTS.map(({ name, color }) => (
          <div
            key={color}
            className="bg-[var(--card-background)] rounded-lg p-4 space-y-3 border border-[var(--card-border)]"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-base font-semibold text-gray-700 dark:text-gray-200">{name}</h4>
              <button
                onClick={() => copyToClipboard(name, color)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {copiedStates[`${name}-${color}`] ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>

            <div className="flex flex-col space-y-3">
              {color === "icons" ? (
                <>
                  <div className="flex gap-2 justify-center flex-wrap">
                    <button className="p-2 rounded-lg bg-primary hover:bg-primary-dark text-white">
                      <Edit size={22} />
                    </button>
                    <button className="p-2 rounded-lg bg-primary hover:bg-primary-dark text-white">
                      <Trash size={22} />
                    </button>
                    <button className="p-2 rounded-lg bg-primary hover:bg-primary-dark text-white">
                      <Download size={22} />
                    </button>
                    <button className="p-2 rounded-lg bg-secondary hover:bg-secondary-dark text-white">
                      <Settings size={22} />
                    </button>
                    <button className="p-2 rounded-lg bg-secondary hover:bg-secondary-dark text-white">
                      <MessageSquare size={22} />
                    </button>
                    <button className="p-2 rounded-lg bg-secondary hover:bg-secondary-dark text-white">
                      <Mail size={22} />
                    </button>
                    <button className="p-2 rounded-lg bg-accent hover:bg-accent-dark text-white">
                      <LogOut size={22} />
                    </button>
                    <button className="p-2 rounded-lg bg-accent hover:bg-accent-dark text-white">
                      <Plus size={22} />
                    </button>
                    <button className="p-2 rounded-lg bg-accent hover:bg-accent-dark text-white">
                      <Star size={22} />
                    </button>
                    <button className="p-2 rounded-full border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white">
                      <ChevronRight size={22} />
                    </button>
                    <button className="p-2 rounded-full border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white">
                      <BookOpen size={22} />
                    </button>
                    <button className="p-2 rounded-full border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white">
                      <Calendar size={22} />
                    </button>
                    <button className="p-2 rounded-full border-2 border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-white">
                      <Bell size={22} />
                    </button>
                    <button className="p-2 rounded-full border-2 border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-white">
                      <Search size={22} />
                    </button>
                    <button className="p-2 rounded-full border-2 border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-white">
                      <Users size={22} />
                    </button>
                    <button className="p-2 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white">
                      <Heart size={22} />
                    </button>
                    <button className="p-2 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white">
                      <Share2 size={22} />
                    </button>
                    <button className="p-2 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white">
                      <Flag size={22} />
                    </button>
                  </div>
                  <button
                    disabled
                    className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-md font-medium
                      transition-all duration-200 disabled:opacity-50"
                  >
                    <Loader2 size={16} className="animate-spin" />
                    Loading
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={`bg-${color} text-white px-4 py-2 rounded-md font-medium
                      transition-all duration-200 
                      hover:bg-${color}-dark 
                      focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2 
                      active:bg-${color}-700`}
                  >
                    {name} Button
                  </button>

                  <button
                    className={`border-2 border-${color} text-${color} bg-transparent 
                      px-4 py-2 rounded-md font-medium
                      transition-all duration-200 
                      hover:bg-${color}
                      hover:text-white
                      focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2 
                      active:bg-${color}/20`}
                  >
                    Outline {name}
                  </button>

                  <button
                    disabled
                    className={`bg-${color}/10 text-${color} 
                      px-4 py-2 rounded-md font-medium
                      transition-all duration-200 
                      cursor-not-allowed`}
                  >
                    Disabled {name}
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
