'use client'

import { useState, useEffect, useRef, CSSProperties, RefObject } from "react";

// ============================================================
// DESIGN TOKENS (matching Hero, SocialProof, Services)
// ============================================================

const ACCENT = '#6366f1'
const CYAN = '#22d3ee'
const ACCENT_GLOW = 'rgba(99,102,241,0.4)'

// ============================================================
// TYPES
// ============================================================

interface PainPointData { label: string; desc: string }
interface PainData { intro: string; points: PainPointData[] }
interface SolutionData { label: string; desc: string }
interface TechData { layer: string; tech: string; why: string }
interface BeforeAfterData { area: string; before: string; after: string }
interface ProcessData { phase: string; title: string; desc: string }
interface ResultData { metric: string; value: string; impact: string }
interface TestimonialData { quote: string; author: string; role: string }

interface CaseStudy {
  id: string; label: string; title: string; tagline: string; status: string; statusColor: string;
  timeline: string; teamSize: string; clientType: string; industry: string; investment: string;
  overview: string; pain: PainData; solution: SolutionData[]; keyDecision: string;
  tech: TechData[]; beforeAfter: BeforeAfterData[]; process: ProcessData[];
  results: ResultData[]; testimonial: TestimonialData; techTags: string[];
}

// ============================================================
// DATA (your original — unchanged)
// ============================================================

