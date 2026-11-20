# Wayne Citadel — cinematic homepage implementation

Submission update, 20 November 2026: the user approved publishing this homepage branch as a PR. See `HOME-PR-REVIEW.md` for the final implementation, screenshots and validation summary. Local-only statements below record earlier review milestones. Current source uses `PhilosophyExperience` and `FocusVisualization`; superseded unused prototype components are omitted from submission.

19 November 2026 · Local team-review edition

Visual enhancement update: see `HOME-VISUAL-ENHANCEMENT.md` for the subsequent in-place pass. It supersedes the original button-only Philosophy and static engineering/WCI visual descriptions below, while preserving the homepage structure and shared shell.

## Objective and baseline

Replace the root redirect with a complete Wayne Citadel company homepage that introduces infrastructure, cybersecurity and software engineering. Work started from `origin/main` 6f46b58 after merged PRs #1 and #2. The work is on `feat/cinematic-homepage`, local and uncommitted. No remote PR, push, deployment, database change or technical-backend change is part of this delivery.

The pre-implementation checkpoint is `HOME-RESEARCH-AND-DESIGN.md`. It records actual source inspection and reference limitations. Existing route `/scope` redirects to `/roadmap`; this behavior is preserved.

## Reference and creative direction

The user-supplied 53.53-second recording was opened with OpenCV and sampled at 24 points throughout its duration. A full contact sheet plus a detailed corridor frame informed the door dimensions, thin light seam, side openings, central vanishing point and handoff into editorial content. This was visual sampling, not continuous playback or audio transcription. No footage, branding, burgundy colors, photography or proprietary website assets were copied. Frame extracts remain ignored.

The live deployed WCI page displayed Vercel Login in headless Edge. The supplied Dusan reference site loaded successfully. Local WCI source and approved screenshots provided the primary grayscale reference. Existing research/report documents and extracted product direction supplied content constraints. No new customer, certification, revenue or product-release claims were introduced.

## Homepage structure

| Section | Purpose and behavior |
| --- | --- |
| Architectural arrival | Editorial H1 and two working CTAs; original dimensional split-panel door |
| Scroll film | White seam activation, door separation, forward dolly, corridor, three discipline labels and dark editorial handoff |
| Wayne Citadel introduction | Grounded company positioning and connected discipline line |
| Engineering focus | Three asymmetric rows with original security, infrastructure-stack and software diagrams |
| Philosophy | Native buttons reorganize a nine-node diagram through Find problems, Build solutions, Improve technology |
| WCI showcase | Illustrative code-to-finding example with early-development status and evidence limitations |
| Engineering in practice | Understand systems, validate changes and retain human decisions |
| Product direction | Compact six-stage direction strip, with security analysis distinguished from future capabilities |
| Contact | Original silver architectural light arc and CTA to existing Contact route |
| Shared footer | Company identity, real internal navigation and WCI repository destination |

## Hero implementation

`CinematicPortal` is the only scroll-controlled camera. It enhances desktop viewports at least 960px wide and 650px tall when reduced motion is off. One viewport-sized stage stays sticky beneath the 64px shared header inside a 380svh sequence. The scroll distance maps to arrival, illumination, split-door opening, corridor travel, Security, Infrastructure, Software and clarity handoff. A single measured progress value determines camera scale, panel translation/rotation, glow opacity, text recession and scene opacity. Scrolling backward reverses the same state; there is no timer chain or one-way playback.

Original CSS perspective, gradients and SVG corridor surfaces provide the architecture. Repeated ribs, ceiling lights, floor convergence, side bays, far opening and reflection suggest depth. No canvas/WebGL renderer, external scene asset or application dependency was added. This is a stylized architectural illustration rather than a photorealistic 3D simulation.

## Interactions, accessibility and performance

Native Home scrolling drives the scene. The existing Lenis component returns early on Home and retains its previous behavior on other routes. The hero registers one passive scroll listener and schedules one requestAnimationFrame per event batch. It reads geometry once per update, writes CSS variables directly, and does not re-render React on every scroll. IntersectionObserver suspends scene updates outside the visible section. Cleanup removes listeners, observer and pending frame.

Skip to introduction bypasses the cinematic sequence. Pause returns to the static composition and removes pinning. Phones, tablets below the enhancement threshold, short windows, high zoom that reduces the CSS viewport, reduced motion and JavaScript-disabled browsing receive a compact static doorway composition and normal document flow. All disciplines have readable text below the scene. Decorative architecture is aria-hidden; one H1, semantic sections, logical headings, real links, focus outlines and pressed-state philosophy controls provide the meaningful interface. A polite live region announces philosophy explanations. Content headings progressively reveal only after browser enhancement; reduced-motion changes remove pending reveals.

Shared navigation now links Home, WCI, Analysis & Coverage, Roadmap and Contact. The brand points to Home. The mobile menu is keyboard-operable, closes on link selection/Escape and restores toggle focus on Escape. Footer reference-site/GitHub placeholders have been replaced with real destinations. Existing global fonts, neutral design tokens, pill button styles and shared header/footer are reused. New CSS is scoped to modules.

No new autoplay loop, video payload, particle cloud or third-party runtime script was introduced. This avoids GPU-heavy rendering, but does not constitute measured low-end-device profiling or a Lighthouse/WCAG audit.

