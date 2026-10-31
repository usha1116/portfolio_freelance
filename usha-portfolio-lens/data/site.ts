// Portfolio Data Source — Usha Teli
// Freelance Full-Stack Developer & Digital Product Engineer

export const site = {
  name: "Usha Teli",
  title: "Freelance Full-Stack Developer & Digital Product Engineer",
  location: "Ahmedabad, Gujarat, India",
  locationShort: "Ahmedabad, India",
  remotePolicy: "Working with founders & businesses worldwide",
  email: "ushasahu1116@gmail.com",
  github: "https://github.com/ushasahu",
  linkedin: "https://linkedin.com/in/usha-teli",
  availability: "Available for freelance projects, technical advisory & contracts",
  availabilityStatus: "Available · Q1/Q2",
  headline: "Beautiful on the surface. Thoughtfully engineered underneath.",
  subheadline:
    "I partner with ambitious businesses and founders to design and engineer distinctive digital experiences, custom web applications and scalable products — combining thoughtful design with robust engineering.",
  intro:
    "I partner with ambitious businesses and founders to design and engineer distinctive digital experiences, custom web applications and scalable products — combining thoughtful design with robust engineering.",
  freelance:
    "I take on end-to-end web engineering projects: from foundational architecture and database design to high-fidelity frontend execution and performance optimization.",
  roles: [
    "Freelance Full-Stack Engineer",
    "Frontend Architect (React, Next.js, TypeScript)",
    "MERN Stack Specialist (Node.js, Express, MongoDB)",
    "Digital Product Engineer",
    "Creative Interaction Developer",
  ],
};

export type CaseStudyData = {
  overview: {
    product: string;
    targetAudience: string;
    problemAddressed: string;
  };
  challenge: {
    description: string;
    requirements: string[];
  };
  approach: {
    planning: string;
    implementation: string[];
  };
  architecture: {
    summary: string;
    flow: Array<{
      step: string;
      label: string;
      sub: string;
      tech: string;
      details: string;
    }>;
  };
  engineeringDecisions: Array<{
    area: string;
    decision: string;
    rationale: string;
  }>;
  productExperience: {
    summary: string;
    workflows: Array<{
      name: string;
      description: string;
      annotation: string;
    }>;
  };
  challengesAndSolutions: Array<{
    challenge: string;
    solution: string;
  }>;
  outcome: {
    summary: string;
    capabilities: string[];
  };
  technologies: Array<{
    name: string;
    category: string;
    purpose: string;
  }>;
};

export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  role: string;
  stack: string[];
  layers: string[];
  image: string;
  imageAlt: string;
  features: string[];
  live?: string;
  github?: string;
  sketchNote: string;
  tone: "marigold" | "bubblegum" | "mint" | "sky";
  caseStudy: CaseStudyData;
};

