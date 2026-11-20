import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutMission } from "@/components/about/AboutMission";
import { AboutPrinciples } from "@/components/about/AboutPrinciples";
import { AboutMethod } from "@/components/about/AboutMethod";
import { AboutNow } from "@/components/about/AboutNow";
import { ClosingBlock } from "@/components/ui/ClosingBlock";
import {
	ABOUT_HERO,
	ABOUT_MISSION,
	ABOUT_PRINCIPLES,
	ABOUT_METHOD,
	ABOUT_NOW,
} from "@/lib/aboutData";

export const metadata: Metadata = {
	title: "About",
	description:
		"Wayne Cloud Infrastructure reads Terraform and OpenTofu plans and explains the security impact of what is about to change. Read-only. Evidence first. Human review.",
};

export default function AboutPage() {
	return (
		<main id="content">
			<AboutHero {...ABOUT_HERO} />
			<AboutMission {...ABOUT_MISSION} />
			<AboutPrinciples {...ABOUT_PRINCIPLES} />
			<AboutMethod {...ABOUT_METHOD} />
			<AboutNow {...ABOUT_NOW} />

			<ClosingBlock
				title="Read the change."
				titleSoft="Then decide."
				button={{ label: "Start with the analysis", href: "/analysis" }}
			/>
		</main>
	);
}
