'use client'

import { 
  Code2, 
  RefreshCw, 
  Cpu, 
  Cloud, 
  Monitor, 
  Zap, 
  CheckCircle,
  Clock
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

// Animated geometric grid background
function GeometricGrid({ isDarkMode }: { isDarkMode: boolean }) {
  const canvasRef = useRef(null)
  const animationRef = useRef<number | null>(null)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create grid points
    const gridSize = 60
    const dots: { baseX: number; baseY: number; phase: number }[] = []
    
    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        dots.push({
          baseX: x,
          baseY: y,
          phase: Math.random() * Math.PI * 2
        })
      }
    }

    function animate() {
      if (!ctx) return
      
      timeRef.current += 0.02
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Use different colors for dark mode
      const dotColor = isDarkMode ? '96, 165, 250' : '59, 130, 246' // blue-400 for dark, blue-500 for light
      const lineColor = isDarkMode ? '96, 165, 250' : '59, 130, 246'

      // Draw dots with floating animation
      dots.forEach((dot) => {
        const offsetX = Math.sin(timeRef.current + dot.phase) * 3
        const offsetY = Math.cos(timeRef.current * 0.8 + dot.phase) * 3
        const opacity = 0.15 + Math.sin(timeRef.current * 0.5 + dot.phase) * 0.1

        ctx.fillStyle = `rgba(${dotColor}, ${opacity})`
        ctx.beginPath()
        ctx.arc(dot.baseX + offsetX, dot.baseY + offsetY, 2, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw connecting lines
      dots.forEach((dot1, i) => {
        dots.slice(i + 1).forEach((dot2) => {
          const dx = dot1.baseX - dot2.baseX
          const dy = dot1.baseY - dot2.baseY
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < gridSize * 1.5) {
            const opacity = (0.08 * (1 - distance / (gridSize * 1.5))) * 
                          (1 + Math.sin(timeRef.current * 0.3) * 0.3)
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            
            const offset1X = Math.sin(timeRef.current + dot1.phase) * 3
            const offset1Y = Math.cos(timeRef.current * 0.8 + dot1.phase) * 3
            const offset2X = Math.sin(timeRef.current + dot2.phase) * 3
            const offset2Y = Math.cos(timeRef.current * 0.8 + dot2.phase) * 3
            
            ctx.moveTo(dot1.baseX + offset1X, dot1.baseY + offset1Y)
            ctx.lineTo(dot2.baseX + offset2X, dot2.baseY + offset2Y)
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isDarkMode])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

export default function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    // Check for dark mode on mount and when it changes
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark')
      setIsDarkMode(isDark)
    }

    // Initial check
    checkDarkMode()

    // Create an observer to watch for class changes on html element
    const themeObserver = new MutationObserver(checkDarkMode)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
      themeObserver.disconnect()
    }
  }, [])

  const primaryServices = [
    {
      icon: Code2,
      title: "Custom Web Application Development",
      bulletPoints: [
        "Full-stack web applications built from scratch",
        "Business dashboards and internal tools",
        "SaaS platforms and multi-user systems",
        "Database-driven applications with role-based access"
      ],
      outcome: "A production-ready system that works reliably from day one and scales with your business.",
      timeline: "4-12 weeks",
      color: "blue",
      techStack: ["React", "Next.js", "Node.js", "PostgreSQL"]
    },
    {
      icon: RefreshCw,
      title: "Existing Application Fix & Upgrade",
      bulletPoints: [
        "Bug fixing and performance optimization",
        "Legacy system modernization (PHP, WordPress, old frameworks)",
        "Security improvements and code audits",
        "Feature upgrades and technical debt cleanup"
      ],
      outcome: "Your existing system runs faster, more securely, and is maintainable for the long term.",
      timeline: "2-8 weeks",
      color: "green",
      techStack: ["Code Audit", "Security Updates", "Performance Optimization", "Documentation"]
    }
  ]

  const secondaryServices = [
    {
      icon: Cpu,
      title: "API Development",
      description: "RESTful APIs, authentication, database integration",
      color: "purple"
    },
    {
      icon: Cloud,
      title: "Deployment & DevOps",
      description: "VPS setup, Docker, cloud deployment, CI/CD",
      color: "blue"
    },
    {
      icon: Monitor,
      title: "Desktop Applications",
      description: "Cross-platform apps using Electron.js",
      color: "amber"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className={`py-20 transition-colors duration-300 relative overflow-hidden ${
        isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
      }`} 
      id="services"
    >
      {/* Animated geometric grid background */}
      {isVisible && <GeometricGrid isDarkMode={isDarkMode} />}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            What We Do Best
          </h2>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}>
            Professional software solutions tailored to your business needs
          </p>
        </div>

        {/* Primary Services - Side by Side Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {primaryServices.map((service, index) => (
            <div 
              key={index}
              className={`rounded-xl p-8 transition-all duration-300 ${
                isDarkMode
                  ? 'bg-slate-800 border border-slate-700 hover:border-slate-600 hover:shadow-lg hover:shadow-slate-900/50'
                  : 'bg-white border border-gray-200 hover:shadow-lg hover:border-gray-300'
              }`}
            >
              {/* Icon and Title */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-14 h-14 ${getColorClass(service.color, isDarkMode).bg} rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300`}>
                  <service.icon className={`w-7 h-7 ${getColorClass(service.color, isDarkMode).text}`} />
                </div>
                <div>
                  <h3 className={`text-xl md:text-2xl font-bold mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {service.title}
                  </h3>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-slate-700 text-slate-300'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    <Zap className="w-4 h-4" />
                    <span>Primary Service</span>
                  </div>
                </div>
              </div>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.techStack.map((tech, idx) => (
                  <span 
                    key={idx}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                      isDarkMode
                        ? 'bg-slate-700 text-slate-300'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* What You Get */}
              <div className="mb-6">
                <h4 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  What You Get:
                </h4>
                <ul className="space-y-3">
                  {service.bulletPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                        isDarkMode ? 'text-green-400' : 'text-green-500'
                      }`} />
                      <span className={`transition-colors duration-300 ${
                        isDarkMode ? 'text-slate-300' : 'text-gray-700'
                      }`}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcome and Timeline */}
              <div className={`pt-6 border-t transition-colors duration-300 ${
                isDarkMode ? 'border-slate-700' : 'border-gray-200'
              }`}>
                <p className={`mb-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-300' : 'text-gray-800'
                }`}>
                  <strong className="font-semibold">Outcome:</strong> {service.outcome}
                </p>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                  isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
                }`}>
                  <Clock className={`w-4 h-4 transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-600'
                  }`} />
                  <span className={`font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-300' : 'text-gray-700'
                  }`}>
                    Timeline: {service.timeline}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Services */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              We Also Provide
            </h3>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? 'text-slate-400' : 'text-gray-600'
            }`}>
              Additional specialized services to complement your project
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {secondaryServices.map((service, index) => (
              <div 
                key={index} 
                className={`group p-6 rounded-xl transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-slate-800 border border-slate-700 hover:border-slate-600 hover:shadow-md hover:shadow-slate-900/50'
                    : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className={`w-12 h-12 ${getColorClass(service.color, isDarkMode).bg} rounded-lg flex items-center justify-center mb-4 transition-colors duration-300`}>
                  <service.icon className={`w-6 h-6 ${getColorClass(service.color, isDarkMode).text}`} />
                </div>
                <h4 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {service.title}
                </h4>
                <p className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Statement */}
        <div className="text-center">
          <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-xl transition-colors duration-300 ${
            isDarkMode
              ? 'bg-slate-800 border border-slate-700'
              : 'bg-white border border-gray-200'
          }`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
              isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
            }`}>
              <Zap className={`w-6 h-6 transition-colors duration-300 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`} />
            </div>
            <p className={`text-lg transition-colors duration-300 ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>
              <strong className="font-semibold">We don't just write code</strong> — we solve business problems with software.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Helper function for color classes with dark mode support
function getColorClass(color: string, isDarkMode: boolean) {
  if (isDarkMode) {
    switch (color) {
      case 'blue':
        return { bg: 'bg-blue-900/50', text: 'text-blue-400' }
      case 'green':
        return { bg: 'bg-green-900/50', text: 'text-green-400' }
      case 'purple':
        return { bg: 'bg-purple-900/50', text: 'text-purple-400' }
      case 'amber':
        return { bg: 'bg-amber-900/50', text: 'text-amber-400' }
      default:
        return { bg: 'bg-slate-700', text: 'text-slate-300' }
    }
  } else {
    switch (color) {
      case 'blue':
        return { bg: 'bg-blue-100', text: 'text-blue-600' }
      case 'green':
        return { bg: 'bg-green-100', text: 'text-green-600' }
      case 'purple':
        return { bg: 'bg-purple-100', text: 'text-purple-600' }
      case 'amber':
        return { bg: 'bg-amber-100', text: 'text-amber-600' }
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-600' }
    }
  }
}