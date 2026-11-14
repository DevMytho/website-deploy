// ─── Analysis page data ─────────────────────────────────────────────────────
// Content extracted verbatim from arhistrategstudio.github.io/wci-test-site

export type LayerStatus = "in-scope" | "future";

export interface Layer {
	name: string;
	question: string;
	status: LayerStatus;
}

export const LAYERS: Layer[] = [
	{
		name: "Configuration facts",
		question: "What exists and how is it configured?",
		status: "in-scope",
	},
	{
		name: "Finding engine",
		question: "Which rule predicates are satisfied?",
		status: "in-scope",
	},
	{
		name: "Relationship graph",
		question: "What is connected to what?",
		status: "future",
	},
	{
		name: "Permission analysis",
		question: "What can an identity actually do?",
		status: "future",
	},
	{
		name: "Exposure analysis",
		question: "Is there a supported path to the resource?",
		status: "future",
	},
	{
		name: "Attack-path analysis",
		question: "What path crosses controls?",
		status: "future",
	},
	{
		name: "Risk engine",
		question: "How does context change priority?",
		status: "future",
	},
];

export type ClaimLevel = "Observed" | "Derived" | "Context-dependent" | "Potential impact";

export interface ClaimDetail {
	level: ClaimLevel;
	example: string;
	rule: string;
}

export const CLAIMS: ClaimDetail[] = [
	{
		level: "Observed",
		example: "The parsed rule allows TCP/22 from 0.0.0.0/0",
		rule: "State it",
	},
	{
		level: "Derived",
		example: "Any IPv4 source is permitted by that rule",
		rule: "State it, naming the source",
	},
	{
		level: "Context-dependent",
		example: "A resource using the group may be internet-reachable",
		rule: "Conditional only",
	},
	{
		level: "Potential impact",
		example: "Exposure can increase attack surface",
		rule: "Conditional only",
	},
];

export interface FindingField {
	key: string;
	value: string | number | object;
	note?: string;
	isNested?: boolean;
}

export const FINDING_ID = "WCI-AWS-NET-001";

export const FINDING_JSON = `{
  "finding_id": "WCI-AWS-NET-001",
  "rule_id": "AWS.NETWORK.SSH_PUBLIC",
  "title": "SSH is publicly permitted by an AWS security-group rule",
  "severity": "HIGH",
  "category": "NETWORK_EXPOSURE",
  "resource_address": "aws_security_group.web",
  "evidence": {
    "direction": "ingress",
    "protocol": "tcp",
    "from_port": 22,
    "to_port": 22,
    "source_cidr": "0.0.0.0/0",
    "match_basis": "tcp_port_range"
  },
  "reachability_status": "UNVERIFIED",
  "reason": "Any IPv4 source is permitted to attempt TCP/22 by this rule.",
  "remediation": "Restrict source CIDRs to authorized administration paths."
}`;

export interface HighlightNote {
	field: string;
	note: string;
}

export const HIGHLIGHT_NOTES: HighlightNote[] = [
	{
		field: "reachability_status",
		note:
			'"UNVERIFIED" means WCI observed a permissive rule, not that the host is proven reachable. Network topology, public IPs, and listening services are not evaluated in V1.',
	},
	{
		field: "severity",
		note:
			'"HIGH" is a policy classification — not evidence of exploitability. It signals the rule configuration warrants review.',
	},
	{
		field: "source_cidr",
		note:
			'"0.0.0.0/0" matches any IPv4 address. The finding fires on this CIDR because it is the most permissive possible IPv4 source.',
	},
	{
		field: "category",
		note:
			'"NETWORK_EXPOSURE" groups findings about routing and access control rules, not runtime network traffic.',
	},
];

/* ─────────────────────────────────────────────────────────────────────────────
   Approved-design data for the rebuilt /analysis page.
   Sentences marked "live" are verbatim from
   arhistrategstudio.github.io/wci-test-site (analysis/coverage/roadmap pages,
   fetched and diffed 2026-11-12). Sentences marked "design" come from the
   approved design spec. Nothing else is invented.
   ───────────────────────────────────────────────────────────────────────────── */

export const HERO = {
	label: "06 / Analysis model",
	title: "Evidence first.",
	titleSoft: "Claims second.",
	paragraph: "Each layer keeps the facts, assumptions and confidence of the layer before it.", // live
	primaryCta: "See the first rule",
	secondaryCta: "View coverage",
};

/* Design-specified hero diff of aws_security_group.web */
export const HERO_DIFF = {
	windowTitle: "main.tf · pull request",
	windowLabel: "WCI",
	lines: [
		{ kind: "removed" as const, text: '- cidr_blocks = ["10.0.0.0/16"]' },
		{ kind: "added" as const, text: '+ cidr_blocks = ["0.0.0.0/0"]' },
		{ kind: "context" as const, text: 'from_port = 22 · protocol = "tcp"' },
	],
};

