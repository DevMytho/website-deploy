# Wayne Citadel homepage — research checkpoint

19 November 2026. Written before application implementation. Local review only; no push, PR or deployment authorized for this work.

## Baseline and sources

Started from clean `origin/main` 6f46b58, containing merged PRs #1 (shared editorial site) and #2 (WCI introduction). Dedicated branch: `feat/cinematic-homepage`. Actual dependencies: Next 16.4.6, React 19.3, TypeScript 5, Tailwind 4.3.3, Framer Motion/Motion 14.12, Lenis 1.3.27. Read AGENTS and bundled Next guides on layouts/pages, server/client composition, CSS and metadata.

Inspected all route entrypoints, shared layout/header/footer/smooth-scroll, WCI story/motion/atmosphere source, existing reports and research checkpoint, extracted WCL product direction, and approved WCI captures. `/` redirects to `/analysis`; `/scope` redirects to `/roadmap`. Analysis, Roadmap and Contact are implemented. No About route exists. PR #1 and #2 descriptions confirm ownership and product boundaries. Technical repository remains reference-only; no changes there.

The deployed WCI URL returns HTTP 200 but displays Vercel Login in real headless Edge, so its page could not be visually reviewed publicly. The original Dusan reference site loads successfully. Use local WCI source and screenshots as the primary design source. Previous research documents inventory the supplied PDF/DOCX and technical documentation; those conclusions are retained rather than claiming a new exhaustive source review.

## Reference recording actually reviewed

Opened the supplied 58.8MB MP4 with OpenCV. Duration 53.53s, 30fps. Sampled 24 evenly spaced frames over the entire recording (0–51.3s) and inspected the contact sheet; this is visual sampling, not continuous playback or audio transcription. Private frames remain in ignored `artifacts/home-reference/`.

0–9s: large left-aligned typography, a narrow architectural door on the right, burgundy surfaces, pauses and an unrelated browser switch. Around 11s the bright doorway expands toward the viewer; by 13–18s it has transitioned through dark/light states into an editorial feature. Around 20–22s a deep reflective hallway has repeated ceiling lights and side-room openings, with labels and a clear white vanishing point. At 24–29s the bright opening hands off into pale editorial content and an arched image. Later sections show galleries, an abstract geographic network, team and contact content. The architectural framing and lighting continuity are the transferable ideas. Do not copy branding, footage, burgundy palette, photography or unrelated content. Actual scroll synchronization cannot be proven from sampled frames alone.

## Design and implementation decision

Reuse global grayscale tokens (--bg, --stage, --card, --line, --text, --muted), Inter, JetBrains Mono and restrained Playfair italics, existing pill buttons and shared shell. Original CSS 3D door panels plus SVG perspective ribs, corridor lights, floor grid/reflection and side bays provide depth without a 3D dependency. A single passive scroll handler schedules one animation-frame update per event and writes scene variables directly, avoiding React renders per scroll. No timer-driven camera sequence. Native scrolling on Home (existing Lenis retained on other routes) prevents competing interpolation. Desktop enhancement only above 960px and 650px height with reduced motion off; fallback is unpinned, static, compact and readable without JS.

Storyboard: arrival (0–18%), seam activation (18–34%), panels separate/camera advances (34–55%), corridor and Security/Infrastructure/Software labels (55–88%), environment dissolves into introduction (88–100%). A 3.8-viewport sequence with a viewport stage keeps travel deliberate; section remains readable and reversible. Skip-experience link leads directly to the introduction. Pause switches to the static readable fallback.

After hero: company introduction; three asymmetric engineering discipline rows; a compact selectable complexity-to-clarity diagram; WCI showcase with explicit early-development qualification; engineering-in-practice principles; brief future direction strip; contact CTA linking to existing `/contact`; shared footer.

## Integration risks and planned changes

Shared header currently brands itself WCI, links its logo to Analysis and hides navigation on phones. Add Home/WCI links, a keyboard/Escape mobile menu, brand destination `/`, and scope header CSS in a new module. Shared footer contains reference-site and GitHub placeholders; replace them with actual website/product-repository destinations and company branding. WCI already nests its own header/footer within the shared shell: record this pre-existing duplication; do not redesign that route under homepage scope. `/scope` redirect and inherited duplicate `content` IDs on Analysis/Roadmap are also existing behavior.

Add `components/home/*`, scoped home CSS, research/report docs and replace `app/page.tsx`. Modify shared header/footer and only the Home branch of SmoothScroll. Preserve Contact/database, WCI route, Analysis and Roadmap content. No new application dependency, remote asset or video payload.

## Validation plan

Run npm ci, production build (incoming contact API requires a build-only MONGODB_URI placeholder), TypeScript, diff checks. Browser-test 320/375/390/768/1024/1440/1920 widths, all hero phases, reverse/fast scroll, reload midway, skip and pin release, short viewport, reduced motion, no JS, mobile menu and all existing routes. Capture real screenshots and local hero recording when supported. No Contact submission. Report actual results and distinguish pre-existing issues from changes. Build, responsiveness and browser checks cannot alone establish complete WCAG conformance or performance budgets on real low-end hardware.
