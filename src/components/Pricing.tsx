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
  ArrowRight,
  Sparkles,
  Gauge,
  Lock,
  Gem
} from 'lucide-react'
import ContactModal from './ContactModal'
import { useState, useEffect, useRef } from 'react'

export default function Pricing() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

  // Intersection Observer for animations
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
      color: "brand",
      bestFor: ["Maintenance", "Quick wins", "Urgent fixes"],
      features: [
        "Priority support",
        "Fast turnaround",
        "Minimal disruption"
      ]
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
      color: "brand",
      bestFor: ["Growing startups", "Business tools", "System upgrades"],
      features: [
        "Scalable architecture",
        "Custom features",
        "Full documentation"
      ],
      popular: true
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
      color: "brand",
      bestFor: ["VC-backed startups", "Enterprise clients", "Marketplaces"],
      features: [
        "Advanced security",
        "High availability",
        "Custom infrastructure"
      ]
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
      ref={sectionRef}
      className={`py-20 transition-colors duration-300 relative overflow-hidden ${
        isDarkMode 
          ? 'bg-[#000000]' 
          : 'bg-[#ffffff]'
      }`} 
      id="Pricing"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl transition-opacity duration-1000 ${
          isDarkMode ? 'bg-[#4f6ef7]/5' : 'bg-[#4f6ef7]/3'
        } ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl transition-opacity duration-1000 delay-500 ${
          isDarkMode ? 'bg-[#4f6ef7]/5' : 'bg-[#4f6ef7]/3'
        } ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Title */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-[#fafafa]' : 'text-[#09090b]'
          }`}>
            Investment & Pricing
          </h2>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
            isDarkMode ? 'text-[#a1a1aa]' : 'text-[#71717a]'
          }`}>
            Transparent pricing for predictable budgeting
          </p>
        </div>

        {/* Pricing Philosophy */}
        <div className={`border rounded-2xl p-8 mb-16 transition-all duration-1000 delay-200 hover:shadow-xl ${
          isDarkMode
            ? 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] hover:border-[#4f6ef7] hover:shadow-[#4f6ef7]/10'
            : 'bg-[rgba(0,0,0,0.02)] border-[rgba(0,0,0,0.08)] hover:border-[#4f6ef7] hover:shadow-[#4f6ef7]/10'
        } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/4">
              <div className={`w-20 h-20 rounded-xl flex items-center justify-center mx-auto lg:mx-0 transition-all duration-500 hover:scale-110 hover:rotate-3 bg-[#4f6ef7] bg-opacity-10`}>
                <DollarSign className="w-10 h-10 text-[#4f6ef7]" />
              </div>
            </div>
            
            <div className="lg:w-3/4">
              <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-[#fafafa]' : 'text-[#09090b]'
              }`}>
                Our Pricing Philosophy
              </h3>
              <p className={`mb-6 transition-colors duration-300 ${
                isDarkMode ? 'text-[#a1a1aa]' : 'text-[#71717a]'
              }`}>
                We believe in transparent, predictable pricing. No hidden fees, no surprise invoices. 
                Every project starts with a detailed proposal so you know exactly what you're getting.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#4f6ef7] bg-opacity-10 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-[#4f6ef7]" />
                  </div>
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-[#fafafa]' : 'text-[#09090b]'
                  }`}>Fixed-price proposals</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#4f6ef7] bg-opacity-10 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-[#4f6ef7]" />
                  </div>
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-[#fafafa]' : 'text-[#09090b]'
                  }`}>No hidden costs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#4f6ef7] bg-opacity-10 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-[#4f6ef7]" />
                  </div>
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-[#fafafa]' : 'text-[#09090b]'
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
              className={`group relative border rounded-2xl p-8 transition-all duration-700 hover:scale-105 hover:shadow-2xl ${
                isDarkMode
                  ? 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] hover:border-[#4f6ef7] hover:shadow-[#4f6ef7]/20'
                  : 'bg-[rgba(0,0,0,0.02)] border-[rgba(0,0,0,0.08)] hover:border-[#4f6ef7] hover:shadow-[#4f6ef7]/10'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-1 px-4 py-2 bg-[#4f6ef7] text-white text-sm font-semibold rounded-full shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {/* Tier Header */}
              <div className="text-center mb-8">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 bg-[#4f6ef7] bg-opacity-10`}>
                  <tier.icon className="w-10 h-10 text-[#4f6ef7]" />
                </div>
                <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-[#fafafa]' : 'text-[#09090b]'
                }`}>
                  {tier.name}
                </h3>
                <div className="text-4xl font-bold mb-2 text-[#4f6ef7]">
                  {tier.price}
                </div>
                <p className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-[#a1a1aa]' : 'text-[#71717a]'
                }`}>
                  {tier.description}
                </p>
              </div>

              {/* Timeline */}
              <div className={`flex items-center justify-center gap-3 mb-8 p-3 rounded-xl transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)]' 
                  : 'bg-[rgba(0,0,0,0.02)] border border-[rgba(0,0,0,0.08)]'
              }`}>
                <tier.timelineIcon className="w-5 h-5 text-[#4f6ef7]" />
                <span className={`font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-[#fafafa]' : 'text-[#09090b]'
                }`}>{tier.timeline}</span>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className={`text-sm font-semibold mb-4 uppercase tracking-wide transition-colors duration-300 ${
                  isDarkMode ? 'text-[#a1a1aa]' : 'text-[#71717a]'
                }`}>
                  Key Features:
                </h4>
                <div className="space-y-3">
                  {tier.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#4f6ef7]" />
                      <span className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? 'text-[#fafafa]' : 'text-[#09090b]'
                      }`}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="mb-8">
                <h4 className={`text-sm font-semibold mb-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-[#fafafa]' : 'text-[#09090b]'
                }`}>
                  Typical Projects:
                </h4>
                <ul className="space-y-3">
                  {tier.projects.map((project, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 mt-2 rounded-full bg-[#4f6ef7]" />
                      <span className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? 'text-[#a1a1aa]' : 'text-[#71717a]'
                      }`}>{project}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best For */}
              <div className={`pt-6 border-t transition-colors duration-300 ${
                isDarkMode ? 'border-[rgba(255,255,255,0.08)]' : 'border-[rgba(0,0,0,0.08)]'
              }`}>
                <h4 className={`text-sm font-semibold mb-3 transition-colors duration-300 ${
                  isDarkMode ? 'text-[#fafafa]' : 'text-[#09090b]'
                }`}>
                  Best For:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tier.bestFor.map((item, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-300 ${
                        isDarkMode
                          ? 'border-[#4f6ef7] text-[#4f6ef7] bg-[#4f6ef7]/10'
                          : 'border-[#4f6ef7] text-[#4f6ef7] bg-[#4f6ef7]/5'
                      }`}
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
        <div className={`border rounded-2xl p-8 mb-16 transition-all duration-1000 delay-700 hover:shadow-xl ${
          isDarkMode
            ? 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] hover:border-[#4f6ef7]'
            : 'bg-[rgba(0,0,0,0.02)] border-[rgba(0,0,0,0.08)] hover:border-[#4f6ef7]'
        } ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h3 className={`text-2xl font-bold mb-8 text-center transition-colors duration-300 ${
            isDarkMode ? 'text-[#fafafa]' : 'text-[#09090b]'
          }`}>
            <span className="relative">
              Included in Every Project
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-[#4f6ef7] rounded-full" />
            </span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {includedInAll.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:translate-x-1"
              >
                <div className="w-10 h-10 rounded-lg bg-[#4f6ef7] bg-opacity-10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-[#4f6ef7]" />
                </div>
                <span className={`font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-[#fafafa]' : 'text-[#09090b]'
                }`}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Free Estimate CTA */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - What You Get */}
          <div className={`border rounded-2xl p-8 transition-all duration-1000 delay-800 hover:shadow-xl ${
            isDarkMode
              ? 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] hover:border-[#4f6ef7]'
              : 'bg-[rgba(0,0,0,0.02)] border-[rgba(0,0,0,0.08)] hover:border-[#4f6ef7]'
          } ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-[#4f6ef7] bg-opacity-10 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-3">
                <Phone className="w-8 h-8 text-[#4f6ef7]" />
              </div>
              <div>
                <h3 className={`text-2xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-[#fafafa]' : 'text-[#09090b]'
                }`}>
                  Not Sure Where You Fit?
                </h3>
                <p className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-[#a1a1aa]' : 'text-[#71717a]'
                }`}>Get a free estimate in 24 hours</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-[#fafafa]' : 'text-[#09090b]'
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
                      className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:translate-x-1 ${
                        isDarkMode 
                          ? 'bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)]' 
                          : 'bg-[rgba(0,0,0,0.02)] border border-[rgba(0,0,0,0.08)]'
                      }`}
                    >
                      <item.icon className="w-5 h-5 text-[#4f6ef7]" />
                      <span className={`text-sm font-medium transition-colors duration-300 ${
                        isDarkMode ? 'text-[#fafafa]' : 'text-[#09090b]'
                      }`}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setIsContactModalOpen(true)} 
                className="group w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#4f6ef7] text-white font-semibold rounded-xl hover:bg-[#4f6ef7]/90 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#4f6ef7]/25"
              >
                <Phone className="w-5 h-5" />
                <span>Get Free Estimate</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            {/* Investment Protection */}
            <div className={`border rounded-2xl p-8 transition-all duration-1000 delay-900 hover:shadow-xl ${
              isDarkMode
                ? 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] hover:border-[#4f6ef7]'
                : 'bg-[rgba(0,0,0,0.02)] border-[rgba(0,0,0,0.08)] hover:border-[#4f6ef7]'
            } ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-[#4f6ef7] bg-opacity-10 flex items-center justify-center">
                  <Shield className="w-7 h-7 text-[#4f6ef7]" />
                </div>
                <h4 className={`text-xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-[#fafafa]' : 'text-[#09090b]'
                }`}>
                  Investment Protection
                </h4>
              </div>
              <ul className="space-y-4">
                {[
                  "Clear scope definition upfront",
                  "Regular progress updates",
                  "Phase-based payments",
                  "Post-launch transition period"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-[#4f6ef7] group-hover:scale-150 transition-transform duration-300" />
                    <span className={`transition-colors duration-300 ${
                      isDarkMode ? 'text-[#a1a1aa]' : 'text-[#71717a]'
                    }`}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment Options */}
            <div className={`border rounded-2xl p-8 transition-all duration-1000 delay-1000 hover:shadow-xl ${
              isDarkMode
                ? 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] hover:border-[#4f6ef7]'
                : 'bg-[rgba(0,0,0,0.02)] border-[rgba(0,0,0,0.08)] hover:border-[#4f6ef7]'
            } ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#4f6ef7] bg-opacity-10 flex items-center justify-center">
                  <ShoppingCart className="w-7 h-7 text-[#4f6ef7]" />
                </div>
                <h4 className={`text-xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-[#fafafa]' : 'text-[#09090b]'
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
                  <div 
                    key={index} 
                    className={`p-4 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)]' 
                        : 'bg-[rgba(0,0,0,0.02)] border border-[rgba(0,0,0,0.08)]'
                    }`}
                  >
                    <div className={`text-sm font-semibold mb-1 transition-colors duration-300 ${
                      isDarkMode ? 'text-[#fafafa]' : 'text-[#09090b]'
                    }`}>{option.label}</div>
                    <div className={`text-xs transition-colors duration-300 ${
                      isDarkMode ? 'text-[#a1a1aa]' : 'text-[#71717a]'
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
      case 'brand':
        return { bg: 'bg-[rgba(79,110,247,0.2)]', text: 'text-[#4f6ef7]' }
      case 'blue':
        return { bg: 'bg-[rgba(79,110,247,0.2)]', text: 'text-[#4f6ef7]' }
      case 'emerald':
        return { bg: 'bg-[rgba(79,110,247,0.2)]', text: 'text-[#4f6ef7]' }
      case 'purple':
        return { bg: 'bg-[rgba(79,110,247,0.2)]', text: 'text-[#4f6ef7]' }
      default:
        return { bg: 'bg-[rgba(79,110,247,0.2)]', text: 'text-[#4f6ef7]' }
    }
  } else {
    switch (color) {
      case 'brand':
        return { bg: 'bg-[rgba(79,110,247,0.1)]', text: 'text-[#4f6ef7]' }
      case 'blue':
        return { bg: 'bg-[rgba(79,110,247,0.1)]', text: 'text-[#4f6ef7]' }
      case 'emerald':
        return { bg: 'bg-[rgba(79,110,247,0.1)]', text: 'text-[#4f6ef7]' }
      case 'purple':
        return { bg: 'bg-[rgba(79,110,247,0.1)]', text: 'text-[#4f6ef7]' }
      default:
        return { bg: 'bg-[rgba(79,110,247,0.1)]', text: 'text-[#4f6ef7]' }
    }
  }
}