"use client";

import { useState, useEffect, useRef, RefObject } from "react";

// ============================================================
// TYPES
// ============================================================

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string; // URL or initials fallback
  linkedIn?: string;
  rating: number;
  projectType: string;
}

// ============================================================
// DATA — Replace with real testimonials from your clients
// ============================================================

const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "What impressed me most wasn't just the technical execution — it was how they challenged my assumptions. They talked me out of 3 features that would have delayed launch by a month and focused on what users actually needed. The platform launched on time and exceeded our growth targets.",
    author: "Rahman K.",
    role: "Founder & CEO",
    company: "Portfolio Builder Platform",
    avatar: "RK",
    linkedIn: "#",
    rating: 5,
    projectType: "SaaS Platform",
  },
  {
    id: "t2",
    quote:
      "They asked hard questions about our multi-tenant strategy and GDPR compliance that three other agencies never even raised. Their suggestion to use row-level security saved us from what would have been a costly re-architecture down the road.",
    author: "Thomas M.",
    role: "Managing Director",
    company: "ESG Consulting Firm",
    avatar: "TM",
    linkedIn: "#",
    rating: 5,
    projectType: "Enterprise Platform",
  },
  {
    id: "t3",
    quote:
      "At a recent conference, I shared my NFC card with 40 people. Within a week, 32 had saved my contact and 8 reached out for meetings. With paper cards, I'd be lucky to hear back from 2. The analytics alone are worth it.",
    author: "Nadia S.",
    role: "Founder",
    company: "NFC Business Card Platform",
    avatar: "NS",
    linkedIn: "#",
    rating: 5,
    projectType: "Digital Product",
  },
  {
    id: "t4",
    quote:
      "They didn't just build a tech platform — they took the time to understand why accuracy matters in Islamic content. The scholar review system was their suggestion, not mine, and it's become one of our most important features.",
    author: "Imran A.",
    role: "Founder",
    company: "Kurav Platform",
    avatar: "IA",
    linkedIn: "#",
    rating: 5,
    projectType: "AI Content Platform",
  },
  {
    id: "t5",
    quote:
      "We came in with a mess — a half-built WordPress site that broke every time we updated a plugin. Papatiger rebuilt the entire system in Next.js in 5 weeks. Page load went from 8 seconds to under 1.5. Our bounce rate dropped 40%.",
    author: "Farhan H.",
    role: "CTO",
    company: "EdTech Startup",
    avatar: "FH",
    linkedIn: "#",
    rating: 5,
    projectType: "Legacy Modernization",
  },
];

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
// TIGER GRADIENT CONSTANTS
// ============================================================

const TIGER_GRADIENT = "linear-gradient(90deg, #FF8C00 0%, #DC2626 100%)";

// ============================================================
// SUB-COMPONENTS
// ============================================================

function StarRating({ count, isDark }: { count: number; isDark: boolean }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < count ? "#FBBF24" : isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function AvatarCircle({ initials, index }: { initials: string; index: number }) {
  const gradients = [
    "linear-gradient(135deg, #FF8C00, #DC2626)",
    "linear-gradient(135deg, #DC2626, #F59E0B)",
    "linear-gradient(135deg, #F59E0B, #FF8C00)",
    "linear-gradient(135deg, #FF6B00, #DC2626)",
    "linear-gradient(135deg, #FBBF24, #F97316)",
  ];
  return (
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: "50%",
        background: gradients[index % gradients.length],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        fontWeight: 800,
        color: "#fff",
        letterSpacing: 1,
        flexShrink: 0,
        boxShadow: "0 4px 16px rgba(255, 140, 0, 0.3)",
        fontFamily: "'Rubik', sans-serif",
      }}
    >
      {initials}
    </div>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  animate: boolean;
  isDark: boolean;
}

