"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/types";
import {
  textContainerVariants,
  textItemVariants,
  lineVariants,
} from "@/lib/animation";
import { useIsMobile } from "@/hooks/use-mobile";

const Title = ({ title, spanText }: SectionTitle) => {
  const isMobile = useIsMobile();
  const lineId = useId();

  const lineLength = isMobile ? 55 : 300;

  const shape: React.CSSProperties = {
    y: isMobile ? 6 : 12,
    strokeWidth: isMobile ? 1 : 4,
    strokeLinecap: "round",
    fill: "transparent",
  };

  return (
    <motion.div
      variants={textContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.4 }}
      className="flex flex-col justify-center text-center mb-4"
    >
      <motion.h3
        variants={textItemVariants}
        className="font-semibold text-2xl md:text-3xl lg:text-4xl"
      >
        {title} {spanText && <span className="text-primary">{spanText}</span>}
      </motion.h3>

      <svg
        id={lineId}
        aria-hidden="true"
        viewBox={`0 0 ${lineLength} 20`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-1/6 h-full mx-auto"
      >
        <motion.line
          variants={lineVariants}
          x1={0}
          y1={0}
          x2={lineLength}
          y2={0}
          className="stroke-primary"
          style={shape}
        />
      </svg>
    </motion.div>
  );
};

export default Title;
