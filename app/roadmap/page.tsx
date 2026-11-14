import type { Metadata } from "next";
import { RoadmapHero } from "@/components/roadmap/RoadmapHero";
import { GlyphTiles } from "@/components/ui/GlyphTiles";
import { Reveal } from "@/components/ui/Reveal";
import { DirectionSection } from "@/components/roadmap/DirectionSection";
import { SuccessSection } from "@/components/roadmap/SuccessSection";
import { StackPanels } from "@/components/roadmap/StackPanels";
import { ClosingBlock } from "@/components/ui/ClosingBlock";
import { ParticleShellStage } from "@/components/ui/ParticleShellStage";
import { ROADMAP_SECTIONS, ROADMAP_TILES } from "@/lib/scopeData";

export const metadata: Metadata = {
	title: "Roadmap",
	description:
		"Configure to Monitor. One direction. This is a direction, not current work. Deployment automation and posture monitoring come after the first release.",
};

export default function RoadmapPage() {
	return (
		<main id="content">
			<RoadmapHero />

			<section className="wrap" style={{ marginTop: 72 }} aria-label="Roadmap principles">
				<Reveal>
					<GlyphTiles tiles={ROADMAP_TILES} />
				</Reveal>
			</section>

			<StackPanels>
				<DirectionSection />
				<SuccessSection />

				<section className="stack-panel shell-panel" aria-label="Follow along">
					<ParticleShellStage label="Roadmap particle field" />
					<div className="wrap shell-panel-head">
						<Reveal>
							<p className="shell-label">{ROADMAP_SECTIONS.shell.label}</p>
						</Reveal>
					</div>
				</section>
			</StackPanels>

			<ClosingBlock
				title="Evidence first."
				titleSoft="Claims second."
				button={{ label: "View analysis", href: "/analysis" }}
			/>
		</main>
	);
}
