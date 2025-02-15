interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
}

export function Tooltip({ content, children, className }: TooltipProps) {
  return (
    <div className={`group relative ${className}`}>
      {children}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        {content}
      </div>
    </div>
  );
}