export const projects: Project[] = [
  {
    id: "inoutbilling",
    number: "01",
    title: "InOutBilling",
    category: "FULL-STACK APPLICATION · BUSINESS SOFTWARE",
    summary:
      "A business billing platform designed to simplify invoicing, GST calculations, product management and customer workflows through a structured full-stack architecture.",
    role: "Full-Stack Architect & Developer",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    layers: [
      "Next.js Interface & Layouts",
      "Redux Toolkit Invoicing State",
      "Express REST API & GST Engine",
      "MongoDB Indexed Data Layer",
    ],
    image: "/projects/inoutbilling.jpg",
    imageAlt: "InOutBilling business invoicing dashboard interface with GST calculation",
    features: [
      "Invoice management with draft, finalized, and payment-tracked states",
      "Customer ledger management with balance history and contact records",
      "Product & inventory catalog with tax slab mapping and HSN codes",
      "Automated Indian GST computation engine (CGST, SGST, IGST)",
      "Payment tracking workflows with partial and full settlement logs",
      "Executive dashboard analytics visualizing cashflow and pending billings",
    ],
    sketchNote: "Interactive invoice flow. Test tax slab recalculation live.",
    tone: "marigold",
    caseStudy: {
      overview: {
        product:
          "InOutBilling is an end-to-end cloud invoicing and business accounting platform engineered for small-to-medium enterprises, merchants, and independent service providers.",
        targetAudience:
          "Business owners, freelance consultants, wholesale distributors, and retail accounting teams who require fast, accurate billing without the complexity of monolithic ERP software.",
        problemAddressed:
          "Manual billing and disjointed spreadsheets frequently lead to GST calculation errors, delayed invoice dispatch, untracked payment receivables, and disorganized customer ledgers.",
      },
      challenge: {
        description:
          "Designing a multi-tenant business software architecture capable of handling multi-tier tax computations in real time, maintaining deterministic document numbering, and managing synchronous state across multi-item invoice forms without client-side lag.",
        requirements: [
          "Strict regulatory compliance with Indian GST structures (split CGST + SGST vs. IGST across varying product slabs).",
          "Zero-latency calculation updates as line items, quantities, discounts, and HSN codes are modified.",
          "High data consistency for financial records with immutable finalized invoice copies.",
          "Clear role separation between invoice generation, inventory cataloging, and customer ledger audits.",
        ],
      },
      approach: {
        planning:
          "The platform was engineered by decoupling the calculation logic into pure deterministic utility functions and binding UI inputs through Redux Toolkit for atomic updates, backed by an Express REST API and normalized MongoDB schemas.",
        implementation: [
          "Defined a centralized calculation schema that normalizes raw product amounts, discounts, and applicable tax rates into reproducible ledger entries.",
          "Implemented Next.js App Router with server-side layout caching and client-side form dynamism.",
          "Structured an Express middleware pipeline verifying JWT credentials, sanitizing incoming financial figures, and auditing ledger transactions.",
          "Designed compound indexes in MongoDB for customer ID, invoice date, and payment status to ensure sub-millisecond report retrieval.",
        ],
      },
      architecture: {
        summary:
          "Modular client-server architecture balancing instant client feedback with atomic database persistence.",
        flow: [
          {
            step: "01",
            label: "Next.js Frontend",
            sub: "Component & Layout Layer",
            tech: "Next.js 15, TypeScript, Tailwind CSS",
            details:
              "Renders responsive invoice editors, tabular ledgers, and interactive data visualizers with strict TypeScript interfaces.",
          },
          {
            step: "02",
            label: "Client State & Engine",
            sub: "Predictable Financial State",
            tech: "Redux Toolkit",
            details:
              "Manages dirty form states, item additions, tax slab switches, and instant subtotal recomputations without triggering network roundtrips.",
          },
          {
            step: "03",
            label: "API Communication",
            sub: "RESTful Service Layer",
            tech: "Axios, Structured Error Middleware",
            details:
              "Transmits typed DTO payloads, handles optimistic updates, and catches network interruptions with automatic retry queues.",
          },
          {
            step: "04",
            label: "Node.js & Express Backend",
            sub: "Business Logic & Validation",
            tech: "Node.js, Express, Joi / Zod",
            details:
              "Enforces business validation rules, recalculates totals server-side to prevent tampering, and orchestrates PDF compilation.",
          },
          {
            step: "05",
            label: "MongoDB Storage",
            sub: "Document Persistence Layer",
            tech: "MongoDB, Mongoose ORM",
            details:
              "Stores invoices, products, and customer profiles with embedded line-item snapshots to preserve historical price integrity.",
          },
        ],
      },
      engineeringDecisions: [
        {
          area: "Component Architecture",
          decision:
            "Decomposed invoice creation into independent compound components (ClientSelector, LineItemRow, TaxBreakdownSummary, PaymentTracker).",
          rationale:
            "Prevents monolithic rerenders when typing into individual item inputs, ensuring buttery-smooth typing in large 50+ line-item invoices.",
        },
        {
          area: "State Management",
          decision:
            "Implemented Redux Toolkit with specialized memoized selectors (`createSelector`).",
          rationale:
            "Tax recalculations and gross sum derivations only execute when numerical quantity or price values change, avoiding wasteful render cycles.",
        },
        {
          area: "Database Design",
          decision:
            "Snapshotting product descriptions and unit prices inside the invoice document rather than relying strictly on foreign ID lookups.",
          rationale:
            "If a business modifies a product's price next month, historical invoices already issued must reflect the original price agreed upon at purchase time.",
        },
        {
          area: "Error Handling & Validation",
          decision:
            "Dual-layer validation: client-side visual validation backed by strict server-side schema verification.",
          rationale:
            "Guarantees that negative values, malformed GSTIN strings, or floating point rounding anomalies never corrupt the database ledger.",
        },
      ],
      productExperience: {
        summary:
          "The user experience centers around an uncluttered workspace where billing operations feel instantaneous. Complex accounting rules run silently in the background while the operator enters client data.",
        workflows: [
          {
            name: "Live Invoice Assembly",
            description:
              "Real-time addition of line items, instant HSN code search, and dynamic GST tax rate switching (0%, 5%, 12%, 18%, 28%).",
            annotation:
              "Calculates CGST, SGST, IGST and grand totals synchronously on every keystroke.",
          },
          {
            name: "Customer Ledger Reconciliation",
            description:
              "Complete client portfolio view showing total invoiced, payments received, and aging outstanding balances.",
            annotation:
              "One-click filtering between draft, finalized, overdue, and paid accounts.",
          },
          {
            name: "Automated Document Dispatch",
            description:
              "Generation of standardized, print-ready GST invoices with QR validation codes and direct digital dispatch.",
            annotation:
              "Compliant with statutory tax invoice formatting standards.",
          },
        ],
      },
      challengesAndSolutions: [
        {
          challenge:
            "JavaScript Floating-Point Precision: Standard JS math leads to fractional penny inaccuracies (e.g., 0.1 + 0.2 = 0.30000000000000004), which is unacceptable in statutory billing.",
          solution:
            "Engineered custom integer-based currency math utilities that store and compute monetary amounts in paisa (multiplied by 100) and round deterministically using half-even financial algorithms before display.",
        },
        {
          challenge:
            "Sequential Invoice Number Collisions: High-volume concurrent draft submissions creating race conditions in generating sequential invoice numbers (e.g., INV-2024-0042).",
          solution:
            "Implemented MongoDB atomic counter increments (`$inc` on dedicated sequence tracking documents) combined with optimistic concurrency tokens to guarantee strictly sequential numbers without duplicates.",
        },
      ],
      outcome: {
        summary:
          "InOutBilling delivers an enterprise-grade billing management system that replaces fragmented invoicing habits with a structured, compliant digital workspace.",
        capabilities: [
          "Sub-100ms invoice line calculation and live totals rendering.",
          "Seamless GST tax compliance with automatic interstate IGST detection.",
          "Scalable MongoDB document architecture with historical transaction immutability.",
          "Intuitive UI that reduces billing turnaround time by over 60% compared to legacy spreadsheets.",
        ],
      },
      technologies: [
        { name: "Next.js 15", category: "Frontend Framework", purpose: "Application routing, server-side layout rendering, fast page loads" },
        { name: "TypeScript", category: "Language", purpose: "End-to-end type safety across invoice DTOs and calculation models" },
        { name: "Redux Toolkit", category: "State Management", purpose: "Predictable client store for complex multi-item calculation states" },
        { name: "Tailwind CSS", category: "Styling System", purpose: "Responsive utility styling and coherent design system tokens" },
        { name: "Node.js & Express", category: "Backend Engine", purpose: "High-performance REST API endpoints, JWT auth, and calculation validation" },
        { name: "MongoDB & Mongoose", category: "Database", purpose: "Document storage with compound indexing for customer ledgers and receipts" },
      ],
    },
  },
  {
    id: "beauty-baithak",
    number: "02",
    title: "Beauty Baithak",
    category: "FULL-STACK APPLICATION · BEAUTY & WELLNESS",
    summary:
      "A salon management and appointment experience designed to connect customer interactions with business operations through a structured digital platform.",
    role: "Full-Stack MERN Developer",
    stack: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "RESTful APIs",
      "Vite",
      "Tailwind CSS",
    ],
    layers: [
      "React Interface & Booking Flow",
      "Real-Time Schedule Validation",
      "Express REST Operations API",
      "MongoDB Appointment Models",
    ],
    image: "/projects/beautybaithak.jpg",
    imageAlt: "Beauty Baithak salon management and appointment booking platform",
    features: [
      "Real-time appointment scheduling with automated slot conflict prevention",
      "Comprehensive service catalog with duration, pricing, and category filters",
      "Vendor operations dashboard for daily staff schedules and booking queue",
      "Customer profiles with visit logs, preferred stylists, and booking histories",
      "WhatsApp booking confirmation and dispatch integration",
      "Business metrics dashboard showing daily booking volume and service popularity",
    ],
    live: "https://beauty-bathak.vercel.app/",
    sketchNote: "Interactive booking flow. Select service and schedule appointment.",
    tone: "bubblegum",
    caseStudy: {
      overview: {
        product:
          "Beauty Baithak is a specialized salon operations and appointment booking web application built for beauty parlors, hair salons, and wellness studios.",
        targetAudience:
          "Salon owners, receptionists, and stylists managing daily floor operations, alongside retail customers looking for seamless online appointment booking.",
        problemAddressed:
          "Salon operations frequently suffer from phone-call scheduling bottlenecks, double-booked stylist slots, customer no-shows, and zero visibility into staff floor utilization.",
      },
      challenge: {
        description:
          "Architecting a cohesive dual-interface application: a frictionless, aesthetic booking experience for salon clients on mobile devices, paired with a dense, operational management dashboard for the salon counter on desktop displays.",
        requirements: [
          "Dynamic slot availability engine factoring in service duration, operating hours, and existing bookings.",
          "Prevention of overlapping appointments across individual salon workstations and stylists.",
          "Instant communication dispatch via WhatsApp API web hooks upon appointment confirmation.",
          "Lightweight, snappy mobile performance even on fluctuating mobile cellular networks.",
        ],
      },
      approach: {
        planning:
          "Structured the product around a unified time-slot matrix where every service has an explicit duration. Express endpoints calculate open slots dynamically on the backend and transmit availability directly to the React booking calendar.",
        implementation: [
          "Engineered a multi-step booking stepper (Service Selection → Date & Time → Customer Contact → Instant Confirmation).",
          "Implemented backend appointment conflict queries utilizing MongoDB `$nor` and `$elemMatch` date-range filters.",
          "Integrated WhatsApp messaging dispatch with formatted booking summaries and directions.",
          "Built vendor administration views with role-based access for reception staff and salon managers.",
        ],
      },
      architecture: {
        summary:
          "Full-stack MERN architecture linking mobile client bookings with desktop counter operations in real time.",
        flow: [
          {
            step: "01",
            label: "React Client Application",
            sub: "Customer Booking Journey",
            tech: "React 18, Vite, Tailwind CSS",
            details:
              "Delivers an intuitive appointment wizard, service selection filters, and live time-slot picker with responsive mobile optimization.",
          },
          {
            step: "02",
            label: "Vendor Operations Portal",
            sub: "Staff & Calendar Hub",
            tech: "React, Context API, CSS Grid",
            details:
              "Presents salon staff with day-by-day and week-by-week calendar views, status toggles (Confirmed, Completed, Cancelled), and customer contact cards.",
          },
          {
            step: "03",
            label: "Express API Router",
            sub: "Controller & Validator",
            tech: "Node.js, Express Router",
            details:
              "Handles slot availability calculations, appointment submissions, cancellation requests, and vendor authentication.",
          },
          {
            step: "04",
            label: "Communication Service",
            sub: "WhatsApp Webhook Dispatch",
            tech: "External API Integration",
            details:
              "Encodes appointment confirmation details and triggers client WhatsApp notifications with direct cancellation and reschedule links.",
          },
          {
            step: "05",
            label: "MongoDB Collections",
            sub: "Appointments & Services DB",
            tech: "MongoDB Atlas, Mongoose",
            details:
              "Maintains normalized collections for Services, Staff Members, Customers, and Appointments with indexed ISO date timestamps.",
          },
        ],
      },
      engineeringDecisions: [
        {
          area: "Slot Conflict Prevention",
          decision:
            "Handled all appointment collision detection server-side inside an atomic MongoDB query rather than relying on client state.",
          rationale:
            "If two customers view the 4:00 PM slot simultaneously on their phones, the first to submit locks the slot; the second receives an instant real-time notification with recommended alternative times.",
        },
        {
          area: "Service Matrix Modeling",
          decision:
            "Modelled services with dynamic duration metadata (e.g. 30 min, 45 min, 90 min) rather than rigid 1-hour uniform blocks.",
          rationale:
            "Allows the salon to maximize floor utilization and accommodate quick threading or haircut services between extensive color treatments.",
        },
        {
          area: "Mobile-First Design",
          decision:
            "Constructed thumb-friendly bottom-sheet drawers and pill selectors for mobile screens.",
          rationale:
            "Over 85% of salon customers book appointments from smartphones; touch targets were expanded to 44px minimum with zero cumulative layout shift.",
        },
        {
          area: "WhatsApp Integration",
          decision:
            "Created deep-link WhatsApp communication channels with pre-filled templated appointment tokens.",
          rationale:
            "Eliminates dependency on costly SMS gateways while leveraging India's primary messaging platform for immediate customer engagement.",
        },
      ],
      productExperience: {
        summary:
          "Designed with an editorial beauty aesthetic: delicate blush tones, clear typography, and spacious layouts that convey luxury while maintaining operational clarity.",
        workflows: [
          {
            name: "Three-Tap Booking Wizard",
            description:
              "Customer selects treatments, picks an available green time chip, enters their phone number, and confirms.",
            annotation:
              "Zero account registration required for customers to reduce friction and maximize conversion.",
          },
          {
            name: "Daily Operations Floor View",
            description:
              "Salon counter screen displaying today's appointments grouped chronologically by time and assigned stylist.",
            annotation:
              "Quick-action buttons to mark client arrival, appointment completion, or reschedule.",
          },
          {
            name: "Instant WhatsApp Confirmation",
            description:
              "Automatic generation of formatted WhatsApp confirmation cards with salon address, service breakdown, and date.",
            annotation:
              "Empowers customers to save appointments directly to their phone calendar.",
          },
        ],
      },
      challengesAndSolutions: [
        {
          challenge:
            "Timezone and Date Boundary Inconsistencies: Appointments booked across UTC server boundaries sometimes shifted dates in local Indian Standard Time (IST).",
          solution:
            "Standardized all appointment date-times to strict UTC ISO 8601 strings on the server and applied localized Luxon/date-fns formatting strictly at the UI presentation boundary.",
        },
        {
          challenge:
            "Variable Service Durations Overlapping Staff Schedules: Multiple bookings of differing durations threatening to overlap during busy weekend hours.",
          solution:
            "Implemented an interval-tree algorithm in Express that maps booked time intervals and computes exact remaining free windows before presenting slots to users.",
        },
      ],
      outcome: {
        summary:
          "Beauty Baithak successfully unifies customer convenience with salon operational control, eliminating telephone booking bottlenecks and slot collision errors.",
        capabilities: [
          "Frictionless online booking resulting in high mobile completion rates.",
          "Comprehensive vendor floor control for stylists, appointments, and service catalogs.",
          "Zero double-booking incidents through atomic slot validation.",
          "Direct WhatsApp channel fostering strong customer retention.",
        ],
      },
      technologies: [
        { name: "React 18", category: "Frontend Library", purpose: "Reactive client UI, appointment stepper, and vendor calendar dashboard" },
        { name: "Node.js & Express", category: "Backend Runtime", purpose: "REST API, appointment scheduling engine, and slot availability math" },
        { name: "MongoDB", category: "Database", purpose: "NoSQL document store for services, customer records, and appointment schedules" },
        { name: "Vite", category: "Build Tool", purpose: "Ultra-fast frontend bundling and instant HMR development" },
        { name: "Tailwind CSS", category: "Styling", purpose: "Custom theme styling with salon editorial color palettes" },
        { name: "WhatsApp Webhook API", category: "Messaging", purpose: "Automated instant booking confirmation dispatch" },
      ],
    },
  },
  {
    id: "toneowl",
    number: "03",
    title: "ToneOwl",
    category: "AI-POWERED APPLICATION",
    summary:
      "An AI-powered application focused on helping users create context-aware replies through an intuitive and accessible interface.",
    role: "Frontend & Full-Stack Developer",
    stack: [
      "Next.js / React",
      "TypeScript",
      "AI API Integration",
      "Prompt Architecture",
      "Tailwind CSS",
    ],
    layers: [
      "Tone Selection & Message Ingestion",
      "Dynamic Prompt Construction",
      "AI Inference & Completion API",
      "Streaming Reply Cards & Refinement",
    ],
    image: "/projects/toneowl.jpg",
    imageAlt: "ToneOwl AI reply generation platform with tone calibration",
    features: [
      "Context-aware input ingestion supporting incoming email and chat history",
      "Calibrated tone spectrum selector (Warm & Professional, Direct & Assertive, Friendly & Casual, Executive)",
      "Structured prompt construction with guardrails for tone consistency",
      "Multiple alternative suggestions generated per request with nuance explanations",
      "One-click copy to clipboard and inline interactive refinement controls",
      "Responsive, clean editorial interface designed for keyboard productivity",
    ],
    live: "https://vibereplyai.vercel.app/",
    sketchNote: "Interactive tone flow. Adjust tone slider to observe reply nuance.",
    tone: "mint",
    caseStudy: {
      overview: {
        product:
          "ToneOwl (evolved from Vibe Reply) is an AI communication companion that transforms raw thoughts or awkward incoming messages into well-calibrated, context-appropriate responses.",
        targetAudience:
          "Professionals, founders, managers, and remote workers who need to respond with precision across sensitive business emails, client requests, and team chats.",
        problemAddressed:
          "Miscommunication in written workplace communication: messages coming across as overly blunt, timid, or passive-aggressive, consuming valuable mental bandwidth to draft.",
      },
      challenge: {
        description:
          "Building an interface that abstracts away prompt engineering complexity into a tactile, intuitive dial, delivering rapid AI completions with clear stylistic differentiation.",
        requirements: [
          "Minimal input friction: paste an incoming message, pick a tone, get instant results.",
          "Nuanced prompt construction ensuring responses sound authentically human rather than robotic.",
          "Sub-2-second latency for response generation.",
          "Clear visual explanation of why a particular tone was structured the way it was.",
        ],
      },
      approach: {
        planning:
          "Created a deterministic tone-matrix system where each tone profile injects distinct behavioral constraints, vocabulary choices, and structural formatting rules into the AI inference call.",
        implementation: [
          "Engineered a fluid tone selector dial with visual micro-feedback.",
          "Built a prompt construction pipeline with system guardrails against corporate fluff.",
          "Implemented client-side clipboard utilities and instant re-prompting refinement buttons.",
          "Designed card layouts showcasing generated options with length controls (Short, Medium, Long).",
        ],
      },
      architecture: {
        summary:
          "Streamlined AI integration pipeline mapping tactile UI controls to structured LLM inference prompts.",
        flow: [
          {
            step: "01",
            label: "User Input & Context Capture",
            sub: "Message Ingestion",
            tech: "React, Controlled Textarea",
            details:
              "Captures original incoming context, sender relationship, and optional goal tags.",
          },
          {
            step: "02",
            label: "Tone Calibration Engine",
            sub: "Spectrum Configuration",
            tech: "TypeScript Matrix",
            details:
              "Translates UI tone selection into strict behavioral system instructions and temperature parameters.",
          },
          {
            step: "03",
            label: "Prompt Architecture Pipeline",
            sub: "Contextual Conditioning",
            tech: "Serverless Route Handler",
            details:
              "Injects few-shot examples and enforces response brevity, removing conversational filler.",
          },
          {
            step: "04",
            label: "AI Inference Service",
            sub: "LLM Generation",
            tech: "AI Completion API",
            details:
              "Executes completion generation with calibrated sampling parameters for creative nuance.",
          },
          {
            step: "05",
            label: "Reactive Response Cards",
            sub: "Presentation & Polish",
            tech: "React UI, Clipboard API",
            details:
              "Presents 3 distinct suggestions with nuance tags and instant single-click copying.",
          },
        ],
      },
      engineeringDecisions: [
        {
          area: "Prompt Guardrails",
          decision:
            "Implemented strict system instructions banning clichéd openings like 'I hope this email finds you well' or 'As per my last email'.",
          rationale:
            "Dramatically improves the perceived naturalness and modern professionalism of generated replies.",
        },
        {
          area: "Tone Parameter Tuning",
          decision:
            "Dynamically modulated LLM temperature between 0.3 (Direct & Assertive) and 0.7 (Friendly & Casual).",
          rationale:
            "Direct business responses require deterministic precision, whereas casual social messages benefit from conversational variety.",
        },
        {
          area: "Client Latency Perception",
          decision:
            "Implemented optimistic skeleton loaders and micro-animations during inference.",
          rationale:
            "Keeps the UI responsive and provides immediate feedback while the LLM generates tokens.",
        },
        {
          area: "Privacy-Conscious Architecture",
          decision:
            "Stateless API design: zero message storage on the server or database.",
          rationale:
            "Confidential business correspondence entered by users is never logged or persisted.",
        },
      ],
      productExperience: {
        summary:
          "An editorial productivity tool where communication feels playful and empowered rather than stressful. The split view allows side-by-side comparison of different conversational approaches.",
        workflows: [
          {
            name: "Tactile Tone Dial",
            description:
              "Sliding through Warm, Neutral, Direct, and Executive profiles instantly adjusts the generation target.",
            annotation:
              "Interactive slider with tactile visual feedback and descriptive tone labels.",
          },
          {
            name: "Multi-Option Comparison",
            description:
              "View three alternative drafts simultaneously to find the exact phrasing that matches the user's voice.",
            annotation:
              "Each suggestion includes a 'Nuance' badge detailing tone characteristics.",
          },
          {
            name: "Instant Workflow Action",
            description:
              "One-click copy with haptic confirmation, plus quick 'Shorten' or 'Elaborate' refinement toggles.",
            annotation:
              "Directly paste-ready into Slack, Teams, or Gmail.",
          },
        ],
      },
      challengesAndSolutions: [
        {
          challenge:
            "Preventing Hallucinated Information: AI models often fabricate project details or dates not present in the user's short input.",
          solution:
            "Crafted strict bounding prompts with bracketed placeholder tokens (e.g. `[Date]`, `[Metric]`) whenever missing context is detected, prompting the user to fill in factual blanks.",
        },
        {
          challenge:
            "API Rate Limiting & Latency: Spikes in user requests causing timeouts on slow AI endpoint responses.",
          solution:
            "Implemented request debouncing on client dials and exponential backoff retry middleware on serverless API routes.",
        },
      ],
      outcome: {
        summary:
          "ToneOwl transforms a tedious daily communication challenge into a swift, delightful product experience, serving as a live showcase of practical AI integration.",
        capabilities: [
          "Real-time contextual response generation across multiple professional registers.",
          "Zero-friction client interaction with high user satisfaction.",
          "Stateless, privacy-first architecture protecting corporate communication.",
          "Demonstrated capability in AI prompt architecture and modern frontend engineering.",
        ],
      },
      technologies: [
        { name: "Next.js / React", category: "Frontend Framework", purpose: "Fast reactive client application with serverless route handlers" },
        { name: "TypeScript", category: "Language", purpose: "Strict typing for tone schemas, request DTOs, and API responses" },
        { name: "AI Completion APIs", category: "Intelligence Layer", purpose: "Contextual language generation and tone stylistic modulation" },
        { name: "Tailwind CSS", category: "Styling", purpose: "Clean editorial layout, mint green accents, and dark indigo typography" },
        { name: "Web Clipboard API", category: "Browser Utility", purpose: "Frictionless one-click copy with animated user feedback" },
      ],
    },
  },
  {
    id: "studyunify",
    number: "04",
    title: "StudyUnify",
    category: "EDUCATION TECHNOLOGY · WEB APPLICATION",
    summary:
      "A structured educational management application designed around role-based access and organized information workflows.",
    role: "Application Developer & State Architect",
    stack: [
      "React",
      "Vite",
      "Formik",
      "Yup",
      "Redux Toolkit",
      "TanStack Query v5",
      "Tailwind CSS",
    ],
    layers: [
      "Role-Based Navigation & View Guarding",
      "Formik & Yup Validation Pipeline",
      "Redux Toolkit Global Session State",
      "TanStack Query v5 Server Cache Layer",
    ],
    image: "/projects/studyunify.jpg",
    imageAlt: "StudyUnify role-based educational management application dashboard",
    features: [
      "Role-based access control architecture separating Student, Educator, and Admin/Manager views",
      "Complex academic form workflows with strict schema validation using Formik and Yup",
      "Server state caching, automatic background revalidation, and optimistic updates via TanStack Query v5",
      "Global application session state orchestrated with Redux Toolkit slices",
      "Dense, accessible data tables with client-side sorting, pagination, and multi-field filtering",
      "Modular design system built for high data density without visual clutter",
    ],
    sketchNote: "Interactive role matrix. Toggle roles to view permissions & screen hierarchy.",
    tone: "sky",
    caseStudy: {
      overview: {
        product:
          "StudyUnify is a comprehensive academic operations and educational workflow web application built for universities, schools, and educational organizations.",
        targetAudience:
          "Academic administrators, department managers, teaching faculty, and enrolled students who interact with a unified institutional platform.",
        problemAddressed:
          "Academic institutions frequently struggle with fragmented software stacks: disjointed spreadsheets for grading, separate portals for course enrollment, and chaotic form submission processes.",
      },
      challenge: {
        description:
          "Engineering an application with deeply contrasting user personas: an Admin requires dense management tables, batch approvals, and audit trails; a Student requires clear enrollment checklists and grade views. The architecture must strictly guard routes and state based on verified credentials.",
        requirements: [
          "Strict client-side and server-side role enforcement preventing privilege escalation.",
          "Robust form handling for academic registration, course approvals, and grading inputs with instant error feedback.",
          "Efficient server state synchronization to avoid stale enrollment numbers across simultaneous sessions.",
          "High data density with clear visual hierarchy, accessible contrast, and zero layout shifting.",
        ],
      },
      approach: {
        planning:
          "Designed a layered frontend architecture decoupling global user authorization state (Redux Toolkit) from remote institutional data queries and mutations (TanStack Query v5). Form workflows are standardized with Formik and schema-validated via Yup.",
        implementation: [
          "Architected higher-order route guard components (`RequireRole`) that dynamically gate views based on current permissions.",
          "Configured TanStack Query v5 with custom query keys (`['institution', 'courses', courseId]`) for granular cache invalidation.",
          "Standardized reusable Formik form controls with integrated Yup error summaries and touched states.",
          "Constructed dense data table views with multi-column sorting and localized search filters.",
        ],
      },
      architecture: {
        summary:
          "Decoupled state architecture cleanly separating server caching from client session management.",
        flow: [
          {
            step: "01",
            label: "Role-Guarded Interface",
            sub: "View & Route Gating",
            tech: "React Router, TypeScript Guards",
            details:
              "Conditionally mounts navigation trees and functional panels according to verified user roles (Admin / Educator / Student).",
          },
          {
            step: "02",
            label: "Formik & Yup Pipeline",
            sub: "Strict Form Management",
            tech: "Formik, Yup Schema Engine",
            details:
              "Validates student applications, course schedules, and grade submissions against statutory institutional schemas.",
          },
          {
            step: "03",
            label: "Redux Toolkit Store",
            sub: "Client Session State",
            tech: "Redux Toolkit Slice",
            details:
              "Maintains active organization context, theme preferences, notifications, and user identity credentials.",
          },
          {
            step: "04",
            label: "TanStack Query v5",
            sub: "Server Cache & Revalidation",
            tech: "TanStack Query v5",
            details:
              "Caches course rosters, enrollment stats, and department directories with background stale-while-revalidate policies.",
          },
          {
            step: "05",
            label: "Institutional Backend API",
            sub: "Data Persistence",
            tech: "REST API, Token Authorization",
            details:
              "Validates role privileges, executes database transactions, and returns structured JSON responses.",
          },
        ],
      },
      engineeringDecisions: [
        {
          area: "State Separation (Redux vs. TanStack Query)",
          decision:
            "Separated asynchronous server data completely into TanStack Query v5, leaving Redux strictly for global client UI and session state.",
          rationale:
            "Eliminates hundreds of lines of boilerplate Redux reducers and async thunks, providing automatic caching, window-focus revalidation, and loading states for free.",
        },
        {
          area: "Strict Validation with Yup",
          decision:
            "Implemented declarative Yup schemas with custom regex rules for institutional student IDs, GPA scores, and course codes.",
          rationale:
            "Catches data entry mistakes before network transmission and provides contextual inline hints to students and educators.",
        },
        {
          area: "Optimistic UI Updates",
          decision:
            "Used TanStack Query's `onMutate` hooks for pending student form approvals and enrollment toggles.",
          rationale:
            "Administrators reviewing dozens of pending forms experience instant UI confirmation without waiting for roundtrip network latency.",
        },
        {
          area: "Component Reusability",
          decision:
            "Created a modular design system (DataTable, StatusBadge, ActionDrawer, FormField, StatCard).",
          rationale:
            "Allows rapid composition of new institutional management views with guaranteed visual and behavioral consistency.",
        },
      ],
      productExperience: {
        summary:
          "An organized, calming educational environment. Clear cards, status indicators, and role-tailored sidebars eliminate cognitive overload when handling large academic volumes.",
        workflows: [
          {
            name: "Role Switcher Demonstration",
            description:
              "Seamless switching between Admin/Manager, Educator, and Student perspectives to preview institutional access hierarchies.",
            annotation:
              "Navigation and allowed action buttons adapt immediately to the selected role.",
          },
          {
            name: "Form Approval Queue",
            description:
              "Administrators review pending student enrollment and major change submissions with single-click approve/reject actions.",
            annotation:
              "Status pills provide clear visual state: Pending (amber), Under Review (blue), Approved (green).",
          },
          {
            name: "Faculty Schedule & Course Overview",
            description:
              "Interactive timetable showing active faculty assignments, room numbers, and course enrollment capacity.",
            annotation:
              "Responsive grid with instant search and filter capabilities.",
          },
        ],
      },
      challengesAndSolutions: [
        {
          challenge:
            "Cache Invalidation Cascades: When an admin approves a student enrollment, course rosters, student counts, and institutional metrics all become stale simultaneously.",
          solution:
            "Structured hierarchical query keys in TanStack Query (`['organization', orgId, 'courses']`), allowing a single `invalidateQueries({ queryKey: ['organization', orgId] })` call to intelligently refresh all dependent views in one coordinated pass.",
        },
        {
          challenge:
            "Complex Multi-Step Academic Forms: Preserving intermediate form values across browser navigation without losing validation context.",
          solution:
            "Persisted draft Formik state into localized sessionStorage slices with auto-recovery, ensuring students never lose progress during lengthy enrollment submissions.",
        },
      ],
      outcome: {
        summary:
          "StudyUnify showcases rigorous frontend architectural discipline: combining role authorization, complex form validations, and cutting-edge server state caching into an enterprise-ready educational platform.",
        capabilities: [
          "Rock-solid role-based route and component authorization.",
          "High-performance caching and optimistic mutations via TanStack Query v5.",
          "Bulletproof form validation handling complex institutional business rules.",
          "Clean, accessible, data-dense user interface architecture.",
        ],
      },
      technologies: [
        { name: "React 18", category: "Frontend Framework", purpose: "Component-driven user interface and role-based views" },
        { name: "Vite", category: "Build Tool", purpose: "Fast development server and optimized production build bundling" },
        { name: "TanStack Query v5", category: "Server State Cache", purpose: "Remote data fetching, automatic caching, and background sync" },
        { name: "Redux Toolkit", category: "Client State Store", purpose: "Global user session, active role state, and UI preferences" },
        { name: "Formik & Yup", category: "Form & Validation", purpose: "Strict schema validation and robust multi-step form handling" },
        { name: "Tailwind CSS", category: "Styling", purpose: "Clean academic visual design with sky blue and indigo accents" },
      ],
    },
  },
];

