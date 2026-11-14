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
	WHAT_V1_CHECKS,
	TECHNOLOGY_SCOPE,
	NOT_IN_V1,
	KNOWN_GAPS,
	KNOWN_GAPS_WARNING,
} from "@/lib/scopeData";
import { SECTIONS, COVERAGE_CELLS } from "@/lib/analysisData";

const TABS = ["What V1 checks", "Technology scope", "Not in V1", "Known gaps"];

/**
 * "04 Coverage" — interactive tabs over the verbatim scope lists.
 * Check marks draw in with an 80ms stagger; the Known gaps tab ends with the
 * live warning sentence. CellRow below carries the technology scope.
 */
export function CoverageSection() {
	return (
		<section className="wrap" id="coverage" aria-labelledby="coverage-heading">
			<SectionHead
				label={SECTIONS.coverage.label}
				title={SECTIONS.coverage.title}
				titleSoft={SECTIONS.coverage.titleSoft}
				sub={SECTIONS.coverage.paragraph}
				link={{ label: "View roadmap", href: "/roadmap" }}
			/>

			<Reveal>
				<Stage variant="dim" ariaLabel="Coverage scope">
					<WindowReveal>
						<AppWindow title="Coverage" label="V1">
							<CoverageTabs />
						</AppWindow>
					</WindowReveal>
				</Stage>
			</Reveal>

			<Reveal delay={0.08}>
				<div style={{ marginTop: 20 }}>
					<CellRow cells={COVERAGE_CELLS} ariaLabel="Technology scope" />
				</div>
			</Reveal>
		</section>
	);
}

function CoverageTabs() {
	const [active, setActive] = useState(0);

	return (
		<>
			<TabsRow tabs={TABS} active={active} onChange={setActive} />
			<div className="app-window-body" id="coverage-panel" role="tabpanel" key={active}>
				{active === 0 && <CheckList items={WHAT_V1_CHECKS.map((i) => i.text)} />}
				{active === 1 && (
					<>
						<CheckList items={TECHNOLOGY_SCOPE.map((i) => i.text)} />
						<div className="rule-pill-row" aria-label="Technology chips">
							{["Terraform", "AWS", "GitHub"].map((chip) => (
								<span className="pill" key={chip}>
									{chip}
								</span>
							))}
						</div>
					</>
				)}
				{active === 2 && <DashList items={NOT_IN_V1} />}
				{active === 3 && (
					<>
						<DashList items={KNOWN_GAPS} coded />
						<p className="scope-note">{KNOWN_GAPS_WARNING}</p>
					</>
				)}
			</div>
		</>
	);
}

interface ScopeItem {
	text: string;
	code?: string;
}

function CheckList({ items }: { items: string[] }) {
	return (
		<ul className="scope-list">
			{items.map((item, i) => (
				<li key={item}>
					<svg className="check" viewBox="0 0 16 16" aria-hidden="true">
						<path
							d="M3 8.5 6.5 12 13 4"
							strokeDasharray="20"
							strokeDashoffset="20"
							style={{ animationDelay: `${i * 0.08}s` }}
						/>
					</svg>
					{item}
				</li>
			))}
		</ul>
	);
}

function DashList({ items, coded }: { items: ScopeItem[]; coded?: boolean }) {
	return (
		<ul className="scope-list">
			{items.map((item) => (
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
						{item.code && (
							<>
								{" "}
								<span className="code-chip">{item.code}</span>
							</>
						)}
					</span>
				</li>
			))}
		</ul>
	);
}
