'use client'
import { sendEmailAction } from '@/app/actions/email'
import { useState, useEffect } from 'react'
import { X, Send, Mail, Calendar, CheckCircle, MessageCircle, Clock, User, CalendarDays, Clock4, ChevronLeft, ChevronRight } from 'lucide-react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: 'inquiry' | 'consultation'
  isDarkMode?: boolean
}

type ConsultationTime = {
  id: string
  label: string
  value: string
}

function useTheme() {
  const [d, setD] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    const c = () => setD(document.documentElement.classList.contains('dark'))
    c()
    const o = new MutationObserver(c)
    o.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => o.disconnect()
  }, [])
  
  if (!mounted) return false
  return d
}

export default function ContactModal({ isOpen, onClose, defaultTab = 'inquiry' }: ContactModalProps) {
  const isDark = useTheme()
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  
  // Consultation form states
  const [consultationData, setConsultationData] = useState({
    topic: '',
    preferredDate: '',
    preferredTime: '',
    additionalNotes: ''
  })
  
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmittingConsultation, setIsSubmittingConsultation] = useState(false)
  const [isConsultationSubmitted, setIsConsultationSubmitted] = useState(false)
  const [activeSection, setActiveSection] = useState<'inquiry' | 'consultation'>(defaultTab)
  const [mounted, setMounted] = useState(false)

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

  const availableTimes: ConsultationTime[] = [
    { id: 'morning', label: 'Morning (10 AM - 12 PM)', value: 'morning' },
    { id: 'afternoon', label: 'Afternoon (2 PM - 4 PM)', value: 'afternoon' },
    { id: 'evening', label: 'Evening (7 PM - 9 PM)', value: 'evening' }
  ]

  // Calendar helper functions
  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear()
  }

  const getCalendarDays = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days: Array<{date: Date, isOtherMonth: boolean}> = []
    
    const firstDayOfWeek = firstDay.getDay()
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i)
      days.push({ date: prevDate, isOtherMonth: true })
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(year, month, i)
      days.push({ date: currentDate, isOtherMonth: false })
    }
    
    const totalCells = 42
    const nextMonthDays = totalCells - days.length
    for (let i = 1; i <= nextMonthDays; i++) {
      const nextDate = new Date(year, month + 1, i)
      days.push({ date: nextDate, isOtherMonth: true })
    }
    
    return days
  }

  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const selectedDate = new Date(date)
    selectedDate.setHours(0, 0, 0, 0)
    return selectedDate < today || date.getDay() === 0 || date.getDay() === 6
  }

  const quickDates = [
    { label: 'Tomorrow', getDate: () => {
      const date = new Date()
      date.setDate(date.getDate() + 1)
      while (date.getDay() === 0 || date.getDay() === 6) {
        date.setDate(date.getDate() + 1)
      }
      return date
    }},
    { label: 'Next Monday', getDate: () => {
      const date = new Date()
      date.setDate(date.getDate() + ((7 - date.getDay() + 1) % 7 || 7))
      return date
    }},
    { label: 'In 3 days', getDate: () => {
      const date = new Date()
      date.setDate(date.getDate() + 3)
      while (date.getDay() === 0 || date.getDay() === 6) {
        date.setDate(date.getDate() + 1)
      }
      return date
    }}
  ]

  // Handle mount/unmount animations
  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      document.body.style.overflow = 'hidden'
    } else {
      const timer = setTimeout(() => setMounted(false), 300)
      document.body.style.overflow = 'unset'
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleClose = () => {
    onClose()
    setTimeout(resetForms, 300)
  }

  const resetForms = () => {
    setFormData({ name: '', email: '', phone: '', service: '', message: '' })
    setConsultationData({ topic: '', preferredDate: '', preferredTime: '', additionalNotes: '' })
    setCurrentMonth(new Date())
    setActiveSection('inquiry')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleConsultationInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setConsultationData({ ...consultationData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const result = await sendEmailAction(formData, 'inquiry')

    if (result.success) {
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        handleClose()
      }, 3000)
    } else {
      alert(`Failed to send: ${result.error}`)
    }

    setIsSubmitting(false)
  }

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingConsultation(true)

    const combinedData = {
      ...consultationData,
      name: formData.name,
      email: formData.email
    }

    const result = await sendEmailAction(combinedData, 'consultation')

    if (result.success) {
      setIsConsultationSubmitted(true)
      setTimeout(() => {
        setIsConsultationSubmitted(false)
        handleClose()
      }, 3000)
    } else {
      alert(`Failed to send: ${result.error}`)
    }

    setIsSubmittingConsultation(false)
  }

  const handleWhatsAppClick = () => {
    const whatsappNumber = '8801721821456'
    const message = encodeURIComponent(
      `Hi! I'd like to discuss a project.\n\nName: ${formData.name || 'Not provided'}\nEmail: ${formData.email || 'Not provided'}\nService: ${formData.service || 'Not specified'}`
    )
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
  }

  if (!mounted && !isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={handleClose}
      style={{
        backgroundColor: isOpen ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0)',
        backdropFilter: isOpen ? 'blur(12px)' : 'blur(0px)',
        WebkitBackdropFilter: isOpen ? 'blur(12px)' : 'blur(0px)',
        fontFamily: "'Quicksand', sans-serif"
      }}
    >
      <div
        className={`relative rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl transition-all duration-300 ease-out border-2 ${
          isDark ? 'bg-gray-900 border-orange-500/20' : 'bg-white border-orange-200'
        } ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tiger accent line */}
        <div className="h-1 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className={`absolute top-4 right-4 z-20 p-2 rounded-full transition-all duration-200 ${
            isDark ? 'text-gray-400 hover:text-orange-400 hover:bg-gray-800' : 'text-gray-400 hover:text-orange-600 hover:bg-orange-50'
          }`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Overlays */}
        {isSubmitted && (
          <div className={`absolute inset-0 z-30 flex flex-col items-center justify-center p-8 transition-all duration-300 ${
            isDark ? 'bg-gray-900' : 'bg-white'
          } ${isSubmitted ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 animate-bounce ${
              isDark ? 'bg-orange-500/20' : 'bg-orange-100'
            }`}>
              <CheckCircle className={`w-10 h-10 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
            </div>
            <h3 className={`text-3xl font-black mb-3 ${isDark ? 'text-gray-50' : 'text-gray-900'}`} style={{ fontFamily: "'Rubik', sans-serif" }}>
              Thank You! 🐯
            </h3>
            <p className={`text-center max-w-md ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              We've received your inquiry and will get back to you within 24 hours. 🔥
            </p>
          </div>
        )}

        {isConsultationSubmitted && (
          <div className={`absolute inset-0 z-30 flex flex-col items-center justify-center p-8 transition-all duration-300 ${
            isDark ? 'bg-gray-900' : 'bg-white'
          } ${isConsultationSubmitted ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 animate-bounce ${
              isDark ? 'bg-orange-500/20' : 'bg-orange-100'
            }`}>
              <Calendar className={`w-10 h-10 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
            </div>
            <h3 className={`text-3xl font-black mb-3 ${isDark ? 'text-gray-50' : 'text-gray-900'}`} style={{ fontFamily: "'Rubik', sans-serif" }}>
              Consultation Requested! 🎯
            </h3>
            <p className={`text-center max-w-md mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              We've received your consultation request. We'll review it and confirm the schedule via email. 📧
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              You'll hear from us within 12 hours. ⚡
            </p>
          </div>
        )}

        {/* Header */}
        <div className={`p-8 pb-6 border-b-2 ${isDark ? 'border-orange-500/20' : 'border-orange-200'}`}>
          <h2 className={`text-3xl font-black mb-2 ${isDark ? 'text-gray-50' : 'text-gray-900'}`} style={{ fontFamily: "'Rubik', sans-serif" }}>
            Let's Work Together 🤝
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Choose how you'd like to start our conversation 🚀
          </p>
        </div>

        {/* Section Toggle */}
        <div className={`flex border-b-2 ${isDark ? 'border-orange-500/20' : 'border-orange-200'}`}>
          <button
            onClick={() => setActiveSection('inquiry')}
            className={`flex-1 py-4 text-center font-bold transition-all duration-200 ${
              activeSection === 'inquiry'
                ? isDark
                  ? 'text-orange-400 border-b-2 border-orange-500 bg-orange-500/10'
                  : 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                : isDark
                  ? 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            style={{ fontFamily: "'Rubik', sans-serif" }}
          >
            <div className="flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>Project Inquiry 💬</span>
            </div>
          </button>
          <button
            onClick={() => setActiveSection('consultation')}
            className={`flex-1 py-4 text-center font-bold transition-all duration-200 ${
              activeSection === 'consultation'
                ? isDark
                  ? 'text-orange-400 border-b-2 border-orange-500 bg-orange-500/10'
                  : 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                : isDark
                  ? 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            style={{ fontFamily: "'Rubik', sans-serif" }}
          >
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Schedule Consultation 📅</span>
            </div>
          </button>
        </div>

        {/* Main Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Project Inquiry Form */}
          {activeSection === 'inquiry' && (
            <div className={`space-y-6 transition-all duration-300 ${
              activeSection === 'inquiry' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}>
              <div className={`rounded-xl p-4 mb-2 border-2 ${
                isDark ? 'bg-orange-500/10 border-orange-500/20' : 'bg-orange-50 border-orange-200'
              }`}>
                <div className="flex items-start gap-3">
                  <MessageCircle className={`w-5 h-5 mt-0.5 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
                  <div>
                    <h3 className={`font-black mb-1 ${isDark ? 'text-gray-50' : 'text-gray-900'}`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                      Tell us about your project 🐯
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Fill out the form below and we'll provide a detailed proposal with timeline and cost estimates. 🔥
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                        isDark 
                          ? 'bg-gray-800 border-orange-500/20 text-gray-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20' 
                          : 'bg-white border-orange-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-100'
                      }`}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                        isDark 
                          ? 'bg-gray-800 border-orange-500/20 text-gray-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20' 
                          : 'bg-white border-orange-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-100'
                      }`}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                    Phone Number <span className={`text-sm font-normal ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                      isDark 
                        ? 'bg-gray-800 border-orange-500/20 text-gray-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20' 
                        : 'bg-white border-orange-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-100'
                    }`}
                    placeholder="+880 1XXX-XXXXXX"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                    Service Interest *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                      isDark 
                        ? 'bg-gray-800 border-orange-500/20 text-gray-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20' 
                        : 'bg-white border-orange-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-100'
                    }`}
                  >
                    <option value="">Select a service</option>
                    <option value="custom-web-app">Custom Web Application</option>
                    <option value="fix-upgrade">Application Fix & Upgrade</option>
                    <option value="api">API Development</option>
                    <option value="devops">Deployment & DevOps</option>
                    <option value="desktop">Desktop Application</option>
                    <option value="consultation">Technical Consultation</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 resize-none ${
                      isDark 
                        ? 'bg-gray-800 border-orange-500/20 text-gray-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20' 
                        : 'bg-white border-orange-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-100'
                    }`}
                    placeholder="Describe your project requirements, goals, and any specific needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white font-black rounded-lg hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  style={{ fontFamily: "'Rubik', sans-serif" }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Inquiry... 🚀</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Project Inquiry 🐯</span>
                    </>
                  )}
                </button>
              </form>

              <div className={`pt-6 border-t-2 ${isDark ? 'border-orange-500/20' : 'border-orange-200'}`}>
                <p className={`text-sm mb-3 text-center font-bold ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                  Or contact us directly 📞
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleWhatsAppClick}
                    className="flex-1 px-4 py-3 bg-green-500 text-white font-black rounded-lg hover:bg-green-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    style={{ fontFamily: "'Rubik', sans-serif" }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp 💬
                  </button>

                  <button
                    onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=hello@papatiger.tech', '_blank')}
                    className={`flex-1 px-4 py-3 font-black rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl ${
                      isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-800 text-white hover:bg-gray-900'
                    }`}
                    style={{ fontFamily: "'Rubik', sans-serif" }}
                  >
                    <Mail className="w-4 h-4" />
                    Email 📧
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Consultation Scheduling Form */}
          {activeSection === 'consultation' && (
            <div className={`space-y-6 transition-all duration-300 ${
              activeSection === 'consultation' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}>
              <div className={`rounded-xl p-5 mb-2 border-2 ${
                isDark ? 'bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20' : 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isDark ? 'bg-orange-500/20' : 'bg-orange-500'
                  }`}>
                    <Clock className={`w-5 h-5 ${isDark ? 'text-orange-400' : 'text-white'}`} />
                  </div>
                  <div>
                    <h3 className={`font-black mb-2 ${isDark ? 'text-gray-50' : 'text-gray-900'}`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                      30-Minute Free Consultation 🎯
                    </h3>
                    <div className={`space-y-1 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <p>• No commitment required ✅</p>
                      <p>• Expert technical advice 💡</p>
                      <p>• Discuss project feasibility & scope 🔧</p>
                      <p>• Get preliminary timeline & cost estimates 💰</p>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleConsultationSubmit} className="space-y-5">
                <div className={`rounded-lg p-4 border-2 ${isDark ? 'bg-gray-800/50 border-orange-500/20' : 'bg-gray-50 border-orange-200'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <User className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <h4 className={`font-black ${isDark ? 'text-gray-200' : 'text-gray-700'}`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                      Your Information 👤
                    </h4>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className={`px-3 py-2 rounded border-2 transition-all ${
                        isDark 
                          ? 'bg-gray-900 border-orange-500/20 text-gray-100 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20' 
                          : 'bg-white border-orange-200 text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-100'
                      }`}
                    />
                    <input
                      type="email"
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className={`px-3 py-2 rounded border-2 transition-all ${
                        isDark 
                          ? 'bg-gray-900 border-orange-500/20 text-gray-100 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20' 
                          : 'bg-white border-orange-200 text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-100'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                    What would you like to discuss? * 💬
                  </label>
                  <input
                    type="text"
                    name="topic"
                    value={consultationData.topic}
                    onChange={handleConsultationInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                      isDark 
                        ? 'bg-gray-800 border-orange-500/20 text-gray-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20' 
                        : 'bg-white border-orange-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-100'
                    }`}
                    placeholder="e.g., 'Web app development for e-commerce', 'API integration project'"
                  />
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Date Picker */}
                  <div>
                    <label className={`block text-sm font-bold mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4" />
                        Preferred Date * 📅
                      </div>
                    </label>

                    <div className="mb-4">
                      <p className={`text-xs mb-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Quick select:</p>
                      <div className="flex flex-wrap gap-2">
                        {quickDates.map((option) => {
                          const date = option.getDate()
                          const dateString = date.toISOString().split('T')[0]
                          
                          return (
                            <button
                              key={option.label}
                              type="button"
                              onClick={() => {
                                setConsultationData({...consultationData, preferredDate: dateString})
                                setCurrentMonth(date)
                              }}
                              className={`px-3 py-1.5 text-xs font-bold rounded-full border-2 transition-all duration-200 ${
                                consultationData.preferredDate === dateString
                                  ? isDark
                                    ? 'border-orange-500 bg-orange-500/20 text-orange-400'
                                    : 'border-orange-500 bg-orange-500 text-white'
                                  : isDark
                                    ? 'border-gray-700 text-gray-400 hover:border-orange-500/40 hover:bg-orange-500/10'
                                    : 'border-gray-300 text-gray-600 hover:border-orange-300 hover:bg-orange-50'
                              }`}
                              style={{ fontFamily: "'Rubik', sans-serif" }}
                            >
                              {option.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className={`border-2 rounded-xl p-4 ${
                      isDark ? 'bg-gray-800 border-orange-500/20' : 'bg-white border-orange-200'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <button
                          type="button"
                          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                          className={`p-2 rounded-lg transition-colors ${
                            isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                          }`}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className={`font-black ${isDark ? 'text-gray-100' : 'text-gray-900'}`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                        <button
                          type="button"
                          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                          className={`p-2 rounded-lg transition-colors ${
                            isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                          }`}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                          <div key={day} className={`text-center text-xs font-bold py-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                            {day}
                          </div>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-7 gap-1">
                        {getCalendarDays(currentMonth).map((day, idx) => {
                          const isToday = isSameDay(day.date, new Date())
                          const isSelected = consultationData.preferredDate === day.date.toISOString().split('T')[0]
                          const isDisabled = isDateDisabled(day.date) || day.isOtherMonth
                          
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => !isDisabled && setConsultationData({
                                ...consultationData,
                                preferredDate: day.date.toISOString().split('T')[0]
                              })}
                              disabled={isDisabled}
                              className={`h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                                isSelected
                                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white'
                                  : isToday && !isDisabled
                                  ? isDark 
                                    ? 'bg-orange-500/20 text-orange-400'
                                    : 'bg-orange-100 text-orange-700'
                                  : isDisabled
                                  ? isDark
                                    ? 'text-gray-700 cursor-not-allowed'
                                    : 'text-gray-300 cursor-not-allowed'
                                  : isDark
                                    ? 'hover:bg-gray-700 text-gray-300'
                                    : 'hover:bg-gray-100 text-gray-700'
                              } ${day.isOtherMonth ? 'opacity-40' : ''}`}
                              style={{ fontFamily: "'Rubik', sans-serif" }}
                            >
                              {day.date.getDate()}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {consultationData.preferredDate && (
                      <div className={`mt-4 p-3 rounded-lg border-2 transition-all duration-300 ${
                        isDark ? 'bg-orange-500/10 border-orange-500/20' : 'bg-orange-50 border-orange-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CalendarDays className={`w-4 h-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
                            <span className={`text-sm font-bold ${isDark ? 'text-orange-400' : 'text-orange-700'}`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                              Selected: {new Date(consultationData.preferredDate).toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setConsultationData({...consultationData, preferredDate: ''})}
                            className={`text-sm font-bold hover:underline ${isDark ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-800'}`}
                            style={{ fontFamily: "'Rubik', sans-serif" }}
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Time Slot Selection */}
                  <div>
                    <label className={`block text-sm font-bold mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                      <div className="flex items-center gap-2">
                        <Clock4 className="w-4 h-4" />
                        Preferred Time Slot * ⏰
                      </div>
                    </label>
                    <div className="space-y-3">
                      {availableTimes.map((time) => (
                        <button
                          key={time.id}
                          type="button"
                          onClick={() => setConsultationData({...consultationData, preferredTime: time.value})}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-left font-bold ${
                            consultationData.preferredTime === time.value
                              ? isDark
                                ? 'border-orange-500 bg-orange-500/20 text-orange-400'
                                : 'border-orange-500 bg-orange-50 text-orange-700'
                              : isDark
                                ? 'border-gray-700 text-gray-300 hover:border-orange-500/40 hover:bg-gray-800'
                                : 'border-gray-200 text-gray-700 hover:border-orange-300 hover:bg-gray-50'
                          }`}
                          style={{ fontFamily: "'Rubik', sans-serif" }}
                        >
                          <div>{time.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                    Additional Notes (Optional) 📝
                  </label>
                  <textarea
                    name="additionalNotes"
                    value={consultationData.additionalNotes}
                    onChange={handleConsultationInputChange}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 resize-none ${
                      isDark 
                        ? 'bg-gray-800 border-orange-500/20 text-gray-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20' 
                        : 'bg-white border-orange-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-100'
                    }`}
                    placeholder="Any specific questions or topics you want to make sure we cover?"
                  />
                </div>

                <div className={`border-2 rounded-lg p-4 ${
                  isDark ? 'bg-amber-500/10 border-amber-500/20' : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 ${
                      isDark ? 'bg-amber-500/20' : 'bg-yellow-100'
                    }`}>
                      <span className={`text-sm font-black ${isDark ? 'text-amber-400' : 'text-yellow-600'}`}>!</span>
                    </div>
                    <div>
                      <p className={`text-sm ${isDark ? 'text-amber-300' : 'text-yellow-800'}`}>
                        <strong className="font-black" style={{ fontFamily: "'Rubik', sans-serif" }}>Note:</strong> This is a request for consultation. We'll review your request and confirm the schedule via email. We may suggest an alternative time if needed. ⚡
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingConsultation || !consultationData.preferredDate || !consultationData.preferredTime}
                  className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black rounded-lg hover:shadow-xl hover:shadow-green-500/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  style={{ fontFamily: "'Rubik', sans-serif" }}
                >
                  {isSubmittingConsultation ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Request... 🚀</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5" />
                      <span>Request Free Consultation 🐯</span>
                    </>
                  )}
                </button>

                <p className={`text-sm text-center ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  We'll respond with a confirmed time within 12 hours ⚡
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