const caseStudies: CaseStudy[] = [
  {
    id: "portfolio-builder", label: "CASE STUDY 01", title: "Dynamic Portfolio Builder Platform",
    tagline: "No-code SaaS platform for professionals to create stunning portfolios in minutes",
    status: "Live & Scaling", statusColor: "#10b981", timeline: "8 Weeks", teamSize: "2–3 Developers",
    clientType: "B2C SaaS", industry: "Creative Tech / Professional Services", investment: "$5,000 – $10,000",
    overview: "We partnered with an entrepreneur who saw a clear gap: talented professionals needed beautiful portfolio websites but lacked the technical skills to build them, and couldn't justify paying $3,000–$5,000 for custom development. We built a no-code SaaS platform that lets anyone — from graphic designers to real estate agents — create a professional, mobile-responsive portfolio in under 15 minutes.",
    pain: { intro: 'The founder had tried Wix, Squarespace, and WordPress. His feedback: "They\'re built for everything, which means they\'re perfect for nothing."', points: [
      { label: "Analysis paralysis", desc: "Existing tools had hundreds of templates and settings. Users would spend 3–4 hours customizing and still feel unsatisfied." },
      { label: "Mobile failures", desc: "Templates that looked great on desktop often broke on mobile, and users didn't know how to fix it." },
      { label: "No portfolio workflows", desc: "Generic builders lacked features like project galleries, skill sections, and testimonial displays." },
      { label: "Ongoing costs", desc: "Users were paying $15–$30/month for bloated platforms when they only needed 10% of the features." },
    ]},
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
    testimonial: { quote: "What impressed me most wasn't just the technical execution — it was how they challenged my assumptions. They talked me out of 3 features that would have delayed launch by a month and instead focused on what users actually needed.", author: "Founder", role: "Portfolio Builder Platform" },
    techTags: ["Next.js", "React", "Node.js", "PostgreSQL", "AWS", "Tailwind CSS"],
  },
  {
    id: "nfc-business-card", label: "CASE STUDY 02", title: "NFC Digital Business Card Platform",
    tagline: "Tap your phone. Save the contact. Track the connection. Zero paper waste.",
    status: "Live & Operational", statusColor: "#10b981", timeline: "6 Weeks", teamSize: "2 Developers",
    clientType: "B2B SaaS", industry: "Digital Networking / Smart Business Tools", investment: "$4,000 – $8,000",
    overview: "We built a platform that lets professionals create digital business cards linked to physical NFC tags. When someone taps an NFC card with their phone, they instantly see the owner's professional profile — contact info, social links, portfolio, and a 'Save Contact' button — no app download required.",
    pain: { intro: "The founder attended 50+ networking events per year and was frustrated by the same broken cycle:", points: [
      { label: "Cards get lost", desc: "88% of paper business cards are thrown away within a week. Every discarded card is a lost connection." },
      { label: "Outdated info", desc: "Every job title or phone number change meant reprinting hundreds of cards and trashing the old stock." },
      { label: "No tracking", desc: "No idea if people actually looked at the card after receiving it. Was networking generating leads?" },
      { label: "Environmental waste", desc: "Handing out disposable paper cards felt contradictory to modern sustainability values." },
    ]},
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
    testimonial: { quote: "At a recent conference, I shared my card with 40 people. Within a week, 32 had saved my contact and 8 reached out for meetings. With paper cards, I'd be lucky to hear from 2.", author: "Founder", role: "NFC Business Card Platform" },
    techTags: ["Next.js", "React", "Node.js", "PostgreSQL", "AWS", "CloudFront"],
  },
  {
    id: "kurav-ai-islamic", label: "CASE STUDY 03", title: "Kurav — AI-Powered Islamic Content Platform",
    tagline: "Verified AI answers with source references for the global Muslim community",
    status: "Live", statusColor: "#10b981", timeline: "10 Weeks", teamSize: "2 Devs + AI Specialist",
    clientType: "B2C Content Platform", industry: "Faith-Based EdTech / AI Content", investment: "$8,000 – $12,000",
    overview: "Kurav is an AI-powered platform that delivers personalized Islamic educational content. It uses AI to answer questions about Islamic teachings, generate contextual explanations of Quran verses and Hadith, and create customized learning paths based on the user's knowledge level — all with source referencing and theological accuracy.",
    pain: { intro: "The founder identified a growing problem in the Muslim community:", points: [
      { label: "Information overload", desc: "Thousands of conflicting answers from unverified sources, leading to confusion rather than clarity." },
      { label: "Language barriers", desc: "Authoritative scholarship is mostly in Arabic, while millions of Muslims speak only English, Bangla, or Urdu." },
      { label: "No personalization", desc: "A new Muslim and a lifelong scholar have different needs, but existing resources treat everyone the same." },
      { label: "Trust deficit", desc: "Generic AI tools sometimes provide inaccurate or out-of-context religious information, which can be harmful." },
    ]},
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
    testimonial: { quote: "They didn't just build a tech platform — they took the time to understand why accuracy matters in Islamic content. The scholar review system was their suggestion, not mine, and it's become one of our most important features.", author: "Founder", role: "Kurav Platform" },
    techTags: ["Next.js", "React", "Node.js", "OpenAI", "PostgreSQL", "MongoDB", "AWS"],
  },
  {
    id: "esg-reporting", label: "CASE STUDY 04", title: "ESG Reporting Platform for German Companies",
    tagline: "Turning 200+ hours of manual compliance into a guided, semi-automated workflow",
    status: "In Progress", statusColor: "#f59e0b", timeline: "16 Weeks", teamSize: "2 Senior Devs + Consultant",
    clientType: "B2B Enterprise SaaS", industry: "ESG / Regulatory Compliance", investment: "$12,000+",
    overview: "European companies are now required to report on ESG metrics under the EU's CSRD. We're building a platform that simplifies this complex compliance process for German mid-market companies (500–5,000 employees) who don't have dedicated sustainability teams. The platform collects data, maps it to CSRD frameworks, generates compliant reports, and tracks progress.",
    pain: { intro: "The client is a German consulting firm whose corporate clients were panicking about CSRD compliance:", points: [
      { label: "Regulatory complexity", desc: "Hundreds of data points across environmental, social, and governance categories. Most companies don't know which ones apply." },
      { label: "Scattered data", desc: "ESG data lives in HR systems, energy bills, supply chain databases, and finance tools. No unified view." },
      { label: "Manual reporting", desc: "200+ hours per reporting cycle using spreadsheets, with high error rates and no audit trail." },
      { label: "Deadline pressure", desc: "CSRD is mandatory starting 2025 with significant penalties for non-compliance." },
      { label: "Consultant dependency", desc: "Companies paying $50,000–$100,000 per report to external consultants due to lack of tooling." },
    ]},
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
    testimonial: { quote: "They asked hard questions about our multi-tenant strategy and GDPR compliance that the other agencies never raised. Their suggestion to use row-level security saved us from what would have been a costly re-architecture.", author: "Managing Director", role: "German ESG Consulting Firm" },
    techTags: ["Next.js", "React", "Node.js", "PostgreSQL", "AWS (EU)", "Docker"],
  },
];

// ============================================================
// HOOKS
// ============================================================

function useTheme(): boolean {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);
  return isDark;
}

