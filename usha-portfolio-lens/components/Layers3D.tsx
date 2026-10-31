"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { engineeringLayers } from "@/data/site";

const INK = 0x101b3a;

function slab(color: number, index: number) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    color,
    flatShading: true,
    roughness: 0.85,
    emissive: color,
    emissiveIntensity: 0,
  });
  const box = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.26, 3.2), mat);
  g.add(box);
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(box.geometry),
    new THREE.LineBasicMaterial({ color: INK })
  );
  g.add(edges);

  const add = (geo: THREE.BufferGeometry, x: number, z: number, h: number) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, 0.13 + h / 2, z);
    g.add(m);
    const outline = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: INK })
    );
    outline.position.copy(m.position);
    g.add(outline);
  };

  if (index === 0)
    [-0.9, 0, 0.9].forEach((x, i) =>
      add(new THREE.BoxGeometry(0.7, 0.22 + i * 0.1, 1.5), x, 0, 0.22 + i * 0.1)
    );
  if (index === 1)
    [-0.7, 0.7].forEach((x) =>
      add(new THREE.CylinderGeometry(0.5, 0.5, 0.3, 14), x, 0, 0.3)
    );
  if (index === 2)
    [-1, -0.33, 0.33, 1].forEach((z) =>
      add(new THREE.BoxGeometry(2.4, 0.1, 0.22), 0, z, 0.1)
    );
  if (index === 3)
    [0, 0.28, 0.56].forEach((y) =>
      add(new THREE.CylinderGeometry(0.75, 0.75, 0.2, 18), 0, 0, 0.2 + y)
    );

  return { group: g, mat };
}

