"use client";

import { useEffect, useRef, useState } from "react";
import { RibbonGlow, TerrainWordmark, WireGlobe } from "./Atmosphere";
import { usePageMotion } from "./PageExperience";
import { Arrow } from "./Icons";
import s from "./story.module.css";

const chapters = [
  {
    name: "The change",
    title: "One small edit.\nA different security question.",
    copy: "A pull request changes an SSH source from a specific range to the whole IPv4 internet. The edit is small. Its security significance deserves attention.",
    fact: "ILLUSTRATIVE CHANGE / TCP 22",
    note: "Begin with the change your team is actually reviewing.",
  },
  {
    name: "The plan",
    title: "Give the change\na structure.",
    copy: "Your Terraform or OpenTofu workflow produces plan JSON. WCI is intended to normalize supported values into explicit facts: the resource, its proposed action, and the attributes a rule depends on.",
    fact: "YOUR TOOLING GENERATES THE PLAN",
    note: "Read-only analysis. WCI does not run Terraform or apply infrastructure.",
  },
  {
    name: "The evidence",
    title: "Connect the facts.\nKeep the claim precise.",
    copy: "A known world-open IPv4 source and TCP port 22 support a public-SSH configuration finding. The evidence explains the conclusion; it does not establish a reachable host or a compromise.",
    fact: "WCI-AWS-NET-001 / BASELINE HIGH",
    note: "The illustrated configuration permits public IPv4 SSH. Host reachability remains unverified.",
  },
  {
    name: "The unknowns",
    title: "When the plan is incomplete,\nthe answer should say so.",
    copy: "Now consider a different plan, where the source CIDR is unknown until apply. The example can no longer establish whether that source is world-open. Missing evidence stays visible.",
    fact: "ALTERNATE INPUT / SOURCE UNKNOWN",
    note: "INCONCLUSIVE is a meaningful outcome. It is never an overall security pass.",
  },
  {
    name: "Your review",
    title: "A clearer decision.\nStill yours to make.",
    copy: "The intended result brings the change, its evidence and its limitations back into the review. Your team decides what to do next. The original known-source example is shown here again.",
    fact: "ILLUSTRATIVE REVIEW / HUMAN DECISION",
    note: "This is a product walkthrough, not output from a released WCI service.",
  },
];

