import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { PieChart, DollarSign, TrendingUp } from "lucide-react";

interface AnalyticsData {
  themesPerMonth: { name: string; count: number }[];
  colorStats: { color: string; usage: number }[];
  exportStats: { format: string; count: number }[];
}

export default function UserAnalytics() {
  const [data, setData] = useState<AnalyticsData>({
    themesPerMonth: [],
    colorStats: [],
    exportStats: [],
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch("/api/analytics");
        if (!response.ok) throw new Error("Failed to fetch analytics");
        const analyticsData = await response.json();
        setData(analyticsData);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchAnalytics();
  }, []);

  if (!data) return <div>Loading analytics...</div>;

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--card-background)] p-6 rounded-lg border border-[var(--card-border)]">
          <div className="flex items-center gap-3 mb-2">
            <PieChart className="w-5 h-5 text-[var(--primary)]" />
            <h3 className="font-medium">Theme Creation Rate</h3>
          </div>
          <p className="text-3xl font-bold">+12%</p>
          <p className="text-sm text-[var(--text-secondary)]">vs last month</p>
        </div>

        <div className="bg-[var(--card-background)] p-6 rounded-lg border border-[var(--card-border)]">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-[var(--primary)]" />
            <h3 className="font-medium">Most Active Day</h3>
          </div>
          <p className="text-3xl font-bold">Tuesday</p>
          <p className="text-sm text-[var(--text-secondary)]">4 themes created</p>
        </div>

        <div className="bg-[var(--card-background)] p-6 rounded-lg border border-[var(--card-border)]">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-[var(--primary)]" />
            <h3 className="font-medium">Export Rate</h3>
          </div>
          <p className="text-3xl font-bold">85%</p>
          <p className="text-sm text-[var(--text-secondary)]">themes exported</p>
        </div>
      </div>

      {/* Theme Creation Timeline */}
      <div className="bg-[var(--card-background)] p-6 rounded-lg border border-[var(--card-border)]">
        <h3 className="text-lg font-medium mb-6">Theme Creation Timeline</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.themesPerMonth}>
              <XAxis dataKey="name" tickFormatter={(value) => value} />
              <YAxis
                allowDecimals={false}
                label={{ value: "Themes Created", angle: -90, position: "insideLeft" }}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--card-background)",
                  border: "1px solid var(--card-border)",
                }}
                cursor={{ fill: "var(--primary-100)" }}
              />
              <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Color Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[var(--card-background)] p-6 rounded-lg border border-[var(--card-border)]">
          <h3 className="text-lg font-medium mb-4">Popular Colors</h3>
          <div className="space-y-4">
            {data.colorStats.slice(0, 5).map(({ color, usage }) => (
              <div key={color} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: color }} />
                <div className="flex-1">
                  <div className="text-sm font-medium">{color}</div>
                  <div className="text-xs text-[var(--text-secondary)]">Used in {usage} themes</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--card-background)] p-6 rounded-lg border border-[var(--card-border)]">
          <h3 className="text-lg font-medium mb-4">Export Formats</h3>
          <div className="space-y-4">
            {data.exportStats.map(({ format, count }) => (
              <div key={format} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="text-sm font-medium">{format}</div>
                  <div className="text-xs text-[var(--text-secondary)]">{count} exports</div>
                </div>
                <div className="w-24 h-2 bg-[var(--card2-background)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--primary)]"
                    style={{
                      width: `${(count / Math.max(...data.exportStats.map((s) => s.count))) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
