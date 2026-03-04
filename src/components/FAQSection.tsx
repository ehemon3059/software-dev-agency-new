'use client'

import { 
  Clock,
  DollarSign,
  RefreshCw,
  Shield,
  Headphones,
  Users,
  Cloud,
  Calendar,
  CreditCard,
  Rocket,
  MessageSquare,
  ChevronDown,
  ArrowRight
} from 'lucide-react'
import { useState, useEffect } from 'react'
import ContactModal from './ContactModal'

const faqItems = [
  {
    question: "How long does a typical project take?",
    answer: "Small projects: 1-2 weeks. Medium applications: 4-8 weeks. Complex platforms: 10-16 weeks. We provide exact timelines during planning phase.",
    icon: Clock,
    category: "Timeline"
  },
  {
    question: "Do you work hourly or fixed-price?",
    answer: "We prefer fixed-price projects with clear scope. This protects both of us and prevents scope creep.",
    icon: DollarSign,
    category: "Pricing"
  },
  {
    question: "What if my requirements change during development?",
    answer: "Minor changes are included. Major changes require scope adjustment. We'll discuss options and impacts before proceeding.",
    icon: RefreshCw,
    category: "Process"
  },
  {
    question: "Do you sign NDAs?",
    answer: "Yes, absolutely. We take confidentiality seriously and sign NDAs before discussing your project details.",
    icon: Shield,
    category: "Legal"
  },
  {
    question: "What happens after the project is delivered?",
    answer: "You get 30 days of free support for bug fixes. After that, we offer monthly maintenance plans or hourly support.",
    icon: Headphones,
    category: "Support"
  },
  {
    question: "Can you work with our existing team/developers?",
    answer: "Yes! We can collaborate with your in-house team or take full ownership - whatever works best for your organization.",
    icon: Users,
    category: "Collaboration"
  },
  {
    question: "Do you provide hosting?",
    answer: "We deploy to your hosting (AWS, DigitalOcean, VPS, etc.) and can recommend options. We don't resell hosting.",
    icon: Cloud,
    category: "Infrastructure"
  },
  {
    question: "What if we need changes 6 months after launch?",
    answer: "We keep project documentation and code repositories. We can jump back in anytime for updates or new features.",
    icon: Calendar,
    category: "Long-term"
  },
  {
    question: "How do payments work?",
    answer: "Typically: 30% upfront, 40% mid-project, 30% on delivery. We're flexible for established businesses.",
    icon: CreditCard,
    category: "Pricing"
  },
  {
    question: "Do you work with startups without funding?",
    answer: "Yes, but we're selective. We need clarity on requirements and realistic timelines. Free consultations help us both decide if it's a fit.",
    icon: Rocket,
    category: "Startups"
  }
]

const categories = [
  { id: 'all', label: 'All Questions', icon: MessageSquare, count: faqItems.length },
  { id: 'timeline', label: 'Timeline', icon: Clock, count: faqItems.filter(item => item.category === 'Timeline').length },
  { id: 'pricing', label: 'Pricing', icon: DollarSign, count: faqItems.filter(item => item.category === 'Pricing').length },
  { id: 'process', label: 'Process', icon: RefreshCw, count: faqItems.filter(item => item.category === 'Process').length },
  { id: 'support', label: 'Support', icon: Headphones, count: faqItems.filter(item => item.category === 'Support').length }
]

export default function FAQSection() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [activeCategory, setActiveCategory] = useState('all')
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

  const filteredFaqs = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category.toLowerCase() === activeCategory)

  return (
    <section className={`py-20 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-slate-900 to-slate-800' 
        : 'bg-gradient-to-b from-white to-slate-50'
    }`} id="FAQ">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Common Questions Answered
          </h2>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Clear answers to help you make an informed decision
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all duration-300 ${
                activeCategory === category.id
                  ? isDarkMode
                    ? 'border-blue-500 bg-blue-900/50 text-blue-400 font-semibold'
                    : 'border-blue-600 bg-blue-100 text-blue-600 font-semibold'
                  : isDarkMode
                    ? 'border-slate-700 text-slate-400 hover:border-slate-600 hover:bg-slate-800'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.label}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                activeCategory === category.id
                  ? isDarkMode
                    ? 'bg-blue-500 text-white'
                    : 'bg-blue-600 text-white'
                  : isDarkMode
                    ? 'bg-slate-700 text-slate-300'
                    : 'bg-slate-200 text-slate-600'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700 hover:border-slate-600'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className={`w-full flex items-center justify-between p-6 text-left transition-colors duration-300 ${
                    isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
                    }`}>
                      <faq.icon className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div className="text-left">
                      <h3 className={`text-lg font-semibold mb-1 transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        {faq.question}
                      </h3>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full transition-colors duration-300 ${
                        isDarkMode
                          ? 'bg-slate-700 text-slate-300'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {faq.category}
                      </span>
                    </div>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    } ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}
                  />
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-2">
                    <div className="pl-14">
                      <p className={`leading-relaxed transition-colors duration-300 ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Still Have Questions */}
        <div className={`border rounded-2xl p-8 transition-colors duration-300 ${
          isDarkMode
            ? 'bg-gradient-to-r from-blue-900/30 to-blue-800/30 border-blue-800'
            : 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200'
        }`}>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Still Have Questions?
              </h3>
              <p className={`mb-6 transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                We're here to help. Schedule a free consultation to discuss your 
                specific project needs and get personalized answers.
              </p>
              <div className="space-y-3">
                {[
                  "15-minute discovery call",
                  "No obligation or pressure",
                  "Clear next steps provided",
                  "Fast response guaranteed"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
                    }`}>
                      <CheckIcon className={`w-3 h-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <span className={`transition-colors duration-300 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => setIsContactModalOpen(true)}  
                className="group w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300"
              >
                <CalendarIcon className="w-5 h-5" />
                <span>Schedule Free Consultation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="text-center">
                <div className={`inline-flex items-center gap-2 text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span>Response time: within 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Contact Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: MessageSquare,
              title: "Email Support",
              description: "Get detailed answers to complex questions",
              contact: "hello@papatiger.tech",
              color: "blue"
            },
            {
              icon: Clock,
              title: "Fast Response",
              description: "We reply within 24 hours on weekdays",
              contact: "Mon-Fri, 9am-6pm EST",
              color: "emerald"
            },
            {
              icon: Shield,
              title: "Confidential",
              description: "All conversations protected by NDA",
              contact: "Before sharing details",
              color: "purple"
            }
          ].map((item, index) => (
            <div 
              key={index}
              className={`border rounded-xl p-5 text-center transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700 hover:border-slate-600'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className={`w-12 h-12 ${getColorClass(item.color, isDarkMode).bg} rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300`}>
                <item.icon className={`w-6 h-6 ${getColorClass(item.color, isDarkMode).text}`} />
              </div>
              <h4 className={`font-bold mb-1 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>{item.title}</h4>
              <p className={`text-sm mb-3 transition-colors duration-300 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>{item.description}</p>
              <div className={`text-sm font-medium transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>{item.contact}</div>
            </div>
          ))}
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
        return { bg: 'bg-slate-700', text: 'text-slate-300' }
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
        return { bg: 'bg-brand/10', text: 'text-brand' }
    }
  }
}

// Custom Icons
const CheckIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
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
      strokeWidth={3}
      d="M5 13l4 4L19 7"
    />
  </svg>
)

const CalendarIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
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
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)