"use client";

import { Stage } from "@/components/ui/Stage";
import { AppWindow } from "@/components/ui/AppWindow";
import { Pill } from "@/components/ui/Pill";
import { HERO, HERO_DIFF, HERO_FINDING } from "@/lib/analysisData";

/**
 * Analysis hero — 2 columns (.8fr / 1.2fr). Left: label, two-tone H1,
 * verbatim paragraph, pill buttons. Right: Stage (brightest texture) with an
 * AppWindow whose diff lines type in sequentially (CSS steps, plays once;
 * static under reduced motion), then the finding strip fades up.
 */
export function AnalysisHero() {
	return (
		<section className="wrap hero" aria-labelledby="analysis-hero-title">
			<div>
				<p className="hero-label">{HERO.label}</p>
				<h1 className="h1" id="analysis-hero-title">
					{HERO.title}
					<span className="soft">{HERO.titleSoft}</span>
				</h1>
				<p className="hero-text">{HERO.paragraph}</p>
				<div className="hero-cta-row">
					<a className="btn-pill solid" href="#first-rule">
						{HERO.primaryCta}
					</a>
					<a className="btn-pill outlined" href="#coverage">
						{HERO.secondaryCta}
					</a>
				</div>
			</div>

			<div className="hero-stage">
				<Stage variant="hero" ariaLabel="WCI pull-request diff preview">
					<AppWindow title={HERO_DIFF.windowTitle} label={HERO_DIFF.windowLabel}>
						<div className="app-window-body" style={{ paddingTop: 26, paddingBottom: 26 }}>
							<div className="diff">
								{HERO_DIFF.lines.map((line, i) => (
									<span
										key={line.text}
										className={`diff-line ${line.kind}`}
										style={{ "--line-index": i } as React.CSSProperties}
									>
										<span className="typed">{line.text}</span>
										{i === HERO_DIFF.lines.length - 1 && (
											<span className="diff-caret" aria-hidden="true" />
										)}
									</span>
								))}
							</div>

							<div className="finding-strip">
								<div className="finding-strip-top">
									<span>{HERO_FINDING.id}</span>
									<span style={{ color: "var(--dim)" }} aria-hidden="true">
										·
									</span>
									<span>{HERO_FINDING.category}</span>
									<Pill variant="on">{HERO_FINDING.severity}</Pill>
								</div>
								<p className="finding-strip-sentence">{HERO_FINDING.sentence}</p>
								<Pill>{HERO_FINDING.pill}</Pill>
							</div>
						</div>
					</AppWindow>
				</Stage>
			</div>
		</section>
	);
}
