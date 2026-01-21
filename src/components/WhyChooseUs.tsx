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
import { useState } from 'react'

export default function WhyChooseUs() {


  const [isContactModalOpen, setIsContactModalOpen] = useState(false)


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
      color: "brand",
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
      color: "blue",
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
      color: "purple",
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
      color: "amber",
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
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            What Makes Us Different
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Beyond just development - a partnership approach that delivers real results
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {differentiators.map((item, index) => (
            <div 
              key={index}
              className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-slate-300 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon and Metric */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${getColorClass(item.color).bg} rounded-xl flex items-center justify-center`}>
                  <item.icon className={`w-6 h-6 text-black ${getColorClass(item.color).text}`} />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">
                    {item.metric}
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    {item.metricLabel}
                  </div>
                </div>
              </div>

              {/* Title and Description */}
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {item.title}
              </h3>
              <p className="text-slate-700 mb-5">
                {item.description}
              </p>

              {/* Details */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex flex-wrap gap-2">
                  {item.details.map((detail, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 text-black   ${getColorClass(item.color).bg} ${getColorClass(item.color).text} rounded-full text-xs font-medium`}
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
          <div className="bg-gradient-to-br from-brand/5 to-brand/10 border border-brand/20 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-brand/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-brand" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  With Us
                </h3>
                <p className="text-slate-600">The partnership experience</p>
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
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-600 font-bold">✓</span>
                  </div>
                  <span className="text-slate-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Typical Agency Experience */}
          <div className="bg-gradient-to-br from-slate-100 to-white border border-slate-300 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-slate-200 rounded-xl flex items-center justify-center">
                <X className="w-7 h-7 text-slate-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Typical Agency
                </h3>
                <p className="text-slate-600">The transactional approach</p>
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
                  <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-rose-600 font-bold">✗</span>
                  </div>
                  <span className="text-slate-700 font-medium">{issue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial & Trust */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-16">
            <div className="grid md:grid-cols-3 gap-8">
                {/* Testimonial */}
                <div className="md:col-span-2">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">
                        Client Results
                        </h3>
                    </div>
                
                    <div className="space-y-6">
                        <div className="relative">
                        <div className="text-4xl text-slate-300 mb-4">"</div>
                        <p className="text-lg text-slate-700 italic mb-6">
                            Other developers built what we asked for. This team helped us understand what we 
                            actually needed. The documentation alone saved us countless hours down the road.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">JD</span>
                            </div>
                            <div>
                            <div className="font-bold text-slate-900">Jane Doe</div>
                            <div className="text-sm text-slate-600">CTO at TechScale Inc.</div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                {/* Trust Signals */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                        <div className="text-2xl font-bold text-slate-900">100%</div>
                        <div className="text-sm text-slate-600">Project Success Rate</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Zap className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                        <div className="text-2xl font-bold text-slate-900">24-48h</div>
                        <div className="text-sm text-slate-600">Average Response Time</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                        <div className="text-2xl font-bold text-slate-900">95%</div>
                        <div className="text-sm text-slate-600">On-Time Delivery</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* CTA */}
        <div className="text-center">
        <div className="inline-block bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Ready for a Different Kind of Development Experience?
            </h3>
            <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
            Stop worrying about your tech and start focusing on your business. 
            Let's build something that lasts.
            </p>
            <button  onClick={() => setIsContactModalOpen(true)} className="group inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 hover:shadow-xl">
            <span>Start Your Project</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>


            {/* Contact Modal */}
              <ContactModal 
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
              />


        </div>
        </div>
</div>
    </section>
  )
}

// Helper function for color classes
function getColorClass(color: string) {
  switch (color) {
    case 'brand':
      return { bg: 'bg-brand/10', text: 'text-brand' }
    case 'blue':
      return { bg: 'bg-blue-100', text: 'text-blue-600' }
    case 'emerald':
      return { bg: 'bg-emerald-100', text: 'text-emerald-600' }
    case 'purple':
      return { bg: 'bg-purple-100', text: 'text-purple-600' }
    case 'amber':
      return { bg: 'bg-amber-100', text: 'text-amber-600' }
    case 'red':
      return { bg: 'bg-red-100', text: 'text-red-600' }
    default:
      return { bg: 'bg-slate-100', text: 'text-slate-600' }
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