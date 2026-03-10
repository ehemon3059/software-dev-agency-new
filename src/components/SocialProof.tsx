'use client'

import { useState, useEffect, useRef, RefObject } from 'react'
import { motion, useInView as useFramerInView } from 'framer-motion'
import { Shield, TrendingUp, Zap } from 'lucide-react'

interface StatItem { 
  value: number
  suffix: string
  decimals?: number
  label: string
  desc: string
  emoji: string
  color: string
}

const stats: StatItem[] = [
  { value: 5, suffix: '+', label: 'Apps Unleashed', desc: 'Production beasts serving users', emoji: '🚀', color: 'from-orange-500 to-red-500' },
  { value: 3, suffix: '+', label: 'SaaS Tigers', desc: 'Multi-tenant platforms built', emoji: '🐯', color: 'from-red-500 to-orange-600' },
  { value: 2000, suffix: '+', label: 'Happy Users', desc: 'Combined across all platforms', emoji: '😊', color: 'from-orange-600 to-yellow-500' },
  { value: 99.9, suffix: '%', decimals: 1, label: 'Uptime Score', desc: 'Always hunting for bugs', emoji: '⚡', color: 'from-yellow-500 to-orange-500' },
  { value: 3, suffix: '+', label: 'Years Roaring', desc: 'Consistent delivery power', emoji: '🔥', color: 'from-red-500 to-orange-500' },
  { value: 100, suffix: '%', label: 'Code Yours', desc: 'You own everything forever', emoji: '💪', color: 'from-orange-500 to-red-600' },
]

function useTheme() {
  const [d, setD] = useState(false) // Start with false to avoid hydration mismatch
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    const c = () => setD(document.documentElement.classList.contains('dark'))
    c()
    const o = new MutationObserver(c)
    o.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => o.disconnect()
  }, [])
  
  // Return false during SSR to avoid mismatch
  if (!mounted) return false
  return d
}

function useCountUp(end: number, dur: number, start: boolean, dec: number = 0) {
  const [v, setV] = useState(0)
  const s = useRef(false)
  
  useEffect(() => {
    if (!start || s.current) return
    s.current = true
    let st: number | null = null
    
    function step(ts: number) {
      if (!st) st = ts
      const p = Math.min((ts - st) / dur, 1)
      setV((1 - Math.pow(1 - p, 3)) * end)
      if (p < 1) requestAnimationFrame(step)
      else setV(end)
    }
    
    requestAnimationFrame(step)
  }, [start, end, dur])
  
  return dec > 0 ? v.toFixed(dec) : Math.floor(v).toString()
}

