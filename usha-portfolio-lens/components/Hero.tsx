"use client";

import { useEffect, useRef } from "react";
import { site } from "@/data/site";

const SURFACE = ["Beautiful", "on the", "surface."];
const UNDERNEATH = "Thoughtfully engineered underneath.";
const NAME_LINE = `${site.name} — ${site.title} · ${site.locationShort}`;

/** "Hi" -> "01001000 01101001" */
const toBinary = (s: string) =>
  Array.from(new TextEncoder().encode(s))
    .map((b) => b.toString(2).padStart(8, "0"))
    .join(" ");

/** SVG tile whose rows are the word's actual bits, used to fill the letterforms. */
function bitTile(word: string) {
  const bits = toBinary(word).replace(/ /g, "");
  const cols = 26;
  const rows = 13;
  let k = 0;
  let body = "";
  for (let r = 0; r < rows; r++) {
    let row = "";
    for (let c = 0; c < cols; c++) row += bits[k++ % bits.length];
    body += `<text x="0" y="${r * 14 + 11}" textLength="${cols * 8}" lengthAdjust="spacingAndGlyphs" font-family="Consolas,Menlo,monospace" font-size="13" font-weight="700" fill="#7FE0B4">${row}</text>`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${cols * 8}" height="${rows * 14}">${body}</svg>`;
  return {
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
    backgroundSize: `${cols * 8}px ${rows * 14}px`,
  };
}

/** An original illustrated avatar. Decorative. */
function Avatar() {
  return (
    <svg className="avatar" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="200" height="200" fill="#7FE0B4" />
      <circle cx="40" cy="40" r="6" fill="#fff" opacity=".7" />
      <circle cx="168" cy="62" r="4" fill="#fff" opacity=".7" />
      {/* hoodie */}
      <path
        d="M26 204c4-36 32-54 74-54s70 18 74 54z"
        fill="#2B45F5"
        stroke="#101B3A"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M84 152l16 22 16-22"
        fill="none"
        stroke="#101B3A"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* neck */}
      <rect x="86" y="118" width="28" height="36" rx="10" fill="#FFD9C2" stroke="#101B3A" strokeWidth="4" />
      {/* back hair */}
      <path
        d="M40 104c-8-56 22-78 60-78s68 22 60 78c-2 24 6 42 12 54-22 8-40-2-50-16H78c-10 14-28 24-50 16 6-12 14-30 12-54z"
        fill="#101B3A"
      />
      {/* face */}
      <ellipse cx="100" cy="100" rx="43" ry="48" fill="#FFD9C2" stroke="#101B3A" strokeWidth="4" />
      {/* bangs */}
      <path
        d="M54 92c4-38 30-54 54-52 24 2 40 22 38 52-6-20-20-30-40-30-16 0-34 8-52 30z"
        fill="#101B3A"
      />
      <path
        d="M92 62c-8 10-16 18-30 26"
        fill="none"
        stroke="#2B45F5"
        strokeWidth="3"
        strokeLinecap="round"
        opacity=".8"
      />
      {/* eyes */}
      <g className="eyes">
        <ellipse cx="80" cy="104" rx="10" ry="13" fill="#101B3A" />
        <ellipse cx="120" cy="104" rx="10" ry="13" fill="#101B3A" />
        <ellipse cx="80" cy="106" rx="7" ry="9.5" fill="#2B45F5" />
        <ellipse cx="120" cy="106" rx="7" ry="9.5" fill="#2B45F5" />
        <circle cx="84" cy="99" r="3.6" fill="#fff" />
        <circle cx="124" cy="99" r="3.6" fill="#fff" />
        <circle cx="77" cy="110" r="1.6" fill="#fff" />
        <circle cx="117" cy="110" r="1.6" fill="#fff" />
      </g>
      <path d="M68 90q12-7 24-2M108 88q12-5 24 2" fill="none" stroke="#101B3A" strokeWidth="3.5" strokeLinecap="round" />
      {/* blush + mouth */}
      <ellipse cx="68" cy="124" rx="9" ry="5" fill="#FF8CBA" opacity=".7" />
      <ellipse cx="132" cy="124" rx="9" ry="5" fill="#FF8CBA" opacity=".7" />
      <path d="M91 132q9 8 18 0" fill="none" stroke="#101B3A" strokeWidth="3.5" strokeLinecap="round" />
      {/* hair clip */}
      <g transform="rotate(-18 140 58)">
        <rect x="126" y="52" width="30" height="11" rx="5.5" fill="#FFC633" stroke="#101B3A" strokeWidth="3" />
      </g>
    </svg>
  );
}

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const lens = useRef<HTMLDivElement>(null);
  const under = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = section.current;
    const el = stage.current;
    const lensEl = lens.current;
    const underEl = under.current;
    if (!sec || !el || !lensEl || !underEl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lines = Array.from(el.querySelectorAll<HTMLElement>(".hero-surface .hl"));

    let W = el.clientWidth;
    let H = el.clientHeight;
    let R = window.innerWidth < 700 ? 80 : 160;
    const measure = () => {
      W = el.clientWidth;
      H = el.clientHeight;
      R = window.innerWidth < 700 ? 80 : 160;
    };

    let tx = W * 0.65;
    let ty = H * 0.38;
    let x = tx;
    let y = ty;
    let pointerActive = false;
    let revealed = false;
    let visible = true;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      pointerActive = true;
      el.classList.add("touched");
    };
    const onLeave = () => (pointerActive = false);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerdown", onMove);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerup", onLeave);
    window.addEventListener("resize", measure);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(sec);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;

      if (!pointerActive && !reduce) {
        tx = W * (0.55 + Math.sin(now / 1900) * 0.22);
        ty = H * (0.4 + Math.sin(now / 1300) * 0.14);
      }
      const follow = reduce ? 1 : 0.2;
      x += (tx - x) * follow;
      y += (ty - y) * follow;

      const hw = R;
      const hh = R;
      const radii = `${R}px`;
      const cx = x;
      const cy = y;

      const top = cy - hh;
      const left = cx - hw;
      lensEl.style.left = `${left}px`;
      lensEl.style.top = `${top}px`;
      lensEl.style.width = `${hw * 2}px`;
      lensEl.style.height = `${hh * 2}px`;
      lensEl.style.borderRadius = radii;
      underEl.style.clipPath = `inset(${Math.max(top, 0)}px ${Math.max(W - (cx + hw), 0)}px ${Math.max(H - (cy + hh), 0)}px ${Math.max(left, 0)}px round ${radii})`;

      const sr = el.getBoundingClientRect();
      let onText = false;
      for (const l of lines) {
        const b = l.getBoundingClientRect();
        const bx = b.left - sr.left;
        const by = b.top - sr.top;
        if (x > bx - 20 && x < bx + b.width + 20 && y > by - 10 && y < by + b.height + 10) {
          onText = true;
          break;
        }
      }
      if (onText !== revealed) {
        revealed = onText;
        el.classList.toggle("reveal", onText);
      }
    };
    frame(performance.now());

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerup", onLeave);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section id="top" ref={section} className="hero bp" data-bp="<Hero />" aria-labelledby="hero-title">
      <div className="hero-stage" ref={stage}>
        {/* The surface: the real, accessible content. */}
        <div className="hero-surface hero-inner">
          <div className="hero-top-meta">
            <div className="hero-availability">
              <span className="pulse-dot" aria-hidden="true" />
              <span className="avail-text">{site.availability}</span>
            </div>
            <p className="hero-name">{NAME_LINE}</p>
          </div>

          <h1 id="hero-title" className="hero-title">
            {SURFACE.map((l) => (
              <span key={l} className="hl">
                {l}
              </span>
            ))}
            <span className="sr-only"> {UNDERNEATH}</span>
          </h1>

          <p className="hero-lede">{site.subheadline}</p>

          <div className="hero-actions">
            <a className="btn btn-pop" href="#contact">
              START A PROJECT ↗
            </a>
            <a className="btn btn-ink" href="#work">
              EXPLORE SELECTED WORK ↓
            </a>
          </div>

          <div className="hero-badges">
            <span className="hero-pill">MERN Stack Architecture</span>
            <span className="hero-pill">Next.js & TypeScript</span>
            <span className="hero-pill">Custom Web Applications</span>
            <span className="hero-pill">Direct Product Engineering</span>
          </div>
        </div>

        {/* Underneath: the machine layer revealed by the lens */}
        <div className="hero-under" ref={under} aria-hidden="true">
          <div className="hero-inner">
            <div className="hero-top-meta">
              <div className="hero-availability bin-meta">
                <span className="bin">{toBinary("ONLINE: READY FOR PRODUCTION")}</span>
              </div>
              <p className="hero-name bin-name">
                <span className="bin">{toBinary(NAME_LINE)}</span>
              </p>
            </div>

            <div className="hero-title">
              {SURFACE.map((l) => (
                <span key={l} className="hl">
                  <span className="word-bits" style={bitTile(l)}>
                    {l}
                  </span>
                </span>
              ))}
              <div className="under-caption">
                <span className="under-reveal-text">{'// '}{UNDERNEATH}</span>
              </div>
            </div>

            <div className="bin-lede">
              <span className="bin">{toBinary(site.subheadline)}</span>
            </div>
          </div>
        </div>

        {/* The lens: shows the avatar until it meets the words */}
        <div className="lens" ref={lens} aria-hidden="true">
          <Avatar />
        </div>
      </div>
    </section>
  );
}