// ─── About page data ────────────────────────────────────────────────────────
// Copy is written in the same voice as the analysis and scope pages: plain,
// verifiable statements about what WCI does, what it does not do, and what the
// evidence supports. Everything here is safe to swap for final marketing copy.

export interface AboutCta {
	label: string;
	href: string;
}

export interface AboutManifestRow {
	key: string;
	value: string;
}

export interface AboutHeroData {
	label: string;
	title: string;
	titleSoft: string;
	paragraph: string;
	primaryCta: AboutCta;
	secondaryCta: AboutCta;
	manifest: AboutManifestRow[];
	rule: string[];
}

export const ABOUT_HERO: AboutHeroData = {
	label: "About WCI",
	title: "Security impact,",
	titleSoft: "understood before deploy.",
	paragraph:
		"Wayne Cloud Infrastructure reads Terraform and OpenTofu plans and explains the security impact of what is about to change: what opened, what widened, and what the evidence actually supports.",
	primaryCta: { label: "Read the analysis model", href: "/analysis" },
	secondaryCta: { label: "See the roadmap", href: "/roadmap" },
	manifest: [
		{ key: "project", value: "Wayne Cloud Infrastructure" },
		{ key: "stage", value: "Early development" },
		{ key: "input", value: "Terraform · OpenTofu plans" },
		{ key: "cloud", value: "AWS first" },
		{ key: "mode", value: "Read-only analysis" },
		{ key: "review", value: "Human, always" },
	],
	rule: ["Independent project", "Built in the open", "AWS first", "Human review"],
};

export interface AboutObservation {
	index: string;
	title: string;
	body: string;
}

export interface AboutMissionData {
	label: string;
	title: string;
	titleSoft: string;
	sub: string;
	quote: string;
	quoteBy: string;
	observations: AboutObservation[];
}

export const ABOUT_MISSION: AboutMissionData = {
	label: "01 / Why",
	title: "Every plan says what changes.",
	titleSoft: "Almost none say what it opens.",
	sub: "A plan is precise about resources and quiet about consequence. WCI exists to close that gap before the change is applied.",
	quote:
		"A security review that starts after the merge is a post-mortem with better formatting.",
	quoteBy: "The case for reading changes earlier",
	observations: [
		{
			index: "01",
			title: "The diff is not the impact",
			body: "A widened CIDR block or a removed condition is one line in a plan. The consequence lives somewhere else: in what the resource is attached to, who can reach it, and what it now permits.",
		},
		{
			index: "02",
			title: "Review is where context lives",
			body: "A tool that stops at “high severity” hands the work back to the reviewer with less context than before. The reviewer needs the source, not another score.",
		},
		{
			index: "03",
			title: "Evidence should be checkable",
			body: "A finding that cannot point to a resource, an attribute, and a plan line is an opinion. WCI is built so every claim can be traced back and checked.",
		},
	],
};

export interface AboutPrinciple {
	index: string;
	title: string;
	body: string;
	note: string;
}

export interface AboutPrinciplesData {
	label: string;
	title: string;
	titleSoft: string;
	sub: string;
	items: AboutPrinciple[];
}

export const ABOUT_PRINCIPLES: AboutPrinciplesData = {
	label: "02 / Principles",
	title: "Four rules,",
	titleSoft: "held on purpose.",
	sub: "They decide what the product will and will not do — including when doing less is the correct answer.",
	items: [
		{
			index: "01",
			title: "Evidence before opinion",
			body: "Every finding cites the resource, attribute, and plan line it came from. If it cannot be shown, it is not claimed.",
			note: "Every finding",
		},
		{
			index: "02",
			title: "Read-only, by default",
			body: "WCI reads plans. It does not apply, mutate, or roll back infrastructure, and it does not need write credentials to do its job.",
			note: "No write access",
		},
		{
			index: "03",
			title: "Humans decide",
			body: "Analysis narrows the question; the reviewer answers it. No automated verdict is presented as a fact.",
			note: "Reviewer owns the call",
		},
		{
			index: "04",
			title: "Gaps stay visible",
			body: "What V1 does not cover is published next to what it does, in the same place and the same voice.",
			note: "See coverage",
		},
	],
};

export interface DiffLine {
	kind: "meta" | "ctx" | "add" | "del";
	text: string;
}

export interface EvidenceRow {
	key: string;
	value: string;
}

export interface MethodFinding {
	id: string;
	category: string;
	severity: string;
	title: string;
	body: string;
	pills: string[];
}

