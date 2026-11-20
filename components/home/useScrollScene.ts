"use client";
import { useEffect, useRef, useState, type RefObject } from "react";
export const clamp = (n: number) => Math.max(0, Math.min(1, n));
export const segment = (p: number, a: number, b: number) =>
  clamp((p - a) / (b - a));
export const smooth = (p: number) => p * p * (3 - 2 * p);
/** Event-scheduled rendering, suspended offscreen. Never intercepts scrolling. */
export function useScrollScene(
  ref: RefObject<HTMLElement | null>,
  paint: (p: number) => void,
  pinned = false,
  paused = false,
) {
  const [enhanced, setEnhanced] = useState(false);
  const painter = useRef(paint);
  painter.current = paint;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const media = matchMedia(
      pinned
        ? "(min-width: 960px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)"
        : "(prefers-reduced-motion: no-preference)",
    );
    let frame = 0,
      visible = true,
      enabled = false;
    const update = () => {
      frame = 0;
      if (!enabled || !visible) return;
      const box = el.getBoundingClientRect();
      const p = pinned
        ? clamp((64 - box.top) / Math.max(1, box.height - innerHeight + 64))
        : clamp(
            (innerHeight * 0.9 - box.top) /
              (innerHeight * 0.65 + box.height * 0.35),
          );
      el.style.setProperty("--scene-progress", String(p));
      painter.current(p);
    };
    const schedule = () => {
      if (enabled && visible && !frame) frame = requestAnimationFrame(update);
    };
    const configure = () => {
      enabled = media.matches && !paused;
      setEnhanced(enabled);
      el.dataset.sceneMotion = String(enabled);
      if (!enabled) {
        cancelAnimationFrame(frame);
        frame = 0;
        el.style.setProperty("--scene-progress", "1");
        painter.current(1);
      } else schedule();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
    });
    observer.observe(el);
    configure();
    media.addEventListener("change", configure);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      media.removeEventListener("change", configure);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref, pinned, paused]);
  return enhanced;
}
