"use client";

import { useMemo, useState } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { Stage } from "@/components/ui/Stage";
import { AppWindow } from "@/components/ui/AppWindow";
import { TabsRow } from "@/components/ui/TabsRow";
import { CellRow, type CellData } from "@/components/ui/CellRow";
import { Reveal } from "@/components/ui/Reveal";
import { WindowReveal } from "@/components/ui/WindowReveal";
import {
	SECTIONS,
	FINDING_JSON,
	RULE_CELLS,
} from "@/lib/analysisData";

const TABS = ["Terraform", "Evidence", "Finding JSON"];

/* Fields whose value highlights its matching explanation below */
const FOCUS_FIELDS = ["severity", "source_cidr", "reachability_status", "category"];

/* Verbatim evidence object from the live finding JSON */
const EVIDENCE = [
	{ key: "direction", value: '"ingress"' },
	{ key: "protocol", value: '"tcp"' },
	{ key: "from_port", value: "22" },
	{ key: "to_port", value: "22" },
	{ key: "source_cidr", value: '"0.0.0.0/0"' },
	{ key: "match_basis", value: '"tcp_port_range"' },
];

/* Design-specified diff of aws_security_group.web (same lines as the hero) */
const TERRAFORM_LINES = [
	{ kind: "context", text: 'resource "aws_security_group" "web" {' },
	{ kind: "removed", text: '-   cidr_blocks = ["10.0.0.0/16"]' },
	{ kind: "added", text: '+   cidr_blocks = ["0.0.0.0/0"]' },
	{ kind: "context", text: "}" },
] as const;

export function FirstRuleSection() {
	const [active, setActive] = useState(2); /* Finding JSON */
	const [hovered, setHovered] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);

	const jsonLines = useMemo(() => FINDING_JSON.split("\n"), []);

	const cells: CellData[] = useMemo(
		() =>
			RULE_CELLS.map((cell) => ({
				...cell,
				highlight:
					(hovered === "severity" && cell.label === "Severity") ||
					(hovered === "category" && cell.label === "Category") ||
					(hovered === "reachability_status" && cell.label === "Reachability"),
			})),
		[hovered],
	);

	const copyJson = async () => {
		try {
			await navigator.clipboard.writeText(FINDING_JSON);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		} catch {
			/* execCommand fallback */
			const ta = document.createElement("textarea");
			ta.value = FINDING_JSON;
			ta.style.position = "fixed";
			ta.style.opacity = "0";
			document.body.appendChild(ta);
			ta.select();
			try {
				document.execCommand("copy");
				setCopied(true);
				window.setTimeout(() => setCopied(false), 1600);
			} catch {
				/* clipboard unavailable — stay honest, no fake success */
			}
			document.body.removeChild(ta);
		}
	};

	return (
		<section className="wrap" id="first-rule" aria-labelledby="first-rule-heading">
			<SectionHead
				label={SECTIONS.firstRule.label}
				title={SECTIONS.firstRule.title}
				titleSoft={SECTIONS.firstRule.titleSoft}
				sub={SECTIONS.firstRule.paragraph}
			/>

			<Reveal>
				<Stage variant="dim" ariaLabel="First rule finding">
					<WindowReveal>
						<AppWindow title="Finding" label="public SSH">
							<TabsRow tabs={TABS} active={active} onChange={setActive} />
							<div className="app-window-body" id="finding-panel" role="tabpanel">
								{active === 0 && (
									<div className="diff" aria-label="Terraform diff">
										{TERRAFORM_LINES.map((line) => (
											<span key={line.text} className={`diff-line ${line.kind}`}>
												{line.text}
											</span>
										))}
									</div>
								)}

								{active === 1 && (
									<div className="diff" aria-label="Finding evidence">
										{TABMONO_HEADER}
										{EVIDENCE.map((e) => (
											<span key={e.key} className="diff-line context">
												{e.key}
												{" = "}
												<span className="jvalue">{e.value}</span>
											</span>
										))}
									</div>
								)}

								{active === 2 && (
									<div className="finding-json" aria-label="Finding JSON">
										{jsonLines.map((line, i) => {
											const m = line.match(/^(\s*)"([^"]+)":\s*(.*?)(,?)\s*$/);
											if (!m) {
												return <div key={i}>{line === "" ? " " : line}</div>;
											}
											const [, indent, key, value, comma] = m;
											const isField = FOCUS_FIELDS.includes(key);
											return (
												<div key={i}>
													{indent}
													<span className="jkey">&quot;{key}&quot;</span>:{" "}
													{isField ? (
														<span
															className="jfield"
															data-field={key}
															data-hover={hovered === key}
															tabIndex={0}
															onMouseEnter={() => setHovered(key)}
															onMouseLeave={() => setHovered(null)}
															onFocus={() => setHovered(key)}
															onBlur={() => setHovered(null)}
														>
															{value}
														</span>
													) : (
														<span className="jvalue">{value}</span>
													)}
													{comma}
												</div>
											);
										})}
										<div style={{ marginTop: 16, textAlign: "right" }}>
											<button type="button" className="copy-button" onClick={copyJson}>
												{copied ? (
													<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
														<path d="M20 6 9 17l-5-5" />
													</svg>
												) : null}
												{copied ? "Copied" : "Copy JSON"}
											</button>
										</div>
									</div>
								)}
							</div>
						</AppWindow>
					</WindowReveal>
				</Stage>
			</Reveal>

			<Reveal delay={0.08}>
				<div style={{ marginTop: 20 }}>
					<CellRow cells={cells} ariaLabel="Finding fields explained" />
				</div>
			</Reveal>
		</section>
	);
}

const TABMONO_HEADER = (
	<span className="diff-line context">aws_security_group.web · ingress</span>
);
