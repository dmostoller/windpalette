"use client";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";

const sparkleVariants: Variants = {
  animate: {
    y: [0, -2, 0],
    fill: ["none", "currentColor", "none"],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const starVariants: Variants = {
  animate: {
    opacity: [1, 0, 1, 0, 1],
    scale: [1, 1.2, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const SparklesIcon = () => {
  return (
    <div className="select-none rounded-md flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
          variants={sparkleVariants}
          animate="animate"
        />
        <motion.path d="M20 3v4" variants={starVariants} animate="animate" />
        <motion.path d="M22 5h-4" variants={starVariants} animate="animate" />
        <motion.path d="M4 17v2" variants={starVariants} animate="animate" />
        <motion.path d="M5 18H3" variants={starVariants} animate="animate" />
      </svg>
    </div>
  );
};
export { SparklesIcon };
