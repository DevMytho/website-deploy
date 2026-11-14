"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * WindowReveal — section-stage windows scale 0.96 → 1 and fade in on enter.
 * Constant initial values (hydration-safe); transform disabled under reduced
 * motion via MotionConfig.
 */
export function WindowReveal({ children }: { children: ReactNode }) {
	return (
		<motion.div
			style={{ width: "100%", display: "flex", justifyContent: "center" }}
			initial={{ scale: 0.96, opacity: 0.3 }}
			whileInView={{ scale: 1, opacity: 1 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.7, ease: EASE }}
		>
			{children}
		</motion.div>
	);
}
