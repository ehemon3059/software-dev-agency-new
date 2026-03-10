'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ChevronRight, Sun, Moon, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ContactModal from './ContactModal'

// const NAV_ITEMS = [

//   { id: 'SocialProof', label: 'Trust', href: '#SocialProof', emoji: '⭐' },
//   { id: 'ProblemSolution', label: 'Solutions', href: '#ProblemSolution', emoji: '💡' },
//   { id: 'CaseStudies', label: 'Work', href: '#CaseStudies', emoji: '🎨' },
//   { id: 'ProcessSection', label: 'Process', href: '#ProcessSection', emoji: '🔧' },
//   { id: 'TechStack', label: 'Tech', href: '#TechStack', emoji: '⚡' },
//   { id: 'Testimonials', label: 'Reviews', href: '#Testimonials', emoji: '💬' },
//   { id: 'Founders', label: 'Team', href: '#Founders', emoji: '👥' },
//   { id: 'Pricing', label: 'Pricing', href: '#Pricing', emoji: '💰' },
//   { id: 'FAQ', label: 'FAQ', href: '#FAQ', emoji: '❓' },
// ]

const NAV_ITEMS = [
  { id: 'CaseStudies', label: 'Work', href: '#CaseStudies', emoji: '🎨' },
  { id: 'ProblemSolution', label: 'Solutions', href: '#ProblemSolution', emoji: '💡' },
  { id: 'ProcessSection', label: 'Process', href: '#ProcessSection', emoji: '🔧' },
  { id: 'Founders', label: 'Team', href: '#Founders', emoji: '👥' },
  { id: 'Pricing', label: 'Pricing', href: '#Pricing', emoji: '💰' },
]

function useTheme() {
  const [isDark, setIsDark] = useState(false) // Start with false to avoid hydration mismatch
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    const check = () => setIsDark(document.documentElement.classList.contains('dark'))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])
  
  // Return [false, setIsDark] during SSR to avoid mismatch
  if (!mounted) return [false, setIsDark] as const
  return [isDark, setIsDark] as const
}

