"use client";

import { useEffect, useRef, useState } from "react";
import { Stage } from "@/components/ui/Stage";
import { AppWindow } from "@/components/ui/AppWindow";
import { Pill } from "@/components/ui/Pill";
import {
	ROADMAP_HERO,
	ROADMAP_NODES,
	WHAT_V1_CHECKS,
	type RoadmapNode,
} from "@/lib/scopeData";

/**
 * Roadmap hero — polar-style: two-tone H1 + sub on top, then a row with the
 * Direction window (six-stage stepper; the V1 focus stage "Secure" carries
 * the live checklist) on the left and an info column on the right.
 * Stages are clickable: the detail row and checklist follow the active stage.
 */
export function RoadmapHero() {
	/* Secure (index 1) is the V1 focus and starts active. */
	const [active, setActive] = useState(
		ROADMAP_NODES.findIndex((n) => n.v1Focus),
	);
	const activeNode: RoadmapNode = ROADMAP_NODES[active] ?? ROADMAP_NODES[0];
	const progress = ROADMAP_NODES.length > 1 ? active / (ROADMAP_NODES.length - 1) : 1;

	return (
		<section className="wrap hero-roadmap" aria-labelledby="roadmap-hero-title">
			<div className="hero-roadmap-top">
				<p className="hero-label">{ROADMAP_HERO.label}</p>
				<h1 className="h1" id="roadmap-hero-title">
					{ROADMAP_HERO.title}
					<span className="soft">{ROADMAP_HERO.titleSoft}</span>
				</h1>
				<div className="hero-cta-row">
					<a className="btn-pill solid" href="#direction">
						See the V1 focus
					</a>
					<a className="btn-pill outlined" href="#success">
						Success criterion
					</a>
				</div>
			</div>

			<div className="hero-roadmap-row">
				<div className="hero-roadmap-stage">
					<Stage variant="hero" ariaLabel="WCI roadmap stepper">
						<AppWindow title={ROADMAP_HERO.windowTitle} label={ROADMAP_HERO.windowLabel} className="md">
							<div className="ds-body">
								<div
									className="ds-stepper"
									role="tablist"
									aria-label="Roadmap stages"
									style={{ "--ds-progress": progress } as React.CSSProperties}
								>
									<span className="ds-track" aria-hidden="true" />
									<span className="ds-fill" aria-hidden="true" />
									{ROADMAP_NODES.map((node, i) => (
										<button
											key={node.label}
											type="button"
											role="tab"
											aria-selected={i === active}
											className="ds-stage"
											onClick={() => setActive(i)}
										>
											<span className="ds-dot" data-reached={i <= active || undefined} aria-hidden="true" />
											<span className="ds-label" data-focus={node.v1Focus || undefined}>
												{node.label}
											</span>
											{node.v1Focus ? <Pill variant="on">V1</Pill> : null}
										</button>
									))}
								</div>

								<div className="ds-detail">
									<p className="ds-detail-text">
										{activeNode.v1Focus
											? ROADMAP_HERO.stepperNote
											: `Direction, not current work. ${activeNode.label}.`}
									</p>
									<Pill variant="on" className="ds-detail-pill">
										{`0${active + 1} ${activeNode.label}`}
									</Pill>
								</div>

								{activeNode.v1Focus ? (
									<ul className="ds-checks" aria-label="What the V1 focus checks">
										{WHAT_V1_CHECKS.map((item) => (
											<CheckItem key={item.text} text={item.text} />
										))}
									</ul>
								) : null}
							</div>
						</AppWindow>
					</Stage>
				</div>

				<aside className="hero-aside">
					<h2 className="hero-aside-title">
						Highlighted: the V1 focus.
					</h2>
					<p className="hero-aside-text">{ROADMAP_HERO.note}</p>
					<nav className="hero-aside-links" aria-label="Roadmap sections">
						<a href="#direction">Direction</a>
						<a href="#success">Success criterion</a>
						<a href="/analysis">Analysis model</a>
					</nav>
				</aside>
			</div>
		</section>
	);
}

/**
 * One checklist row — the check mark draws in once (stroke-dashoffset) the
 * first time the row enters the viewport; final state is immediate under
 * reduced motion, so nothing depends on the animation for legibility.
 */
function CheckItem({ text }: { text: string }) {
	const ref = useRef<HTMLLIElement | null>(null);
	const [drawn, setDrawn] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setDrawn(true);
			return;
		}
		const io = new IntersectionObserver(
			(entries) => {
				if (entries.some((e) => e.isIntersecting)) {
					setDrawn(true);
					io.disconnect();
				}
			},
			{ threshold: 0.3 },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	return (
		<li ref={ref} className="ds-check" data-drawn={drawn || undefined}>
			<svg className="ds-check-mark" viewBox="0 0 12 12" aria-hidden="true">
				<path d="M2 6.2 5 9.2 10 3" fill="none" />
			</svg>
			<span>{text}</span>
		</li>
	);
}
