"use client";

import type { Variants } from "framer-motion";
import { motion, useAnimation } from "framer-motion";

const rectVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 0.8, 1],
    transition: { duration: 0.4 },
  },
};

const pathVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 0.9, 1],
  },
};

const SquareStackIcon = () => {
  const controls = useAnimation();

  return (
    <div
      className="cursor-pointer select-none p-2 rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          variants={pathVariants}
          animate={controls}
          transition={{
            delay: 0.3,
            duration: 0.4,
          }}
          d="M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"
        />
        <motion.path
          d="M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"
          variants={pathVariants}
          animate={controls}
          transition={{
            delay: 0.2,
            duration: 0.2,
          }}
        />
        <motion.rect variants={rectVariants} width="8" height="8" x="14" y="14" rx="2" animate={controls} />
      </svg>
    </div>
  );
};

export { SquareStackIcon };
