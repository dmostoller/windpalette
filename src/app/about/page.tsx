import { Paintbrush, Gift, Code, Heart, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "WindPallete is a free, open-source design tool built by developers, for developers. Create beautiful color themes without restrictions.",
  openGraph: {
    title: "About WindPallete",
    description: "Learn about our mission to democratize design tooling",
  },
};

export default function About() {
  return (
    <div className="min-h-screen bg-[var(--background)] p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-[var(--text-primary)]">About WindPallete</h1>
          <p className="text-lg text-[var(--text-secondary)]">
            A powerful and free Tailwind CSS theme generator built to make design accessible for everyone
          </p>
        </div>

        <div className="grid gap-8">
          <section className="p-6 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Paintbrush className="w-6 h-6 text-[var(--primary)]" />
              <h2 className="text-2xl font-semibold">Our Mission</h2>
            </div>
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p>
                WindPallete is a powerful tool designed to help developers create and manage consistent color
                themes without restrictions. After encountering countless paywalls while trying to create
                themes for our projects, we decided to build the tool we wished existed.
              </p>
              <p>
                That&apos;s why WindPallete is and always will be free, open source, and supported by the
                community.
              </p>
            </div>
          </section>

          <section className="p-6 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="w-6 h-6 text-[var(--secondary)]" />
              <h2 className="text-2xl font-semibold">Color System</h2>
            </div>
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p>
                Our comprehensive color system provides everything you need to create the perfect palette:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Advanced color palette generation with complete scales (50-950)</li>
                <li>Custom color picker with HSL controls and live preview</li>
                <li>Multiple gradient types (linear, radial, diagonal)</li>
                <li>Real-time component preview</li>
              </ul>
            </div>
          </section>

          <section className="p-6 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-6 h-6 text-[var(--accent)]" />
              <h2 className="text-2xl font-semibold">Developer Experience</h2>
            </div>
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p>Built with developers in mind, featuring:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Export to Tailwind CSS config and CSS variables</li>
                <li>Theme management and sharing capabilities</li>
                <li>Component preview with buttons, cards, and layouts</li>
                <li>No restrictions, paywalls, or premium tiers</li>
              </ul>
            </div>
          </section>

          <section className="p-6 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-[var(--success)]" />
              <h2 className="text-2xl font-semibold">Join Our Community</h2>
            </div>
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p>Connect with fellow WindPallete users in our friendly Discord community:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Get help with your theme creation</li>
                <li>Share your beautiful themes with others</li>
                <li>Discuss design and development</li>
                <li>Stay updated on new features</li>
              </ul>
              <div className="pt-4 flex justify-center">
                <a
                  href="https://discord.gg/Gxh3ZzeXxQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-[#5865F2] hover:bg-[#4752C4] transition-colors rounded-lg text-white font-medium"
                >
                  <Image src="/icon_clyde_white_RGB.png" alt="Discord" width={28} height={28} />
                  Join our Discord Server
                </a>
              </div>
            </div>
          </section>

          <footer className="text-center text-sm text-[var(--text-secondary)] pt-8">
            <p className="flex items-center justify-center gap-2">
              Made with <Heart className="w-4 h-4 text-[var(--error)]" /> by developers for developers
            </p>
            <p className="mt-2">
              Questions or suggestions?{" "}
              <a href="mailto:dave.mostoller.dev@gmail.com" className="text-[var(--primary)] hover:underline">
                Get in touch
              </a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
