import { useState, useEffect, useRef } from "react";

const caseStudies = [
  {
    id: "portfolio-builder",
    label: "CASE STUDY 01",
    title: "Dynamic Portfolio Builder Platform",
    tagline: "No-code SaaS platform for professionals to create stunning portfolios in minutes",
    status: "Live & Scaling",
    statusColor: "#10b981",
    timeline: "8 Weeks",
    teamSize: "2–3 Developers",
    clientType: "B2C SaaS",
    industry: "Creative Tech / Professional Services",
    investment: "$5,000 – $10,000",
    overview:
      "We partnered with an entrepreneur who saw a clear gap: talented professionals needed beautiful portfolio websites but lacked the technical skills to build them, and couldn't justify paying $3,000–$5,000 for custom development. We built a no-code SaaS platform that lets anyone — from graphic designers to real estate agents — create a professional, mobile-responsive portfolio in under 15 minutes.",
    pain: {
      intro: 'The founder had tried Wix, Squarespace, and WordPress. His feedback: "They\'re built for everything, which means they\'re perfect for nothing."',
      points: [
        { label: "Analysis paralysis", desc: "Existing tools had hundreds of templates and settings. Users would spend 3–4 hours customizing and still feel unsatisfied." },
        { label: "Mobile failures", desc: "Templates that looked great on desktop often broke on mobile, and users didn't know how to fix it." },
        { label: "No portfolio workflows", desc: "Generic builders lacked features like project galleries, skill sections, and testimonial displays." },
        { label: "Ongoing costs", desc: "Users were paying $15–$30/month for bloated platforms when they only needed 10% of the features." },
      ],
    },
    solution: [
      { label: "Curated Templates", desc: "12 designer-quality templates organized by profession, each pre-optimized for mobile." },
      { label: "One-Click Editor", desc: "Users click on any text or image to replace it. No drag-and-drop complexity. Just click, type, done." },
      { label: "Smart Image Handling", desc: "Automatic compression, cropping suggestions, and lazy loading — upload any image and the system optimizes it." },
      { label: "Custom Domains", desc: "One-click DNS setup guide with automatic SSL certificate provisioning." },
      { label: "Instant Publishing", desc: "Changes go live immediately. No 'publish' button confusion." },
    ],
    keyDecision: "We chose server-side rendering with Next.js for the portfolio sites. Every portfolio loads in under 1.5 seconds and is fully SEO-indexed — critical for professionals who want to be discovered through search.",
    tech: [
      { layer: "Frontend", tech: "Next.js + React", why: "SSR for SEO on portfolios; SPA speed for the editor" },
      { layer: "Styling", tech: "Tailwind CSS", why: "Rapid consistent styling; easy for template variants" },
      { layer: "Backend", tech: "Node.js + Express", why: "Fast API development; same language across the stack" },
      { layer: "Database", tech: "PostgreSQL", why: "Relational data integrity for user accounts & content" },
      { layer: "Storage", tech: "AWS S3", why: "Scalable, reliable image and asset storage" },
      { layer: "Hosting", tech: "AWS (EC2 + CloudFront)", why: "Global CDN for fast portfolio loading worldwide" },
    ],
    beforeAfter: [
      { area: "Creating a portfolio", before: "3–4 hours on Wix/WordPress", after: "Under 15 minutes" },
      { area: "Mobile experience", before: "Broken layouts, manual fixing", after: "Automatically responsive" },
      { area: "Page load speed", before: "4–8 seconds (bloated builders)", after: "Under 1.5 seconds" },
      { area: "SEO readiness", before: "Manual configuration required", after: "Built-in, automatic" },
      { area: "Technical skill", before: "HTML/CSS knowledge helpful", after: "Zero knowledge required" },
    ],
    process: [
      { phase: "Week 1–2", title: "Discovery & Design", desc: "User interviews with 15 freelancers. Mapped minimum feature set. Designed UI/UX with Figma prototypes, validated with 5 test users." },
      { phase: "Week 3–4", title: "Core Platform Build", desc: "Built the template engine, content management system, and user auth. First complete flow: sign up → choose template → edit → publish." },
      { phase: "Week 5–6", title: "Feature Completion", desc: "Custom domain support, image optimization pipeline, remaining templates. Real-time preview so users see changes instantly." },
      { phase: "Week 7", title: "Testing & Optimization", desc: "Load testing with 1,000 concurrent users. Fixed performance bottlenecks. Cross-browser testing on all major browsers." },
      { phase: "Week 8", title: "Launch & Handover", desc: "Production deployment to AWS. Monitoring, alerting, complete documentation, and team training." },
    ],
    results: [
      { metric: "Portfolios Created", value: "200+", impact: "Validated product-market fit" },
      { metric: "Avg. Setup Time", value: "15 min", impact: "93% faster than competitors" },
      { metric: "Concurrent Users", value: "1,000+", impact: "Scaled without issues" },
      { metric: "Page Load Speed", value: "<1.5s", impact: "50% faster than Wix/Squarespace" },
      { metric: "Uptime", value: "99.9%", impact: "Zero revenue-impacting downtime" },
    ],
    testimonial: {
      quote: "What impressed me most wasn't just the technical execution — it was how they challenged my assumptions. They talked me out of 3 features that would have delayed launch by a month and instead focused on what users actually needed.",
      author: "Founder",
      role: "Portfolio Builder Platform",
    },
    techTags: ["Next.js", "React", "Node.js", "PostgreSQL", "AWS", "Tailwind CSS"],
  },
  {
    id: "nfc-business-card",
    label: "CASE STUDY 02",
    title: "NFC Digital Business Card Platform",
    tagline: "Tap your phone. Save the contact. Track the connection. Zero paper waste.",
    status: "Live & Operational",
    statusColor: "#10b981",
    timeline: "6 Weeks",
    teamSize: "2 Developers",
    clientType: "B2B SaaS",
    industry: "Digital Networking / Smart Business Tools",
    investment: "$4,000 – $8,000",
    overview:
      "We built a platform that lets professionals create digital business cards linked to physical NFC tags. When someone taps an NFC card with their phone, they instantly see the owner's professional profile — contact info, social links, portfolio, and a 'Save Contact' button — no app download required.",
    pain: {
      intro: "The founder attended 50+ networking events per year and was frustrated by the same broken cycle:",
      points: [
        { label: "Cards get lost", desc: "88% of paper business cards are thrown away within a week. Every discarded card is a lost connection." },
        { label: "Outdated info", desc: "Every job title or phone number change meant reprinting hundreds of cards and trashing the old stock." },
        { label: "No tracking", desc: "No idea if people actually looked at the card after receiving it. Was networking generating leads?" },
        { label: "Environmental waste", desc: "Handing out disposable paper cards felt contradictory to modern sustainability values." },
      ],
    },
    solution: [
      { label: "NFC-Linked Profiles", desc: "Each NFC tag maps to a unique URL. Tap to load a mobile-optimized profile with one-tap 'Save to Contacts'." },
      { label: "Management Dashboard", desc: "Create and edit profiles, manage multiple cards (personal, business, event-specific), and view analytics." },
      { label: "Analytics Engine", desc: "Tracks profile views, viewer location, time on profile, and which links were clicked." },
    ],
    keyDecision: "We needed sub-second load times since users tap the NFC card in a face-to-face conversation. We pre-rendered all profile pages as static HTML served through a CDN, achieving consistent 400ms load times globally.",
    tech: [
      { layer: "Frontend", tech: "Next.js (SSG)", why: "Static generation = fastest possible load from NFC tap" },
      { layer: "Dashboard", tech: "React SPA", why: "Rich interactive dashboard for card management" },
      { layer: "Backend", tech: "Node.js + Express", why: "RESTful API for profiles and analytics" },
      { layer: "Database", tech: "PostgreSQL", why: "Relational integrity for user-card-analytics data" },
      { layer: "Analytics", tech: "Custom event tracking", why: "Lightweight tracking without third-party deps" },
      { layer: "Hosting", tech: "AWS (S3 + CloudFront)", why: "Global CDN for sub-second profile delivery" },
    ],
    beforeAfter: [
      { area: "Sharing contact info", before: "Hand over paper, hope they keep it", after: "Tap phone, contact saved instantly" },
      { area: "Updating info", before: "Reprint hundreds of cards", after: "Edit once, all cards update" },
      { area: "Tracking ROI", before: "No visibility whatsoever", after: "See who viewed and when" },
      { area: "Environmental impact", before: "500+ paper cards/year", after: "One reusable NFC card" },
      { area: "First impression", before: "Same card as everyone", after: "Interactive digital profile" },
    ],
    process: [
      { phase: "Week 1", title: "Discovery & NFC Research", desc: "Tested 5 NFC tag types for compatibility. Mapped the tap-to-profile journey and identified where milliseconds matter." },
      { phase: "Week 2–3", title: "Core Build", desc: "Profile rendering engine, NFC-to-URL mapping, user auth. First prototype: tap a card, see a profile." },
      { phase: "Week 4", title: "Dashboard & Analytics", desc: "Management dashboard with real-time analytics. Multi-card support for different contexts." },
      { phase: "Week 5", title: "vCard & Polish", desc: "'Save to Contacts' integration across iOS and Android. Cross-device testing on 20+ phone models." },
      { phase: "Week 6", title: "Launch", desc: "Production deployment, monitoring setup, documentation delivery, and team training." },
    ],
    results: [
      { metric: "Profile Load Time", value: "<400ms", impact: "Instant 'wow factor' on NFC tap" },
      { metric: "Contact Save Rate", value: "73%", impact: "vs ~12% for paper cards" },
      { metric: "Active Cards", value: "500+", impact: "Enterprise-scale usage" },
      { metric: "Paper Replaced", value: "10,000+", impact: "Measurable environmental impact" },
    ],
    testimonial: {
      quote: "At a recent conference, I shared my card with 40 people. Within a week, 32 had saved my contact and 8 reached out for meetings. With paper cards, I'd be lucky to hear from 2.",
      author: "Founder",
      role: "NFC Business Card Platform",
    },
    techTags: ["Next.js", "React", "Node.js", "PostgreSQL", "AWS", "CloudFront"],
  },
  {
    id: "kurav-ai-islamic",
    label: "CASE STUDY 03",
    title: "Kurav — AI-Powered Islamic Content Platform",
    tagline: "Verified AI answers with source references for the global Muslim community",
    status: "Live",
    statusColor: "#10b981",
    timeline: "10 Weeks",
    teamSize: "2 Devs + AI Specialist",
    clientType: "B2C Content Platform",
    industry: "Faith-Based EdTech / AI Content",
    investment: "$8,000 – $12,000",
    overview:
      "Kurav is an AI-powered platform that delivers personalized Islamic educational content. It uses AI to answer questions about Islamic teachings, generate contextual explanations of Quran verses and Hadith, and create customized learning paths based on the user's knowledge level — all with source referencing and theological accuracy.",
    pain: {
      intro: "The founder identified a growing problem in the Muslim community:",
      points: [
        { label: "Information overload", desc: "Thousands of conflicting answers from unverified sources, leading to confusion rather than clarity." },
        { label: "Language barriers", desc: "Authoritative scholarship is mostly in Arabic, while millions of Muslims speak only English, Bangla, or Urdu." },
        { label: "No personalization", desc: "A new Muslim and a lifelong scholar have different needs, but existing resources treat everyone the same." },
        { label: "Trust deficit", desc: "Generic AI tools sometimes provide inaccurate or out-of-context religious information, which can be harmful." },
      ],
    },
    solution: [
      { label: "Custom AI Pipeline", desc: "Fine-tuned prompts referencing verified Islamic sources. Every AI response includes source references." },
      { label: "Multi-Language", desc: "Content in English, Arabic, and Bangla with automatic translation quality verification." },
      { label: "Personalized Paths", desc: "Users select knowledge level and topics. Platform adapts content complexity accordingly." },
      { label: "Scholar Review", desc: "High-sensitivity topics flagged for human review by qualified scholars before being shown." },
      { label: "Content Library", desc: "Curated collection of verified articles and audio organized by topic and difficulty." },
    ],
    keyDecision: "We built a custom AI orchestration layer rather than simply wrapping ChatGPT. This gave us control over source referencing, accuracy checks, and the ability to route sensitive topics to human reviewers. Theological accuracy is non-negotiable.",
    tech: [
      { layer: "Frontend", tech: "Next.js + React", why: "Fast, SEO-friendly content pages + interactive Q&A" },
      { layer: "Backend", tech: "Node.js", why: "API orchestration and AI pipeline management" },
      { layer: "AI Layer", tech: "OpenAI API + Custom", why: "Controlled responses with source referencing" },
      { layer: "Database", tech: "PostgreSQL + MongoDB", why: "Relational for users; document store for content" },
      { layer: "Search", tech: "Full-text engine", why: "Fast content discovery across languages" },
      { layer: "Hosting", tech: "AWS + CloudFront", why: "Scalable for global user base" },
    ],
    beforeAfter: [
      { area: "Finding reliable answers", before: "Hours searching conflicting sources", after: "Verified answer with sources in seconds" },
      { area: "Language access", before: "Arabic-only scholarly texts", after: "English, Arabic, Bangla" },
      { area: "Learning path", before: "Random browsing, no structure", after: "Personalized by knowledge level" },
      { area: "Source verification", before: "No way to check claims", after: "Every response cites sources" },
      { area: "New Muslim content", before: "Overwhelming advanced material", after: "Beginner-friendly explanations" },
    ],
    process: [
      { phase: "Week 1–2", title: "Research & AI Design", desc: "Consulted with 3 Islamic scholars. Built AI prompt framework and tested against 200 common questions." },
      { phase: "Week 3–4", title: "Core Platform", desc: "Content management, user auth, and learning path engine. Integrated AI pipeline with source referencing." },
      { phase: "Week 5–6", title: "AI Refinement", desc: "Iterative testing with scholar reviewers. Adjusted prompts based on accuracy feedback. Added flagging system." },
      { phase: "Week 7–8", title: "Multi-Language & Content", desc: "Language support, populated content library, built search system." },
      { phase: "Week 9–10", title: "Testing & Launch", desc: "Beta testing with 50 users. Performance optimization, security audit, production deployment." },
    ],
    results: [
      { metric: "Questions Answered", value: "1000s+", impact: "Platform proving utility daily" },
      { metric: "Source Accuracy", value: "95%+", impact: "Scholar-verified AI responses" },
      { metric: "Languages", value: "3", impact: "Serving diverse global community" },
      { metric: "Avg. Session", value: "8+ min", impact: "Deep engagement with content" },
    ],
    testimonial: {
      quote: "They didn't just build a tech platform — they took the time to understand why accuracy matters in Islamic content. The scholar review system was their suggestion, not mine, and it's become one of our most important features.",
      author: "Founder",
      role: "Kurav Platform",
    },
    techTags: ["Next.js", "React", "Node.js", "OpenAI", "PostgreSQL", "MongoDB", "AWS"],
  },
  {
    id: "esg-reporting",
    label: "CASE STUDY 04",
    title: "ESG Reporting Platform for German Companies",
    tagline: "Turning 200+ hours of manual compliance into a guided, semi-automated workflow",
    status: "In Progress",
    statusColor: "#f59e0b",
    timeline: "16 Weeks",
    teamSize: "2 Senior Devs + Consultant",
    clientType: "B2B Enterprise SaaS",
    industry: "ESG / Regulatory Compliance",
    investment: "$12,000+",
    overview:
      "European companies are now required to report on ESG metrics under the EU's CSRD. We're building a platform that simplifies this complex compliance process for German mid-market companies (500–5,000 employees) who don't have dedicated sustainability teams. The platform collects data, maps it to CSRD frameworks, generates compliant reports, and tracks progress.",
    pain: {
      intro: "The client is a German consulting firm whose corporate clients were panicking about CSRD compliance:",
      points: [
        { label: "Regulatory complexity", desc: "Hundreds of data points across environmental, social, and governance categories. Most companies don't know which ones apply." },
        { label: "Scattered data", desc: "ESG data lives in HR systems, energy bills, supply chain databases, and finance tools. No unified view." },
        { label: "Manual reporting", desc: "200+ hours per reporting cycle using spreadsheets, with high error rates and no audit trail." },
        { label: "Deadline pressure", desc: "CSRD is mandatory starting 2025 with significant penalties for non-compliance." },
        { label: "Consultant dependency", desc: "Companies paying $50,000–$100,000 per report to external consultants due to lack of tooling." },
      ],
    },
    solution: [
      { label: "CSRD Framework Engine", desc: "Auto-determines which requirements apply based on industry, size, and activities." },
      { label: "Multi-Dept Data Collection", desc: "Role-based forms for HR, Operations, Finance, and Supply Chain. Platform aggregates and validates." },
      { label: "Auto Report Generation", desc: "Transforms data into CSRD-compliant report drafts with calculations and narratives." },
      { label: "Progress Dashboard", desc: "Real-time completion status, data gaps, deadlines, and year-over-year trends." },
      { label: "Audit Trail", desc: "Every entry, edit, and approval logged with timestamps and user IDs." },
    ],
    keyDecision: "We built multi-tenant architecture from day one. Each company's data is isolated with row-level security in PostgreSQL while sharing infrastructure. This saves the client from an expensive re-architecture as they scale to dozens of companies.",
    tech: [
      { layer: "Frontend", tech: "Next.js + React", why: "Complex forms, dashboards, and report previews" },
      { layer: "Backend", tech: "Node.js", why: "API layer handling multi-tenant data routing" },
      { layer: "Database", tech: "PostgreSQL (RLS)", why: "Row-level security for data isolation" },
      { layer: "Auth", tech: "JWT + RBAC", why: "Role-based: Admin, Dept Lead, Data Entry" },
      { layer: "Reports", tech: "PDF generation", why: "CSRD-compliant formatting and export" },
      { layer: "Hosting", tech: "AWS (EU region)", why: "GDPR-compliant hosting in Frankfurt" },
    ],
    beforeAfter: [
      { area: "What to report", before: "Hire consultant ($10K+)", after: "Platform auto-determines requirements" },
      { area: "Data collection", before: "Email chains + spreadsheets", after: "Guided forms with validation" },
      { area: "Report creation", before: "200+ hours manual work", after: "~50 hours semi-automated" },
      { area: "Error rate", before: "High (no validation)", after: "Built-in cross-checks" },
      { area: "Audit readiness", before: "Scramble to reconstruct", after: "Complete trail from day one" },
    ],
    process: [
      { phase: "Week 1–3", title: "CSRD Research & Design", desc: "Deep dive into CSRD framework. Mapped all data points, designed the framework engine, created wireframes." },
      { phase: "Week 4–6", title: "Core Platform", desc: "Multi-tenant infra, RBAC, first data collection modules (Environmental). MVP to staging." },
      { phase: "Week 7–9", title: "Data Modules", desc: "Social and Governance modules. Cross-department validation and progress dashboard." },
      { phase: "Week 10–12", title: "Report Engine", desc: "Automated CSRD-compliant report generation. PDF export. Tested with real data from pilot companies." },
      { phase: "Week 13–16", title: "Polish & Pilot", desc: "Security audit, GDPR review, performance optimization. Launched with 3 pilot companies." },
    ],
    results: [
      { metric: "Pilot Companies", value: "3", impact: "Validated with real enterprise users" },
      { metric: "CSRD Metrics", value: "100+", impact: "Comprehensive framework coverage" },
      { metric: "Time Savings", value: "75%", impact: "200+ hrs → ~50 hrs per cycle" },
      { metric: "GDPR", value: "Compliant", impact: "EU-hosted, data isolation, audits" },
    ],
    testimonial: {
      quote: "They asked hard questions about our multi-tenant strategy and GDPR compliance that the other agencies never raised. Their suggestion to use row-level security saved us from what would have been a costly re-architecture.",
      author: "Managing Director",
      role: "German ESG Consulting Firm",
    },
    techTags: ["Next.js", "React", "Node.js", "PostgreSQL", "AWS (EU)", "Docker"],
  },
];

