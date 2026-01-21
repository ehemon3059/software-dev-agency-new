'use client'
import { ArrowRight, PlayCircle, CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects')
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

  const handleFreeConsultation = () => {
    alert('Opening consultation form!')
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #3B82F6 1px, transparent 1px),
                            linear-gradient(to bottom, #3B82F6 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-400/15 rounded-full blur-3xl z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className={`space-y-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Tagline */}
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-full">
              <CheckCircle className="w-4 h-4" />
              <span>Trusted by 100+ Startups</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Custom Web Applications{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Built Right
              </span>
              {' '}- For Startups Who Can't Afford Mistakes
            </h1>

            {/* Sub-headline */}
            <p className="text-xl text-slate-600 leading-relaxed">
              We build web applications for service-based businesses — turning 
              ideas into production-ready systems or modernizing what's broken.
            </p>

            {/* Supporting Line */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span className="font-medium text-slate-700">Clean code</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span className="font-medium text-slate-700">Scalable architecture</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span className="font-medium text-slate-700">Long-term support</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleFreeConsultation}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-3 overflow-hidden"
              >
                <span className="relative z-10">Get a Free Consultation</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button
                onClick={scrollToProjects}
                className="group px-8 py-4 border-2 border-blue-600 text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <span>View Our Work</span>
                <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-slate-200">
              <div className="flex flex-wrap gap-6 text-sm text-slate-600">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">30</span>
                  </div>
                  <span>Day delivery guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">24/7</span>
                  </div>
                  <span>Support included</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Illustration/Graphic */}
          <div className={`relative hidden lg:block transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Main Graphic Container */}
            <div className="relative">
              {/* Floating card 1 */}
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl p-6 transform rotate-3">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <div className="w-8 h-8 bg-blue-600 rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-200 rounded w-1/2" />
                  </div>
                  <div className="h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg" />
                </div>
              </div>

              {/* Floating card 2 */}
              <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow-xl p-6 transform -rotate-3">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-300 rounded w-20" />
                      <div className="h-6 bg-blue-600 rounded w-32" />
                    </div>
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">↑</span>
                    </div>
                  </div>
                  <div className="h-32 bg-gradient-to-b from-blue-100 via-indigo-50 to-transparent rounded-lg p-4">
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
              <div className="relative w-full h-96 bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-2xl p-8 flex items-center justify-center">
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
                        <span className="text-slate-800"> launchProject() {'{'}</span>
                      </div>
                      <div className="flex">
                        <span className="text-purple-600 w-8">2</span>
                        <span className="text-slate-800 ml-4">
                          return{' '}
                          <span className="text-green-600">"Success"</span>
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-purple-600 w-8">3</span>
                        <span className="text-slate-800">{'}'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress indicator */}
                  <div className="pt-6">
                    <div className="flex justify-between text-sm text-slate-600 mb-2">
                      <span>Project Progress</span>
                      <span className="font-semibold text-blue-700">85%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"
                        style={{ width: '85%' }}
                      />
                    </div>
                  </div>

                  {/* Status indicator */}
                  <div className="flex items-center space-x-4 pt-6">
                    <div className="flex-1">
                      <div className="text-sm text-slate-600">Active Users</div>
                      <div className="text-2xl font-bold text-slate-900">1,240</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-slate-600">Uptime</div>
                      <div className="text-2xl font-bold text-green-600">99.9%</div>
                    </div>
                  </div>
                </div>

                {/* Animated ring */}
                <div className="absolute bottom-8 right-8">
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 border-4 border-blue-200 rounded-full" />
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
          <span className="text-sm text-slate-600">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}