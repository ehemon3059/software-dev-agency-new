'use client'

import { useState, useEffect, useRef, RefObject } from 'react'

const ACCENT = '#6366f1'
const CYAN = '#22d3ee'

interface StatItem { value: number; suffix: string; decimals?: number; label: string; desc: string }

const stats: StatItem[] = [
  { value: 5, suffix: '+', label: 'Production Apps', desc: 'Live products serving real users' },
  { value: 3, suffix: '+', label: 'SaaS Platforms', desc: 'Multi-tenant systems from scratch' },
  { value: 2000, suffix: '+', label: 'Users Served', desc: 'Combined across all platforms' },
  { value: 99.9, suffix: '%', decimals: 1, label: 'Avg. Uptime', desc: 'Monitored around the clock' },
  { value: 3, suffix: '+', label: 'Years Building', desc: 'Consistent production delivery' },
  { value: 100, suffix: '%', label: 'Code Ownership', desc: 'You own everything — always' },
]

function useInView(th: number = 0.1): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null); const [v, setV] = useState(false)
  useEffect(() => { const el = ref.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold: th }); o.observe(el); return () => o.disconnect() }, [th])
  return [ref, v]
}
function useTheme() { const [d, setD] = useState(true); useEffect(() => { const c = () => setD(document.documentElement.classList.contains('dark')); c(); const o = new MutationObserver(c); o.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] }); return () => o.disconnect() }, []); return d }
function useCountUp(end: number, dur: number, start: boolean, dec: number = 0) {
  const [v, setV] = useState(0); const s = useRef(false)
  useEffect(() => { if (!start || s.current) return; s.current = true; let st: number | null = null; function step(ts: number) { if (!st) st = ts; const p = Math.min((ts - st) / dur, 1); setV((1 - Math.pow(1 - p, 3)) * end); if (p < 1) requestAnimationFrame(step); else setV(end) } requestAnimationFrame(step) }, [start, end, dur])
  return dec > 0 ? v.toFixed(dec) : Math.floor(v).toString()
}

function StatCard({ stat, i, anim, isDark }: { stat: StatItem; i: number; anim: boolean; isDark: boolean }) {
  const [h, setH] = useState(false)
  const val = useCountUp(stat.value, 1600 + i * 150, anim, stat.decimals || 0)
  const tp = isDark ? '#fafafa' : '#09090b'
  const ts = isDark ? '#a1a1aa' : '#71717a'

  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        padding: '32px 24px', borderRadius: 16, position: 'relative' as const, overflow: 'hidden',
        background: isDark ? h ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)' : h ? 'rgba(0,0,0,0.03)' : 'rgba(0,0,0,0.01)',
        border: `1px solid ${isDark ? h ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.06)' : h ? 'rgba(99,102,241,0.2)' : 'rgba(0,0,0,0.06)'}`,
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        transform: anim ? h ? 'translateY(-4px)' : 'translateY(0)' : 'translateY(24px)',
        opacity: anim ? 1 : 0, transitionDelay: `${i * 70}ms`,
        boxShadow: h && isDark ? `0 8px 40px rgba(0,0,0,0.3), 0 0 30px rgba(99,102,241,0.08)` : 'none',
      }}>
      {/* Hover glow */}
      {h && isDark && <div style={{ position: 'absolute' as const, top: -40, left: '50%', transform: 'translateX(-50%)', width: 200, height: 80, borderRadius: '50%', background: `radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)`, pointerEvents: 'none' as const }} />}
      <div style={{
        fontSize: 52, fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 12,
        color: tp, fontVariantNumeric: 'tabular-nums', fontFamily: "'Syne', sans-serif",
        position: 'relative' as const,
      }}>
        {val}
        <span style={{
          background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>{stat.suffix}</span>
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: tp, marginBottom: 4, letterSpacing: '-0.01em', fontFamily: "'Syne', sans-serif" }}>{stat.label}</div>
      <div style={{ fontSize: 13, color: ts, lineHeight: 1.5 }}>{stat.desc}</div>
    </div>
  )
}

export default function SocialProof() {
  const isDark = useTheme()
  const [hRef, hIn] = useInView(0.1)
  const [gRef, gIn] = useInView(0.05)
  const bg = isDark ? '#050508' : '#fafafa'
  const tp = isDark ? '#fafafa' : '#09090b'
  const ts = isDark ? '#a1a1aa' : '#71717a'
  const bd = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
  const cb = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'

  return (
    <section id="SocialProof" style={{ padding: '96px 0', background: bg, fontFamily: "'Syne', sans-serif", position: 'relative' as const, overflow: 'hidden' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');`}</style>
      {/* Ambient */}
      <div style={{ position: 'absolute' as const, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, borderRadius: '50%', background: `radial-gradient(circle, ${isDark ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.03)'}, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none' as const }} />

      <div style={{ position: 'relative' as const, zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div ref={hRef} style={{ textAlign: 'center' as const, marginBottom: 56, opacity: hIn ? 1 : 0, transform: hIn ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, border: `1px solid ${bd}`, background: cb, marginBottom: 24, fontSize: 12, fontWeight: 600, color: ts }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px rgba(34,197,94,0.4)' }} />
            Real numbers, no fluff
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: tp, lineHeight: 1.05, margin: '0 0 14px', letterSpacing: '-0.04em' }}>
            Verified track record
          </h2>
          <p style={{ fontSize: 17, color: ts, maxWidth: 460, margin: '0 auto', lineHeight: 1.6 }}>
            Honest numbers from real projects that speak for themselves.
          </p>
        </div>

        <div ref={gRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {stats.map((s, i) => <StatCard key={s.label} stat={s} i={i} anim={gIn} isDark={isDark} />)}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40, opacity: gIn ? 1 : 0, transition: 'opacity 0.6s ease 500ms' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 999, border: `1px solid ${bd}`, background: cb }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>
            <span style={{ fontSize: 13, color: ts }}>All stats are real. <span style={{ color: tp, fontWeight: 700 }}>We never inflate numbers.</span></span>
          </div>
        </div>
      </div>
    </section>
  )
}
