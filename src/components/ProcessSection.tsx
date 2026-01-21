'use client'

import { 
  Search, 
  Layout, 
  Code2, 
  Bug, 
  Rocket,
  CheckCircle,
  MessageSquare,
  Users,
  FileText,
  Shield,
  Zap,
  ArrowRight,
  Clock,
  Target
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

// Diagonal animated stripes background
function DiagonalStripes() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const offsetRef = useRef(0)

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

    const stripeWidth = 60
    const stripeSpacing = 80

    function animate() {
      offsetRef.current += 0.3
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw diagonal stripes
      ctx.save()
      
      const diagonal = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height)
      
      for (let i = -diagonal; i < diagonal * 2; i += stripeSpacing) {
        const x = i + offsetRef.current
        
        const gradient = ctx.createLinearGradient(x, 0, x + stripeWidth, 0)
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0)')
        gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.08)')
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
        
        ctx.fillStyle = gradient
        
        ctx.save()
        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate(-30 * Math.PI / 180)
        ctx.fillRect(x - canvas.width, -canvas.height, stripeWidth, canvas.height * 3)
        ctx.restore()
      }
      
      ctx.restore()

      if (offsetRef.current > stripeSpacing) {
        offsetRef.current = 0
      }

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
    />
  )
}

const processSteps = [
  {
    id: 1,
    phase: "Start",
    icon: Search,
    title: "Discovery & Understanding",
    description: "We begin by deeply understanding your needs",
    tasks: [
      "Discuss your business goals and vision",
      "Identify core problems and technical requirements",
      "Define success metrics and KPIs",
      "Review existing systems and constraints",
      "Ask the right questions to uncover hidden needs"
    ],
    yourInvolvement: "Active collaboration in requirements gathering",
    involvementIcon: MessageSquare,
    color: "brand",
    deliverables: ["Requirements Document", "Project Scope", "Initial Estimates"]
  },
  {
    id: 2,
    phase: "Start",
    icon: Layout,
    title: "Planning & Architecture",
    description: "Creating a solid blueprint for success",
    tasks: [
      "Choose the optimal technology stack for your needs",
      "Design system architecture and database structure",
      "Create wireframes and user flow diagrams",
      "Plan feature priorities and development phases",
      "Provide detailed proposal with timeline and pricing"
    ],
    yourInvolvement: "Review and approve project plans and designs",
    involvementIcon: FileText,
    color: "blue",
    deliverables: ["System Architecture", "Wireframes", "Fixed-Price Proposal"]
  },
  {
    id: 3,
    phase: "Work",
    icon: Code2,
    title: "Agile Development",
    description: "Building your solution iteratively",
    tasks: [
      "Write clean, scalable, and well-documented code",
      "Build features in priority order with short sprints",
      "Conduct regular progress demonstrations",
      "Maintain code in version control (Git)",
      "Implement best practices and security measures"
    ],
    yourInvolvement: "Regular check-ins, feedback on demos, approve completed features",
    involvementIcon: Users,
    color: "emerald",
    deliverables: ["Working Features", "Weekly Demos", "Progress Reports"]
  },
  {
    id: 4,
    phase: "Work",
    icon: Bug,
    title: "Quality Assurance",
    description: "Ensuring everything works flawlessly",
    tasks: [
      "Comprehensive bug testing and fixing",
      "Performance optimization and load testing",
      "Security audits and code review",
      "Cross-browser and device compatibility testing",
      "User acceptance testing with your team"
    ],
    yourInvolvement: "Test features in staging environment and report feedback",
    involvementIcon: Shield,
    color: "amber",
    deliverables: ["Test Reports", "Bug Fixes", "Performance Metrics"]
  },
  {
    id: 5,
    phase: "Finish",
    icon: Rocket,
    title: "Launch & Handover",
    description: "Going live with confidence",
    tasks: [
      "Deploy to production servers with zero downtime",
      "Provide complete technical documentation",
      "Train your team on system usage and management",
      "Set up monitoring and analytics",
      "Ensure smooth transition and knowledge transfer"
    ],
    yourInvolvement: "Final approval, team training participation, launch coordination",
    involvementIcon: Zap,
    color: "purple",
    deliverables: ["Live System", "Documentation", "Training Materials"]
  }
]