function useInView(threshold: number = 0.15): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState<boolean>(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCountUp(end: string, duration: number = 1500, start: boolean = false): number {
  const [val, setVal] = useState<number>(0);
  const started = useRef(false);
  useEffect(() => {
    if (!start || started.current) return;
    started.current = true;
    let startTime: number | null = null;
    const numEnd = parseInt(String(end).replace(/[^0-9]/g, "")) || 0;
    function step(ts: number) {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * numEnd));
      if (p < 1) requestAnimationFrame(step);
      else setVal(numEnd);
    }
    requestAnimationFrame(step);
  }, [start, end, duration]);
  return val;
}

// ============================================================
// THEME HELPER
// ============================================================

function t(isDark: boolean) {
  return {
    bg: isDark ? '#050508' : '#fafafa',
    tp: isDark ? '#fafafa' : '#09090b',
    ts: isDark ? '#a1a1aa' : '#71717a',
    tt: isDark ? '#52525b' : '#a1a1aa',
    bd: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
    bdh: isDark ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)',
    cb: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
    cbh: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
    sb: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
    red: isDark ? '#f87171' : '#ef4444',
    redbg: isDark ? 'rgba(239,68,68,0.06)' : 'rgba(239,68,68,0.04)',
    green: isDark ? '#34d399' : '#10b981',
    greenbg: isDark ? 'rgba(16,185,129,0.06)' : 'rgba(16,185,129,0.04)',
    divGradient: isDark ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.12)',
  };
}

// ============================================================
// SUB-COMPONENTS (extracted to avoid hooks-in-map)
// ============================================================

function ResultCard({ metric, value, impact, delay, animate, isDark }: ResultData & { delay: number; animate: boolean; isDark: boolean }) {
  const numVal = useCountUp(value, 1200, animate);
  const suffix = String(value).replace(/[0-9]/g, "");
  const hasNum = /[0-9]/.test(value);
  const k = t(isDark);
  return (
    <div style={{
      background: k.cb, border: `1px solid ${k.bd}`, borderRadius: 14, padding: "28px 24px",
      textAlign: "center", opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(24px)",
      transition: `all 0.6s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    }}>
      <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.04em', fontFamily: "'Syne', sans-serif" }}>
        <span style={{ color: k.tp }}>{hasNum ? numVal : value}</span>
        <span style={{ background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{hasNum ? suffix : ''}</span>
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, color: k.tp, marginTop: 6 }}>{metric}</div>
      <div style={{ fontSize: 13, color: k.ts, marginTop: 4 }}>{impact}</div>
    </div>
  );
}

function StudyCard({ study, index, gridInView, isDark, onClick }: { study: CaseStudy; index: number; gridInView: boolean; isDark: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const k = t(isDark);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? k.cbh : k.cb,
        border: `1px solid ${hovered ? k.bdh : k.bd}`,
        borderRadius: 20, padding: "36px 32px", cursor: "pointer",
        transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
        opacity: gridInView ? 1 : 0,
        transform: gridInView ? (hovered ? "translateY(-5px)" : "translateY(0)") : "translateY(30px)",
        transitionDelay: `${index * 150}ms`,
        position: "relative" as const, overflow: "hidden",
        boxShadow: hovered && isDark ? `0 16px 56px rgba(0,0,0,0.5), 0 0 40px rgba(99,102,241,0.08)` : hovered ? '0 12px 40px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      {/* Top gradient glow line */}
      <div style={{ position: "absolute" as const, top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${ACCENT}, ${CYAN})`, opacity: hovered ? 0.9 : 0, transition: "opacity 0.3s" }} />

      {/* Label + Status */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: k.tt, fontFamily: "'JetBrains Mono', monospace" }}>{study.label}</span>
        <span style={{
          padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700,
          color: study.statusColor, background: `${study.statusColor}15`,
          border: `1px solid ${study.statusColor}25`,
          boxShadow: isDark ? `0 0 12px ${study.statusColor}20` : 'none',
        }}>{study.status}</span>
      </div>

      <h3 style={{ fontSize: 22, fontWeight: 800, color: k.tp, margin: "0 0 10px", lineHeight: 1.25, letterSpacing: '-0.02em', fontFamily: "'Syne', sans-serif" }}>{study.title}</h3>
      <p style={{ fontSize: 14, color: k.ts, margin: "0 0 24px", lineHeight: 1.6 }}>{study.tagline}</p>

      {/* Quick stats */}
      <div style={{ display: "flex", gap: 20, marginBottom: 24, flexWrap: "wrap" as const }}>
        {([
          { icon: "⏱", value: study.timeline },
          { icon: "👥", value: study.teamSize },
          { icon: "💰", value: study.investment },
        ] as const).map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 14 }}>{s.icon}</span>
            <span style={{ fontSize: 13, color: k.ts, fontWeight: 500 }}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6, marginBottom: 24 }}>
        {study.techTags.slice(0, 5).map((tag) => (
          <span key={tag} style={{
            padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 600,
            color: isDark ? '#c7d2fe' : ACCENT,
            background: isDark ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)',
            border: `1px solid ${isDark ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.12)'}`,
            fontFamily: "'JetBrains Mono', monospace",
          }}>{tag}</span>
        ))}
      </div>

      {/* Results preview */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
        {study.results.slice(0, 3).map((r, i) => (
          <div key={i} style={{
            flex: 1, minWidth: 100, padding: "14px 12px",
            background: k.sb, borderRadius: 10, textAlign: "center" as const,
          }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: k.tp, fontVariantNumeric: 'tabular-nums', fontFamily: "'Syne', sans-serif" }}>{r.value}</div>
            <div style={{ fontSize: 11, color: k.tt, marginTop: 4, fontWeight: 500 }}>{r.metric}</div>
          </div>
        ))}
      </div>

      {/* View link */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: 20 }}>
        <span style={{
          fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
          background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          View Full Case Study <span style={{ fontSize: 18 }}>→</span>
        </span>
      </div>
    </div>
  );
}

