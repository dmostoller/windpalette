"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Modal } from "./ui/Modal";

type ComponentType = "GradientOverlayCard" | "GradientMaskCard" | "SimpleGradientCard";

interface Props {
  componentType: ComponentType;
  variant?: string;
}

const getComponentCode = (type: ComponentType): string => {
  const templates = {
    GradientOverlayCard: `import { ArrowRight, Share } from 'lucide-react';

const GradientOverlayCard = () => {
  return (
    <div className="relative h-full rounded-xl overflow-hidden group">
      <img
        src="/path-to-image.jpg"
        alt="Card image"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-radial opacity-30 group-hover:opacity-70 transition-opacity duration-300" />
      <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
        <h2 className="text-white text-4xl font-bold mb-4 drop-shadow-lg">Image Caption</h2>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-gradient-radial border border-primary-dark rounded-lg text-white font-medium shadow-lg backdrop-blur-sm hover:scale-105 hover:shadow-xl hover:border-primary transition-all duration-300 flex items-center gap-2">
            <span>View Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="px-6 py-2 bg-white/10 border border-primary rounded-lg text-white font-medium shadow-lg backdrop-blur-sm hover:scale-105 hover:shadow-xl hover:border-white/50 hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
            <span>Share</span>
            <Share className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}`,

    GradientMaskCard: `
const GradientMaskCard = () => {
  return (
    <div className="relative aspect-square overflow-hidden rounded-xl group shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-500">
      <img
        src="/path-to-image.jpg"
        alt="Card image"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div 
        className="absolute inset-0 bg-gradient-radial opacity-60 group-hover:opacity-80 transition-all duration-500"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 85%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 85%)",
        }}
      />
      <p className="absolute px-2 bottom-6 left-8 text-white text-5xl font-bold z-10 transition-transform duration-500 group-hover:translate-y-[-4px]">
        Save <span className="text-primary group-hover:text-white transition-colors duration-500">color scales</span>
      </p>
    </div>
  );
}`,

    SimpleGradientCard: `
const SimpleGradientCard = () => {
  return (
    <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg">
      <img
        src="/path-to-image.jpg"
        alt="Card image"
        className="w-full h-full object-cover"
      />

      {/* Gradient borders */}
      <div className="absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-radial opacity-75 rounded-t-xl" />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-radial opacity-75 rounded-b-xl" />
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-radial opacity-75 rounded-l-xl" />
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-radial opacity-75 rounded-r-xl" />
      </div>

      {/* Text overlay */}
      <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-white text-5xl font-bold">
          Build beautiful <span className="text-primary">design systems</span>
        </p>
      </div>
    </div>
  );
}`,
  };

  return templates[type];
};

export function CopyComponentButton({ componentType }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    const code = getComponentCode(componentType);
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 bg-white/20 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-colors"
      >
        <Copy className="h-4 w-4 text-white" />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Copy Component Code</h3>
          <div className="relative">
            <pre className="bg-[var(--card-background)] p-4 rounded-md overflow-x-auto">
              <code className="text-xs">{getComponentCode(componentType)}</code>
            </pre>
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
