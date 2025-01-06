"use client";
import { useState, useMemo } from "react";
import DocumentationContent from "@/components/DocumentationContent";
import Link from "next/link";
import { Book, Palette, Layers, Box, Settings, Download, ArrowLeft, Search, Play, Menu } from "lucide-react";
import { SEARCHABLE_CONTENT } from "@/lib/docs";
import { Metadata } from "next";
import { Drawer } from "vaul";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Learn how to use Theme Generator. Comprehensive guides for color systems, gradients, components, and theme exports.",
  openGraph: {
    title: "Theme Generator Documentation",
    description: "Complete documentation for Theme Generator features and usage",
  },
};

const DOCUMENTATION_SECTIONS = [
  {
    id: "getting-started",
    icon: <Book className="w-5 h-5" />,
    title: "Getting Started",
    subsections: [
      { id: "introduction", title: "Introduction" },
      { id: "quick-start", title: "Quick Start Guide" },
      { id: "installation", title: "Installation" },
    ],
  },
  {
    id: "colors",
    icon: <Palette className="w-5 h-5" />,
    title: "Colors",
    subsections: [
      { id: "color-system", title: "Color System" },
      { id: "color-scales", title: "Color Scales" },
      { id: "color-customization", title: "Customization" },
    ],
  },
  {
    id: "components",
    icon: <Box className="w-5 h-5" />,
    title: "Components",
    subsections: [
      { id: "cards", title: "Cards" },
      { id: "buttons", title: "Buttons" },
      { id: "usage", title: "Usage" },
    ],
  },
  {
    id: "gradients",
    icon: <Layers className="w-5 h-5" />,
    title: "Gradients",
    subsections: [
      { id: "gradient-types", title: "Gradient Types" },
      { id: "customization", title: "Customization" },
      { id: "usage", title: "Usage Examples" },
    ],
  },
  {
    id: "export",
    icon: <Download className="w-5 h-5" />,
    title: "Export",
    subsections: [
      { id: "formats", title: "Export Formats" },
      { id: "integration", title: "Integration Guide" },
      { id: "examples", title: "Examples" },
    ],
  },
  {
    id: "configuration",
    icon: <Settings className="w-5 h-5" />,
    title: "Configuration",
    subsections: [
      { id: "settings", title: "Settings" },
      { id: "preferences", title: "Preferences" },
      { id: "themes", title: "Theme Management" },
    ],
  },
  {
    id: "demo",
    icon: <Play className="w-5 h-5" />,
    title: "Demo",
    subsections: [
      { id: "preview", title: "Theme Preview" },
      { id: "landing-page", title: "Landing Page" },
      { id: "export-demo", title: "Export & Share" },
    ],
  },
];

const searchDocs = (query: string) => {
  if (!query) return DOCUMENTATION_SECTIONS;

  const normalizedQuery = query.toLowerCase();

  return DOCUMENTATION_SECTIONS.filter((section) => {
    // Check main section
    const matchesSection =
      section.title.toLowerCase().includes(normalizedQuery) ||
      SEARCHABLE_CONTENT.find(
        (s) =>
          s.id === section.id &&
          (s.content.toLowerCase().includes(normalizedQuery) ||
            s.keywords.some((k) => k.includes(normalizedQuery))),
      );

    // Check subsections
    const matchesSubsection = section.subsections.some(
      (sub) =>
        sub.title.toLowerCase().includes(normalizedQuery) ||
        SEARCHABLE_CONTENT.find((s) => s.id === section.id)?.subsections.find(
          (ss) => ss.id === sub.id && ss.content.toLowerCase().includes(normalizedQuery),
        ),
    );

    return matchesSection || matchesSubsection;
  });
};

const DocSidebarContent = ({
  searchQuery,
  setSearchQuery,
  activeSection,
  setActiveSection,
  filteredSections,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  filteredSections: typeof DOCUMENTATION_SECTIONS;
}) => (
  <>
    <div className="mb-6">
      <Link
        href="/app"
        className="inline-flex items-center text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to App
      </Link>
    </div>

    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--foreground)] opacity-50" />
      <input
        type="text"
        placeholder="Search docs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-[var(--background)] border border-[var(--card-border)] rounded-lg text-sm"
      />
    </div>

    <nav className="space-y-6">
      {filteredSections.map((section) => (
        <div key={section.id} className="space-y-2">
          <button
            onClick={() => setActiveSection(section.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm
              ${
                activeSection === section.id
                  ? "bg-[var(--primary)] text-white"
                  : "hover:bg-[var(--background)]"
              }`}
          >
            {section.icon}
            {section.title}
          </button>
          {activeSection === section.id && (
            <div className="pl-6 space-y-1">
              {section.subsections.map((subsection) => (
                <a
                  key={subsection.id}
                  href={`#${section.id}-${subsection.id}`}
                  className="block px-3 py-1 text-sm text-[var(--foreground)] opacity-70 hover:opacity-100"
                >
                  {subsection.title}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  </>
);

export default function Documentation() {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredSections = useMemo(() => searchDocs(searchQuery), [searchQuery]);

  const sidebarProps = {
    searchQuery,
    setSearchQuery,
    activeSection,
    setActiveSection,
    filteredSections,
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="flex">
        {/* Desktop Sidebar - hidden on mobile */}
        <aside className="hidden md:block w-64 h-screen bg-[var(--card-background)] border-r border-[var(--card-border)] p-4 fixed">
          <DocSidebarContent {...sidebarProps} />
        </aside>

        {/* Mobile Drawer - visible only on mobile */}
        <div className="md:hidden">
          <Drawer.Root direction="left">
            <Drawer.Trigger className="fixed bottom-4 left-4 p-3 rounded-full border border-[var(--card-border)] bg-[var(--card-background)] shadow-lg hover:bg-[var(--card-background-hover)] transition-all z-20">
              <Menu className="w-8 h-8" />
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40" />
              <Drawer.Content className="fixed left-0 top-0 h-full w-[280px] bg-[var(--card-background)] p-4 z-50">
                <Drawer.Title asChild>
                  <VisuallyHidden>Documentation Menu</VisuallyHidden>
                </Drawer.Title>
                <DocSidebarContent {...sidebarProps} />
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>

        {/* Main Content */}
        <main className="w-full md:ml-64 flex-1 p-4 md:p-8">
          <div className="max-w-screen-xl mx-auto">
            <DocumentationContent activeSection={activeSection} />
          </div>
        </main>
      </div>
    </div>
  );
}
