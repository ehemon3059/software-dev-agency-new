'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronRight, Sun, Moon } from 'lucide-react'
import ContactModal from './ContactModal'

const NAV_ITEMS = [
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'Case_Studies', label: 'Work', href: '#Case_Studies' },
  { id: 'Process', label: 'Process', href: '#Process' },
  { id: 'Pricing', label: 'Pricing', href: '#Pricing' },
  { id: 'Founders', label: 'Team', href: '#Founders' },
  { id: 'FAQ', label: 'FAQ', href: '#FAQ' },
]

const ACCENT = '#6366f1'
const ACCENT_GLOW = 'rgba(99,102,241,0.5)'
const CYAN = '#22d3ee'

function useTheme() {
  const [isDark, setIsDark] = useState(true)
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])
  return [isDark, setIsDark] as const
}

function LogoMark({ isDark }: { isDark: boolean }) {
  return (
    <div style={{
      width: 34, height: 34, borderRadius: 10,
      background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: isDark ? `0 0 20px ${ACCENT_GLOW}, 0 0 60px rgba(34,211,238,0.15)` : `0 2px 12px rgba(99,102,241,0.25)`,
      position: 'relative' as const,
      overflow: 'hidden',
    }}>
      {/* Shine sweep animation */}
      <div style={{
        position: 'absolute' as const, inset: 0,
        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)',
        animation: 'logoShine 3s ease-in-out infinite',
      }} />
      <span style={{ fontSize: 16, fontWeight: 800, color: '#fff', position: 'relative' as const, zIndex: 1, fontFamily: "'Syne', sans-serif" }}>P</span>
    </div>
  )
}

