"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
	children: ReactNode;
	delay?: number;
	className?: string;
	style?: CSSProperties;
	as?: "div" | "section" | "li" | "tr" | "span";
	[key: `data-${string}`]: string | number | boolean | undefined;
}

/**
 * Reveal — whileInView entrance, once, amount 0.2, opacity 0.3 → 1 and
 * translateY 32px → 0, 700ms. Initial values are constant (hydration-safe);
 * MotionConfig reducedMotion="user" disables the transform when the user
 * prefers reduced motion, so content is readable at rest at all times.
 */
export function Reveal({ children, delay = 0, className, style, as = "div", ...rest }: RevealProps) {
	const Component = motion[as];
	return (
		<Component
			className={className}
			style={style}
			initial={{ opacity: 0.3, y: 32 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.7, delay, ease: EASE }}
			{...rest}
		>
			{children}
		</Component>
	);
}
