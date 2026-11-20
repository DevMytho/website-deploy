"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { MANIFEST_VISUALS, ManifestVisual } from "@/components/about/ManifestVisual";
import type { AboutManifestRow } from "@/lib/aboutData";

const INTERVAL = 3000;

/**
 * Hero visual: a full-bleed monochrome diagram that changes every 3s with a
 * long crossfade, the count and caption follow the active frame, and the
 * segment ticks let a visitor hold a frame. Hover or keyboard focus pauses
 * rotation so a frame stays readable; reduced motion disables auto-play.
 */
export function AboutManifest({ rows }: { rows: AboutManifestRow[] }) {
	const [active, setActive] = useState(0);
	const [paused, setPaused] = useState(false);
	const [cycle, setCycle] = useState(0);
	const reduceMotion = useReducedMotion();

	useEffect(() => {
		if (paused || reduceMotion) return;
		const id = window.setInterval(() => {
			if (document.hidden) return;
			setActive((i) => (i + 1) % rows.length);
		}, INTERVAL);
		return () => window.clearInterval(id);
	}, [paused, reduceMotion, rows.length, cycle]);

	const select = (index: number) => {
		setActive(index);
		// restart the timer so a chosen frame gets a full interval on screen
		setCycle((value) => value + 1);
	};

	return (
		<div
			className="about-manifest-media"
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
			onFocusCapture={() => setPaused(true)}
			onBlurCapture={(event) => {
				if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
					setPaused(false);
				}
			}}
		>
			{rows.map((row, i) => (
				<div
					key={row.key}
					className={`about-manifest-frame${i === active ? " is-active" : ""}`}
					aria-hidden={i !== active}
				>
					<ManifestVisual variant={MANIFEST_VISUALS[i]} />
				</div>
			))}

			<div className="about-manifest-scrim" aria-hidden="true" />

			<div className="about-manifest-overlay">
				<div className="about-manifest-meta">
					<span className="about-manifest-count">
						{String(active + 1).padStart(2, "0")}
						<span className="about-manifest-count-total">
							{" "}
							/ {String(rows.length).padStart(2, "0")}
						</span>
					</span>
					<span className="about-manifest-caption">{rows[active].key}</span>
				</div>

				<div className="about-manifest-ticks" role="group" aria-label="Choose a project visual">
					{rows.map((row, i) => (
						<button
							key={row.key}
							type="button"
							className="about-manifest-tick"
							data-active={i === active}
							aria-label={`Show ${row.key} visual`}
							aria-pressed={i === active}
							title={row.value}
							onClick={() => select(i)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