// ============================================================
// DETAIL PAGE COMPONENTS
// ============================================================

function SectionLabel({ children, isDark }: { children: React.ReactNode; isDark: boolean }) {
  return (
    <div style={{
      display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: 2.5,
      textTransform: "uppercase" as const, color: ACCENT, marginBottom: 10,
      fontFamily: "'JetBrains Mono', monospace",
    }}>{children}</div>
  );
}

function SectionTitle({ children, isDark }: { children: React.ReactNode; isDark: boolean }) {
  const k = t(isDark);
  return <h3 style={{ fontSize: 26, fontWeight: 800, color: k.tp, margin: "0 0 20px", lineHeight: 1.3, letterSpacing: '-0.03em', fontFamily: "'Syne', sans-serif" }}>{children}</h3>;
}

function PainPoint({ label, desc, index, animate, isDark }: PainPointData & { index: number; animate: boolean; isDark: boolean }) {
  const k = t(isDark);
  return (
    <div style={{
      display: "flex", gap: 16, padding: "18px 20px",
      background: k.redbg, border: `1px solid ${isDark ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.08)'}`,
      borderRadius: 12, marginBottom: 12,
      opacity: animate ? 1 : 0, transform: animate ? "translateX(0)" : "translateX(-20px)",
      transition: `all 0.5s cubic-bezier(.22,1,.36,1) ${index * 100 + 200}ms`,
    }}>
      <div style={{ minWidth: 36, height: 36, borderRadius: 10, background: isDark ? 'rgba(239,68,68,0.15)' : 'rgba(239,68,68,0.1)', display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: k.red, fontWeight: 700 }}>✕</div>
      <div>
        <div style={{ fontWeight: 700, color: k.red, fontSize: 15, marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 14, color: k.ts, lineHeight: 1.6 }}>{desc}</div>
      </div>
    </div>
  );
}

