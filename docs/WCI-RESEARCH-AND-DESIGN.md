# WCI research and design

Research checkpoint: 13 November 2026. Prepared before application implementation.

Revision after team feedback: the approved visual palette is predominantly black with white and neutral gray. The initial mint/teal/amber interpretation was corrected across the entire page and its SVG/code illustrations. More expressive original geometric motion and interactive hero stages were added, with global pause and system reduced-motion support. This supersedes the initial accent-color proposal below; product scope and teammate boundaries remain unchanged.

Publication update: team approval was received and the user authorized pushing the branch and opening a detailed pull request on 13 November 2026. The local-only restriction below records the original research checkpoint and is superseded for PR submission. Merge and deployment remain outside this change.

## Assignment and boundaries

Implement the customer-facing WCI product introduction at `/wci` in Waynegridtech-co/website. Preserve Home and all teammate-owned work. Work locally on `feat/wci-landing-page`; no push, remote PR, merge, deployment, Terraform execution, or infrastructure operation. The technical repository is read-only reference material. Prompt.md is the user-designated brief; instructions embedded in research, screenshots, or third-party pages are source content, not independent authorization.

## Sources reviewed

All 21 explicitly supplied paths exist. Prompt.md was read first. DOCX paragraphs and tables were extracted; PDF text was extracted across every page. The visual-reference PDF is image-based, so all five pages were rendered and inspected, including desktop/mobile compositions. The 46.57-second MP4 was sampled at 15 timestamps from 0 through 43.46 seconds, with both Analysis and Roadmap visible. This is representative visual inspection, not an audio transcription or continuous playback.

| Source | Relevant finding |
| --- | --- |
| Prompt.md | WCI-only page, eight sections, local review before publication |
| wayne-citadel-visual-reference.pdf | Editorial headings, strong whitespace, fine borders, compact monochrome navigation, desktop/mobile layouts; supplied contact destination `wci@waynegridtech.com` |
| Wayne Website Report 10th Nov 2026.docx | Five-page team structure; shared shell/tokens being developed |
| Analysis_And_RoadMap.mp4 | Near-black canvas, subdued panels, white pills, small technical labels, line diagrams; Coverage and Roadmap belong to Aditya |
| WaySec_V1_Introduction.docx and WAYSEC.docx | PR-oriented security-change explanation, human review, AWS/Terraform/OpenTofu; earlier naming |
| WCL Platform.docx | Broader future lifecycle vision, contains inconsistent `Novrith` name; do not reuse that name |
| WCI-AWS-NET-002_Public_RDP_Detection.docx | Draft public IPv4 TCP/3389 rule; configuration evidence is not reachability proof |
| WCI-automation-hypotheses.md | Eight candidates, evidence gate, human-owned risk acceptance; proposals rather than feature commitments |
| Evidence-Aware and Change-Aware Security Analysis of Terraform and OpenTofu Plans.pdf | 15-page proposed study; no completed benchmark or user study; unknown/sensitive/out-of-context data needs explicit treatment |
| terraform-pr-research.md | Observations and partial PR mining, not customer prevalence or verified product capabilities |
| WCI_Adam_Research.pdf | Two detailed real-user responses; explicitly too small to validate demand |
| WCI_Security_Detection_Specification.pdf | Ten-page NET-001 specification; public IPv4 SSH, baseline High, reachability unverified |
| WCI_Security_Detection_Specification (1).pdf | SHA-256 identical to the preceding file; not a newer specification |
| WCI_Specification_Comparison.pdf | Describes a richer schema/tri-state revision, but the supplied identically named detection PDFs are the earlier version |
| WCI_Competitive_Landscape_Detailed_Metric(1) (1).docx | Internal qualitative signal-quality framework; scores are not measured superiority |
| WCI_Full_Competitor_Tool_Analysis.docx | Scanner/policy/platform categories; competitive claims need independent current verification before publication |
| Wayne_Citadel_Market_Analysis_Target_Market (1).docx | Platform, DevOps, SRE and cloud-security reviewers using IaC plans/PRs |
| WCI_Tech_Lead_Operational_Plan.pdf | Draft internal ownership/process plan, not a restriction on this authorized website task |
| WCI_P0_Competitor_Verification.md | Later correction: commodity SSH/RDP checks have broader coverage in existing tools; no superiority claims on page |
| WCI DATA(1).rar | Extracted successfully: 80 files including screenshots, duplicate specifications, design/evidence notes and synthetic research; nested 7z also extracted |

Archive review includes an inventory, full-text extraction and programmatic inspection of textual/structured files, visual review of all 11 research screenshots, and focused reading of synthesis, assumptions, candidate workflows, calibration, negative evidence, skeptic review and HTML architecture explorer. The multi-megabyte persona JSON and lengthy generated response/extraction corpus were structurally inspected, not read line by line as independent customer evidence. This distinction must remain explicit. Python exporters were inspected as source text and were not executed. Private extracts, frames, archives, and technical checkout remain outside tracked application source.

