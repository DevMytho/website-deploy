import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollProgressLine } from "@/components/layout/ScrollProgressLine";

const inter = Inter({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
	variable: "--font-inter",
	display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["400", "500"],
	variable: "--font-jetbrains",
	display: "swap",
});

const playfairDisplay = Playfair_Display({
	subsets: ["latin"],
	weight: ["400"],
	style: ["italic"],
	variable: "--font-playfair",
	display: "swap",
});

export const metadata: Metadata = {
	title: {
		default: "WCI — Wayne Cloud Infrastructure",
		template: "%s — WCI",
	},
	description:
		"Security that detects every change, understands its impact and proposes the fix — on every commit, every deploy and every change.",
};

export const viewport: Viewport = {
	themeColor: "#0a0a0a",
	width: "device-width",
	initialScale: 1,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${inter.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} antialiased`}
			suppressHydrationWarning
		>
			<body>
				<MotionConfig reducedMotion="user">
					<a className="skip-link" href="#content">
						Skip to content
					</a>
					<div className="film-grain" aria-hidden="true" />
					<div className="top-light" aria-hidden="true" />
					<SmoothScroll />
					<ScrollProgressLine />
					{/* <AnnouncementBar /> */}
					<SiteHeader />
					<div id="content">{children}</div>
					<SiteFooter />
				</MotionConfig>
			</body>
		</html>
	);
}