// Tiger logo mark with stripes
function TigerLogo({ isDark }: { isDark: boolean }) {
  return (
    <motion.div
      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
      transition={{ duration: 0.5 }}
      className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 flex items-center justify-center shadow-lg overflow-hidden"
      style={{
        boxShadow: isDark
          ? '0 0 20px rgba(255, 140, 0, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)'
          : '0 0 15px rgba(255, 140, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Tiger stripes */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute w-1 h-full bg-black left-2 transform -rotate-12" />
        <div className="absolute w-1 h-full bg-black right-2 transform rotate-12" />
      </div>
      
      {/* Animated glow pulse */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 bg-gradient-to-tr from-yellow-400/20 to-orange-400/20"
      />
      
      <span className="relative z-10 text-xl font-black text-white font-['Rubik']">🐯</span>
    </motion.div>
  )
}

// Mobile menu with tiger theme
function MobileMenu({ isOpen, onClose, activeSection, onNavClick, onCTAClick, isDark, onThemeToggle }: {
  isOpen: boolean; onClose: () => void; activeSection: string; onNavClick: (h: string) => void
  onCTAClick: () => void; isDark: boolean; onThemeToggle: () => void
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md md:hidden"
            onClick={onClose}
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-80 z-50 md:hidden"
            style={{
              background: isDark
                ? 'linear-gradient(to bottom, rgba(20, 20, 25, 0.98), rgba(10, 10, 15, 0.98))'
                : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.98), rgba(250, 250, 250, 0.98))',
              backdropFilter: 'blur(20px)',
              borderLeft: isDark ? '2px solid rgba(255, 140, 0, 0.2)' : '2px solid rgba(255, 140, 0, 0.15)',
            }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-orange-500/20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="flex items-center gap-2"
                >
                  <Zap className="w-5 h-5 text-orange-500 fill-orange-500" />
                  <span className="text-sm font-bold text-orange-500 font-['Rubik'] uppercase tracking-wider">
                    Menu
                  </span>
                </motion.div>
                
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onThemeToggle}
                    className="p-2 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 transition-colors"
                  >
                    {isDark ? (
                      <Sun className="w-4 h-4 text-orange-400" />
                    ) : (
                      <Moon className="w-4 h-4 text-orange-600" />
                    )}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-orange-500/10 transition-colors"
                  >
                    <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                  </motion.button>
                </div>
              </div>
              
              {/* Nav Items */}
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {NAV_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { onNavClick(item.href); onClose() }}
                    className={`w-full p-4 rounded-xl text-left font-['Rubik'] font-semibold text-base transition-all ${
                      activeSection === item.id
                        ? isDark
                          ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border-2 border-orange-500/30'
                          : 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border-2 border-orange-300'
                        : isDark
                        ? 'bg-gray-800/30 text-gray-300 hover:bg-gray-800/50 border-2 border-transparent'
                        : 'bg-gray-100/50 text-gray-700 hover:bg-gray-200/70 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.emoji}</span>
                      {item.label}
                    </div>
                  </motion.button>
                ))}
              </nav>
              
              {/* CTA */}
              <div className="p-6 border-t border-orange-500/20">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { onCTAClick(); onClose() }}
                  className="w-full p-4 rounded-xl bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white font-bold text-base font-['Rubik'] shadow-lg flex items-center justify-center gap-2"
                  style={{
                    boxShadow: '0 4px 20px rgba(255, 140, 0, 0.4)',
                  }}
                >
                  🐯 Get Started
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
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
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) { 
          setActiveSection(id)
          break 
        }
      }
    }
    window.addEventListener('scroll', handle)
    handle()
    return () => window.removeEventListener('scroll', handle)
  }, [])

  useEffect(() => {
    document.body.style.overflow = (mobileOpen || contactOpen) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen, contactOpen])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' })
  }

  const isScrolled = scrollY > 20

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&family=Quicksand:wght@400;500;600;700&display=swap');
      `}</style>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? isDark
              ? 'bg-gray-950/90 border-b-2 border-orange-500/30 shadow-lg shadow-orange-500/10'
              : 'bg-white/90 border-b-2 border-orange-300/50 shadow-lg shadow-orange-500/5'
            : 'bg-transparent border-b-2 border-transparent'
        }`}
        style={{
          backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(10px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
          
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-transparent border-none cursor-pointer"
            >
              <TigerLogo isDark={isDark} />
              
              <div className="flex items-baseline gap-0.5">
                {/* UPDATE THIS SPAN BELOW */}
                <span className={`text-xl font-black font-['Rubik'] tracking-tight transition-colors duration-300 ${
                  isScrolled && !isDark ? 'text-gray-700' : 'text-white'
                }`}>
                  papa
                </span>
                {/* The rest remains the same */}
                <span className="text-xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent dark:from-orange-400 dark:via-red-400 dark:to-orange-400 font-['Rubik'] tracking-tight">
                  tiger
                </span>
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 ml-0.5">
                  .tech
                </span>
              </div>


            </motion.button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id
                const isHovered = hoveredNav === item.id
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.href)}
                    onMouseEnter={() => setHoveredNav(item.id)}
                    onMouseLeave={() => setHoveredNav(null)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-4 py-2 rounded-lg font-['Rubik'] font-semibold text-sm transition-all ${
                      isActive
                        ? isDark
                          ? 'text-orange-300'
                          : 'text-orange-600'
                        : isDark
                        ? 'text-gray-400 hover:text-gray-200'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      <span className="text-base">{item.emoji}</span>
                      {item.label}
                    </span>
                    
                    {/* Active/hover background */}
                    {(isActive || isHovered) && (
                      <motion.div
                        layoutId="navPill"
                        className={`absolute inset-0 rounded-lg ${
                          isActive
                            ? isDark
                              ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20'
                              : 'bg-gradient-to-r from-orange-100 to-red-100'
                            : isDark
                            ? 'bg-gray-800/40'
                            : 'bg-gray-100/60'
                        }`}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    
                    {/* Active indicator paw */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
                      >
                        <span className="text-xs">🐾</span>
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}

              {/* Divider */}
              <div className={`w-px h-6 mx-2 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`} />

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsDark((d) => !d)}
                className={`p-2.5 rounded-lg transition-colors ${
                  isDark
                    ? 'bg-gray-800/60 hover:bg-gray-800 text-orange-400'
                    : 'bg-gray-100 hover:bg-gray-200 text-orange-600'
                }`}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.button>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setContactOpen(true)}
                className="ml-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white font-bold text-sm font-['Rubik'] shadow-lg flex items-center gap-2"
                style={{
                  boxShadow: isDark
                    ? '0 4px 20px rgba(255, 140, 0, 0.4), 0 0 40px rgba(255, 140, 0, 0.1)'
                    : '0 4px 20px rgba(255, 140, 0, 0.3)',
                }}
              >
                🔥 Get Started
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsDark((d) => !d)}
                className={`p-2 rounded-lg ${
                  isDark ? 'bg-gray-800/60 text-orange-400' : 'bg-gray-100 text-orange-600'
                }`}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileOpen(true)}
                className={`p-2 rounded-lg ${
                  isDark ? 'text-gray-400 hover:text-orange-400' : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeSection={activeSection}
        onNavClick={handleNavClick}
        onCTAClick={() => setContactOpen(true)}
        isDark={isDark}
        onThemeToggle={() => setIsDark((d) => !d)}
      />
      
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}