function MobileMenu({ isOpen, onClose, activeSection, onNavClick, onCTAClick, isDark, onThemeToggle }: {
  isOpen: boolean; onClose: () => void; activeSection: string; onNavClick: (h: string) => void
  onCTAClick: () => void; isDark: boolean; onThemeToggle: () => void
}) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div style={{ position: 'absolute' as const, inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }} onClick={onClose} />
      <div style={{
        position: 'absolute' as const, right: 0, top: 0, bottom: 0, width: 280,
        background: isDark ? 'rgba(10,10,15,0.95)' : 'rgba(255,255,255,0.97)',
        borderLeft: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
        backdropFilter: 'blur(20px)', animation: 'slideIn 0.25s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' as const, height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: ACCENT, fontFamily: "'JetBrains Mono', monospace" }}>MENU</span>
            <div style={{ display: 'flex', gap: 4 }}>
              <button onClick={onThemeToggle} style={{ padding: 8, borderRadius: 8, background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', border: 'none', cursor: 'pointer', color: isDark ? '#a1a1aa' : '#71717a' }}>
                {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
              <button onClick={onClose} style={{ padding: 8, borderRadius: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: isDark ? '#a1a1aa' : '#71717a' }}>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <nav style={{ flex: 1, padding: '12px 12px', display: 'flex', flexDirection: 'column' as const, gap: 2 }}>
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => { onNavClick(item.href); onClose() }}
                style={{
                  padding: '12px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: "'Syne', sans-serif",
                  fontSize: 14, fontWeight: activeSection === item.id ? 700 : 500, textAlign: 'left' as const,
                  background: activeSection === item.id ? (isDark ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.08)') : 'transparent',
                  color: activeSection === item.id ? (isDark ? '#c7d2fe' : ACCENT) : (isDark ? '#a1a1aa' : '#71717a'),
                  transition: 'all 0.15s',
                }}>
                {item.label}
              </button>
            ))}
          </nav>
          <div style={{ padding: '16px 16px', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}>
            <button onClick={() => { onCTAClick(); onClose() }}
              style={{
                width: '100%', padding: '12px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
                background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`, color: '#fff',
                fontSize: 14, fontWeight: 700, fontFamily: "'Syne', sans-serif",
                boxShadow: `0 4px 24px ${ACCENT_GLOW}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>
              Get Started <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
    </div>
  )
}

export default function Header() {
  const [isDark, setIsDark] = useTheme()
  const [scrollY, setScrollY] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const sys = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = saved === 'dark' || (!saved && sys)
    setIsDark(dark)
    document.documentElement.classList.toggle('dark', dark)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    const handle = () => {
      setScrollY(window.scrollY)
      const pos = window.scrollY + 100
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id)
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) { setActiveSection(id); break }
      }
    }
    window.addEventListener('scroll', handle); handle()
    return () => window.removeEventListener('scroll', handle)
  }, [])

  useEffect(() => {
    document.body.style.overflow = (mobileOpen || contactOpen) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen, contactOpen])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 72, behavior: 'smooth' })
  }

  const isScrolled = scrollY > 20
  const headerBg = isDark
    ? isScrolled ? 'rgba(5,5,10,0.85)' : 'rgba(5,5,10,0.5)'
    : isScrolled ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.6)'
  const borderBottom = isScrolled
    ? isDark ? `1px solid rgba(99,102,241,0.15)` : `1px solid rgba(0,0,0,0.08)`
    : `1px solid transparent`

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        @keyframes logoShine { 0%,100% { transform: translateX(-100%); } 50% { transform: translateX(100%); } }
        @keyframes glowPulse { 0%,100% { box-shadow: 0 0 20px ${ACCENT_GLOW}; } 50% { box-shadow: 0 0 32px ${ACCENT_GLOW}, 0 0 60px rgba(34,211,238,0.12); } }
      `}</style>

      <header style={{
        position: 'fixed' as const, top: 0, left: 0, right: 0, zIndex: 40,
        background: headerBg,
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom,
        boxShadow: isScrolled && isDark ? `0 1px 40px rgba(99,102,241,0.06)` : 'none',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>

          {/* Logo */}
          <button onClick={scrollToTop} aria-label="Home" style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <LogoMark isDark={isDark} />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: isDark ? '#fafafa' : '#09090b', fontFamily: "'Syne', sans-serif", letterSpacing: '-0.03em' }}>papa</span>
              <span style={{
                fontSize: 17, fontWeight: 800, fontFamily: "'Syne', sans-serif", letterSpacing: '-0.03em',
                background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>tiger</span>
              <span style={{ fontSize: 11, fontWeight: 500, color: isDark ? '#52525b' : '#a1a1aa', marginLeft: 2 }}>.tech</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="hidden md:flex">
            {NAV_ITEMS.map(item => {
              const isActive = activeSection === item.id
              const isHovered = hoveredNav === item.id
              return (
                <button key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  onMouseEnter={() => setHoveredNav(item.id)}
                  onMouseLeave={() => setHoveredNav(null)}
                  style={{
                    position: 'relative' as const,
                    padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    fontSize: 13, fontWeight: 600, fontFamily: "'Syne', sans-serif",
                    background: (isActive || isHovered) ? (isDark ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)') : 'transparent',
                    color: isActive ? (isDark ? '#c7d2fe' : ACCENT) : isHovered ? (isDark ? '#e2e8f0' : '#09090b') : (isDark ? '#71717a' : '#71717a'),
                    transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)',
                    transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
                  }}>
                  {item.label}
                  {/* Glow dot for active */}
                  {isActive && <span style={{
                    position: 'absolute' as const, bottom: 2, left: '50%', transform: 'translateX(-50%)',
                    width: 4, height: 4, borderRadius: '50%', background: ACCENT,
                    boxShadow: `0 0 8px ${ACCENT_GLOW}`,
                  }} />}
                </button>
              )
            })}

            <div style={{ width: 1, height: 20, margin: '0 8px', background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} />

            {/* Theme toggle */}
            <button onClick={() => setIsDark(d => !d)} aria-label="Toggle theme"
              style={{
                padding: 8, borderRadius: 8, border: 'none', cursor: 'pointer',
                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                color: isDark ? '#a1a1aa' : '#71717a',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'rotate(20deg)' }}
              onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'rotate(0)' }}>
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* CTA */}
            <button onClick={() => setContactOpen(true)}
              style={{
                marginLeft: 8, padding: '9px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
                background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`,
                color: '#fff', fontSize: 13, fontWeight: 700, fontFamily: "'Syne', sans-serif",
                boxShadow: `0 2px 20px ${ACCENT_GLOW}`,
                display: 'flex', alignItems: 'center', gap: 5,
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `0 4px 32px ${ACCENT_GLOW}, 0 0 60px rgba(34,211,238,0.2)`
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = `0 2px 20px ${ACCENT_GLOW}`
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
              }}>
              Get Started <ChevronRight className="w-3 h-3" />
            </button>
          </nav>

          {/* Mobile */}
          <div className="flex md:hidden" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <button onClick={() => setIsDark(d => !d)} style={{ padding: 8, borderRadius: 8, background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', border: 'none', cursor: 'pointer', color: isDark ? '#a1a1aa' : '#71717a' }}>
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={() => setMobileOpen(true)} style={{ padding: 8, borderRadius: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: isDark ? '#a1a1aa' : '#71717a' }}>
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} activeSection={activeSection} onNavClick={handleNavClick} onCTAClick={() => setContactOpen(true)} isDark={isDark} onThemeToggle={() => setIsDark(d => !d)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}
