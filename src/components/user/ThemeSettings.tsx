import { useSettings } from "../../hooks/useSettings";
import { ThemeMode, ColorFormat, ColorScale, DefaultTab } from "../../types/settings";

export default function ThemeSettings() {
  const { settings, updateSettings } = useSettings();
  const activeTab = useSettings().settings.defaultTab;

  const handleTabChange = (tabId: DefaultTab) => {
    updateSettings({ defaultTab: tabId });
  };

  return (
    <div className="space-y-8">
      {/* Appearance */}
      <section className="space-y-4">
        <h4 className="text-lg font-medium">Appearance</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-[var(--card-border)] rounded-lg">
            <label className="block mb-2">Theme Mode</label>
            <select
              className="w-full p-2 rounded bg-[var(--card2-background)] border border-[var(--card-border)]"
              value={settings.themeMode}
              onChange={(e) => updateSettings({ themeMode: e.target.value as ThemeMode })}
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="p-4 border border-[var(--card-border)] rounded-lg">
            <label className="block mb-2">Color Format</label>
            <select
              className="w-full p-2 rounded bg-[var(--card2-background)] border border-[var(--card-border)]"
              value={settings.colorFormat}
              onChange={(e) => updateSettings({ colorFormat: e.target.value as ColorFormat })}
            >
              <option value="HEX">HEX</option>
              <option value="RGB">RGB</option>
              <option value="HSL">HSL</option>
            </select>
          </div>
        </div>
      </section>

      {/* Export Settings
      <section className="space-y-4">
        <h4 className="text-lg font-medium">Export Preferences</h4>
        <div className="p-4 border border-[var(--card-border)] rounded-lg">
          <label className="block mb-2">Default Export Format</label>
          <select
            className="w-full p-2 rounded bg-[var(--card2-background)] border border-[var(--card-border)]"
            value={settings.exportFormat}
            onChange={(e) => updateSettings({ exportFormat: e.target.value as ExportFormat })}
          >
            <option value="Tailwind Variables">Tailwind Variables</option>
            <option value="CSS Variables">CSS Variables</option>
            <option value="Tailwind Config">Tailwind Config</option>
            <option value="SCSS Variables">SCSS Variables</option>
          </select>
        </div>
      </section> */}

      {/* Personalization */}
      <section className="space-y-4">
        <h4 className="text-lg font-medium">Personalization</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-[var(--card-border)] rounded-lg">
            <label className="block mb-2">Default Color Scale</label>
            <select
              className="w-full p-2 rounded bg-[var(--card2-background)] border border-[var(--card-border)]"
              value={settings.colorScale}
              onChange={(e) => updateSettings({ colorScale: e.target.value as ColorScale })}
            >
              <option value="1">1 (Darkest)</option>
              <option value="3">3 (Darker)</option>
              <option value="5">5 (Balanced)</option>
              <option value="7">7 (Lighter)</option>
              <option value="9">9 (Lightest)</option>
            </select>
          </div>
          <div className="p-4 border border-[var(--card-border)] rounded-lg">
            <label className="block mb-2">Initial Colors Shown</label>
            <select
              className="w-full p-2 rounded bg-[var(--card2-background)] border border-[var(--card-border)]"
              value={settings.initialColors}
              onChange={(e) => updateSettings({ initialColors: e.target.value })}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>
      </section>

      {/* Application */}
      <section className="space-y-4">
        <h4 className="text-lg font-medium">Application</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-[var(--card-border)] rounded-lg">
            <label className="block mb-2">Sidebar Default State</label>
            <select
              className="w-full p-2 rounded bg-[var(--card2-background)] border border-[var(--card-border)]"
              value={settings.sidebarState}
              onChange={(e) => updateSettings({ sidebarState: e.target.value })}
            >
              <option value="expanded">Expanded</option>
              <option value="collapsed">Collapsed</option>
            </select>
          </div>
          <div className="p-4 border border-[var(--card-border)] rounded-lg">
            <label className="block mb-2">Default Tab</label>
            <select
              className="w-full p-2 rounded bg-[var(--card2-background)] border border-[var(--card-border)]"
              value={activeTab}
              onChange={(e) => handleTabChange(e.target.value as DefaultTab)}
            >
              <option value="colors">Colors</option>
              <option value="components">Components</option>
              <option value="gradients">Gradients</option>
              <option value="buttons">Buttons</option>
              <option value="saved themes">Saved Themes</option>
              <option value="browse">Browse</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}
