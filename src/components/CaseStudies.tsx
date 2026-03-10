'use client'

import { useState, useEffect, useRef, RefObject } from 'react'
import { motion, useInView as useFramerInView } from 'framer-motion'
import { ArrowLeft, CheckCircle2, XCircle, Clock, Users, DollarSign, Flame, Target, Zap } from 'lucide-react'
import ContactModal from './ContactModal';

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
  id: string
  label: string
  title: string
  tagline: string
  status: string
  statusColor: string
  emoji: string
  gradient: string
  timeline: string
  teamSize: string
  clientType: string
  industry: string
  investment: string
  overview: string
  pain: PainData
  solution: SolutionData[]
  keyDecision: string
  tech: TechData[]
  beforeAfter: BeforeAfterData[]
  process: ProcessData[]
  results: ResultData[]
  testimonial: TestimonialData
  techTags: string[]
}

// ============================================================
// DATA - All 4 Case Studies
// ============================================================

const caseStudies: CaseStudy[] = [
  {
    id: "portfolio-builder",
    label: "CASE STUDY 01",
    title: "Dynamic Portfolio Builder Platform",
    tagline: "No-code SaaS platform for professionals to create stunning portfolios in minutes",
    status: "Live & Scaling",
    statusColor: "#10b981",
    emoji: "🚀",
    gradient: "from-orange-500 to-red-500",
    timeline: "8 Weeks",
    teamSize: "2–3 Developers",
    clientType: "B2C SaaS",
    industry: "Creative Tech / Professional Services",
    investment: "$5,000 – $10,000",
    overview: "We partnered with an entrepreneur who saw a clear gap: talented professionals needed beautiful portfolio websites but lacked the technical skills to build them, and couldn't justify paying $3,000–$5,000 for custom development. We built a no-code SaaS platform that lets anyone — from graphic designers to real estate agents — create a professional, mobile-responsive portfolio in under 15 minutes.",
    pain: {
      intro: 'The founder had tried Wix, Squarespace, and WordPress. His feedback: "They\'re built for everything, which means they\'re perfect for nothing."',
      points: [
        { label: "Analysis paralysis", desc: "Existing tools had hundreds of templates and settings. Users would spend 3–4 hours customizing and still feel unsatisfied." },
        { label: "Mobile failures", desc: "Templates that looked great on desktop often broke on mobile, and users didn't know how to fix it." },
        { label: "No portfolio workflows", desc: "Generic builders lacked features like project galleries, skill sections, and testimonial displays." },
        { label: "Ongoing costs", desc: "Users were paying $15–$30/month for bloated platforms when they only needed 10% of the features." },
      ]
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
    testimonial: { quote: "What impressed me most wasn't just the technical execution — it was how they challenged my assumptions. They talked me out of 3 features that would have delayed launch by a month and instead focused on what users actually needed.", author: "Founder", role: "Portfolio Builder Platform" },
    techTags: ["Next.js", "React", "Node.js", "PostgreSQL", "AWS", "Tailwind CSS"],
  },
  {
    id: "nfc-business-card",
    label: "CASE STUDY 02",
    title: "NFC Digital Business Card Platform",
    tagline: "Tap your phone. Save the contact. Track the connection. Zero paper waste.",
    status: "Live & Operational",
    statusColor: "#10b981",
    emoji: "📱",
    gradient: "from-red-500 to-orange-600",
    timeline: "6 Weeks",
    teamSize: "2 Developers",
    clientType: "B2B SaaS",
    industry: "Digital Networking / Smart Business Tools",
    investment: "$4,000 – $8,000",
    overview: "We built a platform that lets professionals create digital business cards linked to physical NFC tags. When someone taps an NFC card with their phone, they instantly see the owner's professional profile — contact info, social links, portfolio, and a 'Save Contact' button — no app download required.",
    pain: {
      intro: "The founder attended 50+ networking events per year and was frustrated by the same broken cycle:",
      points: [
        { label: "Cards get lost", desc: "88% of paper business cards are thrown away within a week. Every discarded card is a lost connection." },
        { label: "Outdated info", desc: "Every job title or phone number change meant reprinting hundreds of cards and trashing the old stock." },
        { label: "No tracking", desc: "No idea if people actually looked at the card after receiving it. Was networking generating leads?" },
        { label: "Environmental waste", desc: "Handing out disposable paper cards felt contradictory to modern sustainability values." },
      ]
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
    testimonial: { quote: "At a recent conference, I shared my card with 40 people. Within a week, 32 had saved my contact and 8 reached out for meetings. With paper cards, I'd be lucky to hear from 2.", author: "Founder", role: "NFC Business Card Platform" },
    techTags: ["Next.js", "React", "Node.js", "PostgreSQL", "AWS", "CloudFront"],
  },
  {
    id: "kurav-ai-islamic",
    label: "CASE STUDY 03",
    title: "Kurav — AI-Powered Islamic Content Platform",
    tagline: "Verified AI answers with source references for the global Muslim community",
    status: "Live",
    statusColor: "#10b981",
    emoji: "🕌",
    gradient: "from-orange-600 to-yellow-500",
    timeline: "10 Weeks",
    teamSize: "2 Devs + AI Specialist",
    clientType: "B2C Content Platform",
    industry: "Faith-Based EdTech / AI Content",
    investment: "$8,000 – $12,000",
    overview: "Kurav is an AI-powered platform that delivers personalized Islamic educational content. It uses AI to answer questions about Islamic teachings, generate contextual explanations of Quran verses and Hadith, and create customized learning paths based on the user's knowledge level — all with source referencing and theological accuracy.",
    pain: {
      intro: "The founder identified a growing problem in the Muslim community:",
      points: [
        { label: "Information overload", desc: "Thousands of conflicting answers from unverified sources, leading to confusion rather than clarity." },
        { label: "Language barriers", desc: "Authoritative scholarship is mostly in Arabic, while millions of Muslims speak only English, Bangla, or Urdu." },
        { label: "No personalization", desc: "A new Muslim and a lifelong scholar have different needs, but existing resources treat everyone the same." },
        { label: "Trust deficit", desc: "Generic AI tools sometimes provide inaccurate or out-of-context religious information, which can be harmful." },
      ]
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
    testimonial: { quote: "They didn't just build a tech platform — they took the time to understand why accuracy matters in Islamic content. The scholar review system was their suggestion, not mine, and it's become one of our most important features.", author: "Founder", role: "Kurav Platform" },
    techTags: ["Next.js", "React", "Node.js", "OpenAI", "PostgreSQL", "MongoDB", "AWS"],
  },
  {
    id: "esg-reporting",
    label: "CASE STUDY 04",
    title: "ESG Reporting Platform for German Companies",
    tagline: "Turning 200+ hours of manual compliance into a guided, semi-automated workflow",
    status: "In Progress",
    statusColor: "#f59e0b",
    emoji: "📊",
    gradient: "from-yellow-500 to-orange-500",
    timeline: "16 Weeks",
    teamSize: "2 Senior Devs + Consultant",
    clientType: "B2B Enterprise SaaS",
    industry: "ESG / Regulatory Compliance",
    investment: "$12,000+",
    overview: "European companies are now required to report on ESG metrics under the EU's CSRD. We're building a platform that simplifies this complex compliance process for German mid-market companies (500–5,000 employees) who don't have dedicated sustainability teams. The platform collects data, maps it to CSRD frameworks, generates compliant reports, and tracks progress.",
    pain: {
      intro: "The client is a German consulting firm whose corporate clients were panicking about CSRD compliance:",
      points: [
        { label: "Regulatory complexity", desc: "Hundreds of data points across environmental, social, and governance categories. Most companies don't know which ones apply." },
        { label: "Scattered data", desc: "ESG data lives in HR systems, energy bills, supply chain databases, and finance tools. No unified view." },
        { label: "Manual reporting", desc: "200+ hours per reporting cycle using spreadsheets, with high error rates and no audit trail." },
        { label: "Deadline pressure", desc: "CSRD is mandatory starting 2025 with significant penalties for non-compliance." },
        { label: "Consultant dependency", desc: "Companies paying $50,000–$100,000 per report to external consultants due to lack of tooling." },
      ]
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
    testimonial: { quote: "They asked hard questions about our multi-tenant strategy and GDPR compliance that the other agencies never raised. Their suggestion to use row-level security saved us from what would have been a costly re-architecture.", author: "Managing Director", role: "German ESG Consulting Firm" },
    techTags: ["Next.js", "React", "Node.js", "PostgreSQL", "AWS (EU)", "Docker"],
  },
]

// ============================================================
// HOOKS
// ============================================================

function useTheme() {
  const [d, setD] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    const c = () => setD(document.documentElement.classList.contains('dark'))
    c()
    const o = new MutationObserver(c)
    o.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => o.disconnect()
  }, [])
  
  if (!mounted) return false
  return d
}

function useCountUp(end: string, duration: number = 1500, start: boolean = false): number {
  const [val, setVal] = useState<number>(0)
  const started = useRef(false)
  
  useEffect(() => {
    if (!start || started.current) return
    started.current = true
    let startTime: number | null = null
    const numEnd = parseInt(String(end).replace(/[^0-9]/g, "")) || 0
    
    function step(ts: number) {
      if (!startTime) startTime = ts
      const p = Math.min((ts - startTime) / duration, 1)
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * numEnd))
      if (p < 1) requestAnimationFrame(step)
      else setVal(numEnd)
    }
    
    requestAnimationFrame(step)
  }, [start, end, duration])
  
  return val
}

