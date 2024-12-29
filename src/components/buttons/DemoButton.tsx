import { SquareArrowOutUpRight } from "lucide-react";
import { generateShareableUrl, ThemeData } from "@/utils/share";

interface DemoButtonProps {
  colors: ThemeData["colors"];
  gradients: {
    colors: Array<{
      active: boolean;
      color: string;
    }>;
  };
  visibleColors: number;
}

export const DemoButton = ({ colors, gradients, visibleColors }: DemoButtonProps) => {
  const handleDemo = () => {
    const themeData = {
      colors,
      gradients: gradients.colors.filter((c) => c.active).map((c) => c.color),
      options: { components: true, gradients: true, exports: true },
      visibleColors,
    };

    const url = generateShareableUrl(themeData);
    window.open(url, "_blank");
  };

  return (
    <button
      type="button"
      onClick={handleDemo}
      className="flex items-center gap-2 px-4 py-2 border border-[var(--card-border)] hover:bg-[var(--card-background)] rounded-lg"
    >
      <SquareArrowOutUpRight className="w-4 h-4" />
      Demo
    </button>
  );
};
