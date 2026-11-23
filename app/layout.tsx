import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import "./theme.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollProgressLine } from "@/components/layout/ScrollProgressLine";

const inter = Inter({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-inter",
	display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["400", "500"],
	variable: "--font-jetbrains",
	display: "swap",
});

export const metadata: Metadata = {
	icons: { icon: "/brand/favicon.png", apple: "/brand/wayne-citadel.png" },
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
			className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
			suppressHydrationWarning
		>
			<head><script dangerouslySetInnerHTML={{ __html: `try{document.documentElement.dataset.theme=localStorage.getItem('wayne-theme')==='light'?'light':'dark'}catch{}` }} /></head>
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
