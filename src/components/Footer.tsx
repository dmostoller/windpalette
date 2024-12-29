import Link from "next/link";
import { Mail } from "lucide-react";
import Image from "next/image";
import { Bluesky } from "./icons/Bluesky";

export default function Footer() {
  return (
    <footer className="bg-[var(--card-background)] border-t border-[var(--card-border)]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/windpalletelogo.png"
                alt="WindPallete Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <h3 className="text-xl font-bold">WindPallete</h3>
            </div>
            <p className="text-sm text-[var(--foreground)] opacity-70">
              Create beautiful Tailwind CSS color themes for your next project with ease.
            </p>
          </div>

          {/* Product Column */}
          <div className="space-y-4">
            <h4 className="font-semibold">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/app" className="text-sm text-[var(--foreground)] opacity-70 hover:opacity-100">
                  Theme Builder App
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-[var(--foreground)] opacity-70 hover:opacity-100">
                  About
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-sm text-[var(--foreground)] opacity-70 hover:opacity-100">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-[var(--foreground)] opacity-70 hover:opacity-100"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-[var(--foreground)] opacity-70 hover:opacity-100">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="space-y-4">
            <h4 className="font-semibold">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://discord.gg/Gxh3ZzeXxQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground)] opacity-80 hover:opacity-100"
              >
                <div className="relative w-5 h-5">
                  <Image
                    src="/discord-black.png"
                    alt="Discord"
                    width={32}
                    height={32}
                    className="absolute dark:hidden"
                  />
                  <Image
                    src="/discord-white.png"
                    alt="Discord"
                    width={32}
                    height={32}
                    className="hidden dark:block absolute"
                  />
                </div>
              </a>
              <a
                href="https://bsky.app/profile/davemostoller.bsky.social"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground)] opacity-70 hover:opacity-100"
              >
                <Bluesky className="w-5 h-5" />
              </a>
              <a
                href="mailto:dave.mostoller.dev@gmail.com"
                className="text-[var(--foreground)] opacity-70 hover:opacity-100"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--card-border)]">
          <p className="text-center text-sm text-[var(--foreground)] opacity-70">
            © {new Date().getFullYear()} WindPallete. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
