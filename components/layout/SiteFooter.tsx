"use client";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-cols">
          <div className="footer-col">
            <p className="footer-brand">WAYNE CITADEL</p>
            <p className="footer-note">
              Software. Infrastructure. Cybersecurity. Engineering with intent.
            </p>
          </div>

          <nav className="footer-col" aria-label="Footer navigation">
            <p className="footer-col-title">Navigation</p>
            <a href="/">Home</a>
            <a href="/wci">WCI</a>
            <a href="/analysis">Analysis &amp; Coverage</a>
            <a href="/roadmap">Roadmap</a>
            <a href="/contact">Contact</a>
          </nav>

          <div className="footer-col">
            <p className="footer-col-title">Project</p>
            <a
              href="https://github.com/Waynegridtech-co/wayne-citadel"
              target="_blank"
              rel="noreferrer"
            >
              WCI on GitHub ↗
            </a>
            <a href="/roadmap">Product direction</a>
          </div>
        </div>

				<p className="footer-wordmark" style={{ fontSize: "clamp(42px, 13vw, 180px)" }} aria-hidden="true">
          CITADEL
        </p>
      </div>
    </footer>
  );
}
