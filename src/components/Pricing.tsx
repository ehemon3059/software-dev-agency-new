'use client'

import { 
  DollarSign, 
  Zap, 
  Calendar, 
  CheckCircle, 
  Phone,
  FileText,
  Clock,
  TrendingUp,
  Shield,
  Rocket,
  Brain,
  ShoppingCart,
  Users,
  ArrowRight
} from 'lucide-react'
import ContactModal from './ContactModal'
import { useState, useEffect } from 'react'

export default function Pricing() {
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

  const pricingTiers = [
    {
      name: "Small Fixes & Features",
      price: "$300 - $1,000",
      icon: Zap,
      description: "Quick improvements and essential updates",
      projects: [
        "Bug fixes on existing applications",
        "Single feature additions",
        "Performance optimizations",
        "Security patches and updates"
      ],
      timeline: "3-7 days",
      timelineIcon: Clock,
      color: "blue",
      bestFor: ["Maintenance", "Quick wins", "Urgent fixes"]
    },
    {
      name: "Medium Web Applications",
      price: "$2,000 - $10,000",
      icon: TrendingUp,
      description: "Custom solutions for growing businesses",
      projects: [
        "Custom business dashboards",
        "Multi-user platforms",
        "API development and integration",
        "Legacy system modernization"
      ],
      timeline: "4-8 weeks",
      timelineIcon: Calendar,
      color: "emerald",
      bestFor: ["Growing startups", "Business tools", "System upgrades"]
    },
    {
      name: "Complex Platforms",
      price: "$10,000+",
      icon: Rocket,
      description: "Enterprise-grade software solutions",
      projects: [
        "SaaS platforms with subscriptions",
        "AI-powered intelligent systems",
        "E-commerce platforms",
        "Multi-role enterprise systems"
      ],
      timeline: "10-16 weeks",
      timelineIcon: Shield,
      color: "purple",
      bestFor: ["VC-backed startups", "Enterprise clients", "Marketplaces"]
    }
  ]

  const includedInAll = [
    "Comprehensive documentation",
    "Thorough testing suite",
    "Production deployment",
    "30 days post-launch support",
    "Version control setup",
    "Performance monitoring"
  ]

  return (
    <section 
      className={`py-20 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-slate-900 to-slate-800' 
          : 'bg-gradient-to-b from-white to-slate-50'
      }`} 
      id="Pricing"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Investment & Pricing
          </h2>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Transparent pricing for predictable budgeting
          </p>
        </div>

        {/* Pricing Philosophy */}
        <div className={`border rounded-2xl p-8 mb-16 transition-colors duration-300 ${
          isDarkMode
            ? 'bg-gradient-to-r from-blue-900/30 to-blue-800/30 border-blue-800'
            : 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200'
        }`}>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/4">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto lg:mx-0 transition-colors duration-300 ${
                isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
              }`}>
                <DollarSign className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
            </div>
            
            <div className="lg:w-3/4">
              <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Our Pricing Philosophy
              </h3>
              <p className={`mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                We believe in transparent, predictable pricing. No hidden fees, no surprise invoices. 
                Every project starts with a detailed proposal so you know exactly what you're getting.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-500'}`} />
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>Fixed-price proposals</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-500'}`} />
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>No hidden costs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-500'}`} />
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>Clear deliverables</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <div 
              key={index}
              className={`group border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700 hover:border-slate-600 hover:shadow-slate-900/50'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Tier Header */}
              <div className="text-center mb-6">
                <div className={`w-16 h-16 ${getColorClass(tier.color, isDarkMode).bg} rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300`}>
                  <tier.icon className={`w-8 h-8 ${getColorClass(tier.color, isDarkMode).text}`} />
                </div>
                <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {tier.name}
                </h3>
                <div className={`text-3xl font-bold mb-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {tier.price}
                </div>
                <p className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {tier.description}
                </p>
              </div>

              {/* Timeline */}
              <div className={`flex items-center justify-center gap-2 mb-6 p-3 rounded-lg transition-colors duration-300 ${
                isDarkMode ? 'bg-slate-700' : 'bg-slate-50'
              }`}>
                <tier.timelineIcon className={`w-5 h-5 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`} />
                <span className={`font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>{tier.timeline}</span>
              </div>

              {/* Projects */}
              <div className="mb-6">
                <h4 className={`text-sm font-semibold mb-3 uppercase tracking-wide transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-900'
                }`}>
                  Typical Projects:
                </h4>
                <ul className="space-y-3">
                  {tier.projects.map((project, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                        isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                      }`} />
                      <span className={`transition-colors duration-300 ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>{project}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best For */}
              <div className={`pt-4 border-t transition-colors duration-300 ${
                isDarkMode ? 'border-slate-700' : 'border-slate-200'
              }`}>
                <h4 className={`text-sm font-semibold mb-3 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Best For:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tier.bestFor.map((item, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                        getColorClass(tier.color, isDarkMode).bg
                      } ${getColorClass(tier.color, isDarkMode).text}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Included in All Projects */}
        <div className={`border rounded-2xl p-8 mb-16 transition-colors duration-300 ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-800 to-slate-700 border-slate-700'
            : 'bg-gradient-to-br from-slate-50 to-white border-slate-200'
        }`}>
          <h3 className={`text-2xl font-bold mb-6 text-center transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Included in Every Project
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {includedInAll.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                  isDarkMode ? 'bg-emerald-900/50' : 'bg-emerald-100'
                }`}>
                  <CheckCircle className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </div>
                <span className={`font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Free Estimate CTA */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - What You Get */}
          <div className={`border rounded-2xl p-8 transition-colors duration-300 ${
            isDarkMode
              ? 'bg-slate-800 border-slate-700'
              : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
              }`}>
                <Phone className={`w-7 h-7 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <h3 className={`text-2xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Not Sure Where You Fit?
                </h3>
                <p className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>Get a free estimate in 24 hours</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  We'll review your requirements and provide:
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: FileText, text: "Fixed-price proposal" },
                    { icon: Calendar, text: "Detailed timeline" },
                    { icon: Brain, text: "Technology recommendations" },
                    { icon: Users, text: "No-obligation consultation" }
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-300 ${
                        isDarkMode ? 'bg-slate-700' : 'bg-slate-50'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 flex-shrink-0 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`} />
                      <span className={`text-sm font-medium transition-colors duration-300 ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setIsContactModalOpen(true)} 
                className="group w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 hover:shadow-lg"
              >
                <Phone className="w-5 h-5" />
                <span>Get Free Estimate</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            <div className={`border rounded-2xl p-6 transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-br from-emerald-900/30 to-slate-800 border-emerald-800'
                : 'bg-gradient-to-br from-emerald-50 to-white border-emerald-100'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  isDarkMode ? 'bg-emerald-900/50' : 'bg-emerald-100'
                }`}>
                  <Shield className={`w-6 h-6 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </div>
                <h4 className={`text-xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Investment Protection
                </h4>
              </div>
              <ul className="space-y-3">
                {[
                  "Clear scope definition upfront",
                  "Regular progress updates",
                  "Phase-based payments",
                  "Post-launch transition period"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span className={`transition-colors duration-300 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`border rounded-2xl p-6 transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-br from-blue-900/30 to-slate-800 border-blue-800'
                : 'bg-gradient-to-br from-blue-50 to-white border-blue-100'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
                }`}>
                  <ShoppingCart className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <h4 className={`text-xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Payment Options
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "50% upfront, 50% on completion", value: "Standard" },
                  { label: "25% / 25% / 25% / 25%", value: "Milestone" },
                  { label: "Monthly retainer", value: "Ongoing" },
                  { label: "Custom payment plan", value: "Flexible" }
                ].map((option, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-sm font-semibold transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>{option.label}</div>
                    <div className={`text-xs mt-1 transition-colors duration-300 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>{option.value}</div>
                  </div>
                ))}
              </div>
            </div>
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
      case 'blue':
        return { bg: 'bg-blue-900/50', text: 'text-blue-400' }
      case 'emerald':
        return { bg: 'bg-emerald-900/50', text: 'text-emerald-400' }
      case 'purple':
        return { bg: 'bg-purple-900/50', text: 'text-purple-400' }
      default:
        return { bg: 'bg-blue-900/50', text: 'text-blue-400' }
    }
  } else {
    switch (color) {
      case 'blue':
        return { bg: 'bg-blue-100', text: 'text-blue-600' }
      case 'emerald':
        return { bg: 'bg-emerald-100', text: 'text-emerald-600' }
      case 'purple':
        return { bg: 'bg-purple-100', text: 'text-purple-600' }
      default:
        return { bg: 'bg-blue-100', text: 'text-blue-600' }
    }
  }
}