"use client";

import { useState } from "react";
import { BuildSwitch } from "./BuildMode";
import { site } from "@/data/site";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenu = () => setMobileOpen(false);

  return (
    <header className="topbar">
      <a href="/#top" className="brand" onClick={closeMenu}>
        <span className="brand-dot" aria-hidden="true" />
        <span className="brand-name">{site.name}</span>
        <span className="brand-tag">· Product Studio</span>
      </a>

      <nav aria-label="Primary" className={`nav ${mobileOpen ? "open" : ""}`}>
        <a href="/#work" onClick={closeMenu}>
          Selected Work
        </a>
        <a href="/#engineering" onClick={closeMenu}>
          Engineering
        </a>
        <a href="/#services" onClick={closeMenu}>
          Services
        </a>
        <a href="/#why-me" onClick={closeMenu}>
          Why Work With Me
        </a>
        <a href="/#experience" onClick={closeMenu}>
          Experience
        </a>
        <a href="/#process" onClick={closeMenu}>
          Process
        </a>
        <a href="/#contact" className="nav-contact-link" onClick={closeMenu}>
          Start a Project ↗
        </a>
      </nav>

      <div className="topbar-actions">
        <BuildSwitch />
        <button
          type="button"
          className="mobile-toggle"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className={`bar ${mobileOpen ? "open" : ""}`} />
          <span className={`bar ${mobileOpen ? "open" : ""}`} />
        </button>
      </div>
    </header>
  );
}