// ============================================================
// DETAIL PAGE SUB-COMPONENTS
// ============================================================

function ResultCard({ metric, value, impact, delay, animate, isDark }: ResultData & { delay: number; animate: boolean; isDark: boolean }) {
  const numVal = useCountUp(value, 1200, animate)
  const suffix = String(value).replace(/[0-9]/g, "")
  const hasNum = /[0-9]/.test(value)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className={`p-6 rounded-xl text-center ${
        isDark ? 'bg-gray-900/50 border border-orange-500/20' : 'bg-white border border-orange-200'
      }`}
    >
      <div className="text-4xl font-black font-['Rubik'] tabular-nums mb-2">
        <span className={isDark ? 'text-gray-50' : 'text-gray-900'}>
          {hasNum ? numVal : value}
        </span>
        <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent dark:from-orange-400 dark:to-red-400">
          {hasNum ? suffix : ''}
        </span>
      </div>
      <div className={`text-base font-bold font-['Rubik'] mb-1 ${
        isDark ? 'text-gray-200' : 'text-gray-800'
      }`}>
        {metric}
      </div>
      <div className={`text-sm font-medium font-['Quicksand'] ${
        isDark ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {impact}
      </div>
    </motion.div>
  )
}

function PainPoint({ label, desc, index, animate, isDark }: PainPointData & { index: number; animate: boolean; isDark: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={animate ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: (index * 100 + 200) / 1000 }}
      className={`flex gap-4 p-5 rounded-xl mb-3 ${
        isDark
          ? 'bg-red-500/10 border border-red-500/20'
          : 'bg-red-50 border border-red-200'
      }`}
    >
      <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-lg font-bold ${
        isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
      }`}>
        ✕
      </div>
      <div>
        <div className={`font-bold text-base mb-1 font-['Rubik'] ${
          isDark ? 'text-red-400' : 'text-red-600'
        }`}>
          {label}
        </div>
        <div className={`text-sm leading-relaxed font-['Quicksand'] ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {desc}
        </div>
      </div>
    </motion.div>
  )
}

function SolutionPoint({ label, desc, index, animate, isDark }: SolutionData & { index: number; animate: boolean; isDark: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={animate ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: (index * 100 + 200) / 1000 }}
      className={`flex gap-4 p-5 rounded-xl mb-3 ${
        isDark
          ? 'bg-green-500/10 border border-green-500/20'
          : 'bg-green-50 border border-green-200'
      }`}
    >
      <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-lg font-bold ${
        isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
      }`}>
        ✓
      </div>
      <div>
        <div className={`font-bold text-base mb-1 font-['Rubik'] ${
          isDark ? 'text-green-400' : 'text-green-600'
        }`}>
          {label}
        </div>
        <div className={`text-sm leading-relaxed font-['Quicksand'] ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {desc}
        </div>
      </div>
    </motion.div>
  )
}

function ProcessStep({ phase, title, desc, index, total, animate, isDark }: ProcessData & { index: number; total: number; animate: boolean; isDark: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index * 120 + 200) / 1000 }}
      className="flex gap-5"
    >
      <div className="flex flex-col items-center min-w-[3rem]">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-sm font-black text-white font-['Rubik'] shadow-lg">
          {index + 1}
        </div>
        {index < total - 1 && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-orange-500/60 to-transparent mt-2" />
        )}
      </div>
      <div className="pb-8">
        <div className={`text-xs font-black tracking-wider mb-1 font-['Rubik'] ${
          isDark ? 'text-orange-400' : 'text-orange-600'
        }`}>
          {phase}
        </div>
        <div className={`text-lg font-bold mb-2 font-['Rubik'] ${
          isDark ? 'text-gray-50' : 'text-gray-900'
        }`}>
          {title}
        </div>
        <div className={`text-sm leading-relaxed font-['Quicksand'] ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {desc}
        </div>
      </div>
    </motion.div>
  )
}

