import type { Metadata } from "next";
import { AnalysisHero } from "@/components/analysis/AnalysisHero";
import { GlyphTiles } from "@/components/ui/GlyphTiles";
import { Reveal } from "@/components/ui/Reveal";
import { LayersSection } from "@/components/analysis/LayersSection";
import { ClaimsSection } from "@/components/analysis/ClaimsSection";
import { FirstRuleSection } from "@/components/analysis/FirstRuleSection";
import { CoverageSection } from "@/components/analysis/CoverageSection";
import { ClosingBlock } from "@/components/ui/ClosingBlock";
import { ANALYSIS_TILES } from "@/lib/analysisData";

export const metadata: Metadata = {
	title: "Analysis model",
	description:
		"Evidence first. Claims second. Each layer keeps the facts, assumptions and confidence of the layer before it.",
};

export default function AnalysisPage() {
	return (
		<main id="content">
			<AnalysisHero />

			<section className="wrap" style={{ marginTop: 72 }} aria-label="Claim examples">
				<Reveal>
					<GlyphTiles tiles={ANALYSIS_TILES} />
				</Reveal>
			</section>

			<LayersSection />
			<ClaimsSection />
			<FirstRuleSection />
			<CoverageSection />

			<ClosingBlock
				title="Configure to Monitor."
				titleSoft="One direction."
				button={{ label: "View roadmap", href: "/roadmap" }}
			/>
		</main>
	);
}
