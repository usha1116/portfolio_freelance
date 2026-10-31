"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects, type Project } from "@/data/site";
import ProjectSketch from "./Sketches";

function ProjectCardItem({ project: p, isReverse }: { project: Project; isReverse: boolean }) {
  const [visualMode, setVisualMode] = useState<"preview" | "workflow">("preview");

  return (
    <article
      id={`project-${p.id}`}
      className={`project-card tone-${p.tone} project-${p.id} ${
        isReverse ? "project-reverse" : ""
      } bp`}
      data-bp={`<Project:${p.title} />`}
    >
      {/* Card Meta Bar */}
      <div className="pcard-top">
        <div className="pcard-num-badge">{p.number}</div>
        <div className="pcard-category">{p.category}</div>
        <div className="pcard-role-tag">ROLE: {p.role}</div>
      </div>

      {/* Main Content Layout */}
      <div className="pcard-layout">
        {/* Information Column */}
        <div className="pcard-info">
          <h3 className="pcard-title">{p.title}</h3>
          <p className="pcard-desc">{p.summary}</p>

          <div className="pcard-highlights">
            <span className="highlights-title">VERIFIED CAPABILITIES:</span>
            <ul className="highlights-list">
              {p.features.slice(0, 3).map((f) => (
                <li key={f}>
                  <span className="h-dot" aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Pills */}
          <div className="pcard-stack-wrap">
            <span className="stack-title">TECHNOLOGY STACK:</span>
            <ul className="stack" aria-label={`${p.title} technologies`}>
              {p.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Architecture Layers (visible when Show the Build is ON) */}
          <div className="pcard-build-layers only-build">
            <span className="layers-label">SYSTEM LAYERS:</span>
            <ol className="layers" aria-label={`${p.title} architecture layers`}>
              {p.layers.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="pcard-actions">
            <Link
              href={`/work/${p.id}`}
              className="btn btn-ink pcard-btn-primary"
            >
              READ CASE STUDY (01—10) →
            </Link>

            <div className="pcard-secondary-actions">
              {p.live && (
                <a
                  className="btn btn-pop"
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                >
                  LIVE DEMO ↗
                </a>
              )}

              {p.github && (
                <a
                  className="btn btn-line"
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  VIEW CODE ↗
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Visual Showcase Column with Interactive View Mode Toggle */}
        <div className="pcard-visual">
          <div className="pcard-mode-toggle" role="tablist" aria-label="Showcase view mode">
            <button
              type="button"
              role="tab"
              aria-selected={visualMode === "preview"}
              className={`pcard-mode-btn ${visualMode === "preview" ? "active" : ""}`}
              onClick={() => setVisualMode("preview")}
            >
              <span className="pm-icon" aria-hidden="true">📸</span>
              <span>App Interface</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={visualMode === "workflow"}
              className={`pcard-mode-btn ${visualMode === "workflow" ? "active" : ""}`}
              onClick={() => setVisualMode("workflow")}
            >
              <span className="pm-icon" aria-hidden="true">⚡</span>
              <span>Live Simulation</span>
              <span className="pm-badge">Try It</span>
            </button>
          </div>

          {visualMode === "preview" ? (
            <div className="pcard-frame">
              <div className="frame-bar">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
                <span className="frame-title">
                  {p.title.toLowerCase()}.local/app
                </span>
              </div>
              <div className="frame-image-wrap">
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  width={900}
                  height={506}
                  className="pcard-screenshot"
                  priority={p.id === "inoutbilling"}
                />
              </div>
            </div>
          ) : (
            <div className="pcard-interactive-preview">
              <div className="pip-header">
                <span className="pip-label">LIVE WORKFLOW INTERACTION</span>
                <span className="pip-hand-note">{p.sketchNote}</span>
              </div>
              <div className="pip-body">
                <ProjectSketch id={p.id} />
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      id="work"
      className="section work-section bp"
      data-bp="<Work />"
      aria-labelledby="work-title"
    >
      <div className="section-head-wrap">
        <div className="section-meta-pill">PORTFOLIO INDEX</div>
        <h2 id="work-title" className="h2">
          SELECTED WORK 
        </h2>
        <p className="section-lede">
          Four production-grade web applications and full-stack architectures engineered for real business operations, role-based workflows, and contextual AI intelligence.
        </p>
      </div>

      <div className="project-slider-wrapper">
        {/* Slider Navigation Bar */}
        <div className="slider-tabs-wrap">
          {/* Quick Jump Project Selector Pills */}
          <div className="slider-tabs" role="tablist" aria-label="Project selector tabs">
            {projects.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={currentSlide === idx}
                className={`slider-tab tone-${p.tone} ${currentSlide === idx ? "active" : ""}`}
                onClick={() => setCurrentSlide(idx)}
              >
                <span className="stab-num">{p.number}</span>
                <span className="stab-title">{p.title}</span>
              </button>
            ))}
          </div>

          {/* Slider Prev / Next Controls & Counter */}
          <div className="slider-controls">
            <button
              type="button"
              className="btn btn-ink small slider-nav-btn"
              onClick={prevSlide}
              aria-label="Previous project"
            >
              ← Prev
            </button>
            <div className="slider-counter" aria-live="polite">
              <span className="counter-curr">0{currentSlide + 1}</span>
              <span className="counter-sep">/</span>
              <span className="counter-total">0{projects.length}</span>
            </div>
            <button
              type="button"
              className="btn btn-ink small slider-nav-btn"
              onClick={nextSlide}
              aria-label="Next project"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Carousel Viewport with Swipe & Key Navigation */}
        <div
          className="slider-viewport"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          aria-roledescription="carousel"
          aria-label="Featured projects"
        >
          <div
            className="slider-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {projects.map((p, idx) => (
              <div
                key={p.id}
                className="slider-slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`${p.title} (${idx + 1} of ${projects.length})`}
                aria-hidden={currentSlide !== idx}
              >
                <ProjectCardItem
                  project={p}
                  isReverse={idx % 2 === 1}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Slider Bottom Indicators & Touch Hint */}
        <div className="slider-footer">
          <div className="slider-swipe-hint" aria-hidden="true">
            <span>← Swipe or use arrows to explore projects →</span>
          </div>

          <div className="slider-dots" role="tablist" aria-label="Slide indicators">
            {projects.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                className={`slider-dot tone-${p.tone} ${currentSlide === idx ? "active" : ""}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to project 0${idx + 1}: ${p.title}`}
                aria-selected={currentSlide === idx}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
