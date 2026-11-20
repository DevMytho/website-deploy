import Link from "next/link";
import { CellRow } from "@/components/ui/CellRow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import type { AboutNowData } from "@/lib/aboutData";

/**
 * "04 / Now" — current scope as one bordered cell row, closed by a live
 * status line that links into the coverage tabs.
 */
export function AboutNow({
	label,
	title,
	titleSoft,
	sub,
	cells,
	status,
	link,
}: AboutNowData) {
	return (
		<section className="wrap about-now">
			<SectionHead
				label={label}
				title={title}
				titleSoft={titleSoft}
				sub={sub}
			/>

			<Reveal>
				<CellRow cells={cells} ariaLabel="Current project scope" />
			</Reveal>

			<Reveal delay={0.08}>
				<div className="about-now-note">
					<p className="about-now-status">
						<span className="about-now-dot" aria-hidden="true" />
						{status}
					</p>
					<Link className="about-now-link" href={link.href}>
						{link.label} &rarr;
					</Link>
				</div>
			</Reveal>
		</section>
	);
}
