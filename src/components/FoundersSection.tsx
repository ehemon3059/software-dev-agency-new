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
    color: "#4f6ef7",
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
    color: "#c44de8",
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
// CONSTANTS
// ============================================================

const GRADIENT = "linear-gradient(90deg, #4f6ef7 0%, #c44de8 100%)";

// ============================================================
// HOOKS
// ============================================================

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
// PHOTO COMPONENT (500x797 aspect ratio)
// ============================================================

function FounderPhoto({ founder, size = "large" }: { founder: FounderData; size?: "large" | "thumb" }) {
  const width = size === "large" ? 320 : 100;

  return (
    <div
      style={{
        width,
        aspectRatio: "500 / 797", // Matches your actual image proportions
        borderRadius: size === "large" ? 20 : 14,
        overflow: "hidden",
        border: `2px solid ${founder.color}25`,
        position: "relative",
        background: "#0f172a", // Dark fallback background
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 1. THE ACTUAL PHOTO */}
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

      {/* 2. OVERLAY GRADIENT (To make text readable) */}
      <div style={{ 
        position: "absolute", 
        inset: 0, 
        background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8))",
        zIndex: 1 
      }} />

      {/* 3. CONTENT (Letter and Name) */}
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
          }}
        >
          {founder.name[0]}
        </div>
        
        {size === "large" && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
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

function VideoEmbed({ founder, animate }: { founder: FounderData; animate: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16 / 9",
        borderRadius: 18,
        overflow: "hidden",
        border: `2px solid ${founder.color}20`,
        background: `${founder.color}06`,
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
              background: `${founder.color}20`,
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
          <div style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0" }}>{founder.videoTitle}</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>Click to play</div>
        </button>
      )}
    </div>
  );
}

// ============================================================
// DETAIL PAGE
// ============================================================

