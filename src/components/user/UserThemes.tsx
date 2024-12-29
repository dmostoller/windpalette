import { useState, useEffect } from "react";
import { Theme } from "@/types/theme";
import { Edit2, Download, Trash2, FolderOpen } from "lucide-react";

export default function UserThemes() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/themes")
      .then((res) => res.json())
      .then(setThemes);
  }, []);

  return (
    <div className="space-y-8">
      {/* Stats Header */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[var(--card-background)] p-6 rounded-lg border border-[var(--card-border)]">
          <h4 className="text-sm text-[var(--text-secondary)]">Total Themes</h4>
          <p className="text-3xl font-bold">{themes.length}</p>
        </div>
        <div className="bg-[var(--card-background)] p-6 rounded-lg border border-[var(--card-border)]">
          <h4 className="text-sm text-[var(--text-secondary)]">Most Used</h4>
          <p className="text-lg font-medium">{themes[0]?.name || "No themes"}</p>
        </div>
        <div className="bg-[var(--card-background)] p-6 rounded-lg border border-[var(--card-border)]">
          <h4 className="text-sm text-[var(--text-secondary)]">Last Created</h4>
          <p className="text-lg font-medium">{new Date(themes[0]?.createdAt || "").toLocaleDateString()}</p>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedThemes.length > 0 && (
        <div className="flex items-center gap-4 p-4 bg-[var(--card2-background)] rounded-lg">
          <span className="text-sm">{selectedThemes.length} selected</span>
          <div className="flex-1" />
          <button className="p-2 hover:text-[var(--primary)]" onClick={() => setSelectedThemes([])}>
            <Download size={20} />
          </button>
          <button className="p-2 hover:text-red-500">
            <Trash2 size={20} />
          </button>
        </div>
      )}

      {/* Themes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className="p-6 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)] group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium">{theme.name}</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Created {new Date(theme.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:text-[var(--primary)] rounded-lg hover:bg-[var(--card2-background)]">
                  <Edit2 size={18} />
                </button>
                <button className="p-2 hover:text-[var(--primary)] rounded-lg hover:bg-[var(--card2-background)]">
                  <FolderOpen size={18} />
                </button>
                <button className="p-2 hover:text-red-500 rounded-lg hover:bg-[var(--card2-background)]">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Color Preview */}
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(theme.colors).map(([key, value]) => (
                <div key={key} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: value }} />
                  <div>
                    <p className="text-sm font-medium">{key}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Usage Stats */}
            <div className="mt-4 pt-4 border-t border-[var(--card-border)]">
              <div className="flex justify-between text-sm text-[var(--text-secondary)]">
                <span>Used 24 times</span>
                <span>Last used 2 days ago</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
