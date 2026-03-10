"use client";

import { useState, useEffect, useRef, RefObject } from "react";

// ============================================================
// TYPES
// ============================================================

interface RoleItem {
  title: string;
  desc: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface FounderData {
  id: string;
  name: string;
  fullName: string;
  title: string;
  label: string;
  owns: string;
  worksFrom: string;
  color: string;
  photoUrl: string;
  videoUrl: string;
  videoTitle: string;
  coreResponsibility: string;
  bio: string;
  roles: RoleItem[];
  skills: string[];
  socials: SocialLink[];
  highlights: { value: string; label: string }[];
}

interface SharedItem {
  title: string;
  desc: string;
}

// ============================================================
// DATA
// ============================================================

const founders: FounderData[] = [
  {
    id: "emon",
    name: "Emon",
    fullName: "Eh Emon",
    title: "Co-Founder, CEO & CTO",
    label: "FOUNDER 01 · TECH",
    owns: "Product, Tech, Vision",
    worksFrom: "Remote / Office",
    color: "#FF8C00", // Tiger orange
    photoUrl: "/founders/emon.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "Building a SaaS Dashboard — Live Coding Session",
    coreResponsibility: "Build, secure, and scale every product we ship — from architecture to deployment to monitoring.",
    bio: "Emon is the technical brain behind every product at papatiger.tech. He doesn't just write code — he architects entire systems. From database design to CI/CD pipelines, from API security to frontend performance, he owns the full technical lifecycle. His philosophy: every MVP should be built like it's going to serve 10,000 users, because if you do your job right, it will.",
    roles: [
      { title: "Software Architect", desc: "Designs full system architecture — database structure, API design, microservices planning, and multi-tenant scalability strategies." },
      { title: "Lead Software Engineer", desc: "Primary person writing and shipping the product. Frontend in React/Next.js, backend in Node.js, database optimization, third-party integrations — end to end." },
      { title: "DevOps Engineer", desc: "Cloud infrastructure on AWS, CI/CD pipelines with GitHub Actions, Docker containerization, monitoring with CloudWatch, and zero-downtime deployments." },
      { title: "Security & Compliance Officer", desc: "Data encryption, JWT authentication, role-based access control, audit logging, GDPR/KVKK compliance on the software layer, and secure hosting configurations." },
      { title: "Project Manager", desc: "Manages the product roadmap, sprint planning, feature prioritization, and delivery timelines using Notion and Linear." },
      { title: "Digital Growth Manager", desc: "Owns the online presence — landing pages, SEO optimization, LinkedIn content, analytics tracking, and future paid digital campaigns." },
    ],
    skills: ["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL", "MongoDB", "AWS", "Docker", "System Design", "CI/CD", "REST APIs", "Git"],
    socials: [
      { platform: "github", url: "https://github.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "twitter", url: "https://x.com/" },
    ],
    highlights: [
      { value: "5+", label: "Apps Shipped" },
      { value: "3+", label: "Years Building" },
      { value: "Full", label: "Stack" },
    ],
  },
  {
    id: "evan",
    name: "Evan",
    fullName: "Evan",
    title: "Co-Founder & COO",
    label: "FOUNDER 02 · OPS",
    owns: "Operations, Sales, Turkey",
    worksFrom: "Bursa, Turkey",
    color: "#DC2626", // Tiger red
    photoUrl: "/founders/evan.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "Client Demo — ClinicFlow TR Platform Walkthrough",
    coreResponsibility: "Build the market, close clients, and represent the company on the ground in Turkey.",
    bio: "Evan is the operational force that turns great software into a thriving business. Based in Bursa, Turkey, he's the face of papatiger.tech in the local market. He walks into clinics, sits across from decision-makers, diagnoses their operational pain, and shows them how our software solves it. His strength isn't just sales — it's understanding people and building relationships that last.",
    roles: [
      { title: "Business Development Manager", desc: "Identifies target private clinics in Bursa and beyond. Builds the sales pipeline, researches competitors, analyzes market gaps, and develops partnerships with clinic associations and healthcare networks in Turkey." },
      { title: "Software Sales Consultant", desc: "Meets clinic owners and managers face-to-face. Diagnoses their operational pain points, presents the platform as the solution, guides prospects through live demos, and closes deals." },
      { title: "Client Onboarding Manager", desc: "Once a clinic signs up, Evan manages their entire onboarding experience in person — training staff, collecting feedback, maintaining the relationship for retention and upsell." },
      { title: "KVKK Compliance Officer (Physical)", desc: "Manages data privacy on the business-facing side. Delivers KVKK disclosure text to clients, ensures sales data is handled correctly, keeps the company legally compliant during all client interactions." },
      { title: "Country Manager — Turkey", desc: "As the physical representative of the company in Turkey, Evan is the face of the brand at clinics, stakeholder meetings, healthcare events, and any local business interaction." },
    ],
    skills: ["Sales Strategy", "Client Relations", "Healthcare Domain", "Live Demos", "Onboarding", "Market Research", "KVKK Compliance", "Negotiation", "Turkish Market", "Partnership Dev"],
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "twitter", url: "https://x.com/" },
    ],
    highlights: [
      { value: "50+", label: "Clinics Reached" },
      { value: "Bursa", label: "On-Ground" },
      { value: "B2B", label: "Sales Expert" },
    ],
  },
];

