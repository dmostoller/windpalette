import Skeleton from "react-loading-skeleton";
import { Eye, Save } from "lucide-react";

export function ThemeCardSkeleton() {
  return (
    <div className="py-4 px-6 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)]">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Author and Theme Info */}
        <div className="flex items-start gap-4 md:w-1/3">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-[var(--card-border)]">
            <Skeleton
              circle
              height={48}
              baseColor="var(--skeleton-base-color)"
              highlightColor="var(--skeleton-highlight-color)"
              className="dark:opacity-75"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton
              width={160}
              height={28}
              className="mb-1 dark:opacity-75"
              baseColor="var(--skeleton-base-color)"
              highlightColor="var(--skeleton-highlight-color)"
            />
            <div className="flex items-center gap-2">
              <Skeleton
                width={80}
                height={16}
                baseColor="var(--skeleton-base-color)"
                highlightColor="var(--skeleton-highlight-color)"
                className="dark:opacity-75"
              />
              <span className="text-[var(--muted-foreground)]">&middot;</span>
              <Skeleton
                width={40}
                height={16}
                baseColor="var(--skeleton-base-color)"
                highlightColor="var(--skeleton-highlight-color)"
                className="dark:opacity-75"
              />
            </div>
          </div>
        </div>

        {/* Colors Preview */}
        <div className="flex-1 flex items-center gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="relative">
              <Skeleton
                width={96}
                height={112}
                className="rounded-lg dark:opacity-75"
                baseColor="var(--skeleton-base-color)"
                highlightColor="var(--skeleton-highlight-color)"
              />
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex md:flex-col gap-2 justify-end md:w-36">
          <div className="p-2 border rounded-lg border-[var(--card-border)] flex items-center justify-center gap-2">
            <Eye className="w-4 h-4 text-[var(--muted-foreground)]" />
            <span className="hidden md:inline text-[var(--muted-foreground)]">Preview</span>
          </div>
          <div className="p-2 border rounded-lg border-[var(--card-border)] flex items-center justify-center gap-2">
            <div className="w-4 h-4 rounded-full">
              <Skeleton
                circle
                height={16}
                baseColor="var(--skeleton-base-color)"
                highlightColor="var(--skeleton-highlight-color)"
                className="dark:opacity-75"
              />
            </div>
            <span className="hidden md:inline text-[var(--muted-foreground)]">shadcn</span>
          </div>
          <div className="p-2 border rounded-lg border-[var(--card-border)] flex items-center justify-center gap-2">
            <Save className="w-4 h-4 text-[var(--muted-foreground)]" />
            <span className="hidden md:inline text-[var(--muted-foreground)]">Save</span>
          </div>
        </div>
      </div>
    </div>
  );
}
