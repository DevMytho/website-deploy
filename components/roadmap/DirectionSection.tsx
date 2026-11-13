"use client";

import { useState } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { Stage } from "@/components/ui/Stage";
import { AppWindow } from "@/components/ui/AppWindow";
import { TabsRow } from "@/components/ui/TabsRow";
import { CellRow } from "@/components/ui/CellRow";
import { Reveal } from "@/components/ui/Reveal";
import { WindowReveal } from "@/components/ui/WindowReveal";
import {
	ROADMAP_SECTIONS,
	DIRECTION_CELLS,
	WHAT_V1_CHECKS,
	NOT_IN_V1,
} from "@/lib/scopeData";

const TABS = ["In V1", "Not in V1"];

/**
 * "01 Direction" — In V1 / Not in V1 tabs over the verbatim scope lists
 * (same content as the coverage page, framed as direction), then the CellRow
 * carrying the V1 focus and the not-in-V1 boundaries.
 */
export function DirectionSection() {
	return (
		<section className="stack-panel" id="direction" aria-labelledby="direction-heading">
			<div className="wrap">
			<SectionHead
				label={ROADMAP_SECTIONS.direction.label}
				title={ROADMAP_SECTIONS.direction.title}
				titleSoft={ROADMAP_SECTIONS.direction.titleSoft}
			/>

			<Reveal>
				<Stage variant="dim" ariaLabel="Roadmap direction scope">
					<WindowReveal>
						<AppWindow title="Direction" label="V1" className="wide">
							<DirectionTabs />
						</AppWindow>
					</WindowReveal>
				</Stage>
			</Reveal>

			<Reveal delay={0.08}>
				<div style={{ marginTop: 12 }}>
					<CellRow cells={DIRECTION_CELLS} ariaLabel="Direction boundaries" />
				</div>
			</Reveal>
			</div>
		</section>
	);
}

function DirectionTabs() {
	const [active, setActive] = useState(0);

	return (
		<>
			<TabsRow tabs={TABS} active={active} onChange={setActive} />
			<div className="app-window-body" id="direction-panel" role="tabpanel" key={active}>
				{active === 0 ? (
					<ul className="scope-list">
						{WHAT_V1_CHECKS.map((item, i) => (
							<li key={item.text}>
								<svg className="check" viewBox="0 0 16 16" aria-hidden="true">
									<path
										d="M3 8.5 6.5 12 13 4"
										strokeDasharray="20"
										strokeDashoffset="20"
										style={{ animationDelay: `${i * 0.08}s` }}
									/>
								</svg>
								{item.text}
							</li>
						))}
					</ul>
				) : (
					<ul className="scope-list">
						{NOT_IN_V1.map((item) => (
							<li key={item.text}>
								<span
									aria-hidden="true"
									style={{
										flexShrink: 0,
										width: 12,
										height: 1,
										background: "var(--dim)",
										transform: "translateY(-4px)",
									}}
								/>
								<span>
									{item.text}
									{item.code ? <span className="code-chip">{item.code}</span> : null}
								</span>
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	);
}
