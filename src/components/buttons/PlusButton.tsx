import { Plus } from "lucide-react";

export default function PlusButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="h-full w-full flex items-center justify-center 
        border-2 border-dashed border-[var(--card-border)] rounded-lg 
        hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 
        transition-all duration-200 ease-out
        hover:scale-[1.02] active:scale-[0.98]"
    >
      <Plus
        className="w-12 h-12 text-[var(--primary)]
        transition-colors duration-200"
      />
    </button>
  );
}
