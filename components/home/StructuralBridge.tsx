"use client";
import { useRef } from "react";
import { useScrollScene } from "./useScrollScene";
import s from "./enhancement.module.css";

/** The boundary becomes a connected system; the next section explains why. */
export function StructuralBridge() {
  const root = useRef<HTMLDivElement>(null);
  useScrollScene(root, (p) =>
    root.current?.style.setProperty("--bridge-draw", String(1 - p)),
  );
  return (
    <div ref={root} className={s.structuralBridge} aria-hidden="true">
      <svg viewBox="0 0 1000 100" fill="none">
        <path
          d="M0 50H205L240 20H390L425 50H575L610 80H760L795 50H1000"
          stroke="#333"
        />
        <path
          className={s.bridgeTrace}
          pathLength="1"
          d="M0 50H205L240 20H390L425 50H575L610 80H760L795 50H1000"
          stroke="#aaa"
        />
        <path d="M465 32h70v36h-70zM500 0v32m0 36v32" stroke="#444" />
        {[205, 425, 575, 795].map((x) => (
          <circle key={x} cx={x} cy="50" r="3" fill="#aaa" />
        ))}
      </svg>
      <span>FROM CONNECTED DISCIPLINES TO DELIBERATE STRUCTURE</span>
    </div>
  );
}
