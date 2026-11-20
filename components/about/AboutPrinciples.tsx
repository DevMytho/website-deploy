import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import type { AboutPrinciplesData } from "@/lib/aboutData";

/**
 * "02 / Principles" — a hairline table of rules. Index, rule, consequence,
 * and a mono note that says where the rule shows up in the product.
 */
export function AboutPrinciples({
	label,
	title,
	titleSoft,
	sub,
	items,
}: AboutPrinciplesData) {
	return (
		<section className="wrap about-principles-section">
			<SectionHead
				label={label}
				title={title}
				titleSoft={titleSoft}
				sub={sub}
			/>

			<ol className="about-principles">
				{items.map((item, i) => (
					<Reveal
						as="li"
						key={item.index}
						delay={i * 0.05}
						className="about-principle"
					>
						<span className="about-principle-index" aria-hidden="true">
							{item.index}
						</span>
						<h3 className="about-principle-title">{item.title}</h3>
						<p className="about-principle-body">{item.body}</p>
						<span className="about-principle-note">{item.note}</span>
					</Reveal>
				))}
			</ol>
		</section>
	);
}
