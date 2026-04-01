"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function MotionDiv({
  children,
  index = 0,
}: {
  children: ReactNode;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      {children}
    </motion.div>
  );
}
