import { Theme } from "@/types/theme";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { ThemeColors } from "@/types/theme";
import { Trash2, Search, X, CircleAlert } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Add SkeletonCard component at the top of file
const SkeletonCard = () => (
  <div className="p-4 bg-[var(--card-background)] border rounded-lg border-[var(--card-border)]">
    <Skeleton
      height={24}
      width="50%"
      baseColor="var(--skeleton-base-color)"
      highlightColor="var(--skeleton-highlight-color)"
      className="dark:opacity-75"
    />
    <div className="flex gap-2 mt-2">
      {[...Array(3)].map((_, i) => (
        <Skeleton
          key={i}
          width={24}
          height={24}
          circle={true}
          baseColor="var(--skeleton-base-color)"
          highlightColor="var(--skeleton-highlight-color)"
          className="dark:opacity-75"
        />
      ))}
    </div>
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="col-span-full p-4 rounded-lg bg-[var(--card-background)] border border-[var(--card-border)]">
    <div className="flex items-center gap-2 text-red-500">
      <CircleAlert className="w-5 h-5" />
      <span>{message}</span>
    </div>
  </div>
);

const SignInPrompt = () => (
  <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 bg-[var(--card-background)] rounded-lg border border-[var(--card-border)]">
    <h3 className="text-xl font-semibold">Please sign in to view saved themes</h3>
    <p className="text-[var(--muted-foreground)]">Sign in to save and manage your custom color themes</p>
  </div>
);

export function ThemesList() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const { setThemeColors, setThemeGradients } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchThemes = async () => {
      if (!session?.user) return;

      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/themes");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (isMounted) {
          setThemes(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to fetch themes");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchThemes();

    return () => {
      isMounted = false;
    };
  }, [session]);

  const handleThemeSelect = (theme: Theme) => {
    const uniqueColors = new Set(Object.values(theme.colors)).size;
    const activeGradients = theme.gradients.colors.filter((c) => c.active).map((c) => c.color);

    const colors: ThemeColors = {
      primary: theme.colors.primary,
      secondary: theme.colors.secondary || theme.colors.primary,
      accent: theme.colors.accent || theme.colors.primary,
    };

    // Set both colors and gradients
    setThemeColors({
      colors,
      visibleColors: uniqueColors,
      gradients: activeGradients,
    });

    // Explicitly set gradients to ensure UI state matches
    setThemeGradients(colors, activeGradients);
  };

  const handleDelete = async (e: React.MouseEvent, themeId: string) => {
    e.stopPropagation(); // Prevent theme selection when deleting

    try {
      await fetch("/api/themes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ themeId }),
      });

      setThemes(themes.filter((theme) => theme.id !== themeId));
    } catch (error) {
      console.error("Failed to delete theme:", error);
    }
  };

  const filteredThemes = themes.filter((theme) => {
    if (!searchQuery) return true;

    try {
      const query = String(searchQuery).toLowerCase().trim();
      const themeName = String(theme.name).toLowerCase();
      return themeName.includes(query);
    } catch (error) {
      console.error("Search error:", error);
      return false;
    }
  });

  if (!session?.user) {
    return <SignInPrompt />;
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search themes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border rounded-lg 
            bg-background text-[var(--foreground)]
            focus:outline-none focus:ring-2 focus:ring-[var(--primary)] 
            focus:border-transparent
            border-[var(--card-border)]"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 
              text-primary hover:text-gray-600 p-1"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {error ? (
          <ErrorMessage message={error} />
        ) : isLoading ? (
          [...Array(12)].map((_, i) => <SkeletonCard key={i} />)
        ) : filteredThemes.length === 0 ? (
          <div className="col-span-3 text-center py-8 text-gray-500">No themes found</div>
        ) : (
          filteredThemes.map((theme) => (
            <div
              key={theme.id}
              className="p-4 bg-[var(--card-background)] border rounded-lg border-[var(--card-border)] hover:border-[var(--primary)] cursor-pointer relative group" // Added relative and group
              onClick={() => handleThemeSelect(theme)}
            >
              <button
                onClick={(e) => handleDelete(e, theme.id)}
                className="absolute text-gray-500 top-2 right-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <h3 className="font-bold">{theme.name}</h3>
              <div className="flex gap-2 mt-2">
                {Object.entries(theme.colors).map(([key, value]) => (
                  <div key={key} className="w-6 h-6 rounded-full" style={{ backgroundColor: value }} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
