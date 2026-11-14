"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, LayoutGroup } from "framer-motion";

const LIVE_SITE_URL = "https://arhistrategstudio.github.io/wci-test-site/";

const NAV_LINKS = [
	{ href: "/analysis", label: "Analysis & Coverage" },
	{ href: "/roadmap", label: "Roadmap" },
	{ href: "/contact", label: "Contact" },
];

export function SiteHeader() {
	const pathname = usePathname();
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const active = NAV_LINKS.find(
		(l) => pathname === l.href || pathname.startsWith(l.href + "/"),
	);

	return (
		<header className="site-header" data-scrolled={scrolled || undefined}>
			<div className="wrap site-header-inner">
				<a className="logo" href="/analysis">
					WCI
				</a>

				<LayoutGroup id="site-header-nav">
					<nav className="header-nav" aria-label="Main">
						{NAV_LINKS.map((link) => {
							const isActive = active?.href === link.href;
							return (
								<a
									key={link.href}
									className="header-link"
									href={link.href}
									aria-current={isActive ? "page" : undefined}
								>
									{isActive && (
										<motion.span
											layoutId="header-active-indicator"
											className="header-indicator"
											transition={{
												type: "spring",
												stiffness: 420,
												damping: 34,
											}}
										/>
									)}
									<span style={{ position: "relative" }}>{link.label}</span>
								</a>
							);
						})}
					</nav>
				</LayoutGroup>

				<div className="header-cta">
					<a
						className="btn-pill solid"
						href="/contact"
					>
						Contact ↗
					</a>
				</div>
			</div>
		</header>
	);
}