function StoryVisual({ step, prefix }: { step: number; prefix: string }) {
  if (step === 0)
    return (
      <div className={s.changeVisual}>
        <div className={s.codeBadge}>PULL REQUEST / PROPOSED CHANGE</div>
        <div className={s.diffSheet}>
          <div className={s.sheetTop}>
            <span>security-group.tf</span>
            <span>±</span>
          </div>
          <pre>
            <code>
              {
                'ingress {\n  from_port = 22\n  to_port   = 22\n  protocol  = "tcp"\n'
              }
            </code>
          </pre>
          <div className={s.removedLine}>
            <span>−</span>
            <code>203.0.113.0/24</code>
            <small>BEFORE</small>
          </div>
          <div className={s.addedLine}>
            <span>+</span>
            <code>0.0.0.0/0</code>
            <small>PROPOSED</small>
          </div>
          <pre>
            <code>{"}"}</code>
          </pre>
        </div>
        <div className={s.sourceTag}>
          A wider source. The same administrative port.
        </div>
      </div>
    );
  if (step === 1)
    return (
      <div className={s.normalizeVisual}>
        <div className={s.normalizeInput}>
          <span>PLAN JSON</span>
          <code>{"{ resource_changes: […] }"}</code>
        </div>
        <svg className={s.normalizeLines} viewBox="0 0 500 170" fill="none">
          <path
            d="M250 0v40M250 40H65v110m185-110v110m0-110h185v110"
            stroke="#555"
          />
          <path
            className={s.tracedPath}
            d="M250 0v40M250 40H65v110m185-110v110m0-110h185v110"
            stroke="#eee"
            pathLength="1"
          />
        </svg>
        <div className={s.factNodes}>
          {[
            ["RESOURCE", "aws_security_group"],
            ["ACTION", "update"],
            ["EVIDENCE", "TCP · 22 · IPv4"],
          ].map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <code>{value}</code>
            </div>
          ))}
        </div>
        <div className={s.normalizedStamp}>
          <span>01</span>
          <p>
            Structured facts.
            <br />
            <strong>Deterministic evaluation.</strong>
          </p>
        </div>
      </div>
    );
  if (step === 2)
    return (
      <div className={s.evidenceVisual}>
        <WireGlobe className={s.storyGlobe} />
        <div className={s.evidenceOverlay}>
          <span>CONFIGURATION EVIDENCE</span>
          <div>
            <code>0.0.0.0/0</code>
            <i>+</i>
            <code>TCP / 22</code>
          </div>
          <p>Public IPv4 SSH permitted by this rule.</p>
          <small>REACHABILITY / UNVERIFIED</small>
        </div>
      </div>
    );
  if (step === 3)
    return (
      <div className={s.unknownVisual}>
        <TerrainWordmark
          word="UNKNOWN"
          idPrefix={prefix}
          className={s.storyTerrain}
        />
        <div className={s.unknownCard}>
          <span>EVIDENCE BOUNDARY</span>
          <code>source_cidr: known after apply</code>
          <strong>INCONCLUSIVE</strong>
          <p>
            Resolve the missing evidence.
            <br />
            Do not turn an unknown into a pass.
          </p>
        </div>
      </div>
    );
  return (
    <div className={s.reviewVisual}>
      <RibbonGlow idPrefix={prefix} />
      <div className={s.reviewCard}>
        <div className={s.sheetTop}>
          <span>WCI / ILLUSTRATIVE PR REVIEW</span>
          <span>↗</span>
        </div>
        <span className={s.reviewStatus}>CONFIGURATION FINDING</span>
        <h4>
          Public IPv4 SSH
          <br />
          permitted by a rule.
        </h4>
        <dl>
          <div>
            <dt>Resource</dt>
            <dd>aws_security_group.example</dd>
          </div>
          <div>
            <dt>Change</dt>
            <dd>Restricted → world-open source</dd>
          </div>
          <div>
            <dt>Reachability</dt>
            <dd>Unverified</dd>
          </div>
        </dl>
        <div className={s.humanDecision}>
          Your team reviews. Your team decides.
        </div>
      </div>
    </div>
  );
}

