'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ChevronRight, Sun, Moon } from 'lucide-react'
import ContactModal from './ContactModal'

const NAV_ITEMS = [
  { id: 'services',     label: 'Services',     href: '#services' },
  { id: 'Case_Studies', label: 'Case Studies', href: '#Case_Studies' },
  { id: 'Process',      label: 'Process',      href: '#Process' },
  { id: 'Pricing',      label: 'Pricing',      href: '#Pricing' },
  { id: 'FAQ',          label: 'FAQ',          href: '#FAQ' },
]

// ─── "Built Right" gradient: blue → purple (extracted from screenshot) ────────
// #4f6ef7 (vivid blue) → #c44de8 (vivid purple/magenta)
const GRADIENT   = 'linear-gradient(90deg, #4f6ef7 0%, #c44de8 100%)'
const GRAD_START = '#4f6ef7'
const GRAD_END   = '#c44de8'

// ─── Colour tokens ────────────────────────────────────────────────────────────
const TOKENS = {
  light: {
    headerBg:         'rgba(238,242,255,0.90)',
    headerBgScrolled: 'rgba(238,242,255,0.98)',
    border:           'rgba(79,110,247,0.14)',
    shadow:           '0 4px 24px rgba(79,110,247,0.09)',
    navText:          '#374151',
    navActive:        '#4f6ef7',
    logoText:         '#111827',
    logoSub:          '#9ca3af',
    menuBg:           '#eef2ff',
    divider:          'rgba(0,0,0,0.09)',
    themeBtn:         'rgba(79,110,247,0.10)',
    themeBtnText:     '#4f6ef7',
  },
  dark: {
    headerBg:         'rgba(13,17,23,0.85)',
    headerBgScrolled: 'rgba(13,17,23,0.97)',
    border:           'rgba(79,110,247,0.18)',
    shadow:           '0 8px 40px rgba(0,0,0,0.6)',
    navText:          '#94a3b8',
    navActive:        '#818cf8',
    logoText:         '#f1f5f9',
    logoSub:          '#4b5563',
    menuBg:           '#0d1117',
    divider:          'rgba(255,255,255,0.07)',
    themeBtn:         'rgba(79,110,247,0.14)',
    themeBtnText:     '#818cf8',
  },
}

// ─── Tiger Face SVG Logo — illustrated like 🐯 with blue→purple gradient ─────
function TigerFaceLogo() {
  return (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8" aria-hidden="true">
      <defs>
        <linearGradient id="faceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={GRAD_START} />
          <stop offset="100%" stopColor={GRAD_END} />
        </linearGradient>
        <linearGradient id="earGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={GRAD_START} />
          <stop offset="100%" stopColor={GRAD_END} />
        </linearGradient>
      </defs>

      {/* ── Ears ── */}
      <polygon points="7,16 3,4 14,10"  fill="url(#earGrad)" opacity="0.9" />
      <polygon points="37,16 41,4 30,10" fill="url(#earGrad)" opacity="0.9" />
      {/* Inner ear */}
      <polygon points="8,14 5,7  13,11"  fill="white" opacity="0.35" />
      <polygon points="36,14 39,7 31,11" fill="white" opacity="0.35" />

      {/* ── Main face circle ── */}
      <circle cx="22" cy="26" r="17" fill="url(#faceGrad)" />

      {/* ── Forehead stripes ── */}
      <rect x="21" y="11" width="2"   height="6" rx="1" fill="white" opacity="0.30" />
      <rect x="16" y="12" width="1.5" height="5" rx="0.75" fill="white" opacity="0.22" transform="rotate(-15 16 12)" />
      <rect x="26" y="12" width="1.5" height="5" rx="0.75" fill="white" opacity="0.22" transform="rotate(15 26 12)" />

      {/* ── Eyes ── */}
      {/* whites */}
      <ellipse cx="16.5" cy="24" rx="4"   ry="4.2" fill="white" opacity="0.95" />
      <ellipse cx="27.5" cy="24" rx="4"   ry="4.2" fill="white" opacity="0.95" />
      {/* irises — vivid blue */}
      <circle  cx="16.5" cy="24.2" r="2.6" fill="#3b5bfc" />
      <circle  cx="27.5" cy="24.2" r="2.6" fill="#3b5bfc" />
      {/* pupils */}
      <ellipse cx="16.5" cy="24.2" rx="1.1" ry="1.6" fill="#0a0a1a" />
      <ellipse cx="27.5" cy="24.2" rx="1.1" ry="1.6" fill="#0a0a1a" />
      {/* eye shine */}
      <circle  cx="17.4" cy="23"   r="0.7" fill="white" opacity="0.9" />
      <circle  cx="28.4" cy="23"   r="0.7" fill="white" opacity="0.9" />

      {/* ── Nose ── */}
      <ellipse cx="22" cy="30" rx="2.4" ry="1.6" fill="white" opacity="0.5" />
      <ellipse cx="22" cy="30" rx="1.5" ry="1"   fill="#1a1040" opacity="0.7" />

      {/* ── Mouth ── */}
      <path d="M19.5 31.5 Q22 33.5 24.5 31.5" stroke="white" strokeWidth="1.2"
        strokeLinecap="round" fill="none" opacity="0.7" />

      {/* ── Cheek whisker dots ── */}
      <circle cx="11" cy="30" r="0.9" fill="white" opacity="0.5" />
      <circle cx="13" cy="32" r="0.9" fill="white" opacity="0.5" />
      <circle cx="33" cy="30" r="0.9" fill="white" opacity="0.5" />
      <circle cx="31" cy="32" r="0.9" fill="white" opacity="0.5" />
    </svg>
  )
}

