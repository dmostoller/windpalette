import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Modal } from "./ui/Modal";
import { Copy, QrCode, Twitter, Link } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { generateShareableUrl, ThemeData } from "@/utils/share";

interface ShareThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareThemeModal({ isOpen, onClose }: ShareThemeModalProps) {
  const { colors, gradients, visibleColors } = useTheme();
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const getThemeUrl = (): string => {
    const themeData: ThemeData = {
      colors: {
        primary: typeof colors.primary === "string" ? colors.primary : colors.primary.base,
        secondary: typeof colors.secondary === "string" ? colors.secondary : colors.secondary.base,
        accent: typeof colors.accent === "string" ? colors.accent : colors.accent.base,
      },
      gradients: gradients.colors.filter((c) => c.active).map((c) => c.color),
      options: { components: true, gradients: true, exports: true },
      visibleColors,
    };

    return generateShareableUrl(themeData);
  };

  const copyToClipboard = async () => {
    const url = getThemeUrl();
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    const url = getThemeUrl();
    const text = "Check out my theme created with WindPallete!";
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  const openPreview = () => {
    const url = getThemeUrl();
    window.open(url, "_blank");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Share Your Theme</h3>
          <p className="text-[var(--text-secondary)]">
            Generate a unique URL to share your theme with others
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-600)] transition-colors"
            >
              {copied ? "Copied!" : "Copy URL"}
              <Copy className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowQR(!showQR)}
              className="flex items-center gap-2 px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--background)] transition-colors"
            >
              <QrCode className="w-4 h-4" />
              QR Code
            </button>
          </div>

          {showQR && (
            <div className="p-4 bg-white rounded-lg">
              <QRCodeSVG value={getThemeUrl()} size={200} />
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={shareOnTwitter}
              className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors"
            >
              <Twitter className="w-4 h-4" />
              Share<span className="hidden md:inline"> on Twitter</span>
            </button>
            <button
              onClick={openPreview}
              className="flex items-center gap-2 px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--background)] transition-colors"
            >
              <Link className="w-4 h-4" />
              <span className="hidden md:inline">Open</span> Preview
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