// ---- Animated counter hook ----
function useCountUp(end, duration = 1500, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const numEnd = parseInt(String(end).replace(/[^0-9]/g, "")) || 0;
    function step(ts) {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setVal(Math.floor(p * numEnd));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [start, end, duration]);
  return val;
}

// ---- Intersection Observer hook ----
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ---- Sub-components ----

function ResultCard({ metric, value, impact, delay, animate }) {
  const numVal = useCountUp(value, 1200, animate);
  const suffix = String(value).replace(/[0-9]/g, "");
  const hasNum = /[0-9]/.test(value);
  return (
    <div
      style={{
        background: "rgba(16,185,129,0.06)",
        border: "1px solid rgba(16,185,129,0.15)",
        borderRadius: 14,
        padding: "28px 24px",
        textAlign: "center",
        opacity: animate ? 1 : 0,
        transform: animate ? "translateY(0)" : "translateY(24px)",
        transition: `all 0.6s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      <div style={{ fontSize: 36, fontWeight: 800, color: "#10b981", fontFamily: "'Space Mono', monospace", letterSpacing: -1 }}>
        {hasNum ? `${numVal}${suffix}` : value}
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0", marginTop: 6 }}>{metric}</div>
      <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>{impact}</div>
    </div>
  );
}

function TechTag({ name }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 16px",
        background: "rgba(59,130,246,0.08)",
        border: "1px solid rgba(59,130,246,0.2)",
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
        color: "#60a5fa",
        marginRight: 8,
        marginBottom: 8,
        fontFamily: "'Space Mono', monospace",
      }}
    >
      {name}
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      style={{
        display: "inline-block",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 2.5,
        textTransform: "uppercase",
        color: "#3b82f6",
        marginBottom: 10,
        fontFamily: "'Space Mono', monospace",
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return <h3 style={{ fontSize: 26, fontWeight: 800, color: "#f1f5f9", margin: "0 0 20px", lineHeight: 1.3 }}>{children}</h3>;
}

function PainPoint({ label, desc, index, animate }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        padding: "18px 20px",
        background: "rgba(239,68,68,0.04)",
        border: "1px solid rgba(239,68,68,0.1)",
        borderRadius: 12,
        marginBottom: 12,
        opacity: animate ? 1 : 0,
        transform: animate ? "translateX(0)" : "translateX(-20px)",
        transition: `all 0.5s cubic-bezier(.22,1,.36,1) ${index * 100 + 200}ms`,
      }}
    >
      <div style={{ minWidth: 36, height: 36, borderRadius: 10, background: "rgba(239,68,68,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#f87171", fontWeight: 700 }}>
        ✕
      </div>
      <div>
        <div style={{ fontWeight: 700, color: "#fca5a5", fontSize: 15, marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6 }}>{desc}</div>
      </div>
    </div>
  );
}

function SolutionPoint({ label, desc, index, animate }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        padding: "18px 20px",
        background: "rgba(16,185,129,0.04)",
        border: "1px solid rgba(16,185,129,0.1)",
        borderRadius: 12,
        marginBottom: 12,
        opacity: animate ? 1 : 0,
        transform: animate ? "translateX(0)" : "translateX(20px)",
        transition: `all 0.5s cubic-bezier(.22,1,.36,1) ${index * 100 + 200}ms`,
      }}
    >
      <div style={{ minWidth: 36, height: 36, borderRadius: 10, background: "rgba(16,185,129,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#34d399", fontWeight: 700 }}>
        ✓
      </div>
      <div>
        <div style={{ fontWeight: 700, color: "#6ee7b7", fontSize: 15, marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6 }}>{desc}</div>
      </div>
    </div>
  );
}

function ProcessStep({ phase, title, desc, index, total, animate }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        opacity: animate ? 1 : 0,
        transform: animate ? "translateY(0)" : "translateY(16px)",
        transition: `all 0.5s cubic-bezier(.22,1,.36,1) ${index * 120 + 200}ms`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 48 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #3b82f6, #6366f1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 800,
            color: "#fff",
            fontFamily: "'Space Mono', monospace",
            boxShadow: "0 0 20px rgba(59,130,246,0.3)",
          }}
        >
          {index + 1}
        </div>
        {index < total - 1 && <div style={{ width: 2, flex: 1, background: "linear-gradient(to bottom, #3b82f6, transparent)", marginTop: 6 }} />}
      </div>
      <div style={{ paddingBottom: 32 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#60a5fa", fontFamily: "'Space Mono', monospace", letterSpacing: 1, marginBottom: 4 }}>{phase}</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: "#e2e8f0", marginBottom: 6 }}>{title}</div>
        <div style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.65 }}>{desc}</div>
      </div>
    </div>
  );
}

function BeforeAfterRow({ area, before, after, index, animate }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 1,
        opacity: animate ? 1 : 0,
        transform: animate ? "translateY(0)" : "translateY(12px)",
        transition: `all 0.4s ease ${index * 80 + 150}ms`,
      }}
    >
      <div style={{ padding: "14px 16px", background: "rgba(255,255,255,0.04)", fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{area}</div>
      <div style={{ padding: "14px 16px", background: "rgba(239,68,68,0.05)", fontSize: 13, color: "#fca5a5" }}>
        <span style={{ opacity: 0.5, marginRight: 6 }}>✕</span>{before}
      </div>
      <div style={{ padding: "14px 16px", background: "rgba(16,185,129,0.05)", fontSize: 13, color: "#6ee7b7" }}>
        <span style={{ opacity: 0.7, marginRight: 6 }}>✓</span>{after}
      </div>
    </div>
  );
}

function CaseStudyPage({ study }) {
  const [heroRef, heroInView] = useInView(0.1);
  const [painRef, painInView] = useInView();
  const [solRef, solInView] = useInView();
  const [techRef, techInView] = useInView();
  const [baRef, baInView] = useInView();
  const [procRef, procInView] = useInView();
  const [resRef, resInView] = useInView();
  const [testRef, testInView] = useInView();

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* Hero */}
      <div
        ref={heroRef}
        style={{
          padding: "60px 0 40px",
          opacity: heroInView ? 1 : 0,
          transform: heroInView ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: "#60a5fa", fontFamily: "'Space Mono', monospace" }}>{study.label}</span>
          <span
            style={{
              padding: "4px 14px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              color: study.statusColor,
              background: `${study.statusColor}15`,
              border: `1px solid ${study.statusColor}30`,
            }}
          >
            {study.status}
          </span>
        </div>
        <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 900, color: "#f1f5f9", lineHeight: 1.1, margin: "0 0 16px", letterSpacing: -1 }}>{study.title}</h2>
        <p style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.5, margin: "0 0 32px", maxWidth: 700 }}>{study.tagline}</p>

        {/* Meta cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
          {[
            { label: "Timeline", value: study.timeline },
            { label: "Team", value: study.teamSize },
            { label: "Type", value: study.clientType },
            { label: "Investment", value: study.investment },
          ].map((m) => (
            <div
              key={m.label}
              style={{
                padding: "16px 18px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "#64748b", textTransform: "uppercase", marginBottom: 6, fontFamily: "'Space Mono', monospace" }}>{m.label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0" }}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)", margin: "10px 0 50px" }} />

      {/* Overview */}
      <div style={{ marginBottom: 60 }}>
        <SectionLabel>Project Overview</SectionLabel>
        <p style={{ fontSize: 16, color: "#cbd5e1", lineHeight: 1.8, margin: 0 }}>{study.overview}</p>
      </div>

      {/* Pain */}
      <div ref={painRef} style={{ marginBottom: 60 }}>
        <SectionLabel>The Client's Real Pain</SectionLabel>
        <SectionTitle>Problems That Needed Solving</SectionTitle>
        <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.7, marginBottom: 24 }}>{study.pain.intro}</p>
        {study.pain.points.map((p, i) => (
          <PainPoint key={i} {...p} index={i} animate={painInView} />
        ))}
      </div>

      {/* Solution */}
      <div ref={solRef} style={{ marginBottom: 60 }}>
        <SectionLabel>Our Solution</SectionLabel>
        <SectionTitle>What We Built</SectionTitle>
        {study.solution.map((s, i) => (
          <SolutionPoint key={i} {...s} index={i} animate={solInView} />
        ))}
        {study.keyDecision && (
          <div
            style={{
              marginTop: 24,
              padding: "24px 28px",
              background: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(99,102,241,0.06))",
              border: "1px solid rgba(59,130,246,0.15)",
              borderRadius: 14,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: "#60a5fa", marginBottom: 8, fontFamily: "'Space Mono', monospace", letterSpacing: 1 }}>KEY ARCHITECTURE DECISION</div>
            <p style={{ fontSize: 14, color: "#cbd5e1", lineHeight: 1.7, margin: 0 }}>{study.keyDecision}</p>
          </div>
        )}
      </div>

      {/* Tech Stack */}
      <div ref={techRef} style={{ marginBottom: 60 }}>
        <SectionLabel>Technology Stack</SectionLabel>
        <SectionTitle>Built With Purpose</SectionTitle>
        <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 24 }}>
          {study.techTags.map((t) => (
            <TechTag key={t} name={t} />
          ))}
        </div>
        <div
          style={{
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.06)",
            opacity: techInView ? 1 : 0,
            transform: techInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s cubic-bezier(.22,1,.36,1) 200ms",
          }}
        >
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr 1.7fr", background: "rgba(255,255,255,0.06)" }}>
            {["Layer", "Technology", "Why We Chose It"].map((h) => (
              <div key={h} style={{ padding: "14px 18px", fontSize: 12, fontWeight: 700, color: "#64748b", letterSpacing: 1, textTransform: "uppercase", fontFamily: "'Space Mono', monospace" }}>{h}</div>
            ))}
          </div>
          {study.tech.map((t, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr 1.7fr", borderTop: "1px solid rgba(255,255,255,0.04)", background: i % 2 ? "rgba(255,255,255,0.015)" : "transparent" }}>
              <div style={{ padding: "14px 18px", fontSize: 14, fontWeight: 700, color: "#60a5fa" }}>{t.layer}</div>
              <div style={{ padding: "14px 18px", fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{t.tech}</div>
              <div style={{ padding: "14px 18px", fontSize: 13, color: "#94a3b8" }}>{t.why}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Before vs After */}
      <div ref={baRef} style={{ marginBottom: 60 }}>
        <SectionLabel>Before vs. After</SectionLabel>
        <SectionTitle>The Transformation</SectionTitle>
        <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "rgba(255,255,255,0.06)" }}>
            <div style={{ padding: "14px 16px", fontSize: 12, fontWeight: 700, color: "#64748b", letterSpacing: 1, textTransform: "uppercase", fontFamily: "'Space Mono', monospace" }}>Area</div>
            <div style={{ padding: "14px 16px", fontSize: 12, fontWeight: 700, color: "#ef4444", letterSpacing: 1, textTransform: "uppercase", fontFamily: "'Space Mono', monospace" }}>Before</div>
            <div style={{ padding: "14px 16px", fontSize: 12, fontWeight: 700, color: "#10b981", letterSpacing: 1, textTransform: "uppercase", fontFamily: "'Space Mono', monospace" }}>After</div>
          </div>
          {study.beforeAfter.map((b, i) => (
            <BeforeAfterRow key={i} {...b} index={i} animate={baInView} />
          ))}
        </div>
      </div>

      {/* Process */}
      <div ref={procRef} style={{ marginBottom: 60 }}>
        <SectionLabel>Development Process</SectionLabel>
        <SectionTitle>How We Built It</SectionTitle>
        <div style={{ paddingLeft: 4 }}>
          {study.process.map((p, i) => (
            <ProcessStep key={i} {...p} index={i} total={study.process.length} animate={procInView} />
          ))}
        </div>
      </div>

      {/* Results */}
      <div ref={resRef} style={{ marginBottom: 60 }}>
        <SectionLabel>Results & Impact</SectionLabel>
        <SectionTitle>Measurable Outcomes</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(study.results.length, 4)}, 1fr)`, gap: 16 }}>
          {study.results.map((r, i) => (
            <ResultCard key={i} {...r} delay={i * 120} animate={resInView} />
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div ref={testRef} style={{ marginBottom: 60 }}>
        <div
          style={{
            padding: "40px 36px",
            background: "linear-gradient(135deg, rgba(59,130,246,0.06), rgba(99,102,241,0.04))",
            borderLeft: "4px solid #3b82f6",
            borderRadius: "0 16px 16px 0",
            opacity: testInView ? 1 : 0,
            transform: testInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <div style={{ fontSize: 48, color: "#3b82f6", lineHeight: 1, marginBottom: 8, fontFamily: "Georgia, serif" }}>"</div>
          <p style={{ fontSize: 17, color: "#cbd5e1", lineHeight: 1.75, margin: "0 0 20px", fontStyle: "italic" }}>{study.testimonial.quote}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #3b82f6, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "#fff" }}>
              {study.testimonial.author[0]}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0" }}>{study.testimonial.author}</div>
              <div style={{ fontSize: 13, color: "#64748b" }}>{study.testimonial.role}</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          textAlign: "center",
          padding: "48px 32px",
          background: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(16,185,129,0.06))",
          borderRadius: 20,
          border: "1px solid rgba(59,130,246,0.12)",
          marginBottom: 80,
        }}
      >
        <h3 style={{ fontSize: 24, fontWeight: 800, color: "#f1f5f9", margin: "0 0 10px" }}>Have a similar project?</h3>
        <p style={{ fontSize: 15, color: "#94a3b8", margin: "0 0 28px" }}>Let's discuss how we can build your solution</p>
        <a
          href="mailto:hello@papatiger.tech"
          style={{
            display: "inline-block",
            padding: "14px 36px",
            background: "linear-gradient(135deg, #3b82f6, #6366f1)",
            color: "#fff",
            fontSize: 15,
            fontWeight: 700,
            borderRadius: 12,
            textDecoration: "none",
            boxShadow: "0 4px 24px rgba(59,130,246,0.3)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
        >
          Start Your Project →
        </a>
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function CaseStudies() {
  const [activeStudy, setActiveStudy] = useState(null);
  const [heroRef, heroInView] = useInView(0.05);
  const [gridRef, gridInView] = useInView(0.05);

  // Load fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600;700;800;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  // Scroll to top on study change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStudy]);

  const bgStyle = {
    minHeight: "100vh",
    background: "#0a0e1a",
    fontFamily: "'DM Sans', -apple-system, sans-serif",
    color: "#e2e8f0",
    overflowX: "hidden",
  };

  // If viewing a specific case study
  if (activeStudy !== null) {
    const study = caseStudies[activeStudy];
    return (
      <div style={bgStyle}>
        {/* Ambient background */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: -200, right: -200, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.06), transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: -200, left: -200, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.04), transparent 70%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          {/* Back button */}
          <div style={{ padding: "24px 0" }}>
            <button
              onClick={() => setActiveStudy(null)}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                padding: "10px 20px",
                color: "#94a3b8",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.2s",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => { e.target.style.background = "rgba(255,255,255,0.08)"; e.target.style.color = "#e2e8f0"; }}
              onMouseLeave={(e) => { e.target.style.background = "rgba(255,255,255,0.05)"; e.target.style.color = "#94a3b8"; }}
            >
              ← All Case Studies
            </button>
          </div>

          <CaseStudyPage study={study} />
        </div>
      </div>
    );
  }

  // ---- LISTING PAGE ----
  return (
    <div style={bgStyle}>
      {/* Ambient background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: -300, left: "50%", transform: "translateX(-50%)", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.07), transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -200, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.05), transparent 70%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        {/* Hero Section */}
        <div
          ref={heroRef}
          style={{
            textAlign: "center",
            padding: "100px 0 80px",
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(40px)",
            transition: "all 1s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#3b82f6", marginBottom: 20, fontFamily: "'Space Mono', monospace" }}>
            REAL PROJECTS · REAL RESULTS
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, color: "#f1f5f9", lineHeight: 1.05, margin: "0 0 24px", letterSpacing: -2 }}>
            Case Studies
          </h1>
          <p style={{ fontSize: 19, color: "#94a3b8", maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.6 }}>
            See how we've transformed business challenges into successful, scalable software solutions.
          </p>

          {/* Stats bar */}
          <div
            style={{
              display: "inline-flex",
              gap: 1,
              background: "rgba(255,255,255,0.04)",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {[
              { label: "Projects", value: "4" },
              { label: "Industries", value: "4" },
              { label: "Avg. Delivery", value: "10 wk" },
              { label: "Success Rate", value: "100%" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "20px 32px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#f1f5f9", fontFamily: "'Space Mono', monospace" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600, marginTop: 4, letterSpacing: 0.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Case Study Cards */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))",
            gap: 24,
            paddingBottom: 100,
          }}
        >
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              onClick={() => setActiveStudy(index)}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 20,
                padding: "36px 32px",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
                opacity: gridInView ? 1 : 0,
                transform: gridInView ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${index * 150}ms`,
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(59,130,246,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Top bar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: "#64748b", fontFamily: "'Space Mono', monospace" }}>{study.label}</span>
                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 700,
                    color: study.statusColor,
                    background: `${study.statusColor}12`,
                    border: `1px solid ${study.statusColor}25`,
                  }}
                >
                  {study.status}
                </span>
              </div>

              <h3 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", margin: "0 0 10px", lineHeight: 1.25 }}>{study.title}</h3>
              <p style={{ fontSize: 14, color: "#94a3b8", margin: "0 0 24px", lineHeight: 1.6 }}>{study.tagline}</p>

              {/* Quick stats */}
              <div style={{ display: "flex", gap: 20, marginBottom: 24, flexWrap: "wrap" }}>
                {[
                  { icon: "⏱", value: study.timeline },
                  { icon: "👥", value: study.teamSize },
                  { icon: "💰", value: study.investment },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 14 }}>{s.icon}</span>
                    <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>{s.value}</span>
                  </div>
                ))}
              </div>

              {/* Tech tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
                {study.techTags.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "4px 12px",
                      borderRadius: 999,
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#60a5fa",
                      background: "rgba(59,130,246,0.08)",
                      border: "1px solid rgba(59,130,246,0.15)",
                      fontFamily: "'Space Mono', monospace",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Key results preview */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {study.results.slice(0, 3).map((r, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      minWidth: 100,
                      padding: "14px 12px",
                      background: "rgba(16,185,129,0.05)",
                      borderRadius: 10,
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: 20, fontWeight: 800, color: "#10b981", fontFamily: "'Space Mono', monospace" }}>{r.value}</div>
                    <div style={{ fontSize: 11, color: "#64748b", marginTop: 4, fontWeight: 500 }}>{r.metric}</div>
                  </div>
                ))}
              </div>

              {/* View arrow */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: 20 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#3b82f6", display: "flex", alignItems: "center", gap: 6 }}>
                  View Full Case Study
                  <span style={{ fontSize: 18, transition: "transform 0.2s" }}>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            textAlign: "center",
            padding: "60px 32px 100px",
          }}
        >
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#f1f5f9", margin: "0 0 12px" }}>Ready to Start Building?</h2>
          <p style={{ fontSize: 16, color: "#94a3b8", margin: "0 0 32px" }}>Let's turn your idea into production-ready software</p>
          <a
            href="mailto:hello@papatiger.tech"
            style={{
              display: "inline-block",
              padding: "16px 40px",
              background: "linear-gradient(135deg, #3b82f6, #6366f1)",
              color: "#fff",
              fontSize: 16,
              fontWeight: 700,
              borderRadius: 14,
              textDecoration: "none",
              boxShadow: "0 4px 30px rgba(59,130,246,0.35)",
              transition: "all 0.3s",
            }}
          >
            Get Free Consultation
          </a>
        </div>
      </div>
    </div>
  );
}
