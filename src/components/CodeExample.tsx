import { Code } from "lucide-react";

interface CodeExampleProps {
  language: string;
  code: string;
}

export function CodeExample({ language, code }: CodeExampleProps) {
  return (
    <div className="relative group">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 bg-[var(--primary)] rounded-lg text-white hover:bg-[var(--primary-dark)]">
          <Code className="w-4 h-4" />
        </button>
      </div>
      <pre
        className={`language-${language} bg-[var(--card-background)] p-4 rounded-lg border border-[var(--card-border)]`}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
