"use client";
import { useRef } from "react";
import { useScrollScene } from "./useScrollScene";
import s from "./enhancement.module.css";
export function DirectionSignal() {
  const root = useRef<HTMLDivElement>(null);
  useScrollScene(root, (p) =>
    root.current?.style.setProperty("--direction-trace", String(1 - p)),
  );
  return (
    <div ref={root} className={s.directionSignal} aria-hidden="true">
      <svg viewBox="0 0 1100 90" fill="none">
        <path
          d="M0 72H115L177 20H358L420 72H640L705 20H880L940 72H1100"
          stroke="#333"
        />
        <path
          className={s.directionTrace}
          pathLength="1"
          d="M0 72H115L177 20H358L420 72H640L705 20H880L940 72H1100"
          stroke="#aaa"
        />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <path d={`M${42 + i * 200} 54v32`} stroke="#333" />
            <circle
              cx={42 + i * 200}
              cy={i === 1 || i === 4 ? 20 : 72}
              r="3"
              fill={i === 1 ? "#eee" : "#777"}
            />
          </g>
        ))}
      </svg>
      <span>FROM A CLEARER CHANGE TO A WIDER LIFECYCLE</span>
    </div>
  );
}