const sharedResponsibilities: SharedItem[] = [
  { title: "Company Strategy", desc: "Major product, pricing, and business decisions are made together as co-founders — regardless of individual operational roles." },
  { title: "Investor Relations", desc: "Both co-founders present together. Emon covers product and technical vision. Evan covers market traction and the sales pipeline." },
  { title: "Brand & Positioning", desc: "The overall brand voice, pricing model, and go-to-market strategy is a joint decision made collaboratively." },
];

// ============================================================
// TIGER GRADIENT
// ============================================================

const TIGER_GRADIENT = "linear-gradient(90deg, #FF8C00 0%, #DC2626 100%)";

// ============================================================
// HOOKS
// ============================================================

function useTheme() {
  const [d, setD] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const c = () => setD(document.documentElement.classList.contains('dark'));
    c();
    const o = new MutationObserver(c);
    o.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => o.disconnect();
  }, []);
  
  if (!mounted) return false;
  return d;
}

function useInView(threshold: number = 0.08): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
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

// ============================================================
// SOCIAL ICON
// ============================================================

function SocialIcon({ platform, color }: { platform: string; color: string }) {
  const s = 15;
  switch (platform) {
    case "github":
      return (<svg width={s} height={s} viewBox="0 0 24 24" fill={color}><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>);
    case "linkedin":
      return (<svg width={s} height={s} viewBox="0 0 24 24" fill={color}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>);
    case "twitter":
      return (<svg width={s} height={s} viewBox="0 0 24 24" fill={color}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>);
    default:
      return null;
  }
}

// ============================================================
// PHOTO COMPONENT
// ============================================================

function FounderPhoto({ founder, size = "large", isDark }: { founder: FounderData; size?: "large" | "thumb"; isDark: boolean }) {
  const width = size === "large" ? 320 : 100;

  return (
    <div
      style={{
        width,
        aspectRatio: "500 / 797",
        borderRadius: size === "large" ? 20 : 14,
        overflow: "hidden",
        border: isDark ? `2px solid ${founder.color}35` : `2px solid ${founder.color}40`,
        position: "relative",
        background: isDark ? "#0f172a" : "#f8fafc",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img 
        src={founder.photoUrl} 
        alt={founder.fullName}
        style={{ 
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%", 
          height: "100%", 
          objectFit: "cover",
          zIndex: 0 
        }} 
      />
      <div style={{ 
        position: "absolute", 
        inset: 0, 
        background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8))",
        zIndex: 1 
      }} />
      <div style={{ 
        position: "relative", 
        zIndex: 2, 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        gap: size === "large" ? 16 : 4 
      }}>
        <div
          style={{
            width: size === "large" ? 120 : 40,
            height: size === "large" ? 120 : 40,
            borderRadius: size === "large" ? 28 : 10,
            background: `linear-gradient(135deg, ${founder.color}, ${founder.color}88)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: size === "large" ? 44 : 18,
            fontWeight: 900,
            color: "#fff",
            boxShadow: `0 8px 32px rgba(0,0,0,0.3)`,
            fontFamily: "'Rubik', sans-serif",
          }}
        >
          {founder.name[0]}
        </div>
        
        {size === "large" && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", textShadow: "0 2px 4px rgba(0,0,0,0.5)", fontFamily: "'Rubik', sans-serif" }}>
              {founder.fullName}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// VIDEO EMBED COMPONENT
// ============================================================

function VideoEmbed({ founder, animate, isDark }: { founder: FounderData; animate: boolean; isDark: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16 / 9",
        borderRadius: 18,
        overflow: "hidden",
        border: isDark ? `2px solid ${founder.color}25` : `2px solid ${founder.color}30`,
        background: isDark ? `${founder.color}08` : `${founder.color}06`,
        position: "relative" as const,
        opacity: animate ? 1 : 0,
        transform: animate ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.7s cubic-bezier(.22,1,.36,1) 150ms",
      }}
    >
      {isPlaying ? (
        <iframe
          src={`${founder.videoUrl}?autoplay=1`}
          title={founder.videoTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      ) : (
        <button
          onClick={() => setIsPlaying(true)}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            cursor: "pointer",
            background: "transparent",
            border: "none",
            fontFamily: "inherit",
            color: "inherit",
            transition: "all 0.3s",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: isDark ? `${founder.color}25` : `${founder.color}20`,
              border: `2px solid ${founder.color}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s",
              boxShadow: `0 0 40px ${founder.color}20`,
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill={founder.color}>
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: isDark ? "#e2e8f0" : "#1f2937", fontFamily: "'Rubik', sans-serif" }}>{founder.videoTitle}</div>
          <div style={{ fontSize: 12, color: isDark ? "#64748b" : "#6b7280", fontFamily: "'Quicksand', sans-serif" }}>Click to play</div>
        </button>
      )}
    </div>
  );
}

