import { ThemeProvider } from "@/context/ThemeContext";
import { SettingsProvider } from "@/context/SettingsContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.windpallete.com"),
  title: {
    default: "Documentation | WindPallete Theme Generator",
    template: "%s | WindPallete Docs",
  },
  description:
    "Documentation for WindPallete - Learn how to create beautiful color themes, generate scales, and customize your design system.",
  keywords: [
    "theme generator docs",
    "WindPallete documentation",
    "color palette guide",
    "tailwind css documentation",
    "theme customization",
    "design system guide",
  ],
  authors: [{ name: "WindPallete Team" }],
  creator: "WindPallete Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.windpallete.com/docs",
    siteName: "WindPallete Docs",
    title: "WindPallete Documentation - Theme Generator Guide",
    description: "Complete guide to using WindPallete Theme Generator",
    images: [
      {
        url: "/docs-og-image.png",
        width: 1200,
        height: 630,
        alt: "WindPallete Docs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WindPallete Documentation - Theme Generator Guide",
    description: "Complete guide to using WindPallete Theme Generator",
    images: ["/docs-twitter-image.png"],
    creator: "@windpallete",
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
