"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { BarChart, Users, Save } from "lucide-react";

type StatsData = {
  today: {
    activeUsers: number;
    savedThemes: number;
  };
  total: {
    savedThemes: number;
  };
  historical: {
    date: Date;
    activeUsers: number;
    savedThemes: number;
  }[];
  lastUpdated: Date;
};

export default function Stats() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/stats");
        const data = await response.json();
        // Convert date strings to Date objects
        const formattedData = {
          ...data,
          historical: data.historical.map(
            (day: { date: string; activeUsers: number; savedThemes: number }) => ({
              ...day,
              date: new Date(day.date),
            }),
          ),
          lastUpdated: new Date(data.lastUpdated),
        };
        setStats(formattedData);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return <div className="max-w-6xl mx-auto p-4">Loading statistics...</div>;
  }

  if (!stats) {
    return <div className="max-w-6xl mx-auto p-4">Failed to load statistics.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Daily Active Users */}
        <div className="p-6 bg-[var(--card)] rounded-lg border border-[var(--card-border)]">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-[var(--primary)]" />
            <h2 className="font-semibold">Daily Active Users</h2>
          </div>
          <div className="text-3xl font-bold">{stats.today.activeUsers}</div>
          <p className="text-sm text-[var(--muted-foreground)] mt-2">Users active today</p>
        </div>

        {/* Total Saved Themes */}
        <div className="p-6 bg-[var(--card)] rounded-lg border border-[var(--card-border)]">
          <div className="flex items-center gap-2 mb-4">
            <Save className="w-5 h-5 text-[var(--secondary)]" />
            <h2 className="font-semibold">Total Saved Themes</h2>
          </div>
          <div className="text-3xl font-bold">{stats.total.savedThemes}</div>
          <p className="text-sm text-[var(--muted-foreground)] mt-2">All time</p>
        </div>

        {/* Today's Saved Themes */}
        <div className="p-6 bg-[var(--card)] rounded-lg border border-[var(--card-border)]">
          <div className="flex items-center gap-2 mb-4">
            <BarChart className="w-5 h-5 text-[var(--accent)]" />
            <h2 className="font-semibold">Today&apos;s Saves</h2>
          </div>
          <div className="text-3xl font-bold">{stats.today.savedThemes}</div>
          <p className="text-sm text-[var(--muted-foreground)] mt-2">Themes saved today</p>
        </div>
      </div>

      {/* Historical Data */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Historical Data</h2>
        <div className="bg-[var(--card)] rounded-lg border border-[var(--card-border)] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Active Users</th>
                <th className="p-4 text-left">Themes Saved</th>
              </tr>
            </thead>
            <tbody>
              {stats.historical.map((day) => (
                <tr key={day.date.toString()} className="border-b border-[var(--card-border)] last:border-0">
                  <td className="p-4">{format(day.date, "MMM d, yyyy")}</td>
                  <td className="p-4">{day.activeUsers}</td>
                  <td className="p-4">{day.savedThemes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm text-[var(--muted-foreground)]">
        Last updated: {format(stats.lastUpdated, "MMM d, yyyy HH:mm")}
      </div>
    </div>
  );
}
