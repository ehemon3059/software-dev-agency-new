'use client'

import { useState, useEffect, useRef, RefObject } from 'react'

const ACCENT = '#6366f1'
const CYAN = '#22d3ee'

const problems = [
  { id: 'broken', num: '01', title: 'Stuck with broken software', problem: "Your current system is buggy, slow, or built by developers who disappeared. Every fix creates new problems.", solution: "We audit your codebase, fix critical bugs, optimize performance, and document everything — so you're never stuck again." },
  { id: 'mvp', num: '02', title: 'Need an MVP fast (but right)', problem: "You have funding and a deadline. You need a working product in 4–8 weeks, but can't afford technical debt.", solution: "We build production-ready MVPs with clean architecture — ready to scale when you grow, not crumble under pressure." },
  { id: 'legacy', num: '03', title: 'Outdated legacy systems', problem: "Your PHP/WordPress site is holding you back. It's slow, insecure, and impossible to add new features.", solution: "We modernize legacy systems with modern frameworks — keeping your data, improving everything else." },
]

function useInView(th: number = 0.1): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null); const [v, setV] = useState(false)
  useEffect(() => { const el = ref.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold: th }); o.observe(el); return () => o.disconnect() }, [th])
  return [ref, v]
}
function useTheme() { const [d, setD] = useState(true); useEffect(() => { const c = () => setD(document.documentElement.classList.contains('dark')); c(); const o = new MutationObserver(c); o.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] }); return () => o.disconnect() }, []); return d }

function Card({ item, i, anim, isDark }: { item: typeof problems[0]; i: number; anim: boolean; isDark: boolean }) {
  const [h, setH] = useState(false)
  const tp = isDark ? '#fafafa' : '#09090b'
  const ts = isDark ? '#a1a1aa' : '#71717a'
  const tt = isDark ? '#52525b' : '#a1a1aa'
  const bd = isDark ? h ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.06)' : h ? 'rgba(99,102,241,0.2)' : 'rgba(0,0,0,0.06)'
  const bg = isDark ? h ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)' : h ? 'rgba(0,0,0,0.025)' : 'rgba(0,0,0,0.01)'

  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        padding: '32px 28px', borderRadius: 16, border: `1px solid ${bd}`, background: bg,
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        transform: anim ? h ? 'translateY(-5px)' : 'translateY(0)' : 'translateY(28px)',
        opacity: anim ? 1 : 0, transitionDelay: `${i * 100}ms`,
        boxShadow: h && isDark ? `0 12px 48px rgba(0,0,0,0.4), 0 0 40px rgba(99,102,241,0.08)` : h ? '0 8px 32px rgba(0,0,0,0.08)' : 'none',
        position: 'relative' as const, overflow: 'hidden',
        display: 'flex', flexDirection: 'column' as const, gap: 24,
      }}>
      {/* Top glow line */}
      <div style={{ position: 'absolute' as const, top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${ACCENT}, ${CYAN})`, opacity: h ? 0.8 : 0, transition: 'opacity 0.3s' }} />

      <div>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: tt, fontFamily: "'JetBrains Mono', monospace" }}>{item.num}</span>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: tp, lineHeight: 1.25, margin: '8px 0 0', letterSpacing: '-0.02em', fontFamily: "'Syne', sans-serif" }}>{item.title}</h3>
      </div>

      {/* Problem */}
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: isDark ? '#f87171' : '#ef4444', boxShadow: isDark ? '0 0 10px rgba(248,113,113,0.4)' : 'none', flexShrink: 0, marginTop: 6 }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: isDark ? '#f87171' : '#ef4444', letterSpacing: 1, marginBottom: 4, fontFamily: "'JetBrains Mono', monospace" }}>THE PROBLEM</div>
          <p style={{ fontSize: 14, color: ts, lineHeight: 1.6, margin: 0 }}>{item.problem}</p>
        </div>
      </div>

      <div style={{ height: 1, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />

      {/* Solution */}
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: isDark ? '#34d399' : '#10b981', boxShadow: isDark ? '0 0 10px rgba(52,211,153,0.4)' : 'none', flexShrink: 0, marginTop: 6 }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: isDark ? '#34d399' : '#10b981', letterSpacing: 1, marginBottom: 4, fontFamily: "'JetBrains Mono', monospace" }}>OUR SOLUTION</div>
          <p style={{ fontSize: 14, color: ts, lineHeight: 1.6, margin: 0 }}>{item.solution}</p>
        </div>
      </div>
    </div>
  )
}

export default function ProblemSolution() {
  const isDark = useTheme()
  const [hRef, hIn] = useInView(0.1)
  const [gRef, gIn] = useInView(0.05)
  const bg = isDark ? '#050508' : '#fafafa'
  const tp = isDark ? '#fafafa' : '#09090b'
  const ts = isDark ? '#a1a1aa' : '#71717a'
  const bd = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
  const cb = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'

  return (
    <section id="problems" style={{ padding: '96px 0', background: bg, fontFamily: "'Syne', sans-serif", position: 'relative' as const, overflow: 'hidden' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');`}</style>
      <div style={{ position: 'absolute' as const, top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${isDark ? 'rgba(99,102,241,0.05)' : 'rgba(99,102,241,0.03)'}, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none' as const }} />

      <div style={{ position: 'relative' as const, zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div ref={hRef} style={{ textAlign: 'center' as const, marginBottom: 56, opacity: hIn ? 1 : 0, transform: hIn ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, border: `1px solid ${bd}`, background: cb, marginBottom: 24, fontSize: 12, fontWeight: 600, color: ts }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            Sound familiar?
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: tp, lineHeight: 1.05, margin: '0 0 14px', letterSpacing: '-0.04em' }}>Problems we solve</h2>
          <p style={{ fontSize: 17, color: ts, maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>Three challenges we see most — and exactly how we fix them.</p>
        </div>

        <div ref={gRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {problems.map((p, i) => <Card key={p.id} item={p} i={i} anim={gIn} isDark={isDark} />)}
        </div>
      </div>
    </section>
  )
}
