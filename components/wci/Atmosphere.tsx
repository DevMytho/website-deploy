import type { CSSProperties } from "react";
import s from "./wci.module.css";

/** Abstract connected-infrastructure sculpture, deliberately not a coverage map. */
export function WireGlobe({ className = "" }: { className?: string } = {}) {
  return (
    <figure
      className={`${s.wireGlobe} ${className}`}
      aria-label="Abstract wireframe globe representing connected infrastructure, not live telemetry or geographic coverage."
    >
      <div className={s.globeMeta}>
        <span>CONNECTED BY CONTEXT</span>
        <span>FIG. 02</span>
      </div>
      <div className={s.globeStage} aria-hidden="true">
        <svg className={s.globeReticle} viewBox="0 0 400 400" fill="none">
          <circle
            cx="200"
            cy="200"
            r="189"
            stroke="#444"
            strokeDasharray="1 9"
          />
          <path d="M200 0v14m0 372v14M0 200h14m372 0h14" stroke="#aaa" />
          <circle
            cx="200"
            cy="200"
            r="174"
            stroke="#333"
            strokeDasharray="120 970"
          />
        </svg>
        <div className={s.globeTilt}>
          <div className={s.globeSpin}>
            {Array.from({ length: 12 }, (_, i) => (
              <i
                key={`m${i}`}
                className={s.globeMeridian}
                style={{ transform: `rotateY(${i * 15}deg)` }}
              />
            ))}
            {[-0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75].map((y) => {
              const radius = Math.sqrt(1 - y * y);
              return (
                <i
                  key={`l${y}`}
                  className={s.globeLatitude}
                  style={{
                    width: `${radius * 100}%`,
                    height: `${radius * 100}%`,
                    left: `${(1 - radius) * 50}%`,
                    top: `${(1 - radius) * 50}%`,
                    transform: `translateY(calc(var(--globe-size) * ${y / 2})) rotateX(90deg)`,
                  }}
                />
              );
            })}
            {[
              [25, 30],
              [110, -20],
              [185, 45],
              [245, -40],
              [320, 5],
              [55, -55],
            ].map(([longitude, latitude], i) => (
              <i
                key={`p${i}`}
                className={s.globePoint}
                style={{
                  transform: `rotateY(${longitude}deg) rotateX(${latitude}deg) translateZ(calc(var(--globe-size) / 2))`,
                }}
              />
            ))}
          </div>
        </div>
        <div className={s.globeAxis}>
          <span>WCI</span>
          <small>PLAN → EVIDENCE</small>
        </div>
      </div>
      <figcaption>
        <span className={s.smallDot} /> Abstract infrastructure view{" "}
        <span>ILLUSTRATION</span>
      </figcaption>
    </figure>
  );
}

function terrainPoint(column: number, row: number) {
  const t = column / 50;
  const depth = row / 20;
  const x = 600 + (t - 0.5) * (380 + depth * 1150);
  const ridge =
    Math.exp(-Math.pow((t - 0.38) * 5, 2)) * 70 +
    Math.exp(-Math.pow((t - 0.72) * 8, 2)) * 42;
  const wave =
    Math.sin(t * 14 + depth * 3) * 13 + Math.cos(t * 23 - depth * 2) * 8;
  return `${x.toFixed(1)},${(128 + depth * 205 - (ridge + wave) * (0.2 + depth * 0.8)).toFixed(1)}`;
}

export function TerrainWordmark({
  word = "CLARITY",
  idPrefix = "wci",
  className = "",
}: { word?: string; idPrefix?: string; className?: string } = {}) {
  const rows = Array.from({ length: 21 }, (_, row) =>
    Array.from({ length: 51 }, (_, column) => terrainPoint(column, row)).join(
      " ",
    ),
  );
  const columns = Array.from({ length: 51 }, (_, column) =>
    Array.from({ length: 21 }, (_, row) => terrainPoint(column, row)).join(" "),
  );
  return (
    <div className={`${s.terrainInterlude} ${className}`} aria-hidden="true">
      <div className={s.terrainLabel}>
        <span>LESS NOISE.</span>
        <span>A CLEARER PERSPECTIVE.</span>
      </div>
      <svg
        className={s.terrainMesh}
        viewBox="0 0 1200 360"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient
            id={`${idPrefix}-terrain-fade`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0" stopColor="#fff" stopOpacity=".4" />
            <stop offset="1" stopColor="#fff" stopOpacity=".025" />
          </linearGradient>
        </defs>
        <g stroke={`url(#${idPrefix}-terrain-fade)`} strokeWidth=".55">
          {rows.map((points, i) => (
            <polyline
              key={`r${i}`}
              points={points}
              className={s.terrainRow}
              style={{ "--row-delay": `${i * 0.12}s` } as CSSProperties}
            />
          ))}
          {columns.map((points, i) => (
            <polyline key={`c${i}`} points={points} />
          ))}
        </g>
      </svg>
      <svg className={s.vectorWordmark} viewBox="0 0 1000 180" fill="none">
        <text
          x="500"
          y="139"
          textAnchor="middle"
          textLength="870"
          lengthAdjust="spacingAndGlyphs"
          className={s.vectorBase}
        >
          {word}
        </text>
        <text
          x="500"
          y="139"
          textAnchor="middle"
          textLength="870"
          lengthAdjust="spacingAndGlyphs"
          className={s.vectorTrace}
        >
          {word}
        </text>
      </svg>
      <div className={s.terrainCoordinates}>
        <span>OBSERVE THE CHANGE</span>
        <span>TRACE THE EVIDENCE</span>
        <span>KEEP THE CONTEXT</span>
      </div>
    </div>
  );
}

export function RibbonGlow({ idPrefix = "wci" }: { idPrefix?: string } = {}) {
  const curves = Array.from(
    { length: 9 },
    (_, i) =>
      `M-80 ${300 + i * 8} C180 ${-80 + i * 10} 350 ${430 - i * 17} 660 ${150 + i * 9} S1030 ${-90 + i * 6} 1300 ${100 + i * 14}`,
  );
  return (
    <div className={s.ribbonGlow} aria-hidden="true">
      <svg
        viewBox="0 0 1200 450"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`${idPrefix}-ribbon-light`}>
            <stop stopColor="white" stopOpacity="0" />
            <stop offset=".6" stopColor="white" stopOpacity=".65" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <filter id={`${idPrefix}-ribbon-soft`}>
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <g stroke={`url(#${idPrefix}-ribbon-light)`} strokeWidth=".7">
          {curves.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <path
          className={s.ribbonLight}
          d={curves[4]}
          stroke="white"
          strokeWidth="7"
          strokeOpacity=".25"
          filter={`url(#${idPrefix}-ribbon-soft)`}
        />
        <path
          className={s.ribbonLight}
          d={curves[4]}
          stroke="white"
          strokeWidth="1"
          strokeOpacity=".85"
        />
      </svg>
    </div>
  );
}