export default function Layers3D() {
  const section = useRef<HTMLElement>(null);
  const canvasHost = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const activeRef = useRef<number>(0);
  const [active, setActive] = useState<number>(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const host = canvasHost.current;
    const sec = section.current;
    if (!host || !sec) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(6.5, 5.2, 8);
    camera.lookAt(0, 0, 0);
    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const sun = new THREE.DirectionalLight(0xffffff, 2.2);
    sun.position.set(4, 8, 5);
    scene.add(sun);

    const root = new THREE.Group();
    scene.add(root);
    const parts = engineeringLayers.map((l, i) => {
      const s = slab(l.colorHex, i);
      root.add(s.group);
      return s;
    });

    let yaw = 0.5;
    let dragYaw = 0;
    let dragging = false;
    let lastX = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      renderer.domElement.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      dragYaw += (e.clientX - lastX) * 0.01;
      lastX = e.clientX;
    };
    const onUp = () => (dragging = false);

    renderer.domElement.addEventListener("pointerdown", onDown);
    renderer.domElement.addEventListener("pointermove", onMove);
    renderer.domElement.addEventListener("pointerup", onUp);
    renderer.domElement.addEventListener("pointercancel", onUp);

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const onScroll = () => {
      const r = sec.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      progress.current = Math.min(1, Math.max(0, -r.top / Math.max(total, 1)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(sec);

    let raf = 0;
    let t0 = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const dt = Math.min((now - t0) / 1000, 0.05);
      t0 = now;
      const isMobile = typeof window !== "undefined" && window.innerWidth <= 860;
      const spread = isMobile
        ? Math.min(1, 0.5 + progress.current * 1.2)
        : Math.min(1, progress.current * 1.6);
      const ease = spread * spread * (3 - 2 * spread);
      const k = reduce ? 1 : 1 - Math.pow(0.0005, dt);

      parts.forEach((p, i) => {
        const target = (1.5 - i) * (0.34 + ease * 1.25);
        p.group.position.y += (target - p.group.position.y) * k;
        const on = activeRef.current === i;
        p.mat.emissiveIntensity += ((on ? 0.45 : 0) - p.mat.emissiveIntensity) * k;
        const s = on ? 1.05 : 1;
        p.group.scale.x += (s - p.group.scale.x) * k;
        p.group.scale.z = p.group.scale.x;
      });

      if (!reduce && !dragging) yaw += dt * 0.12;
      root.rotation.y = yaw + dragYaw;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      renderer.domElement.removeEventListener("pointerdown", onDown);
      renderer.domElement.removeEventListener("pointermove", onMove);
      renderer.domElement.removeEventListener("pointerup", onUp);
      renderer.domElement.removeEventListener("pointercancel", onUp);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x?.dispose?.());
        else mat?.dispose?.();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  const activeLayer = engineeringLayers[active] || engineeringLayers[0];

  return (
    <section
      id="engineering"
      ref={section}
      className="engineering-section bp"
      data-bp="<EngineeringArchitecture />"
      aria-labelledby="eng-title"
    >
      {/* Mobile-only section header shown cleanly above the 3D model */}
      <div className="section-head-wrap eng-mobile-head">
        <div className="section-meta-pill">TECHNICAL ARCHITECTURE</div>
        <h2 className="h2 eng-main-heading">
          Beyond the Interface. Into the Engineering.
        </h2>
        <p className="eng-lede">
          Great digital products aren&apos;t just designed. They&apos;re architected, engineered and refined to work reliably beneath the surface.
        </p>
      </div>

      <div className="eng-sticky">
        {/* Left Column: Interactive 3D Model */}
        <div className="eng-visual">
          <div className="eng-canvas-wrap">
            <div ref={canvasHost} className="canvas-host" />
            {failed && (
              <p className="canvas-fail">
                3D view is not available in this browser. The architectural layers are detailed alongside.
              </p>
            )}
            <p className="drag-hint" aria-hidden="true">
              scroll to separate layers · drag to rotate ✦
            </p>
          </div>

          {/* Layer Selector Chips */}
          <div className="eng-layer-chips" role="tablist" aria-label="Architecture layers">
            {engineeringLayers.map((l, i) => {
              const isSelected = active === i;
              const isDarkColor = l.id === "data";
              return (
                <button
                  key={l.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`panel-${l.id}`}
                  id={`tab-${l.id}`}
                  className={`eng-chip ${isSelected ? "active" : ""} eng-chip-${l.id}`}
                  style={{
                    borderColor: isSelected ? "var(--ink)" : "rgba(16, 27, 58, 0.2)",
                    backgroundColor: isSelected ? l.color : "#fff",
                    color: isSelected && isDarkColor ? "#ffffff" : "var(--ink)",
                  }}
                  onClick={() => setActive(i)}
                >
                  <span className="chip-no">{l.number}</span>
                  <span className="chip-title">{l.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Architectural Content */}
        <div className="eng-copy">
          <div className="eng-desktop-head">
            <div className="section-meta-pill">TECHNICAL ARCHITECTURE</div>
            <h2 id="eng-title" className="h2 eng-main-heading">
              Beyond the Interface. Into the Engineering.
            </h2>
            <p className="eng-lede">
              Great digital products aren&apos;t just designed. They&apos;re architected, engineered and refined to work reliably beneath the surface.
            </p>
          </div>

          {/* Active Layer Deep Dive Card */}
          <div
            id={`panel-${activeLayer.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeLayer.id}`}
            className="eng-detail-card"
          >
            <div className="edc-header">
              <span
                className="edc-swatch"
                style={{ background: activeLayer.color }}
                aria-hidden="true"
              />
              <div className="edc-titles">
                <span className="edc-badge">{activeLayer.badge}</span>
                <h3 className="edc-name">
                  {activeLayer.number} — {activeLayer.name.toUpperCase()}
                </h3>
              </div>
            </div>

            <p className="edc-headline">{activeLayer.headline}</p>

            <div className="edc-block">
              <h4 className="edc-subhead">CORE PURPOSE</h4>
              <p className="edc-purpose">{activeLayer.purpose}</p>
            </div>

            <div className="edc-block">
              <h4 className="edc-subhead">RELEVANT TECHNOLOGIES</h4>
              <ul className="edc-tech-pills">
                {activeLayer.technologies.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>

            <div className="edc-block">
              <h4 className="edc-subhead">PRODUCTION IMPLEMENTATIONS</h4>
              <ul className="edc-examples">
                {activeLayer.examples.map((ex, idx) => (
                  <li key={idx}>
                    <strong>{ex.project}:</strong> {ex.detail}
                  </li>
                ))}
              </ul>
            </div>

            <div className="edc-block">
              <h4 className="edc-subhead">KEY ENGINEERING DECISIONS</h4>
              <ul className="edc-decisions">
                {activeLayer.decisions.map((dec, idx) => (
                  <li key={idx}>
                    <span className="dec-bullet">✦</span>
                    <span>{dec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
