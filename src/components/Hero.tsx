'use client'
import { ArrowRight, PlayCircle, CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import ContactModal from './ContactModal'

export default function Hero() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    // Check for dark mode on mount and when it changes
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark')
      setIsDarkMode(isDark)
    }

    // Initial check
    checkDarkMode()

    // Create an observer to watch for class changes on html element
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('Case_Studies')
    if (projectsSection) {
      const headerOffset = 80
      const elementPosition = projectsSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className={`relative min-h-screen flex items-center overflow-hidden transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
    }`}>
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, ${isDarkMode ? '#60A5FA' : '#3B82F6'} 1px, transparent 1px),
                            linear-gradient(to bottom, ${isDarkMode ? '#60A5FA' : '#3B82F6'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Floating elements */}
      <div className={`absolute top-1/4 left-10 w-72 h-72 rounded-full blur-3xl z-0 transition-colors duration-300 ${
        isDarkMode ? 'bg-blue-600/20' : 'bg-blue-400/20'
      }`} />
      <div className={`absolute bottom-1/4 right-10 w-96 h-96 rounded-full blur-3xl z-0 transition-colors duration-300 ${
        isDarkMode ? 'bg-indigo-600/15' : 'bg-indigo-400/15'
      }`} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className={`space-y-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Tagline */}
            <div className={`inline-flex items-center space-x-2 font-semibold px-4 py-2 rounded-full transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-blue-900/50 text-blue-300' 
                : 'bg-blue-100 text-blue-700'
            }`}>
              <CheckCircle className="w-4 h-4" />
              <span>Trusted by 100+ Startups</span>
            </div>

            {/* Main Headline */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Custom Web Applications{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Built Right
              </span>
              {' '}- For Startups Who Can't Afford Mistakes
            </h1>

            {/* Sub-headline */}
            <p className={`text-xl leading-relaxed transition-colors duration-300 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              We build web applications for service-based businesses — turning 
              ideas into production-ready systems or modernizing what's broken.
            </p>

            {/* Supporting Line */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span className={`font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>Clean code</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span className={`font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>Scalable architecture</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span className={`font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>Long-term support</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-3 overflow-hidden"
              >
                <span className="relative z-10">Get a Free Consultation</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button
                onClick={scrollToProjects}
                className={`group px-8 py-4 border-2 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 ${
                  isDarkMode
                    ? 'border-blue-500 text-blue-400 hover:bg-blue-900/30'
                    : 'border-blue-600 text-blue-700 hover:bg-blue-50'
                }`}
              >
                <span>View Our Work</span>
                <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </button>
            </div>

            {/* Trust Indicators */}
            <div className={`pt-8 border-t transition-colors duration-300 ${
              isDarkMode ? 'border-slate-700' : 'border-slate-200'
            }`}>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isDarkMode ? 'bg-green-900/50' : 'bg-green-100'
                  }`}>
                    <span className={`font-bold ${
                      isDarkMode ? 'text-green-400' : 'text-green-600'
                    }`}>✓</span>
                  </div>
                  <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>No setup fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
                  }`}>
                    <span className={`font-bold ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>30</span>
                  </div>
                  <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Day delivery guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isDarkMode ? 'bg-purple-900/50' : 'bg-purple-100'
                  }`}>
                    <span className={`font-bold ${
                      isDarkMode ? 'text-purple-400' : 'text-purple-600'
                    }`}>24/7</span>
                  </div>
                  <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Support included</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Illustration/Graphic */}
          <div className={`relative hidden lg:block transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Main Graphic Container */}
            <div className="relative">
              {/* Floating card 1 */}
              <div className={`absolute -top-6 -left-6 w-64 h-64 rounded-2xl shadow-xl p-6 transform rotate-3 transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-slate-800 to-slate-700' 
                  : 'bg-gradient-to-br from-white to-slate-50'
              }`}>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <div className={`w-8 h-8 rounded transition-colors duration-300 ${
                      isDarkMode ? 'bg-blue-500' : 'bg-blue-600'
                    }`} />
                  </div>
                  <div className="space-y-2">
                    <div className={`h-3 rounded w-3/4 transition-colors duration-300 ${
                      isDarkMode ? 'bg-slate-600' : 'bg-slate-200'
                    }`} />
                    <div className={`h-3 rounded w-1/2 transition-colors duration-300 ${
                      isDarkMode ? 'bg-slate-600' : 'bg-slate-200'
                    }`} />
                  </div>
                  <div className={`h-20 rounded-lg transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-blue-900/50 to-indigo-900/50' 
                      : 'bg-gradient-to-r from-blue-100 to-indigo-100'
                  }`} />
                </div>
              </div>

              {/* Floating card 2 */}
              <div className={`absolute -bottom-6 -right-6 w-72 h-72 rounded-2xl shadow-xl p-6 transform -rotate-3 transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-indigo-900/50 to-slate-800' 
                  : 'bg-gradient-to-br from-indigo-50 to-white'
              }`}>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <div className={`h-4 rounded w-20 transition-colors duration-300 ${
                        isDarkMode ? 'bg-slate-600' : 'bg-slate-300'
                      }`} />
                      <div className="h-6 bg-blue-600 rounded w-32" />
                    </div>
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">↑</span>
                    </div>
                  </div>
                  <div className={`h-32 rounded-lg p-4 transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-gradient-to-b from-blue-900/30 via-indigo-900/20 to-transparent' 
                      : 'bg-gradient-to-b from-blue-100 via-indigo-50 to-transparent'
                  }`}>
                    <div className="flex items-end h-full space-x-2">
                      {[20, 40, 60, 80, 60, 40].map((height, index) => (
                        <div
                          key={index}
                          className="flex-1 bg-blue-600 rounded-t transition-all duration-300 hover:bg-indigo-600"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Central graphic */}
              <div className={`relative w-full h-96 rounded-3xl shadow-2xl p-8 flex items-center justify-center transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-slate-800 to-slate-700' 
                  : 'bg-gradient-to-br from-white to-slate-50'
              }`}>
                <div className="absolute top-8 left-8 right-8 space-y-6">
                  {/* Code snippet */}
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                      <div className="w-3 h-3 bg-green-400 rounded-full" />
                    </div>
                    <div className="space-y-2 font-mono text-sm">
                      <div className="flex">
                        <span className="text-purple-600 w-8">1</span>
                        <span className="text-blue-600">function</span>
                        <span className={isDarkMode ? 'text-slate-300' : 'text-slate-800'}> launchProject() {'{'}</span>
                      </div>
                      <div className="flex">
                        <span className="text-purple-600 w-8">2</span>
                        <span className={`ml-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>
                          return{' '}
                          <span className="text-green-600">"Success"</span>
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-purple-600 w-8">3</span>
                        <span className={isDarkMode ? 'text-slate-300' : 'text-slate-800'}>{'}'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress indicator */}
                  <div className="pt-6">
                    <div className={`flex justify-between text-sm mb-2 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      <span>Project Progress</span>
                      <span className="font-semibold text-blue-700">85%</span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden transition-colors duration-300 ${
                      isDarkMode ? 'bg-slate-600' : 'bg-slate-200'
                    }`}>
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"
                        style={{ width: '85%' }}
                      />
                    </div>
                  </div>

                  {/* Status indicator */}
                  <div className="flex items-center space-x-4 pt-6">
                    <div className="flex-1">
                      <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Active Users</div>
                      <div className={`text-2xl font-bold transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>1,240</div>
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Uptime</div>
                      <div className="text-2xl font-bold text-green-600">99.9%</div>
                    </div>
                  </div>
                </div>

                {/* Animated ring */}
                <div className="absolute bottom-8 right-8">
                  <div className="relative w-20 h-20">
                    <div className={`absolute inset-0 border-4 rounded-full transition-colors duration-300 ${
                      isDarkMode ? 'border-blue-800' : 'border-blue-200'
                    }`} />
                    <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className={`text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>Scroll to explore</span>
          <div className={`w-6 h-10 border-2 rounded-full flex justify-center transition-colors duration-300 ${
            isDarkMode ? 'border-slate-600' : 'border-slate-300'
          }`}>
            <div className={`w-1 h-3 rounded-full mt-2 animate-pulse transition-colors duration-300 ${
              isDarkMode ? 'bg-slate-500' : 'bg-slate-400'
            }`} />
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