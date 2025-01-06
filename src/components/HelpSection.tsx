import Image from "next/image";
import { Book, Github } from "lucide-react";

export default function HelpSection() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-8 border border-[var(--card-border)] rounded-lg bg-[var(--card-background)]">
          <h3 className="text-2xl font-bold mb-4">Read the Documentation</h3>
          <p className="text-[var(--muted-foreground)] mb-6">
            Explore our comprehensive documentation to learn all about WindPalette&apos;s features,
            configuration options, and best practices for creating beautiful Tailwind themes.
          </p>

          <a
            href="/docs"
            className="inline-flex items-center gap-3 px-6 py-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] transition-colors rounded-lg text-white font-medium"
          >
            <Book className="w-6 h-6" />
            Read the Docs
          </a>
        </div>
        <div className="p-8 border border-[var(--card-border)] rounded-lg bg-[var(--card-background)]">
          <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
          <p className="text-[var(--muted-foreground)] mb-6">
            Get help, share your themes, and connect with other WindPalette users in our friendly Discord
            community. Whether you&apos;re just getting started or you&apos;re a Tailwind pro, everyone&apos;s
            welcome!
          </p>

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
        <div className="p-8 border border-[var(--card-border)] rounded-lg bg-[var(--card-background)]">
          <h3 className="text-2xl font-bold mb-4">Contribute & Report Issues</h3>
          <p className="text-[var(--muted-foreground)] mb-6">
            Help improve WindPalette by contributing to the project or reporting bugs. Whether you want to
            submit a PR or create an issue, your feedback is valuable!
          </p>

          <div className="flex gap-3">
            <a
              href="https://github.com/dmostoller/windpalette"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 bg-[#24292E] hover:bg-[#1B1F23] transition-colors rounded-lg text-white font-medium"
            >
              <Github className="w-5 h-5" />
              Contribute
            </a>
            <a
              href="https://github.com/dmostoller/windpalette/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 bg-[#24292E] hover:bg-[#1B1F23] transition-colors rounded-lg text-white font-medium"
            >
              <Github className="w-5 h-5" />
              Report Issue
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
