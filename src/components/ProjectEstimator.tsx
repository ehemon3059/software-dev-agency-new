"use client";

import { useState, useEffect, useRef, RefObject } from "react";

// ============================================================
// TYPES
// ============================================================

interface StepOption {
  id: string;
  label: string;
  desc: string;
  icon: string;
  multiplier: number;
}

interface Step {
  id: string;
  question: string;
  subtitle: string;
  options: StepOption[];
}

interface EstimateResult {
  minPrice: number;
  maxPrice: number;
  timeline: string;
  tier: string;
  tierColor: string;
}

// ============================================================
// ESTIMATION DATA
// ============================================================

const steps: Step[] = [
  {
    id: "project_type",
    question: "What do you want to build?",
    subtitle: "Select the option that best describes your project",
    options: [
      { id: "mvp", label: "New MVP / SaaS", desc: "Build a new product from scratch", icon: "🚀", multiplier: 1.0 },
      { id: "web_app", label: "Custom Web App", desc: "Dashboard, portal, or internal tool", icon: "💻", multiplier: 0.8 },
      { id: "fix_upgrade", label: "Fix & Upgrade", desc: "Modernize or fix existing software", icon: "🔧", multiplier: 0.5 },
      { id: "api", label: "API / Backend", desc: "REST API, integrations, or backend system", icon: "⚡", multiplier: 0.6 },
    ],
  },
  {
    id: "complexity",
    question: "How complex is your project?",
    subtitle: "Think about the number of features and user roles",
    options: [
      { id: "simple", label: "Simple", desc: "1-3 user roles, 5-10 pages, basic features", icon: "📋", multiplier: 0.6 },
      { id: "medium", label: "Medium", desc: "3-5 roles, 10-20 pages, integrations needed", icon: "📊", multiplier: 1.0 },
      { id: "complex", label: "Complex", desc: "5+ roles, 20+ pages, advanced logic, AI/ML", icon: "🧩", multiplier: 1.6 },
      { id: "enterprise", label: "Enterprise", desc: "Multi-tenant, compliance, high security", icon: "🏢", multiplier: 2.2 },
    ],
  },
  {
    id: "design",
    question: "What about design?",
    subtitle: "Do you have designs ready or need us to create them?",
    options: [
      { id: "has_design", label: "I Have Designs", desc: "Figma/Sketch files ready to implement", icon: "🎨", multiplier: 0.8 },
      { id: "basic_design", label: "Need Basic Design", desc: "Clean, functional UI — no custom branding", icon: "✏️", multiplier: 1.0 },
      { id: "custom_design", label: "Custom Design", desc: "Unique branding, animations, polished UI", icon: "💎", multiplier: 1.3 },
    ],
  },
  {
    id: "timeline",
    question: "When do you need it?",
    subtitle: "Tighter timelines may require a larger team",
    options: [
      { id: "flexible", label: "Flexible", desc: "No hard deadline — quality over speed", icon: "🌊", multiplier: 0.9 },
      { id: "standard", label: "2-3 Months", desc: "Standard timeline for most projects", icon: "📅", multiplier: 1.0 },
      { id: "fast", label: "4-6 Weeks", desc: "Aggressive but doable with the right scope", icon: "⏱️", multiplier: 1.2 },
      { id: "urgent", label: "Under 4 Weeks", desc: "Rush delivery — requires tight scope", icon: "🔥", multiplier: 1.5 },
    ],
  },
  {
    id: "extras",
    question: "Any extras you need?",
    subtitle: "Select all that apply (optional)",
    options: [
      { id: "deployment", label: "DevOps & Deployment", desc: "AWS/Cloud setup, CI/CD, monitoring", icon: "☁️", multiplier: 1.1 },
      { id: "auth", label: "Auth & Security", desc: "OAuth, RBAC, encryption, compliance", icon: "🔒", multiplier: 1.1 },
      { id: "mobile", label: "Mobile Responsive", desc: "Fully optimized for all devices", icon: "📱", multiplier: 1.05 },
      { id: "support", label: "Ongoing Support", desc: "Post-launch maintenance plan", icon: "🛟", multiplier: 1.05 },
    ],
  },
];

