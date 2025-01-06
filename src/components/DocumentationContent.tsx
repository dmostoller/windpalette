import PreviewColorScale from "./PreviewColorScale";
import CopyStylesButton from "./CopyStylesButton";
import CopyGradientsButton from "./CopyGradientsButton";
import CopyStatusColorsButton from "./CopyStatusColorsButton";
import GradientPreview from "./GradientPreview";
import PreviewComponents from "./PreviewComponents";
import PreviewButton from "./PreviewButton";
import { ArrowRight } from "lucide-react";
import { colorScales } from "@/lib/colors";
import ColorPicker from "./ColorPicker";
import { ThemeColors } from "@/types/theme";
import { useTheme } from "@/context/ThemeContext";

interface DocumentationContentProps {
  activeSection: string;
}

export default function DocumentationContent({ activeSection }: DocumentationContentProps) {
  const { colors } = useTheme();
  const getRandomColorKeys = (count: number) => {
    const keys = Object.keys(colorScales) as Array<keyof typeof colorScales>;
    const selected = new Set<keyof typeof colorScales>();

    while (selected.size < count) {
      const randomIndex = Math.floor(Math.random() * keys.length);
      selected.add(keys[randomIndex]);
    }

    return Array.from(selected);
  };

  const selectedColors = getRandomColorKeys(7);

  const sections = {
    "getting-started": (
      <div className="space-y-8">
        <section id="getting-started-introduction">
          <h2 className="text-3xl font-bold mb-4">Introduction</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            Theme Generator is a powerful tool designed to help developers create and manage consistent color
            themes for their applications. Whether you&apos;re building a new project or updating an existing
            one, our tool provides everything you need to create beautiful, accessible color schemes.
          </p>
        </section>

        <section id="getting-started-quick-start">
          <h2 className="text-2xl font-bold mb-4">Quick Start Guide</h2>
          <div className="space-y-4">
            <p className="text-[var(--text-secondary)]">
              Get started with Theme Generator in three simple steps:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-[var(--text-secondary)]">
              <li>Choose your primary color using the color picker</li>
              <li>Add secondary and accent colors as needed</li>
              <li>Export your theme in your preferred format</li>
            </ol>
          </div>
        </section>

        <section id="getting-started-installation">
          <h2 className="text-2xl font-bold mb-4">Installation</h2>
          <div className="space-y-4">
            <p className="text-[var(--text-secondary)]">To use the exported theme in your project:</p>
            <div className="bg-[var(--card-background)] p-4 rounded-lg border border-[var(--card-border)]">
              <pre className="text-sm overflow-x-auto">
                <code>{`// For Tailwind CSS
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          dark: 'var(--primary-dark)',
          light: 'var(--primary-light)'
        }
        // ... other colors
      }
    }
  }
}`}</code>
              </pre>
            </div>
          </div>
        </section>
      </div>
    ),

    colors: (
      <div className="space-y-8">
        <section id="colors-color-system">
          <h2 className="text-3xl font-bold mb-4">Color System</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Our color system provides two powerful ways to create your perfect color palette:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)]">
              <h3 className="text-xl font-medium mb-3">Browse Predefined Colors</h3>
              <p className="text-[var(--text-secondary)] mb-4">
                Choose from hundreds of carefully crafted color scales, organized by color families:
              </p>
              <ul className="list-disc pl-6 text-[var(--text-secondary)]">
                <li>Varied color families</li>
                <li>Multiple shades per color</li>
                <li>Instant preview of full color scale</li>
                <li>One-click application to your theme</li>
              </ul>
            </div>

            <div className="p-6 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)]">
              <h3 className="text-xl font-medium mb-3">Custom Color Picker</h3>
              <p className="text-[var(--text-secondary)] mb-4">
                Fine-tune your colors with our advanced color picker:
              </p>
              <ul className="list-disc pl-6 text-[var(--text-secondary)]">
                <li>HSL slider controls</li>
                <li>Live preview</li>
                <li>Hex code display</li>
                <li>Optional gradient integration</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="colors-color-scales">
          <h2 className="text-2xl font-bold mb-4">Color Scales</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Each color automatically generates a complete scale from 50 to 950, ensuring consistent light and
            dark variants for every use case.
          </p>
          <div className="space-y-6">
            {selectedColors.map((colorName) => (
              <div key={colorName} className="space-y-2">
                <h3 className="text-lg font-medium capitalize">{colorName}</h3>
                <PreviewColorScale colors={colorScales[colorName]} name={colorName} />
              </div>
            ))}
          </div>
        </section>
        <section id="colors-color-customization">
          <h2 className="text-3xl font-bold mb-4">Color Customization</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Our advanced color picker provides precise control over your theme colors:
          </p>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)]">
                <h3 className="text-xl font-medium mb-3">Color Controls</h3>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Visual color picker for intuitive selection</li>
                  <li>
                    HSL sliders for precise adjustments:
                    <ul className="pl-4 mt-1">
                      <li>Hue (0-360°)</li>
                      <li>Saturation (0-100%)</li>
                      <li>Lightness (0-100%)</li>
                    </ul>
                  </li>
                  <li>HEX code display and input</li>
                  <li>Gradient toggle for each color</li>
                </ul>
              </div>

              <div className="p-6 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)]">
                <h3 className="text-xl font-medium mb-3">Features</h3>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Real-time preview of changes</li>
                  <li>Live HSL gradient visualization</li>
                  <li>Copy HEX values with one click</li>
                  <li>Optional gradient color selection</li>
                  <li>Removable color swatches</li>
                </ul>
              </div>
            </div>

            <div className="bg-[var(--card-background)] rounded-lg border border-[var(--card-border)] p-6">
              <h3 className="text-xl font-medium mb-4">Interactive Demo</h3>
              <ColorPicker colorKey="primary" label="Try the Color Picker" canRemove={false} />
            </div>
          </div>
        </section>
      </div>
    ),

    components: (
      <div className="space-y-8">
        <section id="components-overview">
          <h2 className="text-3xl font-bold mb-4">Components</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Preview and export ready-made components styled with your theme colors:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)]">
              <h3 className="text-xl font-medium mb-3">Interactive Preview</h3>
              <p className="text-[var(--text-secondary)] mb-4">Test your theme with live components:</p>
              <ul className="list-disc pl-6 text-[var(--text-secondary)]">
                <li>Statistics cards</li>
                <li>Image overlays with gradients</li>
                <li>Schedule/Calendar cards</li>
                <li>Data visualization</li>
                <li>Interactive buttons and controls</li>
              </ul>
            </div>

            <div className="p-6 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)]">
              <h3 className="text-xl font-medium mb-3">Export Options</h3>
              <p className="text-[var(--text-secondary)] mb-4">Download components in multiple formats:</p>
              <ul className="list-disc pl-6 text-[var(--text-secondary)]">
                <li>React components</li>
                <li>Tailwind CSS classes</li>
                <li>HTML/CSS snippets</li>
                <li>Design tokens</li>
              </ul>
            </div>
          </div>
        </section>
        <section id="components-cards">
          <h2 className="text-2xl font-bold mb-4">Component Gallery</h2>
          <div className="rounded-lg border border-[var(--card-border)] p-6">
            <PreviewComponents />
          </div>
        </section>

        <section id="components-buttons">
          <h2 className="text-3xl font-bold mb-4">Buttons</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            A comprehensive set of button components with multiple variants, states, and icon options:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)]">
              <h3 className="text-xl font-medium mb-3">Button Variants</h3>
              <ul className="list-disc pl-6 text-[var(--text-secondary)]">
                <li>Solid, Outline, and Ghost styles</li>
                <li>8 color variants (Primary, Secondary, Accent, etc.)</li>
                <li>Disabled and loading states</li>
                <li>Hover and focus animations</li>
              </ul>
            </div>

            <div className="p-6 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)]">
              <h3 className="text-xl font-medium mb-3">Icon Buttons</h3>
              <ul className="list-disc pl-6 text-[var(--text-secondary)]">
                <li>18+ pre-configured icons</li>
                <li>Square and rounded variants</li>
                <li>Icon-only and icon with text</li>
                <li>Consistent sizing and spacing</li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg border border-[var(--card-border)] p-6">
            <PreviewButton />
          </div>
        </section>

        <section id="components-usage">
          <h2 className="text-2xl font-bold mb-4">Usage Examples</h2>
          <div className="space-y-4">
            <h3 className="font-medium mb-2">Gradient Card</h3>
            <div className="p-4 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)]">
              <pre className="text-sm p-4 rounded-md overflow-x-auto whitespace-pre max-w-full">
                <code className="block">{`<div className="bg-gradient-to-r from-[var(--gradient-color-0)] to-[var(--gradient-color-1)] p-6 rounded-xl">
  <h2 className="text-white text-4xl font-semibold">Title</h2>
  <p className="text-white/80">Description</p>
</div>`}</code>
              </pre>
            </div>
            <h3 className="font-medium mb-2">Image Overlay</h3>
            <div className="p-4 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)]">
              <pre className="text-sm p-4 rounded-md overflow-x-auto whitespace-pre max-w-full">
                <code className="block">{`<div className="relative rounded-xl overflow-hidden group">
  <Image src="..." alt="..." className="w-full h-full object-cover" />
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
</div>`}</code>
              </pre>
            </div>
            <h3 className="font-medium mb-2">Standard Button</h3>
            <div className="p-4 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)]">
              <pre className="text-sm p-4 rounded-md overflow-x-auto whitespace-pre max-w-full">
                <code className="block">{`<button 
  className="bg-primary text-white px-4 py-2 rounded-md font-medium
  hover:bg-primary-dark focus:ring-2 focus:ring-primary-500"
>
  Button Text
</button>`}</code>
              </pre>
            </div>
            <h3 className="font-medium mb-2">Icon Button</h3>
            <div className="p-4 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)]">
              <pre className="text-sm p-4 rounded-md overflow-x-auto whitespace-pre max-w-full">
                <code className="block">{`<button 
  className="p-2 rounded-lg bg-primary hover:bg-primary-dark text-white"
>
  <Icon size={22} />
</button>`}</code>
              </pre>
            </div>
          </div>
        </section>
      </div>
    ),
    gradients: (
      <div className="space-y-8">
        <section id="gradients-gradient-types">
          <h2 className="text-3xl font-bold mb-4">Gradient Types</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Choose from six different gradient types: Linear (4 directions), Diagonal, and Radial gradients.
          </p>
          <GradientPreview />
        </section>

        <section id="gradients-customization">
          <h2 className="text-2xl font-bold mb-4">Customization</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            Customize gradients with up to three color stops:
          </p>
          <div className="bg-[var(--card-background)] p-4 rounded-lg border border-[var(--card-border)]">
            <pre className="text-sm p-4 rounded-md overflow-x-auto whitespace-pre max-w-full">
              <code className="block">{`:root {
  --gradient-color-0: #primary;
  --gradient-color-1: #secondary;
  --gradient-color-2: #accent;  // Optional third color
}`}</code>
            </pre>
          </div>
        </section>

        <section id="gradients-usage">
          <h2 className="text-2xl font-bold mb-4">Usage Examples</h2>
          <div className="space-y-4">
            <h3 className="font-medium">Linear Gradient</h3>
            <pre className="text-sm bg-[var(--card-background)] p-4 rounded-md overflow-x-auto whitespace-pre max-w-full">
              <code className="block">{`<div className="bg-gradient-to-r from-[var(--gradient-color-0)] to-[var(--gradient-color-1)]" />`}</code>
            </pre>

            <h3 className="font-medium">Radial Gradient</h3>
            <pre className="text-sm bg-[var(--card-background)] p-4 rounded-md overflow-x-auto whitespace-pre max-w-full">
              <code className="block">{`<div className="bg-[--radial-gradient]" />`}</code>
            </pre>
          </div>
        </section>
      </div>
    ),

    export: (
      <div className="space-y-8">
        <section id="export-formats">
          <h2 className="text-3xl font-bold mb-4">Export Formats</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Export your theme in multiple formats to seamlessly integrate with your development workflow:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 border border-[var(--card-border)] rounded-lg">
              <h3 className="font-medium mb-2">Color Scales</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Complete color scale system with variations
              </p>
              <CopyStylesButton visibleColorKeys={Object.keys(colors) as (keyof ThemeColors)[]} />
            </div>
            <div className="p-4 border border-[var(--card-border)] rounded-lg">
              <h3 className="font-medium mb-2">Gradients</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Custom gradient configurations</p>
              <CopyGradientsButton />
            </div>
            <div className="p-4 border border-[var(--card-border)] rounded-lg">
              <h3 className="font-medium mb-2">Status Colors</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Semantic color definitions</p>
              <CopyStatusColorsButton />
            </div>
          </div>
        </section>

        <section id="export-integration">
          <h2 className="text-2xl font-bold mb-4">Integration Guide</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-medium">Tailwind CSS</h3>
              <pre className="bg-[var(--card-background)] p-4 rounded-lg text-sm overflow-x-auto">
                <code>{`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Paste your exported theme here
      }
    }
  }
}`}</code>
              </pre>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">CSS Variables</h3>
              <pre className="bg-[var(--card-background)] p-4 rounded-lg text-sm overflow-x-auto">
                <code>{`:root {
  /* Paste your exported CSS variables here */
}`}</code>
              </pre>
            </div>
          </div>
        </section>

        <section id="export-examples">
          <h2 className="text-2xl font-bold mb-4">Examples</h2>
          <div className="space-y-4">
            <p className="text-[var(--text-secondary)]">Available output formats:</p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--text-secondary)]">
              <li>HEX values</li>
              <li>Tailwind v3 config</li>
              <li>Tailwind v4 config</li>
              <li>SCSS variables</li>
              <li>CSS Custom Properties (HEX)</li>
              <li>CSS Custom Properties (HSL)</li>
              <li>CSS Custom Properties (RGB)</li>
              <li>Figma-compatible format</li>
            </ul>
            <div className="mt-6 p-4 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)]">
              <p className="text-sm text-[var(--text-secondary)]">
                Click any &quot;Copy&quot; button above to see live examples of each format
              </p>
            </div>
          </div>
        </section>
      </div>
    ),
    configuration: (
      <div className="space-y-8">
        <section id="configuration-settings">
          <h2 className="text-3xl font-bold mb-4">Configuration</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Customize your theme generation experience with comprehensive settings:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)]">
              <h3 className="text-xl font-medium mb-3">Theme Settings</h3>
              <ul className="list-disc pl-6 text-[var(--text-secondary)]">
                <li>Theme Mode (System/Light/Dark)</li>
                <li>Color Format (HEX/RGB/HSL)</li>
                <li>Default Color Scale (3/5/7/9)</li>
                <li>Initial Colors Shown (1-3)</li>
              </ul>
            </div>

            <div className="p-6 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)]">
              <h3 className="text-xl font-medium mb-3">Export Preferences</h3>
              <ul className="list-disc pl-6 text-[var(--text-secondary)]">
                <li>CSS Variables</li>
                <li>Tailwind Config</li>
                <li>SCSS Variables</li>
                <li>Theme Saving & Sharing</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="configuration-theme-management">
          <h2 className="text-2xl font-bold mb-4">Theme Management</h2>
          <div className="space-y-4">
            <div className="p-6 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)]">
              <h3 className="text-xl font-medium mb-3">Saving Themes</h3>
              <p className="text-[var(--text-secondary)] mb-4">
                Save your themes with custom names to access them later in the &quot;Saved Themes&quot;
                section. All saved themes are available across devices when you&apos;re signed in.
              </p>
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <ArrowRight className="w-4 h-4" />
                <span>Access your saved themes from the sidebar under &quot;Saved Themes&quot;</span>
              </div>
            </div>
          </div>
        </section>

        <section id="configuration-user-preferences">
          <h2 className="text-2xl font-bold mb-4">User Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)]">
              <h3 className="text-xl font-medium mb-3">Application Settings</h3>
              <ul className="list-disc pl-6 text-[var(--text-secondary)]">
                <li>Sidebar Default State</li>
                <li>Default Active Tab</li>
                <li>Theme Preview Mode</li>
                <li>Auto-save Preferences</li>
              </ul>
            </div>

            <div className="p-6 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)]">
              <h3 className="text-xl font-medium mb-3">Account Management</h3>
              <ul className="list-disc pl-6 text-[var(--text-secondary)]">
                <li>Profile Settings</li>
                <li>Theme Collection Management</li>
                <li>Export History</li>
                <li>Usage Analytics</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    ),
    demo: (
      <div className="space-y-8">
        <section id="demo-preview">
          <h2 className="text-3xl font-bold mb-4">Theme Preview</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Test your theme in a real-world context using our interactive demo features:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)]">
              <h3 className="text-xl font-medium mb-3">Landing Page Demo</h3>
              <p className="text-[var(--text-secondary)] mb-4">
                Visit our landing page to see your theme applied to:
              </p>
              <ul className="list-disc pl-6 text-[var(--text-secondary)]">
                <li>Hero sections</li>
                <li>Feature cards</li>
                <li>Call-to-action buttons</li>
              </ul>
            </div>

            <div className="p-6 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)]">
              <h3 className="text-xl font-medium mb-3">Share Your Theme</h3>
              <p className="text-[var(--text-secondary)] mb-4">Generate a shareable preview link:</p>
              <ul className="list-disc pl-6 text-[var(--text-secondary)]">
                <li>Unique preview URL</li>
                <li>Interactive component demos</li>
                <li>Export options</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    ),
    // Add more sections here...
  };

  return (
    <div className="prose prose-lg max-w-none">
      {sections[activeSection as keyof typeof sections] || (
        <div className="text-center py-12 text-[var(--text-secondary)]">
          Select a section from the sidebar to view documentation
        </div>
      )}
    </div>
  );
}
