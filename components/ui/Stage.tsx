"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextureCanvas, type TextureVariant } from "@/components/ui/TextureCanvas";

interface StageProps {
	children: React.ReactNode;
	/** "hero" gets the brightest texture; others ~25% dimmer. */
	variant?: TextureVariant;
	/** Content max-width, passed to the inner content wrapper. */
	id?: string;
	className?: string;
	ariaLabel?: string;
}

/**
 * Stage — rounded 20px panel, 1px #242424 border, #0d0d0d background,
 * 72px/32px padding, TextureCanvas behind, radial vignette to #0a0a0a on top.
 * The texture drifts at a different speed than the window (scroll parallax).
 */
export function Stage({ children, variant = "dim", id, className, ariaLabel }: StageProps) {
	const ref = useRef<HTMLDivElement | null>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});
	const textureY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

	return (
		<div
			ref={ref}
			id={id}
			className={`stage${className ? ` ${className}` : ""}`}
			aria-label={ariaLabel}
		>
			<motion.div className="texture-anchor" style={{ y: textureY, position: "absolute", inset: "-8% 0" }}>
				<TextureCanvas variant={variant} />
			</motion.div>
			<div className="stage-vignette" aria-hidden="true" />
			<div className="stage-content">{children}</div>
		</div>
	);
}
