"use client";

/**
 * ContourCanvas — fallback stage texture (2D canvas, no WebGL).
 * Contour-line ripple: concentric rings from an off-center origin,
 * 1.5px lines every ~9px, #2a2a2a on #0d0d0d, soft radial highlight,
 * slow drift (~60s loop). Pauses off-screen; static under reduced motion.
 * Device pixel ratio capped at 1.5.
 */

import * as React from "react";

const LINE = "#2a2a2a";
const BG = "#0d0d0d";
const MAX_DPR = 1.5;

export function ContourCanvas() {
	const containerRef = React.useRef<HTMLDivElement | null>(null);
	const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

	React.useEffect(() => {
		const container = containerRef.current;
		const canvas = canvasRef.current;
		if (!container || !canvas) return;

		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let rafId = 0;
		let running = false;
		let inView = false;
		let cleaned = false;
		let width = 0;
		let height = 0;

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
			const rect = container.getBoundingClientRect();
			width = Math.max(1, rect.width);
			height = Math.max(1, rect.height);
			canvas.width = Math.floor(width * dpr);
			canvas.height = Math.floor(height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};

		const draw = (time: number) => {
			ctx.fillStyle = BG;
			ctx.fillRect(0, 0, width, height);

			/* Soft radial highlight, upper-right */
			const hx = width * 0.68;
			const hy = height * 0.3;
			const highlight = ctx.createRadialGradient(hx, hy, 0, hx, hy, Math.max(width, height) * 0.7);
			highlight.addColorStop(0, "rgba(255, 255, 255, 0.05)");
			highlight.addColorStop(1, "rgba(255, 255, 255, 0)");
			ctx.fillStyle = highlight;
			ctx.fillRect(0, 0, width, height);

			/* Contour rings from an off-center, slowly drifting origin */
			const t = (time / 60000) * Math.PI * 2; // 60s loop
			const ox = width * 0.72 + Math.cos(t) * width * 0.05;
			const oy = height * 0.38 + Math.sin(t * 0.7) * height * 0.05;
			const gap = 9;
			const maxR = Math.hypot(Math.max(ox, width - ox), Math.max(oy, height - oy)) + gap;

			ctx.strokeStyle = LINE;
			ctx.lineWidth = 1.5;

			/* Slight line width modulation gives the contour feel */
			for (let r = gap; r <= maxR; r += gap) {
				const wob =
					Math.sin(r / 60 + t * 2) * 0.35 + Math.sin(r / 24 - t * 1.3) * 0.2;
				ctx.globalAlpha = 0.55 + 0.3 * Math.sin((r / maxR) * Math.PI);
				ctx.beginPath();
				const steps = 72;
				for (let i = 0; i <= steps; i++) {
					const a = (i / steps) * Math.PI * 2;
					const rr = r + wob * 6;
					const x = ox + Math.cos(a) * rr;
					const y = oy + Math.sin(a) * rr * 0.92;
					if (i === 0) ctx.moveTo(x, y);
					else ctx.lineTo(x, y);
				}
				ctx.closePath();
				ctx.stroke();
			}
			ctx.globalAlpha = 1;
		};

		const start = performance.now();

		function ensureLoop() {
			if (running || cleaned) return;
			running = true;
			const loop = (now: number) => {
				if (!running) return;
				draw(now - start);
				rafId = requestAnimationFrame(loop);
			};
			rafId = requestAnimationFrame(loop);
		}

		function pauseLoop() {
			running = false;
			cancelAnimationFrame(rafId);
		}

		resize();
		draw(reducedMotion ? 20000 : 0); // first (static) frame

		const ro = new ResizeObserver(() => {
			resize();
			draw(reducedMotion ? 20000 : performance.now() - start);
		});
		ro.observe(container);

		const io = new IntersectionObserver(
			(entries) => {
				inView = entries[0]?.isIntersecting ?? false;
				if (reducedMotion) {
					if (inView) draw(20000);
					return;
				}
				if (inView) ensureLoop();
				else pauseLoop();
			},
			{ threshold: 0 },
		);
		io.observe(container);

		const onVisibility = () => {
			if (reducedMotion || !inView) return;
			if (document.hidden) pauseLoop();
			else ensureLoop();
		};
		document.addEventListener("visibilitychange", onVisibility);

		return () => {
			cleaned = true;
			pauseLoop();
			io.disconnect();
			ro.disconnect();
			document.removeEventListener("visibilitychange", onVisibility);
		};
	}, []);

	return (
		<div ref={containerRef} style={{ position: "absolute", inset: 0 }}>
			<canvas
				ref={canvasRef}
				style={{ width: "100%", height: "100%", display: "block" }}
			/>
		</div>
	);
}