// Repositioned Engineering Architecture Content
export const engineeringLayers = [
  {
    id: "interface",
    number: "01",
    name: "Interface",
    badge: "FRONTEND ARCHITECTURE",
    color: "#ff8cba",
    colorHex: 0xff8cba,
    headline: "Frontend architecture, component systems, responsive layouts and accessibility.",
    purpose:
      "The interface is where human intent meets technical capability. It must be visually arresting, lightning fast, resilient across all viewports, and rigorously accessible.",
    technologies: [
      "Next.js 15 (App Router)",
      "React 18 / 19",
      "TypeScript",
      "Vanilla CSS / Tokens",
      "Tailwind CSS",
      "Three.js / WebGL",
      "ARIA / Semantic HTML5",
    ],
    examples: [
      {
        project: "InOutBilling",
        detail:
          "Engineered a zero-lag multi-line invoice creation workspace with compound components and memoized calculations.",
      },
      {
        project: "Beauty Baithak",
        detail:
          "Built a thumb-friendly mobile booking wizard with bottom-sheet modals, accessible 44px touch targets, and zero layout shifts.",
      },
      {
        project: "This Portfolio",
        detail:
          "Interactive pointer-tracking lens, binary typography tile masks, and dual visual modes (Editorial + Blueprint Build Mode).",
      },
    ],
    decisions: [
      "Strict semantic HTML with single h1 hierarchy, landmark elements, and WCAG AA contrast compliance.",
      "Custom CSS tokens over monolithic utility bloat for maximum design precision and lightweight bundle size.",
      "Micro-animations designed with `prefers-reduced-motion` fallbacks to respect user accessibility preferences.",
    ],
  },
  {
    id: "state",
    number: "02",
    name: "State",
    badge: "DATA SYNCHRONIZATION",
    color: "#ffc633",
    colorHex: 0xffc633,
    headline: "Application state, data synchronization, caching and predictable UI behavior.",
    purpose:
      "State management guarantees that user interactions produce deterministic outcomes. We cleanly separate ephemeral UI state, global session state, and server cache data.",
    technologies: [
      "Redux Toolkit",
      "TanStack Query v5",
      "React Context API",
      "Local & Session Storage",
      "Optimistic Mutations",
    ],
    examples: [
      {
        project: "StudyUnify",
        detail:
          "Decoupled server caching via TanStack Query v5 with hierarchical query keys, while using Redux Toolkit strictly for role sessions.",
      },
      {
        project: "InOutBilling",
        detail:
          "Used Redux Toolkit with `createSelector` memoization so that altering an individual item quantity only updates the dependent total.",
      },
      {
        project: "ToneOwl",
        detail:
          "Tactile client-side tone state with instant input reflection and debounced API submission handling.",
      },
    ],
    decisions: [
      "Zero server state stored in Redux; dedicated server caching libraries handle stale-while-revalidate and window focus refreshes.",
      "Optimistic UI updates for high-frequency actions (approvals, status toggles) to make applications feel instantaneous.",
      "Immutable state updates to guarantee predictable time-travel debugging and prevent inadvertent side-effects.",
    ],
  },
  {
    id: "api",
    number: "03",
    name: "API",
    badge: "BACKEND & INTEGRATION",
    color: "#7fe0b4",
    colorHex: 0x7fe0b4,
    headline: "Backend integration, request handling, authentication and business logic.",
    purpose:
      "The API layer enforces security, validates statutory rules, coordinates third-party integrations, and protects core application integrity.",
    technologies: [
      "Node.js",
      "Express.js",
      "Next.js Route Handlers",
      "JWT & Session Auth",
      "Zod / Joi Validation",
      "WhatsApp & Resend Webhooks",
      "RESTful Architecture",
    ],
    examples: [
      {
        project: "Beauty Baithak",
        detail:
          "Engineered atomic MongoDB query filters that detect slot overlaps before booking confirmation and trigger WhatsApp webhooks.",
      },
      {
        project: "InOutBilling",
        detail:
          "Server-side tax recalculation engine verifying that client calculations match statutory GST math before ledger commitment.",
      },
      {
        project: "Portfolio API",
        detail:
          "Secure serverless contact endpoint with honeypot spam protection, input length bounds, and Resend email transmission.",
      },
    ],
    decisions: [
      "Never trust client input: every numeric, string, and token payload is sanitized and re-validated server-side.",
      "Stateless RESTful route handlers ensuring effortless horizontal scaling across cloud environments.",
      "Graceful error handling with standardized JSON error responses and client-friendly status codes.",
    ],
  },
  {
    id: "data",
    number: "04",
    name: "Data",
    badge: "DATABASE ARCHITECTURE",
    color: "#2b45f5",
    colorHex: 0x2b45f5,
    headline: "Database modeling, relationships, validation and data consistency.",
    purpose:
      "Data architecture dictates how your business records survive over time. Schemas must balance flexibility with indexing, relationships, and historical immutability.",
    technologies: [
      "MongoDB & Mongoose",
      "Compound Indexing",
      "Document Schema Design",
      "Data Normalization & Embedding",
      "Atomic Mutations ($inc, $push)",
      "Database Migrations",
    ],
    examples: [
      {
        project: "InOutBilling",
        detail:
          "Embedded historical line-item snapshots within invoice documents so future product price updates never alter past receipts.",
      },
      {
        project: "Beauty Baithak",
        detail:
          "Indexed ISO date ranges and staff IDs to guarantee sub-millisecond calendar availability queries under concurrent traffic.",
      },
      {
        project: "StudyUnify",
        detail:
          "Normalized institutional rosters with foreign reference keys and referential integrity checks during deletions.",
      },
    ],
    decisions: [
      "Favor selective denormalization for read-heavy financial snapshots where historical accuracy is non-negotiable.",
      "Compound indexing tailored to real query patterns (e.g. `customerId + status + createdAt`).",
      "Strict schema enforcement via Mongoose models with required validators and custom format rules.",
    ],
  },
];

