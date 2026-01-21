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
import { useState } from 'react'

export default function Pricing() {


  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

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

    
    <section className="py-20 bg-gradient-to-b from-white to-slate-50" id="Pricing">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Investment & Pricing
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Transparent pricing for predictable budgeting
          </p>
        </div>

        {/* Pricing Philosophy */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-8 mb-16">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/4">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto lg:mx-0">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="lg:w-3/4">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Our Pricing Philosophy
              </h3>
              <p className="text-slate-700 mb-4">
                We believe in transparent, predictable pricing. No hidden fees, no surprise invoices. 
                Every project starts with a detailed proposal so you know exactly what you're getting.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-slate-700">Fixed-price proposals</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-slate-700">No hidden costs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-slate-700">Clear deliverables</span>
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
              className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-slate-300 transition-all duration-300"
            >
              {/* Tier Header */}
              <div className="text-center mb-6">
                <div className={`w-16 h-16 ${getColorClass(tier.color).bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <tier.icon className={`w-8 h-8 ${getColorClass(tier.color).text}`} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {tier.name}
                </h3>
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {tier.price}
                </div>
                <p className="text-slate-600 text-sm">
                  {tier.description}
                </p>
              </div>

              {/* Timeline */}
              <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-slate-50 rounded-lg">
                <tier.timelineIcon className="w-5 h-5 text-slate-600" />
                <span className="font-semibold text-slate-900">{tier.timeline}</span>
              </div>

              {/* Projects */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wide">
                  Typical Projects:
                </h4>
                <ul className="space-y-3">
                  {tier.projects.map((project, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-2 rounded-full bg-blue-600 flex-shrink-0" />
                      <span className="text-slate-700">{project}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best For */}
              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">
                  Best For:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tier.bestFor.map((item, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 ${getColorClass(tier.color).bg} ${getColorClass(tier.color).text} rounded-full text-sm font-medium`}
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
        <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Included in Every Project
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {includedInAll.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-slate-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Free Estimate CTA */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - What You Get */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <Phone className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Not Sure Where You Fit?
                </h3>
                <p className="text-slate-600">Get a free estimate in 24 hours</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-4">
                  We'll review your requirements and provide:
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: FileText, text: "Fixed-price proposal" },
                    { icon: Calendar, text: "Detailed timeline" },
                    { icon: Brain, text: "Technology recommendations" },
                    { icon: Users, text: "No-obligation consultation" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <item.icon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-sm font-medium text-slate-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => setIsContactModalOpen(true)} className="group w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 hover:shadow-lg">
                <Phone className="w-5 h-5" />
                <span>Get Free Estimate</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>


                {/* Contact Modal */}
                  <ContactModal 
                    isOpen={isContactModalOpen}
                    onClose={() => setIsContactModalOpen(false)}
                  />

            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">
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
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">
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
                    <div className="text-sm font-semibold text-slate-900">{option.label}</div>
                    <div className="text-xs text-slate-600 mt-1">{option.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Helper function for color classes
function getColorClass(color: string) {
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