function TestimonialCard({ testimonial, index, animate, isDark }: TestimonialCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isDark 
          ? (isHovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)")
          : (isHovered ? "rgba(255,140,0,0.03)" : "#ffffff"),
        border: isDark
          ? `2px solid ${isHovered ? "rgba(255,140,0,0.4)" : "rgba(255,255,255,0.08)"}`
          : `2px solid ${isHovered ? "rgba(255,140,0,0.4)" : "rgba(255,140,0,0.15)"}`,
        borderRadius: 20,
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column" as const,
        gap: 20,
        transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
        transform: animate
          ? isHovered
            ? "translateY(-6px)"
            : "translateY(0)"
          : "translateY(30px)",
        opacity: animate ? 1 : 0,
        transitionDelay: `${index * 100}ms`,
        boxShadow: isHovered
          ? isDark
            ? "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,140,0,0.1)"
            : "0 20px 60px rgba(255,140,0,0.15), 0 10px 40px rgba(0,0,0,0.08)"
          : "none",
        position: "relative" as const,
        overflow: "hidden",
      }}
    >
      {/* Tiger gradient top accent */}
      <div
        style={{
          position: "absolute" as const,
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: TIGER_GRADIENT,
          opacity: isHovered ? 1 : 0.3,
          transition: "opacity 0.3s",
        }}
      />

      {/* Project type badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            padding: "5px 14px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700,
            color: isDark ? "#FB923C" : "#DC2626",
            background: isDark ? "rgba(255,140,0,0.15)" : "rgba(255,140,0,0.1)",
            border: isDark ? "1px solid rgba(255,140,0,0.25)" : "1px solid rgba(255,140,0,0.2)",
            letterSpacing: 0.5,
            fontFamily: "'Rubik', sans-serif",
          }}
        >
          {testimonial.projectType}
        </span>
        <StarRating count={testimonial.rating} isDark={isDark} />
      </div>

      {/* Quote */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 36,
            lineHeight: 1,
            marginBottom: 4,
            background: TIGER_GRADIENT,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontFamily: "Georgia, serif",
          }}
        >
          "
        </div>
        <p
          style={{
            fontSize: 15,
            color: isDark ? "#d1d5db" : "#374151",
            lineHeight: 1.75,
            margin: 0,
            fontFamily: "'Quicksand', sans-serif",
          }}
        >
          {testimonial.quote}
        </p>
      </div>

      {/* Author */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          paddingTop: 16,
          borderTop: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <AvatarCircle initials={testimonial.avatar} index={index} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ 
              fontSize: 15, 
              fontWeight: 700, 
              color: isDark ? "#f1f5f9" : "#111827",
              fontFamily: "'Rubik', sans-serif"
            }}>
              {testimonial.author}
            </span>
            {testimonial.linkedIn && (
              <a
                href={testimonial.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 4,
                  background: isDark ? "rgba(255,140,0,0.2)" : "rgba(255,140,0,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                }}
                aria-label={`${testimonial.author}'s LinkedIn`}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill={isDark ? "#FB923C" : "#DC2626"}>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
          </div>
          <div style={{ 
            fontSize: 13, 
            color: isDark ? "#64748b" : "#6b7280", 
            marginTop: 2,
            fontFamily: "'Quicksand', sans-serif"
          }}>
            {testimonial.role} · {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function Testimonials(): JSX.Element {
  const isDark = useTheme();
  const [sectionRef, sectionInView] = useInView(0.05);
  const [cardsRef, cardsInView] = useInView(0.05);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&family=Quicksand:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <section
      id="Testimonials"
      style={{
        padding: "100px 0",
        background: isDark 
          ? "linear-gradient(to bottom, #0a0a0a 0%, #1a0f0a 50%, #0a0a0a 100%)"
          : "linear-gradient(to bottom, #fafafa 0%, #fff5f0 50%, #fafafa 100%)",
        fontFamily: "'Quicksand', -apple-system, sans-serif",
        position: "relative" as const,
        overflow: "hidden",
      }}
    >
      {/* Ambient tiger-colored blobs */}
      <div style={{ position: "absolute" as const, inset: 0, pointerEvents: "none" as const }}>
        <div
          style={{
            position: "absolute" as const,
            top: -200,
            right: -150,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: isDark
              ? "radial-gradient(circle, rgba(220,38,38,0.08), transparent 70%)"
              : "radial-gradient(circle, rgba(255,140,0,0.06), transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute" as const,
            bottom: -200,
            left: -150,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: isDark
              ? "radial-gradient(circle, rgba(255,140,0,0.06), transparent 70%)"
              : "radial-gradient(circle, rgba(245,158,11,0.05), transparent 70%)",
          }}
        />
      </div>

      <div style={{ position: "relative" as const, zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div
          ref={sectionRef}
          style={{
            textAlign: "center" as const,
            marginBottom: 64,
            opacity: sectionInView ? 1 : 0,
            transform: sectionInView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 3,
              marginBottom: 16,
              fontFamily: "'Rubik', sans-serif",
              background: TIGER_GRADIENT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            WHAT OUR CLIENTS SAY 🐯
          </div>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 900,
              color: isDark ? "#f1f5f9" : "#111827",
              lineHeight: 1.1,
              margin: "0 0 16px",
              letterSpacing: -1.5,
              fontFamily: "'Rubik', sans-serif",
            }}
          >
            Real Feedback from Real Partners
          </h2>
          <p style={{ 
            fontSize: 18, 
            color: isDark ? "#94a3b8" : "#6b7280", 
            maxWidth: 600, 
            margin: "0 auto", 
            lineHeight: 1.6,
            fontFamily: "'Quicksand', sans-serif"
          }}>
            Don't take our word for it. Here's what our clients say about working with us. 🔥
          </p>

          {/* Summary stats */}
          <div
            style={{
              display: "inline-flex",
              gap: 1,
              marginTop: 36,
              background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
              borderRadius: 14,
              overflow: "hidden",
              border: isDark ? "2px solid rgba(255,255,255,0.08)" : "2px solid rgba(255,140,0,0.15)",
            }}
          >
            {([
              { value: "5/5", label: "Avg. Rating", emoji: "⭐" },
              { value: "100%", label: "Satisfaction", emoji: "💪" },
              { value: "95%", label: "On-Time", emoji: "⚡" },
              { value: "24h", label: "Response", emoji: "🚀" },
            ] as const).map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "18px 28px",
                  borderRight: i < 3 ? (isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)") : "none",
                }}
              >
                <div style={{ fontSize: 18, marginBottom: 4 }}>{s.emoji}</div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    fontFamily: "'Rubik', sans-serif",
                    background: TIGER_GRADIENT,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.value}
                </div>
                <div style={{ 
                  fontSize: 11, 
                  color: isDark ? "#64748b" : "#6b7280", 
                  fontWeight: 600, 
                  marginTop: 4, 
                  letterSpacing: 0.5,
                  fontFamily: "'Rubik', sans-serif"
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Grid */}
        <div
          ref={cardsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 24,
          }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} animate={cardsInView} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}