const BASE_PRICE = 2500;

function calculateEstimate(selections: Record<string, string[]>): EstimateResult {
  let totalMultiplier = 1.0;

  for (const step of steps) {
    const selected = selections[step.id] || [];
    if (step.id === "extras") {
      for (const opt of step.options) {
        if (selected.includes(opt.id)) {
          totalMultiplier *= opt.multiplier;
        }
      }
    } else {
      const chosen = step.options.find((o) => selected.includes(o.id));
      if (chosen) {
        totalMultiplier *= chosen.multiplier;
      }
    }
  }

  const midPrice = Math.round(BASE_PRICE * totalMultiplier);
  const minPrice = Math.round(midPrice * 0.75 / 100) * 100;
  const maxPrice = Math.round(midPrice * 1.4 / 100) * 100;

  let tier: string;
  let tierColor: string;
  let timeline: string;

  if (maxPrice <= 1500) {
    tier = "Small Fix";
    tierColor = "#FF8C00"; // Orange
    timeline = "1-2 weeks";
  } else if (maxPrice <= 5000) {
    tier = "Small Project";
    tierColor = "#F59E0B"; // Amber
    timeline = "2-4 weeks";
  } else if (maxPrice <= 12000) {
    tier = "Medium Project";
    tierColor = "#FF8C00"; // Orange
    timeline = "4-8 weeks";
  } else {
    tier = "Complex Platform";
    tierColor = "#DC2626"; // Red
    timeline = "10-16 weeks";
  }

  return { minPrice, maxPrice, timeline, tier, tierColor };
}

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
// MAIN COMPONENT
// ============================================================

