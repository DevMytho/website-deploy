"use client";
import { useRef, useState } from "react";
import { useScrollScene, segment } from "./useScrollScene";
import base from "./home.module.css";
import s from "./enhancement.module.css";
export function WCIChangeSequence() {
  const root = useRef<HTMLDivElement>(null),
    last = useRef(-1);
  const manual = useRef(false);
  const [phase, setPhase] = useState(2);
  const paint = (p: number) => {
    root.current?.style.setProperty(
      "--evidence",
      String(segment(p, 0.15, 0.5)),
    );
    root.current?.style.setProperty("--finding", String(segment(p, 0.45, 0.8)));
    root.current?.style.setProperty("--trace", String(1 - p));
    const next = p < 0.3 ? 0 : p < 0.65 ? 1 : 2;
    if (last.current !== next) {
      last.current = next;
      setPhase(next);
    }
  };
  useScrollScene(root, (p) => {
    if (!manual.current) paint(p);
  });
  const choose = (i: number) => {
    manual.current = true;
    paint([0, 0.5, 1][i]);
  };
  return (
    <div
      ref={root}
      className={`${base.productWindow} ${s.showcase}`}
      data-wci-sequence
      data-phase={phase}
    >
      <div className={base.windowHead}>
        <span>CHANGE INTELLIGENCE</span>
        <span>ILLUSTRATIVE / 001</span>
      </div>
      <div
        className={s.showcaseTabs}
        role="group"
        aria-label="Explore the illustrative WCI finding"
      >
        {["Change", "Evidence", "Review"].map((label, i) => (
          <button
            key={label}
            aria-pressed={phase === i}
            onClick={() => choose(i)}
            type="button"
          >
            <span>0{i + 1}</span>
            {label}
          </button>
        ))}
      </div>
      <div className={s.wciStageBody}>
        <div
          className={`${base.code} ${s.changePanel}`}
          data-wci-panel="0"
          aria-hidden={phase !== 0}
        >
          <p className={s.stageEyebrow}>01 / PROPOSED CONFIGURATION CHANGE</p>
          <h3 className={s.stageTitle}>
            One source range.
            <br />A wider boundary.
          </h3>
          <span>aws_security_group.example</span>
          <pre>
            <del>− source = "203.0.113.0/24"</del>
            {"\n"}
            <ins>+ source = "0.0.0.0/0"</ins>
            {"\n"} protocol = "tcp"{"\n"} port = 22
          </pre>
          <p className={s.stageExplanation}>
            The source changes from a specific IPv4 range to the whole IPv4
            internet. TCP port 22 remains unchanged.
          </p>
        </div>
        <div
          className={s.evidencePanel}
          data-wci-panel="1"
          aria-hidden={phase !== 1}
        >
          <p className={s.stageEyebrow}>02 / FACTS AVAILABLE IN THIS EXAMPLE</p>
          <h3 className={s.stageTitle}>
            Connect the source
            <br />
            to the rule.
          </h3>
          <div className={s.resourceGraph} aria-hidden="true">
            <svg viewBox="0 0 460 125" fill="none">
              <path d="M52 55H180M270 55H402" stroke="#444" />
              <path
                className={s.tracePath}
                pathLength="1"
                d="M52 55H402"
                stroke="#ddd"
                strokeWidth="1.5"
              />
              <circle cx="52" cy="55" r="26" fill="#151515" stroke="#999" />
              <ellipse cx="52" cy="55" rx="12" ry="26" stroke="#777" />
              <path d="M26 55h52" stroke="#777" />
              <rect
                x="180"
                y="23"
                width="90"
                height="64"
                rx="8"
                fill="#141414"
                stroke="#aaa"
              />
              <path
                d="M225 35l18 8v15c0 13 -18 21 -18 21s-18 -8 -18 -21V43Z"
                stroke="#ddd"
              />
              <rect
                x="376"
                y="29"
                width="52"
                height="52"
                rx="4"
                fill="#171717"
                stroke="#aaa"
              />
              <text x="392" y="60" fill="#eee">
                22
              </text>
              <text x="16" y="108">
                IPV4 SOURCE
              </text>
              <text x="178" y="108">
                INGRESS RULE
              </text>
              <text x="372" y="108">
                TCP PORT
              </text>
            </svg>
          </div>
          <div className={s.evidenceChips}>
            <span>
              KNOWN SOURCE <b>0.0.0.0/0</b>
            </span>
            <span>
              KNOWN SERVICE <b>TCP / 22</b>
            </span>
          </div>
          <p className={s.stageExplanation}>
            These configuration attributes support the predicate. They do not
            establish routing, a listening host or actual reachability.
          </p>
        </div>
        <div
          className={`${base.finding} ${s.sequenceFinding} ${s.reviewPanel}`}
          data-wci-panel="2"
          aria-hidden={phase !== 2}
        >
          <p className={s.stageEyebrow}>03 / ILLUSTRATIVE REVIEW SUMMARY</p>
          <span className={base.micro}>CONFIGURATION FINDING / NET-001</span>
          <h3>Public IPv4 SSH permitted by a rule.</h3>
          <dl className={s.reviewFacts}>
            <div>
              <dt>Change</dt>
              <dd>Restricted → world-open source</dd>
            </div>
            <div>
              <dt>Evidence</dt>
              <dd>0.0.0.0/0 · TCP · port 22</dd>
            </div>
            <div>
              <dt>Reachability</dt>
              <dd>Unverified</dd>
            </div>
          </dl>
          <p>
            Configuration evidence. Host reachability unverified. Your team owns
            the decision.
          </p>
          <span className={s.reviewDecision}>
            YOUR TEAM REVIEWS. YOUR TEAM DECIDES.
          </span>
        </div>
      </div>
      <div className={s.wciSequenceFooter}>
        <span>
          {
            [
              "Inspect the proposed edit",
              "Understand the available facts",
              "Review the claim and its limits",
            ][phase]
          }
        </span>
        <button
          type="button"
          onClick={() => {
            manual.current = false;
            dispatchEvent(new Event("scroll"));
          }}
        >
          Follow scroll ↕
        </button>
      </div>
      <div className={base.windowFoot}>PRODUCT CONCEPT · NO LIVE ANALYSIS</div>
    </div>
  );
}