function SolutionPoint({ label, desc, index, animate, isDark }: SolutionData & { index: number; animate: boolean; isDark: boolean }) {
  const k = t(isDark);
  return (
    <div style={{
      display: "flex", gap: 16, padding: "18px 20px",
      background: k.greenbg, border: `1px solid ${isDark ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0.08)'}`,
      borderRadius: 12, marginBottom: 12,
      opacity: animate ? 1 : 0, transform: animate ? "translateX(0)" : "translateX(20px)",
      transition: `all 0.5s cubic-bezier(.22,1,.36,1) ${index * 100 + 200}ms`,
    }}>
      <div style={{ minWidth: 36, height: 36, borderRadius: 10, background: isDark ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.1)', display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: k.green, fontWeight: 700 }}>✓</div>
      <div>
        <div style={{ fontWeight: 700, color: k.green, fontSize: 15, marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 14, color: k.ts, lineHeight: 1.6 }}>{desc}</div>
      </div>
    </div>
  );
}

function ProcessStep({ phase, title, desc, index, total, animate, isDark }: ProcessData & { index: number; total: number; animate: boolean; isDark: boolean }) {
  const k = t(isDark);
  return (
    <div style={{ display: "flex", gap: 20, opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(16px)", transition: `all 0.5s cubic-bezier(.22,1,.36,1) ${index * 120 + 200}ms` }}>
      <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", minWidth: 48 }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 800, color: "#fff", fontFamily: "'JetBrains Mono', monospace",
          boxShadow: isDark ? `0 0 20px ${ACCENT_GLOW}` : `0 2px 12px rgba(99,102,241,0.25)`,
        }}>{index + 1}</div>
        {index < total - 1 && <div style={{ width: 2, flex: 1, background: `linear-gradient(to bottom, ${ACCENT}60, transparent)`, marginTop: 6 }} />}
      </div>
      <div style={{ paddingBottom: 32 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, marginBottom: 4 }}>{phase}</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: k.tp, marginBottom: 6, fontFamily: "'Syne', sans-serif" }}>{title}</div>
        <div style={{ fontSize: 14, color: k.ts, lineHeight: 1.65 }}>{desc}</div>
      </div>
    </div>
  );
}

function BeforeAfterRow({ area, before, after, index, animate, isDark }: BeforeAfterData & { index: number; animate: boolean; isDark: boolean }) {
  const k = t(isDark);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(12px)", transition: `all 0.4s ease ${index * 80 + 150}ms` }}>
      <div style={{ padding: "14px 16px", background: k.sb, fontSize: 14, fontWeight: 600, color: k.tp }}>{area}</div>
      <div style={{ padding: "14px 16px", background: k.redbg, fontSize: 13, color: k.red }}><span style={{ opacity: 0.5, marginRight: 6 }}>✕</span>{before}</div>
      <div style={{ padding: "14px 16px", background: k.greenbg, fontSize: 13, color: k.green }}><span style={{ opacity: 0.7, marginRight: 6 }}>✓</span>{after}</div>
    </div>
  );
}

// ============================================================
// CASE STUDY DETAIL PAGE
// ============================================================

