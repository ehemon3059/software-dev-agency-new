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
function FloatingOrbs() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const orbsRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create orb objects
    class Orb {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 80 + 40
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.hue = Math.random() * 60 + 200 // Blue to purple range
        this.opacity = Math.random() * 0.3 + 0.1
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Bounce off edges
        if (this.x < -this.radius || this.x > canvas.width + this.radius) {
          this.vx *= -1
        }
        if (this.y < -this.radius || this.y > canvas.height + this.radius) {
          this.vy *= -1
        }
      }

      draw() {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        )
        gradient.addColorStop(0, `hsla(${this.hue}, 70%, 60%, ${this.opacity})`)
        gradient.addColorStop(0.5, `hsla(${this.hue}, 70%, 60%, ${this.opacity * 0.5})`)
        gradient.addColorStop(1, `hsla(${this.hue}, 70%, 60%, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize orbs
    const orbCount = Math.min(6, Math.floor(canvas.width / 200))
    orbsRef.current = []
    for (let i = 0; i < orbCount; i++) {
      orbsRef.current.push(new Orb())
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      orbsRef.current.forEach(orb => {
        orb.update()
        orb.draw()
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
  }, [])

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

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-white relative overflow-hidden" 
      id="Case_Studies"
    >
      {/* Animated floating orbs background */}
      {isVisible && <FloatingOrbs />}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real Projects, Real Results
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how we've transformed business challenges into successful software solutions
          </p>
        </div>

        {/* Project Navigation */}
        <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide">
          <div className="flex gap-3 min-w-max mx-auto">
            {caseStudies.map((study, index) => (
              <button
                key={study.id}
                onClick={() => setActiveCaseStudy(index)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl border-2 transition-all duration-300 whitespace-nowrap ${
                  activeCaseStudy === index
                    ? `${getColorClass(study.color).border} ${getColorClass(study.color).bg} ${getColorClass(study.color).text} border-opacity-20`
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <study.icon className="w-5 h-5" />
                <span className="font-medium">{study.title.split(':')[0]}</span>
                {study.status === "in-progress" && (
                  <span className="text-xs font-semibold px-2 py-1 bg-amber-100 text-amber-800 rounded">
                    In Progress
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Case Study Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Challenge & Solution */}
          <div className="space-y-8">
            {/* Project Header */}
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 ${getColorClass(caseStudies[activeCaseStudy].color).bg} rounded-xl flex items-center justify-center`}>
                {(() => {
                  const IconComponent = caseStudies[activeCaseStudy].icon
                  return <IconComponent className={`w-7 h-7 ${getColorClass(caseStudies[activeCaseStudy].color).text}`} />
                })()}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {caseStudies[activeCaseStudy].title}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${caseStudies[activeCaseStudy].status === "completed" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                    {caseStudies[activeCaseStudy].status === "completed" ? "Completed Project" : "In Development"}
                  </span>
                  <span className="text-sm text-gray-600">
                    {caseStudies[activeCaseStudy].impact.timeline}
                  </span>
                </div>
              </div>
            </div>

            {/* The Challenge */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 font-bold text-lg">?</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900">The Challenge</h4>
              </div>
              <p className="text-gray-700 bg-red-50 border border-red-100 rounded-xl p-5">
                {caseStudies[activeCaseStudy].challenge}
              </p>
            </div>

            {/* Our Solution */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold text-lg">✓</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900">Our Solution</h4>
              </div>
              <p className="text-gray-700 mb-4">
                {caseStudies[activeCaseStudy].solution}
              </p>
              <ul className="space-y-3">
                {caseStudies[activeCaseStudy].features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Impact & Stats */}
          <div className="space-y-8">
            {/* Impact Stats */}
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                Impact & Results
              </h4>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                {caseStudies[activeCaseStudy].impact.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-12 h-12 ${getColorClass(caseStudies[activeCaseStudy].color).bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                      <stat.icon className={`w-6 h-6 ${getColorClass(caseStudies[activeCaseStudy].color).text}`} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-gray-700 text-center">
                {caseStudies[activeCaseStudy].impact.details}
              </p>
            </div>

            {/* Tech Stack & Approach */}
            <div className="border border-gray-200 rounded-xl p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                Development Approach
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Project Status</span>
                  <span className={`font-semibold ${caseStudies[activeCaseStudy].status === "completed" ? "text-green-600" : "text-amber-600"}`}>
                    {caseStudies[activeCaseStudy].status === "completed" ? "✓ Live & Scaling" : "🚧 In Development"}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Development Time</span>
                  <span className="font-semibold text-gray-900">
                    {caseStudies[activeCaseStudy].impact.timeline}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Team Size</span>
                  <span className="font-semibold text-gray-900">
                    {caseStudies[activeCaseStudy].status === "in-progress" ? "3 Developers" : "2-3 Developers"}
                  </span>
                </div>
              </div>

              {/* Tech Stack Tags */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h5 className="text-sm font-semibold text-gray-900 mb-3">
                  Technologies Used
                </h5>
                <div className="flex flex-wrap gap-2">
                  {getTechStack(caseStudies[activeCaseStudy].id).map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 text-center">
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                Have a similar project?
              </h4>
              <p className="text-gray-700 mb-4">
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

        {/* Project Dots Navigation */}
        <div className="flex justify-center gap-2">
          {caseStudies.map((study, index) => (
            <button
              key={index}
              onClick={() => setActiveCaseStudy(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeCaseStudy === index
                  ? `${getColorClass(study.color).bg.replace('100', '600')}`
                  : "bg-gray-300"
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
            />
             

    </section>
  )
}

// Helper function for color classes
function getColorClass(color) {
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

// Helper function for tech stack
function getTechStack(projectId) {
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