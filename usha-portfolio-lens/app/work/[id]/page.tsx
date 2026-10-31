import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { projects, type Project } from "@/data/site";
import ProjectSketch from "@/components/Sketches";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: "Case Study Not Found" };

  return {
    title: `${project.title} — Case Study | Usha Teli`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Technical Case Study | Usha Teli`,
      description: project.summary,
      images: [{ url: project.image }],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.id === id);
  const nextProject: Project = projects[(currentIndex + 1) % projects.length];

  const cs = project.caseStudy;

  return (
    <>
      <Header />
      <main className="case-study-page bp" data-bp={`<CaseStudy:${project.title} />`}>
        {/* Navigation Breadcrumb Bar */}
        <section className="cs-nav-bar">
          <div className="cs-nav-inner">
            <Link href="/#work" className="cs-back-btn">
              ← Back to Selected Work
            </Link>
            <div className="cs-nav-meta">
              <span className="cs-cat-badge">{project.category}</span>
              <span className="cs-id-badge">PROJECT / {project.number}</span>
            </div>
          </div>
        </section>

        {/* Case Study Header & Hero */}
        <header className={`cs-hero tone-${project.tone}`}>
          <div className="cs-hero-inner">
            <p className="cs-super">TECHNICAL CASE STUDY / 01—10</p>
            <h1 className="cs-title">{project.title}</h1>
            <p className="cs-lede">{project.summary}</p>

            <div className="cs-meta-grid">
              <div className="cs-meta-item">
                <span className="cs-meta-label">ROLE</span>
                <span className="cs-meta-val">{project.role}</span>
              </div>
              <div className="cs-meta-item">
                <span className="cs-meta-label">PRIMARY STACK</span>
                <span className="cs-meta-val">{project.stack.slice(0, 4).join(" · ")}</span>
              </div>
              <div className="cs-meta-item">
                <span className="cs-meta-label">DELIVERABLE</span>
                <span className="cs-meta-val">Full-Stack Production System</span>
              </div>
            </div>

            <div className="cs-hero-actions">
              {project.live && (
                <a
                  className="btn btn-ink"
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                >
                  OPEN LIVE APPLICATION ↗
                </a>
              )}
              {project.github && (
                <a
                  className="btn btn-line"
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  VIEW SOURCE CODE ↗
                </a>
              )}
              <a className="btn btn-pop" href="#cs-architecture">
                EXPLORE SYSTEM ARCHITECTURE ↓
              </a>
            </div>
          </div>
        </header>

        {/* Hero Visual Showcase */}
        <section className="cs-showcase-section">
          <div className="cs-device-mockup">
            <div className="mockup-header">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span className="mockup-url">
                https://{project.id}.internal.network/app/dashboard
              </span>
            </div>
            <div className="mockup-img-wrap">
              <Image
                src={project.image}
                alt={project.imageAlt}
                width={1600}
                height={900}
                priority
                className="cs-main-img"
              />
            </div>
          </div>
        </section>

        {/* 01 — PROJECT OVERVIEW */}
        <section className="cs-section bp" data-bp="<CaseStudy:Overview />" id="cs-overview">
          <div className="cs-section-header">
            <span className="cs-sec-num">01</span>
            <div>
              <h2 className="cs-sec-title">Project Overview</h2>
              <p className="cs-sec-sub">Context, purpose and target audience</p>
            </div>
          </div>

          <div className="cs-overview-grid">
            <div className="cs-card">
              <h3 className="cs-card-title">What is the product?</h3>
              <p>{cs.overview.product}</p>
            </div>
            <div className="cs-card">
              <h3 className="cs-card-title">Who is it intended for?</h3>
              <p>{cs.overview.targetAudience}</p>
            </div>
            <div className="cs-card cs-card-highlight">
              <h3 className="cs-card-title">What problem does it address?</h3>
              <p>{cs.overview.problemAddressed}</p>
            </div>
          </div>
        </section>

        {/* 02 — THE CHALLENGE */}
        <section className="cs-section bp" data-bp="<CaseStudy:Challenge />" id="cs-challenge">
          <div className="cs-section-header">
            <span className="cs-sec-num">02</span>
            <div>
              <h2 className="cs-sec-title">The Challenge</h2>
              <p className="cs-sec-sub">Technical hurdles and functional requirements</p>
            </div>
          </div>

          <div className="cs-prose-block">
            <p className="cs-lead-para">{cs.challenge.description}</p>
            <h3 className="cs-h3">Core Technical Requirements:</h3>
            <ul className="cs-check-list">
              {cs.challenge.requirements.map((req, i) => (
                <li key={i}>
                  <span className="check-icon">✓</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 03 — THE APPROACH */}
        <section className="cs-section bp" data-bp="<CaseStudy:Approach />" id="cs-approach">
          <div className="cs-section-header">
            <span className="cs-sec-num">03</span>
            <div>
              <h2 className="cs-sec-title">The Approach</h2>
              <p className="cs-sec-sub">Planning, state design and execution strategy</p>
            </div>
          </div>

          <div className="cs-card cs-approach-card">
            <p className="cs-lead-para">{cs.approach.planning}</p>
            <div className="cs-steps-grid">
              {cs.approach.implementation.map((step, i) => (
                <div key={i} className="cs-step-item">
                  <span className="cs-step-pill">PHASE 0{i + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04 — SYSTEM ARCHITECTURE */}
        <section className="cs-section bp" data-bp="<CaseStudy:Architecture />" id="cs-architecture">
          <div className="cs-section-header">
            <span className="cs-sec-num">04</span>
            <div>
              <h2 className="cs-sec-title">System Architecture</h2>
              <p className="cs-sec-sub">Real multi-tier data flow and structural topology</p>
            </div>
          </div>

          <p className="cs-sec-intro">{cs.architecture.summary}</p>

          <div className="arch-diagram">
            {cs.architecture.flow.map((node, i) => (
              <div key={node.step} className="arch-node-container">
                <div className="arch-node">
                  <div className="arch-node-top">
                    <span className="arch-step-tag">LAYER {node.step}</span>
                    <span className="arch-tech-tag">{node.tech}</span>
                  </div>
                  <h4 className="arch-node-title">{node.label}</h4>
                  <p className="arch-node-sub">{node.sub}</p>
                  <p className="arch-node-desc">{node.details}</p>
                </div>
                {i < cs.architecture.flow.length - 1 && (
                  <div className="arch-arrow" aria-hidden="true">
                    <span className="arrow-line" />
                    <span className="arrow-head">↓</span>
                    <span className="arrow-label">Data Transmission</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 05 — ENGINEERING DECISIONS */}
        <section className="cs-section bp" data-bp="<CaseStudy:EngineeringDecisions />" id="cs-decisions">
          <div className="cs-section-header">
            <span className="cs-sec-num">05</span>
            <div>
              <h2 className="cs-sec-title">Engineering Decisions</h2>
              <p className="cs-sec-sub">Why specific technologies and patterns were selected</p>
            </div>
          </div>

          <div className="cs-decisions-grid">
            {cs.engineeringDecisions.map((dec) => (
              <div key={dec.area} className="cs-decision-card">
                <div className="cs-decision-area">{dec.area}</div>
                <h3 className="cs-decision-title">{dec.decision}</h3>
                <div className="cs-decision-rationale">
                  <strong>Why this decision was made:</strong>
                  <p>{dec.rationale}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 06 — PRODUCT EXPERIENCE & WORKFLOWS */}
        <section className="cs-section bp" data-bp="<CaseStudy:ProductExperience />" id="cs-experience">
          <div className="cs-section-header">
            <span className="cs-sec-num">06</span>
            <div>
              <h2 className="cs-sec-title">Product Experience</h2>
              <p className="cs-sec-sub">Annotated workflows and interactive validation</p>
            </div>
          </div>

          <p className="cs-sec-intro">{cs.productExperience.summary}</p>

          <div className="cs-workflows-grid">
            <div className="cs-interactive-col">
              <div className="interactive-preview-card">
                <div className="preview-top">
                  <span className="preview-badge">LIVE INTERACTIVE SKETCH</span>
                  <span className="preview-note">{project.sketchNote}</span>
                </div>
                <div className="preview-body">
                  <ProjectSketch id={project.id} />
                </div>
              </div>
            </div>

            <div className="cs-annotations-col">
              <div className="cs-annotations-list">
                {cs.productExperience.workflows.map((wf, idx) => (
                  <div key={wf.name} className="cs-wf-item">
                    <div className="cs-wf-header">
                      <span className="cs-wf-num">FLOW 0{idx + 1}</span>
                      <h4 className="cs-wf-title">{wf.name}</h4>
                    </div>
                    <p className="cs-wf-desc">{wf.description}</p>
                    <div className="cs-wf-annotation">
                      <span className="annotation-tag">ANNOTATION</span>
                      <p>{wf.annotation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 07 — CHALLENGES & SOLUTIONS */}
        <section className="cs-section bp" data-bp="<CaseStudy:ChallengesAndSolutions />" id="cs-challenges">
          <div className="cs-section-header">
            <span className="cs-sec-num">07</span>
            <div>
              <h2 className="cs-sec-title">Challenges & Solutions</h2>
              <p className="cs-sec-sub">Real implementation hurdles solved in production</p>
            </div>
          </div>

          <div className="cs-challenges-grid">
            {cs.challengesAndSolutions.map((csPair, i) => (
              <div key={i} className="cs-cs-card">
                <div className="cs-challenge-box">
                  <div className="cs-badge-pill challenge-pill">CHALLENGE</div>
                  <p>{csPair.challenge}</p>
                </div>
                <div className="cs-solution-box">
                  <div className="cs-badge-pill solution-pill">ENGINEERED SOLUTION</div>
                  <p>{csPair.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 08 — OUTCOME */}
        <section className="cs-section bp" data-bp="<CaseStudy:Outcome />" id="cs-outcome">
          <div className="cs-section-header">
            <span className="cs-sec-num">08</span>
            <div>
              <h2 className="cs-sec-title">Outcome & Results</h2>
              <p className="cs-sec-sub">Verified capabilities and technical deliverables</p>
            </div>
          </div>

          <div className="cs-outcome-card">
            <p className="cs-lead-para">{cs.outcome.summary}</p>
            <div className="cs-capabilities-grid">
              {cs.outcome.capabilities.map((cap, i) => (
                <div key={i} className="cs-capability-item">
                  <span className="cs-cap-check">✓</span>
                  <p>{cap}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 09 — TECHNOLOGY STACK */}
        <section className="cs-section bp" data-bp="<CaseStudy:TechStack />" id="cs-stack">
          <div className="cs-section-header">
            <span className="cs-sec-num">09</span>
            <div>
              <h2 className="cs-sec-title">Technology Stack</h2>
              <p className="cs-sec-sub">Clean, understated architecture components</p>
            </div>
          </div>

          <div className="cs-tech-grid">
            {cs.technologies.map((t) => (
              <div key={t.name} className="cs-tech-item">
                <div className="cs-tech-cat">{t.category}</div>
                <h4 className="cs-tech-name">{t.name}</h4>
                <p className="cs-tech-purpose">{t.purpose}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 10 — NEXT PROJECT NAVIGATION */}
        <section className="cs-section cs-next-section bp" data-bp="<CaseStudy:NextProject />">
          <div className="cs-section-header">
            <span className="cs-sec-num">10</span>
            <div>
              <h2 className="cs-sec-title">Next Selected Work</h2>
              <p className="cs-sec-sub">Continue exploring engineering case studies</p>
            </div>
          </div>

          <div className={`next-project-card tone-${nextProject.tone}`}>
            <div className="next-card-content">
              <span className="next-badge">NEXT CASE STUDY / {nextProject.number}</span>
              <h3 className="next-title">{nextProject.title}</h3>
              <p className="next-cat">{nextProject.category}</p>
              <p className="next-desc">{nextProject.summary}</p>

              <div className="next-actions">
                <Link href={`/work/${nextProject.id}`} className="btn btn-ink">
                  EXPLORE {nextProject.title.toUpperCase()} ↗
                </Link>
                <Link href="/#work" className="btn btn-line">
                  ALL SELECTED WORK
                </Link>
                <Link href="/#contact" className="btn btn-pop">
                  START A PROJECT ↗
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
