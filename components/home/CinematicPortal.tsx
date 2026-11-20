"use client";
import { useEffect, useRef, useState } from "react";
import s from "./home.module.css";
const phases = [
  "Arrival",
  "Activation",
  "The threshold",
  "Security",
  "Infrastructure",
  "Software",
  "Clarity",
];
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const ease = (n: number) => n * n * (3 - 2 * n);
export function CinematicPortal() {
  const root = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false),
    [enhanced, setEnhanced] = useState(false);
  useEffect(() => {
    const media = matchMedia(
      "(min-width: 960px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setEnhanced(media.matches && !paused);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [paused]);
  useEffect(() => {
    const el = root.current;
    if (!el || !enhanced) return;
    let frame = 0,
      active = true,
      phase = -1;
    const update = () => {
      frame = 0;
      if (!active) return;
      const box = el.getBoundingClientRect(),
        p = clamp((64 - box.top) / Math.max(1, box.height - innerHeight + 64)),
        doorRaw = range(p, 0.27, 0.53),
        door = doorRaw * doorRaw * (3 - 2 * doorRaw),
        camera = ease(range(p, 0.42, 0.88));
      const next =
        p < 0.17
          ? 0
          : p < 0.31
            ? 1
            : p < 0.55
              ? 2
              : p < 0.67
                ? 3
                : p < 0.78
                  ? 4
                  : p < 0.9
                    ? 5
                    : 6;
      const vars: Record<string, string> = {
        "--progress": String(p),
        "--activation": String(range(p, 0.12, 0.34)),
        "--door-left": `${-door * 102}%`,
        "--door-right": `${door * 102}%`,
        "--door-rotate": `${door * 27}deg`,
        "--portal-scale": String(1 + ease(range(p, 0.28, 0.59)) * 3.8),
        "--portal-x": `${77 - ease(range(p, 0.2, 0.53)) * 27}%`,
        "--material-light": String(0.15 + ease(range(p, 0.12, 0.5)) * 0.65),
        "--reflection-width": `${30 + door * 55}%`,
        "--seam-opacity": String(
          (1 - range(door, 0.02, 0.3)) * range(p, 0.12, 0.34),
        ),
        "--floor-light": String(
          range(p, 0.15, 0.5) * (1 - range(p, 0.52, 0.65)),
        ),
        "--portal-opacity": String(1 - range(p, 0.5, 0.62)),
        "--corridor-opacity": String(
          range(p, 0.34, 0.57) * (1 - range(p, 0.9, 1)),
        ),
        "--corridor-scale": String(1 + camera * 1.55),
        "--intro-opacity": String(1 - range(p, 0.07, 0.24)),
        "--intro-y": `${-range(p, 0.07, 0.24) * 65}px`,
        "--final-opacity": String(ease(range(p, 0.89, 0.98))),
        "--travel": `${camera * 80}px`,
      };
      for (const [key, value] of Object.entries(vars))
        el.style.setProperty(key, value);
      if (phase !== next) {
        phase = next;
        el.dataset.phase = String(phase);
      }
    };
    const schedule = () => {
      if (!frame && active) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) schedule();
    });
    observer.observe(el);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [enhanced]);
  return (
    <section
      ref={root}
      className={s.experience}
      data-enhanced={enhanced}
      data-paused={paused}
      data-phase="0"
      aria-labelledby="home-title"
      data-portal
    >
      <div className={s.pinned}>
        <div className={s.architecture} aria-hidden="true">
          <div className={s.wallGrid} />
          <div className={s.corridor}>
            <svg
              className={s.hall}
              viewBox="0 0 1200 850"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="home-floor" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#202020" />
                  <stop offset="1" stopColor="#080808" />
                </linearGradient>
                <linearGradient id="home-wall">
                  <stop stopColor="#080808" />
                  <stop offset=".5" stopColor="#292929" />
                  <stop offset="1" stopColor="#0b0b0b" />
                </linearGradient>
                <radialGradient id="home-light">
                  <stop stopColor="#fff" stopOpacity=".22" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </radialGradient>
              </defs>
              <path d="M0 0H1200L680 360H520Z" fill="#101010" />
              <path d="M0 0L520 360V490L0 850Z" fill="url(#home-wall)" />
              <path d="M1200 0L680 360V490L1200 850Z" fill="url(#home-wall)" />
              <path d="M0 850L520 490H680L1200 850Z" fill="url(#home-floor)" />
              <ellipse
                cx="600"
                cy="540"
                rx="360"
                ry="290"
                fill="url(#home-light)"
              />
              {[0.03, 0.17, 0.31, 0.45, 0.58, 0.7, 0.79, 0.86].map((t, i) => {
                const x = 520 * t,
                  y = 360 * t,
                  w = 1200 - 1040 * t;
                return (
                  <g key={t} opacity={1 - i * 0.085}>
                    <path
                      d={`M${x} ${850 - y}V${y}H${x + w}V${850 - y}`}
                      fill="none"
                      stroke="#5c5c5c"
                      strokeWidth={2 - i * 0.15}
                    />
                    <path
                      d={`M${x + w * 0.25} ${y + 2}H${x + w * 0.75}`}
                      stroke="#ddd"
                      strokeWidth={4 - i * 0.3}
                    />
                    <path
                      d={`M${x} ${850 - y}H${x + w}`}
                      stroke="#555"
                      strokeOpacity=".55"
                    />
                  </g>
                );
              })}
              {[0, 240, 420, 520, 680, 780, 960, 1200].map((x) => (
                <path
                  key={x}
                  d={`M600 425L${x} 850`}
                  stroke="#686868"
                  strokeOpacity=".24"
                />
              ))}
              {[0, 1, 2].map((i) => (
                <g key={i}>
                  <path
                    d={`M${100 + i * 155} ${170 + i * 75}v${565 - i * 150}l62 -44V${214 + i * 75}Z`}
                    fill="#080808"
                    stroke="#777"
                  />
                  <path
                    d={`M${1100 - i * 155} ${170 + i * 75}v${565 - i * 150}l-62 -44V${214 + i * 75}Z`}
                    fill="#080808"
                    stroke="#555"
                  />
                  <path
                    d={`M${110 + i * 155} ${187 + i * 75}v${510 - i * 147}`}
                    stroke="#e5e5e5"
                    strokeWidth="2"
                  />
                </g>
              ))}
              <rect x="568" y="360" width="64" height="132" fill="#e5e5e5" />
              <path
                d="M568 492L470 850H730L632 492"
                fill="#aaa"
                opacity=".07"
              />
            </svg>
            <div className={s.hallCaption}>
              WAYNE CITADEL / ENGINEERING FLOOR
            </div>
          </div>
          <div className={s.floorSpill} />
          <div className={s.portalPosition}>
            <div className={s.portal}>
              <span className={s.portalTop}>WC / THRESHOLD 001</span>
              <div className={s.doorInterior} />
              <div className={s.doorLight} />
              <div className={`${s.doorPanel} ${s.doorLeft}`}>
                <span>WC</span>
                <i />
              </div>
              <div className={`${s.doorPanel} ${s.doorRight}`}>
                <span>01</span>
                <i />
              </div>
              <div className={s.doorFrame} />
              <span className={s.portalBottom}>
                CONTROLLED ACCESS / OPEN THINKING
              </span>
            </div>
            <div className={s.portalReflection} />
          </div>
          <div className={s.sceneVignette} />
        </div>
        <div className={s.heroIntro}>
          <p className={s.micro}>WAYNE CITADEL / ENGINEERING WITH INTENT</p>
          <h1 id="home-title">
            Engineering
            <br />
            dependable systems.
            <br />
            <em>Securing what’s next.</em>
          </h1>
          <p className={s.heroDescription}>
            At the intersection of software, infrastructure and cybersecurity.
            Building toward systems that are secure, understandable and
            dependable.
          </p>
          <div className={s.actions}>
            <a className="btn-pill solid" href="#introduction">
              Explore Wayne Citadel <span aria-hidden="true">↘</span>
            </a>
            <a className={s.textLink} href="/wci">
              Discover WCI <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className={s.sceneChapters} aria-hidden="true">
          {[
            ["Security", "Understand the boundary. Inspect the evidence."],
            ["Infrastructure", "Find the structure behind the complexity."],
            ["Software", "Build on deliberate foundations."],
          ].map(([title, copy], i) => (
            <div
              className={s.sceneChapter}
              data-scene-label={i + 3}
              key={title}
            >
              <span className={s.micro}>0{i + 1} / ENGINEERING DISCIPLINE</span>
              <h2>{title}</h2>
              <p>{copy}</p>
            </div>
          ))}
        </div>
        <div className={s.heroFinal} aria-hidden="true">
          <span className={s.micro}>THE WAYNE CITADEL APPROACH</span>
          <p>
            Step into
            <br />
            <em>clearer thinking.</em>
          </p>
        </div>
        <div className={s.sceneBottom}>
          <a href="#introduction" className={s.skipExperience}>
            Skip to introduction <span aria-hidden="true">↘</span>
          </a>
          <div className={s.sceneProgress} aria-hidden="true">
            <span>
              {phases.map((label, i) => (
                <b key={label} data-phase-label={i}>
                  {String(i + 1).padStart(2, "0")} / {label}
                </b>
              ))}
            </span>
            <i />
          </div>
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-pressed={paused}
          >
            {paused ? "Resume experience" : "Pause experience"}
          </button>
        </div>
      </div>
      <div className={s.fallbackDisciplines}>
        <span>01 / SECURITY</span>
        <span>02 / INFRASTRUCTURE</span>
        <span>03 / SOFTWARE</span>
      </div>
    </section>
  );
}
