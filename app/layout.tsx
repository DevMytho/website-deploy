import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "WAYNE CITADEL — Practical infrastructure & security work",
	description:
		"An early-stage project exploring practical ideas across infrastructure, cybersecurity, cloud systems and connected technology.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={`h-full antialiased`}
			suppressHydrationWarning
		>
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	);
}
