"use client";
import { useRef, useState } from "react";
import { useScrollScene, segment, smooth } from "./useScrollScene";
import base from "./home.module.css";
import s from "./enhancement.module.css";
const steps = [
  {
    title: "Find problems",
    copy: "Make the uncertainty visible. Look for weak points, missing context and assumptions that deserve a closer look.",
    label: "OBSERVE / LOCATE THE WEAK POINT",
  },
  {
    title: "Build solutions",
    copy: "Turn observations into a deliberate structure. Choose clear boundaries, useful interfaces and reasoning people can inspect.",
    label: "STRUCTURE / CONNECT WITH INTENT",
  },
  {
    title: "Improve technology",
    copy: "Validate what changed. Keep learning from the evidence and make the next iteration easier to understand.",
    label: "VALIDATE / CLOSE THE FEEDBACK LOOP",
  },
];
const scattered = [
  [85, 80],
  [235, 55],
  [390, 100],
  [525, 62],
  [125, 205],
  [270, 180],
  [445, 210],
  [550, 195],
  [65, 345],
  [235, 360],
  [410, 340],
  [560, 350],
];
const arranged = Array.from({ length: 12 }, (_, i) => [
  105 + (i % 4) * 135,
  90 + Math.floor(i / 4) * 130,
]);
const validated = Array.from({ length: 12 }, (_, i) => [
  130 + (i % 4) * 115,
  105 + Math.floor(i / 4) * 110,
]);
const connections = [
  [0, 1],
  [1, 2],
  [2, 3],
  [4, 5],
  [5, 6],
  [6, 7],
  [8, 9],
  [9, 10],
  [10, 11],
  [0, 4],
  [4, 8],
  [3, 7],
  [7, 11],
  [1, 5],
  [5, 9],
  [2, 6],
  [6, 10],
];
export function PhilosophyExperience() {
  const root = useRef<HTMLElement>(null),
    nodes = useRef<(SVGCircleElement | null)[]>([]),
    lines = useRef<(SVGPathElement | null)[]>([]),
    lastPhase = useRef(-1);
  const [phase, setPhase] = useState(0),
    [paused, setPaused] = useState(false);
  const paint = (p: number) => {
    const a = smooth(segment(p, 0.08, 0.48)),
      b = smooth(segment(p, 0.52, 0.92));
    const points = scattered.map(([x, y], i) => [
      x + (arranged[i][0] - x) * a + (validated[i][0] - arranged[i][0]) * b,
      y + (arranged[i][1] - y) * a + (validated[i][1] - arranged[i][1]) * b,
    ]);
    points.forEach(([x, y], i) => {
      nodes.current[i]?.setAttribute("cx", String(x));
      nodes.current[i]?.setAttribute("cy", String(y));
      nodes.current[i]?.setAttribute(
        "r",
        String(i === 5 ? 8 + b * 5 : 5 + b * 2),
      );
    });
    connections.forEach(([a, b], i) => {
      const [x, y] = points[a],
        [tx, ty] = points[b];
      const midpoint = (x + tx) / 2;
      lines.current[i]?.setAttribute(
        "d",
        `M${x} ${y}C${midpoint} ${y},${midpoint} ${ty},${tx} ${ty}`,
      );
    });
    root.current?.style.setProperty("--structure", String(a));
    root.current?.style.setProperty("--validated", String(b));
    root.current?.style.setProperty("--uncertainty", String(1 - a));
    const next = p < 0.32 ? 0 : p < 0.67 ? 1 : 2;
    if (lastPhase.current !== next) {
      lastPhase.current = next;
      setPhase(next);
    }
  };
  const enhanced = useScrollScene(root, paint, true, paused);
  const choose = (i: number) => {
    if (enhanced && root.current) {
      const y =
        root.current.getBoundingClientRect().top +
        scrollY -
        64 +
        (root.current.offsetHeight - innerHeight + 64) * [0.08, 0.5, 0.94][i];
      scrollTo({
        top: y,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    } else {
      paint([0, 0.5, 1][i]);
      setPhase(i);
    }
  };
  return (
    <section
      ref={root}
      className={s.philosophySection}
      data-philosophy
      data-enhanced={enhanced}
      data-paused={paused}
      data-phase={phase}
      aria-labelledby="philosophy-title"
    >
      <div className={`${base.section} ${s.philosophyPinned}`}>
        <div className={base.sectionTop}>
          <span>03 / OUR ENGINEERING PHILOSOPHY</span>
          <span>COMPLEXITY → CLARITY</span>
        </div>
        <div className={s.philosophyLayout}>
          <div>
            <h2 id="philosophy-title">
              Good questions.
              <br />
              <em>Better foundations.</em>
            </h2>
            <div
              className={s.phaseNav}
              role="group"
              aria-label="Explore our engineering philosophy"
            >
              {steps.map((step, i) => (
                <button
                  type="button"
                  key={step.title}
                  aria-pressed={phase === i}
                  onClick={() => choose(i)}
                >
                  <span>0{i + 1}</span>
                  {step.title}
                  <b aria-hidden="true">↗</b>
                </button>
              ))}
            </div>
            <div className={s.phaseCopies} aria-live="polite">
              {steps.map((step, i) => (
                <article key={step.title} data-active={phase === i}>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
          <div
            className={s.networkStage}
            aria-label="Illustrative network transforms from scattered dependencies into an organized architecture and a validated feedback loop."
          >
            <div className={s.visualLabel}>
              <span>ENGINEERING / ONE CONTINUOUS SYSTEM</span>
              <span>0{phase + 1} / 03</span>
            </div>
            <svg viewBox="0 0 640 450" aria-hidden="true">
              <defs>
                <pattern
                  id="philosophy-grid"
                  width="24"
                  height="24"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1" cy="1" r=".7" fill="#444" />
                </pattern>
                <radialGradient id="philosophy-glow">
                  <stop stopColor="#fff" stopOpacity=".12" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="640" height="450" fill="url(#philosophy-grid)" />
              <ellipse
                cx="320"
                cy="220"
                rx="300"
                ry="200"
                fill="url(#philosophy-glow)"
              />
              {[0, 1, 2].map((i) => (
                <g className={s.architectureBand} key={i}>
                  <rect
                    x="65"
                    y={65 + i * 125}
                    width="510"
                    height="65"
                    rx="4"
                    fill="#ffffff04"
                    stroke="#555"
                    strokeDasharray="2 5"
                  />
                  <text x="75" y={56 + i * 125}>
                    {
                      [
                        "INPUT / CONTEXT",
                        "REASONING / STRUCTURE",
                        "VALIDATION / FEEDBACK",
                      ][i]
                    }
                  </text>
                </g>
              ))}
              {connections.map(([a, b], i) => (
                <path
                  ref={(el) => {
                    lines.current[i] = el;
                  }}
                  key={i}
                  d={`M${validated[a][0]} ${validated[a][1]}L${validated[b][0]} ${validated[b][1]}`}
                  fill="none"
                  stroke={i === 13 ? "#eee" : "#777"}
                  strokeWidth={i === 13 ? 2 : 1}
                  className={s.networkLine}
                />
              ))}
              {validated.map(([x, y], i) => (
                <circle
                  key={i}
                  ref={(el) => {
                    nodes.current[i] = el;
                  }}
                  cx={x}
                  cy={y}
                  r="7"
                  fill={i === 5 ? "#eee" : "#171717"}
                  stroke="#ddd"
                />
              ))}
              <g className={s.anomaly}>
                <circle
                  cx="270"
                  cy="180"
                  r="25"
                  fill="none"
                  stroke="#eee"
                  strokeDasharray="3 5"
                />
                <path d="M292 165l37 -28h100" stroke="#aaa" fill="none" />
                <text x="332" y="128">
                  ASSUMPTION TO EXAMINE
                </text>
              </g>
              <g className={s.validationLoop}>
                <path
                  d="M130 367H475Q540 367 540 320V103Q540 28 475 28H130"
                  fill="none"
                  stroke="#ddd"
                  strokeWidth="1.5"
                />
                <path d="M142 20l-12 8 12 8" stroke="#ddd" />
                <rect
                  x="243"
                  y="348"
                  width="155"
                  height="34"
                  rx="17"
                  fill="#e5e5e5"
                />
                <text x="262" y="369" fill="#111">
                  VALIDATE + ITERATE
                </text>
              </g>
            </svg>
            <div className={s.networkCaption}>
              <span>{steps[phase].label}</span>
              <div className={s.progressTrack}>
                <i />
              </div>
            </div>
          </div>
        </div>
        <div className={s.philosophyBottom}>
          <a href="#featured-project">
            Continue to WCI <span aria-hidden="true">↘</span>
          </a>
          <span>SCROLL TO TRANSFORM THE SYSTEM</span>
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-pressed={paused}
          >
            {paused ? "Resume sequence" : "Pause sequence"}
          </button>
        </div>
      </div>
    </section>
  );
}
