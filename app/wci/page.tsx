import type { Metadata } from "next";
import { ScrollStory } from "@/components/wci/ScrollStory";
import { Navigation } from "@/components/wci/Navigation";
import { PageExperience } from "@/components/wci/PageExperience";
import { EvidenceOrbit } from "@/components/wci/EvidenceOrbit";
import {
  RibbonGlow,
  TerrainWordmark,
  WireGlobe,
} from "@/components/wci/Atmosphere";
import { InfrastructureDiagram } from "@/components/wci/InfrastructureDiagram";
import { SecurityPreview } from "@/components/wci/SecurityPreview";
import { Arrow, Glyph, Mark } from "@/components/wci/Icons";
import s from "@/components/wci/wci.module.css";

export const metadata: Metadata = {
  title: "WCI — Infrastructure changes, understood | Wayne Citadel",
  description:
    "Meet Wayne Cloud Infrastructure: an early-stage approach to evidence-backed, read-only security analysis of Terraform and OpenTofu plan changes. AWS first. Human review always.",
};

export default function WciPage() {
  return (
    <PageExperience>
      <a className={s.skip} href="#main-content">
        Skip to content
      </a>
      <Navigation />
      <main id="main-content">
        <section
          className={`${s.hero} ${s.container}`}
          aria-labelledby="hero-title"
        >
          <div className={s.heroCopy}>
            <div className={s.eyebrow}>
              <span className={s.smallDot} /> WAYNE CLOUD INFRASTRUCTURE
            </div>
            <h1 id="hero-title">
              <span className={s.heroLine}>See the change.</span>
              <span className={s.heroLine}>Understand</span>
              <span className={`${s.heroLine} ${s.heroSilver}`}>the risk.</span>
            </h1>
            <p className={s.heroLead}>
              Infrastructure risk deserves a clearer review.
            </p>
            <p className={s.heroDescription}>
              WCI is being built to explain the security impact of Terraform and
              OpenTofu changes—before they reach production.
            </p>
            <div className={s.actions}>
              <a className={s.primary} href="#security-preview">
                Explore an example <Arrow />
              </a>
              <a className={s.secondary} href="#workflow">
                Follow the story <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className={s.development}>
              <span /> EARLY DEVELOPMENT <i /> AWS FIRST. READ-ONLY ANALYSIS.
            </p>
          </div>
          <InfrastructureDiagram />
          <div className={s.heroBottom}>
            <span>BUILT AROUND YOUR INFRASTRUCTURE WORKFLOW</span>
            <div>
              <span>Terraform</span>
              <span>OpenTofu</span>
              <span>AWS</span>
              <span>GitHub</span>
            </div>
            <a
              href="#problem"
              aria-label="Discover the infrastructure review problem"
            >
              SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section
          id="problem"
          className={`${s.section} ${s.container}`}
          aria-labelledby="problem-title"
        >
          <div className={s.sectionHead}>
            <div>
              <p className={s.eyebrow}>01 / THE REVIEW GAP</p>
              <h2 id="problem-title">
                A routine update.
                <br />
                <span>An overlooked consequence.</span>
              </h2>
            </div>
            <p>
              A code diff shows what was edited. Understanding what that change
              could mean for your infrastructure takes a different kind of
              attention.
            </p>
          </div>
          <div className={s.problemGrid}>
            {[
              {
                n: "01",
                icon: "shield" as const,
                title: "A wider door to the internet",
                text: "A small source-range change can permit public access to an administrative port.",
              },
              {
                n: "02",
                icon: "change" as const,
                title: "More permission than intended",
                text: "An ordinary policy update can expand what an identity is allowed to access.",
              },
              {
                n: "03",
                icon: "layers" as const,
                title: "The critical detail in a long plan",
                text: "Replacements and changes to stateful resources can disappear inside pages of routine updates.",
              },
            ].map((item) => (
              <article key={item.n}>
                <div className={s.problemIcon}>
                  <Glyph kind={item.icon} />
                  <span>{item.n}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <p className={s.sectionNote}>
            The goal: help reviewers focus on meaningful changes, with evidence
            they can inspect.
          </p>
        </section>

        <ScrollStory />

        <section
          id="security-preview"
          className={`${s.section} ${s.container}`}
          aria-labelledby="preview-title"
        >
          <div className={s.sectionHead}>
            <div>
              <p className={s.eyebrow}>03 / FOLLOW THE EVIDENCE</p>
              <h2 id="preview-title">
                Less guesswork.
                <br />
                <span>More context.</span>
              </h2>
            </div>
            <p>
              See how a single source range changes the conclusion. A
              configuration fact is useful. Knowing exactly what it proves is
              better.
            </p>
          </div>
          <SecurityPreview />
        </section>

        <section
          className={`${s.principles} ${s.container}`}
          aria-labelledby="principles-title"
        >
          <div className={s.principlesIntro}>
            <p className={s.eyebrow}>04 / THE WCI APPROACH</p>
            <h2 id="principles-title">
              Clarity is
              <br />
              the principle.
            </h2>
            <p>
              Built around the questions a reviewer needs answered: what
              changed, why it matters, and what the evidence can actually
              support.
            </p>
            <div className={s.principleSeal}>
              <Mark />
              <span>
                AI assists.
                <br />
                <strong>Deterministic systems decide.</strong>
              </span>
            </div>
            <EvidenceOrbit />
          </div>
          <div className={s.principleGrid}>
            {[
              [
                "01",
                "Change comes first",
                "Focus on the proposed infrastructure delta, so the change under review stays in view.",
              ],
              [
                "02",
                "Evidence stays attached",
                "Connect findings to concrete resource attributes, rather than an unsupported risk narrative.",
              ],
              [
                "03",
                "Risk gets an explanation",
                "Make the security significance of a change understandable to the engineer reviewing it.",
              ],
              [
                "04",
                "Unknowns stay visible",
                "Use INCONCLUSIVE when the plan does not provide enough evidence. Missing context is not a pass.",
              ],
              [
                "05",
                "The workflow stays yours",
                "Bring the intended analysis into GitHub review, with the final decision in human hands.",
              ],
              [
                "06",
                "Critical decisions stay deterministic",
                "Keep security predicates and severity grounded in explicit rules. AI may assist with explanation.",
              ],
            ].map(([n, title, text]) => (
              <article key={n}>
                <span className={s.mono}>{n} /</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="scope"
          className={`${s.section} ${s.container}`}
          aria-labelledby="scope-title"
        >
          <div className={s.sectionHead}>
            <div>
              <p className={s.eyebrow}>05 / A DELIBERATE STARTING POINT</p>
              <h2 id="scope-title">
                Focused scope.
                <br />
                <span>A stronger foundation.</span>
              </h2>
            </div>
            <p>
              WCI is in early development. These are the intended MVP
              boundaries, not a list of released integrations.
            </p>
          </div>
          <div className={s.scopeBody}>
            <WireGlobe />
            <div className={s.scopeGrid}>
              {[
                ["01", "AWS", "Initial cloud provider"],
                ["02", "Terraform + OpenTofu", "Infrastructure change plans"],
                ["03", "Plan JSON", "Read-only analysis input"],
                ["04", "GitHub", "Intended review destination"],
                ["05", "CI/CD + manual input", "Planned submission paths"],
                [
                  "06",
                  "Evidence + uncertainty",
                  "Findings and explicit limits",
                ],
              ].map(([n, title, text]) => (
                <div key={n}>
                  <span className={s.mono}>{n}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={s.scopeFoot}>
            <span className={s.outlineTag}>INITIAL DETECTION FOCUS</span>
            <p>
              Public IPv4 SSH configuration in inline AWS security-group
              ingress. Broader resource, IPv6 and reachability coverage must be
              established separately.
            </p>
          </div>
        </section>

        <TerrainWordmark />
        <section
          id="direction"
          className={s.directionSection}
          aria-labelledby="direction-title"
        >
          <div className={s.container}>
            <div className={s.sectionHead}>
              <div>
                <p className={s.eyebrow}>06 / THE LONGER VIEW</p>
                <h2 id="direction-title">
                  Start with understanding.
                  <br />
                  <span>Build from there.</span>
                </h2>
              </div>
              <p>
                A broader infrastructure lifecycle is the direction. The initial
                work stays focused on security analysis before deployment.
              </p>
            </div>
            <ol className={s.lifecycle}>
              {[
                "Configure",
                "Secure",
                "Validate",
                "Automate",
                "Deploy",
                "Monitor",
              ].map((name, i) => (
                <li key={name} className={i === 1 ? s.lifecycleFocus : ""}>
                  <span>0{i + 1}</span>
                  <strong>{name}</strong>
                  <small>
                    {i === 1 ? "INITIAL ANALYSIS FOCUS" : "LONG-TERM VISION"}
                  </small>
                </li>
              ))}
            </ol>
            <div className={s.directionFoot}>
              <p>
                Deployment automation and monitoring belong after the first
                release.
              </p>
              <a
                className={s.textLink}
                href="https://arhistrategstudio.github.io/wci-test-site/roadmap.html"
              >
                Explore the roadmap reference <Arrow diagonal />
              </a>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className={`${s.contact} ${s.container}`}
          aria-labelledby="contact-title"
        >
          <RibbonGlow />
          <div>
            <p className={s.eyebrow}>
              LET’S BUILD WITH REAL ENGINEERING CONTEXT
            </p>
            <h2 id="contact-title">
              What gets missed
              <br />
              in your plan reviews?
            </h2>
            <p>
              Tell us about your workflow. We welcome technical feedback,
              testing interest and conversations with teams working on
              infrastructure security.
            </p>
          </div>
          <div className={s.contactAction}>
            <a className={s.primary} href="mailto:wci@waynegridtech.com">
              Talk to the WCI team <Arrow diagonal />
            </a>
            <a href="mailto:wci@waynegridtech.com" className={s.email}>
              wci@waynegridtech.com
            </a>
            <span>Opens your email app</span>
          </div>
        </section>
      </main>
      <footer className={s.footer}>
        <div className={s.container}>
          <div className={s.footerTop}>
            <div>
              <a href="/" className={s.brand}>
                <Mark />
                <span>WAYNE CITADEL</span>
              </a>
              <p>
                Careful engineering.
                <br />
                Clearer infrastructure decisions.
              </p>
            </div>
            <div>
              <span className={s.eyebrow}>EXPLORE WCI</span>
              <a href="#workflow">How it works</a>
              <a href="#security-preview">Analysis example</a>
              <a href="#scope">Initial scope</a>
            </div>
            <div>
              <span className={s.eyebrow}>GO DEEPER</span>
              <a href="https://arhistrategstudio.github.io/wci-test-site/coverage.html">
                Coverage reference <Arrow diagonal />
              </a>
              <a href="https://arhistrategstudio.github.io/wci-test-site/roadmap.html">
                Roadmap reference <Arrow diagonal />
              </a>
              <a href="mailto:wci@waynegridtech.com">
                Contact the team <Arrow diagonal />
              </a>
            </div>
          </div>
          <div className={s.footerBottom}>
            <span>© 2026 Wayne Citadel</span>
            <span>
              <span className={s.smallDot} /> WCI is in early development.
            </span>
            <a href="#wci">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </PageExperience>
  );
}
