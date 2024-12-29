"use client";

import PreviewButton from "./PreviewButton";
// import PreviewCard from "./PreviewCard";
import GradientPreview from "./GradientPreview";

export default function PreviewPanel() {
  return (
    <div className="bg-[var(--background)] rounded-lg shadow-sm">
      <div className="w-full flex justify-center gap-6  ">
        <PreviewButton />
        {/* <PreviewCard /> */}
        <GradientPreview />
      </div>
    </div>
  );
}
