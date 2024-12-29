"use client";

import { Suspense } from "react";
import PreviewContent from "@/components/PreviewContent";

export default function PreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[var(--primary)]"></div>
        </div>
      }
    >
      <PreviewContent />
    </Suspense>
  );
}