function BeforeAfterRow({ area, before, after, index, animate, isDark }: BeforeAfterData & { index: number; animate: boolean; isDark: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: (index * 80 + 150) / 1000 }}
      className="grid grid-cols-3 gap-px"
    >
      <div className={`p-4 text-sm font-semibold font-['Rubik'] ${
        isDark ? 'bg-gray-800/50 text-gray-200' : 'bg-gray-100 text-gray-800'
      }`}>
        {area}
      </div>
      <div className={`p-4 text-sm font-medium font-['Quicksand'] ${
        isDark ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-700'
      }`}>
        <span className="opacity-50 mr-2">✕</span>{before}
      </div>
      <div className={`p-4 text-sm font-medium font-['Quicksand'] ${
        isDark ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-700'
      }`}>
        <span className="opacity-70 mr-2">✓</span>{after}
      </div>
    </motion.div>
  )
}

// Listing card component (from previous code - same but with all 4 studies)
function StudyCard({ study, index, animate, isDark, onClick }: { 
  study: CaseStudy
  index: number
  animate: boolean
  isDark: boolean
  onClick: () => void 
}) {
  const [h, setH] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={animate ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className={`relative p-8 rounded-2xl cursor-pointer overflow-hidden ${
        isDark
          ? 'bg-gradient-to-br from-gray-900/70 to-gray-950/70 border-2 border-orange-500/30 hover:border-orange-500/60'
          : 'bg-white border-2 border-orange-300/60 hover:border-orange-500'
      }`}
      style={{
        boxShadow: h
          ? isDark
            ? '0 25px 70px rgba(255, 140, 0, 0.35), 0 0 50px rgba(255, 140, 0, 0.15)'
            : '0 25px 70px rgba(255, 140, 0, 0.25), 0 10px 40px rgba(0, 0, 0, 0.12)'
          : isDark
          ? '0 4px 20px rgba(0, 0, 0, 0.4)'
          : '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Animated gradient top bar */}
      <motion.div
        animate={h ? {
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        } : {}}
        transition={{ duration: 3, repeat: Infinity }}
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${study.gradient}`}
        style={{
          backgroundSize: '200% 200%',
          opacity: h ? 1 : 0.3,
        }}
      />

      {/* Tiger paw decoration */}
      <div className="absolute top-4 right-4 text-3xl opacity-10">
        🐾
      </div>

      {/* Label + Status */}
      <div className="flex justify-between items-center mb-4">
        <span className={`text-xs font-black tracking-wider font-['Rubik'] ${
          isDark ? 'text-gray-500' : 'text-gray-600'
        }`}>
          {study.label}
        </span>
        <motion.div
          animate={h ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.5 }}
          className="px-3 py-1 rounded-full text-xs font-bold"
          style={{
            color: study.statusColor,
            backgroundColor: `${study.statusColor}20`,
            border: `1px solid ${study.statusColor}40`,
          }}
        >
          {study.status}
        </motion.div>
      </div>

      {/* Title */}
      <h3 className={`text-2xl font-black mb-3 font-['Rubik'] tracking-tight flex items-center gap-2 ${
        isDark ? 'text-gray-50' : 'text-gray-900'
      }`}>
        <span>{study.title}</span>
        <span className="text-2xl">{study.emoji}</span>
      </h3>

      {/* Tagline */}
      <p className={`text-sm font-medium font-['Quicksand'] mb-6 ${
        isDark ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {study.tagline}
      </p>

      {/* Quick stats */}
      <div className="flex flex-wrap gap-4 mb-6">
        {[
          { icon: Clock, value: study.timeline },
          { icon: Users, value: study.teamSize },
          { icon: DollarSign, value: study.investment },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="flex items-center gap-2">
              <Icon className={`w-4 h-4 ${
                isDark ? 'text-orange-400' : 'text-orange-600'
              }`} />
              <span className={`text-sm font-medium font-['Quicksand'] ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stat.value}
              </span>
            </div>
          )
        })}
      </div>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {study.techTags.slice(0, 5).map((tag) => (
          <span
            key={tag}
            className={`px-3 py-1 rounded-full text-xs font-bold font-['Rubik'] ${
              isDark
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                : 'bg-orange-100 text-orange-700 border border-orange-300'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Results preview */}
      <div className="flex gap-3">
        {study.results.slice(0, 3).map((r, i) => (
          <div
            key={i}
            className={`flex-1 p-3 rounded-xl text-center ${
              isDark ? 'bg-gray-800/50' : 'bg-gray-100'
            }`}
          >
            <div className={`text-xl font-black font-['Rubik'] tabular-nums ${
              isDark ? 'text-orange-300' : 'text-orange-600'
            }`}>
              {r.value}
            </div>
            <div className={`text-xs font-medium font-['Quicksand'] mt-1 ${
              isDark ? 'text-gray-500' : 'text-gray-600'
            }`}>
              {r.metric}
            </div>
          </div>
        ))}
      </div>

      {/* View link */}
      <motion.div
        animate={h ? { x: [0, 5, 0] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
        className="flex items-center justify-end mt-6 gap-2 text-sm font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent dark:from-orange-400 dark:to-red-400 font-['Rubik']"
      >
        Read Full Story 🐯
      </motion.div>

      {/* Hover tiger emoji */}
      {h && (
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute bottom-6 right-6 text-4xl opacity-20"
        >
          🐯
        </motion.div>
      )}
    </motion.div>
  )
}

// ============================================================
// CASE STUDY DETAIL PAGE
// ============================================================

function CaseStudyDetail({ study, isDark, onBack }: { study: CaseStudy; isDark: boolean; onBack: () => void }) {


  
    

  const headerRef = useRef(null)
  const painRef = useRef(null)
  const solRef = useRef(null)
  const techRef = useRef(null)
  const baRef = useRef(null)
  const procRef = useRef(null)
  const resRef = useRef(null)
  const testRef = useRef(null)
  
  const headerInView = useFramerInView(headerRef, { once: true, amount: 0.1 })
  const painInView = useFramerInView(painRef, { once: true, amount: 0.2 })
  const solInView = useFramerInView(solRef, { once: true, amount: 0.2 })
  const techInView = useFramerInView(techRef, { once: true, amount: 0.2 })
  const baInView = useFramerInView(baRef, { once: true, amount: 0.2 })
  const procInView = useFramerInView(procRef, { once: true, amount: 0.2 })
  const resInView = useFramerInView(resRef, { once: true, amount: 0.2 })
  const testInView = useFramerInView(testRef, { once: true, amount: 0.3 })

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back button */}
      <motion.button
        onClick={onBack}
        whileHover={{ x: -5 }}
        className={`flex items-center gap-2 mb-8 px-4 py-2 rounded-lg font-['Rubik'] font-semibold ${
          isDark
            ? 'bg-gray-900/50 border border-orange-500/20 text-gray-300 hover:border-orange-500/40'
            : 'bg-white border border-orange-200 text-gray-700 hover:border-orange-400'
        }`}
      >
        <ArrowLeft className="w-5 h-5" />
        All Case Studies
      </motion.button>

      {/* Hero */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <span className={`text-xs font-black tracking-wider font-['Rubik'] ${
            isDark ? 'text-orange-400' : 'text-orange-600'
          }`}>
            {study.label}
          </span>
          <span
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{
              color: study.statusColor,
              backgroundColor: `${study.statusColor}20`,
              border: `1px solid ${study.statusColor}40`,
            }}
          >
            {study.status}
          </span>
        </div>

        <h1 className={`text-4xl lg:text-6xl font-black mb-4 font-['Rubik'] tracking-tight flex items-center gap-3 ${
          isDark ? 'text-gray-50' : 'text-gray-900'
        }`}>
          {study.title}
          <span className="text-5xl">{study.emoji}</span>
        </h1>

        <p className={`text-xl mb-8 font-['Quicksand'] font-medium ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {study.tagline}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Timeline", value: study.timeline },
            { label: "Team", value: study.teamSize },
            { label: "Type", value: study.clientType },
            { label: "Investment", value: study.investment },
          ].map((meta) => (
            <div
              key={meta.label}
              className={`p-4 rounded-xl ${
                isDark ? 'bg-gray-900/50 border border-orange-500/20' : 'bg-white border border-orange-200'
              }`}
            >
              <div className={`text-xs font-black tracking-wider mb-2 font-['Rubik'] uppercase ${
                isDark ? 'text-gray-500' : 'text-gray-600'
              }`}>
                {meta.label}
              </div>
              <div className={`text-base font-bold font-['Rubik'] ${
                isDark ? 'text-gray-50' : 'text-gray-900'
              }`}>
                {meta.value}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Divider */}
      <div className={`h-px mb-16 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent`} />

      {/* Overview */}
      <div className="mb-16">
        <div className={`text-xs font-black tracking-wider mb-3 font-['Rubik'] uppercase ${
          isDark ? 'text-orange-400' : 'text-orange-600'
        }`}>
          Project Overview 🎯
        </div>
        <p className={`text-lg leading-relaxed font-['Quicksand'] ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {study.overview}
        </p>
      </div>

      {/* Pain */}
      <div ref={painRef} className="mb-16">
        <div className={`text-xs font-black tracking-wider mb-3 font-['Rubik'] uppercase ${
          isDark ? 'text-orange-400' : 'text-orange-600'
        }`}>
          The Client's Real Pain 😤
        </div>
        <h3 className={`text-3xl font-black mb-4 font-['Rubik'] ${
          isDark ? 'text-gray-50' : 'text-gray-900'
        }`}>
          Problems That Needed Solving
        </h3>
        <p className={`text-base mb-6 leading-relaxed font-['Quicksand'] ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {study.pain.intro}
        </p>
        {study.pain.points.map((p, i) => (
          <PainPoint key={i} {...p} index={i} animate={painInView} isDark={isDark} />
        ))}
      </div>

      {/* Solution */}
      <div ref={solRef} className="mb-16">
        <div className={`text-xs font-black tracking-wider mb-3 font-['Rubik'] uppercase ${
          isDark ? 'text-orange-400' : 'text-orange-600'
        }`}>
          Our Solution 💪
        </div>
        <h3 className={`text-3xl font-black mb-6 font-['Rubik'] ${
          isDark ? 'text-gray-50' : 'text-gray-900'
        }`}>
          What We Built
        </h3>
        {study.solution.map((s, i) => (
          <SolutionPoint key={i} {...s} index={i} animate={solInView} isDark={isDark} />
        ))}
        {study.keyDecision && (
          <div className={`mt-6 p-6 rounded-xl ${
            isDark
              ? 'bg-orange-500/10 border border-orange-500/20'
              : 'bg-orange-50 border border-orange-200'
          }`}>
            <div className={`text-xs font-black tracking-wider mb-2 font-['Rubik'] ${
              isDark ? 'text-orange-400' : 'text-orange-600'
            }`}>
              KEY ARCHITECTURE DECISION 🎯
            </div>
            <p className={`text-sm leading-relaxed font-['Quicksand'] ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {study.keyDecision}
            </p>
          </div>
        )}
      </div>

      {/* Tech Stack */}
      <div ref={techRef} className="mb-16">
        <div className={`text-xs font-black tracking-wider mb-3 font-['Rubik'] uppercase ${
          isDark ? 'text-orange-400' : 'text-orange-600'
        }`}>
          Technology Stack ⚡
        </div>
        <h3 className={`text-3xl font-black mb-6 font-['Rubik'] ${
          isDark ? 'text-gray-50' : 'text-gray-900'
        }`}>
          Built With Purpose
        </h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {study.techTags.map((tag) => (
            <span
              key={tag}
              className={`px-4 py-2 rounded-full text-sm font-bold font-['Rubik'] ${
                isDark
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                  : 'bg-orange-100 text-orange-700 border border-orange-300'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={techInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`rounded-xl overflow-hidden border-2 ${
            isDark ? 'border-orange-500/20' : 'border-orange-200'
          }`}
        >
          <div className={`grid grid-cols-[1fr_1.3fr_1.7fr] ${
            isDark ? 'bg-gray-900/50' : 'bg-gray-50'
          }`}>
            {["Layer", "Technology", "Why We Chose It"].map((h) => (
              <div
                key={h}
                className={`p-4 text-xs font-black tracking-wider font-['Rubik'] uppercase ${
                  isDark ? 'text-gray-500' : 'text-gray-600'
                }`}
              >
                {h}
              </div>
            ))}
          </div>
          {study.tech.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-[1fr_1.3fr_1.7fr] border-t ${
                isDark ? 'border-orange-500/10' : 'border-orange-100'
              } ${i % 2 ? (isDark ? 'bg-gray-900/20' : 'bg-white') : ''}`}
            >
              <div className={`p-4 text-sm font-bold font-['Rubik'] ${
                isDark ? 'text-orange-400' : 'text-orange-600'
              }`}>
                {row.layer}
              </div>
              <div className={`p-4 text-sm font-semibold font-['Rubik'] ${
                isDark ? 'text-gray-200' : 'text-gray-800'
              }`}>
                {row.tech}
              </div>
              <div className={`p-4 text-sm font-medium font-['Quicksand'] ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {row.why}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Before vs After */}
      <div ref={baRef} className="mb-16">
        <div className={`text-xs font-black tracking-wider mb-3 font-['Rubik'] uppercase ${
          isDark ? 'text-orange-400' : 'text-orange-600'
        }`}>
          Before vs. After 🔄
        </div>
        <h3 className={`text-3xl font-black mb-6 font-['Rubik'] ${
          isDark ? 'text-gray-50' : 'text-gray-900'
        }`}>
          The Transformation
        </h3>
        <div className={`rounded-xl overflow-hidden border-2 ${
          isDark ? 'border-orange-500/20' : 'border-orange-200'
        }`}>
          <div className={`grid grid-cols-3 ${
            isDark ? 'bg-gray-900/50' : 'bg-gray-50'
          }`}>
            <div className={`p-4 text-xs font-black tracking-wider font-['Rubik'] uppercase ${
              isDark ? 'text-gray-500' : 'text-gray-600'
            }`}>
              Area
            </div>
            <div className={`p-4 text-xs font-black tracking-wider font-['Rubik'] uppercase ${
              isDark ? 'text-red-400' : 'text-red-600'
            }`}>
              Before
            </div>
            <div className={`p-4 text-xs font-black tracking-wider font-['Rubik'] uppercase ${
              isDark ? 'text-green-400' : 'text-green-600'
            }`}>
              After
            </div>
          </div>
          {study.beforeAfter.map((b, i) => (
            <BeforeAfterRow key={i} {...b} index={i} animate={baInView} isDark={isDark} />
          ))}
        </div>
      </div>

      {/* Process */}
      <div ref={procRef} className="mb-16">
        <div className={`text-xs font-black tracking-wider mb-3 font-['Rubik'] uppercase ${
          isDark ? 'text-orange-400' : 'text-orange-600'
        }`}>
          Development Process 🛠️
        </div>
        <h3 className={`text-3xl font-black mb-8 font-['Rubik'] ${
          isDark ? 'text-gray-50' : 'text-gray-900'
        }`}>
          How We Built It
        </h3>
        {study.process.map((p, i) => (
          <ProcessStep key={i} {...p} index={i} total={study.process.length} animate={procInView} isDark={isDark} />
        ))}
      </div>

      {/* Results */}
      <div ref={resRef} className="mb-16">
        <div className={`text-xs font-black tracking-wider mb-3 font-['Rubik'] uppercase ${
          isDark ? 'text-orange-400' : 'text-orange-600'
        }`}>
          Results & Impact 📊
        </div>
        <h3 className={`text-3xl font-black mb-8 font-['Rubik'] ${
          isDark ? 'text-gray-50' : 'text-gray-900'
        }`}>
          Measurable Outcomes
        </h3>
        <div className={`grid grid-cols-1 md:grid-cols-${Math.min(study.results.length, 4)} gap-4`}>
          {study.results.map((r, i) => (
            <ResultCard key={i} {...r} delay={i * 120} animate={resInView} isDark={isDark} />
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div ref={testRef} className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={testInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className={`p-8 rounded-2xl border-l-4 ${
            isDark
              ? 'bg-orange-500/5 border-orange-500'
              : 'bg-orange-50 border-orange-400'
          }`}
          style={{
            boxShadow: isDark ? '-4px 0 24px rgba(255, 140, 0, 0.1)' : 'none',
          }}
        >
          <div className="text-5xl mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent dark:from-orange-400 dark:to-red-400">
            "
          </div>
          <p className={`text-lg leading-relaxed mb-6 italic font-['Quicksand'] ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {study.testimonial.quote}
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-xl font-black text-white shadow-lg">
              {study.testimonial.author[0]}
            </div>
            <div>
              <div className={`font-bold font-['Rubik'] ${
                isDark ? 'text-gray-50' : 'text-gray-900'
              }`}>
                {study.testimonial.author}
              </div>
              <div className={`text-sm font-['Quicksand'] ${
                isDark ? 'text-gray-500' : 'text-gray-600'
              }`}>
                {study.testimonial.role}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA */}
      <div className={`text-center p-12 rounded-2xl border-2 ${
        isDark
          ? 'bg-orange-500/5 border-orange-500/20'
          : 'bg-orange-50 border-orange-200'
      }`}>
        <h3 className={`text-3xl font-black mb-4 font-['Rubik'] ${
          isDark ? 'text-gray-50' : 'text-gray-900'
        }`}>
          Have a similar project? 🚀
        </h3>
        <p className={`text-base mb-6 font-['Quicksand'] ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Let's discuss how we can build your solution with tiger power!
        </p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="mailto:hello@papatiger.tech"
          className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white font-bold text-base font-['Rubik'] shadow-lg"
        >
          Start Your Project 🐯 →
        </motion.a>
      </div>
    </div>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function CaseStudies() {

  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const isDark = useTheme()
  const [activeStudy, setActiveStudy] = useState<number | null>(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const headerInView = useFramerInView(headerRef, { once: true, amount: 0.3 })
  const gridInView = useFramerInView(gridRef, { once: true, amount: 0.1 })

  useEffect(() => {
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&family=Quicksand:wght@400;500;600;700&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    return () => { document.head.removeChild(link) }
  }, [])

  // Scroll handling
  useEffect(() => {
    const section = document.getElementById("Case_Studies")
    if (section && activeStudy !== null) {
      const top = section.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top, behavior: "smooth" })
    }
  }, [activeStudy])

  // Detail view
  if (activeStudy !== null) {
    return (
      <section
        
        className={`relative min-h-screen py-24 overflow-hidden ${
          isDark
            ? 'bg-gradient-to-b from-gray-950 via-orange-950/10 to-gray-950'
            : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'
        }`}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&family=Quicksand:wght@400;500;600;700&display=swap');
        `}</style>

        {/* Gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/20 dark:bg-orange-500/10 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <CaseStudyDetail
            study={caseStudies[activeStudy]}
            isDark={isDark}
            onBack={() => setActiveStudy(null)}
          />
        </div>
      </section>
    )
  }

  // Listing view
  return (

    
    <section
      id="CaseStudies"
      className={`relative py-24 lg:py-32 overflow-hidden ${
        isDark
          ? 'bg-gradient-to-b from-gray-950 via-orange-950/10 to-gray-950'
          : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'
      }`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&family=Quicksand:wght@400;500;600;700&display=swap');
      `}</style>

      {/* Tiger stripe background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="caseStripes" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
              <path d="M30,20 Q60,50 30,80" stroke={isDark ? "#FF8C00" : "#FF6B00"} strokeWidth="8" fill="none" opacity="0.3"/>
              <path d="M120,40 Q150,80 120,120" stroke={isDark ? "#FF8C00" : "#FF6B00"} strokeWidth="10" fill="none" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#caseStripes)" />
        </svg>
      </div>

      {/* Gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 dark:bg-orange-500/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={headerInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-orange-300 dark:border-orange-700 bg-orange-100 dark:bg-orange-950/50 mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Target className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </motion.div>
            <span className="text-sm font-bold text-orange-900 dark:text-orange-100 font-['Rubik']">
              Real Projects, Real Results 💪
            </span>
          </motion.div>

          {/* Title */}
          <h2 className="text-4xl lg:text-6xl font-black mb-4 font-['Rubik'] tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className={`block ${isDark ? 'text-gray-50' : 'text-gray-900'}`}
            >
              Case Studies That
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={headerInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
              className="block bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent dark:from-orange-400 dark:via-red-400 dark:to-orange-400"
            >
              ROAR! 🐯
            </motion.span>
          </h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
            className={`text-lg lg:text-xl max-w-2xl mx-auto font-['Quicksand'] font-medium ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            See how we've transformed business challenges into successful, scalable software with tiger power! 🔥
          </motion.p>

          {/* Stats */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.6 }}
              className={`grid grid-cols-2 md:inline-flex mt-8 rounded-2xl overflow-hidden border-2 ${
                isDark ? 'border-orange-700/50 bg-gray-900/50' : 'border-orange-300 bg-white'
              }`}
            >
              {[
                { label: "Projects", value: "4", emoji: "🚀" },
                { label: "Industries", value: "4", emoji: "🎯" },
                { label: "Avg. Delivery", value: "10 wk", emoji: "⚡" },
                { label: "Success Rate", value: "100%", emoji: "💪" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`px-4 py-4 md:px-8 border-orange-200/50 
                    ${isDark ? 'border-orange-700/50' : 'border-orange-200'}
                    /* Mobile Borders: Right border for odd items, bottom for first two */
                    ${i % 2 === 0 ? 'border-r' : ''} 
                    ${i < 2 ? 'border-b md:border-b-0' : ''}
                    /* Desktop Borders: Right border for all except last */
                    ${i < 3 ? 'md:border-r' : 'md:border-r-0'}
                  `}
                >
                  <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 justify-center mb-1">
                    <span className="text-xl md:text-2xl">{stat.emoji}</span>
                    <div className={`text-xl md:text-2xl font-black font-['Rubik'] tabular-nums ${
                      isDark ? 'text-orange-300' : 'text-orange-600'
                    }`}>
                      {stat.value}
                    </div>
                  </div>
                  <div className={`text-[10px] md:text-xs font-bold font-['Rubik'] text-center uppercase tracking-wide ${
                    isDark ? 'text-gray-500' : 'text-gray-600'
                  }`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>


        </motion.div>

        {/* Case Study Grid */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {caseStudies.map((study, index) => (
            <StudyCard
              key={study.id}
              study={study}
              index={index}
              animate={gridInView}
              isDark={isDark}
              onClick={() => setActiveStudy(index)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className={`inline-flex flex-col items-center gap-4 px-12 py-8 rounded-2xl border-2 ${
              isDark
                ? 'border-orange-700/50 bg-gradient-to-r from-orange-950/30 to-red-950/30'
                : 'border-orange-400/60 bg-gradient-to-r from-orange-50 to-red-50'
            } shadow-lg`}
          >
            <Flame className={`w-12 h-12 ${
              isDark ? 'text-orange-400' : 'text-orange-600'
            }`} />
            <h3 className={`text-2xl font-black font-['Rubik'] ${
              isDark ? 'text-gray-50' : 'text-gray-900'
            }`}>
              Ready to Start Building?
            </h3>
            <p className={`text-base font-['Quicksand'] font-medium ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Let's turn your idea into production-ready software! 💪
            </p>
            <motion.a

              onClick={() => setIsContactModalOpen(true)} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              // href="mailto:hello@papatiger.tech"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white font-bold text-base font-['Rubik'] shadow-lg flex items-center gap-2"
            >
              🐯 Get Free Consultation
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>


                     <ContactModal 
                             isOpen={isContactModalOpen}
                             onClose={() => setIsContactModalOpen(false)}
                           
                           />
    </section>
  )
}