## Integration boundaries

WCI's separate header/footer nested within the shared shell remains a pre-existing inconsistency. It is documented rather than silently redesigning the approved product page. Analysis, Contact and Roadmap also contain pre-existing `content` IDs nested under the layout's `content` wrapper. Root-level metadata is overridden with an absolute company homepage title; other route metadata is preserved. The incoming contact API requires MONGODB_URI at build time; a local placeholder may be used for build verification without making a database connection. No form submissions are part of testing.

## Files

Added: `components/home/CinematicPortal.tsx`, `EngineeringDiagram.tsx`, `EngineeringPhilosophy.tsx`, `HomeEnhancements.tsx`, `HomePageContent.tsx`, `home.module.css`; `components/layout/navigation.module.css`; both Home reports.

Modified: `app/page.tsx`, shared `SiteHeader.tsx`, `SiteFooter.tsx`, and the Home-only branch of `SmoothScroll.tsx`. Package manifests, existing route implementations, global CSS and contact database code remain unchanged.

## Validation record

`npm ci` passed (74 packages, zero reported vulnerabilities). `npx --no-install tsc --noEmit` passed. The final `npm run build` completed successfully, including compilation, TypeScript, static generation and trace collection. Routes include `/`, `/_not-found`, `/analysis`, `/contact`, `/roadmap`, `/scope`, `/wci` and the dynamic `/api/contact`. No lint or repository test scripts are configured. `git diff --check` passed; Git prints only normal Windows line-ending notices.

Headless Microsoft Edge with Playwright passed the complete browser run, recorded in ignored `artifacts/home-verification.json`:

- All seven hero checkpoints selected the intended phase with the sticky stage at exactly y=64px. Scroll progress matched the target within 0.02.
- Reverse scrolling, rapid direction changes, reload midway and release into the introduction passed.
- All seven requested widths (320, 375, 390, 768, 1024, 1440 and 1920) had no document horizontal overflow.
- Native philosophy buttons changed selected state and diagram; pause removed enhancement and resume restored it.
- Mobile menu opened, closed on Escape and reflected its expanded state.
- Reduced motion, 1024x600 short viewport and JavaScript-disabled static content passed.
- WCI, Analysis, Roadmap, Contact and Scope requests returned successful final pages; Scope correctly finished on Roadmap. WCI had two headers/two footers, as in the baseline; the other routes had one of each. No page JavaScript errors were captured. Contact data was never submitted.

Visual review inspected the desktop arrival, doorway opening, Security corridor and 375px full-page capture. This prompted a refinement to discipline-label whitespace at mobile sizes and a screenshot pass that scrolls through entrances before capturing below-fold headings. The scene is a deliberately stylized original architectural environment; no claim of photorealism or complete fidelity to the reference is made.

Real captures: `artifacts/home-arrival-1440.png`, `home-activation-1440.png`, `home-door-1440.png`, `home-security-1440.png`, `home-infrastructure-1440.png`, `home-software-1440.png`, `home-handoff-1440.png`; seven responsive full-page captures; `home-reduced-motion.png`; philosophy and existing-route captures. The initial browser-test recording is saved under `artifacts/home-recording/`.

Final production-preview capture pass passed with no page JavaScript errors and confirmed the refined mobile label reads `Security engineering`. Review-ready full-page images are `artifacts/home-375-review-full.png`, `home-768-review-full.png` and `home-1440-review-full.png`; additional views are `home-wci-showcase.png` and `home-engineering-review.png`. These captures scroll through content first so entrance effects have completed. The local production preview is running at http://localhost:3000/ .

Additional team deliverables: `artifacts/output/pdf/Wayne-Citadel-Homepage-Review.pdf` and `artifacts/home-cinematic-walkthrough.webm`. The PDF skill informed the separate review export and its render/inspection pass. The concise walkthrough shows forward progression, the introduction handoff and reverse progression. All generated media remains ignored by Git.

First production-build attempt was stopped after compilation to release resources for browser checks. A later retry was temporarily rejected because automatic approval review hit its usage limit (not a security determination); it was retried after the user asked to continue. The final attempt uses a local-only MONGODB_URI placeholder required by the existing Contact API at build import. It does not establish a database connection or validate that API against a real database.

Local commands: `npm ci`; `npm run build`; `npx tsc --noEmit`; `npm run dev -- --hostname 127.0.0.1 --port 3000`. Local URL: http://localhost:3000/ . Incoming Contact API needs a build-only `MONGODB_URI` value for the production build.

## Proposed review submission

Suggested commit: `feat(home): add cinematic Wayne Citadel homepage`.

Suggested PR title: `feat(home): introduce Wayne Citadel through a scroll-driven architectural homepage`.

Suggested description: Replace the root Analysis redirect with the company homepage. A progressively enhanced grayscale doorway/corridor introduces Security, Infrastructure and Software before handing off to grounded company content, an interactive engineering philosophy, a focused WCI introduction, direction and contact. Add Home/WCI shared navigation and accessible mobile menu; correct company branding and footer destinations. Preserve existing product routes and contact/backend logic. Include actual build, responsive, reduced-motion and route-regression results from the final validation record.
