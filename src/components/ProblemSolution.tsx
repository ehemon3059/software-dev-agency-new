'use client'

import { useState, useEffect, useRef, RefObject } from 'react'
import { motion, useInView as useFramerInView } from 'framer-motion'
import { AlertCircle, CheckCircle2, Flame, Zap } from 'lucide-react'

const problems = [
  { 
    id: 'broken', 
    num: '01', 
    emoji: '💥',
    title: 'Stuck with Broken Software', 
    problem: "Your current system is buggy, slow, or built by developers who vanished. Every fix creates new problems. It's a nightmare!", 
    solution: "We audit your codebase, hunt down bugs like prey, optimize performance, and document everything — so you're never stuck again! 🎯" 
  },
  { 
    id: 'mvp', 
    num: '02', 
    emoji: '⚡',
    title: 'Need an MVP Fast (But Right)', 
    problem: "You have funding and a deadline. You need a working product in 4–8 weeks, but can't afford technical debt that'll bite you later.", 
    solution: "We build production-ready MVPs with clean architecture — ready to scale when you grow, not crumble under pressure. Lightning fast! ⚡" 
  },
  { 
    id: 'legacy', 
    num: '03', 
    emoji: '🦴',
    title: 'Outdated Legacy Systems', 
    problem: "Your PHP/WordPress site is holding you back. It's slow, insecure, and impossible to add new features. Time to evolve!", 
    solution: "We modernize legacy systems with cutting-edge frameworks — keeping your data, improving everything else. Out with the old! 🚀" 
  },
]

function useTheme() {
  const [d, setD] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    const c = () => setD(document.documentElement.classList.contains('dark'))
    c()
    const o = new MutationObserver(c)
    o.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => o.disconnect()
  }, [])
  
  if (!mounted) return false
  return d
}

