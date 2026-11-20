"use client";

import { useState } from "react";
import { AppWindow } from "@/components/ui/AppWindow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Stage } from "@/components/ui/Stage";
import { TabsRow } from "@/components/ui/TabsRow";
import { WindowReveal } from "@/components/ui/WindowReveal";
import type { AboutMethodData, MethodStep } from "@/lib/aboutData";

/**
 * "03 / Method" — four tabs over one change: Plan, Evidence, Finding, Review.
 * The window is the page's one interactive artifact; everything else stays
 * quiet. Panels animate in on change, and are static under reduced motion.
 */
export function AboutMethod({ label, title, titleSoft, sub, steps }: AboutMethodData) {
	const [active, setActive] = useState(0);

	return (
		<section className="wrap about-method">
			<SectionHead
				label={label}
				title={title}
				titleSoft={titleSoft}
				sub={sub}
			/>

			<Reveal>
				<div className="about-method-stage">
					<Stage variant="dim" ariaLabel="How WCI reads a change">
						<WindowReveal>
							<AppWindow
								className="about-method-window"
								title="How a change is read"
								label={`Step ${active + 1} / ${steps.length}`}
							>
								<TabsRow
									tabs={steps.map((step) => step.tab)}
									active={active}
									onChange={setActive}
								/>
								<div
									className="app-window-body about-method-body"
									role="tabpanel"
									key={active}
								>
									<MethodPanel step={steps[active]} index={active} />
								</div>
							</AppWindow>
						</WindowReveal>
					</Stage>
				</div>
			</Reveal>
		</section>
	);
}

function MethodPanel({ step, index }: { step: MethodStep; index: number }) {
	return (
		<div className="about-step">
			<div className="about-step-copy">
				<p className="about-step-kicker">
					<span>0{index + 1}</span>
					<span className="about-step-kicker-line" aria-hidden="true" />
					<span>{step.tab}</span>
				</p>
				<h3 className="about-step-title">{step.title}</h3>
				<p className="about-step-text">{step.summary}</p>
				<p className="about-step-note">{step.note}</p>
			</div>

			<div className="about-step-visual">
				{step.kind === "diff" && step.diff && <PlanDiff lines={step.diff} />}
				{step.kind === "evidence" && step.evidence && (
					<EvidenceBlock rows={step.evidence} />
				)}
				{step.kind === "finding" && step.finding && (
					<FindingBlock finding={step.finding} />
				)}
				{step.kind === "review" && step.review && (
					<ReviewBlock questions={step.review} />
				)}
			</div>
		</div>
	);
}

function PlanDiff({ lines }: { lines: NonNullable<MethodStep["diff"]> }) {
	return (
		<pre className="about-code" aria-label="Terraform plan excerpt">
			{lines.map((line, i) => (
				<span className={`about-code-line is-${line.kind}`} key={i}>
					{line.text}
				</span>
			))}
		</pre>
	);
}

function EvidenceBlock({ rows }: { rows: NonNullable<MethodStep["evidence"]> }) {
	return (
		<pre className="about-evidence" aria-label="Evidence record">
			<span className="about-evidence-line">{"{"}</span>
			{rows.map((row, i) => (
				<span className="about-evidence-line" key={row.key}>
					{"  "}
					<span className="jkey">&quot;{row.key}&quot;</span>
					<span className="about-evidence-colon">: </span>
					<span className="jvalue">{row.value}</span>
					{i < rows.length - 1 ? "," : ""}
				</span>
			))}
			<span className="about-evidence-line">{"}"}</span>
		</pre>
	);
}

function FindingBlock({ finding }: { finding: NonNullable<MethodStep["finding"]> }) {
	return (
		<div className="about-finding">
			<div className="about-finding-top">
				<span>{finding.id}</span>
				<span className="about-finding-sep" aria-hidden="true">
					·
				</span>
				<span>{finding.category}</span>
				<span className="pill pill-on about-finding-pill">{finding.severity}</span>
			</div>
			<h4 className="about-finding-title">{finding.title}</h4>
			<p className="about-finding-body">{finding.body}</p>
			<div className="about-finding-meta">
				{finding.pills.map((pill) => (
					<span className="pill" key={pill}>
						{pill}
					</span>
				))}
			</div>
		</div>
	);
}

function ReviewBlock({ questions }: { questions: string[] }) {
	return (
		<div className="about-review-wrap">
			<ul className="about-review">
				{questions.map((question) => (
					<li key={question}>
						<span className="about-review-box" aria-hidden="true" />
						<span>{question}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
