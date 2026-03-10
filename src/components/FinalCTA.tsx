'use client'

import { 
  Calendar,
  Mail,
  Rocket,
  CheckCircle,
  Shield,
  Clock,
  Users,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { useState, useEffect } from 'react'
import ContactModal from './ContactModal'

export default function FinalCTA() {
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

  return (
    <section className={`py-20 transition-colors duration-300 ${
      isDarkMode
        ? 'bg-gradient-to-br from-gray-950 via-orange-950/20 to-gray-950'
        : 'bg-gradient-to-br from-orange-50 via-red-50 to-orange-50'
    }`}
    style={{ fontFamily: "'Quicksand', sans-serif" }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-black mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-50' : 'text-gray-900'
            }`} style={{ fontFamily: "'Rubik', sans-serif" }}>
              Ready to Start Building? 🚀
            </h2>
            <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Let's turn your idea into production-ready software 🐯
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column - What We'll Discuss */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                  isDarkMode ? 'bg-orange-500/20' : 'bg-orange-100'
                }`}>
                  <Rocket className={`w-6 h-6 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <div>
                  <h3 className={`text-2xl font-black mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-50' : 'text-gray-900'
                  }`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                    Schedule a free 30-minute consultation 📅
                  </h3>
                  <p className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    No commitment. No sales pressure. Just honest advice about your project. 💬
                  </p>
                </div>
              </div>

              <div className={`border-2 rounded-2xl p-6 transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-gray-900/50 border-orange-500/20'
                  : 'bg-white border-orange-200'
              }`}>
                <h4 className={`text-lg font-black mb-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-50' : 'text-gray-900'
                }`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                  We'll discuss: 🎯
                </h4>
                <div className="space-y-4">
                  {[
                    {
                      icon: Users,
                      title: "Your goals and challenges",
                      description: "Understand your business objectives"
                    },
                    {
                      icon: Sparkles,
                      title: "Technical recommendations",
                      description: "Right technology for your needs"
                    },
                    {
                      icon: Clock,
                      title: "Realistic timeline and pricing",
                      description: "Clear expectations upfront"
                    },
                    {
                      icon: Shield,
                      title: "Whether we're a good fit",
                      description: "Honest assessment before starting"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                        isDarkMode ? 'bg-orange-500/20' : 'bg-orange-100'
                      }`}>
                        <item.icon className={`w-4 h-4 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                      </div>
                      <div>
                        <div className={`font-bold mb-1 transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-50' : 'text-gray-900'
                        }`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                          {item.title}
                        </div>
                        <div className={`text-sm transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {item.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - CTA Buttons */}
            <div className="space-y-6">
              {/* Primary CTA */}
              <button 
                onClick={() => setIsContactModalOpen(true)} 
                className="group w-full bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white font-black rounded-xl p-5 hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 flex items-center justify-center gap-4"
                style={{ fontFamily: "'Rubik', sans-serif" }}
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="text-left flex-1">
                  <div className="text-lg font-black">Schedule Free Consultation 🐯</div>
                  <div className="text-sm text-white/90">30 minutes, no commitment</div>
                </div>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>

              {/* Secondary CTA */}
              <button 
                onClick={() => setIsContactModalOpen(true)} 
                className={`group w-full border-2 font-black rounded-xl p-5 transition-all duration-300 flex items-center justify-center gap-4 ${
                  isDarkMode
                    ? 'bg-gray-900/50 border-orange-500/20 hover:bg-gray-800 hover:border-orange-500/60 text-gray-50'
                    : 'bg-white border-orange-200 hover:bg-orange-50 hover:border-orange-400 text-gray-900'
                }`}
                style={{ fontFamily: "'Rubik', sans-serif" }}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  isDarkMode ? 'bg-orange-500/20' : 'bg-orange-100'
                }`}>
                  <Mail className={`w-6 h-6 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <div className="text-left flex-1">
                  <div className="text-lg font-black">Email Us Your Requirements 📧</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Get a detailed proposal</div>
                </div>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>

              {/* Quick Info */}
              <div className={`border-2 rounded-xl p-5 transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-gray-900/50 border-orange-500/20'
                  : 'bg-white border-orange-200'
              }`}>
                <div className="text-center mb-3">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-orange-500/20 text-orange-400'
                      : 'bg-orange-100 text-orange-600'
                  }`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                    <Clock className="w-4 h-4" />
                    <span>Response time: within 24 hours ⚡</span>
                  </div>
                </div>
                <p className={`text-center text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  We'll reply with available time slots or a detailed response to your inquiry
                </p>
              </div>
            </div>
          </div>

          {/* Risk Reversal Grid */}
          <div className={`border-2 rounded-2xl p-8 mb-12 transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-900/50 border-orange-500/20'
              : 'bg-white border-orange-200'
          }`}>
            <h3 className={`text-2xl font-black text-center mb-8 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-50' : 'text-gray-900'
            }`} style={{ fontFamily: "'Rubik', sans-serif" }}>
              No Risk, All Reward 💪
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: CheckCircle,
                  title: "Free consultation",
                  description: "No commitment required - just honest advice"
                },
                {
                  icon: Shield,
                  title: "Clear fixed-price quotes",
                  description: "Know exactly what you'll pay before starting"
                },
                {
                  icon: Users,
                  title: "You own everything",
                  description: "All code, documentation, and intellectual property"
                },
                {
                  icon: Clock,
                  title: "30-day support included",
                  description: "Post-launch bug fixes and adjustments"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
                    isDarkMode ? 'bg-orange-500/20' : 'bg-orange-100'
                  }`}>
                    <item.icon className={`w-8 h-8 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  </div>
                  <h4 className={`font-black mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-50' : 'text-gray-900'
                  }`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                    {item.title}
                  </h4>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Assurance */}
          <div className="text-center">
            <div className="inline-flex flex-wrap justify-center gap-6 mb-8">
              {[
                "No hidden fees",
                "No pressure sales",
                "No technical jargon",
                "No long-term contracts"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-orange-400' : 'bg-orange-600'}`} />
                  <span className={`font-bold transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`} style={{ fontFamily: "'Rubik', sans-serif" }}>{item}</span>
                </div>
              ))}
            </div>
            
            <p className={`italic max-w-2xl mx-auto transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              We believe in building long-term partnerships, not making quick sales. 
              If we're not the right fit, we'll tell you honestly. 🤝
            </p>
          </div>
        </div>
      </div>

      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        defaultTab="consultation"
        isDarkMode={isDarkMode}
      />
    </section>
  )
}
