"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function SmoothScroll() {
	const pathname = usePathname();

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return;
		}

		const lenis = new Lenis({
			duration: 1.05,
			easing: (t: number) => 1 - Math.pow(1 - t, 3),
			anchors: { offset: -80 },
		});

		let frame = 0;
		const raf = (time: number) => {
			lenis.raf(time);
			frame = requestAnimationFrame(raf);
		};
		frame = requestAnimationFrame(raf);

		return () => {
			cancelAnimationFrame(frame);
			lenis.destroy();
		};
	}, [pathname]);

	return null;
}
