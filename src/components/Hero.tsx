'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowRight } from 'lucide-react'
import ContactModal from './ContactModal'

const ACCENT = '#6366f1'
const CYAN = '#22d3ee'
const ACCENT_GLOW = 'rgba(99,102,241,0.4)'

function useTheme() {
  const [isDark, setIsDark] = useState(true)
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])
  return isDark
}

// Floating particle system
function Particles({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; pulse: number }[] = []
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    let frame: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.pulse += 0.02
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0
        const o = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = isDark ? `rgba(99,102,241,${o})` : `rgba(99,102,241,${o * 0.5})`
        ctx.fill()
      })
      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = isDark ? `rgba(99,102,241,${0.06 * (1 - d / 120)})` : `rgba(99,102,241,${0.04 * (1 - d / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      frame = requestAnimationFrame(animate)
    }
    animate()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(frame) }
  }, [isDark])

  return <canvas ref={canvasRef} style={{ position: 'absolute' as const, inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
}

// Typing code animation
function TerminalCode({ isDark }: { isDark: boolean }) {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    let line = 0
    const interval = setInterval(() => {
      line++
      setVisibleLines(line)
      if (line >= 7) clearInterval(interval)
    }, 400)
    return () => clearInterval(interval)
  }, [])

  const lines = [
    { prefix: 'const', name: 'project', op: '=', keyword: 'await', fn: 'papatiger', method: '.build', paren: '({' },
    { indent: true, key: 'idea', val: '"your-startup"' },
    { indent: true, key: 'stack', val: '"next.js + node + postgres"' },
    { indent: true, key: 'delivery', val: '"4-8 weeks"' },
    { indent: true, key: 'price', val: '"fixed, no surprises"' },
    { close: true },
    { output: true },
  ]

  const bg = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const purple = isDark ? '#c084fc' : '#7c3aed'
  const blue = isDark ? '#60a5fa' : '#2563eb'
  const green = isDark ? '#4ade80' : '#16a34a'
  const yellow = isDark ? '#fbbf24' : '#d97706'
  const pink = isDark ? '#f9a8d4' : '#db2777'
  const dim = isDark ? '#52525b' : '#a1a1aa'
  const txt = isDark ? '#e2e8f0' : '#374151'

  return (
    <div style={{
      maxWidth: 620, margin: '0 auto', borderRadius: 16, overflow: 'hidden',
      border: `1px solid ${border}`, background: bg,
      boxShadow: isDark ? `0 8px 40px rgba(0,0,0,0.4), 0 0 80px rgba(99,102,241,0.06)` : '0 4px 24px rgba(0,0,0,0.08)',
    }}>
      {/* Terminal bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: `1px solid ${border}` }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', opacity: 0.8 }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b', opacity: 0.8 }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e', opacity: 0.8 }} />
        </div>
        <span style={{ fontSize: 11, color: dim, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>papatiger.ts</span>
        <div style={{ width: 50 }} />
      </div>
      {/* Code */}
      <div style={{ padding: '18px 22px', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: 2 }}>
        {visibleLines >= 1 && <div style={{ animation: 'fadeSlideIn 0.3s ease' }}>
          <span style={{ color: purple }}>const</span> <span style={{ color: blue }}>project</span> <span style={{ color: dim }}>=</span> <span style={{ color: yellow }}>await</span> <span style={{ color: green }}>papatiger</span><span style={{ color: dim }}>.build</span><span style={{ color: dim }}>{'({'}</span>
        </div>}
        {visibleLines >= 2 && <div style={{ paddingLeft: 24, animation: 'fadeSlideIn 0.3s ease' }}><span style={{ color: pink }}>idea</span><span style={{ color: dim }}>:</span> <span style={{ color: green }}>&quot;your-startup&quot;</span><span style={{ color: dim }}>,</span></div>}
        {visibleLines >= 3 && <div style={{ paddingLeft: 24, animation: 'fadeSlideIn 0.3s ease' }}><span style={{ color: pink }}>stack</span><span style={{ color: dim }}>:</span> <span style={{ color: green }}>&quot;next.js + node + postgres&quot;</span><span style={{ color: dim }}>,</span></div>}
        {visibleLines >= 4 && <div style={{ paddingLeft: 24, animation: 'fadeSlideIn 0.3s ease' }}><span style={{ color: pink }}>delivery</span><span style={{ color: dim }}>:</span> <span style={{ color: green }}>&quot;4-8 weeks&quot;</span><span style={{ color: dim }}>,</span></div>}
        {visibleLines >= 5 && <div style={{ paddingLeft: 24, animation: 'fadeSlideIn 0.3s ease' }}><span style={{ color: pink }}>price</span><span style={{ color: dim }}>:</span> <span style={{ color: green }}>&quot;fixed, no surprises&quot;</span></div>}
        {visibleLines >= 6 && <div style={{ animation: 'fadeSlideIn 0.3s ease' }}><span style={{ color: dim }}>{'});'}</span></div>}
        {visibleLines >= 7 && <div style={{ marginTop: 8, animation: 'fadeSlideIn 0.3s ease' }}>
          <span style={{ color: dim }}>{'// '}</span><span style={{ color: green, fontWeight: 600 }}>→ &quot;shipped&quot; ✓</span>
          <span style={{ display: 'inline-block', width: 8, height: 16, background: ACCENT, marginLeft: 4, animation: 'blink 1s infinite', verticalAlign: 'middle', borderRadius: 1 }} />
        </div>}
      </div>
    </div>
  )
}

export default function Hero() {
  const isDark = useTheme()
  const [contactOpen, setContactOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (containerRef.current) {
        const r = containerRef.current.getBoundingClientRect()
        setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top })
      }
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  const scrollToWork = () => {
    const el = document.getElementById('Case_Studies')
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 72, behavior: 'smooth' })
  }

  const bg = isDark ? '#050508' : '#fafafa'
  const tp = isDark ? '#fafafa' : '#09090b'
  const ts = isDark ? '#a1a1aa' : '#71717a'
  const tt = isDark ? '#52525b' : '#a1a1aa'
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const cardBg = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink { 0%,50% { opacity: 1; } 51%,100% { opacity: 0; } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes scrollLine { 0% { transform: scaleY(0); opacity: 0; } 50% { transform: scaleY(1); opacity: 1; } 100% { transform: scaleY(0); opacity: 0; } }
        @keyframes heroBlurIn { from { opacity: 0; filter: blur(12px); transform: translateY(24px); } to { opacity: 1; filter: blur(0); transform: translateY(0); } }
      `}</style>

      <section ref={containerRef} style={{
        position: 'relative' as const, minHeight: '100vh', background: bg, overflow: 'hidden',
        display: 'flex', alignItems: 'center', fontFamily: "'Syne', sans-serif",
      }}>
        {/* Gradient mesh blobs */}
        <div style={{ position: 'absolute' as const, inset: 0, pointerEvents: 'none' as const }}>
          {/* Primary orb */}
          <div style={{
            position: 'absolute' as const, top: '-15%', left: '50%', transform: 'translateX(-50%)',
            width: 900, height: 700, borderRadius: '50%',
            background: `radial-gradient(ellipse, ${isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)'}, transparent 70%)`,
            filter: 'blur(40px)', animation: 'float 8s ease-in-out infinite',
          }} />
          {/* Cyan accent orb */}
          <div style={{
            position: 'absolute' as const, bottom: '10%', right: '-10%',
            width: 500, height: 500, borderRadius: '50%',
            background: `radial-gradient(circle, ${isDark ? 'rgba(34,211,238,0.08)' : 'rgba(34,211,238,0.05)'}, transparent 70%)`,
            filter: 'blur(60px)', animation: 'float 10s ease-in-out infinite reverse',
          }} />
          {/* Grid */}
          <div style={{
            position: 'absolute' as const, inset: 0,
            backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)`,
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, black 30%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, black 30%, transparent 100%)',
          }} />
        </div>

        {/* Particles */}
        <Particles isDark={isDark} />

        {/* Mouse glow */}
        {mounted && <div style={{
          position: 'absolute' as const, left: mousePos.x - 250, top: mousePos.y - 250,
          width: 500, height: 500, borderRadius: '50%',
          background: `radial-gradient(circle, ${isDark ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)'}, transparent 70%)`,
          pointerEvents: 'none' as const, transition: 'left 0.15s linear, top 0.15s linear',
        }} />}

        {/* Content */}
        <div style={{ position: 'relative' as const, zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '140px 24px 80px', width: '100%' }}>
          <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' as const }}>

            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '7px 7px 7px 16px', borderRadius: 999,
              border: `1px solid ${border}`, background: cardBg,
              marginBottom: 36,
              animation: mounted ? 'heroBlurIn 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both' : 'none',
            }}>
              <span style={{ fontSize: 13, color: ts, fontWeight: 500 }}>We build production-ready software</span>
              <span style={{
                padding: '5px 12px', borderRadius: 999, fontSize: 11, fontWeight: 700,
                background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`, color: '#fff',
                boxShadow: `0 2px 12px ${ACCENT_GLOW}`,
                fontFamily: "'JetBrains Mono', monospace",
              }}>5+ shipped</span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(44px, 8vw, 80px)', fontWeight: 800, lineHeight: 1.02,
              letterSpacing: '-0.05em', margin: '0 0 24px', color: tp,
              animation: mounted ? 'heroBlurIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s both' : 'none',
            }}>
              Build software
              <br />
              <span style={{
                background: `linear-gradient(135deg, ${ACCENT}, ${CYAN}, ${ACCENT})`,
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                animation: 'gradientShift 4s ease infinite',
              }}>
                that actually ships.
              </span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: 'clamp(17px, 2.5vw, 21px)', lineHeight: 1.6, color: ts,
              maxWidth: 540, margin: '0 auto 44px', fontWeight: 400,
              fontFamily: "'Syne', sans-serif",
              animation: mounted ? 'heroBlurIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s both' : 'none',
            }}>
              We turn ideas into production-ready web applications for startups.
              Clean architecture. Fixed pricing. No excuses.
            </p>

            {/* CTAs */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap' as const,
              marginBottom: 56,
              animation: mounted ? 'heroBlurIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s both' : 'none',
            }}>
              {/* Primary — glowing gradient */}
              <button onClick={() => setContactOpen(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '15px 32px', borderRadius: 14,
                  border: 'none', cursor: 'pointer', fontFamily: "'Syne', sans-serif",
                  background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`,
                  color: '#fff', fontSize: 16, fontWeight: 700,
                  boxShadow: `0 4px 28px ${ACCENT_GLOW}, 0 0 80px rgba(34,211,238,0.1)`,
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)'
                  e.currentTarget.style.boxShadow = `0 8px 40px ${ACCENT_GLOW}, 0 0 100px rgba(34,211,238,0.15)`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = `0 4px 28px ${ACCENT_GLOW}, 0 0 80px rgba(34,211,238,0.1)`
                }}>
                Start a Project <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary — ghost with border glow */}
              <button onClick={scrollToWork}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '15px 32px', borderRadius: 14,
                  border: `1px solid ${border}`, background: 'transparent',
                  color: ts, fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: "'Syne', sans-serif",
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = isDark ? 'rgba(99,102,241,0.4)' : 'rgba(99,102,241,0.3)'
                  e.currentTarget.style.color = tp
                  e.currentTarget.style.background = isDark ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.04)'
                  e.currentTarget.style.boxShadow = `0 0 24px rgba(99,102,241,0.1)`
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = border
                  e.currentTarget.style.color = ts
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}>
                View Our Work
              </button>
            </div>

            {/* Stats row */}
            <div style={{
              display: 'inline-flex', borderRadius: 16, overflow: 'hidden',
              border: `1px solid ${border}`, background: cardBg,
              animation: mounted ? 'heroBlurIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.65s both' : 'none',
            }}>
              {[
                { v: '5+', l: 'Apps shipped' },
                { v: '3+', l: 'Years building' },
                { v: '99.9%', l: 'Uptime' },
                { v: '4–8 wk', l: 'Avg. delivery' },
              ].map((s, i) => (
                <div key={s.l} style={{
                  padding: '18px 28px',
                  borderRight: i < 3 ? `1px solid ${border}` : 'none',
                  textAlign: 'center' as const,
                }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: tp, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>{s.v}</div>
                  <div style={{ fontSize: 11, color: tt, fontWeight: 500, marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal */}
          <div style={{
            marginTop: 56,
            animation: mounted ? 'heroBlurIn 1s cubic-bezier(0.16,1,0.3,1) 0.8s both' : 'none',
          }}>
            <TerminalCode isDark={isDark} />
          </div>

          {/* Scroll indicator */}
          <div style={{
            display: 'flex', justifyContent: 'center', marginTop: 48,
            animation: mounted ? 'heroBlurIn 0.8s cubic-bezier(0.16,1,0.3,1) 1.2s both' : 'none',
          }}>
            <button onClick={scrollToWork} style={{
              display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 8,
              background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5,
            }}>
              <span style={{ fontSize: 10, color: tt, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' as const, fontFamily: "'JetBrains Mono', monospace" }}>Scroll</span>
              <div style={{
                width: 1, height: 28, background: `linear-gradient(to bottom, ${ACCENT}, transparent)`,
                transformOrigin: 'top', animation: 'scrollLine 2s ease infinite',
              }} />
            </button>
          </div>
        </div>
      </section>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}
