'use client'

import { AlertTriangle, Clock, RefreshCw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const problemCards = [
  {
    id: 1,
    icon: AlertTriangle,
    title: "Stuck with Broken Software",
    problem: "Your current system is buggy, slow, or built by developers who disappeared. Every fix creates new problems.",
    solution: "We audit your codebase, fix critical bugs, optimize performance, and document everything - so you're never stuck again.",
    color: "red",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    borderColor: "border-red-100"
  },
  {
    id: 2,
    icon: Clock,
    title: "Need an MVP Fast (But Right)",
    problem: "You have funding and a deadline. You need a working product in 4-8 weeks, but can't afford technical debt.",
    solution: "We build production-ready MVPs with clean architecture - ready to scale when you grow, not crumble under pressure.",
    color: "blue",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    borderColor: "border-blue-100"
  },
  {
    id: 3,
    icon: RefreshCw,
    title: "Outdated Legacy Systems",
    problem: "Your PHP/WordPress site is holding you back. It's slow, insecure, and impossible to add new features.",
    solution: "We modernize legacy systems with modern frameworks - keeping your data, improving everything else.",
    color: "purple",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    borderColor: "border-purple-100"
  }
]

// Animated gradient waves background
function GradientWaves() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const timeRef = useRef(0)

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

       function animate() {
      timeRef.current += 0.01
      
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw multiple wave layers
        const waves = [
          { amplitude: 30, frequency: 0.02, speed: 0.5, opacity: 0.1, color: '99, 102, 241' },
          { amplitude: 40, frequency: 0.015, speed: 0.7, opacity: 0.08, color: '139, 92, 246' },
          { amplitude: 35, frequency: 0.025, speed: 0.4, opacity: 0.06, color: '59, 130, 246' },
        ]

        waves.forEach((wave, index) => {
          ctx.beginPath()
          ctx.moveTo(0, canvas.height / 2)

          for (let x = 0; x < canvas.width; x++) {
            const y = canvas.height / 2 + 
                      Math.sin(x * wave.frequency + timeRef.current * wave.speed) * wave.amplitude +
                      Math.sin(x * wave.frequency * 0.5 + timeRef.current * wave.speed * 1.5) * wave.amplitude * 0.5
            ctx.lineTo(x, y)
          }

          ctx.lineTo(canvas.width, canvas.height)
          ctx.lineTo(0, canvas.height)
          ctx.closePath()

          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
          gradient.addColorStop(0, `rgba(${wave.color}, ${wave.opacity})`)
          gradient.addColorStop(1, `rgba(${wave.color}, 0)`)
          
          ctx.fillStyle = gradient
          ctx.fill()
        })
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

export default function ProblemSolution() {
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
      className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Animated gradient waves background */}
      {isVisible && <GradientWaves />}
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Common Problems We Solve
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We specialize in turning development challenges into scalable solutions
          </p>
        </div>

        {/* Three Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problemCards.map((card) => (
            <div
              key={card.id}
              className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className={`${card.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {card.title}
              </h3>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" aria-hidden="true" />
                  <span className="text-sm font-semibold text-gray-700">
                    The Problem:
                  </span>
                </div>
                <p className="text-gray-800">
                  {card.problem}
                </p>
              </div>

              {/* Solution Section */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm font-semibold text-gray-700">
                    Our Solution:
                  </span>
                </div>
                <p className="text-gray-800">
                  {card.solution}
                </p>
              </div>

              {/* Subtle hover effect border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gray-100 rounded-xl pointer-events-none transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}