// ─── Gradient text helper span ────────────────────────────────────────────────
function GradText({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      background:         GRADIENT,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip:     'text',
    }}>
      {children}
    </span>
  )
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────
function MobileMenu({
  isOpen, onClose, activeSection, onNavClick, onCTAClick, isDarkMode, onThemeToggle,
}: {
  isOpen: boolean; onClose: () => void; activeSection: string
  onNavClick: (href: string) => void; onCTAClick: () => void
  isDarkMode: boolean; onThemeToggle: () => void
}) {
  if (!isOpen) return null
  const t = isDarkMode ? TOKENS.dark : TOKENS.light

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute right-0 top-0 bottom-0 w-72 shadow-2xl"
        style={{
          background: t.menuBg,
          borderLeft: `1px solid ${t.border}`,
          animation:  'slideInRight 0.25s cubic-bezier(0.16,1,0.3,1)',
        }}>
        <div className="flex flex-col h-full">

          {/* Panel header */}
          <div className="flex items-center justify-between p-6"
            style={{ borderBottom: `1px solid ${t.divider}` }}>
            <span className="text-xs font-bold tracking-[0.22em] uppercase"
              style={{ background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Navigate
            </span>
            <div className="flex items-center gap-2">
              <button onClick={onThemeToggle} aria-label="Toggle theme"
                className="p-2 rounded-lg" style={{ background: t.themeBtn, color: t.themeBtnText }}>
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button onClick={onClose} aria-label="Close menu"
                className="p-2 rounded-lg" style={{ color: t.logoSub }}>
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Links */}
          <nav className="flex-1 p-5 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map(item => (
              <button key={item.id}
                onClick={() => { onNavClick(item.href); onClose() }}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all"
                style={activeSection === item.id
                  ? { background: GRADIENT, color: '#fff' }
                  : { color: t.navText }}>
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="p-5" style={{ borderTop: `1px solid ${t.divider}` }}>
            <button onClick={() => { onCTAClick(); onClose() }}
              className="w-full px-6 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
              style={{
                background: GRADIENT,
                color: '#fff',
                boxShadow: '0 4px 20px rgba(79,110,247,0.45)',
              }}>
              <span>Get Free Consultation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </div>
  )
}

