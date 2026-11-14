"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

interface ClosingBlockProps {
	title: string;
	titleSoft: string;
	button: { label: string; href: string };
}

/**
 * ClosingBlock — centered mono "W C I" glyph block that drifts in on scroll,
 * two-tone H2 sign-off, one white pill button. (The only centered block.)
 */
export function ClosingBlock({ title, titleSoft, button }: ClosingBlockProps) {
	return (
		<section className="closing-block" aria-label="Closing">
			<div className="wrap">
				<Reveal>
					<p className="wci-glyph" aria-hidden="true">
						W&nbsp;C&nbsp;I
						<br />
						W&nbsp;C&nbsp;I
						<br />
						W&nbsp;C&nbsp;I
					</p>
				</Reveal>
				<Reveal delay={0.1}>
					<h2 className="h2">
						{title}
						<span className="soft">{titleSoft}</span>
					</h2>
				</Reveal>
				<Reveal delay={0.18}>
					<div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
						<Link className="btn-pill solid" href={button.href}>
							{button.label}
						</Link>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
