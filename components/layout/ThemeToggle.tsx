"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("wayne-theme", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("wayne-theme", callback);
    window.removeEventListener("storage", callback);
  };
}

export function ThemeToggle() {
  const light = useSyncExternalStore(subscribe, () => document.documentElement.dataset.theme === "light", () => false);
  return <button type="button" className="theme-toggle" aria-label="Light mode" aria-pressed={light} title="Experimental light mode" onClick={() => {
    const theme = light ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("wayne-theme", theme); } catch { /* Storage is optional. */ }
    window.dispatchEvent(new Event("wayne-theme"));
  }}><span aria-hidden="true">{light ? "◐" : "☼"}</span><span>{light ? "Dark" : "Light"}</span></button>;
}
