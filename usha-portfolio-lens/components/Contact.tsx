"use client";

import { useState } from "react";
import {
  site,
  projectTypeOptions,
  budgetOptions,
  timelineOptions,
} from "@/data/site";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState(projectTypeOptions[1]); // "Custom Web Application"
  const [budget, setBudget] = useState(budgetOptions[2]); // "₹50,000–₹1,00,000"
  const [timeline, setTimeline] = useState(timelineOptions[1]); // "2–4 Weeks"
  const [message, setMessage] = useState("");
  const [botField, setBotField] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (botField) return; // Honeypot spam

    setStatus("sending");
    setErrorMessage("");

    let success = false;

    // 1. First attempt: Next.js API route (/api/contact)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          projectType,
          budget,
          timeline,
          message,
          botField,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (response.ok && data.sent) {
        success = true;
      } else if (data.error) {
        setErrorMessage(data.error);
      }
    } catch {
      // Server route unreachable or network timeout
    }

    // 2. Client-side fallback via FormSubmit directly to site.email if server didn't succeed
    if (!success) {
      try {
        const clientRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(site.email)}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            _replyto: email,
            company: company || "Not specified",
            projectType,
            budget,
            timeline,
            message,
            _subject: `New Project Inquiry: ${projectType} from ${name}`,
          }),
        });

        if (clientRes.ok) {
          success = true;
        }
      } catch {
        // Direct client fetch also failed
      }
    }

    if (success) {
      setStatus("sent");
    } else {
      setStatus("error");
      if (!errorMessage) {
        setErrorMessage(
          `Unable to complete automated delivery to ${site.email}. Please use the button below to open an email with your inquiry pre-filled.`
        );
      }
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setCompany("");
    setMessage("");
    setStatus("idle");
    setErrorMessage("");
  };

  const mailtoFallback = `mailto:${site.email}?subject=${encodeURIComponent(
    `Project Inquiry: ${projectType} from ${name || "Client"}`
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nCompany: ${company || "Not specified"}\nProject Type: ${projectType}\nBudget: ${budget}\nTimeline: ${timeline}\n\nProject Details:\n${message}`
  )}`;

  return (
    <section
      id="contact"
      className="section contact-section bp"
      data-bp="<ContactInquiry />"
      aria-labelledby="contact-title"
    >
      <div className="section-head-wrap">
        <div className="section-meta-pill">START A COLLABORATION</div>
        <h2 id="contact-title" className="h2 contact-main-title">
          Have Something Worth Building?
        </h2>
        <p className="section-lede">
          Tell me about your idea, your business or the problem you&apos;re trying to solve. Let&apos;s turn it into something meaningful.
        </p>
      </div>

      <div className="contact-grid">
        {/* Left Column: Premium Inquiry Form */}
        <div className="form-column">
          {status === "sent" ? (
            <div className="inquiry-success-card">
              <div className="success-icon" aria-hidden="true">
                ✓
              </div>
              <h3 className="success-title">Inquiry Received with Thanks!</h3>
              <p className="success-text">
                Thank you, <strong>{name}</strong>. Your project brief has been sent directly to my inbox at <strong>{site.email}</strong>. I review every inquiry personally and will get back to you within 24 hours with thoughts on architecture and timeline.
              </p>

              <div className="success-summary">
                <span className="ss-pill">Type: {projectType}</span>
                <span className="ss-pill">Budget: {budget}</span>
                <span className="ss-pill">Timeline: {timeline}</span>
              </div>

              <button
                type="button"
                className="btn btn-ink"
                onClick={resetForm}
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="project-inquiry-form" noValidate={false}>
              {/* Honeypot spam trap */}
              <div style={{ display: "none" }} aria-hidden="true">
                <label>
                  Leave this empty
                  <input
                    type="text"
                    name="bot_field"
                    value={botField}
                    onChange={(e) => setBotField(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              {/* Row 1: Name & Email */}
              <div className="form-row two-cols">
                <label className="field-group">
                  <span className="field-label">
                    Your Name <span className="req">*</span>
                  </span>
                  <input
                    required
                    maxLength={120}
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    className="field-input"
                  />
                </label>

                <label className="field-group">
                  <span className="field-label">
                    Your Email <span className="req">*</span>
                  </span>
                  <input
                    required
                    type="email"
                    maxLength={254}
                    placeholder="rahul@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="field-input"
                  />
                </label>
              </div>

              {/* Row 2: Company / Brand */}
              <div className="form-row">
                <label className="field-group">
                  <span className="field-label">Company or Brand Name (optional)</span>
                  <input
                    maxLength={160}
                    placeholder="e.g. Acme Labs / Startup / Independent"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    autoComplete="organization"
                    className="field-input"
                  />
                </label>
              </div>

              {/* Row 3: Project Type Selector */}
              <fieldset className="field-fieldset">
                <legend className="field-label">
                  Project Type <span className="req">*</span>
                </legend>
                <div className="pills-selector" role="radiogroup" aria-label="Project Type">
                  {projectTypeOptions.map((type) => (
                    <button
                      key={type}
                      type="button"
                      role="radio"
                      aria-checked={projectType === type}
                      className={`pill-btn ${projectType === type ? "selected" : ""}`}
                      onClick={() => setProjectType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Row 4: Estimated Budget Selector */}
              <fieldset className="field-fieldset">
                <legend className="field-label">
                  Estimated Budget <span className="req">*</span>
                </legend>
                <div className="pills-selector" role="radiogroup" aria-label="Estimated Budget">
                  {budgetOptions.map((b) => (
                    <button
                      key={b}
                      type="button"
                      role="radio"
                      aria-checked={budget === b}
                      className={`pill-btn ${budget === b ? "selected" : ""}`}
                      onClick={() => setBudget(b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Row 5: Expected Timeline Selector */}
              <fieldset className="field-fieldset">
                <legend className="field-label">Expected Timeline</legend>
                <div className="pills-selector" role="radiogroup" aria-label="Expected Timeline">
                  {timelineOptions.map((t) => (
                    <button
                      key={t}
                      type="button"
                      role="radio"
                      aria-checked={timeline === t}
                      className={`pill-btn ${timeline === t ? "selected" : ""}`}
                      onClick={() => setTimeline(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Row 6: Project Description */}
              <div className="form-row">
                <label className="field-group">
                  <span className="field-label">
                    Project Description & Requirements <span className="req">*</span>
                  </span>
                  <textarea
                    required
                    maxLength={5000}
                    rows={5}
                    placeholder="Tell me about what you want to build, the problem you are solving, any specific technologies preferred, and your target launch dates..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="field-input field-textarea"
                  />
                </label>
              </div>

              {/* Actions & Feedback */}
              <div className="form-submit-row">
                <button
                  type="submit"
                  className="btn btn-pop form-submit-btn"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "TRANSMITTING INQUIRY..." : "SUBMIT PROJECT INQUIRY ↗"}
                </button>

                <p className="form-privacy-note">
                  Direct client transmission to {site.email} · Under 24h response
                </p>
              </div>

              {status === "error" && (
                <div className="form-error-banner" role="alert">
                  <p className="feb-title">
                    <strong>Notice:</strong> {errorMessage || "Could not reach automated mail server."}
                  </p>
                  <p className="feb-sub">
                    You can instantly transmit your inquiry with one click using your device&apos;s email client:
                  </p>
                  <div className="feb-actions">
                    <a href={mailtoFallback} className="btn btn-ink small">
                      ✉ Open Pre-Filled Draft in Email App ↗
                    </a>
                    <button
                      type="button"
                      className="btn btn-line small"
                      onClick={() => {
                        if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
                          navigator.clipboard.writeText(site.email);
                        }
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                    >
                      {copied ? "✓ Copied Email!" : `Copy ${site.email}`}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Right Column: Direct Reach & Credibility */}
        <aside className="contact-sidebar">
          <div className="reach-card">
            <span className="rc-tag">DIRECT INBOX</span>
            <h3 className="rc-title">Direct Collaboration</h3>
            <p className="rc-text">
              Prefer to send a direct message, RFP or project specs via email?
            </p>
            <div className="rc-email-wrap">
              <a href={`mailto:${site.email}`} className="rc-email-link">
                {site.email}
              </a>
              <button
                type="button"
                className="btn btn-ink small rc-copy-btn"
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
                    navigator.clipboard.writeText(site.email);
                  }
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                aria-label="Copy email address"
              >
                {copied ? "✓ Copied" : "Copy"}
              </button>
            </div>

            <div className="rc-meta-divider" />

            <div className="rc-details">
              <div className="rc-detail-item">
                <span className="rc-label">LOCATION</span>
                <span className="rc-val">{site.location}</span>
              </div>
              <div className="rc-detail-item">
                <span className="rc-label">CLIENTS & TIMEZONES</span>
                <span className="rc-val">{site.remotePolicy}</span>
              </div>
              <div className="rc-detail-item">
                <span className="rc-label">RESPONSE TIME</span>
                <span className="rc-val">Usually within 12–24 hours</span>
              </div>
              <div className="rc-detail-item">
                <span className="rc-label">STATUS</span>
                <span className="rc-val text-green">● Open for Q1/Q2 engagements</span>
              </div>
            </div>

            <div className="rc-social-links">
              {site.github && (
                <a
                  className="btn btn-line small"
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
              )}
              {site.linkedin && (
                <a
                  className="btn btn-line small"
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* Global Footer */}
      <footer className="editorial-footer">
        <div className="foot-inner">
          <div className="foot-brand">
            <span className="foot-name">{site.name}</span>
            <span className="foot-role">Independent Digital Product Engineer</span>
          </div>

          <div className="foot-links">
            <a href="#top">Back to top ↑</a>
            <a href="#work">Selected Work</a>
            <a href="#engineering">Engineering</a>
            <a href="#services">Services</a>
            <a href={`mailto:${site.email}`}>Email</a>
          </div>

          <div className="foot-copy">
            <p>
              Designed & engineered with intentionality. Bricolage Grotesque & Caveat. Next.js App Router & Three.js.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
