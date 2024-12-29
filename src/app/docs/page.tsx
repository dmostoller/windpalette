import type { Metadata } from "next";
import Documentation from "@/components/Documentation";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Learn how to use CSS Theme Generator. Comprehensive guides for color systems, gradients, components, and theme exports.",
  openGraph: {
    title: "CSS Theme Generator Documentation",
    description: "Complete documentation for CSS Theme Generator features and usage",
  },
};

export default function DocumentationPage() {
  return (
    <main className="mx-auto">
      <Documentation />
    </main>
  );
}
