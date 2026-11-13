"use client";

import { Fragment } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { Stage } from "@/components/ui/Stage";
import { AppWindow } from "@/components/ui/AppWindow";
import { CellRow } from "@/components/ui/CellRow";
import { Reveal } from "@/components/ui/Reveal";
import { WindowReveal } from "@/components/ui/WindowReveal";
import {
	ROADMAP_SECTIONS,
	SUCCESS_CRITERION,
	SUCCESS_CELLS,
} from "@/lib/scopeData";

/**
 * "02 Success" — the verbatim success criterion sentence reveals word by word
 * as it enters the viewport (opacity 0.3 → 1, staggered; all words visible at
 * rest and fully readable under reduced motion), then the CellRow with the
 * criterion broken into its three live parts.
 */
export function SuccessSection() {
	const words = SUCCESS_CRITERION.split(" ");
	/* Approved-design split: the second half of the sentence ("what new risk …
	   matters.") is muted + light. "what" appears twice; the split starts at
	   the last occurrence so the first "what changed…" stays in the bright half. */
	const softStart = words.lastIndexOf("what");

	return (
		<section className="stack-panel" id="success" aria-labelledby="success-heading">
			<div className="wrap">
			<SectionHead
				label={ROADMAP_SECTIONS.success.label}
				title={ROADMAP_SECTIONS.success.title}
				titleSoft={ROADMAP_SECTIONS.success.titleSoft}
			/>

			<Reveal>
				<Stage variant="dim" ariaLabel="Success criterion">
					<WindowReveal>
						<AppWindow title="Success criterion" label="V1" className="wide">
							<div className="app-window-body" style={{ paddingTop: 20, paddingBottom: 22 }}>
								<blockquote className="success-quote" aria-label="Success criterion">
									{words.map((word, i) => (
										<Fragment key={`${word}-${i}`}>
											<Reveal
												as="span"
												delay={Math.min(i * 0.03, 1.2)}
												className={`quote-word${i >= softStart ? " q-soft" : ""}`}
											>
												{word}
											</Reveal>
											{i < words.length - 1 ? " " : ""}
										</Fragment>
									))}
								</blockquote>
							</div>
						</AppWindow>
					</WindowReveal>
				</Stage>
			</Reveal>

			<Reveal delay={0.08}>
				<div style={{ marginTop: 20 }}>
					<CellRow cells={SUCCESS_CELLS} ariaLabel="Success criterion parts" />
				</div>
			</Reveal>
			</div>
		</section>
	);
}