const workingPrinciples = [
  {
    icon: MessageSquare,
    title: "Transparent Communication",
    description: "Regular updates, honest feedback, and open dialogue throughout the project"
  },
  {
    icon: Target,
    title: "Flexible Approach",
    description: "Adapt to changes and new insights while maintaining project goals"
  },
  {
    icon: Clock,
    title: "Iterative Delivery",
    description: "Show progress early and often with working features you can test"
  },
  {
    icon: Shield,
    title: "Quality First",
    description: "Never compromise on code quality, security, or performance"
  }
]

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [navVisible, setNavVisible] = useState(false)
  const [timelineVisible, setTimelineVisible] = useState(false)
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [principlesVisible, setPrinciplesVisible] = useState(false)
  
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const navRef = useRef(null)
  const timelineRef = useRef(null)
  const detailsRef = useRef(null)
  const principlesRef = useRef(null)

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

  // Staggered animations for different sections
  useEffect(() => {
    const createObserver = (ref, setVisible, delay = 0) => {
      return new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisible(true), delay)
          }
        },
        { threshold: 0.2 }
      )
    }

    const headerObserver = createObserver(headerRef, setHeaderVisible, 100)
    const navObserver = createObserver(navRef, setNavVisible, 300)
    const timelineObserver = createObserver(timelineRef, setTimelineVisible, 400)
    const detailsObserver = createObserver(detailsRef, setDetailsVisible, 500)
    const principlesObserver = createObserver(principlesRef, setPrinciplesVisible, 600)

    if (headerRef.current) headerObserver.observe(headerRef.current)
    if (navRef.current) navObserver.observe(navRef.current)
    if (timelineRef.current) timelineObserver.observe(timelineRef.current)
    if (detailsRef.current) detailsObserver.observe(detailsRef.current)
    if (principlesRef.current) principlesObserver.observe(principlesRef.current)

    return () => {
      if (headerRef.current) headerObserver.unobserve(headerRef.current)
      if (navRef.current) navObserver.unobserve(navRef.current)
      if (timelineRef.current) timelineObserver.unobserve(timelineRef.current)
      if (detailsRef.current) detailsObserver.unobserve(detailsRef.current)
      if (principlesRef.current) principlesObserver.unobserve(principlesRef.current)
    }
  }, [])

  const getPhaseSteps = (phase) => {
    return processSteps.filter(step => step.phase === phase)
  }

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden" 
      id="Process"
    >
      {isVisible && <DiagonalStripes />}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Title - Fade in from top */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            How We Work Together
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A proven methodology from initial idea to successful launch
          </p>
        </div>

        {/* Phase Navigation - Slide in from bottom */}
        <div 
          ref={navRef}
          className={`flex justify-center gap-4 mb-12 transition-all duration-1000 delay-200 ${
            navVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {["Start", "Work", "Finish"].map((phase, index) => (
            <div key={phase} className="flex items-center gap-2">
              <button
                onClick={() => {
                  const firstStepIndex = processSteps.findIndex(s => s.phase === phase)
                  if (firstStepIndex !== -1) setActiveStep(firstStepIndex)
                }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  processSteps[activeStep].phase === phase
                    ? "bg-green-100 text-green-700 shadow-lg border-2 border-green-300"
                    : "bg-white border-2 border-slate-200 text-slate-600 hover:border-green-300"
                }`}
              >
                {phase}
              </button>
              {index < 2 && (
                <ArrowRight className="w-5 h-5 text-slate-300 hidden md:block" />
              )}
            </div>
          ))}
        </div>

        {/* Process Steps Timeline - Staggered fade in */}
        <div 
          ref={timelineRef}
          className="relative mb-12"
        >
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-slate-400 via-emerald-500 to-purple-500 transform -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
            {processSteps.map((step, index) => (
              <div 
                key={step.id} 
                className={`flex flex-col items-center transition-all duration-700 ${
                  timelineVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => setActiveStep(index)}
                  className={`group w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                    index === activeStep
                      ? "bg-green-100 text-green-600 border-2 border-green-300 scale-110 shadow-lg shadow-green-500/50"
                      : "bg-white border-2 border-slate-200 text-slate-600 hover:border-green-300 hover:scale-105"
                  }`}
                >
                  <step.icon className="w-7 h-7" />
                </button>

                <div className="text-center">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                    getColorClass(step.color).bg
                  } ${getColorClass(step.color).text}`}>
                    {step.phase}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{step.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Step Details - Slide in from sides */}
        <div 
          ref={detailsRef}
          className="grid lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Left Column - Slide from left */}
          <div 
            className={`space-y-6 transition-all duration-1000 ${
              detailsVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="flex items-center gap-4 mb-2">
              <div className={`w-12 h-12 ${getColorClass(processSteps[activeStep].color).bg} rounded-xl flex items-center justify-center transition-transform duration-300 hover:rotate-6`}>
                {(() => {
                  const IconComponent = processSteps[activeStep].icon
                  return <IconComponent className={`w-6 h-6 ${getColorClass(processSteps[activeStep].color).text}`} />
                })()}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {processSteps[activeStep].title}
                </h3>
                <p className="text-slate-600">{processSteps[activeStep].description}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                What We Do:
              </h4>
              <ul className="space-y-3">
                {processSteps[activeStep].tasks.map((task, index) => (
                  <li 
                    key={index} 
                    className={`flex items-start gap-3 transition-all duration-500 ${
                      detailsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0" />
                    <span className="text-slate-700">{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-xl p-5 hover:shadow-lg transition-shadow duration-300">
              <h4 className="text-sm font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                You'll Receive:
              </h4>
              <div className="flex flex-wrap gap-2">
                {processSteps[activeStep].deliverables.map((item, index) => (
                  <span 
                    key={index} 
                    className={`px-3 py-1 bg-white border border-emerald-200 rounded-full text-sm text-emerald-700 transition-all duration-500 hover:scale-105 hover:shadow-md ${
                      detailsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Slide from right */}
          <div 
            className={`space-y-6 transition-all duration-1000 ${
              detailsVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                {(() => {
                  const InvolvementIcon = processSteps[activeStep].involvementIcon
                  return <InvolvementIcon className="w-5 h-5 text-green-600" />
                })()}
                Your Role:
              </h4>
              <p className="text-slate-700 mb-4">
                {processSteps[activeStep].yourInvolvement}
              </p>
              
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Overall Progress</span>
                  <span className="text-sm font-semibold text-green-600">
                    Step {processSteps[activeStep].id} of {processSteps.length}
                  </span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-700 rounded-full ${
                      activeStep === 0 ? 'bg-slate-400' :
                      activeStep === 1 ? 'bg-orange-400' :
                      activeStep === 2 ? 'bg-yellow-400' :
                      activeStep === 3 ? 'bg-blue-500' :
                      'bg-emerald-500'
                    }`}
                    style={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {activeStep < processSteps.length - 1 && (
              <div className="border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:border-green-300">
                <h4 className="text-sm font-semibold text-slate-600 mb-2">Coming Next:</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${getColorClass(processSteps[activeStep + 1].color).bg} rounded-lg flex items-center justify-center transition-transform duration-300 hover:rotate-6`}>
                      {(() => {
                        const IconComponent = processSteps[activeStep + 1].icon
                        return <IconComponent className={`w-5 h-5 ${getColorClass(processSteps[activeStep + 1].color).text}`} />
                      })()}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">
                        {processSteps[activeStep + 1].title}
                      </div>
                      <div className="text-sm text-slate-600">
                        {processSteps[activeStep + 1].description}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-all duration-300 hover:scale-110"
                  >
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              </div>
            )}

            <div className={`rounded-xl p-5 transition-all duration-300 hover:shadow-lg ${
              processSteps[activeStep].phase === "Start" ? "bg-blue-50 border border-blue-200 hover:border-blue-300" :
              processSteps[activeStep].phase === "Work" ? "bg-emerald-50 border border-emerald-200 hover:border-emerald-300" :
              "bg-purple-50 border border-purple-200 hover:border-purple-300"
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-300 hover:rotate-12 ${
                  processSteps[activeStep].phase === "Start" ? "bg-blue-100" :
                  processSteps[activeStep].phase === "Work" ? "bg-emerald-100" :
                  "bg-purple-100"
                }`}>
                  {processSteps[activeStep].phase === "Start" && <Target className="w-5 h-5 text-blue-600" />}
                  {processSteps[activeStep].phase === "Work" && <Code2 className="w-5 h-5 text-emerald-600" />}
                  {processSteps[activeStep].phase === "Finish" && <Rocket className="w-5 h-5 text-purple-600" />}
                </div>
                <div>
                  <h5 className="font-semibold text-slate-900">
                    {processSteps[activeStep].phase} Phase
                  </h5>
                  <p className="text-sm text-slate-600">
                    {processSteps[activeStep].phase === "Start" && "Setting the foundation right"}
                    {processSteps[activeStep].phase === "Work" && "Building and refining iteratively"}
                    {processSteps[activeStep].phase === "Finish" && "Delivering and supporting"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Working Principles - Zoom in effect */}
        <div 
          ref={principlesRef}
          className={`relative overflow-hidden bg-gradient-to-br from-blue-400 via-blue-500 to-purple-700 rounded-3xl p-8 md:p-12 transition-all duration-1000 ${
            principlesVisible 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-95'
          }`}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Our Working Principles
              </h3>
              <p className="text-white/80 text-lg">
                The foundation of every successful project
              </p>
            </div>
  
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {workingPrinciples.map((principle, index) => (
                <div 
                  key={index} 
                  className={`group relative bg-white/95 backdrop-blur-lg rounded-2xl p-6 hover:bg-white transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/20 ${
                    principlesVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                      <principle.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2 text-lg">
                      {principle.title}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {principle.description}
                    </p>
                  </div>

                  <div className="absolute top-4 right-4 w-8 h-8 bg-blue-600/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function getColorClass(color) {
  switch (color) {
    case 'brand':
      return { bg: 'bg-green-100', text: 'text-green-700' }
    case 'blue':
      return { bg: 'bg-blue-100', text: 'text-blue-600' }
    case 'emerald':
      return { bg: 'bg-emerald-100', text: 'text-emerald-600' }
    case 'amber':
      return { bg: 'bg-amber-100', text: 'text-amber-600' }
    case 'purple':
      return { bg: 'bg-purple-100', text: 'text-purple-600' }
    default:
      return { bg: 'bg-slate-100', text: 'text-slate-600' }
  }
}