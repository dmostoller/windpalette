import { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import { SettingsProvider } from "@/context/SettingsContext";

export const metadata: Metadata = {
  title: "Preview Your Theme - WindPalette",
  description:
    "Preview and test your custom Tailwind CSS theme in real-time. Visualize your color palette, typography, and components before implementing.",
  keywords: "tailwind, theme, preview, generator, css, design system, color palette",
  openGraph: {
    title: "Preview Your Theme - WindPalette",
    description:
      "Preview and test your custom Tailwind CSS theme in real-time. Visualize your color palette, typography, and components before implementing.",
    type: "website",
    url: "https://www.windpalette.com/preview",
    siteName: "WindPalette",
    images: [
      {
        url: "https://www.windpalette.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "WindPalette Theme Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preview Your Theme - WindPallete",
    description: "Preview and test your custom Tailwind CSS theme in real-time",
    images: ["https://www.windpalette.com/og-image.png"],
    creator: "@windpallete",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://www.windpalette.com/preview",
  },
};

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <ThemeProvider initialVisibleColors={3} initialColors={{}} previewMode>
        {children}
      </ThemeProvider>
    </SettingsProvider>
  );
}
