import Link from "next/link";
import { AboutManifest } from "@/components/about/AboutManifest";
import { AppWindow } from "@/components/ui/AppWindow";
import { Reveal } from "@/components/ui/Reveal";
import { Stage } from "@/components/ui/Stage";
import type { AboutHeroData } from "@/lib/aboutData";

/**
 * About hero — same two-column rhythm as the analysis page, but the right
 * column is a full-bleed monochrome visual that changes every few seconds.
 */
export function AboutHero({
	label,
	title,
	titleSoft,
	paragraph,
	primaryCta,
	secondaryCta,
	manifest,
	rule,
}: AboutHeroData) {
	return (
		<>
			<section className="wrap about-hero" aria-labelledby="about-title">
				<div className="about-hero-copy">
					<Reveal>
						<p className="hero-label">{label}</p>
					</Reveal>
					<Reveal delay={0.06}>
						<h1 className="h1 about-h1" id="about-title">
							{title}
							<span className="soft">{titleSoft}</span>
						</h1>
					</Reveal>
					<Reveal delay={0.12}>
						<p className="hero-text about-hero-text">{paragraph}</p>
					</Reveal>
					<Reveal delay={0.18}>
						<div className="hero-cta-row">
							<Link className="btn-pill solid" href={primaryCta.href}>
								{primaryCta.label}
							</Link>
							<Link className="btn-pill outlined" href={secondaryCta.href}>
								{secondaryCta.label}
							</Link>
						</div>
					</Reveal>
				</div>

				<Reveal delay={0.1} className="about-hero-panel">
					<Stage variant="hero" ariaLabel="Project summary">
						<AppWindow title="about.wci" label="early">
							<AboutManifest rows={manifest} />
						</AppWindow>
					</Stage>
				</Reveal>
			</section>

			<div className="wrap">
				<Reveal delay={0.14}>
					<p className="about-hero-rule">
						{rule.map((item, i) => (
							<span className="about-hero-rule-item" key={item}>
								{i > 0 && <span className="about-rule-dot" aria-hidden="true" />}
								{item}
							</span>
						))}
					</p>
				</Reveal>
			</div>
		</>
	);
}
