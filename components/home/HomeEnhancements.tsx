"use client";
import { useEffect } from "react";

/** Content is visible until a motion-capable browser opts into entrances. */
export function HomeEnhancements() {
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    const clear = () => {
      observer?.disconnect();
      document.querySelectorAll("[data-home-reveal]").forEach(el => el.removeAttribute("data-home-reveal"));
    };
    const setup = () => {
      clear();
      if (preference.matches) return;
      observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.setAttribute("data-home-reveal", "visible"); observer?.unobserve(entry.target); }
      }), { threshold: .1 });
      document.querySelectorAll("#home-main section:not([data-portal]) h2").forEach(el => {
        if (el.getBoundingClientRect().top > innerHeight) { el.setAttribute("data-home-reveal", "pending"); observer?.observe(el); }
      });
    };
    setup(); preference.addEventListener("change", setup);
    return () => { clear(); preference.removeEventListener("change", setup); };
  }, []);
  return null;
}