// ============================================================
// DETAIL PAGE
// ============================================================

function FounderDetailPage({ founder, onBack, isDark }: { founder: FounderData; onBack: () => void; isDark: boolean }) {
  const [heroRef, heroInView] = useInView(0.05);
  const [photoRef, photoInView] = useInView(0.1);
  const [rolesRef, rolesInView] = useInView(0.05);
  const [videoRef, videoInView] = useInView(0.1);
  const [expandedRole, setExpandedRole] = useState<number | null>(null);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      {/* Back */}
      <div style={{ padding: "24px 0" }}>
        <button onClick={onBack} className={`px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-all font-['Rubik'] ${
          isDark ? 'bg-gray-900/50 border-2 border-orange-500/20 text-gray-400 hover:border-orange-500/40 hover:text-gray-200' : 'bg-white border-2 border-orange-200 text-gray-600 hover:border-orange-400 hover:text-gray-900'
        }`}>
          ← Back to Founders
        </button>
      </div>

      {/* Hero */}
      <div ref={heroRef} style={{ opacity: heroInView ? 1 : 0, transform: heroInView ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(.22,1,.36,1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" as const }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: founder.color, fontFamily: "'Rubik', sans-serif" }}>{founder.label}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            isDark ? 'bg-green-500/15 text-green-400 border border-green-500/25' : 'bg-green-100 text-green-700 border border-green-300'
          }`}>Active Co-Founder</span>
        </div>
        <h2 className={`text-5xl lg:text-6xl font-black mb-2 font-['Rubik'] tracking-tighter ${
          isDark ? 'text-gray-50' : 'text-gray-900'
        }`}>{founder.fullName}</h2>
        <div style={{ fontSize: 17, fontWeight: 700, color: founder.color, marginBottom: 8, fontFamily: "'Rubik', sans-serif" }}>{founder.title}</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const, marginBottom: 32 }}>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            isDark ? `text-[${founder.color}] bg-[${founder.color}]/15 border border-[${founder.color}]/25` : `text-[${founder.color}] bg-[${founder.color}]/10 border border-[${founder.color}]/25`
          }`} style={{color: founder.color, background: `${founder.color}20`, borderColor: `${founder.color}35`}}>Owns: {founder.owns}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold font-['Rubik'] ${
            isDark ? 'bg-gray-900/50 border border-orange-500/20 text-gray-400' : 'bg-gray-100 border border-gray-300 text-gray-700'
          }`}>{founder.worksFrom}</span>
          {founder.socials.map((s) => (
            <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.platform} className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isDark ? 'bg-gray-900/50 border border-orange-500/20 hover:border-orange-500/40' : 'bg-orange-50 border border-orange-200 hover:border-orange-400'
            }`}>
              <SocialIcon platform={s.platform} color={founder.color} />
            </a>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: isDark ? `linear-gradient(90deg, transparent, ${founder.color}40, transparent)` : `linear-gradient(90deg, transparent, ${founder.color}30, transparent)`, margin: "0 0 48px" }} />

      {/* Photo + Bio */}
      <div ref={photoRef} style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 40, marginBottom: 56, opacity: photoInView ? 1 : 0, transform: photoInView ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s cubic-bezier(.22,1,.36,1)" }}>
        <FounderPhoto founder={founder} size="large" isDark={isDark} />
        <div>
          <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
            {founder.highlights.map((h, i) => (
              <div key={i} className={`flex-1 p-4 rounded-xl text-center ${
                isDark ? 'bg-gray-900/50 border border-orange-500/20' : 'bg-orange-50 border border-orange-200'
              }`}>
                <div className="text-2xl font-black font-['Rubik'] tabular-nums" style={{color: founder.color}}>{h.value}</div>
                <div className={`text-xs font-semibold mt-1 font-['Quicksand'] ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>{h.label}</div>
              </div>
            ))}
          </div>
          <div className={`p-5 rounded-xl mb-6 border-l-4 ${
            isDark ? 'bg-gray-900/50' : 'bg-orange-50'
          }`} style={{borderLeftColor: founder.color}}>
            <div className="text-xs font-black tracking-wider uppercase mb-2 font-['Rubik']" style={{color: founder.color}}>CORE MISSION</div>
            <div className={`text-base font-semibold leading-relaxed font-['Quicksand'] ${
              isDark ? 'text-gray-200' : 'text-gray-800'
            }`}>{founder.coreResponsibility}</div>
          </div>
          <p className={`text-base leading-relaxed font-['Quicksand'] ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>{founder.bio}</p>
        </div>
      </div>

      {/* Roles */}
      <div ref={rolesRef} style={{ marginBottom: 56 }}>
        <div className="text-xs font-black tracking-wider uppercase mb-2 font-['Rubik']" style={{color: founder.color}}>ROLES & RESPONSIBILITIES</div>
        <h3 className={`text-3xl font-black mb-6 font-['Rubik'] ${
          isDark ? 'text-gray-50' : 'text-gray-900'
        }`}>What {founder.name} Owns</h3>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
          {founder.roles.map((role, i) => (
            <div key={i} style={{ opacity: rolesInView ? 1 : 0, transform: rolesInView ? "translateX(0)" : "translateX(-16px)", transition: `all 0.5s cubic-bezier(.22,1,.36,1) ${i * 80 + 150}ms` }}>
              <button onClick={() => setExpandedRole(expandedRole === i ? null : i)} className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer font-['Rubik'] ${
                expandedRole === i 
                  ? isDark ? 'bg-gray-900/70 border-2' : 'bg-orange-50 border-2'
                  : isDark ? 'bg-gray-900/50 border-2 border-orange-500/20 hover:border-orange-500/30' : 'bg-white border-2 border-orange-200 hover:border-orange-300'
              }`} style={{borderColor: expandedRole === i ? founder.color : undefined}}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0 font-['Rubik']" style={{background: `${founder.color}25`, borderColor: `${founder.color}35`, color: founder.color}}>{i + 1}</div>
                <span className={`flex-1 text-base font-bold text-left ${
                  isDark ? 'text-gray-100' : 'text-gray-900'
                }`}>{role.title}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#64748b" : "#6b7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.25s", transform: expandedRole === i ? "rotate(180deg)" : "rotate(0)" }}><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              {expandedRole === i && (
                <div className={`p-4 pl-12 mt-1 rounded-xl text-sm leading-relaxed font-['Quicksand'] ${
                  isDark ? 'bg-gray-900/50 text-gray-300' : 'bg-orange-50/50 text-gray-700'
                }`}>{role.desc}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div style={{ marginBottom: 56 }}>
        <div className={`text-xs font-black tracking-wider uppercase mb-3 font-['Rubik'] ${
          isDark ? 'text-gray-500' : 'text-gray-600'
        }`}>KEY SKILLS & EXPERTISE</div>
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
          {founder.skills.map((skill) => (
            <span key={skill} className={`px-4 py-2 rounded-full text-sm font-bold font-['Rubik'] ${
              isDark ? 'bg-gray-900/50 border border-orange-500/20 text-orange-300' : 'bg-orange-50 border border-orange-200 text-orange-700'
            }`}>{skill}</span>
          ))}
        </div>
      </div>

      {/* Video */}
      <div ref={videoRef} style={{ marginBottom: 72 }}>
        <div className="text-xs font-black tracking-wider uppercase mb-2 font-['Rubik']" style={{color: founder.color}}>WATCH {founder.name.toUpperCase()} IN ACTION</div>
        <h3 className={`text-2xl font-black mb-5 font-['Rubik'] ${
          isDark ? 'text-gray-50' : 'text-gray-900'
        }`}>{founder.videoTitle}</h3>
        <VideoEmbed founder={founder} animate={videoInView} isDark={isDark} />
      </div>

      {/* CTA */}
      <div className={`text-center p-12 rounded-2xl border-2 mb-20 ${
        isDark ? 'bg-gray-900/50 border-orange-500/20' : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200'
      }`}>
        <h3 className={`text-3xl font-black mb-3 font-['Rubik'] ${
          isDark ? 'text-gray-50' : 'text-gray-900'
        }`}>Want to work with {founder.name}?</h3>
        <p className={`text-base mb-7 font-['Quicksand'] ${
          isDark ? 'text-gray-400' : 'text-gray-700'
        }`}>Book a free consultation and let's discuss your project 🐯</p>
        <a href="mailto:hello@papatiger.tech" className="inline-block px-9 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white text-base font-bold rounded-xl no-underline shadow-lg hover:shadow-xl transition-all font-['Rubik']">Get Free Consultation →</a>
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function FoundersSection(): JSX.Element {
  const isDark = useTheme();
  const [activeFounder, setActiveFounder] = useState<number | null>(null);
  const [heroRef, heroInView] = useInView(0.05);
  const [gridRef, gridInView] = useInView(0.05);
  const [sharedRef, sharedInView] = useInView(0.1);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&family=Quicksand:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  useEffect(() => {
    // Only scroll to section when activeFounder changes from user click, not on initial mount
    if (activeFounder !== null) {
      const section = document.getElementById("Founders");
      if (section) {
        const top = section.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  }, [activeFounder]);

  const bgStyle = { 
    minHeight: "100vh" as const, 
    background: isDark 
      ? "linear-gradient(to bottom, #0a0a0a 0%, #1a0f0a 50%, #0a0a0a 100%)" 
      : "linear-gradient(to bottom, #fafafa 0%, #fff5f0 50%, #fafafa 100%)",
    fontFamily: "'Quicksand', -apple-system, sans-serif",
    color: isDark ? "#e2e8f0" : "#1f2937",
    overflowX: "hidden" as const 
  };

  // ---- DETAIL VIEW ----
  if (activeFounder !== null) {
    const founder = founders[activeFounder];
    return (
      <section id="Founders" style={{ ...bgStyle, padding: "0 0 40px", position: "relative" as const, overflow: "hidden" }}>
        <div style={{ position: "absolute" as const, inset: 0, pointerEvents: "none" as const }}>
          <div style={{ position: "absolute" as const, top: -200, right: -200, width: 600, height: 600, borderRadius: "50%", background: isDark ? `radial-gradient(circle, ${founder.color}08, transparent 70%)` : `radial-gradient(circle, ${founder.color}06, transparent 70%)` }} />
        </div>
        <div style={{ position: "relative" as const, zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <FounderDetailPage founder={founder} onBack={() => setActiveFounder(null)} isDark={isDark} />
        </div>
      </section>
    );
  }

  // ---- LISTING VIEW ----
  return (
    <section id="Founders" style={{ ...bgStyle, padding: "100px 0", position: "relative" as const, overflow: "hidden" }}>
      <div style={{ position: "absolute" as const, inset: 0, pointerEvents: "none" as const }}>
        <div style={{ position: "absolute" as const, top: -300, left: "50%", transform: "translateX(-50%)", width: 800, height: 800, borderRadius: "50%", background: isDark ? "radial-gradient(circle, rgba(255,140,0,0.08), transparent 70%)" : "radial-gradient(circle, rgba(255,140,0,0.06), transparent 70%)" }} />
        <div style={{ position: "absolute" as const, bottom: -200, right: -100, width: 500, height: 500, borderRadius: "50%", background: isDark ? "radial-gradient(circle, rgba(220,38,38,0.06), transparent 70%)" : "radial-gradient(circle, rgba(245,158,11,0.05), transparent 70%)" }} />
      </div>

      <div style={{ position: "relative" as const, zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        {/* Hero */}
        <div 
          ref={heroRef} 
          className="text-center mb-16 px-4 transition-all duration-1000 ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ 
            opacity: heroInView ? 1 : 0, 
            transform: heroInView ? "translateY(0)" : "translateY(40px)" 
          }}
        >
          {/* Subtitle */}
          <div className="text-[10px] sm:text-xs font-bold tracking-[0.2em] mb-4 font-['Rubik'] uppercase"
              style={{ background: TIGER_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            THE PEOPLE BEHIND THE CODE 🐯
          </div>

          {/* Heading: text-4xl for mobile, text-6xl for desktop */}
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black mb-6 font-['Rubik'] tracking-tighter ${
            isDark ? 'text-gray-50' : 'text-gray-900'
          }`}>
            Meet the Founders
          </h1>

          {/* Paragraph: adjusted max-width and font size for mobile */}
          <p className={`text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-['Quicksand'] ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Two founders, complementary strengths. One builds the product. The other builds the market. Together, we turn great software into thriving businesses. 🔥
          </p>

          {/* Stats Container: Grid layout (2x2 on mobile, 4x1 on md+) */}
          <div className={`inline-grid grid-cols-2 md:grid-flow-col rounded-2xl overflow-hidden border-2 ${
            isDark ? 'bg-gray-900/50 border-orange-500/20' : 'bg-white border-orange-200'
          }`}>
            {([
              { value: "2", label: "Co-Founders" }, 
              { value: "Tech + Ops", label: "Coverage" }, 
              { value: "3+", label: "Years Together" }, 
              { value: "100%", label: "Commitment" }
            ] as const).map((s, i) => (
              <div 
                key={i} 
                className={`px-4 py-4 sm:px-8 sm:py-5 flex flex-col items-center justify-center ${
                  // Border logic: bottom border for top row on mobile, right border for desktop
                  isDark ? 'border-orange-500/10' : 'border-orange-100'
                } ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b md:border-b-0' : ''} md:border-b-0 ${i === 2 ? 'md:border-r' : ''}`}
              >
                <div className={`text-xl sm:text-2xl font-black font-['Rubik'] ${
                  isDark ? 'text-orange-300' : 'text-orange-600'
                }`}>
                  {s.value}
                </div>
                <div className={`text-[10px] sm:text-xs font-semibold mt-1 tracking-wide font-['Rubik'] ${
                  isDark ? 'text-gray-500' : 'text-gray-600'
                }`}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Two Cards */}
        <div 
          ref={gridRef} 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 px-4"
        >
          {founders.map((founder, index) => (
            <div
              key={founder.id}
              onClick={() => setActiveFounder(index)}
              className={`rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 border-2 group ${
                isDark 
                  ? 'bg-gray-900/50 border-orange-500/20 hover:border-orange-500/60 hover:shadow-2xl' 
                  : 'bg-white border-orange-200 hover:border-orange-400 hover:shadow-2xl'
              }`}
              style={{ 
                opacity: gridInView ? 1 : 0, 
                transform: gridInView ? "translateY(0)" : "translateY(30px)", 
                transitionDelay: `${index * 150}ms`,
                boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.08)'
              }}
            >
              {/* Top Accent Line */}
              <div className="h-1 w-full" style={{ background: founder.color }} />
              
              {/* Card Content */}
              <div className="p-6 sm:p-8">
                {/* Card Header */}
                <div className="flex justify-between items-center mb-5">
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider font-['Rubik']" style={{color: isDark ? "#64748b" : "#6b7280"}}>
                    {founder.label}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold ${
                    isDark ? 'bg-green-500/15 text-green-400 border border-green-500/25' : 'bg-green-100 text-green-700 border border-green-300'
                  }`}>
                    Active
                  </span>
                </div>

                {/* Profile Section */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-5 items-start sm:items-center">
                  <FounderPhoto founder={founder} size="thumb" isDark={isDark} />
                  <div>
                    <h3 className={`text-xl sm:text-2xl font-black mb-1 leading-tight font-['Rubik'] ${
                      isDark ? 'text-gray-50' : 'text-gray-900'
                    }`}>
                      {founder.fullName}
                    </h3>
                    <div className="text-sm font-bold mb-2 font-['Rubik']" style={{color: founder.color}}>
                      {founder.title}
                    </div>
                    <div className="flex gap-2">
                      {founder.socials.map((s) => (
                        <div key={s.platform} className={`w-7 h-7 rounded-lg flex items-center justify-center transition-transform hover:scale-110 ${
                          isDark ? 'bg-gray-800 border border-orange-500/20' : 'bg-orange-50 border border-orange-200'
                        }`}>
                          <SocialIcon platform={s.platform} color={founder.color} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className={`text-sm leading-relaxed mb-6 font-['Quicksand'] line-clamp-3 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {founder.bio}
                </p>

                {/* Highlights Stats */}
                <div className="flex gap-3 mb-6">
                  {founder.highlights.map((h, i) => (
                    <div key={i} className={`flex-1 p-3 rounded-xl text-center ${
                      isDark ? 'bg-gray-800/50' : 'bg-orange-50'
                    }`}>
                      <div className="text-lg sm:text-xl font-black font-['Rubik']" style={{color: founder.color}}>
                        {h.value}
                      </div>
                      <div className={`text-[10px] font-semibold mt-1 font-['Quicksand'] ${
                        isDark ? 'text-gray-500' : 'text-gray-600'
                      }`}>
                        {h.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Video Preview Box */}
                <div className={`flex items-center gap-3 p-4 rounded-xl border mb-6 transition-colors ${
                  isDark ? 'bg-gray-800/50 border-orange-500/20 group-hover:bg-gray-800' : 'bg-orange-50 border-orange-200 group-hover:bg-orange-100'
                }`}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{background: `${founder.color}20`}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={founder.color}><polygon points="5 3 19 12 5 21 5 3" /></svg>
                  </div>
                  <div className="min-w-0">
                    <div className={`text-sm font-bold font-['Rubik'] truncate ${
                      isDark ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      {founder.videoTitle}
                    </div>
                    <div className={`text-xs mt-1 font-['Quicksand'] ${
                      isDark ? 'text-gray-500' : 'text-gray-600'
                    }`}>
                      Watch demo video
                    </div>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="flex items-center justify-end">
                  <span className="text-sm font-bold flex items-center gap-2 font-['Rubik'] transition-transform group-hover:translate-x-1" style={{color: founder.color}}>
                    View Full Profile <span className="text-lg">→</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shared */}
        <div ref={sharedRef}>
          <div style={{ textAlign: "center" as const, marginBottom: 32, opacity: sharedInView ? 1 : 0, transform: sharedInView ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s cubic-bezier(.22,1,.36,1)" }}>
            <div className={`text-xs font-black tracking-wider uppercase mb-2 font-['Rubik'] ${
              isDark ? 'text-gray-500' : 'text-gray-600'
            }`}>SHARED OWNERSHIP 🤝</div>
            <h3 className={`text-3xl font-black font-['Rubik'] ${
              isDark ? 'text-gray-50' : 'text-gray-900'
            }`}>What We Own Together</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginBottom: 56 }}>
            {sharedResponsibilities.map((item, i) => (
              <div key={item.title} className={`p-7 rounded-2xl border-2 ${
                isDark ? 'bg-gray-900/50 border-orange-500/20' : 'bg-white border-orange-200'
              }`} style={{ opacity: sharedInView ? 1 : 0, transform: sharedInView ? "translateY(0)" : "translateY(20px)", transition: "all 0.5s cubic-bezier(.22,1,.36,1)", transitionDelay: `${i * 120 + 300}ms` }}>
                <div className={`text-lg font-black mb-2 font-['Rubik'] ${
                  isDark ? 'text-gray-50' : 'text-gray-900'
                }`}>{item.title}</div>
                <div className={`text-sm leading-relaxed font-['Quicksand'] ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>{item.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", opacity: sharedInView ? 1 : 0, transition: "opacity 0.6s ease 700ms" }}>
            <div className={`flex items-center gap-4 px-8 py-5 rounded-2xl border-2 ${
              isDark ? 'bg-gray-900/50 border-orange-500/20' : 'bg-white border-orange-200'
            }`}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #FF8C00, #FF8C0099)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff", fontFamily: "'Rubik', sans-serif" }}>E</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 24, height: 2, background: TIGER_GRADIENT, borderRadius: 2 }} /><div style={{ fontSize: 16 }}>+</div><div style={{ width: 24, height: 2, background: TIGER_GRADIENT, borderRadius: 2 }} /></div>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #DC2626, #DC262699)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff", fontFamily: "'Rubik', sans-serif" }}>E</div>
              <div style={{ marginLeft: 4 }}>
                <div className={`text-base font-black font-['Rubik'] ${
                  isDark ? 'text-gray-100' : 'text-gray-900'
                }`}>Built Together 🐯</div>
                <div className={`text-sm font-['Quicksand'] ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>One vision, two strengths</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
