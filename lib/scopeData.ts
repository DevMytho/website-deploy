// ─── Scope & Roadmap page data ───────────────────────────────────────────────
// Content extracted verbatim from arhistrategstudio.github.io/wci-test-site

export interface ScopeItem {
	text: string;
	code?: string;
}

export const WHAT_V1_CHECKS: ScopeItem[] = [
	{ text: "Security misconfigurations" },
	{ text: "Permission changes" },
	{ text: "Internet exposure" },
	{ text: "Network changes" },
	{ text: "Resource access changes" },
	{ text: "Security posture changes, before versus after" },
];

export const TECHNOLOGY_SCOPE: ScopeItem[] = [
	{ text: "Terraform, and OpenTofu where compatibility can be verified" },
	{ text: "AWS as the first cloud provider" },
	{ text: "GitHub pull requests and GitHub Actions" },
];

export const TECHNOLOGY_CHIPS = ["Terraform", "AWS", "GitHub"];

export const NOT_IN_V1: ScopeItem[] = [
	{ text: "Kubernetes, Azure, GCP" },
	{ text: "A SaaS dashboard" },
	{ text: "Slack or other communication integrations" },
	{ text: "Automated remediation or any automatic infrastructure change" },
	{ text: "Blocking deployments by default" },
];

export const KNOWN_GAPS: ScopeItem[] = [
	{ text: "IPv6 ", code: "::/0" },
	{ text: "Standalone ", code: "aws_vpc_security_group_ingress_rule" },
	{ text: "Security-group references and prefix lists" },
	{ text: "Unknown values" },
];

export const KNOWN_GAPS_WARNING =
	"Not evaluated in V1 — a missing finding here does not mean safe. These are recorded as unsupported or analysis-incomplete.";

export const SUCCESS_CRITERION =
	"When an engineer changes infrastructure in a pull request, WCI accurately explains what changed from a security perspective, what new risk or capability it introduced, and why it matters.";

export const SUCCESS_CHIPS = ["Open source", "Early development", "Follow along"];

export type RoadmapNode = {
	label: string;
	v1Focus: boolean;
};

export const ROADMAP_NODES: RoadmapNode[] = [
	{ label: "Configure", v1Focus: false },
	{ label: "Secure", v1Focus: true },
	{ label: "Validate", v1Focus: false },
	{ label: "Automate", v1Focus: false },
	{ label: "Deploy", v1Focus: false },
	{ label: "Monitor", v1Focus: false },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Approved-design data for the rebuilt /roadmap page.
   Sentences are verbatim from the live site (roadmap + coverage pages,
   fetched 2026-11-12). Titles/labels are verbatim fragments or neutral
   structural markers. Nothing else is invented.
   ───────────────────────────────────────────────────────────────────────────── */

export const ROADMAP_HERO = {
	label: "08 / Roadmap",
	title: "Configure to Monitor.",
	titleSoft: "One direction.",
	note: "This is a direction, not current work. Deployment automation and posture monitoring come after the first release.", // live
	stepperNote: "Highlighted: the V1 focus.", // live
	windowTitle: "Direction",
	windowLabel: "roadmap",
};

export const ROADMAP_SECTIONS = {
	direction: {
		label: "01  Direction",
		title: "One direction.",
		titleSoft: "Highlighted: the V1 focus.",
	},
	success: {
		label: "02  Success",
		title: "Success criterion.",
		titleSoft: "Open source. Early development.",
	},
	// User-directed section name for the closing particle panel; the wording
	// ("Follow along") is a verbatim fragment from the live site's roadmap.
	shell: {
		label: "03  Follow along",
	},
};

export const ROADMAP_TILES = [
	{ caption: "Open source", sentence: "WCI is being built in the open." }, // live
	{
		caption: "Early development",
		sentence: "Follow along as each stage comes online.",
	}, // live
	{
		caption: "One direction",
		sentence: "This is a direction, not current work.",
	}, // live
];

/* CellRow under the direction section */
export const DIRECTION_CELLS = [
	{ label: "V1 focus", title: "Secure", sentence: "Highlighted: the V1 focus." }, // live
	{
		label: "Not in V1",
		title: "Automated remediation",
		sentence: "Automated remediation or any automatic infrastructure change.", // live (coverage)
	},
	{
		label: "Also not in V1",
		title: "Blocking deployments",
		sentence: "Blocking deployments by default.", // live (coverage)
	},
	{
		label: "After V1",
		title: "Automate, Deploy, Monitor",
		sentence:
			"Deployment automation and posture monitoring come after the first release.", // live
	},
];

/* CellRow under the success section — fragments of the live success criterion */
export const SUCCESS_CELLS = [
	{
		label: "Success criterion",
		title: "Pull request",
		sentence: "When an engineer changes infrastructure in a pull request.", // live
	},
	{
		label: "Security perspective",
		title: "What changed",
		sentence:
			"WCI accurately explains what changed from a security perspective.", // live
	},
	{
		label: "New risk or capability",
		title: "Why it matters",
		sentence: "What new risk or capability it introduced, and why it matters.", // live
	},
];

