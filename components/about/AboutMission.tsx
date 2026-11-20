import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import type { AboutMissionData } from "@/lib/aboutData";

/**
 * "01 / Why" — a working note on the left, three numbered observations on the
 * right. No cards: one hairline per observation keeps it editorial.
 */
export function AboutMission({
	label,
	title,
	titleSoft,
	sub,
	quote,
	quoteBy,
	observations,
}: AboutMissionData) {
	return (
		<section className="wrap about-mission">
			<SectionHead
				label={label}
				title={title}
				titleSoft={titleSoft}
				sub={sub}
			/>

			<div className="about-mission-grid">
				<Reveal className="about-quote-col">
					<p className="about-quote-label">Working note</p>
					<blockquote className="about-quote">{quote}</blockquote>
					<p className="about-quote-by">{quoteBy}</p>
				</Reveal>

				<div className="about-observations">
					{observations.map((item, i) => (
						<Reveal
							key={item.index}
							delay={0.06 + i * 0.06}
							className="about-observation"
						>
							<span className="about-obs-index" aria-hidden="true">
								{item.index}
							</span>
							<div>
								<h3 className="about-obs-title">{item.title}</h3>
								<p className="about-obs-body">{item.body}</p>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
