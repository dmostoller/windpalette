type SearchableSection = {
  id: string;
  title: string;
  content: string;
  keywords: string[];
  subsections: {
    id: string;
    title: string;
    content: string;
  }[];
};

export const SEARCHABLE_CONTENT: SearchableSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    content:
      "Learn how to get started with our theme generator. Create and manage consistent color themes for your applications.",
    keywords: ["setup", "installation", "begin", "start", "guide", "quick start", "introduction"],
    subsections: [
      {
        id: "introduction",
        title: "Introduction",
        content:
          "Theme Generator is a powerful tool designed to help developers create and manage consistent color themes for their applications.",
      },
      {
        id: "quick-start",
        title: "Quick Start Guide",
        content:
          "Get started with Theme Generator in three simple steps: Choose your primary color, add secondary and accent colors, and export your theme.",
      },
      {
        id: "installation",
        title: "Installation",
        content:
          "Learn how to integrate the exported theme into your project using Tailwind CSS configuration or CSS variables.",
      },
    ],
  },
  {
    id: "colors",
    title: "Colors",
    content:
      "Comprehensive color system with predefined colors, custom color picker, and automatic scale generation.",
    keywords: ["color", "palette", "picker", "hsl", "hex", "rgb", "scale", "shade", "customization"],
    subsections: [
      {
        id: "color-system",
        title: "Color System",
        content:
          "Our color system provides two powerful ways to create your perfect color palette: browse predefined colors or use the custom color picker.",
      },
      {
        id: "color-scales",
        title: "Color Scales",
        content:
          "Each color automatically generates a complete scale from 50 to 950, ensuring consistent light and dark variants for every use case.",
      },
      {
        id: "color-customization",
        title: "Color Customization",
        content:
          "Fine-tune your colors with our advanced color picker featuring HSL controls, live preview, and gradient integration.",
      },
    ],
  },
  {
    id: "components",
    title: "Components",
    content: "Preview and export ready-made components styled with your theme colors.",
    keywords: ["components", "ui", "buttons", "cards", "preview", "export", "interface"],
    subsections: [
      {
        id: "overview",
        title: "Overview",
        content:
          "Test your theme with live components including statistics cards, image overlays, and interactive buttons.",
      },
      {
        id: "buttons",
        title: "Buttons",
        content: "Comprehensive set of button components with multiple variants, states, and icon options.",
      },
      {
        id: "usage",
        title: "Usage Examples",
        content: "Implementation examples for gradient cards, image overlays, and various button styles.",
      },
    ],
  },
  {
    id: "gradients",
    title: "Gradients",
    content: "Create and customize beautiful gradients with multiple types and color stops.",
    keywords: ["gradient", "linear", "radial", "diagonal", "color stops", "transition"],
    subsections: [
      {
        id: "gradient-types",
        title: "Gradient Types",
        content:
          "Choose from six different gradient types: Linear (4 directions), Diagonal, and Radial gradients.",
      },
      {
        id: "customization",
        title: "Customization",
        content: "Customize gradients with up to three color stops and different direction options.",
      },
      {
        id: "usage",
        title: "Usage Examples",
        content: "Implementation examples for linear and radial gradients using CSS custom properties.",
      },
    ],
  },
  {
    id: "export",
    title: "Export",
    content: "Export your theme in multiple formats for seamless integration with your development workflow.",
    keywords: ["export", "download", "save", "integration", "formats", "config"],
    subsections: [
      {
        id: "formats",
        title: "Export Formats",
        content:
          "Export options including color scales, gradients, and status colors in multiple format options.",
      },
      {
        id: "integration",
        title: "Integration Guide",
        content: "Step-by-step guide for integrating exported themes with Tailwind CSS and CSS Variables.",
      },
      {
        id: "examples",
        title: "Examples",
        content: "Available output formats including HEX, RGB, HSL, and framework-specific configurations.",
      },
    ],
  },
  {
    id: "configuration",
    title: "Configuration",
    content: "Customize your theme generation experience with comprehensive settings and preferences.",
    keywords: ["settings", "preferences", "options", "customize", "save", "account", "management"],
    subsections: [
      {
        id: "settings",
        title: "Settings",
        content: "Configure theme mode, color format, scale options, and export preferences.",
      },
      {
        id: "theme-management",
        title: "Theme Management",
        content: "Save and manage your themes with custom names, accessible across devices when signed in.",
      },
      {
        id: "user-preferences",
        title: "User Preferences",
        content: "Manage application settings, account preferences, and theme collections.",
      },
    ],
  },
  {
    id: "demo",
    title: "Demo",
    content: "Preview and test your theme in real-world scenarios using our interactive demo page.",
    keywords: ["preview", "test", "demo", "showcase", "landing page", "share"],
    subsections: [
      {
        id: "preview",
        title: "Theme Preview",
        content:
          "See your theme in action with our interactive component gallery, featuring buttons, cards, and layout elements.",
      },
      {
        id: "landing-page",
        title: "Landing Page",
        content: "Visit our landing page to see how your theme looks in a real-world application context.",
      },
      {
        id: "export-demo",
        title: "Export & Share",
        content: "Export your theme and share it with others by generating a unique preview URL.",
      },
    ],
  },
];
