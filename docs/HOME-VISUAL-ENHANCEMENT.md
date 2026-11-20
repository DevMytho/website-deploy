# Homepage visual enhancement pass

19 November 2026. Local continuation on `feat/cinematic-homepage`; preserve all previous uncommitted work. No push, merge or deployment.

## References and baseline

Read AGENTS, bundled Next server/client documentation, the current Home and shared layout, WCI entrypoint and prior Home research/implementation reports. Reviewed the original 53.53-second doorway recording through its existing 24-frame contact sheet, and inspected the live local hero, open door and corridor separately in Edge before changing them.

The initially named `20261119-0809-30.7109481.mp4` was not found in the project or usual user media/reference directories. The user then supplied `Screen Recording 2026-11-19 134010.mp4`, used as the current-state reference. Opened that 17.03-second, 30fps recording and sampled 24 points throughout it. It starts at Engineering Focus, moves backward briefly, then shows Philosophy, WCI, Roadmap, Contact and Footer. It does not show the portal. Source recordings and frames remain private, ignored local artifacts; no continuous-playback or audio-transcription claim is made.

The baseline has sound monochrome structure, but its diagrams are mostly static, Philosophy is a button-only panel that leaves the viewport, and WCI is a static illustration. The live portal uses an off-centre dolly into a broad white fill. These are the targets of the pass; preserve content, shared navigation and existing routes.

## Changes

- Portal: eased door separation, stronger panel perspective, a camera move from the right-hand arrival composition toward the central opening, a smaller architectural inner threshold instead of a full white fill, and controlled floor light. Keeps the original gate, corridor, hero CTAs, pinning and fallback.
- Engineering Focus: three original scroll-drawn SVG schematics. Security shows an explicit trust boundary and evidence check; Infrastructure separates resources from their dependency plane; Software connects branching changes through validation and explanation to human review. No random particles or generic rotating objects.
- Philosophy: a 300svh desktop sequence with one sticky visual stage below the shared header. Twelve nodes and seventeen paths interpolate continuously from scattered dependencies, to deliberate structure, to a validated feedback loop. Discrete phase labels follow the same continuous progress. Buttons provide chapter navigation, and a skip-to-WCI link and pause control remain available. Mobile, short viewports, reduced motion and no-JavaScript browsing show readable phase descriptions and a static stage without pinning.
- WCI: scroll-linked trace from illustrative source/port facts through rule evidence to the existing NET-001 configuration finding. Native Change/Evidence/Review buttons offer direct inspection. Evidence and finding text remain legible during movement. No backend is connected, no live analysis is claimed and reachability stays explicitly unverified.
- Continuity: connected circuit paths introduce the compact roadmap. The closing scene echoes the opening portal with nested silver threshold frames and convergence lines, while keeping the existing contact CTA and shared footer.

## Engineering and accessibility

`useScrollScene` centralizes passive scroll listeners, one scheduled frame per event batch, viewport-relative or pinned progress and IntersectionObserver suspension. It writes geometry/CSS variables directly and changes React phase state only at phase boundaries. No perpetual animation loop, wheel interception, new motion system, runtime library or remote asset was added. Existing Home native scroll and other routes' Lenis behavior are retained.

All meaningful copy is present on the server. Decorative schematics are aria-hidden or described; native controls have pressed states and visible focus via the existing Home styles. System reduced motion disables pinning and camera/geometry motion, with all Philosophy descriptions visible. No teammate route or shared navigation/footer code is changed by this enhancement pass. The pre-existing duplicate shell on `/wci` is retained.

## Validation

Browser verification passed in headless Edge/Playwright on the enhancement dev preview. Actual results are recorded in ignored `artifacts/enhancement-verification.json`:

- Five sampled Philosophy progress points, including both in-between morphs, retained exactly the same visual-stage bounds (x=711.4, y=274.2, width=598.6, height=524.7 at 1440x1000). The pinned container stayed at y=64 throughout; node coordinates changed continuously rather than jumping between three replacements.
- Reverse scroll, fast direction changes, refresh midway, chapter-button navigation, pin release into WCI and pause/resume passed.
- Change/Evidence/Review controls passed. All displayed source/port facts and the NET-001 limitation remain illustrative.
- 320, 375, 390, 768, 1024, 1440 and 1920px layouts had no horizontal overflow. Mobile navigation and Escape passed.
- Reduced motion and short-viewport fallbacks removed enhancement; all three Philosophy descriptions were visible. No-JavaScript browsing retained the H1, phase descriptions and WCI link.
- `/wci`, `/analysis`, `/roadmap`, `/contact` and `/scope` loaded successfully. Scope still finishes at Roadmap. WCI retains the baseline two headers/two footers; the other pages have one of each. No page JavaScript errors were captured. No contact data was submitted.

Visual QA inspected the live baseline hero and corridor independently, then enhanced door/corridor, all three engineering graphics, all three Philosophy phases and both transitions, the WCI evidence view and closing CTA. Actual phase screenshots use the prefix `artifacts/enhanced-`; complete responsive captures include `enhanced-375-full.png`, `enhanced-768-full.png` and `enhanced-1440-full.png`.

QA found and corrected a reload-restoration shift caused by client-only scene heights. Capable desktop layouts now reserve scene space before hydration; a server-rendered noscript override preserves compact static browsing. Reduced-motion CSS also makes every Philosophy description visible immediately, independently of React's preference-event timing. The opening seam fades before the panels fully separate, and the final feedback-loop line was moved clear of the diagram's labels.

Final `npx --no-install tsc --noEmit` and `npm run build` both passed. The production build completed compilation, TypeScript, static generation and trace collection for all existing routes. `git diff --check` passed. The incoming Contact API still requires a build-only placeholder MONGODB_URI; no database connection or contact submission was performed.

The complete walkthrough was recorded from the successful production build. The review copy is `artifacts/Wayne-Citadel-Complete-Enhanced-Walkthrough-Review.webm`, with the blank browser-startup lead-in trimmed from the raw capture. Sampling the saved recording across its duration confirmed hero/gate, corridor, all engineering graphics, the full Philosophy transformation, WCI, roadmap and closing CTA. The production browser run captured no page JavaScript or console errors. Local preview: http://localhost:3000/ . Source remains uncommitted on `feat/cinematic-homepage`; no push, merge or deployment was performed.

Changed for this pass: Home composition, portal, scoped Home CSS; added `useScrollScene.ts`, `FocusVisualization.tsx`, `PhilosophyExperience.tsx`, `WCIChangeSequence.tsx`, `DirectionSignal.tsx`, `ThresholdEcho.tsx` and `enhancement.module.css`. Shared navbar/footer, existing product route source and dependencies were preserved. No low-end-device profiling, full WCAG audit or production database test is claimed.