function Card({ item, i, anim, isDark }: { item: typeof problems[0]; i: number; anim: boolean; isDark: boolean }) {
  const [h, setH] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      animate={anim ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: i * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        rotateZ: h ? [0, -1, 1, -1, 0] : 0 
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className={`relative p-8 rounded-2xl overflow-hidden cursor-pointer ${
        isDark
          ? 'bg-gradient-to-br from-gray-900/60 to-gray-950/60 border-2 border-orange-500/30 hover:border-orange-500/60'
          : 'bg-white border-2 border-orange-300/60 hover:border-orange-500'
      }`}
      style={{
        boxShadow: h
          ? isDark
            ? '0 20px 60px rgba(255, 140, 0, 0.3), 0 0 40px rgba(255, 140, 0, 0.15)'
            : '0 20px 60px rgba(255, 140, 0, 0.25), 0 8px 40px rgba(0, 0, 0, 0.12)'
          : isDark
          ? '0 4px 20px rgba(0, 0, 0, 0.4)'
          : '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Animated gradient top bar */}
      <motion.div
        animate={h ? {
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        } : {}}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500"
        style={{
          backgroundSize: '200% 200%',
          opacity: h ? 1 : 0,
        }}
      />

      {/* Tiger paw decoration */}
      <motion.div
        animate={h ? { 
          rotate: [0, -10, 10, -10, 0],
          scale: [1, 1.2, 1]
        } : {}}
        transition={{ duration: 0.6 }}
        className="absolute top-4 right-4 text-4xl opacity-10"
      >
        🐾
      </motion.div>

      {/* Number badge */}
      <div className="flex items-center justify-between mb-6">
        <motion.div
          animate={h ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.3 }}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
            isDark 
              ? 'bg-orange-500/20 border border-orange-500/30' 
              : 'bg-orange-100 border border-orange-300'
          }`}
        >
          <span className="text-2xl">{item.emoji}</span>
          <span className={`text-xs font-black font-['Rubik'] tracking-wider ${
            isDark ? 'text-orange-300' : 'text-orange-700'
          }`}>
            {item.num}
          </span>
        </motion.div>
      </div>

      {/* Title */}
      <h3 className={`text-2xl font-black mb-6 font-['Rubik'] tracking-tight ${
        isDark ? 'text-gray-50' : 'text-gray-900'
      }`}>
        {item.title}
      </h3>

      {/* Problem Section */}
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-2">
          <motion.div
            animate={h ? { 
              scale: [1, 1.2, 1],
            } : {}}
            transition={{ duration: 0.5, repeat: h ? Infinity : 0, repeatDelay: 1 }}
          >
            <AlertCircle className={`w-5 h-5 flex-shrink-0 ${
              isDark ? 'text-red-400' : 'text-red-600'
            }`} />
          </motion.div>
          <div>
            <div className={`text-xs font-bold mb-1 font-['Rubik'] uppercase tracking-wider ${
              isDark ? 'text-red-400' : 'text-red-600'
            }`}>
              The Problem 😤
            </div>
            <p className={`text-sm leading-relaxed font-['Quicksand'] font-medium ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {item.problem}
            </p>
          </div>
        </div>
      </div>

      {/* Divider with tiger stripes */}
      <div className="relative h-px my-6">
        <div className={`absolute inset-0 ${
          isDark ? 'bg-gray-700' : 'bg-gray-200'
        }`} />
        <motion.div
          animate={h ? {
            scaleX: [0, 1],
          } : { scaleX: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 origin-left"
        />
      </div>

      {/* Solution Section */}
      <div>
        <div className="flex items-start gap-3">
          <motion.div
            animate={h ? { 
              rotate: [0, 360],
            } : {}}
            transition={{ duration: 0.6 }}
          >
            <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${
              isDark ? 'text-green-400 fill-green-400/20' : 'text-green-600 fill-green-600/20'
            }`} />
          </motion.div>
          <div>
            <div className={`text-xs font-bold mb-1 font-['Rubik'] uppercase tracking-wider ${
              isDark ? 'text-green-400' : 'text-green-600'
            }`}>
              Our Solution 💪
            </div>
            <p className={`text-sm leading-relaxed font-['Quicksand'] font-medium ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {item.solution}
            </p>
          </div>
        </div>
      </div>

      {/* Hover effect - glowing paw */}
      {h && (
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute bottom-4 right-4 text-3xl opacity-20"
        >
          🐯
        </motion.div>
      )}
    </motion.div>
  )
}

export default function ProblemSolution() {
  const isDark = useTheme()
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const headerInView = useFramerInView(headerRef, { once: true, amount: 0.3 })
  const gridInView = useFramerInView(gridRef, { once: true, amount: 0.1 })

  return (
    <section 
      id="ProblemSolution" 
      className={`relative py-24 lg:py-32 overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-b from-gray-950 via-red-950/10 to-gray-950' 
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
            <pattern id="problemStripes" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
              <path d="M50,30 Q80,70 50,110" stroke={isDark ? "#FF8C00" : "#FF6B00"} strokeWidth="10" fill="none" opacity="0.3"/>
              <path d="M150,60 Q180,110 150,160" stroke={isDark ? "#FF8C00" : "#FF6B00"} strokeWidth="12" fill="none" opacity="0.3"/>
              <path d="M280,20 Q310,70 280,120" stroke={isDark ? "#FF8C00" : "#FF6B00"} strokeWidth="9" fill="none" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#problemStripes)" />
        </svg>
      </div>

      {/* Floating problem/solution icons - predefined positions */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: 150, y: 100, y2: 300, y3: 500, x2: 350, x3: 200, emoji: '💥' },
          { x: 700, y: 200, y2: 450, y3: 150, x2: 550, x3: 850, emoji: '⚡' },
          { x: 300, y: 400, y2: 150, y3: 600, x2: 150, x3: 450, emoji: '🎯' },
          { x: 850, y: 150, y2: 350, y3: 100, x2: 700, x3: 950, emoji: '🚀' },
          { x: 450, y: 600, y2: 300, y3: 150, x2: 600, x3: 350, emoji: '💪' },
          { x: 200, y: 250, y2: 550, y3: 350, x2: 400, x3: 150, emoji: '🔥' },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-5"
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
              duration: 25 + i * 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {pos.emoji}
          </motion.div>
        ))}
      </div>

      {/* Gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/20 dark:bg-red-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-500/20 dark:bg-orange-500/10 rounded-full blur-3xl"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-red-300 dark:border-red-700 bg-red-100 dark:bg-red-950/50 mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
            </motion.div>
            <span className="text-sm font-bold text-red-900 dark:text-red-100 font-['Rubik']">
              Sound Familiar? 🤔
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
              Problems We
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={headerInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
              className="block bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent dark:from-red-400 dark:via-orange-400 dark:to-red-400"
            >
              DEMOLISH! 💥
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
            Three challenges we see most — and exactly how we crush them with tiger strength! 🐯
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {problems.map((p, i) => (
            <Card key={p.id} item={p} i={i} anim={gridInView} isDark={isDark} />
          ))}
        </div>

        {/* Bottom CTA */}
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
                rotate: [0, 15, -15, 15, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Flame className="w-5 h-5 text-orange-500 fill-orange-500/30" />
            </motion.div>
            <span className={`text-sm font-['Quicksand'] font-semibold ${
              isDark ? 'text-gray-200' : 'text-gray-800'
            }`}>
              Got a problem? <span className={`font-bold ${
                isDark ? 'text-orange-300' : 'text-orange-600'
              }`}>We've got the claws</span> to fix it! 🐾
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
