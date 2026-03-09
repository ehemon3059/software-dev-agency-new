'use client'

import { useState, useEffect, useRef, RefObject } from 'react'

const ACCENT = '#6366f1'; const CYAN = '#22d3ee'

const primary = [
  { id: 'build', num: '01', title: 'Custom Web Application Development', desc: 'Full-stack web apps designed, built, and deployed from scratch.',
    items: ['Full-stack web applications', 'Business dashboards & internal tools', 'SaaS platforms & multi-user systems', 'Database-driven apps with role-based access'],
    outcome: 'A production-ready system that scales with your business.', timeline: '4–12 weeks',
    stack: ['React', 'Next.js', 'Node.js', 'PostgreSQL'] },
  { id: 'fix', num: '02', title: 'Existing Application Fix & Upgrade', desc: 'Audit, fix, modernize, and document your existing software.',
    items: ['Bug fixing & performance optimization', 'Legacy system modernization', 'Security improvements & code audits', 'Feature upgrades & tech debt cleanup'],
    outcome: 'Your system runs faster, more securely, and is maintainable long-term.', timeline: '2–8 weeks',
    stack: ['Code Audit', 'Security', 'Performance', 'Docs'] },
]

const secondary = [
  { id: 'api', title: 'API Development', desc: 'RESTful APIs, authentication, database integration' },
  { id: 'devops', title: 'Deployment & DevOps', desc: 'Docker, cloud deployment, CI/CD pipelines' },
  { id: 'desktop', title: 'Desktop Applications', desc: 'Cross-platform apps with Electron.js' },
]

function useInView(th: number = 0.08): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null); const [v, setV] = useState(false)
  useEffect(() => { const el = ref.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold: th }); o.observe(el); return () => o.disconnect() }, [th]); return [ref, v]
}
function useTheme() { const [d, setD] = useState(true); useEffect(() => { const c = () => setD(document.documentElement.classList.contains('dark')); c(); const o = new MutationObserver(c); o.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] }); return () => o.disconnect() }, []); return d }