export interface MethodStep {
	tab: string;
	title: string;
	summary: string;
	note: string;
	kind: "diff" | "evidence" | "finding" | "review";
	diff?: DiffLine[];
	evidence?: EvidenceRow[];
	finding?: MethodFinding;
	review?: string[];
}

export interface AboutMethodData {
	label: string;
	title: string;
	titleSoft: string;
	sub: string;
	steps: MethodStep[];
}

export const ABOUT_METHOD: AboutMethodData = {
	label: "03 / Method",
	title: "Plan in.",
	titleSoft: "Evidence out.",
	sub: "One path, followed the same way for every change. Nothing is inferred that the plan does not show.",
	steps: [
		{
			tab: "Plan",
			title: "Read the change",
			summary:
				"A plan arrives from a pull request. WCI reads the resource-level diff — no apply, no credentials, no side effects.",
			note: "Terraform and OpenTofu plans, read as data.",
			kind: "diff",
			diff: [
				{ kind: "meta", text: "~ aws_security_group.edge" },
				{
					kind: "ctx",
					text: "    ingress.cidr_blocks   [\"10.0.0.0/8\"] → [\"0.0.0.0/0\"]",
				},
				{ kind: "ctx", text: "    ingress.from_port     443" },
				{ kind: "del", text: "-   description           \"internal only\"" },
				{ kind: "add", text: "+   description           \"public edge\"" },
			],
		},
		{
			tab: "Evidence",
			title: "Attach the source",
			summary:
				"Each claim is tied to the resource, attribute, and plan line that produced it. If the evidence is missing, the finding is not raised.",
			note: "Deterministic fields, not model output.",
			kind: "evidence",
			evidence: [
				{ key: "resource", value: "\"aws_security_group.edge\"" },
				{ key: "attribute", value: "\"ingress.cidr_blocks\"" },
				{ key: "before", value: "[\"10.0.0.0/8\"]" },
				{ key: "after", value: "[\"0.0.0.0/0\"]" },
				{ key: "source", value: "\"plan.json:412\"" },
				{ key: "confidence", value: "\"deterministic\"" },
			],
		},
		{
			tab: "Finding",
			title: "State the impact",
			summary:
				"The finding is written as a sentence a reviewer can check, not a severity score to trust.",
			note: "One finding, one claim, one source.",
			kind: "finding",
			finding: {
				id: "WCI-1042",
				category: "Internet exposure",
				severity: "Review",
				title: "Edge group now accepts ingress from any IPv4 address",
				body: "The change widens ingress on port 443 from a private range to 0.0.0.0/0. The security group is attached to a public load balancer.",
				pills: ["Evidence attached", "Read-only", "Human review"],
			},
		},
		{
			tab: "Review",
			title: "Leave the decision",
			summary:
				"WCI stops at the question. Nothing is applied, merged, or blocked on your behalf.",
			note: "The reviewer answers. The repository records.",
			kind: "review",
			review: [
				"Is port 443 intended to be public?",
				"Is there an upstream control — WAF, security group chain, or network ACL?",
				"Does the change match what the pull request says it does?",
			],
		},
	],
};

export interface AboutNowCell {
	label: string;
	title: string;
	code?: string;
	sentence: string;
	highlight?: boolean;
}

export interface AboutNowData {
	label: string;
	title: string;
	titleSoft: string;
	sub: string;
	cells: AboutNowCell[];
	status: string;
	link: AboutCta;
}

export const ABOUT_NOW: AboutNowData = {
	label: "04 / Now",
	title: "Early, and explicit",
	titleSoft: "about it.",
	sub: "WCI is in development. The scope is deliberately narrow so the first version can be honest about what it proves.",
	cells: [
		{
			label: "Stage",
			title: "Early development",
			sentence: "Built in the open, before a public release.",
		},
		{
			label: "Input",
			title: "Terraform plans",
			code: "OpenTofu",
			sentence: "Pull requests first; GitHub Actions next.",
		},
		{
			label: "First cloud",
			title: "AWS",
			sentence: "More providers follow coverage, not the reverse.",
		},
		{
			label: "Boundary",
			title: "Read-only",
			highlight: true,
			sentence: "No apply, no auto-merge, no silent blocking.",
		},
	],
	status: "Building in the open — roadmap updated as scope changes",
	link: { label: "See what V1 covers", href: "/analysis#coverage" },
};
