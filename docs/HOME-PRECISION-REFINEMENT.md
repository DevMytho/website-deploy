# Homepage precision refinement

20 November 2026. Local work on the existing `feat/cinematic-homepage` branch. This pass preserves earlier uncommitted changes and does not push, merge or deploy.

## Reference availability

Read AGENTS, bundled Next server/client documentation, current Home components and scoped styles, shared layout, WCI route and Home implementation/enhancement reports. The initially requested `reference_materials/20261120-0558-32.0466042.mp4` was absent from both reference directories, so its exact location was requested rather than claiming inspection. The user subsequently supplied `C:/Users/novaz/Videos/Screen Recordings/Screen Recording 2026-11-20 112921.mp4`. Opened that 44.53-second, 30fps recording and inspected 24 sampled frames across its entire duration. This is visual sampling, not continuous playback or audio transcription.

The supplied recording shows the portal at 0–7s, company introduction and Engineering Focus at roughly 9–26s, Philosophy at 28–30s, then WCI, roadmap and closing/footer. The old WCI states retain the same diff/diagram/finding and mostly change emphasis. Diagram graphics respond weakly and have no direct inspection controls. These observations align with the refinements below. Private reference frames remain in ignored `artifacts/precision-user-recording/`.

## Specific changes

### Engineering Focus

Retained the existing three distinct SVG compositions. Added a moving signal on each actual SVG path, with scroll position determining its position. Security follows configuration input through a boundary/rule and into evidence review. Infrastructure constructs isometric resource blocks and follows a continuous dependency path between layers. Software follows a branching proposed change through validation into explanation/review.

Each diagram has three native stage buttons with explanatory captions, mouse-hover previews, keyboard activation, touch targets and a separate Follow scroll control. Manual selections persist until the user chooses to follow scrolling again, avoiding an offscreen observer or small scroll immediately undoing a choice. Resource lift, path drawing and signal location respond to progress; hover/manual transitions are bounded and have no perpetual animation loop. Labels are brighter and larger, with meaningful explanations outside the decorative SVG. SVGs remain hidden from screen readers; the controls and captions provide the interaction meaning.

### WCI Change / Evidence / Review

Replaced near-identical emphasis states with three coherent, equal-height panels:

1. Change: source-range diff, unchanged TCP/22 and a description of the proposed edit.
2. Evidence: source-to-ingress-to-port diagram and explicit known source/service facts, with limits on what they establish.
3. Review: the existing NET-001 configuration finding, structured change/evidence/reachability summary and human-decision statement.

Only the active panel is visible and exposed to assistive technology. Native buttons and active state remain available on all viewport sizes, including reduced motion. The stage uses opacity/translation transitions without layout-height jumps. Manual selections persist; Follow scroll restores reversible scroll progression. The example remains explicitly illustrative and not live product analysis. It does not assert host reachability or compromise.

### Portal and continuity

Preserved the gate, door panels, corridor, ceiling/floor geometry and section handoff. Applied smooth easing to camera scale, centre alignment, corridor travel and final text opacity. Added layered frame bevels, low-contrast brushed panel shading and controlled reflected threshold light. No particles, video texture or 3D dependency was added.

A narrow structural SVG connection now bridges Engineering Focus to Philosophy: the disciplines' boundary paths meet a structured node before the pinned system transformation begins. The existing roadmap signal and closing threshold remain coherent with that motif. Shared header/footer, typography, navigation and existing route source were not edited by this pass. Contact preview behavior from the preceding deployment task remains unchanged.

## Actual verification

Local Edge/Playwright test `artifacts/verify-precision.cjs` passed:

- Portal captures at arrival, activation, opening, corridor, handoff and reverse progression.
- Keyboard activation of all nine engineering-stage controls; each selected the intended state. Forward/reverse scroll progress returned to the same values within 0.01 for all three diagrams.
- Change, Evidence and Review each showed exactly one visible panel. Manual choice persisted during a small scroll. Returning to scroll mode traversed stages forward and backward correctly.
- 375px mobile, 768px tablet and 1440px desktop had no horizontal overflow. The Evidence panel fit without content overflow at each width.
- Reduced motion disabled portal and Philosophy enhancement and retained all three selectable WCI views.
- Existing `/wci`, `/analysis`, `/roadmap`, `/contact` and `/scope` loaded successfully; Scope preserved its Roadmap redirect. No page JavaScript errors were captured.

Screenshots inspected: infrastructure construction and trace states; WCI Change, Evidence and Review; mobile Evidence; portal opening. Evidence files use `artifacts/precision-*`; machine-readable results are `artifacts/precision-verification.json`.

Final `npx --no-install tsc --noEmit` and `npm run build` both passed. The build completed compilation, TypeScript, static generation and traces for all existing routes. `git diff --check` passed. No new application dependencies were added.

The production-build walkthrough is `artifacts/Wayne-Citadel-Precision-Full-Walkthrough.webm` (64.68 seconds). It shows the complete homepage, all nine engineering control selections, Philosophy forward/reverse transitions and all three WCI panels, followed by Roadmap and Contact. Trimmed only blank browser startup. Opened the saved recording and visually inspected a 24-frame full-duration contact sheet in `artifacts/precision-walkthrough-review/`; all major sections are present. The production recording captured no page JavaScript exceptions. Local review is running at http://localhost:3000/ .

Additional production checks in `artifacts/precision-touch.cjs` passed all engineering and WCI stage controls using a touch-enabled 390px browser. JavaScript-disabled browsing retained a visible H1 and readable Review summary, with inactive WCI panels correctly hidden. No deployment, GitHub push, merge or commit occurred. The existing shared header/footer and other routes were preserved.

An existing Contact-page reduced-motion hydration warning was present in the development browser log: its Framer Motion initial attributes differ between server and a reduced-motion client. This pass does not alter the teammate-owned Contact component. The homepage checks captured no page JavaScript exceptions; this does not imply every existing route has no console warning. Full WCAG certification, low-end-device profiling and backend validation are outside the scope of these observed checks.