function ServiceCard({ s, i, anim, isDark }: { s: typeof primary[0]; i: number; anim: boolean; isDark: boolean }) {
  const [h, setH] = useState(false)
  const tp = isDark ? '#fafafa' : '#09090b'; const ts = isDark ? '#a1a1aa' : '#71717a'; const tt = isDark ? '#52525b' : '#a1a1aa'
  const bd = isDark ? h ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.06)' : h ? 'rgba(99,102,241,0.2)' : 'rgba(0,0,0,0.06)'
  const bg = isDark ? h ? 'rgba(255,255,255,0.035)' : 'rgba(255,255,255,0.015)' : h ? 'rgba(0,0,0,0.025)' : 'rgba(0,0,0,0.01)'

  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        padding: '36px 30px', borderRadius: 16, border: `1px solid ${bd}`, background: bg,
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        transform: anim ? h ? 'translateY(-4px)' : 'translateY(0)' : 'translateY(28px)',
        opacity: anim ? 1 : 0, transitionDelay: `${i * 120}ms`,
        boxShadow: h && isDark ? `0 12px 48px rgba(0,0,0,0.4), 0 0 40px rgba(99,102,241,0.06)` : 'none',
        position: 'relative' as const, overflow: 'hidden', display: 'flex', flexDirection: 'column' as const,
      }}>
      {/* Gradient top line */}
      <div style={{ position: 'absolute' as const, top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${ACCENT}, ${CYAN})`, opacity: h ? 0.9 : 0.15, transition: 'opacity 0.3s' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: tt, fontFamily: "'JetBrains Mono', monospace" }}>{s.num}</span>
        <div style={{ height: 1, flex: 1, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />
        <span style={{ padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`, color: '#fff', fontFamily: "'JetBrains Mono', monospace" }}>Primary</span>
      </div>

      <h3 style={{ fontSize: 21, fontWeight: 700, color: tp, lineHeight: 1.25, margin: '0 0 8px', letterSpacing: '-0.02em', fontFamily: "'Syne', sans-serif" }}>{s.title}</h3>
      <p style={{ fontSize: 14, color: ts, lineHeight: 1.5, margin: '0 0 20px' }}>{s.desc}</p>

      {/* Tech */}
      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6, marginBottom: 24 }}>
        {s.stack.map(t => (
          <span key={t} style={{
            padding: '4px 12px', borderRadius: 999, fontSize: 11, fontWeight: 600,
            color: isDark ? '#c7d2fe' : ACCENT,
            background: isDark ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)',
            border: `1px solid ${isDark ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)'}`,
            fontFamily: "'JetBrains Mono', monospace",
          }}>{t}</span>
        ))}
      </div>

      {/* Items */}
      <div style={{ marginBottom: 24, flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: tt, marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>WHAT YOU GET</div>
        {s.items.map((item, j) => (
          <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ width: 18, height: 18, borderRadius: 6, background: isDark ? 'rgba(34,211,238,0.1)' : 'rgba(34,211,238,0.08)', border: `1px solid ${isDark ? 'rgba(34,211,238,0.2)' : 'rgba(34,211,238,0.15)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={CYAN} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <span style={{ fontSize: 14, color: ts, lineHeight: 1.4 }}>{item}</span>
          </div>
        ))}
      </div>

      {/* Outcome + Timeline */}
      <div style={{ paddingTop: 20, borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}>
        <p style={{ fontSize: 14, color: ts, lineHeight: 1.6, margin: '0 0 14px' }}><span style={{ color: tp, fontWeight: 700 }}>Outcome: </span>{s.outcome}</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 999, background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={tt} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
          <span style={{ fontSize: 13, fontWeight: 700, color: tp, fontFamily: "'JetBrains Mono', monospace" }}>{s.timeline}</span>
        </div>
      </div>
    </div>
  )
}

export default function ServicesSection() {
  const isDark = useTheme()
  const [hRef, hIn] = useInView(0.1); const [pRef, pIn] = useInView(0.05); const [sRef, sIn] = useInView(0.05)
  const bg = isDark ? '#050508' : '#ffffff'
  const tp = isDark ? '#fafafa' : '#09090b'; const ts = isDark ? '#a1a1aa' : '#71717a'; const tt = isDark ? '#52525b' : '#a1a1aa'
  const bd = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
  const cb = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'
  const grid = isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)'

  return (
    <section id="services" style={{ padding: '96px 0', background: bg, fontFamily: "'Syne', sans-serif", position: 'relative' as const, overflow: 'hidden' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');`}</style>
      {/* Grid bg */}
      <div style={{ position: 'absolute' as const, inset: 0, backgroundImage: `linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`, backgroundSize: '72px 72px', maskImage: 'radial-gradient(ellipse 50% 40% at 50% 30%, black 20%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 50% 40% at 50% 30%, black 20%, transparent 100%)', pointerEvents: 'none' as const }} />

      <div style={{ position: 'relative' as const, zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div ref={hRef} style={{ textAlign: 'center' as const, marginBottom: 56, opacity: hIn ? 1 : 0, transform: hIn ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, border: `1px solid ${bd}`, background: cb, marginBottom: 24, fontSize: 12, fontWeight: 600, color: ts }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, boxShadow: `0 0 8px rgba(99,102,241,0.4)` }} />What we do
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: tp, lineHeight: 1.05, margin: '0 0 14px', letterSpacing: '-0.04em' }}>Services</h2>
          <p style={{ fontSize: 17, color: ts, maxWidth: 460, margin: '0 auto', lineHeight: 1.6 }}>Professional software solutions tailored to your business.</p>
        </div>

        {/* Primary */}
        <div ref={pRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 48 }}>
          {primary.map((s, i) => <ServiceCard key={s.id} s={s} i={i} anim={pIn} isDark={isDark} />)}
        </div>

        {/* Divider */}
        <div ref={sRef} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, opacity: sIn ? 1 : 0, transition: 'opacity 0.5s ease 200ms' }}>
          <div style={{ height: 1, flex: 1, background: bd }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: tt, fontFamily: "'JetBrains Mono', monospace" }}>ALSO AVAILABLE</span>
          <div style={{ height: 1, flex: 1, background: bd }} />
        </div>

        {/* Secondary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 48 }}>
          {secondary.map((s, i) => {
            const [h, setH] = useState(false)
            return (
              <div key={s.id} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                style={{
                  padding: '24px 22px', borderRadius: 14,
                  border: `1px solid ${isDark ? h ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.06)' : h ? 'rgba(99,102,241,0.15)' : 'rgba(0,0,0,0.06)'}`,
                  background: isDark ? h ? 'rgba(255,255,255,0.035)' : 'rgba(255,255,255,0.015)' : h ? 'rgba(0,0,0,0.02)' : 'rgba(0,0,0,0.01)',
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                  transform: sIn ? h ? 'translateY(-3px)' : 'translateY(0)' : 'translateY(20px)',
                  opacity: sIn ? 1 : 0, transitionDelay: `${i * 80 + 200}ms`,
                  boxShadow: h && isDark ? `0 0 24px rgba(99,102,241,0.06)` : 'none',
                }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: isDark ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.06)', border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, transition: 'transform 0.2s', transform: h ? 'rotate(-45deg)' : 'rotate(0)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: tp, marginBottom: 4, fontFamily: "'Syne', sans-serif" }}>{s.title}</h4>
                <p style={{ fontSize: 13, color: ts, lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'center', opacity: sIn ? 1 : 0, transition: 'opacity 0.5s ease 400ms' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 999, border: `1px solid ${bd}`, background: cb }}>
            <span style={{ fontSize: 14, color: ts }}>We don't just write code —</span>
            <span style={{ fontSize: 14, fontWeight: 700, background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>we solve business problems.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
