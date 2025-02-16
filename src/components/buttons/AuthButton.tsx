import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { LogOut, LogIn } from "lucide-react";

interface AuthButtonProps {
  isSidebarCollapsed: boolean;

  setActiveTab: (
    item:
      | "browse"
      | "colors"
      | "components"
      | "gradients"
      | "buttons"
      | "archive"
      | "help"
      | "user"
      | "settings",
  ) => void;
}

export default function AuthButton({ isSidebarCollapsed, setActiveTab }: AuthButtonProps) {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className={`flex ${isSidebarCollapsed ? "flex-col" : "items-center"} gap-4`}>
        <Image
          src={session.user.image!}
          alt={session.user.name!}
          width={38}
          height={38}
          className="rounded-lg hover:ring-2 hover:ring-[var(--primary)] transition-all cursor-pointer"
          onClick={() => setActiveTab("user")}
        />
        <button
          onClick={() => signOut()}
          className={`${
            isSidebarCollapsed ? "p-2" : "px-4 py-2"
          } text-white rounded-lg hover:opacity-80 transition-opacity flex items-center justify-center gap-2 bg-[var(--neutral)] w-full`}
        >
          {isSidebarCollapsed ? (
            <LogOut size={20} />
          ) : (
            <>
              <LogOut size={20} />
              <span>Sign Out</span>
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className={`${
        isSidebarCollapsed ? "p-2" : "px-4 py-2"
      } bg-[var(--primary)] text-white rounded-lg hover:opacity-80 transition-opacity justify-center flex items-center gap-2 w-full`}
    >
      {isSidebarCollapsed ? (
        <LogIn size={20} />
      ) : (
        <>
          <LogIn size={20} />
          <span>Sign In</span>
        </>
      )}{" "}
    </button>
  );
}
