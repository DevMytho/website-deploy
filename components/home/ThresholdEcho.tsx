"use client";
import { useRef } from "react";
import { useScrollScene } from "./useScrollScene";
import s from "./enhancement.module.css";
export function ThresholdEcho() {
  const root = useRef<HTMLDivElement>(null);
  useScrollScene(root, (p) => {
    root.current?.style.setProperty("--echo-scale", String(0.82 + p * 0.18));
    root.current?.style.setProperty("--echo-light", String(0.25 + p * 0.75));
  });
  return (
    <div ref={root} className={s.thresholdEcho} aria-hidden="true">
      <svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="echo-silver">
            <stop stopColor="#888" stopOpacity="0" />
            <stop offset=".5" stopColor="#ddd" />
            <stop offset="1" stopColor="#888" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M${120 + i * 64} 700V${45 + i * 42}H${1080 - i * 64}V700`}
            fill="none"
            stroke="url(#echo-silver)"
            strokeWidth={i === 3 ? 1.5 : 1}
            opacity={0.15 + i * 0.12}
          />
        ))}
        <path d="M600 700V190" stroke="#aaa" opacity=".12" />
        <path d="M0 700L408 172M1200 700L792 172" stroke="#555" opacity=".3" />
      </svg>
      <span>AN OPEN DOOR TO THE NEXT CONVERSATION</span>
    </div>
  );
}