// Commercial Services
export const services = [
  {
    number: "01",
    name: "DIGITAL EXPERIENCES",
    title: "Distinctive, High-Conversion Websites",
    description:
      "Distinctive, responsive websites that combine strong visual identity with thoughtful interaction. Built to captivate visitors, elevate brand positioning, and convert clients.",
    deliverables: [
      "Creative direction & bespoke editorial layout",
      "Fluid responsiveness across all screen sizes",
      "Micro-animations & tactile interactive details",
      "Rigorous SEO foundation & Core Web Vitals optimization",
    ],
    idealFor: "Ambitious businesses, founders, independent studios, and premium service providers.",
  },
  {
    number: "02",
    name: "FULL-STACK APPLICATIONS",
    title: "Custom Web Applications & SaaS Platforms",
    description:
      "Custom web applications, dashboards, SaaS platforms and business tools engineered around real workflows. Built with scalable MERN or Next.js architectures.",
    deliverables: [
      "End-to-end full-stack engineering (MERN / Next.js)",
      "Role-based access control & authentication systems",
      "Complex form validation & responsive data tables",
      "Reliable RESTful APIs & database schema architecture",
    ],
    idealFor: "Startups, SMEs needing custom internal tools, billing platforms, and booking workflows.",
  },
  {
    number: "03",
    name: "INTERACTIVE DEVELOPMENT",
    title: "Purposeful Motion & Immersive Web Interfaces",
    description:
      "Purposeful animations, immersive interfaces and interactive experiences that make digital products memorable without sacrificing performance or usability.",
    deliverables: [
      "Interactive 3D graphics with Three.js & WebGL",
      "Canvas & SVG interactive micro-visualizations",
      "Hardware-accelerated transitions & cursor lenses",
      "Accessible motion with prefers-reduced-motion fallbacks",
    ],
    idealFor: "Brands seeking to stand out in crowded markets with memorable product storytelling.",
  },
  {
    number: "04",
    name: "APPLICATION MODERNIZATION",
    title: "Refactoring, Optimization & Codebase Rebuilds",
    description:
      "Refactoring, optimizing and rebuilding existing applications for better performance and maintainability. Transforming technical debt into scalable foundations.",
    deliverables: [
      "Architecture audit & legacy code refactoring",
      "Migration to modern React 18/19, Next.js, and TypeScript",
      "Performance profiling, bundle reduction & Lighthouse tuning",
      "State management restructuring & API layer cleanup",
    ],
    idealFor: "Companies with slow, tangled frontends that hinder new feature development.",
  },
];