function FounderDetailPage({ founder, onBack }: { founder: FounderData; onBack: () => void }) {
  const [heroRef, heroInView] = useInView(0.05);
  const [photoRef, photoInView] = useInView(0.1);
  const [rolesRef, rolesInView] = useInView(0.05);
  const [videoRef, videoInView] = useInView(0.1);
  const [expandedRole, setExpandedRole] = useState<number | null>(null);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      {/* Back */}
      <div style={{ padding: "24px 0" }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 20px", color: "#94a3b8", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s", fontFamily: "inherit" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#e2e8f0"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#94a3b8"; }}>
          ← Back to Founders
        </button>
      </div>

      {/* Hero */}
      <div ref={heroRef} style={{ opacity: heroInView ? 1 : 0, transform: heroInView ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(.22,1,.36,1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" as const }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: founder.color, fontFamily: "'Space Mono', monospace" }}>{founder.label}</span>
          <span style={{ padding: "4px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, color: "#10b981", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>Active Co-Founder</span>
        </div>
        <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, color: "#f1f5f9", lineHeight: 1.05, margin: "0 0 8px", letterSpacing: -1.5 }}>{founder.fullName}</h2>
        <div style={{ fontSize: 17, fontWeight: 700, color: founder.color, marginBottom: 8, fontFamily: "'Space Mono', monospace" }}>{founder.title}</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const, marginBottom: 32 }}>
          <span style={{ padding: "5px 14px", borderRadius: 999, fontSize: 12, fontWeight: 600, color: founder.color, background: `${founder.color}12`, border: `1px solid ${founder.color}22` }}>Owns: {founder.owns}</span>
          <span style={{ padding: "5px 14px", borderRadius: 999, fontSize: 12, fontWeight: 600, color: "#94a3b8", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>{founder.worksFrom}</span>
          {founder.socials.map((s) => (
            <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.platform} style={{ width: 32, height: 32, borderRadius: 10, background: `${founder.color}12`, border: `1px solid ${founder.color}22`, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
              <SocialIcon platform={s.platform} color={founder.color} />
            </a>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${founder.color}40, transparent)`, margin: "0 0 48px" }} />

      {/* Photo + Bio */}
      <div ref={photoRef} style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 40, marginBottom: 56, opacity: photoInView ? 1 : 0, transform: photoInView ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s cubic-bezier(.22,1,.36,1)" }}>
        <FounderPhoto founder={founder} size="large" />
        <div>
          <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
            {founder.highlights.map((h, i) => (
              <div key={i} style={{ flex: 1, padding: "18px 16px", background: `${founder.color}08`, border: `1px solid ${founder.color}18`, borderRadius: 14, textAlign: "center" as const }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: founder.color, fontFamily: "'Space Mono', monospace" }}>{h.value}</div>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, marginTop: 4 }}>{h.label}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "20px 24px", background: `${founder.color}08`, borderLeft: `4px solid ${founder.color}`, borderRadius: "0 14px 14px 0", marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase" as const, color: founder.color, marginBottom: 6, fontFamily: "'Space Mono', monospace" }}>CORE MISSION</div>
            <div style={{ fontSize: 15, color: "#e2e8f0", fontWeight: 600, lineHeight: 1.5 }}>{founder.coreResponsibility}</div>
          </div>
          <p style={{ fontSize: 15, color: "#cbd5e1", lineHeight: 1.8, margin: 0 }}>{founder.bio}</p>
        </div>
      </div>

      {/* Roles */}
      <div ref={rolesRef} style={{ marginBottom: 56 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase" as const, color: founder.color, marginBottom: 8, fontFamily: "'Space Mono', monospace" }}>ROLES & RESPONSIBILITIES</div>
        <h3 style={{ fontSize: 24, fontWeight: 800, color: "#f1f5f9", margin: "0 0 24px" }}>What {founder.name} Owns</h3>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
          {founder.roles.map((role, i) => (
            <div key={i} style={{ opacity: rolesInView ? 1 : 0, transform: rolesInView ? "translateX(0)" : "translateX(-16px)", transition: `all 0.5s cubic-bezier(.22,1,.36,1) ${i * 80 + 150}ms` }}>
              <button onClick={() => setExpandedRole(expandedRole === i ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: expandedRole === i ? `${founder.color}0A` : "rgba(255,255,255,0.02)", border: `1px solid ${expandedRole === i ? `${founder.color}25` : "rgba(255,255,255,0.06)"}`, borderRadius: expandedRole === i ? "14px 14px 0 0" : 14, cursor: "pointer", transition: "all 0.25s", textAlign: "left" as const, fontFamily: "inherit", color: "inherit" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${founder.color}15`, border: `1px solid ${founder.color}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: founder.color, fontFamily: "'Space Mono', monospace", flexShrink: 0 }}>{i + 1}</div>
                <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: "#e2e8f0" }}>{role.title}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.25s", transform: expandedRole === i ? "rotate(180deg)" : "rotate(0)" }}><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              {expandedRole === i && (
                <div style={{ padding: "16px 20px 16px 68px", background: `${founder.color}06`, border: `1px solid ${founder.color}15`, borderTop: "none", borderRadius: "0 0 14px 14px", fontSize: 14, color: "#94a3b8", lineHeight: 1.7, animation: "founderFadeDown 0.25s ease" }}>{role.desc}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div style={{ marginBottom: 56 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase" as const, color: "#64748b", marginBottom: 14, fontFamily: "'Space Mono', monospace" }}>KEY SKILLS & EXPERTISE</div>
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
          {founder.skills.map((skill) => (
            <span key={skill} style={{ padding: "7px 16px", borderRadius: 999, fontSize: 13, fontWeight: 600, color: founder.color, background: `${founder.color}0A`, border: `1px solid ${founder.color}18`, fontFamily: "'Space Mono', monospace" }}>{skill}</span>
          ))}
        </div>
      </div>

      {/* Video */}
      <div ref={videoRef} style={{ marginBottom: 72 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase" as const, color: founder.color, marginBottom: 8, fontFamily: "'Space Mono', monospace" }}>WATCH {founder.name.toUpperCase()} IN ACTION</div>
        <h3 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", margin: "0 0 20px" }}>{founder.videoTitle}</h3>
        <VideoEmbed founder={founder} animate={videoInView} />
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center" as const, padding: "48px 32px", background: `linear-gradient(135deg, ${founder.color}08, ${founder.color}04)`, borderRadius: 20, border: `1px solid ${founder.color}15`, marginBottom: 80 }}>
        <h3 style={{ fontSize: 24, fontWeight: 800, color: "#f1f5f9", margin: "0 0 10px" }}>Want to work with {founder.name}?</h3>
        <p style={{ fontSize: 15, color: "#94a3b8", margin: "0 0 28px" }}>Book a free consultation and let's discuss your project</p>
        <a href="mailto:hello@papatiger.tech" style={{ display: "inline-block", padding: "14px 36px", background: GRADIENT, color: "#fff", fontSize: 15, fontWeight: 700, borderRadius: 12, textDecoration: "none", boxShadow: `0 4px 24px ${founder.color}35` }}>Get Free Consultation →</a>
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function FoundersSection(): JSX.Element {
  const [activeFounder, setActiveFounder] = useState<number | null>(null);
  const [heroRef, heroInView] = useInView(0.05);
  const [gridRef, gridInView] = useInView(0.05);
  const [sharedRef, sharedInView] = useInView(0.1);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600;700;800;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  useEffect(() => {
    const section = document.getElementById("Founders");
    if (section) {
      const top = section.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [activeFounder]);

  const bgStyle = { minHeight: "100vh" as const, background: "#0a0e1a", fontFamily: "'DM Sans', -apple-system, sans-serif", color: "#e2e8f0", overflowX: "hidden" as const };

  // ---- DETAIL VIEW ----
  if (activeFounder !== null) {
    const founder = founders[activeFounder];
    return (
      <section id="Founders" style={{ ...bgStyle, padding: "0 0 40px", position: "relative" as const, overflow: "hidden" }}>
        <style>{`@keyframes founderFadeDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        <div style={{ position: "absolute" as const, inset: 0, pointerEvents: "none" as const }}>
          <div style={{ position: "absolute" as const, top: -200, right: -200, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${founder.color}08, transparent 70%)` }} />
        </div>
        <div style={{ position: "relative" as const, zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <FounderDetailPage founder={founder} onBack={() => setActiveFounder(null)} />
        </div>
      </section>
    );
  }

  // ---- LISTING VIEW ----
  return (
    <section id="Founders" style={{ ...bgStyle, padding: "100px 0", position: "relative" as const, overflow: "hidden" }}>
      <style>{`@keyframes founderFadeDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <div style={{ position: "absolute" as const, inset: 0, pointerEvents: "none" as const }}>
        <div style={{ position: "absolute" as const, top: -300, left: "50%", transform: "translateX(-50%)", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,110,247,0.06), transparent 70%)" }} />
        <div style={{ position: "absolute" as const, bottom: -200, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(196,77,232,0.05), transparent 70%)" }} />
      </div>

      <div style={{ position: "relative" as const, zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        {/* Hero */}
        <div ref={heroRef} style={{ textAlign: "center" as const, marginBottom: 64, opacity: heroInView ? 1 : 0, transform: heroInView ? "translateY(0)" : "translateY(40px)", transition: "all 1s cubic-bezier(.22,1,.36,1)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, marginBottom: 20, fontFamily: "'Space Mono', monospace", background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>THE PEOPLE BEHIND THE CODE</div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, color: "#f1f5f9", lineHeight: 1.05, margin: "0 0 24px", letterSpacing: -2 }}>Meet the Founders</h1>
          <p style={{ fontSize: 19, color: "#94a3b8", maxWidth: 620, margin: "0 auto 40px", lineHeight: 1.6 }}>Two founders, complementary strengths. One builds the product. The other builds the market. Together, we turn great software into thriving businesses.</p>

          <div style={{ display: "inline-flex", gap: 1, background: "rgba(255,255,255,0.04)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
            {([{ value: "2", label: "Co-Founders" }, { value: "Tech + Ops", label: "Coverage" }, { value: "3+", label: "Years Together" }, { value: "100%", label: "Commitment" }] as const).map((s, i) => (
              <div key={i} style={{ padding: "20px 32px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", fontFamily: "'Space Mono', monospace" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600, marginTop: 4, letterSpacing: 0.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Two Cards */}
        <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))", gap: 24, marginBottom: 72 }}>
          {founders.map((founder, index) => (
            <div
              key={founder.id}
              onClick={() => setActiveFounder(index)}
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, overflow: "hidden", cursor: "pointer", transition: "all 0.4s cubic-bezier(.22,1,.36,1)", opacity: gridInView ? 1 : 0, transform: gridInView ? "translateY(0)" : "translateY(30px)", transitionDelay: `${index * 150}ms`, position: "relative" as const }}
              onMouseEnter={(e) => { const t = e.currentTarget; t.style.background = "rgba(255,255,255,0.04)"; t.style.borderColor = `${founder.color}35`; t.style.transform = "translateY(-4px)"; t.style.boxShadow = `0 20px 60px rgba(0,0,0,0.3), 0 0 40px ${founder.color}0A`; }}
              onMouseLeave={(e) => { const t = e.currentTarget; t.style.background = "rgba(255,255,255,0.02)"; t.style.borderColor = "rgba(255,255,255,0.06)"; t.style.transform = "translateY(0)"; t.style.boxShadow = "none"; }}
            >
              <div style={{ height: 4, background: founder.color }} />
              <div style={{ padding: "32px 28px" }}>
                {/* Top bar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: "#64748b", fontFamily: "'Space Mono', monospace" }}>{founder.label}</span>
                  <span style={{ padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700, color: "#10b981", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>Active</span>
                </div>

                {/* Photo + Name */}
                <div style={{ display: "flex", gap: 20, marginBottom: 20, alignItems: "center" }}>
                  <FounderPhoto founder={founder} size="thumb" />
                  <div>
                    <h3 style={{ fontSize: 24, fontWeight: 800, color: "#f1f5f9", margin: "0 0 6px", lineHeight: 1.2 }}>{founder.fullName}</h3>
                    <div style={{ fontSize: 13, fontWeight: 700, color: founder.color, fontFamily: "'Space Mono', monospace", marginBottom: 8 }}>{founder.title}</div>
                    <div style={{ display: "flex", gap: 6 }}>
                      {founder.socials.map((s) => (
                        <div key={s.platform} style={{ width: 26, height: 26, borderRadius: 7, background: `${founder.color}12`, border: `1px solid ${founder.color}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <SocialIcon platform={s.platform} color={founder.color} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bio excerpt */}
                <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.65, margin: "0 0 20px" }}>{founder.bio.substring(0, 180)}...</p>

                {/* Stats */}
                <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                  {founder.highlights.map((h, i) => (
                    <div key={i} style={{ flex: 1, padding: "12px 10px", background: `${founder.color}06`, borderRadius: 10, textAlign: "center" as const }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: founder.color, fontFamily: "'Space Mono', monospace" }}>{h.value}</div>
                      <div style={{ fontSize: 10, color: "#64748b", marginTop: 3, fontWeight: 600 }}>{h.label}</div>
                    </div>
                  ))}
                </div>

                {/* Roles preview */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const, color: "#4b5563", marginBottom: 8, fontFamily: "'Space Mono', monospace" }}>KEY ROLES</div>
                  <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
                    {founder.roles.slice(0, 3).map((r, i) => (
                      <span key={i} style={{ padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 600, color: "#94a3b8", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>{r.title}</span>
                    ))}
                    {founder.roles.length > 3 && <span style={{ padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 600, color: founder.color, background: `${founder.color}0A`, border: `1px solid ${founder.color}18` }}>+{founder.roles.length - 3} more</span>}
                  </div>
                </div>

                {/* Skills */}
                <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6, marginBottom: 20 }}>
                  {founder.skills.slice(0, 5).map((s) => (
                    <span key={s} style={{ padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 600, color: founder.color, background: `${founder.color}08`, border: `1px solid ${founder.color}15`, fontFamily: "'Space Mono', monospace" }}>{s}</span>
                  ))}
                  {founder.skills.length > 5 && <span style={{ padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 600, color: "#64748b", background: "rgba(255,255,255,0.03)" }}>+{founder.skills.length - 5}</span>}
                </div>

                {/* Video teaser */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: `${founder.color}06`, borderRadius: 12, border: `1px solid ${founder.color}12`, marginBottom: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${founder.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={founder.color}><polygon points="5 3 19 12 5 21 5 3" /></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>{founder.videoTitle}</div>
                    <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>Watch demo video inside</div>
                  </div>
                </div>

                {/* View arrow */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: founder.color, display: "flex", alignItems: "center", gap: 6 }}>View Full Profile <span style={{ fontSize: 18 }}>→</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shared */}
        <div ref={sharedRef}>
          <div style={{ textAlign: "center" as const, marginBottom: 32, opacity: sharedInView ? 1 : 0, transform: sharedInView ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s cubic-bezier(.22,1,.36,1)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase" as const, color: "#64748b", marginBottom: 10, fontFamily: "'Space Mono', monospace" }}>SHARED OWNERSHIP</div>
            <h3 style={{ fontSize: 26, fontWeight: 800, color: "#f1f5f9", margin: 0 }}>What We Own Together</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginBottom: 56 }}>
            {sharedResponsibilities.map((item, i) => (
              <div key={item.title} style={{ padding: "28px 24px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, opacity: sharedInView ? 1 : 0, transform: sharedInView ? "translateY(0)" : "translateY(20px)", transition: "all 0.5s cubic-bezier(.22,1,.36,1)", transitionDelay: `${i * 120 + 300}ms` }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.65 }}>{item.desc}</div>
              </div>
            ))}
          </div>

          {/* Connector */}
          <div style={{ display: "flex", justifyContent: "center", opacity: sharedInView ? 1 : 0, transition: "opacity 0.6s ease 700ms" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 32px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #4f6ef7, #4f6ef799)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff", fontFamily: "'Space Mono', monospace" }}>E</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 24, height: 2, background: GRADIENT, borderRadius: 2 }} /><div style={{ fontSize: 16 }}>+</div><div style={{ width: 24, height: 2, background: GRADIENT, borderRadius: 2 }} /></div>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #c44de8, #c44de899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff", fontFamily: "'Space Mono', monospace" }}>E</div>
              <div style={{ marginLeft: 4 }}><div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0" }}>Built Together</div><div style={{ fontSize: 12, color: "#64748b" }}>One vision, two strengths</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
