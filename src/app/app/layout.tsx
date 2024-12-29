import { ThemeProvider } from "@/context/ThemeContext";
import { SettingsProvider } from "@/context/SettingsContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <ThemeProvider initialVisibleColors={1}>{children}</ThemeProvider>
    </SettingsProvider>
  );
}
