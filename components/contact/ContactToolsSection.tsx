"use client";

import { useState, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

interface ToolTileItem {
	name: string;
	caption: string;
	icon: () => React.JSX.Element;
}

function TerraformMark() {
	return (
		<svg
			viewBox="0 0 40 40"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.25"
			style={{ width: "32px", height: "32px" }}
			aria-hidden="true"
		>
			<polygon points="6,6 18,12 18,24 6,18" fill="rgba(255,255,255,0.06)" />
			<polygon points="22,14 34,20 34,32 22,26" fill="rgba(255,255,255,0.06)" />
			<polygon points="6,22 18,28 18,38 6,32" fill="rgba(255,255,255,0.06)" />
			<polygon points="22,2 34,8 34,18 22,12" />
		</svg>
	);
}

function OpenTofuMark() {
	return (
		<svg
			viewBox="0 0 40 40"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.25"
			style={{ width: "32px", height: "32px" }}
			aria-hidden="true"
		>
			<polygon points="20,4 35,12 35,28 20,36 5,28 5,12" />
			<line x1="20" y1="4" x2="20" y2="36" />
			<line x1="5" y1="12" x2="35" y2="28" />
			<line x1="5" y1="28" x2="35" y2="12" />
			<circle cx="20" cy="20" r="3" fill="currentColor" />
		</svg>
	);
}

function AwsMark() {
	return (
		<svg
			viewBox="0 0 40 40"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.25"
			style={{ width: "32px", height: "32px" }}
			aria-hidden="true"
		>
			<path
				d="M10 26C7 26 5 24 5 21C5 18.5 7 16.5 9.5 16.5C10 12 14 8.5 19 8.5C23.5 8.5 27 11.5 28 15.5C31.5 16 34.5 18.5 34.5 22C34.5 25.5 31.5 28.5 28 28.5L10 28.5"
				strokeLinecap="round"
			/>
			<circle cx="14" cy="21" r="1.5" fill="currentColor" />
			<circle cx="20" cy="18" r="1.5" fill="currentColor" />
			<circle cx="26" cy="22" r="1.5" fill="currentColor" />
			<line x1="14" y1="21" x2="20" y2="18" strokeDasharray="2 2" />
			<line x1="20" y1="18" x2="26" y2="22" strokeDasharray="2 2" />
		</svg>
	);
}

function GitHubActionsMark() {
	return (
		<svg
			viewBox="0 0 40 40"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.25"
			style={{ width: "32px", height: "32px" }}
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="4" />
			<circle cx="12" cy="28" r="4" />
			<circle cx="28" cy="20" r="4" />
			<line x1="12" y1="16" x2="12" y2="24" />
			<path d="M12 28C16 28 20 26 24 20" strokeLinecap="round" />
			<path d="M23 16L28 20L23 24" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

const TOOLS: ToolTileItem[] = [
	{
		name: "Terraform",
		caption: "IaC",
		icon: TerraformMark,
	},
	{
		name: "OpenTofu",
		caption: "IaC",
		icon: OpenTofuMark,
	},
	{
		name: "AWS",
		caption: "Cloud",
		icon: AwsMark,
	},
	{
		name: "GitHub Actions",
		caption: "Pull requests",
		icon: GitHubActionsMark,
	},
];

function InteractiveToolTile({ tool }: { tool: ToolTileItem }) {
	const [mousePos, setMousePos] = useState({ x: 82, y: 82 });

	function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
		const rect = e.currentTarget.getBoundingClientRect();
		setMousePos({
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		});
	}

	const Icon = tool.icon;

	return (
		<div
			className="contact-tool-tile"
			onMouseMove={handleMouseMove}
		>
			<div
				className="contact-tool-radial"
				style={{
					background: `radial-gradient(140px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.05), transparent 70%)`,
				}}
				aria-hidden="true"
			/>
			<div className="contact-tool-icon">
				<Icon />
			</div>
			<div style={{ display: "grid", gap: "3px", textAlign: "center" }}>
				<p className="contact-tool-name">{tool.name}</p>
				<p className="contact-tool-caption">{tool.caption}</p>
			</div>
		</div>
	);
}

export function ContactToolsSection() {
	const shouldReduce = useReducedMotion();

	return (
		<section className="contact-tools-section" aria-label="Supported integrations">
			<div className="contact-tools-container">
				<Reveal>
					<h2 className="contact-tools-heading">
						Built for the tools
						<span className="soft">engineers already use.</span>
					</h2>
				</Reveal>

				<Reveal delay={0.1}>
					<div className="contact-tools-grid">
						{TOOLS.map((tool) => (
							<InteractiveToolTile key={tool.name} tool={tool} />
						))}
					</div>
				</Reveal>
			</div>
		</section>
	);
}
