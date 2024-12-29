import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";

type ShortThemeData = {
  c: {
    p: string;
    s?: string;
    a?: string;
  };
  g: string[];
  o: {
    m: boolean;
    g: boolean;
    e: boolean;
  };
  v: number;
};

export type ThemeData = {
  colors: {
    primary: string;
    secondary?: string;
    accent?: string;
  };
  gradients: string[];
  options: {
    components: boolean;
    gradients: boolean;
    exports: boolean;
  };
  visibleColors: number;
};

const toShort = (data: ThemeData): ShortThemeData => ({
  c: {
    p: data.colors.primary,
    s: data.colors.secondary,
    a: data.colors.accent,
  },
  g: data.gradients,
  o: {
    m: data.options.components,
    g: data.options.gradients,
    e: data.options.exports,
  },
  v: data.visibleColors,
});

const fromShort = (data: ShortThemeData): ThemeData => ({
  colors: {
    primary: data.c.p,
    secondary: data.c.s || data.c.p,
    accent: data.c.a || data.c.p,
  },
  gradients: data.g,
  options: {
    components: data.o.m,
    gradients: data.o.g,
    exports: data.o.e,
  },
  visibleColors: data.v,
});

export const generateShareableUrl = (themeData: ThemeData): string => {
  // console.log("Shareable URL generated:", themeData);

  try {
    const shortData = toShort(themeData);
    const jsonString = JSON.stringify(shortData);
    const compressed = compressToEncodedURIComponent(jsonString);
    return `${window.location.origin}/preview?theme=${compressed}`;
  } catch (error) {
    console.error("Failed to generate shareable URL:", error);
    return `${window.location.origin}/preview`;
  }
};

export const decodeThemeData = (encodedData: string): ThemeData => {
  try {
    const decompressed = decompressFromEncodedURIComponent(encodedData);
    const parsedShort = JSON.parse(decompressed) as ShortThemeData;
    const parsed = fromShort(parsedShort);

    // console.log("Decoded theme data:", parsed);

    return parsed;
  } catch (error) {
    console.error("Theme decoding failed:", error);
    return {
      colors: { primary: "#0070f3" },
      gradients: [],
      options: { components: true, gradients: false, exports: false },
      visibleColors: 3,
    };
  }
};
