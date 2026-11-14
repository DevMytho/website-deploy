"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressLine() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 320,
		damping: 40,
		mass: 0.4,
	});

	return (
		<div className="scroll-progress-line" aria-hidden="true">
			<motion.div className="scroll-progress-bar" style={{ scaleX }} />
		</div>
	);
}