// ─── Main Header ──────────────────────────────────────────────────────────────
export default function Header() {
  const [scrollY,            setScrollY]            = useState(0)
  const [isMobileMenuOpen,   setIsMobileMenuOpen]   = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [activeSection,      setActiveSection]      = useState('')
  const [isDarkMode,         setIsDarkMode]         = useState(false)

  useEffect(() => {
    const saved   = localStorage.getItem('theme')
    const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark    = saved === 'dark' || (!saved && sysDark)
    setIsDarkMode(dark)
    document.documentElement.classList.toggle('dark', dark)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  useEffect(() => {
    const handle = () => {
      setScrollY(window.scrollY)
      const pos = window.scrollY + 100
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id)
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id); break
        }
      }
    }
    window.addEventListener('scroll', handle)
    handle()
    return () => window.removeEventListener('scroll', handle)
  }, [])

  useEffect(() => {
    document.body.style.overflow = (isMobileMenuOpen || isContactModalOpen) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen, isContactModalOpen])

  const scrollToTop    = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({
      top: el.getBoundingClientRect().top + window.pageYOffset - 80,
      behavior: 'smooth',
    })
  }

  const isScrolled = scrollY > 60
  const t          = isDarkMode ? TOKENS.dark : TOKENS.light

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          background:           isScrolled ? t.headerBgScrolled : t.headerBg,
          backdropFilter:       'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom:         `1px solid ${t.border}`,
          boxShadow:            isScrolled ? t.shadow : 'none',
          padding:              isScrolled ? '10px 0' : '18px 0',
        }}>
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between">

            {/* ── Logo ── */}
            <button onClick={scrollToTop} aria-label="Go to top"
              className="flex items-center gap-3 focus:outline-none group">

              {/* Tiger face badge */}
              <div className="flex items-center justify-center w-11 h-11 rounded-2xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-[-4deg]"
                style={{
                  background: isDarkMode
                    ? 'linear-gradient(135deg,rgba(79,110,247,0.18) 0%,rgba(196,77,232,0.18) 100%)'
                    : 'linear-gradient(135deg,rgba(79,110,247,0.10) 0%,rgba(196,77,232,0.10) 100%)',
                  boxShadow: isDarkMode
                    ? '0 2px 18px rgba(196,77,232,0.35)'
                    : '0 2px 14px rgba(79,110,247,0.22)',
                  border: `1.5px solid ${isDarkMode ? 'rgba(196,77,232,0.28)' : 'rgba(79,110,247,0.20)'}`,
                }}>
                <TigerFaceLogo />
              </div>

              {/* Wordmark: "papa" in normal color, "tiger" in gradient */}
              <div className="flex flex-col leading-none select-none">
                <span className="text-[18px] font-bold transition-colors"
                  style={{
                    fontFamily:    "'Georgia','Times New Roman',serif",
                    letterSpacing: '-0.015em',
                    color:         t.logoText,   // "papa" part
                  }}>
                  papa<GradText>tiger</GradText>
                </span>
                <span className="text-[9px] font-semibold tracking-[0.3em] uppercase mt-0.5"
                  style={{ color: t.logoSub }}>
                  .tech
                </span>
              </div>
            </button>

            {/* ── Desktop nav ── */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                <button key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  aria-label={`Navigate to ${item.label}`}
                  className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none"
                  style={{ color: activeSection === item.id ? t.navActive : t.navText }}>
                  {item.label}
                  {/* gradient underline for active */}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300"
                    style={{
                      width:      activeSection === item.id ? '55%' : '0%',
                      background: GRADIENT,
                    }} />
                </button>
              ))}

              {/* Divider */}
              <div className="w-px h-5 mx-1" style={{ background: t.divider }} />

              {/* Theme toggle */}
              <button onClick={() => setIsDarkMode(d => !d)} aria-label="Toggle theme"
                className="p-2.5 rounded-lg transition-all duration-200 focus:outline-none"
                style={{ background: t.themeBtn, color: t.themeBtnText }}>
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* CTA — matches the "Get a Free Consultation" button in screenshot */}
              <button
                onClick={() => setIsContactModalOpen(true)}
                aria-label="Get free consultation"
                className="ml-2 px-5 py-2.5 text-sm font-semibold rounded-xl flex items-center gap-2 transition-all duration-300 focus:outline-none group"
                style={{
                  background:   GRADIENT,
                  color:        '#fff',
                  letterSpacing:'0.03em',
                  boxShadow:    isDarkMode
                    ? '0 2px 18px rgba(79,110,247,0.45)'
                    : '0 2px 14px rgba(79,110,247,0.35)',
                }}
                onMouseEnter={e => {
                  const b = e.currentTarget as HTMLButtonElement
                  b.style.boxShadow = '0 6px 26px rgba(196,77,232,0.55)'
                  b.style.transform = 'translateY(-1px)'
                  b.style.opacity   = '0.92'
                }}
                onMouseLeave={e => {
                  const b = e.currentTarget as HTMLButtonElement
                  b.style.boxShadow = isDarkMode
                    ? '0 2px 18px rgba(79,110,247,0.45)'
                    : '0 2px 14px rgba(79,110,247,0.35)'
                  b.style.transform = 'translateY(0)'
                  b.style.opacity   = '1'
                }}>
                <span>Get Free Consultation</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </nav>

            {/* ── Mobile controls ── */}
            <div className="flex items-center gap-2 md:hidden">
              <button onClick={() => setIsDarkMode(d => !d)} aria-label="Toggle theme"
                className="p-2 rounded-lg" style={{ background: t.themeBtn, color: t.themeBtnText }}>
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu"
                className="p-2 rounded-lg" style={{ color: t.navText }}>
                <Menu className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onNavClick={handleNavClick}
        onCTAClick={() => setIsContactModalOpen(true)}
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(d => !d)}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  )
}