/* Finding strip — verbatim from the live finding data */
export const HERO_FINDING = {
	id: "WCI-AWS-NET-001",
	category: "Network exposure",
	severity: "High",
	sentence: "This rule permits any IPv4 source to attempt TCP/22.", // live (the "Say" sentence)
	pill: "reachability: UNVERIFIED",
};

export const SAY_TEXT = "This rule permits any IPv4 source to attempt TCP/22."; // live
export const DO_NOT_SAY_TEXT = "This instance is definitely exposed."; // live

export const SECTIONS = {
	layers: {
		label: "01  Layers",
		title: "Analysis model",
		titleSoft: "Each layer builds on the last.",
	},
	claims: {
		label: "02  Claims",
		title: "Precise, not alarming.",
		titleSoft: "Every claim has a level.",
		paragraph:
			"A security group proves the group is permissive. It does not prove an attached workload, a public address, a route, a listening service, or exploitability.", // live
	},
	firstRule: {
		label: "03  First rule",
		title: "Public SSH.",
		titleSoft: "One finding per matching rule.",
		paragraph:
			"One finding per matching ingress rule on an aws_security_group that allows 0.0.0.0/0 on TCP/22 — or on all protocols. Baseline severity High: a policy classification, not proven reachability.", // live
	},
	coverage: {
		label: "04  Coverage",
		title: "What V1 checks.",
		titleSoft: "And what it doesn't.",
		paragraph:
			"A focused first release: one cloud, one IaC workflow, the changes that matter most.", // live (coverage page)
	},
};

/* Layer table — verbatim from the live analysis page */
export const LAYER_TABLE = [
	{ name: "Configuration facts", question: "What exists and how is it configured?", status: "in-scope" },
	{ name: "Finding engine", question: "Which rule predicates are satisfied?", status: "in-scope" },
	{ name: "Relationship graph", question: "What is connected to what?", status: "future" },
	{ name: "Permission analysis", question: "What can an identity actually do?", status: "future" },
	{ name: "Exposure analysis", question: "Is there a supported path to the resource?", status: "future" },
	{ name: "Attack-path analysis", question: "What path crosses controls?", status: "future" },
	{ name: "Risk engine", question: "How does context change priority?", status: "future" },
] as const;

/* CellRow under the layers section — real questions from the live table */
export const LAYER_CELLS = [
	{ label: "01", title: "Configuration facts", sentence: "What exists and how is it configured?" },
	{ label: "02", title: "Finding engine", sentence: "Which rule predicates are satisfied?" },
	{ label: "03", title: "Relationship graph", sentence: "What is connected to what?" },
	{ label: "07", title: "Risk engine", sentence: "How does context change priority?" },
];

/* CellRow under the first-rule section */
export const RULE_CELLS = [
	{ label: "Rule ID", title: "AWS.NETWORK.SSH_PUBLIC", sentence: "WCI-AWS-NET-001" },
	{ label: "Category", title: "Network exposure" },
	{
		label: "Severity",
		title: "High",
		sentence: "A policy classification, not proven reachability.", // live
	},
	{ label: "Reachability", title: "UNVERIFIED" },
];

/* CellRow under the claims section — rules + real examples (live) */
export const CLAIM_CELLS = [
	{ label: "Observed", title: "State it", sentence: "The parsed rule allows TCP/22 from 0.0.0.0/0" },
	{ label: "Derived", title: "State it, naming the source", sentence: "Any IPv4 source is permitted by that rule" },
	{ label: "Context", title: "Conditional only", sentence: "A resource using the group may be internet-reachable" },
	{ label: "Impact", title: "Conditional only", sentence: "Exposure can increase attack surface" },
];

/* CellRow under the coverage section */
export const COVERAGE_CELLS = [
	{
		label: "IaC workflow",
		title: "Terraform",
		sentence: "and OpenTofu where compatibility can be verified", // live
	},
	{ label: "Cloud provider", title: "AWS", sentence: "as the first cloud provider" }, // live
	{ label: "Workflow", title: "GitHub", sentence: "pull requests and GitHub Actions" }, // live
	{
		label: "Not evaluated",
		title: "Known gaps",
		sentence: "A missing finding here does not mean safe.", // live
	},
];

/* Analysis glyph tiles — verbatim claim examples (live) */
export const ANALYSIS_TILES = [
	{ caption: "Observed", sentence: "The parsed rule allows TCP/22 from 0.0.0.0/0" },
	{ caption: "Derived", sentence: "Any IPv4 source is permitted by that rule" },
	{
		caption: "Context-dependent",
		sentence: "A resource using the group may be internet-reachable",
	},
];


