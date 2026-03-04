'use client'

import { 
  LayoutTemplate, 
  Smartphone, 
  Brain, 
  BarChart,
  Zap,
  Clock,
  Users,
  Globe,
  CheckCircle,
  Sparkles,
  TrendingUp,
  ArrowRight
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import ContactModal from './ContactModal'

// Floating orbs with blur effect
function FloatingOrbs({ isDarkMode }: { isDarkMode: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const orbsRef = useRef<any[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create orb objects with dark mode colors
    class Orb {
      x: number
      y: number
      radius: number
      vx: number
      vy: number
      hue: number
      opacity: number

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.radius = Math.random() * 80 + 40
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        // Adjust hues for dark mode
        if (isDarkMode) {
          this.hue = Math.random() * 60 + 180 // Cooler tones for dark mode
          this.opacity = Math.random() * 0.4 + 0.2 // Slightly more opaque for visibility
        } else {
          this.hue = Math.random() * 60 + 200
          this.opacity = Math.random() * 0.3 + 0.1
        }
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx
        this.y += this.vy

        if (this.x < -this.radius || this.x > canvasWidth + this.radius) {
          this.vx *= -1
        }
        if (this.y < -this.radius || this.y > canvasHeight + this.radius) {
          this.vy *= -1
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        )
        gradient.addColorStop(0, `hsla(${this.hue}, 70%, ${isDarkMode ? '70%' : '60%'}, ${this.opacity})`)
        gradient.addColorStop(0.5, `hsla(${this.hue}, 70%, ${isDarkMode ? '60%' : '60%'}, ${this.opacity * 0.5})`)
        gradient.addColorStop(1, `hsla(${this.hue}, 70%, ${isDarkMode ? '50%' : '60%'}, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const orbCount = Math.min(6, Math.floor(canvas.width / 200))
    orbsRef.current = []
    for (let i = 0; i < orbCount; i++) {
      orbsRef.current.push(new Orb(canvas.width, canvas.height))
    }

    function animate() {
      if (!ctx) return
      if (canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }

      orbsRef.current.forEach(orb => {
        if (canvas) {
          orb.update(canvas.width, canvas.height)
          orb.draw(ctx)
        }
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
      style={{ filter: 'blur(40px)' }}
    />
  )
}

const caseStudies = [
  {
    id: 1,
    icon: LayoutTemplate,
    title: "Dynamic Portfolio Builder Platform",
    challenge: "Professionals and creatives needed beautiful portfolio websites but lacked technical skills and couldn't afford custom development.",
    solution: "We built a no-code SaaS platform that empowers anyone to create professional portfolios in minutes:",
    features: [
      "Choose from designer-quality templates",
      "Drag-and-drop content editor (zero coding required)",
      "One-click image replacement and text customization",
      "Custom domain connection",
      "Instant publishing and hosting"
    ],
    impact: {
      stats: [
        { icon: Users, value: "200+", label: "portfolios launched" },
        { icon: Clock, value: "15 min", label: "average setup time" },
        { icon: Zap, value: "1,000+", label: "concurrent users" }
      ],
      timeline: "8-week development timeline",
      details: "Down from days with traditional developers"
    },
    color: "blue",
    status: "completed"
  },
  {
    id: 2,
    icon: Smartphone,
    title: "NFC Digital Business Card Platform",
    challenge: "Traditional business cards become outdated the moment they're printed, and professionals waste money on constant reprints when contact details change.",
    solution: "We developed an NFC-powered digital business card ecosystem that makes networking effortless:",
    features: [
      "Beautiful, customizable card designs",
      "Complete profile management (contact info, social links, portfolio)",
      "Share instantly via NFC tap or QR code",
      "Update your information anytime from your dashboard",
      "Track card views and engagement analytics"
    ],
    impact: {
      stats: [
        { icon: Zap, value: "Instant", label: "contact sharing" },
        { icon: TrendingUp, value: "Zero", label: "reprinting costs" },
        { icon: BarChart, value: "Real-time", label: "analytics" }
      ],
      timeline: "6-week development timeline",
      details: "Update unlimited times from anywhere"
    },
    color: "purple",
    status: "completed"
  },
  {
    id: 3,
    icon: Brain,
    title: "Kurav - AI-Powered Islamic Content Platform",
    challenge: "A content organization spent 10+ hours manually creating and translating subtitles for each video, creating a massive bottleneck in their publishing workflow.",
    solution: "We built an intelligent content management platform with AI automation at its core:",
    features: [
      "Centralized blog, events, and video management",
      "AI-generated subtitles in 20+ languages",
      "Automated video summarization",
      "Intelligent subtitle translation",
      "Text-to-speech voice generation",
      "Multi-role workflow system (admin, reviewers, editors)"
    ],
    impact: {
      stats: [
        { icon: Clock, value: "98%", label: "time saved" },
        { icon: Globe, value: "20+", label: "languages" },
        { icon: Users, value: "1,000+", label: "videos managed" }
      ],
      timeline: "12-week development timeline",
      details: "From 10 hours to 10 minutes per video"
    },
    color: "green",
    status: "completed"
  },
  {
    id: 4,
    icon: BarChart,
    title: "ESG Reporting Platform for German Companies",
    challenge: "German companies face increasingly strict ESG (Environmental, Social, Governance) reporting requirements. Manual data collection and report generation is time-consuming, error-prone, and difficult to audit.",
    solution: "We're building a specialized ESG data management and compliance platform tailored for German regulatory standards:",
    features: [
      "Centralized database for tracking ESG metrics",
      "Automated report generation aligned with German/EU compliance",
      "Multi-year data comparison and trend analysis",
      "Export to required formats (PDF, Excel, regulatory submissions)",
      "Real-time dashboard for ESG performance monitoring",
      "Audit trail and documentation management"
    ],
    impact: {
      stats: [
        { icon: CheckCircle, value: "✅", label: "Database complete" },
        { icon: CheckCircle, value: "✅", label: "Data model designed" },
        { icon: Sparkles, value: "🚧", label: "In progress" }
      ],
      timeline: "Beta launch: Q1 2024",
      details: "Tailored for German regulatory standards"
    },
    color: "amber",
    status: "in-progress"
  }
]

export default function CaseStudies() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [activeCaseStudy, setActiveCaseStudy] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

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

  return (
    <section 
      ref={sectionRef}
      className={`py-20 transition-colors duration-300 relative overflow-hidden ${
        isDarkMode ? 'bg-slate-900' : 'bg-white'
      }`} 
      id="Case_Studies"
    >
      {isVisible && <FloatingOrbs isDarkMode={isDarkMode} />}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Real Projects, Real Results
          </h2>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}>
            See how we've transformed business challenges into successful software solutions
          </p>
        </div>

        <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide">
          <div className="flex gap-3 min-w-max mx-auto">
            {caseStudies.map((study, index) => (
              <button
                key={study.id}
                onClick={() => setActiveCaseStudy(index)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl border-2 transition-all duration-300 whitespace-nowrap ${
                  activeCaseStudy === index
                    ? isDarkMode
                      ? `${getColorClass(study.color, isDarkMode).border} ${getColorClass(study.color, isDarkMode).bg} ${getColorClass(study.color, isDarkMode).text}`
                      : `${getColorClass(study.color, isDarkMode).border} ${getColorClass(study.color, isDarkMode).bg} ${getColorClass(study.color, isDarkMode).text} border-opacity-20`
                    : isDarkMode
                      ? "border-slate-700 text-slate-400 hover:border-slate-600"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <study.icon className="w-5 h-5" />
                <span className="font-medium">{study.title.split(':')[0]}</span>
                {study.status === "in-progress" && (
                  <span className={`text-xs font-semibold px-2 py-1 rounded transition-colors duration-300 ${
                    isDarkMode ? 'bg-amber-900/50 text-amber-400' : 'bg-amber-100 text-amber-800'
                  }`}>
                    In Progress
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 ${getColorClass(caseStudies[activeCaseStudy].color, isDarkMode).bg} rounded-xl flex items-center justify-center transition-colors duration-300`}>
                {(() => {
                  const IconComponent = caseStudies[activeCaseStudy].icon
                  return <IconComponent className={`w-7 h-7 ${getColorClass(caseStudies[activeCaseStudy].color, isDarkMode).text}`} />
                })()}
              </div>
              <div>
                <h3 className={`text-2xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {caseStudies[activeCaseStudy].title}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-sm font-medium px-3 py-1 rounded-full transition-colors duration-300 ${
                    caseStudies[activeCaseStudy].status === "completed" 
                      ? isDarkMode ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-800'
                      : isDarkMode ? 'bg-amber-900/50 text-amber-400' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {caseStudies[activeCaseStudy].status === "completed" ? "Completed Project" : "In Development"}
                  </span>
                  <span className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                    {caseStudies[activeCaseStudy].impact.timeline}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  isDarkMode ? 'bg-red-900/50' : 'bg-red-100'
                }`}>
                  <span className={`font-bold text-lg transition-colors duration-300 ${
                    isDarkMode ? 'text-red-400' : 'text-red-600'
                  }`}>?</span>
                </div>
                <h4 className={`text-xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>The Challenge</h4>
              </div>
              <p className={`border rounded-xl p-5 transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-slate-300 bg-red-900/20 border-red-900/30' 
                  : 'text-gray-700 bg-red-50 border-red-100'
              }`}>
                {caseStudies[activeCaseStudy].challenge}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  isDarkMode ? 'bg-green-900/50' : 'bg-green-100'
                }`}>
                  <span className={`font-bold text-lg transition-colors duration-300 ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`}>✓</span>
                </div>
                <h4 className={`text-xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Our Solution</h4>
              </div>
              <p className={`mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300' : 'text-gray-700'
              }`}>
                {caseStudies[activeCaseStudy].solution}
              </p>
              <ul className="space-y-3">
                {caseStudies[activeCaseStudy].features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                      isDarkMode ? 'text-green-400' : 'text-green-500'
                    }`} />
                    <span className={`transition-colors duration-300 ${
                      isDarkMode ? 'text-slate-300' : 'text-gray-700'
                    }`}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className={`border rounded-xl p-6 transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-br from-slate-800 to-slate-700 border-slate-700'
                : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'
            }`}>
              <h4 className={`text-xl font-bold mb-6 flex items-center gap-3 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <TrendingUp className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                Impact & Results
              </h4>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                {caseStudies[activeCaseStudy].impact.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-12 h-12 ${getColorClass(caseStudies[activeCaseStudy].color, isDarkMode).bg} rounded-xl flex items-center justify-center mx-auto mb-2 transition-colors duration-300`}>
                      <stat.icon className={`w-6 h-6 ${getColorClass(caseStudies[activeCaseStudy].color, isDarkMode).text}`} />
                    </div>
                    <div className={`text-2xl font-bold mb-1 transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {stat.value}
                    </div>
                    <div className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-600'
                    }`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <p className={`text-center transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300' : 'text-gray-700'
              }`}>
                {caseStudies[activeCaseStudy].impact.details}
              </p>
            </div>

            <div className={`border rounded-xl p-6 transition-colors duration-300 ${
              isDarkMode ? 'border-slate-700' : 'border-gray-200'
            }`}>
              <h4 className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Development Approach
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-700'
                  }`}>Project Status</span>
                  <span className={`font-semibold ${
                    caseStudies[activeCaseStudy].status === "completed" 
                      ? isDarkMode ? 'text-green-400' : 'text-green-600'
                      : isDarkMode ? 'text-amber-400' : 'text-amber-600'
                  }`}>
                    {caseStudies[activeCaseStudy].status === "completed" ? "✓ Live & Scaling" : "🚧 In Development"}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-700'
                  }`}>Development Time</span>
                  <span className={`font-semibold transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {caseStudies[activeCaseStudy].impact.timeline}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-700'
                  }`}>Team Size</span>
                  <span className={`font-semibold transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {caseStudies[activeCaseStudy].status === "in-progress" ? "3 Developers" : "2-3 Developers"}
                  </span>
                </div>
              </div>

              <div className={`mt-6 pt-6 border-t transition-colors duration-300 ${
                isDarkMode ? 'border-slate-700' : 'border-gray-200'
              }`}>
                <h5 className={`text-sm font-semibold mb-3 transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-300' : 'text-gray-900'
                }`}>
                  Technologies Used
                </h5>
                <div className="flex flex-wrap gap-2">
                  {getTechStack(caseStudies[activeCaseStudy].id).map((tech, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm transition-colors duration-300 ${
                        isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={`bg-gradient-to-r rounded-xl p-6 text-center transition-colors duration-300 ${
              isDarkMode
                ? 'from-blue-900/50 to-blue-800/50 border border-blue-800'
                : 'from-blue-50 to-blue-100 border border-blue-200'
            }`}>
              <h4 className={`text-lg font-bold mb-3 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Have a similar project?
              </h4>
              <p className={`mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300' : 'text-gray-700'
              }`}>
                Let's discuss how we can build your solution
              </p>
              <button 
                onClick={() => setIsContactModalOpen(true)} 
                className="group inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {caseStudies.map((study, index) => (
            <button
              key={index}
              onClick={() => setActiveCaseStudy(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeCaseStudy === index
                  ? isDarkMode
                    ? 'bg-blue-400'
                    : `${getColorClass(study.color, isDarkMode).bg.replace('100', '600')}`
                  : isDarkMode
                    ? 'bg-slate-600'
                    : 'bg-gray-300'
              }`}
              aria-label={`View project ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        isDarkMode={isDarkMode}
      />
    </section>
  )
}

function getColorClass(color: string, isDarkMode: boolean) {
  if (isDarkMode) {
    switch (color) {
      case 'blue':
        return { bg: 'bg-blue-900/50', text: 'text-blue-400', border: 'border-blue-800' }
      case 'purple':
        return { bg: 'bg-purple-900/50', text: 'text-purple-400', border: 'border-purple-800' }
      case 'green':
        return { bg: 'bg-green-900/50', text: 'text-green-400', border: 'border-green-800' }
      case 'amber':
        return { bg: 'bg-amber-900/50', text: 'text-amber-400', border: 'border-amber-800' }
      default:
        return { bg: 'bg-slate-700', text: 'text-slate-300', border: 'border-slate-600' }
    }
  } else {
    switch (color) {
      case 'blue':
        return { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' }
      case 'purple':
        return { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' }
      case 'green':
        return { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' }
      case 'amber':
        return { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-200' }
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' }
    }
  }
}

function getTechStack(projectId: number) {
  switch (projectId) {
    case 1:
      return ["Next.js", "React", "Node.js", "PostgreSQL", "AWS", "Tailwind"]
    case 2:
      return ["React Native", "NFC API", "Node.js", "MongoDB", "QR Code", "Analytics"]
    case 3:
      return ["Python", "AI/ML", "Django", "PostgreSQL", "Video Processing", "Translation API"]
    case 4:
      return ["TypeScript", "React", "Node.js", "PostgreSQL", "Data Visualization", "PDF Generation"]
    default:
      return ["Modern Stack", "Cloud Native", "Scalable Architecture"]
  }
}