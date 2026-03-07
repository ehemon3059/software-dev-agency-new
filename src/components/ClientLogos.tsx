"use client";

import { useEffect, useRef, useState, RefObject } from "react";

// ============================================================
// TYPES
// ============================================================

interface ClientLogo {
  name: string;
  industry: string;
}

// ============================================================
// DATA — Replace with real client logos
// When you get real logos, replace the SVG placeholder with <img> tags
// ============================================================

const clientLogos: ClientLogo[] = [
  { name: "PortfolioHub", industry: "Creative Tech" },
  { name: "TapConnect", industry: "Digital Networking" },
  { name: "Kurav", industry: "AI / EdTech" },
  { name: "GreenReport", industry: "ESG Compliance" },
  { name: "MediBook", industry: "HealthTech" },
  { name: "ShopScale", industry: "E-Commerce" },
  { name: "LearnFlow", industry: "EdTech" },
  { name: "FinTrack", industry: "FinTech" },
];

// ============================================================
// CONSTANTS
// ============================================================

const GRADIENT = "linear-gradient(90deg, #4f6ef7 0%, #c44de8 100%)";

// ============================================================
// HOOKS
// ============================================================

function useInView(threshold: number = 0.15): [RefObject<HTMLDivElement | null>, boolean] {
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
// LOGO PLACEHOLDER — Replace with real <img> when available
// ============================================================

function LogoPlaceholder({ name, industry }: ClientLogo) {
  const initials = name
    .split(/(?=[A-Z])/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "16px 28px",
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 14,
        minWidth: 200,
        flexShrink: 0,
        transition: "all 0.3s",
      }}
    >
      {/* Logo icon placeholder */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: "rgba(79,110,247,0.1)",
          border: "1px solid rgba(79,110,247,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 15,
          fontWeight: 800,
          fontFamily: "'Space Mono', monospace",
          background: GRADIENT,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {/* Fallback to initials — replace this entire div with <img src={logoUrl} /> */}
        <span
          style={{
            background: GRADIENT,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: 15,
            fontWeight: 800,
            fontFamily: "'Space Mono', monospace",
          }}
        >
          {initials}
        </span>
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0", letterSpacing: -0.3 }}>{name}</div>
        <div style={{ fontSize: 11, color: "#64748b", marginTop: 2, fontWeight: 500 }}>{industry}</div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function ClientLogos(): JSX.Element {
  const [sectionRef, sectionInView] = useInView(0.1);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600;700;800;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Auto-scroll animation
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5;

    function animate() {
      scrollPos += speed;
      if (scrollPos >= el!.scrollWidth / 2) {
        scrollPos = 0;
      }
      el!.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(animate);
    }
    animationId = requestAnimationFrame(animate);

    // Pause on hover
    const pause = () => cancelAnimationFrame(animationId);
    const resume = () => { animationId = requestAnimationFrame(animate); };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animationId);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, []);

  // Duplicate logos for infinite scroll
  const allLogos = [...clientLogos, ...clientLogos];

  return (
    <section
      style={{
        padding: "60px 0",
        background: "#0a0e1a",
        fontFamily: "'DM Sans', -apple-system, sans-serif",
        position: "relative" as const,
        overflow: "hidden",
      }}
    >
      <div
        ref={sectionRef}
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          opacity: sectionInView ? 1 : 0,
          transform: sectionInView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(.22,1,.36,1)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center" as const, marginBottom: 40 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 3,
              marginBottom: 12,
              fontFamily: "'Space Mono', monospace",
              color: "#64748b",
            }}
          >
            TRUSTED BY INNOVATIVE COMPANIES
          </div>
          <p style={{ fontSize: 15, color: "#94a3b8", margin: 0 }}>
            We've built for <span style={{ color: "#e2e8f0", fontWeight: 600 }}>fintech</span>,{" "}
            <span style={{ color: "#e2e8f0", fontWeight: 600 }}>edtech</span>,{" "}
            <span style={{ color: "#e2e8f0", fontWeight: 600 }}>e-commerce</span>,{" "}
            <span style={{ color: "#e2e8f0", fontWeight: 600 }}>healthcare</span>, and{" "}
            <span style={{ color: "#e2e8f0", fontWeight: 600 }}>sustainability</span> startups.
          </p>
        </div>

        {/* Scrolling logo bar */}
        <div style={{ position: "relative" as const }}>
          {/* Fade edges */}
          <div
            style={{
              position: "absolute" as const,
              top: 0,
              bottom: 0,
              left: 0,
              width: 80,
              background: "linear-gradient(to right, #0a0e1a, transparent)",
              zIndex: 2,
              pointerEvents: "none" as const,
            }}
          />
          <div
            style={{
              position: "absolute" as const,
              top: 0,
              bottom: 0,
              right: 0,
              width: 80,
              background: "linear-gradient(to left, #0a0e1a, transparent)",
              zIndex: 2,
              pointerEvents: "none" as const,
            }}
          />

          <div
            ref={scrollRef}
            style={{
              display: "flex",
              gap: 16,
              overflow: "hidden",
              cursor: "grab",
            }}
          >
            {allLogos.map((logo, i) => (
              <LogoPlaceholder key={`${logo.name}-${i}`} {...logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
