"use client";

import { useState, useEffect, useRef, RefObject } from "react";

// ============================================================
// TYPES
// ============================================================

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  readTime: string;
  date: string;
  slug: string;
  featured?: boolean;
  tags: string[];
  targetAudience: string;
}

// ============================================================
// DATA — Replace with real blog posts as you publish them
// ============================================================

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "How Much Does It Cost to Build a SaaS MVP in 2026?",
    excerpt:
      "A transparent breakdown of real costs — from architecture to deployment. No fluff, no inflated agency pricing. Just what founders actually need to budget for their first production-ready product.",
    category: "Startup Guide",
    categoryColor: "#4f6ef7",
    readTime: "8 min read",
    date: "Coming Soon",
    slug: "saas-mvp-cost-2026",
    featured: true,
    tags: ["SaaS", "MVP", "Pricing", "Startups"],
    targetAudience: "Founders searching for dev agencies",
  },
  {
    id: "2",
    title: "Why Your PHP/WordPress Site Is Costing You Customers",
    excerpt:
      "Slow load times, security vulnerabilities, and impossible feature additions. If your site was built 5+ years ago, it's likely hurting your business more than helping it. Here's how to know when it's time to modernize.",
    category: "Legacy Systems",
    categoryColor: "#ef4444",
    readTime: "6 min read",
    date: "Coming Soon",
    slug: "php-wordpress-costing-customers",
    featured: true,
    tags: ["PHP", "WordPress", "Modernization", "Performance"],
    targetAudience: "Business owners with outdated sites",
  },
  {
    id: "3",
    title: "What to Look for When Hiring a Software Development Agency",
    excerpt:
      "Red flags, green flags, and the questions most founders forget to ask. After seeing what happens when clients come to us from bad agency experiences, we wrote the guide we wish they'd had before.",
    category: "Hiring Guide",
    categoryColor: "#10b981",
    readTime: "10 min read",
    date: "Coming Soon",
    slug: "hiring-software-agency-guide",
    tags: ["Agency", "Hiring", "Due Diligence", "Startups"],
    targetAudience: "Non-technical founders",
  },
  {
    id: "4",
    title: "Next.js vs React for Your Startup — A Founder's Guide",
    excerpt:
      "You don't need to understand every technical detail. But you do need to understand why this choice matters for your SEO, page speed, and development cost. Here's the plain-English version.",
    category: "Tech Explained",
    categoryColor: "#c44de8",
    readTime: "7 min read",
    date: "Coming Soon",
    slug: "nextjs-vs-react-founders",
    tags: ["Next.js", "React", "Frontend", "Decision Guide"],
    targetAudience: "Founders making tech decisions",
  },
  {
    id: "5",
    title: "How We Built a Portfolio Platform in 8 Weeks — Behind the Scenes",
    excerpt:
      "A technical deep dive into our architecture decisions, the mistakes we caught early, and the performance tricks that got 200+ portfolios loading in under 1.5 seconds.",
    category: "Case Study",
    categoryColor: "#f59e0b",
    readTime: "12 min read",
    date: "Coming Soon",
    slug: "portfolio-platform-behind-scenes",
    tags: ["Architecture", "Next.js", "AWS", "Performance"],
    targetAudience: "Technical decision-makers",
  },
  {
    id: "6",
    title: "Multi-Tenant Architecture: When Your SaaS Needs to Serve Multiple Companies",
    excerpt:
      "Row-level security, shared infrastructure, data isolation — what it means, when you need it, and how to avoid the $50K re-architecture mistake we've seen agencies make.",
    category: "Engineering",
    categoryColor: "#06b6d4",
    readTime: "9 min read",
    date: "Coming Soon",
    slug: "multi-tenant-architecture-guide",
    tags: ["Multi-Tenant", "PostgreSQL", "SaaS", "Architecture"],
    targetAudience: "CTOs and technical founders",
  },
];