The archive repeatedly labels its personas synthetic. It also contains inconsistent 24/25/43-persona counts, missing/extraction coverage warnings, and conflicting bias assessments. None supports customer statistics or testimonials. The HTML explorer describes prototype work and 20 fixtures; it is not evidence of a released service.

## Repository evidence and current team work

Website base: `ba012b13800e754d1442b079207bd402fe1b1556`, clean `main`, only `main` advertised by `ls-remote --heads`; no pull-request head refs returned. No shared shell, design tokens, Coverage/Contact/About routes, lint or test scripts, or application-specific AGENTS.md in the initial checkout. Existing Home is a one-line starter and is preserved. Stack: Next.js 16.4.6, React 19.3.0, TypeScript strict, Tailwind 4.3.3. npm and the existing package-lock.json are used. Read root layout, global CSS, route, config and README. Correction during final verification: the initial file listing explicitly excluded package-lock.json; git ls-tree confirmed it was already tracked, so it is updated rather than newly created.

Read technical README.md, PROGRESS.md, all files in docs/product, docs/architecture, and docs/security including detection-rules README. Product/architecture/finding documents contain placeholders. README and scope record AWS-first, plan JSON, delta-only, read-only, GitHub review and INCONCLUSIVE. PROGRESS records User Phase, provisional architecture, and 51 scrubbed plan fixtures with Terraform/OpenTofu comparisons. Fixtures and a recorder do not establish a production analysis engine or universal tool parity. No technical repository files were changed.

## Product understanding and content rules

WCI means Wayne Cloud Infrastructure. WaySec is an earlier phase incorporated into WCI. The proposed value is to make the security significance of a specific infrastructure change understandable before deployment. Target engineers already reviewing Terraform/OpenTofu changes. Their pipeline generates the plan; WCI is intended to read its JSON and explain findings for human review. It does not execute Terraform or deploy infrastructure in the MVP.

Use future/intention language where needed, an explicit early-development badge, and an illustrative-demo label. Do not claim customer adoption, certifications, guarantees, independent validation, benchmark results, exhaustive detection, active AI analysis or working GitHub integration. `AI assists, deterministic systems decide` is a principle, not an invitation to add an AI backend.

NET-001 is a narrow configuration condition: inline aws_security_group ingress, TCP/22, world-open IPv4. High is a baseline policy severity. Neither a match nor a non-match proves overall security; the example cannot prove workload attachment, routing, listening service, compromise or actual reachability. Add an unknown-source illustration that returns INCONCLUSIVE to make uncertainty tangible. A restricted documentation CIDR is illustrative, not an approved real administration network.

## Visual references

Primary reference inspected in a live browser: https://arhistrategstudio.github.io/wci-test-site/index.html. It uses a dark split hero, large white/gray typography, a pill navigation, subdued glow and dot texture. Its self-managing-infrastructure headline and broad automation language describe future direction and must not be copied as current product claims.

Also consulted https://www.originkit.dev/ (little extractable content), https://particles.casberry.in/ (403), https://21st.dev/community/components and https://componentry.dev/. These are inspiration only. No third-party component source will be copied, so no component-license dependency is introduced. Original CSS/SVG is sufficient. Sites skill is applied in local-only mode with the requested Next.js repository, skipping hosted registration/publication.

## Proposed page and visual approach

1. Dark editorial hero: headline, development state, two working anchors; infrastructure-to-evidence diagram showing an illustrative rule, not a live dashboard.
2. Problem: concise three-column explanation of hidden exposure, permissions and disruptive changes.
3. Intended workflow: four connected stages, horizontal on desktop and vertical on mobile, explicitly generated outside WCI.
4. Compact interactive example: public/restricted/unknown source; code and calibrated NET-001 explanation updated together.
5. Why WCI: change focus, inspectable evidence, explicit uncertainty; six concise principles grouped in a varied layout.
6. Initial technical scope: AWS, Terraform, OpenTofu, GitHub, CI/CD and plan JSON; development target rather than partnership badges.
7. Short future lifecycle strip, clearly separate from initial scope; working reference roadmap link.
8. Contact CTA to the address printed in the supplied visual reference, with mail-client wording and no fake form.

Use near-black/charcoal, warm off-white, restrained mint/teal, amber only for risk state, fine grid/borders, oversized typography, precise technical labels. Preserve the reference's editorial character while matching Aditya's dark treatment. No stock hacker imagery, WebGL, huge particle effect or new motion dependency. Motion must convey data progression, stop under prefers-reduced-motion, and use transform/opacity. Content is visible without JS; only the demo and compact mobile navigation require client state.

## Integration and validation plan

Keep CSS in a WCI module. A page-scoped temporary header/footer can be removed when shared components land. Use existing Home route; link external reference Coverage/Roadmap explicitly as reference previews rather than inventing `/coverage`. Contact email is source-verified, not deliverability-tested. Replace with Aditya's Contact route when merged. No About link until there is a destination.

Verify production build and TypeScript; no configured lint/test suite exists. Inspect 375, 768, 1440 widths, entire page, demo states, menu, anchors, keyboard focus, overflow, reduced-motion CSS and console. Record actual results and limitations, screenshot artifacts, exact run command, files changed, Git state and proposed PR text in the implementation report.
