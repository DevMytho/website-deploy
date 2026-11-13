"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import s from "./wci.module.css";

const MotionContext = createContext(true);
export function usePageMotion() {
  return useContext(MotionContext);
}

/** One motion control for CSS and timed illustrations. Content works without JS. */
export function PageExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const page = root.current;
    if (!page || reduced || paused || !("IntersectionObserver" in window))
      return;
    const targets = page.querySelectorAll<HTMLElement>(
      "main section:not(:first-child) h2, main section:not(:first-child) article, [data-reveal]",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-entered", "true");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    targets.forEach((target, index) => {
      if (target.closest("[data-story]")) return;
      // Only animate content not already visible when enhancement starts.
      if (target.getBoundingClientRect().top > innerHeight) {
        target.setAttribute("data-reveal", "true");
        target.style.setProperty("--reveal-delay", `${(index % 3) * 70}ms`);
        observer.observe(target);
      }
    });
    page.setAttribute("data-reveal-ready", "true");
    return () => {
      observer.disconnect();
      page.removeAttribute("data-reveal-ready");
    };
  }, [reduced, paused]);

  const running = !paused && !reduced;
  return (
    <MotionContext.Provider value={running}>
      <div
        ref={root}
        className={s.page}
        id="wci"
        data-motion={running ? "running" : "paused"}
      >
        <div className={s.readingProgress} aria-hidden="true" />
        {children}
        <button
          className={s.motionToggle}
          type="button"
          onClick={() => setPaused(!paused)}
          aria-pressed={!running}
          disabled={reduced}
        >
          <span className={s.motionBars} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          {reduced
            ? "Reduced motion"
            : paused
              ? "Resume motion"
              : "Pause motion"}
          <span className={s.motionPreference}>
            {reduced ? "System preference" : ""}
          </span>
        </button>
      </div>
    </MotionContext.Provider>
  );
}
