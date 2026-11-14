"use client";

import { useRef, useState } from "react";
import { Arrow, Mark } from "./Icons";
import s from "./wci.module.css";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  return (
    <header
      className={s.header}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <a className={s.brand} href="/" aria-label="Wayne Citadel home">
        <Mark />
        <span>WAYNE CITADEL</span>
      </a>
      <button
        ref={menuButton}
        className={s.menuButton}
        type="button"
        aria-expanded={open}
        aria-controls="wci-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <nav
        id="wci-navigation"
        aria-label="Main navigation"
        className={`${s.nav} ${open ? s.navOpen : ""}`}
        onClick={() => setOpen(false)}
      >
        <a href="/">Home</a>
        <a href="#wci" aria-current="page">
          WCI <span className={s.navDot} />
        </a>
        <a href="#workflow">How it works</a>
        <a href="#scope">Initial scope</a>
        <a href="mailto:wci@waynegridtech.com" className={s.navContact}>
          Let’s talk <Arrow diagonal />
        </a>
      </nav>
    </header>
  );
}
