import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProvider";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.windpalette.com"),
  title: {
    default: "WindPalette | Tailwind CSS Theme Generator - Free Open Source Design Tool",
    template: "%s | Theme Generator",
  },
  description:
    "Create beautiful, consistent color themes for your applications. Free, open-source design tool with automatic color scale generation, gradient creation, and multiple export options.",
  keywords: [
    "tailwind theme generator",
    "theme generator",
    "color palette",
    "theme builder",
    "design tool",
    "tailwind css",
    "css generator",
    "color generator",
    "gradient generator",
    "color scales",
    "open source",
  ],
  authors: [{ name: "WindPalette Team" }],
  creator: "WindPalette Team",
  publisher: "WindPalette",
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
      "Create beautiful, consistent color themes for your applications. Free, open-source design tool with automatic color scale generation.",
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
    description: "Create beautiful, consistent color themes for your applications",
    images: ["/og-image.png"],
    creator: "@WindPalette",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientProviders>{children}</ClientProviders>
        <SpeedInsights />
        <Analytics />
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=G-4T2HKY0PYY`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4T2HKY0PYY');
            `}
          </Script>
        </>
      </body>
    </html>
  );
}
