"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { decodeThemeData } from "@/utils/share";
import PreviewComponents from "@/components/PreviewComponents";
import ColorScale from "@/components/ColorScale";
import PreviewButton from "@/components/PreviewButton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const { setThemeColors, setThemeGradients } = useTheme();
  const prevThemeRef = useRef<string | null>(null);
  const [visibleColors, setVisibleColors] = useState<number>(3);

  const currentTheme = searchParams.get("theme");

  useEffect(() => {
    if (!currentTheme || currentTheme === prevThemeRef.current) return;

    const decodedTheme = decodeThemeData(currentTheme);
    console.log("Setting theme:", decodedTheme);

    setThemeColors({
      colors: {
        primary: decodedTheme.colors.primary,
        secondary: decodedTheme.colors.secondary || decodedTheme.colors.primary,
        accent: decodedTheme.colors.accent || decodedTheme.colors.primary,
      },
      visibleColors: decodedTheme.visibleColors,
    });
    setThemeGradients(
      {
        primary: decodedTheme.colors.primary,
        secondary: decodedTheme.colors.secondary || decodedTheme.colors.primary,
        accent: decodedTheme.colors.accent || decodedTheme.colors.primary,
      },
      decodedTheme.gradients,
    );

    setVisibleColors(decodedTheme.visibleColors);
    prevThemeRef.current = currentTheme;
  }, [currentTheme, setThemeColors, setThemeGradients]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main className="max-w-screen mx-auto space-y-16 mb-20">
        {/* Hero Section */}
        <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `
                linear-gradient(45deg, 
                  var(--primary) 0%, 
                  var(--secondary) 50%, 
                  var(--accent) 100%
                )
              `,
              filter: "blur(100px)",
            }}
          />
          {/* Navigation */}
          <div className="absolute top-0 left-0 right-0 z-20">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
              <Link
                href="/app"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Generator
              </Link>
            </div>
          </div>
          <div className="relative z-10 text-center mx-auto px-4">
            <motion.h1
              className="text-6xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Your Theme
              <span className="text-[var(--primary)]"> Preview </span>
            </motion.h1>

            <motion.p
              className="text-xl mb-8 text-[var(--foreground)] opacity-80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              See how your color theme looks in a real-world application context
            </motion.p>

            <motion.div
              className="flex gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                href="/app"
                className="px-8 py-3 bg-gradient-to-t from-[var(--primary-dark)] to-[var(--primary)] text-white rounded-lg hover:scale-110 transition-all duration-300"
              >
                Create Your Own
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Preview Components */}
        <section className="space-y-4 max-w-screen-xl mx-auto p-4">
          <h2 className="text-2xl font-bold">Components</h2>
          <div>
            <PreviewComponents />
          </div>
        </section>

        {/* Color Scales */}
        <section className="space-y-4 max-w-screen-xl mx-auto p-4">
          <h2 className="text-2xl font-bold">Color Scales</h2>
          <div className="bg-[var(--card-background)] border border-[var(--card-border)] rounded-xl p-6">
            <ColorScale visibleColors={visibleColors} />
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-4 max-w-screen-xl mx-auto p-4">
          <h2 className="text-2xl font-bold">Buttons</h2>
          <div>
            <PreviewButton />
          </div>
        </section>
      </main>
    </div>
  );
}