function CaseStudyPage({ study, isDark }: { study: CaseStudy; isDark: boolean }) {
  const k = t(isDark);
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
      <div ref={heroRef} style={{ padding: "60px 0 40px", opacity: heroInView ? 1 : 0, transform: heroInView ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(.22,1,.36,1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" as const }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: ACCENT, fontFamily: "'JetBrains Mono', monospace" }}>{study.label}</span>
          <span style={{ padding: "4px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, color: study.statusColor, background: `${study.statusColor}15`, border: `1px solid ${study.statusColor}30`, boxShadow: isDark ? `0 0 12px ${study.statusColor}20` : 'none' }}>{study.status}</span>
        </div>
        <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, color: k.tp, lineHeight: 1.1, margin: "0 0 16px", letterSpacing: '-0.04em', fontFamily: "'Syne', sans-serif" }}>{study.title}</h2>
        <p style={{ fontSize: 18, color: k.ts, lineHeight: 1.5, margin: "0 0 32px", maxWidth: 700 }}>{study.tagline}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
          {([{ label: "Timeline", value: study.timeline }, { label: "Team", value: study.teamSize }, { label: "Type", value: study.clientType }, { label: "Investment", value: study.investment }] as const).map((m) => (
            <div key={m.label} style={{ padding: "16px 18px", background: k.cb, border: `1px solid ${k.bd}`, borderRadius: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: k.tt, textTransform: "uppercase" as const, marginBottom: 6, fontFamily: "'JetBrains Mono', monospace" }}>{m.label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: k.tp }}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${k.divGradient}, transparent)`, margin: "10px 0 50px" }} />

      {/* Overview */}
      <div style={{ marginBottom: 60 }}>
        <SectionLabel isDark={isDark}>Project Overview</SectionLabel>
        <p style={{ fontSize: 16, color: k.ts, lineHeight: 1.8, margin: 0 }}>{study.overview}</p>
      </div>

      {/* Pain */}
      <div ref={painRef} style={{ marginBottom: 60 }}>
        <SectionLabel isDark={isDark}>The Client's Real Pain</SectionLabel>
        <SectionTitle isDark={isDark}>Problems That Needed Solving</SectionTitle>
        <p style={{ fontSize: 15, color: k.ts, lineHeight: 1.7, marginBottom: 24 }}>{study.pain.intro}</p>
        {study.pain.points.map((p, i) => <PainPoint key={i} {...p} index={i} animate={painInView} isDark={isDark} />)}
      </div>

      {/* Solution */}
      <div ref={solRef} style={{ marginBottom: 60 }}>
        <SectionLabel isDark={isDark}>Our Solution</SectionLabel>
        <SectionTitle isDark={isDark}>What We Built</SectionTitle>
        {study.solution.map((s, i) => <SolutionPoint key={i} {...s} index={i} animate={solInView} isDark={isDark} />)}
        {study.keyDecision && (
          <div style={{ marginTop: 24, padding: "24px 28px", background: isDark ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.04)', border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'}`, borderRadius: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: ACCENT, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 }}>KEY ARCHITECTURE DECISION</div>
            <p style={{ fontSize: 14, color: k.ts, lineHeight: 1.7, margin: 0 }}>{study.keyDecision}</p>
          </div>
        )}
      </div>

      {/* Tech Stack */}
      <div ref={techRef} style={{ marginBottom: 60 }}>
        <SectionLabel isDark={isDark}>Technology Stack</SectionLabel>
        <SectionTitle isDark={isDark}>Built With Purpose</SectionTitle>
        <div style={{ display: "flex", flexWrap: "wrap" as const, marginBottom: 24 }}>
          {study.techTags.map((tag) => (
            <span key={tag} style={{ display: "inline-block", padding: "6px 16px", background: isDark ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)', border: `1px solid ${isDark ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.12)'}`, borderRadius: 999, fontSize: 13, fontWeight: 600, color: isDark ? '#c7d2fe' : ACCENT, marginRight: 8, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>{tag}</span>
          ))}
        </div>
        <div style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${k.bd}`, opacity: techInView ? 1 : 0, transform: techInView ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s cubic-bezier(.22,1,.36,1) 200ms" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr 1.7fr", background: k.sb }}>
            {["Layer", "Technology", "Why We Chose It"].map((h) => (
              <div key={h} style={{ padding: "14px 18px", fontSize: 12, fontWeight: 700, color: k.tt, letterSpacing: 1, textTransform: "uppercase" as const, fontFamily: "'JetBrains Mono', monospace" }}>{h}</div>
            ))}
          </div>
          {study.tech.map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr 1.7fr", borderTop: `1px solid ${k.bd}`, background: i % 2 ? k.cb : 'transparent' }}>
              <div style={{ padding: "14px 18px", fontSize: 14, fontWeight: 700, color: ACCENT }}>{row.layer}</div>
              <div style={{ padding: "14px 18px", fontSize: 14, fontWeight: 600, color: k.tp }}>{row.tech}</div>
              <div style={{ padding: "14px 18px", fontSize: 13, color: k.ts }}>{row.why}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Before vs After */}
      <div ref={baRef} style={{ marginBottom: 60 }}>
        <SectionLabel isDark={isDark}>Before vs. After</SectionLabel>
        <SectionTitle isDark={isDark}>The Transformation</SectionTitle>
        <div style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${k.bd}` }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: k.sb }}>
            <div style={{ padding: "14px 16px", fontSize: 12, fontWeight: 700, color: k.tt, letterSpacing: 1, textTransform: "uppercase" as const, fontFamily: "'JetBrains Mono', monospace" }}>Area</div>
            <div style={{ padding: "14px 16px", fontSize: 12, fontWeight: 700, color: k.red, letterSpacing: 1, textTransform: "uppercase" as const, fontFamily: "'JetBrains Mono', monospace" }}>Before</div>
            <div style={{ padding: "14px 16px", fontSize: 12, fontWeight: 700, color: k.green, letterSpacing: 1, textTransform: "uppercase" as const, fontFamily: "'JetBrains Mono', monospace" }}>After</div>
          </div>
          {study.beforeAfter.map((b, i) => <BeforeAfterRow key={i} {...b} index={i} animate={baInView} isDark={isDark} />)}
        </div>
      </div>

      {/* Process */}
      <div ref={procRef} style={{ marginBottom: 60 }}>
        <SectionLabel isDark={isDark}>Development Process</SectionLabel>
        <SectionTitle isDark={isDark}>How We Built It</SectionTitle>
        <div style={{ paddingLeft: 4 }}>
          {study.process.map((p, i) => <ProcessStep key={i} {...p} index={i} total={study.process.length} animate={procInView} isDark={isDark} />)}
        </div>
      </div>

      {/* Results */}
      <div ref={resRef} style={{ marginBottom: 60 }}>
        <SectionLabel isDark={isDark}>Results & Impact</SectionLabel>
        <SectionTitle isDark={isDark}>Measurable Outcomes</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(study.results.length, 4)}, 1fr)`, gap: 16 }}>
          {study.results.map((r, i) => <ResultCard key={i} {...r} delay={i * 120} animate={resInView} isDark={isDark} />)}
        </div>
      </div>

      {/* Testimonial */}
      <div ref={testRef} style={{ marginBottom: 60 }}>
        <div style={{
          padding: "40px 36px",
          background: isDark ? 'rgba(99,102,241,0.04)' : 'rgba(99,102,241,0.03)',
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: "0 16px 16px 0",
          opacity: testInView ? 1 : 0, transform: testInView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s cubic-bezier(.22,1,.36,1)",
          boxShadow: isDark ? `-4px 0 24px ${ACCENT_GLOW}` : 'none',
        }}>
          <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 8, fontFamily: "Georgia, serif", background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>"</div>
          <p style={{ fontSize: 17, color: k.ts, lineHeight: 1.75, margin: "0 0 20px", fontStyle: "italic" }}>{study.testimonial.quote}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "#fff", boxShadow: isDark ? `0 0 16px ${ACCENT_GLOW}` : 'none' }}>{study.testimonial.author[0]}</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: k.tp }}>{study.testimonial.author}</div>
              <div style={{ fontSize: 13, color: k.tt }}>{study.testimonial.role}</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center" as const, padding: "48px 32px", background: isDark ? 'rgba(99,102,241,0.04)' : 'rgba(99,102,241,0.03)', borderRadius: 20, border: `1px solid ${isDark ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.08)'}`, marginBottom: 80 }}>
        <h3 style={{ fontSize: 24, fontWeight: 800, color: k.tp, margin: "0 0 10px", fontFamily: "'Syne', sans-serif" }}>Have a similar project?</h3>
        <p style={{ fontSize: 15, color: k.ts, margin: "0 0 28px" }}>Let's discuss how we can build your solution</p>
        <a href="mailto:hello@papatiger.tech" style={{
          display: "inline-block", padding: "14px 36px",
          background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`,
          color: "#fff", fontSize: 15, fontWeight: 700, borderRadius: 12, textDecoration: "none",
          boxShadow: `0 4px 24px ${ACCENT_GLOW}`,
          fontFamily: "'Syne', sans-serif",
        }}>Start Your Project →</a>
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function CaseStudies(): JSX.Element {
  const isDark = useTheme();
  const [activeStudy, setActiveStudy] = useState<number | null>(null);
  const [heroRef, heroInView] = useInView(0.05);
  const [gridRef, gridInView] = useInView(0.05);
  const k = t(isDark);

  // Load fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  // Scroll to section on study change
  useEffect(() => {
    const section = document.getElementById("Case_Studies");
    if (section) {
      const headerOffset = 80;
      const top = section.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [activeStudy]);

  // ---- DETAIL VIEW ----
  if (activeStudy !== null) {
    const study = caseStudies[activeStudy];
    return (
      <div id="Case_Studies" style={{ minHeight: "100vh", background: k.bg, fontFamily: "'Syne', sans-serif", color: k.tp }}>
        {/* Ambient */}
        <div style={{ position: "fixed" as const, inset: 0, zIndex: 0, pointerEvents: "none" as const }}>
          <div style={{ position: "absolute", top: -200, right: -200, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${isDark ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.03)'}, transparent 70%)`, filter: 'blur(40px)' }} />
          <div style={{ position: "absolute", bottom: -200, left: -200, width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${isDark ? 'rgba(34,211,238,0.04)' : 'rgba(34,211,238,0.02)'}, transparent 70%)`, filter: 'blur(40px)' }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ padding: "24px 0" }}>
            <button onClick={() => setActiveStudy(null)} style={{
              background: k.cb, border: `1px solid ${k.bd}`, borderRadius: 10, padding: "10px 20px",
              color: k.ts, fontSize: 14, fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s", fontFamily: "'Syne', sans-serif",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = k.cbh; e.currentTarget.style.color = k.tp; e.currentTarget.style.borderColor = k.bdh; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = k.cb; e.currentTarget.style.color = k.ts; e.currentTarget.style.borderColor = k.bd; }}
            >← All Case Studies</button>
          </div>
          <CaseStudyPage study={study} isDark={isDark} />
        </div>
      </div>
    );
  }

  // ---- LISTING PAGE ----
  return (
    <div id="Case_Studies" style={{ minHeight: "100vh", background: k.bg, fontFamily: "'Syne', sans-serif", color: k.tp, overflowX: "hidden" as const }}>
      {/* Ambient */}
      <div style={{ position: "fixed" as const, inset: 0, zIndex: 0, pointerEvents: "none" as const }}>
        <div style={{ position: "absolute", top: '-15%', left: "50%", transform: "translateX(-50%)", width: 800, height: 800, borderRadius: "50%", background: `radial-gradient(circle, ${isDark ? 'rgba(99,102,241,0.07)' : 'rgba(99,102,241,0.04)'}, transparent 70%)`, filter: 'blur(40px)' }} />
        <div style={{ position: "absolute", bottom: -200, right: -100, width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${isDark ? 'rgba(34,211,238,0.04)' : 'rgba(34,211,238,0.02)'}, transparent 70%)`, filter: 'blur(40px)' }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        {/* Hero */}
        <div ref={heroRef} style={{ textAlign: "center" as const, padding: "100px 0 80px", opacity: heroInView ? 1 : 0, transform: heroInView ? "translateY(0)" : "translateY(40px)", transition: "all 1s cubic-bezier(.22,1,.36,1)" }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, border: `1px solid ${k.bd}`, background: k.cb, marginBottom: 24, fontSize: 12, fontWeight: 600, color: k.ts }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: k.green, boxShadow: isDark ? `0 0 8px ${k.green}60` : 'none' }} />
            Real projects, real results
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 800, color: k.tp, lineHeight: 1.05, margin: "0 0 24px", letterSpacing: '-0.05em' }}>
            Case Studies
          </h1>
          <p style={{ fontSize: 19, color: k.ts, maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.6 }}>
            See how we've transformed business challenges into successful, scalable software solutions.
          </p>
          <div style={{ display: "inline-flex", gap: 1, background: k.cb, borderRadius: 16, overflow: "hidden", border: `1px solid ${k.bd}` }}>
            {([{ label: "Projects", value: "4" }, { label: "Industries", value: "4" }, { label: "Avg. Delivery", value: "10 wk" }, { label: "Success Rate", value: "100%" }] as const).map((s, i) => (
              <div key={i} style={{ padding: "20px 32px", borderRight: i < 3 ? `1px solid ${k.bd}` : "none" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: k.tp, fontFamily: "'Syne', sans-serif", fontVariantNumeric: 'tabular-nums' }}>{s.value}</div>
                <div style={{ fontSize: 12, color: k.tt, fontWeight: 600, marginTop: 4, letterSpacing: 0.5, fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))", gap: 24, paddingBottom: 100 }}>
          {caseStudies.map((study, index) => (
            <StudyCard key={study.id} study={study} index={index} gridInView={gridInView} isDark={isDark} onClick={() => setActiveStudy(index)} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center" as const, padding: "60px 32px 100px" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: k.tp, margin: "0 0 12px", fontFamily: "'Syne', sans-serif", letterSpacing: '-0.03em' }}>Ready to Start Building?</h2>
          <p style={{ fontSize: 16, color: k.ts, margin: "0 0 32px" }}>Let's turn your idea into production-ready software</p>
          <a href="mailto:hello@papatiger.tech" style={{
            display: "inline-block", padding: "16px 40px",
            background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`,
            color: "#fff", fontSize: 16, fontWeight: 700, borderRadius: 14, textDecoration: "none",
            boxShadow: `0 4px 30px ${ACCENT_GLOW}`,
            fontFamily: "'Syne', sans-serif",
          }}>Get Free Consultation</a>
        </div>
      </div>
    </div>
  );
}