/** Progressive enhancement: native document scrolling, never wheel interception. */
export function ScrollStory() {
  const root = useRef<HTMLElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const activeRef = useRef(0);
  const runningRef = useRef(false);
  const running = usePageMotion();
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);
  runningRef.current = running;

  useEffect(() => {
    const desktop = matchMedia("(min-width: 960px) and (min-height: 650px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnhanced(desktop.matches && !reduced.matches);
    update();
    desktop.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enhanced) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      if (!root.current || !body.current) return;
      const bounds = body.current.getBoundingClientRect();
      // Do not update an offscreen scene. No idle requestAnimationFrame loop.
      if (bounds.bottom < 0 || bounds.top > innerHeight) return;
      const centers = chapterRefs.current.map((el) => {
        const rect = el!.getBoundingClientRect();
        return rect.top + rect.height / 2;
      });
      const middle = innerHeight / 2;
      const closest = centers.reduce(
        (best, center, index) =>
          Math.abs(center - middle) < Math.abs(centers[best] - middle)
            ? index
            : best,
        0,
      );
      if (closest !== activeRef.current) {
        activeRef.current = closest;
        setActive(closest);
      }
      const progress = Math.max(
        0,
        Math.min(1, (middle - centers[0]) / (centers[4] - centers[0])),
      );
      root.current.style.setProperty("--story-progress", String(progress));
      if (runningRef.current) {
        const height =
          chapterRefs.current[closest]!.getBoundingClientRect().height;
        const local = Math.max(
          0,
          Math.min(1, 0.5 + (middle - centers[closest]) / height),
        );
        root.current.style.setProperty("--chapter-progress", String(local));
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [enhanced]);

  const jump = (index: number) =>
    chapterRefs.current[index]?.scrollIntoView({
      behavior: running ? "smooth" : "auto",
      block: "center",
    });
  return (
    <section
      ref={root}
      id="workflow"
      className={s.story}
      data-story
      data-moving={running}
      data-enhanced={enhanced}
      data-story-step={active}
      aria-labelledby="story-title"
    >
      <div className={s.storyIntro}>
        <p className={s.eyebrow}>02 / ONE CHANGE, TRACED</p>
        <h2 id="story-title">
          Follow the change.
          <br />
          <span>Find the meaning.</span>
        </h2>
        <p>
          Scroll through an illustrative WCI review.
          <br />
          From a small edit to a decision supported by evidence.
        </p>
        <div className={s.storyDisclaimer}>
          INTENDED WORKFLOW · EARLY DEVELOPMENT · READ ONLY
        </div>
      </div>
      <div className={s.storyBody} ref={body}>
        <div className={s.chapterList}>
          {chapters.map((chapter, index) => (
            <article
              key={chapter.name}
              id={`story-chapter-${index + 1}`}
              ref={(el) => {
                chapterRefs.current[index] = el;
              }}
              className={s.chapter}
              data-current={active === index}
              aria-labelledby={`story-heading-${index + 1}`}
            >
              <div className={s.chapterCopy}>
                <p className={s.chapterKicker}>
                  <span>0{index + 1}</span> / {chapter.name}
                </p>
                <h3 id={`story-heading-${index + 1}`}>
                  {chapter.title.split("\n").map((line, i) => (
                    <span key={line}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </h3>
                <p className={s.chapterText}>{chapter.copy}</p>
                <div className={s.chapterFact}>{chapter.fact}</div>
                <p className={s.chapterNote}>{chapter.note}</p>
                {index === 4 && (
                  <a href="#security-preview" className={s.storyLink}>
                    Try the interactive example <Arrow />
                  </a>
                )}
              </div>
              <div className={s.mobileVisual} aria-hidden="true">
                <StoryVisual step={index} prefix={`story-mobile-${index}`} />
              </div>
            </article>
          ))}
        </div>
        <div className={s.stageColumn}>
          <div className={s.stageToolbar}>
            <span>
              <i /> CHANGE / CONTEXT / CONSEQUENCE
            </span>
            <span>0{active + 1} / 05</span>
          </div>
          <div className={s.stageCanvas} aria-hidden="true">
            <div className={s.stageGrid} />
            <div className={s.continuityOrb} />
            {chapters.map((chapter, index) => (
              <div
                key={chapter.name}
                className={s.stageScene}
                data-active={active === index}
              >
                <StoryVisual step={index} prefix={`story-stage-${index}`} />
              </div>
            ))}
          </div>
          <nav className={s.chapterNav} aria-label="Story chapters">
            {chapters.map((chapter, index) => (
              <button
                key={chapter.name}
                type="button"
                onClick={() => jump(index)}
                aria-label={`Go to chapter ${index + 1}: ${chapter.name}`}
                aria-current={active === index ? "step" : undefined}
              >
                <span>0{index + 1}</span>
                <i />
                <small>{chapter.name}</small>
              </button>
            ))}
          </nav>
          <div className={s.stageFoot}>
            <span>ILLUSTRATIVE PRODUCT STORY</span>
            <span>SCROLL TO CONTINUE ↓</span>
          </div>
        </div>
      </div>
      <div className={s.storyOutro}>
        <span>THE PRINCIPLE</span>
        <p>
          AI assists. <strong>Deterministic systems decide.</strong>
        </p>
        <a href="#security-preview">
          Explore the evidence <Arrow />
        </a>
      </div>
    </section>
  );
}
