'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { ArrowRight, Zap } from 'lucide-react'

// Theme hook
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
  
  // Return false during SSR to avoid mismatch
  if (!mounted) return false
  return isDark
}

// Tiger Emoji 3D Object that bounces and rotates
function TigerEmoji() {
  const groupRef = useRef<THREE.Group>(null)
  const [isJumping, setIsJumping] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      // Continuous rotation
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
      
      // Bouncing animation
      const t = state.clock.getElapsedTime()
      groupRef.current.position.y = Math.abs(Math.sin(t * 2)) * 0.8 - 0.2
      
      // Slight tilt during bounce
      groupRef.current.rotation.z = Math.sin(t * 2) * 0.1
    }
  })

  return (
    <group ref={groupRef} onClick={() => setIsJumping(true)}>
      {/* Create a simple tiger face using basic shapes */}
      {/* Head */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#FF8C00" roughness={0.3} metalness={0.2} />
      </mesh>
      
      {/* Stripes */}
      {[-0.3, 0, 0.3].map((x, i) => (
        <mesh key={i} position={[x, 0.2, 0.9]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.1, 0.6, 0.05]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      ))}
      
      {/* Eyes */}
      <mesh position={[-0.3, 0.3, 0.9]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#000000" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.3, 0.3, 0.9]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#000000" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Ears */}
      <mesh position={[-0.6, 0.7, 0.2]}>
        <coneGeometry args={[0.25, 0.4, 8]} />
        <meshStandardMaterial color="#FF8C00" />
      </mesh>
      <mesh position={[0.6, 0.7, 0.2]}>
        <coneGeometry args={[0.25, 0.4, 8]} />
        <meshStandardMaterial color="#FF8C00" />
      </mesh>
      
      {/* Nose */}
      <mesh position={[0, 0, 1.05]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#FFB6C1" />
      </mesh>
    </group>
  )
}

// Floating tiger paw prints
function TigerPawPrints({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const pawPrints: Array<{
      x: number
      y: number
      vx: number
      vy: number
      rotation: number
      scale: number
      opacity: number
    }> = []

    for (let i = 0; i < 15; i++) {
      pawPrints.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        rotation: Math.random() * Math.PI * 2,
        scale: Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
      })
    }

    const drawPaw = (x: number, y: number, rotation: number, scale: number, opacity: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.scale(scale, scale)
      
      const color = isDark ? `rgba(255, 140, 0, ${opacity})` : `rgba(255, 140, 0, ${opacity * 0.7})`
      
      // Main pad
      ctx.beginPath()
      ctx.ellipse(0, 5, 8, 10, 0, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()
      
      // Toe pads
      const toes = [
        { x: -8, y: -5, w: 5, h: 6 },
        { x: -2, y: -8, w: 5, h: 6 },
        { x: 4, y: -8, w: 5, h: 6 },
        { x: 10, y: -5, w: 5, h: 6 },
      ]
      
      toes.forEach(toe => {
        ctx.beginPath()
        ctx.ellipse(toe.x, toe.y, toe.w, toe.h, 0, 0, Math.PI * 2)
        ctx.fill()
      })
      
      ctx.restore()
    }

    let frame: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      pawPrints.forEach((paw) => {
        paw.x += paw.vx
        paw.y += paw.vy
        paw.rotation += 0.002

        if (paw.x < -50) paw.x = canvas.width + 50
        if (paw.x > canvas.width + 50) paw.x = -50
        if (paw.y < -50) paw.y = canvas.height + 50
        if (paw.y > canvas.height + 50) paw.y = -50

        drawPaw(paw.x, paw.y, paw.rotation, paw.scale, paw.opacity)
      })

      frame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frame)
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

// Tiger stripe pattern background
function TigerStripes({ isDark }: { isDark: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5 dark:opacity-10">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="tigerStripes" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M20,10 Q40,30 20,50" stroke={isDark ? "#FF8C00" : "#FF6B00"} strokeWidth="8" fill="none" opacity="0.3"/>
            <path d="M60,20 Q80,45 60,70" stroke={isDark ? "#FF8C00" : "#FF6B00"} strokeWidth="10" fill="none" opacity="0.3"/>
            <path d="M110,5 Q130,35 110,65" stroke={isDark ? "#FF8C00" : "#FF6B00"} strokeWidth="7" fill="none" opacity="0.3"/>
            <path d="M160,30 Q180,60 160,90" stroke={isDark ? "#FF8C00" : "#FF6B00"} strokeWidth="9" fill="none" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tigerStripes)" />
      </svg>
    </div>
  )
}

export default function Hero() {
  const isDark = useTheme()
  const [mounted, setMounted] = useState(false)
  const [tigerRoar, setTigerRoar] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  
  // Mouse parallax effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const yMouse = useSpring(mouseY, springConfig)

  useEffect(() => {
    setMounted(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouseX.set((clientX - innerWidth / 2) / 50)
      mouseY.set((clientY - innerHeight / 2) / 50)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Headline words with tiger theme
  const headline = {
    top: "🐯 Build Software",
    bottom: "That ROARS 🔥"
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-950 dark:via-orange-950/20 dark:to-gray-950">
      {/* Background layers */}
      <TigerStripes isDark={isDark} />
      <TigerPawPrints isDark={isDark} />
      
      {/* Animated gradient orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 dark:bg-orange-500/10 rounded-full blur-3xl" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 dark:bg-yellow-500/10 rounded-full blur-3xl" 
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ x, y: yMouse }}
            className="space-y-8"
          >
            {/* Badge with bounce animation */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={mounted ? { scale: 1 } : {}}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: 0.2 
              }}
              className="inline-flex"
            >
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-orange-300 dark:border-orange-700 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-950/50 dark:to-yellow-950/50 backdrop-blur-sm shadow-lg"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400 fill-orange-600 dark:fill-orange-400" />
                </motion.div>
                <span className="text-sm font-bold text-orange-900 dark:text-orange-100 font-['Caveat']">
                  Powered by PapaTiger 🐅
                </span>
              </motion.div>
            </motion.div>

            {/* Headline with explosive animation */}
            <div className="space-y-2">
              <motion.h1
                className="text-6xl lg:text-8xl font-black leading-[0.95] tracking-tighter font-['Rubik']"
                onMouseEnter={() => setTigerRoar(true)}
                onMouseLeave={() => setTigerRoar(false)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={mounted ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
                >
                  <span className="inline-block text-gray-900 dark:text-gray-50">
                    {headline.top.split(' ').map((word, i) => (
                      <motion.span
                        key={i}
                        className="inline-block mr-4"
                        initial={{ opacity: 0, y: 50 }}
                        animate={mounted ? { 
                          opacity: 1, 
                          y: 0,
                          rotate: tigerRoar ? [0, -5, 5, -5, 0] : 0
                        } : {}}
                        transition={{ 
                          delay: 0.4 + i * 0.1,
                          duration: 0.6,
                          rotate: { duration: 0.5 }
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={mounted ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.7, type: "spring", stiffness: 150 }}
                >
                  <motion.span
                    className="inline-block bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent dark:from-orange-400 dark:via-red-400 dark:to-orange-400"
                    animate={tigerRoar ? {
                      scale: [1, 1.1, 1],
                      textShadow: [
                        "0 0 0px rgba(255,140,0,0)",
                        "0 0 20px rgba(255,140,0,0.8)",
                        "0 0 0px rgba(255,140,0,0)"
                      ]
                    } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    {headline.bottom}
                  </motion.span>
                </motion.div>
              </motion.h1>
            </div>

            {/* Description with typewriter effect */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={mounted ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1 }}
              className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-xl leading-relaxed font-['Quicksand'] font-medium"
            >
              We don't just build apps—we unleash digital beasts! 🚀 
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block ml-1"
              >
                ⚡
              </motion.span>
            </motion.p>

            {/* CTA Buttons with wild animations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap items-center gap-4"
            >
              {/* Primary CTA - Pulsating tiger button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(255,140,0,0.3)",
                    "0 0 40px rgba(255,140,0,0.6)",
                    "0 0 20px rgba(255,140,0,0.3)"
                  ]
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity }
                }}
                className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white font-bold text-lg overflow-hidden shadow-2xl font-['Rubik']"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: "200% 200%" }}
                />
                <span className="relative flex items-center gap-2">
                  🐯 Unleash Your Project
                  <motion.div
                    animate={{ 
                      x: [0, 5, 0],
                      rotate: [0, 10, 0]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
              </motion.button>

              {/* Secondary CTA */}
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "#FF8C00",
                  backgroundColor: "rgba(255, 140, 0, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 rounded-2xl border-3 border-orange-300 dark:border-orange-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 font-bold text-lg transition-all duration-300 font-['Rubik']"
              >
                <span className="flex items-center gap-2">
                  See Our Claws 🔥
                </span>
              </motion.button>
            </motion.div>

            {/* Stats with counter animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t-2 border-orange-200 dark:border-orange-900/50"
            >
              {[
                { value: '50+', label: 'Tigers Unleashed', emoji: '🐅' },
                { value: '99%', label: 'Roar Rate', emoji: '📈' },
                { value: '24/7', label: 'Hunt Mode', emoji: '🌙' },
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="space-y-1"
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent dark:from-orange-400 dark:to-red-400 font-['Rubik'] tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold font-['Quicksand'] flex items-center gap-1">
                    <span>{stat.emoji}</span> {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - 3D Tiger Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
            animate={mounted ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.5, type: "spring", stiffness: 80 }}
            className="relative h-[500px] lg:h-[700px]"
          >
            {/* Pulsating glow effect */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-br from-orange-500/40 via-red-500/30 to-yellow-500/40 dark:from-orange-500/30 dark:via-red-500/20 dark:to-yellow-500/30 rounded-3xl blur-3xl" 
            />
            
            {/* 3D Canvas */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative h-full rounded-3xl overflow-hidden border-4 border-orange-300 dark:border-orange-700 bg-gradient-to-br from-orange-100 via-yellow-100 to-amber-100 dark:from-gray-900 dark:via-orange-950/30 dark:to-gray-950 shadow-2xl cursor-pointer"
            >
              <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="text-8xl"
                  >
                    🐯
                  </motion.div>
                </div>
              }>
                <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[10, 10, 5]} intensity={1.5} />
                  <pointLight position={[-10, -10, -5]} intensity={1} color="#FF8C00" />
                  <pointLight position={[10, -10, 5]} intensity={0.8} color="#FFD700" />
                  <TigerEmoji />
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={false}
                  />
                </Canvas>
              </Suspense>
            </motion.div>

            {/* Floating tiger emojis - only render after mount to avoid hydration mismatch */}
            {mounted && [...Array(5)].map((_, i) => {
              // Use consistent seed-based positions instead of Math.random()
              const positions = [
                { x: 150, y: -200, x2: -50, y2: 100, x3: 180, y3: -150 },
                { x: -120, y: 180, x2: 80, y2: -100, x3: -140, y3: 220 },
                { x: 80, y: -100, x2: -180, y2: 150, x3: 120, y3: -80 },
                { x: -160, y: 50, x2: 140, y2: -180, x3: -100, y3: 100 },
                { x: 100, y: 220, x2: -90, y2: -50, x3: 150, y3: 180 },
              ]
              const pos = positions[i]
              
              return (
                <motion.div
                  key={i}
                  className="absolute text-6xl pointer-events-none"
                  initial={{ 
                    x: pos.x,
                    y: pos.y,
                    opacity: 0
                  }}
                  animate={{
                    y: [pos.y, pos.y2, pos.y3],
                    x: [pos.x, pos.x2, pos.x3],
                    opacity: [0, 0.6, 0],
                    rotate: [0, 360, 720]
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    delay: i * 1.5,
                    ease: "easeInOut"
                  }}
                >
                  {['🐯', '⚡', '🔥', '💪', '🚀'][i]}
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Scroll indicator with tiger paw */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-4xl"
          >
            🐾
          </motion.div>
          <span className="text-xs uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold font-['Rubik']">
            Keep Scrolling
          </span>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&family=Quicksand:wght@400;500;600;700&family=Caveat:wght@700&display=swap');
      `}</style>
    </section>
  )
}
