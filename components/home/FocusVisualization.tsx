"use client";
import { useRef, useState, type CSSProperties } from "react";
import { useScrollScene, segment } from "./useScrollScene";
import s from "./enhancement.module.css";
export function FocusVisualization({ variant }: { variant: number }) {
  const root = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null),
    signal = useRef<SVGCircleElement>(null);
  const manual = useRef(false);
  const [step, setStep] = useState(2);
  const labels = [
    ["Input", "Boundary", "Inspect"],
    ["Construct", "Connect", "Trace"],
    ["Change", "Validate", "Review"],
  ][variant];
  const captions = [
    [
      "A configuration enters the review.",
      "Explicit rules examine the boundary.",
      "Evidence informs a human decision.",
    ],
    [
      "Resources form a defined layer.",
      "Dependencies connect the layers.",
      "Trace how data moves through the system.",
    ],
    [
      "A proposed change creates a branch.",
      "Validation checks the proposed structure.",
      "Reasoning reaches the human reviewer.",
    ],
  ][variant];
  const paint = (p: number) => {
    root.current?.style.setProperty("--draw", String(1 - p));
    root.current?.style.setProperty("--lift", `${(1 - p) * 22}px`);
    root.current?.style.setProperty(
      "--signal-x",
      `${segment(p, 0.1, 0.95) * 230}px`,
    );
    root.current?.style.setProperty("--focus-progress", String(p));
    root.current?.style.setProperty(
      "--dependency",
      String(segment(p, 0.25, 0.8)),
    );
    root.current?.style.setProperty("--resource-lift", `${(1 - p) * 38}px`);
    const next = p < 0.33 ? 0 : p < 0.7 ? 1 : 2;
    setStep((previous) => (previous === next ? previous : next));
    if (path.current && signal.current) {
      const point = path.current.getPointAtLength(
        path.current.getTotalLength() * p,
      );
      signal.current.setAttribute("cx", String(point.x));
      signal.current.setAttribute("cy", String(point.y));
    }
  };
  useScrollScene(root, (p) => {
    if (!manual.current) paint(p);
  });
  const choose = (i: number) => {
    manual.current = true;
    root.current?.setAttribute("data-manual", "true");
    paint([0.12, 0.52, 1][i]);
  };
  return (
    <div
      ref={root}
      className={s.focusVisual}
      data-focus-visual={variant}
      data-focus-step={step}
    >
      <div className={s.visualLabel}>
        <span>
          {
            [
              "01 / TRUST BOUNDARY",
              "02 / SYSTEM TOPOLOGY",
              "03 / CHANGE PIPELINE",
            ][variant]
          }
        </span>
        <span>SCHEMATIC</span>
      </div>
      <svg viewBox="0 0 420 300" fill="none" aria-hidden="true">
        <defs>
          <pattern
            id={`focus-grid-${variant}`}
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r=".6" fill="#444" />
          </pattern>
          <radialGradient id={`focus-glow-${variant}`}>
            <stop stopColor="#fff" stopOpacity=".1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="420" height="300" fill={`url(#focus-grid-${variant})`} />
        <ellipse
          cx="210"
          cy="150"
          rx="175"
          ry="135"
          fill={`url(#focus-glow-${variant})`}
        />
        {variant === 0 ? (
          <>
            <path
              d="M112 55H320V245H112Z"
              stroke="#666"
              strokeDasharray="3 7"
            />
            <path d="M10 150H110M320 150H407" stroke="#444" />
            <path
              className={s.draw}
              pathLength="1"
              d="M15 150H112V95H190V150H320H405"
              ref={path}
              stroke="#ddd"
              strokeWidth="1.5"
            />
            <path
              d="M212 88L258 108V151C258 179 212 206 212 206S166 179 166 151V108Z"
              fill="#101010"
              stroke="#ddd"
            />
            <path
              className={s.draw}
              pathLength="1"
              d="M191 147l15 15 31 -34"
              stroke="#eee"
              strokeWidth="2"
            />
            <circle cx="42" cy="150" r="13" fill="#151515" stroke="#aaa" />
            <path d="M34 150h16m-8 -8v16" stroke="#aaa" />
            <rect
              x="337"
              y="133"
              width="34"
              height="34"
              rx="5"
              fill="#171717"
              stroke="#aaa"
            />
            <path d="M345 150l6 6 11 -13" stroke="#fff" />
            <text x="112" y="38">
              EXPLICIT BOUNDARY
            </text>
            <text x="13" y="188">
              INPUT
            </text>
            <text x="330" y="188">
              REVIEW
            </text>
            <path
              d="M112 232v13h14M306 245h14v-13M112 68V55h14M306 55h14v13"
              stroke="#eee"
            />
          </>
        ) : variant === 1 ? (
          <>
            <g className={s.layerTop}>
              <path
                d="M210 36L358 96 210 155 62 96Z"
                fill="#141414"
                stroke="#bbb"
              />
              <path d="M62 96v16l148 60 148 -60V96M210 155v17" stroke="#666" />
              {[0, 1, 2].map((i) => (
                <g
                  key={i}
                  className={s.resourceBlock}
                  style={{ "--resource-index": i } as CSSProperties}
                >
                  <path
                    d={`M${124 + i * 47} 83l28 -11 28 11 -28 12Z`}
                    fill="#282828"
                    stroke="#aaa"
                  />
                  <path
                    d={`M${124 + i * 47} 83v16l28 12 28 -12V83`}
                    stroke="#666"
                  />
                </g>
              ))}
            </g>
            <path
              d="M210 139L358 199 210 258 62 199Z"
              fill="#101010"
              stroke="#777"
            />
            <path
              className={s.draw}
              pathLength="1"
              d="M152 95L110 115V180L210 220L308 180V115L246 95"
              ref={path}
              stroke="#eee"
              strokeWidth="1.5"
            />
            <circle cx="210" cy="220" r="5" fill="#eee" />
            <text x="28" y="49">
              RESOURCES
            </text>
            <text x="25" y="275">
              DEPENDENCIES, MADE VISIBLE
            </text>
          </>
        ) : (
          <>
            <path
              d="M35 150H100M100 150V85H210V150H370M100 150V215H210V150"
              stroke="#444"
            />
            <path
              className={s.draw}
              pathLength="1"
              d="M35 150H100V85H210V150H370M100 150V215H210"
              ref={path}
              stroke="#ddd"
              strokeWidth="1.5"
            />
            {[
              [35, 150],
              [100, 85],
              [100, 215],
              [210, 150],
              [305, 150],
              [370, 150],
            ].map(([x, y], i) => (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r={i === 3 ? 18 : 9}
                  fill="#121212"
                  stroke="#ccc"
                />
                {i === 3 && <path d="M202 150l6 6 12 -13" stroke="#eee" />}
              </g>
            ))}
            <path d="M73 62l-9 9 9 9m53 -18 9 9 -9 9M76 239h50" stroke="#999" />
            <rect x="272" y="190" width="95" height="33" stroke="#555" />
            <text x="284" y="211">
              HUMAN REVIEW
            </text>
            <path d="M318 168v21" stroke="#666" />
            <text x="14" y="117">
              CHANGE
            </text>
            <text x="175" y="113">
              VALIDATE
            </text>
            <text x="276" y="117">
              EXPLAIN
            </text>
            <text x="72" y="260">
              BRANCH / TEST / INTEGRATE
            </text>
          </>
        )}
        <circle
          ref={signal}
          className={s.focusSignal}
          cx="370"
          cy="150"
          r="4"
          fill="#fff"
          stroke="#090909"
          strokeWidth="2"
        />
      </svg>
      <div
        className={s.focusControls}
        role="group"
        aria-label={`${["Security", "Infrastructure", "Software"][variant]} diagram stages`}
      >
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            aria-pressed={step === i}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") choose(i);
            }}
            onClick={() => choose(i)}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            manual.current = false;
            root.current?.removeAttribute("data-manual");
            dispatchEvent(new Event("scroll"));
          }}
          aria-label={`Follow scroll for ${["security", "infrastructure", "software"][variant]} diagram`}
        >
          ↕
        </button>
      </div>
      <p className={s.focusCaption} aria-live="polite">
        {captions[step]}
      </p>
      <div className={s.visualFoot}>
        <span>
          {
            [
              "INSPECT THE FACTS",
              "TRACE THE DEPENDENCIES",
              "KEEP THE REASONING ATTACHED",
            ][variant]
          }
        </span>
        <i />
      </div>
    </div>
  );
}