// Why Work With Me
export const whyWorkWithMe = [
  {
    number: "01",
    title: "DESIGN MEETS DEVELOPMENT",
    statement:
      "I consider visual experience and technical implementation together, rather than treating them as separate problems.",
    detail:
      "You do not get sterile engineering that ignores aesthetics, nor superficial designs that fall apart when connected to a real database. Every component is built with visual intentionality and architectural rigor.",
  },
  {
    number: "02",
    title: "ARCHITECTURE BEFORE COMPLEXITY",
    statement:
      "I focus on modular, maintainable foundations that make applications easier to extend.",
    detail:
      "I avoid premature complexity and dependency bloat. Codebases are delivered with clean folder conventions, strict TypeScript contracts, reusable design tokens, and thorough documentation.",
  },
  {
    number: "03",
    title: "DIRECT COLLABORATION",
    statement:
      "You communicate directly with the person designing and building your product.",
    detail:
      "No account managers, no game of telephone, no outsourced handoffs. You work directly with a senior product engineer who understands your business objectives, timeline constraints, and technical vision.",
  },
];

// Professional Experience Timeline
export const professionalExperience = [
  {
    period: "12-2025 — Present",
    company: "ITCODE",
    role: "MERN Developer",
    location: "Ahmedabad, India",
    type: "Full-Time",
    focus: "Full-Stack Web Applications & RESTful Services",
    summary:
      "Engineered full-stack business web applications using the MERN stack (MongoDB, Express.js, React, Node.js). Designed scalable database schemas, developed secure RESTful API endpoints, and created modular, high-performance user interfaces.",
    responsibilities: [
      "Architected and implemented end-to-end full-stack modules connecting React user interfaces with Express API services.",
      "Designed and optimized MongoDB document schemas with compound indexing for reliable, high-throughput queries.",
      "Built reusable frontend component systems with predictable state management and clean styling standards.",
      "Collaborated closely with stakeholders to translate business operational requirements into robust software features.",
    ],
  },
  {
    period: "01-2025",
    company: "JDK Group",
    role: "MERN / Frontend Development",
    location: "Ahmedabad, India",
    type: "Professional Experience",
    focus: "Frontend Architecture & API Integration",
    summary:
      "Developed responsive frontend architectures, interactive components, and client-side data workflows for web applications. Focused on component modularity, API consumption, cross-device responsiveness, and performance tuning.",
    responsibilities: [
      "Constructed dynamic, fully responsive user interfaces using React, JavaScript (ES6+), and modern CSS frameworks.",
      "Integrated complex RESTful APIs, managed asynchronous data fetching, and handled error states gracefully.",
      "Improved frontend performance through component memoization, bundle optimization, and image asset tuning.",
      "Conducted cross-browser and cross-device testing to ensure consistent behavior on mobile, tablet, and desktop viewports.",
    ],
  },
];