export default function ProjectEstimator(): JSX.Element {
  const isDark = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sectionRef, sectionInView] = useInView(0.05);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&family=Quicksand:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isExtrasStep = step?.id === "extras";
  const currentSelections = selections[step?.id] || [];

  const handleSelect = (optionId: string) => {
    if (isExtrasStep) {
      setSelections((prev) => {
        const current = prev[step.id] || [];
        const updated = current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId];
        return { ...prev, [step.id]: updated };
      });
    } else {
      setSelections((prev) => ({ ...prev, [step.id]: [optionId] }));
    }
  };

  const canProceed = isExtrasStep || currentSelections.length > 0;

  const handleNext = () => {
    if (isLastStep) {
      setShowResult(true);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (showResult) {
      setShowResult(false);
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmitLead = () => {
    if (email.includes("@")) {
      // TODO: Send to your backend/email service (Mailchimp, ConvertKit, Zapier webhook, etc.)
      console.log("Lead captured:", { name, email, selections, estimate: calculateEstimate(selections) });
      setSubmitted(true);
    }
  };

  const estimate = calculateEstimate(selections);
  const progress = showResult ? 100 : ((currentStep + 1) / (steps.length + 1)) * 100;

  return (
    <section
      id="Estimator"
      ref={sectionRef}
      style={{
        padding: "100px 0",
        background: isDark
          ? "linear-gradient(to bottom, #0a0a0a 0%, #1a0f0a 50%, #0a0a0a 100%)"
          : "linear-gradient(to bottom, #fafafa 0%, #fff5f0 50%, #fafafa 100%)",
        fontFamily: "'Quicksand', -apple-system, sans-serif",
        color: isDark ? "#e2e8f0" : "#1f2937",
        position: "relative" as const,
        overflow: "hidden",
      }}
    >
      {/* Ambient */}
      <div style={{ position: "absolute" as const, inset: 0, pointerEvents: "none" as const }}>
        <div style={{ 
          position: "absolute" as const, 
          top: -200, 
          right: -150, 
          width: 500, 
          height: 500, 
          borderRadius: "50%", 
          background: isDark 
            ? "radial-gradient(circle, rgba(255,140,0,0.08), transparent 70%)" 
            : "radial-gradient(circle, rgba(255,140,0,0.05), transparent 70%)" 
        }} />
        <div style={{ 
          position: "absolute" as const, 
          bottom: -200, 
          left: -150, 
          width: 600, 
          height: 600, 
          borderRadius: "50%", 
          background: isDark 
            ? "radial-gradient(circle, rgba(220,38,38,0.06), transparent 70%)" 
            : "radial-gradient(circle, rgba(220,38,38,0.04), transparent 70%)" 
        }} />
      </div>

      <div
        style={{
          position: "relative" as const,
          zIndex: 1,
          maxWidth: 720,
          margin: "0 auto",
          padding: "0 24px",
          opacity: sectionInView ? 1 : 0,
          transform: sectionInView ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(.22,1,.36,1)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center" as const, marginBottom: 48 }}>
          <div style={{ 
            fontSize: 12, 
            fontWeight: 700, 
            letterSpacing: 3, 
            marginBottom: 16, 
            fontFamily: "'Rubik', sans-serif", 
            background: TIGER_GRADIENT, 
            WebkitBackgroundClip: "text", 
            WebkitTextFillColor: "transparent", 
            backgroundClip: "text" 
          }}>
            FREE PROJECT ESTIMATOR 🐯
          </div>
          <h2 style={{ 
            fontSize: "clamp(28px, 5vw, 42px)", 
            fontWeight: 900, 
            color: isDark ? "#f1f5f9" : "#111827", 
            lineHeight: 1.1, 
            margin: "0 0 12px", 
            letterSpacing: -1,
            fontFamily: "'Rubik', sans-serif"
          }}>
            Get a Ballpark Estimate in 60 Seconds ⚡
          </h2>
          <p style={{ 
            fontSize: 16, 
            color: isDark ? "#94a3b8" : "#6b7280", 
            maxWidth: 500, 
            margin: "0 auto", 
            lineHeight: 1.6 
          }}>
            Answer 5 quick questions. No commitment, no sales call required. 🔥
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ 
              fontSize: 12, 
              fontWeight: 600, 
              color: isDark ? "#64748b" : "#9ca3af", 
              fontFamily: "'Rubik', sans-serif" 
            }}>
              {showResult ? "Your Estimate 🎯" : `Step ${currentStep + 1} of ${steps.length}`}
            </span>
            <span style={{ 
              fontSize: 12, 
              fontWeight: 600, 
              color: isDark ? "#64748b" : "#9ca3af", 
              fontFamily: "'Rubik', sans-serif" 
            }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div style={{ 
            height: 4, 
            background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", 
            borderRadius: 999, 
            overflow: "hidden" 
          }}>
            <div style={{ 
              height: "100%", 
              width: `${progress}%`, 
              background: TIGER_GRADIENT, 
              borderRadius: 999, 
              transition: "width 0.5s cubic-bezier(.22,1,.36,1)" 
            }} />
          </div>
        </div>

        {/* Card Container */}
        <div
          style={{
            background: isDark ? "rgba(255,255,255,0.02)" : "#ffffff",
            border: isDark ? "2px solid rgba(255,255,255,0.08)" : "2px solid rgba(255,140,0,0.15)",
            borderRadius: 24,
            padding: "40px 36px",
            minHeight: 400,
          }}
        >
          {/* ---- RESULT VIEW ---- */}
          {showResult ? (
            <div>
              {!submitted ? (
                <>
                  {/* Estimate Display */}
                  <div style={{ textAlign: "center" as const, marginBottom: 36 }}>
                    <div style={{ 
                      fontSize: 11, 
                      fontWeight: 700, 
                      letterSpacing: 2.5, 
                      textTransform: "uppercase" as const, 
                      color: estimate.tierColor, 
                      marginBottom: 12, 
                      fontFamily: "'Rubik', sans-serif" 
                    }}>
                      ESTIMATED INVESTMENT 💰
                    </div>
                    <div style={{ 
                      fontSize: "clamp(40px, 8vw, 64px)", 
                      fontWeight: 900, 
                      letterSpacing: -2, 
                      lineHeight: 1, 
                      marginBottom: 8,
                      fontFamily: "'Rubik', sans-serif"
                    }}>
                      <span style={{ 
                        background: TIGER_GRADIENT, 
                        WebkitBackgroundClip: "text", 
                        WebkitTextFillColor: "transparent", 
                        backgroundClip: "text" 
                      }}>
                        ${estimate.minPrice.toLocaleString()} — ${estimate.maxPrice.toLocaleString()}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" as const }}>
                      <span style={{ 
                        padding: "6px 16px", 
                        borderRadius: 999, 
                        fontSize: 13, 
                        fontWeight: 700, 
                        color: estimate.tierColor, 
                        background: `${estimate.tierColor}20`, 
                        border: `2px solid ${estimate.tierColor}30`,
                        fontFamily: "'Rubik', sans-serif"
                      }}>
                        {estimate.tier}
                      </span>
                      <span style={{ 
                        padding: "6px 16px", 
                        borderRadius: 999, 
                        fontSize: 13, 
                        fontWeight: 600, 
                        color: isDark ? "#94a3b8" : "#6b7280", 
                        background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", 
                        border: isDark ? "2px solid rgba(255,255,255,0.08)" : "2px solid rgba(0,0,0,0.08)",
                        fontFamily: "'Rubik', sans-serif"
                      }}>
                        Est. {estimate.timeline}
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div style={{ 
                    padding: "20px 24px", 
                    background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,140,0,0.05)", 
                    borderRadius: 14, 
                    border: isDark ? "2px solid rgba(255,255,255,0.08)" : "2px solid rgba(255,140,0,0.15)", 
                    marginBottom: 32 
                  }}>
                    <div style={{ 
                      fontSize: 12, 
                      fontWeight: 700, 
                      letterSpacing: 1.5, 
                      color: isDark ? "#64748b" : "#9ca3af", 
                      marginBottom: 12, 
                      fontFamily: "'Rubik', sans-serif" 
                    }}>YOUR SELECTIONS 🎯</div>
                    {steps.map((s) => {
                      const selected = selections[s.id] || [];
                      const labels = s.options.filter((o) => selected.includes(o.id)).map((o) => o.label);
                      return labels.length > 0 ? (
                        <div key={s.id} style={{ 
                          display: "flex", 
                          justifyContent: "space-between", 
                          padding: "8px 0", 
                          borderBottom: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)", 
                          fontSize: 14 
                        }}>
                          <span style={{ color: isDark ? "#94a3b8" : "#6b7280" }}>{s.question.replace("?", "")}</span>
                          <span style={{ 
                            color: isDark ? "#e2e8f0" : "#1f2937", 
                            fontWeight: 600,
                            fontFamily: "'Rubik', sans-serif"
                          }}>{labels.join(", ")}</span>
                        </div>
                      ) : null;
                    })}
                  </div>

                  {/* Disclaimer */}
                  <div style={{ 
                    padding: "14px 18px", 
                    background: isDark ? "rgba(245,158,11,0.1)" : "rgba(245,158,11,0.08)", 
                    border: isDark ? "2px solid rgba(245,158,11,0.2)" : "2px solid rgba(245,158,11,0.15)", 
                    borderRadius: 12, 
                    marginBottom: 32, 
                    fontSize: 13, 
                    color: isDark ? "#fbbf24" : "#d97706", 
                    lineHeight: 1.6 
                  }}>
                    ⚠️ This is a rough estimate based on typical project costs. Final pricing depends on detailed requirements, which we discuss in a free consultation.
                  </div>

                  {/* Email Capture */}
                  <div style={{ textAlign: "center" as const }}>
                    <h3 style={{ 
                      fontSize: 20, 
                      fontWeight: 800, 
                      color: isDark ? "#f1f5f9" : "#111827", 
                      margin: "0 0 8px",
                      fontFamily: "'Rubik', sans-serif"
                    }}>Get a Detailed Proposal 📋</h3>
                    <p style={{ 
                      fontSize: 14, 
                      color: isDark ? "#94a3b8" : "#6b7280", 
                      margin: "0 0 24px" 
                    }}>
                      Enter your email and we'll send a personalized proposal within 24 hours.
                    </p>
                    <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, maxWidth: 400, margin: "0 auto" }}>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ 
                          padding: "14px 18px", 
                          borderRadius: 12, 
                          border: isDark ? "2px solid rgba(255,255,255,0.1)" : "2px solid rgba(0,0,0,0.1)", 
                          background: isDark ? "rgba(255,255,255,0.04)" : "#ffffff", 
                          color: isDark ? "#f1f5f9" : "#111827", 
                          fontSize: 15, 
                          fontFamily: "inherit", 
                          outline: "none" 
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "#FF8C00"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"; }}
                      />
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmitLead()}
                        style={{ 
                          padding: "14px 18px", 
                          borderRadius: 12, 
                          border: isDark ? "2px solid rgba(255,255,255,0.1)" : "2px solid rgba(0,0,0,0.1)", 
                          background: isDark ? "rgba(255,255,255,0.04)" : "#ffffff", 
                          color: isDark ? "#f1f5f9" : "#111827", 
                          fontSize: 15, 
                          fontFamily: "inherit", 
                          outline: "none" 
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "#FF8C00"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"; }}
                      />
                      <button
                        onClick={handleSubmitLead}
                        style={{ 
                          padding: "14px 28px", 
                          borderRadius: 12, 
                          border: "none", 
                          background: TIGER_GRADIENT, 
                          color: "#fff", 
                          fontSize: 15, 
                          fontWeight: 700, 
                          cursor: "pointer", 
                          fontFamily: "'Rubik', sans-serif", 
                          boxShadow: "0 4px 20px rgba(255,140,0,0.3)" 
                        }}
                      >
                        Send Me a Proposal 🚀 →
                      </button>
                    </div>
                    <p style={{ fontSize: 12, color: isDark ? "#64748b" : "#9ca3af", margin: "12px 0 0" }}>No spam. Just your detailed estimate.</p>
                  </div>
                </>
              ) : (
                /* Success State */
                <div style={{ textAlign: "center" as const, padding: "40px 0" }}>
                  <div style={{ 
                    width: 72, 
                    height: 72, 
                    borderRadius: "50%", 
                    background: "rgba(16,185,129,0.15)", 
                    border: "2px solid rgba(16,185,129,0.3)", 
                    display: "inline-flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    marginBottom: 24 
                  }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <h3 style={{ 
                    fontSize: 26, 
                    fontWeight: 800, 
                    color: isDark ? "#f1f5f9" : "#111827", 
                    margin: "0 0 12px",
                    fontFamily: "'Rubik', sans-serif"
                  }}>Estimate Sent! 🎉</h3>
                  <p style={{ 
                    fontSize: 16, 
                    color: isDark ? "#94a3b8" : "#6b7280", 
                    margin: "0 0 8px", 
                    lineHeight: 1.6 
                  }}>
                    We'll review your project details and send a personalized proposal to <span style={{ 
                      color: isDark ? "#e2e8f0" : "#1f2937", 
                      fontWeight: 600,
                      fontFamily: "'Rubik', sans-serif"
                    }}>{email}</span> within 24 hours.
                  </p>
                  <p style={{ 
                    fontSize: 14, 
                    color: isDark ? "#64748b" : "#9ca3af", 
                    margin: "0 0 32px" 
                  }}>
                    Your estimate: ${estimate.minPrice.toLocaleString()} — ${estimate.maxPrice.toLocaleString()} ({estimate.tier})
                  </p>
                  <a href="mailto:hello@papatiger.tech" style={{ 
                    display: "inline-block", 
                    padding: "14px 32px", 
                    background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,140,0,0.1)", 
                    border: isDark ? "2px solid rgba(255,255,255,0.1)" : "2px solid rgba(255,140,0,0.2)", 
                    borderRadius: 12, 
                    color: isDark ? "#e2e8f0" : "#1f2937", 
                    fontSize: 15, 
                    fontWeight: 600, 
                    textDecoration: "none",
                    fontFamily: "'Rubik', sans-serif"
                  }}>
                    Or Book a Call Now 📞 →
                  </a>
                </div>
              )}
            </div>
          ) : (
            /* ---- STEP VIEW ---- */
            <div>
              <h3 style={{ 
                fontSize: 24, 
                fontWeight: 800, 
                color: isDark ? "#f1f5f9" : "#111827", 
                margin: "0 0 6px",
                fontFamily: "'Rubik', sans-serif"
              }}>{step.question}</h3>
              <p style={{ 
                fontSize: 14, 
                color: isDark ? "#94a3b8" : "#6b7280", 
                margin: "0 0 28px" 
              }}>
                {step.subtitle}
                {isExtrasStep && <span style={{ color: isDark ? "#64748b" : "#9ca3af" }}> — skip if none apply</span>}
              </p>

              {/* Options */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: step.options.length <= 3 ? "1fr" : "1fr 1fr", 
                gap: 12, 
                marginBottom: 32 
              }}>
                {step.options.map((opt) => {
                  const isSelected = currentSelections.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(opt.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        padding: "18px 20px",
                        borderRadius: 14,
                        border: `2px solid ${isSelected ? "#FF8C00" : (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)")}`,
                        background: isSelected ? (isDark ? "rgba(255,140,0,0.15)" : "rgba(255,140,0,0.08)") : (isDark ? "rgba(255,255,255,0.02)" : "#ffffff"),
                        cursor: "pointer",
                        transition: "all 0.25s",
                        textAlign: "left" as const,
                        fontFamily: "inherit",
                        color: "inherit",
                      }}
                    >
                      {/* Selection indicator */}
                      <div style={{ 
                        width: 24, 
                        height: 24, 
                        borderRadius: isExtrasStep ? 6 : "50%", 
                        border: `2px solid ${isSelected ? "#FF8C00" : (isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)")}`, 
                        background: isSelected ? "#FF8C00" : "transparent", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        flexShrink: 0, 
                        transition: "all 0.2s" 
                      }}>
                        {isSelected && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        )}
                      </div>

                      <div style={{ fontSize: 24, flexShrink: 0 }}>{opt.icon}</div>
                      <div>
                        <div style={{ 
                          fontSize: 15, 
                          fontWeight: 700, 
                          color: isSelected ? (isDark ? "#f1f5f9" : "#111827") : (isDark ? "#cbd5e1" : "#4b5563"),
                          fontFamily: "'Rubik', sans-serif"
                        }}>{opt.label}</div>
                        <div style={{ 
                          fontSize: 13, 
                          color: isDark ? "#94a3b8" : "#6b7280", 
                          marginTop: 2 
                        }}>{opt.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation */}
          {!submitted && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                onClick={handleBack}
                style={{
                  padding: "12px 22px",
                  borderRadius: 12,
                  border: isDark ? "2px solid rgba(255,255,255,0.1)" : "2px solid rgba(0,0,0,0.1)",
                  background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                  color: isDark ? "#94a3b8" : "#6b7280",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: currentStep === 0 && !showResult ? "not-allowed" : "pointer",
                  opacity: currentStep === 0 && !showResult ? 0.3 : 1,
                  fontFamily: "'Rubik', sans-serif",
                  transition: "all 0.2s",
                }}
                disabled={currentStep === 0 && !showResult}
              >
                ← Back
              </button>

              {!showResult && (
                <button
                  onClick={handleNext}
                  disabled={!canProceed && !isExtrasStep}
                  style={{
                    padding: "12px 28px",
                    borderRadius: 12,
                    border: "none",
                    background: canProceed || isExtrasStep ? TIGER_GRADIENT : (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"),
                    color: canProceed || isExtrasStep ? "#fff" : (isDark ? "#64748b" : "#9ca3af"),
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: canProceed || isExtrasStep ? "pointer" : "not-allowed",
                    fontFamily: "'Rubik', sans-serif",
                    boxShadow: canProceed || isExtrasStep ? "0 4px 20px rgba(255,140,0,0.25)" : "none",
                    transition: "all 0.2s",
                  }}
                >
                  {isLastStep ? "See My Estimate 🎯 →" : "Next →"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Trust signals */}
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 24, flexWrap: "wrap" as const }}>
          {([
            { text: "No commitment", emoji: "✅" },
            { text: "Free estimate", emoji: "💯" },
            { text: "Response in 24h", emoji: "⚡" }
          ] as const).map((item) => (
            <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 14 }}>{item.emoji}</span>
              <span style={{ 
                fontSize: 13, 
                color: isDark ? "#64748b" : "#9ca3af",
                fontFamily: "'Rubik', sans-serif"
              }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
