"use client";

import { useState, useEffect, useRef, RefObject } from "react";

// ============================================================
// TYPES
// ============================================================

interface StatItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
  icon: string;
  color: string;
}

// ============================================================
// DATA — Update these with your real, verifiable numbers
// ============================================================

const stats: StatItem[] = [
  {
    value: 5,
    suffix: "+",
    label: "Production Apps Shipped",
    description: "Real products live in production, serving real users every day",
    icon: "rocket",
    color: "#4f6ef7",
  },
  {
    value: 3,
    suffix: "+",
    label: "SaaS Platforms Built",
    description: "Multi-tenant platforms currently serving thousands of users",
    icon: "layers",
    color: "#c44de8",
  },
  {
    value: 2000,
    suffix: "+",
    label: "Users Served",
    description: "Combined active users across all platforms we've built",
    icon: "users",
    color: "#10b981",
  },
  {
    value: 99.9,
    suffix: "%",
    label: "Average Uptime",
    description: "Our systems are built to stay up — monitored and maintained 24/7",
    icon: "shield",
    color: "#f59e0b",
  },
  {
    value: 3,
    suffix: "+",
    prefix: "",
    label: "Years Building Systems",
    description: "Consistent track record of delivering production-grade software",
    icon: "calendar",
    color: "#06b6d4",
  },
  {
    value: 100,
    suffix: "%",
    label: "Client Code Ownership",
    description: "Every client owns all code, documentation, and intellectual property",
    icon: "key",
    color: "#ef4444",
  },
];

// ============================================================
// CONSTANTS
// ============================================================

const GRADIENT = "linear-gradient(90deg, #4f6ef7 0%, #c44de8 100%)";

// ============================================================
// HOOKS
// ============================================================

function useInView(threshold: number = 0.1): [RefObject<HTMLDivElement | null>, boolean] {
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

function useCountUp(end: number, duration: number = 1800, start: boolean = false, decimals: number = 0): string {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    function step(ts: number) {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(eased * end);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [start, end, duration]);
  return decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toString();
}

// ============================================================
// ICON COMPONENTS
// ============================================================

function StatIcon({ type, color }: { type: string; color: string }) {
  const iconProps = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  switch (type) {
    case "rocket":
      return (
        <svg {...iconProps}>
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
          <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      );
    case "layers":
      return (
        <svg {...iconProps}>
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case "users":
      return (
        <svg {...iconProps}>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      );
    case "shield":
      return (
        <svg {...iconProps}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...iconProps}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "key":
      return (
        <svg {...iconProps}>
          <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
        </svg>
      );
    default:
      return null;
  }
}

// ============================================================
// STAT CARD
// ============================================================

interface StatCardProps {
  stat: StatItem;
  index: number;
  animate: boolean;
}

function StatCard({ stat, index, animate }: StatCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const decimals = stat.value % 1 !== 0 ? 1 : 0;
  const displayVal = useCountUp(stat.value, 2000 + index * 200, animate, decimals);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${isHovered ? `${stat.color}40` : "rgba(255,255,255,0.06)"}`,
        borderRadius: 20,
        padding: "32px 28px",
        transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
        transform: animate
          ? isHovered
            ? "translateY(-4px)"
            : "translateY(0)"
          : "translateY(30px)",
        opacity: animate ? 1 : 0,
        transitionDelay: `${index * 80}ms`,
        boxShadow: isHovered ? `0 20px 50px rgba(0,0,0,0.3), 0 0 30px ${stat.color}10` : "none",
        position: "relative" as const,
        overflow: "hidden",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute" as const,
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: stat.color,
          opacity: isHovered ? 0.8 : 0.15,
          transition: "opacity 0.3s",
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: `${stat.color}12`,
          border: `1px solid ${stat.color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
          transition: "transform 0.3s",
          transform: isHovered ? "scale(1.08)" : "scale(1)",
        }}
      >
        <StatIcon type={stat.icon} color={stat.color} />
      </div>

      {/* Value */}
      <div
        style={{
          fontSize: 42,
          fontWeight: 900,
          color: stat.color,
          fontFamily: "'Space Mono', monospace",
          letterSpacing: -2,
          lineHeight: 1,
          marginBottom: 8,
        }}
      >
        {stat.prefix || ""}
        {displayVal}
        {stat.suffix}
      </div>

      {/* Label */}
      <div style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", marginBottom: 8 }}>{stat.label}</div>

      {/* Description */}
      <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>{stat.description}</div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function SocialProof(): JSX.Element {
  const [headerRef, headerInView] = useInView(0.1);
  const [gridRef, gridInView] = useInView(0.05);

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

  return (
    <section
      id="SocialProof"
      style={{
        padding: "100px 0",
        background: "#0a0e1a",
        fontFamily: "'DM Sans', -apple-system, sans-serif",
        position: "relative" as const,
        overflow: "hidden",
      }}
    >
      {/* Ambient blobs */}
      <div style={{ position: "absolute" as const, inset: 0, pointerEvents: "none" as const }}>
        <div
          style={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 800,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(79,110,247,0.04), transparent 70%)",
          }}
        />
      </div>

      <div style={{ position: "relative" as const, zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center" as const,
            marginBottom: 64,
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 3,
              marginBottom: 16,
              fontFamily: "'Space Mono', monospace",
              background: GRADIENT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            REAL NUMBERS · NO FLUFF
          </div>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 900,
              color: "#f1f5f9",
              lineHeight: 1.1,
              margin: "0 0 16px",
              letterSpacing: -1.5,
            }}
          >
            Verified Track Record
          </h2>
          <p style={{ fontSize: 18, color: "#94a3b8", maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
            Honest numbers from real projects. We believe small, verifiable stats build more trust than inflated claims.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} animate={gridInView} />
          ))}
        </div>

        {/* Bottom trust message */}
        <div
          style={{
            textAlign: "center" as const,
            marginTop: 56,
            opacity: gridInView ? 1 : 0,
            transform: gridInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(.22,1,.36,1) 600ms",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 28px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 14,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            <span style={{ fontSize: 14, color: "#94a3b8" }}>
              All stats are real, current, and verifiable.{" "}
              <span style={{ color: "#e2e8f0", fontWeight: 600 }}>We never inflate numbers.</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
