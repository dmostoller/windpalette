"use client";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { Grid, List, Download, Copy, ArrowRight, Share } from "lucide-react";
import { CopyComponentButton } from "./CopyComponentButton";

// Sample data structure
const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 400 },
  { name: "Jul", value: 300 },
  { name: "Aug", value: 500 },
  { name: "Sep", value: 400 },
  { name: "Oct", value: 200 },
  { name: "Nov", value: 600 },
  { name: "Dec", value: 300 },
];

const GRADIENT_VARIANTS = [
  { name: "Left to Right", className: "bg-gradient-to-r" },
  { name: "Top to Bottom", className: "bg-gradient-to-b" },
  { name: "Diagonal", className: "bg-gradient-to-br" },
  { name: "Radial", className: "bg-[--radial-gradient]" },
];

const SAMPLE_IMAGES = [
  {
    src: "/sample2.jpg",
    alt: "Design System",
    caption: "Save color scales",
  },
  {
    src: "/sample1.jpg",
    alt: "Color Scales",
    caption: "Create themes",
  },
  {
    src: "/sample3.jpg",
    alt: "Theme Builder",
    caption: "Build beautiful design systems",
  },
];

const PreviewComponents = () => {
  const { getActiveGradientColors } = useTheme();
  const [selectedVariant, setSelectedVariant] = useState(GRADIENT_VARIANTS[2]);
  const [viewMode, setViewMode] = useState("grid");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const gradientColors = useMemo(() => {
    return getActiveGradientColors();
  }, [getActiveGradientColors]);

  useEffect(() => {
    const root = document.documentElement;

    // Set gradient colors
    gradientColors.forEach((color, index) => {
      root.style.setProperty(`--gradient-color-${index}`, color);
    });

    // Create radial gradient based on available colors
    const radialGradient =
      gradientColors.length === 1
        ? `radial-gradient(circle, ${gradientColors[0]}, ${gradientColors[0]})`
        : gradientColors.length === 3
          ? `radial-gradient(circle, ${gradientColors[0]} 0%, ${gradientColors[1]} 50%, ${gradientColors[2]} 100%)`
          : `radial-gradient(circle, ${gradientColors[0]}, ${gradientColors[1]})`;

    root.style.setProperty("--radial-gradient", radialGradient);

    return () => {
      [0, 1, 2].forEach((index) => {
        root.style.removeProperty(`--gradient-color-${index}`);
      });
      root.style.removeProperty("--radial-gradient");
    };
  }, [gradientColors]);

  // Update gradientStyle function
  const gradientStyle = (variant: string) => {
    if (variant === "bg-[--radial-gradient]") {
      return { background: `var(--radial-gradient)` };
    }

    const direction = variant.replace("bg-gradient-to-", "");
    const gradientMap = {
      r: "90deg",
      l: "270deg",
      t: "0deg",
      b: "180deg",
      br: "135deg",
    };

    const angle = gradientMap[direction as keyof typeof gradientMap];

    const colorStops =
      gradientColors.length === 1
        ? `${gradientColors[0]}, ${gradientColors[0]}`
        : Array.from({ length: gradientColors.length }, (_, i) => `var(--gradient-color-${i})`).join(", ");

    return {
      background: `linear-gradient(${angle}, ${colorStops})`,
    };
  };

  return (
    <div className="bg-[var(--background)]">
      {/* Controls Bar */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex justify-center items-center gap-4">
          <h3 className="text-lg font-medium">Gradients</h3>
          <select
            className="w-32 p-2 rounded-lg border bg-[var(--card2-background)] border-[var(--card-border)] mr-2"
            value={selectedVariant.name}
            onChange={(e) => {
              const variant = GRADIENT_VARIANTS.find((v) => v.name === e.target.value);
              if (variant) {
                setSelectedVariant({
                  name: variant.name,
                  className: variant.className,
                });
              }
            }}
          >
            {GRADIENT_VARIANTS.map((variant) => (
              <option key={variant.name} value={variant.name}>
                {variant.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded ${viewMode === "grid" ? "bg-primary text-white" : "bg-[var(--card-background)]"}`}
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded ${viewMode === "list" ? "bg-primary text-white" : "bg-[var(--card-background)]"}`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        className={`grid ${
          viewMode === "grid"
            ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
            : "grid-cols-1 gap-12 max-w-screen-md mx-auto"
        }`}
      >
        <div
          className={`${selectedVariant.className} ${
            viewMode === "list" ? "h-[700px]" : "h-full"
          } p-6 rounded-xl shadow-lg flex justify-center items-center flex-col border border-[var(--card-border)]`}
          style={gradientStyle(selectedVariant.className)}
          onMouseEnter={() => setHoveredCard("stats")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <h2 className="text-white text-4xl font-semibold">Users</h2>
          <p className="text-white text-6xl font-bold mt-2">1,872</p>
          <p className="text-white mt-2 text-xl">New users in past 30 days</p>
          {hoveredCard === "stats" && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 bg-white/20 rounded hover:bg-white/30">
                <Copy className="h-4 w-4 text-white" />
              </button>
            </div>
          )}
        </div>

        <div
          className={`relative ${viewMode === "list" ? "h-[700px]" : "h-full"} rounded-xl overflow-hidden group`}
          onMouseEnter={() => setHoveredCard(`image-1`)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <Image
            src={SAMPLE_IMAGES[1].src}
            alt={SAMPLE_IMAGES[1].alt}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 ${selectedVariant.className} opacity-30 group-hover:opacity-70 transition-opacity duration-300`}
            style={gradientStyle(selectedVariant.className)}
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
            <h2 className="text-white text-4xl font-bold mb-4 drop-shadow-lg">{SAMPLE_IMAGES[1].caption}</h2>
            <div className="flex gap-4">
              <button
                className={`
    px-6 py-2 
    ${selectedVariant.className}
    border border-primary-dark
    rounded-lg 
    text-white 
    font-medium
    shadow-lg
    backdrop-blur-sm
    hover:scale-105
    hover:shadow-xl
    hover:border-primary
    transition-all
    duration-300
    flex items-center gap-2
  `}
                style={gradientStyle(selectedVariant.className)}
              >
                <span>View Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                className={`
    px-6 py-2 
    bg-white/10
    border border-primary
    rounded-lg 
    text-white 
    font-medium
    shadow-lg
    backdrop-blur-sm
    hover:scale-105
    hover:shadow-xl
    hover:border-white/50
    hover:bg-white/20
    transition-all
    duration-300
    flex items-center gap-2
  `}
              >
                <span>Share</span>
                <Share className="w-4 h-4" />
              </button>
            </div>
          </div>
          {hoveredCard === `image-1` && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <CopyComponentButton componentType="GradientOverlayCard" />
            </div>
          )}
        </div>

        <div
          className={`bg-[var(--card-background)] border border-[var(--card-border)] ${
            viewMode === "list" ? "h-[700]" : "aspect-square"
          } p-6 rounded-xl shadow-lg space-y-4`}
        >
          <h2 className="text-primary text-3xl font-semibold">Today</h2>
          <div className="text-primary mt-2">
            <div
              className={`${selectedVariant.className} relative border border-white/20 rounded-lg p-4 mb-2 bg-card-background`}
            >
              <div
                className="absolute right-0 top-0 bottom-0 w-2 rounded-r-lg"
                style={gradientStyle(selectedVariant.className)}
              />
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-base">Team Standup</p>
                  <span className="text-xs opacity-75 text-accent">Daily Sync</span>
                </div>
                <p className="text-sm opacity-75  text-secondary">8:30 - 9:00 AM</p>
              </div>
            </div>

            <div
              className={`${selectedVariant.className} relative border border-white/20 rounded-lg p-4 mb-2 bg-card-background`}
            >
              <div
                className="absolute right-0 top-0 bottom-0 w-2 rounded-r-lg"
                style={gradientStyle(selectedVariant.className)}
              />
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-base">Client Meeting</p>
                  <span className="text-xs opacity-75 text-accent">Product Demo</span>
                </div>
                <p className="text-sm opacity-75 text-secondary">11:00 AM - 12:00 PM</p>
              </div>
            </div>

            <div
              className={`${selectedVariant.className} relative border border-white/20 rounded-lg p-4 mb-2 bg-card-background`}
            >
              <div
                className="absolute right-0 top-0 bottom-0 w-2 rounded-r-lg"
                style={gradientStyle(selectedVariant.className)}
              />
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-base">Code Review</p>
                  <span className="text-xs opacity-75 text-accent">Frontend PR</span>
                </div>
                <p className="text-sm opacity-75 text-secondary">2:00 - 3:00 PM</p>
              </div>
            </div>

            <div
              className={`${selectedVariant.className} relative border border-white/20 rounded-lg p-4 mb-2 bg-card-background`}
            >
              <div
                className="absolute right-0 top-0 bottom-0 w-2 rounded-r-lg"
                style={gradientStyle(selectedVariant.className)}
              />
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-base">Project Planning</p>
                  <span className="text-xs opacity-75 text-accent">Q2 Roadmap</span>
                </div>
                <p className=" text-secondary text-sm opacity-75">4:30 - 5:30 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`
            relative 
            ${viewMode === "list" ? "h-[700]" : "aspect-square"} 
            overflow-hidden 
            rounded-xl 
            group 
            shadow-lg
            hover:shadow-xl
            hover:shadow-primary/20
            transition-all
            duration-500
          `}
          onMouseEnter={() => setHoveredCard(`image-0`)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <Image
            src={SAMPLE_IMAGES[0].src}
            alt={SAMPLE_IMAGES[0].alt}
            width={500}
            height={500}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div
            className={`absolute inset-0 ${selectedVariant.className} opacity-60 group-hover:opacity-80 transition-all duration-500`}
            style={{
              ...gradientStyle(selectedVariant.className),
              maskImage: "linear-gradient(to bottom, transparent, black 85%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, black 85%)",
            }}
          />
          <p className="absolute px-2 bottom-6 left-8 text-white text-5xl font-bold z-10 transition-transform duration-500 group-hover:translate-y-[-4px]">
            Save{" "}
            <span className="text-primary group-hover:text-white transition-colors duration-500">
              color scales
            </span>
          </p>
          {hoveredCard === `image-0` && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <CopyComponentButton componentType="GradientMaskCard" />
            </div>
          )}
        </div>

        <div
          className={`bg-[var(--card-background)] border border-[var(--card-border)] ${
            viewMode === "list" ? "h-[700] aspect-square" : "aspect-square"
          } p-6 rounded-xl shadow-lg`}
          onMouseEnter={() => setHoveredCard("revenue")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <h2 className="text-primary text-3xl font-semibold">Active Users</h2>
          <p className="text-primary text-5xl font-bold mt-2">6,712</p>
          <div className="mt-4">
            <div
              className={`relative ${
                viewMode === "list" ? "h-[550px]" : "h-[550px] lg:h-[330px]"
              } bg-[var(--card-background)] rounded-xl`}
            >
              <div className="absolute inset-0 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {hoveredCard === "revenue" && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <button className="p-2 bg-[var(--primary)] rounded hover:bg-[var(--primary-dark)]">
                  <Download className="h-4 w-4 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setHoveredCard(`image-2`)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div
            className={`
              relative 
              ${viewMode === "list" ? "h-[700]" : "aspect-square"}
              overflow-hidden 
              rounded-xl 
              group 
              shadow-lg
              hover:scale-[1.02]
              transition-all
              duration-500
              hover:shadow-2xl
              hover:shadow-primary/20
            `}
          >
            <Image
              src={SAMPLE_IMAGES[2].src}
              alt={SAMPLE_IMAGES[2].alt}
              width={500}
              height={500}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Gradient borders */}
            <div className="absolute inset-0">
              <div
                className={`absolute inset-x-0 top-0 h-8 ${selectedVariant.className} opacity-75 group-hover:opacity-90 group-hover:h-12 transition-all duration-500 rounded-t-xl`}
                style={gradientStyle(selectedVariant.className)}
              />
              <div
                className={`absolute inset-x-0 bottom-0 h-8 ${selectedVariant.className} opacity-75 group-hover:opacity-90 group-hover:h-12 transition-all duration-500 rounded-b-xl`}
                style={gradientStyle(selectedVariant.className)}
              />
              <div
                className={`absolute inset-y-0 left-0 w-8 ${selectedVariant.className} opacity-75 group-hover:opacity-90 group-hover:w-12 transition-all duration-500 rounded-l-xl`}
                style={gradientStyle(selectedVariant.className)}
              />
              <div
                className={`absolute inset-y-0 right-0 w-8 ${selectedVariant.className} opacity-75 group-hover:opacity-90 group-hover:w-12 transition-all duration-500 rounded-r-xl`}
                style={gradientStyle(selectedVariant.className)}
              />
            </div>

            {/* Text overlay */}
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-5xl font-bold z-10 transition-all duration-500 group-hover:translate-y-0 translate-y-2 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                Build beautiful <span className="text-primary">design systems</span>
              </p>
            </div>
          </div>

          {/* Copy button moved outside with correct opacity classes */}
          {hoveredCard === `image-2` && (
            <div className="absolute top-2 right-2 z-50 opacity-100">
              <CopyComponentButton componentType="SimpleGradientCard" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewComponents;
