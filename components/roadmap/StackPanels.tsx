"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Bounds the sticky stacking scope and pins each panel exactly when its
 * bottom edge reaches the viewport bottom — so panels taller than the
 * viewport (Direction) are always fully read before the next one slides
 * over them. Without this, a top-pinned panel's below-the-fold content
 * is covered before it can ever be seen.
 *
 * Per panel: top = min(64px header offset, 100vh - panelHeight).
 *  - Taller than viewport  -> negative top  -> pins with bottom at the
 *    viewport bottom (everything above already scrolled past).
 *  - Shorter                -> 64px          -> parks under the header.
 * CSS keeps top: 64px as the SSR/no-JS fallback until this runs.
 */
export function StackPanels({ children }: { children: ReactNode }) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const panels = Array.from(el.querySelectorAll<HTMLElement>(":scope > .stack-panel"));

		const apply = () => {
			const vh = window.innerHeight;
			for (const panel of panels) {
				panel.style.top = `${Math.min(64, vh - panel.offsetHeight)}px`;
			}
		};

		apply();

		const ro = new ResizeObserver(apply);
		for (const panel of panels) ro.observe(panel);
		window.addEventListener("resize", apply);

		return () => {
			ro.disconnect();
			window.removeEventListener("resize", apply);
		};
	}, []);

	return (
		<div ref={ref} className="stack-panels">
			{children}
		</div>
	);
}
