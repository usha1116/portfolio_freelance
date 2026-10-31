import { NextResponse } from "next/server";
import { site } from "@/data/site";

const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_COMPANY_LENGTH = 160;
const MAX_OPTION_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 5000;

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (
    typeof payload !== "object" ||
    payload === null ||
    !("name" in payload) ||
    !("email" in payload) ||
    !("message" in payload)
  ) {
    return NextResponse.json(
      { error: "Please provide your name, email, and project message." },
      { status: 400 }
    );
  }

  const p = payload as Record<string, unknown>;

  // Honeypot spam check
  if (p.botField && typeof p.botField === "string" && p.botField.trim() !== "") {
    // Silently acknowledge bots to prevent spam retry
    return NextResponse.json({ sent: true });
  }

  const name = typeof p.name === "string" ? p.name.trim() : "";
  const email = typeof p.email === "string" ? p.email.trim() : "";
  const company = typeof p.company === "string" ? p.company.trim() : "";
  const projectType = typeof p.projectType === "string" ? p.projectType.trim() : "Custom Web Application";
  const budget = typeof p.budget === "string" ? p.budget.trim() : "Not decided yet";
  const timeline = typeof p.timeline === "string" ? p.timeline.trim() : "Flexible";
  const message = typeof p.message === "string" ? p.message.trim() : "";

  // Validation
  if (!name || name.length > MAX_NAME_LENGTH) {
    return NextResponse.json({ error: "Please enter your name (max 120 chars)." }, { status: 400 });
  }

  if (!email || email.length > MAX_EMAIL_LENGTH || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (company.length > MAX_COMPANY_LENGTH) {
    return NextResponse.json({ error: "Company name too long." }, { status: 400 });
  }

  if (projectType.length > MAX_OPTION_LENGTH || budget.length > MAX_OPTION_LENGTH || timeline.length > MAX_OPTION_LENGTH) {
    return NextResponse.json({ error: "Invalid project parameters." }, { status: 400 });
  }

  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: "Please describe your project (between 10 and 5000 characters)." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio Inquiry <onboarding@resend.dev>";
  const toEmail = process.env.CONTACT_TO_EMAIL || site.email;

  const emailBody = `
NEW PROJECT INQUIRY VIA USHA TELI PORTFOLIO
─────────────────────────────────────────────
From:         ${name}
Email:        ${email}
Company:      ${company || "Not specified"}
Project Type: ${projectType}
Budget Range: ${budget}
Timeline:     ${timeline}

PROJECT DESCRIPTION:
─────────────────────────────────────────────
${message}
─────────────────────────────────────────────
Received: ${new Date().toISOString()}
`.trim();

  // 1. If Resend API key is configured, attempt delivery via Resend
  if (apiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [toEmail],
          reply_to: email,
          subject: `Project Inquiry: ${projectType} from ${name}${company ? ` (${company})` : ""}`,
          text: emailBody,
        }),
      });

      if (response.ok) {
        return NextResponse.json({ sent: true, provider: "resend" });
      }

      const details = await response.text();
      console.warn(`Resend API error (${response.status}): ${details}. Falling back to FormSubmit...`);
    } catch (err) {
      console.warn("Resend fetch error, falling back to FormSubmit:", err);
    }
  }

  // 2. Direct FormSubmit delivery to destination email (ushasahu1116@gmail.com)
  try {
    const fsResponse = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(toEmail)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        _replyto: email,
        company: company || "Independent / Not specified",
        projectType,
        budget,
        timeline,
        message,
        _subject: `Portfolio Inquiry: ${projectType} from ${name}${company ? ` (${company})` : ""}`,
        _template: "table",
      }),
    });

    if (fsResponse.ok) {
      return NextResponse.json({ sent: true, provider: "formsubmit" });
    }

    const fsErr = await fsResponse.text();
    console.error(`FormSubmit error (${fsResponse.status}): ${fsErr}`);
  } catch (fsErr) {
    console.error("FormSubmit fetch error:", fsErr);
  }

  // 3. If neither provider delivered successfully, return an honest error and trigger fallback mailto
  console.log("Contact submission could not be delivered to external email provider:\n", emailBody);
  return NextResponse.json(
    {
      error: `Automated email transmission could not reach the mail server. Please click below to send directly to ${toEmail}.`,
      fallbackMailto: true,
    },
    { status: 502 }
  );
}
