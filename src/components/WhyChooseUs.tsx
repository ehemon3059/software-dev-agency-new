'use client'

import { 
  Target,
  FileText,
  Rocket,
  HeartHandshake,
  Clock,
  TrendingUp,
  CheckCircle,
  Users,
  Shield,
  Zap,
  ArrowRight
} from 'lucide-react'
import ContactModal from './ContactModal'
import { useState, useEffect } from 'react'

export default function WhyChooseUs() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark')
      setIsDarkMode(isDark)
    }

    checkDarkMode()

    const themeObserver = new MutationObserver(checkDarkMode)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => themeObserver.disconnect()
  }, [])

  // Load fonts
  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&family=Quicksand:wght@400;500;600;700&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [])

  const differentiators = [
    {
      icon: Target,
      title: "We Understand Business, Not Just Code",
      description: "We don't just build what you ask for - we help you think through what you actually need.",
      details: [
        "Strategic planning sessions",
        "ROI-focused feature prioritization",
        "Business goal alignment",
        "Competitive analysis"
      ],
      color: "orange",
      metric: "100%",
      metricLabel: "Business Focus"
    },
    {
      icon: FileText,
      title: "Every Project Gets System Design Documentation",
      description: "You'll understand how your system works. No black boxes. No mystery code.",
      details: [
        "Complete technical documentation",
        "Architecture diagrams",
        "Deployment guides",
        "Codebase walkthroughs"
      ],
      color: "red",
      metric: "✓",
      metricLabel: "Full Transparency"
    },
    {
      icon: Rocket,
      title: "Built for Scale from Day One",
      description: "We don't build \"quick hacks.\" Even MVPs are architected to handle growth without expensive rewrites.",
      details: [
        "Scalable architecture design",
        "Database optimization",
        "Load testing protocols",
        "Future-proof technology choices"
      ],
      color: "emerald",
      metric: "10x",
      metricLabel: "Growth Capacity"
    },
    {
      icon: HeartHandshake,
      title: "Long-Term Support Included",
      description: "We don't disappear after launch. Every project includes ongoing support and clear communication.",
      details: [
        "30 days included support",
        "Priority maintenance plans",
        "Regular check-ins",
        "Emergency response"
      ],
      color: "amber",
      metric: "24/7",
      metricLabel: "Support"
    },
    {
      icon: Clock,
      title: "Realistic Timelines, Fixed Prices",
      description: "No scope creep. No surprise bills. What we quote is what you pay.",
      details: [
        "Detailed project proposals",
        "Fixed-price contracts",
        "Clear milestone delivery",
        "No hidden fees"
      ],
      color: "orange",
      metric: "$0",
      metricLabel: "Hidden Costs"
    },
    {
      icon: TrendingUp,
      title: "Production Experience",
      description: "We've built systems handling 1,000+ users. We know what works at scale.",
      details: [
        "Performance optimization",
        "High-availability systems",
        "Real-world load testing",
        "Enterprise security"
      ],
      color: "red",
      metric: "1,000+",
      metricLabel: "Users Supported"
    }
  ]

  return (
    <section className={`py-20 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-gray-950 via-orange-950/10 to-gray-950' 
        : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'
    }`}
    style={{ fontFamily: "'Quicksand', sans-serif" }}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-black mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-50' : 'text-gray-900'
          }`} style={{ fontFamily: "'Rubik', sans-serif" }}>
            What Makes Us Different 🐯
          </h2>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Beyond just development - a partnership approach that delivers real results 🔥
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {differentiators.map((item, index) => (
            <div 
              key={index}
              className={`group border-2 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                isDarkMode
                  ? 'bg-gray-900/50 border-orange-500/20 hover:border-orange-500/60 hover:shadow-orange-500/10'
                  : 'bg-white border-orange-200 hover:border-orange-400 hover:shadow-orange-500/10'
              }`}
            >
              {/* Icon and Metric */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${getColorClass(item.color, isDarkMode).bg} rounded-xl flex items-center justify-center transition-colors duration-300`}>
                  <item.icon className={`w-6 h-6 ${getColorClass(item.color, isDarkMode).text}`} />
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-black transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-50' : 'text-gray-900'
                  }`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                    {item.metric}
                  </div>
                  <div className={`text-xs font-bold transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                    {item.metricLabel}
                  </div>
                </div>
              </div>

              {/* Title and Description */}
              <h3 className={`text-xl font-black mb-3 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-50' : 'text-gray-900'
              }`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                {item.title}
              </h3>
              <p className={`mb-5 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {item.description}
              </p>

              {/* Details */}
              <div className={`pt-4 border-t-2 transition-colors duration-300 ${
                isDarkMode ? 'border-gray-800' : 'border-gray-200'
              }`}>
                <div className="flex flex-wrap gap-2">
                  {item.details.map((detail, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-colors duration-300 ${
                        getColorClass(item.color, isDarkMode).bg
                      } ${getColorClass(item.color, isDarkMode).text}`}
                      style={{ fontFamily: "'Rubik', sans-serif" }}
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* What You Get With Us */}
          <div className={`border-2 rounded-2xl p-8 transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gradient-to-br from-orange-900/30 to-orange-900/10 border-orange-500/30'
              : 'bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200'
          }`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                isDarkMode ? 'bg-orange-500/20' : 'bg-orange-100'
              }`}>
                <CheckCircle className={`w-7 h-7 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              </div>
              <div>
                <h3 className={`text-2xl font-black transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-50' : 'text-gray-900'
                }`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                  With Us 🐯
                </h3>
                <p className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>The partnership experience</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                "Strategic planning before coding",
                "Documentation you can actually understand",
                "Architecture built for future growth",
                "Long-term support partnership",
                "Fixed prices, no surprises",
                "Production-proven expertise"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                    isDarkMode ? 'bg-emerald-900/50' : 'bg-emerald-100'
                  }`}>
                    <span className={`font-black ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>✓</span>
                  </div>
                  <span className={`font-bold transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`} style={{ fontFamily: "'Rubik', sans-serif" }}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Typical Agency Experience */}
          <div className={`border-2 rounded-2xl p-8 transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700'
              : 'bg-gradient-to-br from-gray-100 to-white border-gray-300'
          }`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <X className={`w-7 h-7 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </div>
              <div>
                <h3 className={`text-2xl font-black transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-50' : 'text-gray-900'
                }`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                  Typical Agency 😴
                </h3>
                <p className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>The transactional approach</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                "Start coding immediately",
                "Minimal or confusing documentation",
                "Quick fixes that don't scale",
                "Disappear after project completion",
                "Hourly billing with overruns",
                "Theoretical knowledge only"
              ].map((issue, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                    isDarkMode ? 'bg-rose-900/50' : 'bg-rose-100'
                  }`}>
                    <span className={`font-black ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>✗</span>
                  </div>
                  <span className={`font-bold transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`} style={{ fontFamily: "'Rubik', sans-serif" }}>{issue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className={`inline-block border-2 rounded-2xl p-8 transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-500/30'
              : 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200'
          }`}>
            <h3 className={`text-2xl font-black mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-50' : 'text-gray-900'
            }`} style={{ fontFamily: "'Rubik', sans-serif" }}>
              Ready for a Different Kind of Development Experience? 🚀
            </h3>
            <p className={`mb-6 max-w-2xl mx-auto transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Stop worrying about your tech and start focusing on your business. 
              Let's build something that lasts. 🔥
            </p>
            <button 
              onClick={() => setIsContactModalOpen(true)} 
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white font-black rounded-xl hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300"
              style={{ fontFamily: "'Rubik', sans-serif" }}
            >
              <span>Start Your Project 🐯</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
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

// Helper function for color classes with dark mode support
function getColorClass(color: string, isDarkMode: boolean) {
  if (isDarkMode) {
    switch (color) {
      case 'orange':
        return { bg: 'bg-orange-500/20', text: 'text-orange-400' }
      case 'red':
        return { bg: 'bg-red-500/20', text: 'text-red-400' }
      case 'emerald':
        return { bg: 'bg-emerald-900/50', text: 'text-emerald-400' }
      case 'amber':
        return { bg: 'bg-amber-900/50', text: 'text-amber-400' }
      default:
        return { bg: 'bg-gray-700', text: 'text-gray-300' }
    }
  } else {
    switch (color) {
      case 'orange':
        return { bg: 'bg-orange-100', text: 'text-orange-600' }
      case 'red':
        return { bg: 'bg-red-100', text: 'text-red-600' }
      case 'emerald':
        return { bg: 'bg-emerald-100', text: 'text-emerald-600' }
      case 'amber':
        return { bg: 'bg-amber-100', text: 'text-amber-600' }
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-600' }
    }
  }
}

// X Icon component
const X = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
)
