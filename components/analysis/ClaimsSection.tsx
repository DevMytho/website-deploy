"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHead } from "@/components/ui/SectionHead";
import { Stage } from "@/components/ui/Stage";
import { AppWindow } from "@/components/ui/AppWindow";
import { TabsRow } from "@/components/ui/TabsRow";
import { Pill } from "@/components/ui/Pill";
import { CellRow } from "@/components/ui/CellRow";
import { Reveal } from "@/components/ui/Reveal";
import { WindowReveal } from "@/components/ui/WindowReveal";
import {
	SECTIONS,
	CLAIMS,
	SAY_TEXT,
	DO_NOT_SAY_TEXT,
	CLAIM_CELLS,
} from "@/lib/analysisData";

/**
 * "02 Claims" — interactive claim-level tabs (arrow keys + click); selecting a
 * tab types out its real example and swaps the rule pill. Below: the SAY box
 * types in on view; the DO NOT SAY sentence is struck through, scroll-linked.
 * Both states fully legible at all times.
 */
export function ClaimsSection() {
	const [active, setActive] = useState(0);
	const [typed, setTyped] = useState("");
	const claim = CLAIMS[active];
	const reducedRef = useRef(false);
	const sayRef = useRef<HTMLParagraphElement | null>(null);
	const [sayShown, setSayShown] = useState(false);
	const [sayTyped, setSayTyped] = useState("");

	const doNotSayRef = useRef<HTMLParagraphElement | null>(null);
	const { scrollYProgress } = useScroll({
		target: doNotSayRef,
		offset: ["start 90%", "start 55%"],
	});
	const strikeScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

	/* Type the selected claim example */
	useEffect(() => {
		reducedRef.current = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const text = CLAIMS[active].example;
		if (reducedRef.current) {
			setTyped(text);
			return;
		}
		setTyped("");
		let i = 0;
		const timer = window.setInterval(() => {
			i += 1;
			setTyped(text.slice(0, i));
			if (i >= text.length) window.clearInterval(timer);
		}, 22);
		return () => window.clearInterval(timer);
	}, [active]);

	/* Type the SAY sentence when it enters the viewport */
	useEffect(() => {
		const el = sayRef.current;
		if (!el) return;
		const io = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) {
					io.disconnect();
					if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
						setSayTyped(SAY_TEXT);
						setSayShown(true);
						return;
					}
					setSayShown(true);
					let i = 0;
					const timer = window.setInterval(() => {
						i += 1;
						setSayTyped(SAY_TEXT.slice(0, i));
						if (i >= SAY_TEXT.length) window.clearInterval(timer);
					}, 22);
				}
			},
			{ threshold: 0.4 },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	return (
		<section className="wrap" aria-labelledby="claims-heading">
			<SectionHead
				label={SECTIONS.claims.label}
				title={SECTIONS.claims.title}
				titleSoft={SECTIONS.claims.titleSoft}
				sub={SECTIONS.claims.paragraph}
			/>

			<Reveal>
				<Stage variant="dim" ariaLabel="Claim levels">
					<WindowReveal>
						<AppWindow title="Levels of a claim" label="evidence">
							<TabsRow
								tabs={CLAIMS.map((c) => c.level)}
								active={active}
								onChange={setActive}
							/>
							<div
								className="app-window-body"
								id="claims-panel"
								role="tabpanel"
								aria-live="polite"
							>
								<p className="tab-example">
									{typed}
									{typed.length < claim.example.length && (
										<span className="diff-caret" aria-hidden="true" />
									)}
								</p>
								<div className="rule-pill-row">
									<span className="mono-label" style={{ fontSize: 12 }}>
										Rule
									</span>
									<Pill variant={claim.rule === "Conditional only" ? "default" : "on"}>
										{claim.rule}
									</Pill>
								</div>

								<div className="say-grid">
									<div className="say-box">
										<p className="say-box-label">Say</p>
										<p ref={sayRef} style={{ minHeight: "3.2em" }}>
											{sayShown ? sayTyped : ""}
											{sayShown && sayTyped.length < SAY_TEXT.length && (
												<span className="diff-caret" aria-hidden="true" />
											)}
										</p>
									</div>
									<div className="say-box do-not">
										<p className="say-box-label">Do not say</p>
										<p ref={doNotSayRef}>
											<span className="strike-word">
												{DO_NOT_SAY_TEXT.split(" ").map((word, i, arr) => (
													<span key={i}>
														{word}
														{i < arr.length - 1 ? " " : ""}
													</span>
												))}
												<motion.span
													className="strike-line"
													style={{ scaleX: strikeScale }}
													aria-hidden="true"
												/>
											</span>
										</p>
									</div>
								</div>
							</div>
						</AppWindow>
					</WindowReveal>
				</Stage>
			</Reveal>

			<Reveal delay={0.08}>
				<div style={{ marginTop: 20 }}>
					<CellRow cells={CLAIM_CELLS} ariaLabel="Claim rules and examples" />
				</div>
			</Reveal>
		</section>
	);
}