const categories = [
  { name: "All", color: "#94a3b8" },
  { name: "Startup Guide", color: "#4f6ef7" },
  { name: "Legacy Systems", color: "#ef4444" },
  { name: "Tech Explained", color: "#c44de8" },
  { name: "Case Study", color: "#f59e0b" },
  { name: "Engineering", color: "#06b6d4" },
  { name: "Hiring Guide", color: "#10b981" },
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
// BLOG POST CARD
// ============================================================

interface BlogCardProps {
  post: BlogPost;
  index: number;
  animate: boolean;
  variant?: "featured" | "standard";
}

function BlogCard({ post, index, animate, variant = "standard" }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isFeatured = variant === "featured";

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${isHovered ? `${post.categoryColor}30` : "rgba(255,255,255,0.06)"}`,
        borderRadius: 20,
        padding: isFeatured ? "36px 32px" : "28px 24px",
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
        transform: animate
          ? isHovered ? "translateY(-4px)" : "translateY(0)"
          : "translateY(30px)",
        opacity: animate ? 1 : 0,
        transitionDelay: `${index * 100}ms`,
        boxShadow: isHovered ? `0 20px 60px rgba(0,0,0,0.3), 0 0 30px ${post.categoryColor}08` : "none",
        position: "relative" as const,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column" as const,
      }}
    >
      {/* Top accent */}
      <div style={{ position: "absolute" as const, top: 0, left: 0, right: 0, height: 3, background: post.categoryColor, opacity: isHovered ? 0.8 : 0.15, transition: "opacity 0.3s" }} />

      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap" as const, gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Category badge */}
          <span
            style={{
              padding: "4px 12px",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 700,
              color: post.categoryColor,
              background: `${post.categoryColor}12`,
              border: `1px solid ${post.categoryColor}22`,
              fontFamily: "'Space Mono', monospace",
              letterSpacing: 0.3,
            }}
          >
            {post.category}
          </span>
          {isFeatured && (
            <span style={{ padding: "4px 10px", borderRadius: 999, fontSize: 10, fontWeight: 700, background: GRADIENT, color: "#fff", letterSpacing: 0.5, fontFamily: "'Space Mono', monospace" }}>
              FEATURED
            </span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>{post.readTime}</span>
          <span style={{ fontSize: 12, color: "#4b5563" }}>·</span>
          <span style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>{post.date}</span>
        </div>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: isFeatured ? 22 : 18,
          fontWeight: 800,
          color: "#f1f5f9",
          lineHeight: 1.3,
          margin: "0 0 12px",
          transition: "color 0.2s",
          ...(isHovered ? { color: post.categoryColor } : {}),
        }}
      >
        {post.title}
      </h3>

      {/* Excerpt */}
      <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7, margin: "0 0 20px", flex: 1 }}>
        {post.excerpt}
      </p>

      {/* Target audience */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
        </svg>
        <span style={{ fontSize: 12, color: "#64748b", fontStyle: "italic" }}>Written for: {post.targetAudience}</span>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6, marginBottom: 16 }}>
        {post.tags.map((tag) => (
          <span
            key={tag}
            style={{
              padding: "3px 10px",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 600,
              color: "#94a3b8",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Read more */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: post.categoryColor,
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "gap 0.2s",
            ...(isHovered ? { gap: 10 } : {}),
          }}
        >
          Read Article
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={post.categoryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>

        {/* Bookmark icon */}
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", opacity: isHovered ? 1 : 0.4, transition: "opacity 0.3s" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
          </svg>
        </div>
      </div>
    </article>
  );
}

// ============================================================
// NEWSLETTER SIGNUP
// ============================================================

function NewsletterSignup({ animate }: { animate: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.includes("@")) {
      setSubmitted(true);
      // TODO: Integrate with your email service (Mailchimp, ConvertKit, etc.)
    }
  };

  return (
    <div
      style={{
        padding: "48px 40px",
        background: "linear-gradient(135deg, rgba(79,110,247,0.08), rgba(196,77,232,0.06))",
        border: "1px solid rgba(79,110,247,0.15)",
        borderRadius: 24,
        textAlign: "center" as const,
        opacity: animate ? 1 : 0,
        transform: animate ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.7s cubic-bezier(.22,1,.36,1) 300ms",
        position: "relative" as const,
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div style={{ position: "absolute" as const, top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,110,247,0.08), transparent 70%)", pointerEvents: "none" as const }} />

      {/* Icon */}
      <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(79,110,247,0.12)", border: "1px solid rgba(79,110,247,0.2)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f6ef7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      </div>

      <h3 style={{ fontSize: 24, fontWeight: 800, color: "#f1f5f9", margin: "0 0 8px" }}>Tech Insights for Founders</h3>
      <p style={{ fontSize: 15, color: "#94a3b8", margin: "0 0 28px", maxWidth: 480, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
        Monthly tips on tech decisions, development costs, and scaling your product. Written in plain English — no jargon.
      </p>

      {submitted ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 24px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 14 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#10b981" }}>You're in! Check your inbox for a welcome email.</span>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 10, maxWidth: 480, margin: "0 auto", flexWrap: "wrap" as const, justifyContent: "center" }}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            style={{
              flex: 1,
              minWidth: 220,
              padding: "14px 20px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              color: "#f1f5f9",
              fontSize: 15,
              fontFamily: "inherit",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(79,110,247,0.4)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
          />
          <button
            onClick={handleSubmit}
            style={{
              padding: "14px 28px",
              borderRadius: 12,
              border: "none",
              background: GRADIENT,
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: "0 4px 20px rgba(79,110,247,0.3)",
              transition: "all 0.2s",
              whiteSpace: "nowrap" as const,
            }}
          >
            Subscribe Free
          </button>
        </div>
      )}

      <p style={{ fontSize: 12, color: "#4b5563", margin: "14px 0 0" }}>
        No spam. Unsubscribe anytime. 2 emails per month max.
      </p>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function BlogSection(): JSX.Element {
  const [activeCategory, setActiveCategory] = useState("All");
  const [heroRef, heroInView] = useInView(0.05);
  const [featuredRef, featuredInView] = useInView(0.05);
  const [gridRef, gridInView] = useInView(0.05);
  const [ctaRef, ctaInView] = useInView(0.1);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600;700;800;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const filteredPosts = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  const featuredPosts = filteredPosts.filter((p) => p.featured);
  const standardPosts = filteredPosts.filter((p) => !p.featured);

  return (
    <section
      id="Blog"
      style={{
        padding: "100px 0",
        background: "#0a0e1a",
        fontFamily: "'DM Sans', -apple-system, sans-serif",
        color: "#e2e8f0",
        position: "relative" as const,
        overflow: "hidden",
      }}
    >
      {/* Ambient */}
      <div style={{ position: "absolute" as const, inset: 0, pointerEvents: "none" as const }}>
        <div style={{ position: "absolute" as const, top: -300, left: "30%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,110,247,0.05), transparent 70%)" }} />
        <div style={{ position: "absolute" as const, bottom: -200, right: "20%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(196,77,232,0.04), transparent 70%)" }} />
      </div>

      <div style={{ position: "relative" as const, zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Hero Header */}
        <div
          ref={heroRef}
          style={{
            textAlign: "center" as const,
            marginBottom: 56,
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(40px)",
            transition: "all 1s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 3,
              marginBottom: 20,
              fontFamily: "'Space Mono', monospace",
              background: GRADIENT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            INSIGHTS & ENGINEERING NOTES
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 900, color: "#f1f5f9", lineHeight: 1.05, margin: "0 0 20px", letterSpacing: -2 }}>
            Blog
          </h1>
          <p style={{ fontSize: 18, color: "#94a3b8", maxWidth: 640, margin: "0 auto 12px", lineHeight: 1.6 }}>
            Technical insights, founder guides, and behind-the-scenes deep dives. Written to help you make better tech decisions.
          </p>
          <p style={{ fontSize: 14, color: "#64748b", maxWidth: 500, margin: "0 auto" }}>
            New posts every 2 weeks · Each ends with actionable advice
          </p>

          {/* Publishing cadence visual */}
          <div style={{ display: "inline-flex", gap: 1, marginTop: 32, background: "rgba(255,255,255,0.04)", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
            {([
              { value: "2/mo", label: "New Posts" },
              { value: "6", label: "Topics Planned" },
              { value: "Free", label: "Always" },
            ] as const).map((s, i) => (
              <div key={i} style={{ padding: "18px 32px", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", fontFamily: "'Space Mono', monospace" }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "#64748b", fontWeight: 600, marginTop: 4, letterSpacing: 0.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const, justifyContent: "center", marginBottom: 48 }}>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                border: `1px solid ${activeCategory === cat.name ? `${cat.color}40` : "rgba(255,255,255,0.08)"}`,
                background: activeCategory === cat.name ? `${cat.color}15` : "rgba(255,255,255,0.02)",
                color: activeCategory === cat.name ? cat.color : "#94a3b8",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.25s",
                fontFamily: "inherit",
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Featured Posts (2 columns) */}
        {featuredPosts.length > 0 && (
          <div ref={featuredRef} style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase" as const, color: "#64748b", marginBottom: 16, fontFamily: "'Space Mono', monospace", paddingLeft: 4 }}>
              FEATURED ARTICLES
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))", gap: 20 }}>
              {featuredPosts.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} animate={featuredInView} variant="featured" />
              ))}
            </div>
          </div>
        )}

        {/* Standard Posts (3 columns) */}
        {standardPosts.length > 0 && (
          <div ref={gridRef} style={{ marginBottom: 64 }}>
            {featuredPosts.length > 0 && (
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase" as const, color: "#64748b", marginBottom: 16, fontFamily: "'Space Mono', monospace", paddingLeft: 4 }}>
                MORE ARTICLES
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
              {standardPosts.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} animate={gridInView} variant="standard" />
              ))}
            </div>
          </div>
        )}

        {/* No results */}
        {filteredPosts.length === 0 && (
          <div style={{ textAlign: "center" as const, padding: "60px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9", margin: "0 0 8px" }}>No posts in this category yet</h3>
            <p style={{ fontSize: 15, color: "#94a3b8" }}>Check back soon or subscribe to get notified when we publish.</p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div ref={ctaRef} style={{ marginBottom: 64 }}>
          <NewsletterSignup animate={ctaInView} />
        </div>

        {/* Content Roadmap */}
        <div style={{ marginBottom: 0 }}>
          <div style={{ textAlign: "center" as const, marginBottom: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase" as const, color: "#64748b", marginBottom: 10, fontFamily: "'Space Mono', monospace" }}>CONTENT ROADMAP</div>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: "#f1f5f9", margin: 0 }}>What We're Writing Next</h3>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {([
              { quarter: "Q1 2026", topics: ["SaaS MVP Cost Guide", "PHP Migration Playbook", "Hiring Agency Checklist"], status: "In Progress", statusColor: "#f59e0b" },
              { quarter: "Q2 2026", topics: ["Database Choice Guide", "CI/CD for Non-Technical Founders", "NFC Tech Explained"], status: "Planned", statusColor: "#4f6ef7" },
              { quarter: "Q3 2026", topics: ["Scaling from 100 to 10K Users", "GDPR/KVKK for SaaS", "AI Integration Basics"], status: "Upcoming", statusColor: "#64748b" },
            ] as const).map((q, qi) => (
              <div
                key={q.quarter}
                style={{
                  padding: "24px 22px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 16,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0" }}>{q.quarter}</span>
                  <span style={{ padding: "3px 10px", borderRadius: 999, fontSize: 10, fontWeight: 700, color: q.statusColor, background: `${q.statusColor}15`, border: `1px solid ${q.statusColor}25`, fontFamily: "'Space Mono', monospace" }}>
                    {q.status}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
                  {q.topics.map((topic, ti) => (
                    <div key={ti} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: q.statusColor, opacity: 0.5, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "#94a3b8" }}>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
