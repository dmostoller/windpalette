"use client";

export default function PreviewCard() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Card</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-[var(--background)] text-[var(--foreground)] p-4">
          <h4 className="font-medium">Card Header</h4>
        </div>
        <div className="p-4">
          <p className="text-[var(--foreground)] mb-4">
            This is a sample card with your theme colors.
          </p>
          <button className="bg-accent text-[var(--foreground)] px-3 py-1 rounded text-sm">
            Action
          </button>
        </div>
      </div>
    </div>
  );
}
