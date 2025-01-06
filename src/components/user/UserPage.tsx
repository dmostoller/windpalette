import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { DeleteAccountModal } from "@/components/user/DeleteAccountModal";
import ThemeSettings from "@/components/user/ThemeSettings";
import { Settings, User, Palette, BarChart3, LogOut, Trash2 } from "lucide-react";
import UserThemes from "@/components/user/UserThemes";
import UserAnalytics from "@/components/user/UserAnalytics";

export default function UserPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("settings");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const tabs = [
    { id: "settings", icon: Settings, label: "Settings" },
    { id: "themes", icon: Palette, label: "My Themes" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
    { id: "account", icon: User, label: "Account" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 flex items-center space-x-6">
        <Image
          src={session?.user?.image || "/default-avatar.png"}
          alt={session?.user?.name || "User"}
          width={120}
          height={120}
          className="rounded-full ring-4 ring-[var(--primary-500)]"
        />
        <div>
          <h1 className="text-3xl font-bold">{session?.user?.name}</h1>
          <p className="text-[var(--text-secondary)]">{session?.user?.email}</p>
        </div>
      </div>

      <div className="flex overflow-x-auto w-full border-b border-[var(--card-border)] mb-8 scrollbar-hide">
        <div className="flex min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-[var(--primary)] text-[var(--primary)]"
                  : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {activeTab === "settings" && <ThemeSettings />}

        {activeTab === "themes" && <UserThemes />}

        {activeTab === "analytics" && <UserAnalytics />}

        {activeTab === "account" && (
          <div className="space-y-8">
            <div className="p-6 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
              <h3 className="text-xl font-semibold mb-6">Account Actions</h3>
              <div className="space-y-4">
                <button className="flex items-center gap-2 w-full p-4 text-left rounded-lg hover:bg-[var(--card2-background)]">
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="flex items-center gap-2 w-full p-4 text-left rounded-lg hover:bg-red-50 text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <DeleteAccountModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />
    </div>
  );
}
