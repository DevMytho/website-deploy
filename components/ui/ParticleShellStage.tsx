"use client";

import * as React from "react";
import * as ReactJSXRuntime from "react/jsx-runtime";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/**
 * The vendored Originkit module is "compify"-compiled: at evaluation time it
 * reads globalThis.__compifyGlobals.react and …["react/jsx-runtime"]. This
 * assignment runs at wrapper module scope, i.e. before the dynamic import
 * below resolves.
 */
(globalThis as unknown as Record<string, unknown>).__compifyGlobals = {
	...((globalThis as unknown as Record<string, unknown>).__compifyGlobals ?? {}),
	react: React,
	"react/jsx-runtime": ReactJSXRuntime,
};

/* Client-only: the module touches window/canvas/WebGL2 immediately. */
const FoldingParticleShell = dynamic(
	() => import("./folding-particle-shell.mjs"),
	{ ssr: false },
);

/**
 * ParticleShellStage — the closing panel on /roadmap. Same panel styling as
 * the old dot-field box (1px #242424 border, #0d0d0d background, 20px radius),
 * hosting the Originkit folding-particle-shell, restyled to the grayscale
 * system. Rendered only while on screen (IntersectionObserver); rAF is paused
 * by the browser for hidden tabs; prefers-reduced-motion is handled inside the
 * module (time freezes → static frame). No layout shift: fixed heights below.
 */
export function ParticleShellStage({ label }: { label?: string }) {
	const ref = useRef<HTMLDivElement | null>(null);
	const [inView, setInView] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(
			(entries) => {
				setInView(entries.some((e) => e.isIntersecting));
			},
			{ rootMargin: "120px 0px" },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			className="particle-shell-stage"
			aria-label={label ?? "Particle field"}
		>
			{inView ? (
				<FoldingParticleShell
					speed={45}
					scale={100}
					fold={100}
					density={45}
					color="#f4f4f4"
					background="#0d0d0d"
					advanced={{ speckColor: "#a6a6a6", hover: 50 }}
					style={{
						minWidth: 0,
						minHeight: 0,
						width: "100%",
						height: "100%",
					}}
				/>
			) : null}
		</div>
	);
}