// Project Process
export const projectProcess = [
  {
    number: "01",
    name: "DISCOVERY & STRATEGY",
    description: "Understand business requirements, goals and users.",
    details:
      "We begin by clarifying what you are building, why it matters, who will use it, and what success looks like commercially. We define essential scope, evaluate technical constraints, and align on timeline milestones.",
  },
  {
    number: "02",
    name: "PRODUCT PLANNING & ARCHITECTURE",
    description:
      "Define the product structure, user experience and technical foundation.",
    details:
      "We design the information architecture, user journeys, data models, and API interfaces before writing heavy code. Planning the architecture early keeps the build fast, modular, and affordable to adapt.",
  },
  {
    number: "03",
    name: "DESIGN & DEVELOPMENT",
    description:
      "Build the experience through structured, iterative implementation.",
    details:
      "Development proceeds in working vertical slices: frontend components, backend logic, and database persistence engineered together. You review interactive milestones early, ensuring total transparency and zero surprises.",
  },
  {
    number: "04",
    name: "LAUNCH & ONGOING SUPPORT",
    description: "Test, deploy and improve the product.",
    details:
      "Thorough cross-device testing, Core Web Vitals optimization, accessibility verification, and zero-downtime deployment. Post-launch, I remain available for monitoring, documentation handoff, and ongoing improvements.",
  },
];

// Project Types & Budgets for Contact Form
export const projectTypeOptions = [
  "Business Website",
  "Custom Web Application",
  "SaaS Platform",
  "E-commerce",
  "UI / Frontend Development",
  "Existing Application Improvement",
  "Other",
];

export const budgetOptions = [
  "Under ₹25,000",
  "₹25,000–₹50,000",
  "₹50,000–₹1,00,000",
  "₹1,00,000–₹2,00,000",
  "₹2,00,000+",
  "Not decided yet",
];

export const timelineOptions = [
  "Immediate (< 2 Weeks)",
  "2–4 Weeks",
  "1–2 Months",
  "2–3 Months",
  "Flexible",
];