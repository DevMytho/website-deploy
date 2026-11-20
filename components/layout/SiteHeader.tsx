"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, LayoutGroup } from "framer-motion";

import s from "./navigation.module.css";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/wci", label: "WCI" },
  { href: "/analysis", label: "Analysis & Coverage" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = NAV_LINKS.find(
    (l) =>
      pathname === l.href ||
      (l.href !== "/" && pathname.startsWith(l.href + "/")),
  );

  return (
    <header
      className={`site-header ${s.header}`}
      data-scrolled={scrolled || undefined}
    >
      <div className={`wrap site-header-inner ${s.inner}`}>
        <a
          className={`logo ${s.brand}`}
          href="/"
          aria-label="Wayne Citadel home"
        >
          <span aria-hidden="true">W</span> WAYNE CITADEL
        </a>

        <LayoutGroup id="site-header-nav">
          <nav
            className={`header-nav ${s.nav}`}
            id="shared-main-navigation"
            data-open={open}
            aria-label="Main"
          >
            {NAV_LINKS.map((link) => {
              const isActive = active?.href === link.href;
              return (
                <a
                  key={link.href}
                  className="header-link"
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="header-active-indicator"
                      className="header-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}
                  <span style={{ position: "relative" }}>{link.label}</span>
                </a>
              );
            })}
          </nav>
        </LayoutGroup>

        <div className="header-cta">
          <a className="btn-pill solid" href="/contact">
            Let&apos;s talk ↗
          </a>
        </div>
        <button
          className={s.menu}
          type="button"
          ref={toggle}
          aria-expanded={open}
          aria-controls="shared-main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}{" "}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
      </div>
    </header>
  );
}
