'use client'

import { CheckCircle, Calendar, Zap, Shield } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function TrustBar() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
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

  return (
    <section className={`py-8 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-y border-slate-700' 
        : 'bg-gradient-to-r from-gray-50 to-white border-y border-gray-200'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          {/* Production Apps */}
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isDarkMode ? 'bg-green-900/50' : 'bg-green-100'
            }`}>
              <CheckCircle className={`w-5 h-5 transition-colors duration-300 ${
                isDarkMode ? 'text-green-400' : 'text-green-600'
              }`} />
            </div>
            <div>
              <div className={`text-2xl font-extrabold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>5+</div>
              <div className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>Production Apps Delivered</div>
            </div>
          </div>

          {/* Years Experience */}
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
            }`}>
              <Calendar className={`w-5 h-5 transition-colors duration-300 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`} />
            </div>
            <div>
              <div className={`text-lg font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>3+ Years</div>
              <div className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>Building Real Systems</div>
            </div>
          </div>

          {/* Modern Tech */}
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isDarkMode ? 'bg-purple-900/50' : 'bg-purple-100'
            }`}>
              <Zap className={`w-5 h-5 transition-colors duration-300 ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
              }`} />
            </div>
            <div>
              <div className={`text-lg font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Modern</div>
              <div className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>Tech Stack</div>
            </div>
          </div>

          {/* Long-term Support */}
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isDarkMode ? 'bg-amber-900/50' : 'bg-amber-100'
            }`}>
              <Shield className={`w-5 h-5 transition-colors duration-300 ${
                isDarkMode ? 'text-amber-400' : 'text-amber-600'
              }`} />
            </div>
            <div>
              <div className={`text-lg font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Long-Term</div>
              <div className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>Support Included</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}