function StatCard({ stat, i, anim, isDark }: { stat: StatItem; i: number; anim: boolean; isDark: boolean }) {
  const [h, setH] = useState(false)
  const val = useCountUp(stat.value, 1600 + i * 150, anim, stat.decimals || 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={anim ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: i * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        rotateZ: h ? [-1, 1, -1, 0] : 0
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className={`relative p-8 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isDark
          ? 'bg-gradient-to-br from-gray-900/50 to-gray-950/50 border-2 border-orange-500/20 hover:border-orange-500/40'
          : 'bg-white border-2 border-orange-300/60 hover:border-orange-500/80 shadow-lg'
      }`}
      style={{
        boxShadow: h
          ? isDark
            ? '0 20px 60px rgba(255, 140, 0, 0.3), 0 0 40px rgba(255, 140, 0, 0.1)'
            : '0 20px 60px rgba(255, 140, 0, 0.25), 0 8px 40px rgba(0, 0, 0, 0.12)'
          : isDark
          ? '0 4px 20px rgba(0, 0, 0, 0.3)'
          : '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Animated background glow */}
      <motion.div
        animate={h ? {
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.2, 1],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0`}
      />

      {/* Tiger stripe decoration */}
      <div className={`absolute top-0 right-0 w-20 h-20 ${isDark ? 'opacity-10' : 'opacity-8'}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M20,10 Q40,30 20,50" stroke={isDark ? "#FF8C00" : "#FF8C00"} strokeWidth="6" fill="none" opacity={isDark ? "1" : "0.4"}/>
          <path d="M40,20 Q60,45 40,70" stroke={isDark ? "#FF8C00" : "#FF8C00"} strokeWidth="8" fill="none" opacity={isDark ? "1" : "0.4"}/>
        </svg>
      </div>

      {/* Emoji icon */}
      <motion.div
        animate={h ? { 
          rotate: [0, -10, 10, -10, 0],
          scale: [1, 1.2, 1]
        } : {}}
        transition={{ duration: 0.5 }}
        className="text-5xl mb-4"
      >
        {stat.emoji}
      </motion.div>

      {/* Value with animated counter */}
      <div className="relative z-10 mb-3">
        <motion.div 
          className="text-5xl lg:text-6xl font-black tracking-tight font-['Rubik'] tabular-nums"
          animate={h ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <span className={isDark ? 'text-gray-50' : 'text-gray-900'}>
            {val}
          </span>
          <span className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
            {stat.suffix}
          </span>
        </motion.div>
      </div>

      {/* Label */}
      <div className={`text-lg font-bold mb-2 font-['Rubik'] ${
        isDark ? 'text-gray-100' : 'text-gray-900'
      }`}>
        {stat.label}
      </div>

      {/* Description */}
      <div className={`text-sm font-medium font-['Quicksand'] ${
        isDark ? 'text-gray-400' : 'text-gray-700'
      }`}>
        {stat.desc}
      </div>

      {/* Paw print decoration on hover */}
      {h && (
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute bottom-4 right-4 text-2xl opacity-20"
        >
          🐾
        </motion.div>
      )}
    </motion.div>
  )
}

export default function SocialProof() {
  const isDark = useTheme()
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const headerInView = useFramerInView(headerRef, { once: true, amount: 0.3 })
  const gridInView = useFramerInView(gridRef, { once: true, amount: 0.1 })

  return (
    <section 
      id="SocialProof" 
      className={`relative py-24 lg:py-32 overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-b from-gray-950 via-orange-950/10 to-gray-950' 
          : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'
      }`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&family=Quicksand:wght@400;500;600;700&display=swap');
      `}</style>

      {/* Animated tiger stripes background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="statsStripes" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
              <path d="M30,20 Q60,50 30,80" stroke={isDark ? "#FF8C00" : "#FF6B00"} strokeWidth="8" fill="none" opacity="0.3"/>
              <path d="M100,40 Q130,80 100,120" stroke={isDark ? "#FF8C00" : "#FF6B00"} strokeWidth="10" fill="none" opacity="0.3"/>
              <path d="M180,10 Q210,50 180,90" stroke={isDark ? "#FF8C00" : "#FF6B00"} strokeWidth="7" fill="none" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#statsStripes)" />
        </svg>
      </div>

      {/* Floating paw prints - predefined positions to avoid SSR issues */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: 100, y: 50, y2: 200, y3: 400, x2: 300, x3: 150 },
          { x: 800, y: 100, y2: 300, y3: 150, x2: 600, x3: 900 },
          { x: 400, y: 300, y2: 100, y3: 500, x2: 200, x3: 500 },
          { x: 600, y: 400, y2: 200, y3: 50, x2: 800, x3: 400 },
          { x: 200, y: 500, y2: 300, y3: 100, x2: 400, x3: 100 },
          { x: 900, y: 200, y2: 450, y3: 250, x2: 700, x3: 950 },
          { x: 300, y: 150, y2: 350, y3: 200, x2: 500, x3: 200 },
          { x: 700, y: 350, y2: 100, y3: 400, x2: 300, x3: 800 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10"
            initial={{ 
              x: pos.x,
              y: pos.y,
            }}
            animate={{
              y: [pos.y, pos.y2, pos.y3],
              x: [pos.x, pos.x2, pos.x3],
              rotate: [0, 360, 720],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            🐾
          </motion.div>
        ))}
      </div>

      {/* Gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 dark:bg-orange-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/20 dark:bg-red-500/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={headerInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-orange-300 dark:border-orange-700 bg-orange-100 dark:bg-orange-950/50 mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <TrendingUp className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </motion.div>
            <span className="text-sm font-bold text-orange-900 dark:text-orange-100 font-['Rubik']">
              Real Numbers, No BS 🎯
            </span>
          </motion.div>

          {/* Title */}
          <h2 className="text-4xl lg:text-6xl font-black mb-4 font-['Rubik'] tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className={`block ${isDark ? 'text-gray-50' : 'text-gray-900'}`}
            >
              Track Record That
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={headerInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
              className="block bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent dark:from-orange-400 dark:via-red-400 dark:to-orange-400"
            >
              ROARS! 🐯
            </motion.span>
          </h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
            className={`text-lg lg:text-xl max-w-2xl mx-auto font-['Quicksand'] font-medium ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Honest numbers from real projects. No fake metrics, no inflated stats.
            Just pure tiger power! 💪
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} i={i} anim={gridInView} isDark={isDark} />
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className={`inline-flex items-center gap-3 px-6 py-4 rounded-2xl border-2 shadow-lg ${
              isDark
                ? 'border-orange-700/50 bg-gradient-to-r from-orange-950/30 to-red-950/30'
                : 'border-orange-400/60 bg-gradient-to-r from-orange-50 to-red-50'
            }`}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Shield className="w-5 h-5 text-green-500 fill-green-500/20" />
            </motion.div>
            <span className={`text-sm font-['Quicksand'] ${
              isDark ? 'text-gray-300' : 'text-gray-800'
            }`}>
              All stats are <span className={`font-bold ${
                isDark ? 'text-orange-300' : 'text-orange-600'
              }`}>verified & real</span>. We never fake it! 🔥
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
