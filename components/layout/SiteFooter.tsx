"use client";

const LIVE_SITE_URL = "https://arhistrategstudio.github.io/wci-test-site/";

export function SiteFooter() {
	return (
		<footer className="site-footer">
			<div className="wrap">
				<div className="footer-cols">
					<div className="footer-col">
						<p className="footer-brand">WAYNE CLOUD INFRASTRUCTURE</p>
						<p className="footer-note">
							Open source. Early development. Follow along.
						</p>
					</div>

					<nav className="footer-col" aria-label="Footer navigation">
						<p className="footer-col-title">Navigation</p>
						<a href="/analysis">Analysis &amp; Coverage</a>
						<a href="/roadmap">Roadmap</a>
						<a href="/contact">Contact</a>
					</nav>

					<div className="footer-col">
						<p className="footer-col-title">Project</p>
						<a href={LIVE_SITE_URL} target="_blank" rel="noreferrer">
							Live reference site
						</a>
						<span className="placeholder">[GITHUB URL]</span>
					</div>
				</div>

				<p className="footer-wordmark" aria-hidden="true">
					WCI
				</p>
			</div>
		</footer>
	);
}
