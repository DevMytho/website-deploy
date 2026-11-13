import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadProps {
	label: string;
	title: string;
	titleSoft: string;
	sub?: string;
	link?: { label: string; href: string };
}

/**
 * SectionHead — 2-column grid: mono label left, H2 (two-tone) + grey
 * paragraph + optional text link right.
 */
export function SectionHead({ label, title, titleSoft, sub, link }: SectionHeadProps) {
	return (
		<div className="section-head">
			<Reveal>
				<p className="section-label">{label}</p>
			</Reveal>
			<div className="section-head-right">
				<Reveal delay={0.08}>
					<h2 className="h2">
						{title}
						<span className="soft">{titleSoft}</span>
					</h2>
				</Reveal>
				{sub && (
					<Reveal delay={0.14}>
						<p className="section-sub">{sub}</p>
					</Reveal>
				)}
				{link && (
					<Reveal delay={0.2}>
						<Link className="section-link" href={link.href}>
							{link.label} &rarr;
						</Link>
					</Reveal>
				)}
			</div>
		</div>
	);
}
