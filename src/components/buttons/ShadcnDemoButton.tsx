import { Palette } from "lucide-react";
import { ThemeData } from "@/utils/share";
import Image from "next/image";

interface ShadcnDemoButtonProps {
  colors: ThemeData["colors"];
}

export const ShadcnDemoButton = ({ colors }: ShadcnDemoButtonProps) => {
  const params = new URLSearchParams();

  if (colors.primary) {
    params.set("primary", colors.primary);
  }
  if (colors.secondary) {
    params.set("secondary", colors.secondary);
  }
  if (colors.accent) {
    params.set("accent", colors.accent);
  }

  const href = `/shadcn?${params.toString()}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 p-2 border border-[var(--card-border)] hover:bg-[var(--card-background)] rounded-lg"
    >
      <div className="relative">
        <Image
          src="https://github.com/shadcn.png"
          alt="shadcn/ui"
          width={20}
          height={20}
          className="rounded-full"
        />
        <div className="absolute -right-1 -bottom-1 bg-[var(--card-background)] rounded-full p-0.5">
          <Palette className="w-2.5 h-2.5 text-[var(--primary)]" />
        </div>
      </div>
      <span className="hidden md:inline">Shadcn/ui</span>
    </a>
  );
};
