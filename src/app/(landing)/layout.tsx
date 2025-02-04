import { ThemeProvider } from "@/context/ThemeContext";
import { SettingsProvider } from "@/context/SettingsContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.windpalette.com"),
  title: {
    default: "WindPalette | Tailwind CSS Theme Generator - Free Open Source Design Tool",
    template: "%s | Theme Generator",
  },
  description:
    "Create beautiful, consistent color themes for your applications using AI or manual tools. Free, open-source design tool with AI theme generation, automatic color scale generation, gradient creation, and multiple export options.",
  keywords: [
    "theme generator",
    "color palette",
    "design tool",
    "tailwind css",
    "css generator",
    "color generator",
    "gradient generator",
    "color scales",
    "open source",
    "ai color generator",
    "ai theme generator",
    "ai design tool",
    "ai color palette",
    "ai color scheme",
  ],
  authors: [{ name: "WindPalette Team" }],
  creator: "WindPalette Team",
  publisher: "WindpPalette",
  applicationName: "WindPalette CSS Theme Generator",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.windpalette.com",
    siteName: "WindPalette",
    title: "WindPalette | Tailwind CSS Theme Generator - Free Open Source Design Tool",
    description:
      "Create beautiful, consistent color themes for your applications using AI or manual tools. Free, open-source design tool with AI theme generation and automatic color scale generation.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WindPalette Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WindPalette | Tailwind CSS Theme Generator - Free Open Source Design Tool",
    description: "Create beautiful, consistent color themes for your applications using AI or manual tools",
    images: ["/og-image.png"],
    creator: "@windpalette",
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "msapplication-TileColor": "#2563eb",
    "theme-color": "#2563eb",
  },
};

const landingPageColors = {
  primary: "#38B2AC",
  secondary: "#A78BFA",
  accent: "#006EDB",
};

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <ThemeProvider initialVisibleColors={3} initialColors={landingPageColors} previewMode>
        {children}
      </ThemeProvider>
    </SettingsProvider>
  );
}
