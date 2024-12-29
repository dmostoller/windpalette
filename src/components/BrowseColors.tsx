import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import PreviewColorScale from "./PreviewColorScale";
import { Search } from "lucide-react";
import { colorScales, colorFamilies, colorFamilyMap } from "@/lib/colors";
import CopyScaleButton from "./CopyScaleButton";

const BrowseColors = () => {
  const { setColor, visibleColors } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFamily, setSelectedFamily] = useState("all");

  const handleColorSelect = (colorName: string, themeKey: "primary" | "secondary" | "accent") => {
    const scale = colorScales[colorName as keyof typeof colorScales];
    const baseColor = scale[5];
    setColor(themeKey, baseColor);
  };

  const filteredColors = Object.keys(colorScales).filter((color) => {
    const matchesSearch = color.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFamily =
      selectedFamily === "all" || colorFamilyMap[color as keyof typeof colorFamilyMap] === selectedFamily;
    return matchesSearch && matchesFamily;
  });

  return (
    <div className="p-6 space-y-6 flex flex-col h-90vh overflow-hidden">
      {/* Color Family Filter */}
      <div className="sticky top-0 flex flex-wrap gap-2 p-4 z-10 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
        {Object.entries(colorFamilies).map(([value, label]) => (
          <label
            key={value}
            className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors
              ${
                selectedFamily === value
                  ? "bg-[var(--primary)] text-white"
                  : "hover:bg-[var(--card2-background)]"
              }`}
          >
            <input
              type="radio"
              name="colorFamily"
              value={value}
              checked={selectedFamily === value}
              onChange={(e) => setSelectedFamily(e.target.value)}
              className="hidden"
            />
            <span>{label}</span>
          </label>
        ))}

        {/* Search */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search colors..."
            className="w-full pl-10 pr-10 py-2 border rounded-lg 
            bg-background text-[var(--foreground)]
            focus:outline-none focus:ring-2 focus:ring-[var(--primary)] 
            focus:border-transparent
            border-[var(--card-border)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-y-auto max-h-[calc(85vh-200px)] pt-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
        <div className="grid grid-cols-1 gap-6">
          {filteredColors.map((name) => (
            <div
              key={name}
              className="p-4 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg hover:border-[var(--primary)] transition-colors cursor-pointer relative"
            >
              <CopyScaleButton colors={colorScales[name as keyof typeof colorScales]} name={name} />
              <h3 className="text-lg font-medium capitalize mb-4">{name}</h3>
              <PreviewColorScale colors={colorScales[name as keyof typeof colorScales]} name={name} />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleColorSelect(name, "primary")}
                  className="px-4 py-2 text-sm rounded-md bg-primary text-white hover:bg-primary-dark"
                >
                  Set as Primary
                </button>
                {visibleColors >= 2 && (
                  <button
                    onClick={() => handleColorSelect(name, "secondary")}
                    className="px-4 py-2 text-sm rounded-md bg-secondary text-white hover:bg-secondary-dark"
                  >
                    Set as Secondary
                  </button>
                )}
                {visibleColors >= 3 && (
                  <button
                    onClick={() => handleColorSelect(name, "accent")}
                    className="px-4 py-2 text-sm rounded-md bg-accent text-white hover:bg-accent-dark"
                  >
                    Set as Accent
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseColors;
