import { ThemeProvider } from "@/context/ThemeContext";
import { SettingsProvider } from "@/context/SettingsContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.windpalette.com"),
  title: {
    default: "Documentation | WindPalette Theme Generator",
    template: "%s | WindPalette Docs",
  },
  description:
    "Documentation for WindPalette - Learn how to create beautiful color themes, generate scales, and customize your design system.",
  keywords: [
    "theme generator docs",
    "WindPalette documentation",
    "color palette guide",
    "tailwind css documentation",
    "theme customization",
    "design system guide",
  ],
  authors: [{ name: "WindPalette Team" }],
  creator: "WindPalette Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.windpalette.com/docs",
    siteName: "WindPalette Docs",
    title: "WindPalette Documentation - Theme Generator Guide",
    description: "Complete guide to using WindPalette Theme Generator",
    images: [
      {
        url: "/docs-og-image.png",
        width: 1200,
        height: 630,
        alt: "WindPalette Docs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WindPalette Documentation - Theme Generator Guide",
    description: "Complete guide to using WindPalette Theme Generator",
    images: ["/docs-twitter-image.png"],
    creator: "@windpalette",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <ThemeProvider initialVisibleColors={3}>{children}</ThemeProvider>
    </SettingsProvider>
  );
}
