'use client'
import { sendEmailAction } from '@/app/actions/email'
import { useState, useEffect } from 'react'
import { X, Send, Mail, Calendar, CheckCircle, MessageCircle, Clock, User, CalendarDays, Clock4, ChevronLeft, ChevronRight } from 'lucide-react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: 'inquiry' | 'consultation'
}

type ConsultationTime = {
  id: string
  label: string
  value: string
}

export default function ContactModal({ isOpen, onClose, defaultTab = 'inquiry' }: ContactModalProps) {
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
  // const [activeSection, setActiveSection] = useState<'inquiry' | 'consultation'>('inquiry')

    const [activeSection, setActiveSection] = useState<'inquiry' | 'consultation'>(defaultTab)
  const [mounted, setMounted] = useState(false)

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

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsSubmitting(true)
  //   await new Promise(resolve => setTimeout(resolve, 1500))
  //   console.log('Form submitted:', formData)
  //   setIsSubmitting(false)
  //   setIsSubmitted(true)
  //   setTimeout(() => {
  //     setIsSubmitted(false)
  //     handleClose()
  //   }, 3000)
  // }

      const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)

      // CALL THE SERVER ACTION
      const result = await sendEmailAction(formData, 'inquiry')

      if (result.success) {
        setIsSubmitted(true)
        setTimeout(() => {
          setIsSubmitted(false)
          handleClose()
        }, 3000)
      } else {
        alert("Failed to send inquiry. Please try again.")
      }
      setIsSubmitting(false)
    }

  // const handleConsultationSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsSubmittingConsultation(true)
  //   await new Promise(resolve => setTimeout(resolve, 1500))
  //   console.log('Consultation requested:', {
  //     ...consultationData,
  //     userInfo: { name: formData.name || 'Not provided', email: formData.email || 'Not provided' }
  //   })
  //   setIsSubmittingConsultation(false)
  //   setIsConsultationSubmitted(true)
  //   setTimeout(() => {
  //     setIsConsultationSubmitted(false)
  //     handleClose()
  //   }, 3000)
  // }

      const handleConsultationSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmittingConsultation(true)

      // COMBINE DATA FOR THE ACTION
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
        alert("Failed to schedule consultation.")
      }
      setIsSubmittingConsultation(false)
    }



  const handleWhatsAppClick = () => {
    const whatsappNumber = '8801XXXXXXXXX'
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
        backgroundColor: isOpen ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
        backdropFilter: isOpen ? 'blur(8px)' : 'blur(0px)',
        WebkitBackdropFilter: isOpen ? 'blur(8px)' : 'blur(0px)'
      }}
    >
      <div
        className={`relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl transition-all duration-300 ease-out ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Overlays */}
        {isSubmitted && (
          <div className={`absolute inset-0 z-30 bg-white flex flex-col items-center justify-center p-8 transition-all duration-300 ${
            isSubmitted ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Thank You!</h3>
            <p className="text-gray-600 text-center max-w-md">
              We've received your inquiry and will get back to you within 24 hours.
            </p>
          </div>
        )}

        {isConsultationSubmitted && (
          <div className={`absolute inset-0 z-30 bg-white flex flex-col items-center justify-center p-8 transition-all duration-300 ${
            isConsultationSubmitted ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <Calendar className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Consultation Requested!</h3>
            <p className="text-gray-600 text-center max-w-md mb-4">
              We've received your consultation request. We'll review it and confirm the schedule via email.
            </p>
            <p className="text-sm text-gray-500">You'll hear from us within 12 hours.</p>
          </div>
        )}

        {/* Header */}
        <div className="p-8 pb-6 border-b border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Let's Work Together</h2>
          <p className="text-gray-600">Choose how you'd like to start our conversation</p>
        </div>

        {/* Section Toggle */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveSection('inquiry')}
            className={`flex-1 py-4 text-center font-medium transition-all duration-200 ${
              activeSection === 'inquiry'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>Project Inquiry</span>
            </div>
          </button>
          <button
            onClick={() => setActiveSection('consultation')}
            className={`flex-1 py-4 text-center font-medium transition-all duration-200 ${
              activeSection === 'consultation'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Schedule Consultation</span>
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
              <div className="bg-blue-50 rounded-xl p-4 mb-2">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Tell us about your project</h3>
                    <p className="text-sm text-gray-600">
                      Fill out the form below and we'll provide a detailed proposal with timeline and cost estimates.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 text-gray-900 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 text-gray-900 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-gray-500 text-sm">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-gray-900 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    placeholder="+880 1XXX-XXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Interest *</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-gray-900 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Details *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 text-gray-900 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 resize-none"
                    placeholder="Describe your project requirements, goals, and any specific needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Project Inquiry</span>
                    </>
                  )}
                </button>
              </form>

              <div className="pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-600 mb-3 text-center">Or contact us directly</p>
                <div className="flex gap-3">
                  <button
                    onClick={handleWhatsAppClick}
                    className="flex-1 px-4 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </button>
                  <button
                    onClick={() => window.location.href = 'mailto:hello@example.com'}
                    className="flex-1 px-4 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Email
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
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 mb-2">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">30-Minute Free Consultation</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>• No commitment required</p>
                      <p>• Expert technical advice</p>
                      <p>• Discuss project feasibility & scope</p>
                      <p>• Get preliminary timeline & cost estimates</p>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleConsultationSubmit} className="space-y-5">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-gray-500" />
                    <h4 className="font-medium text-gray-700">Your Information</h4>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="px-3 py-2 text-gray-900 rounded border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                    />
                    <input
                      type="email"
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="px-3 py-2 text-gray-900 rounded border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What would you like to discuss? *
                  </label>
                  <input
                    type="text"
                    name="topic"
                    value={consultationData.topic}
                    onChange={handleConsultationInputChange}
                    required
                    className="w-full px-4 py-3 text-gray-900 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    placeholder="e.g., 'Web app development for e-commerce', 'API integration project'"
                  />
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Date Picker */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4" />
                        Preferred Date *
                      </div>
                    </label>

                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Quick select:</p>
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
                              className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 ${
                                consultationData.preferredDate === dateString
                                  ? 'border-blue-500 bg-blue-500 text-white'
                                  : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                              }`}
                            >
                              {option.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-4 bg-white">
                      <div className="flex items-center justify-between mb-4">
                        <button
                          type="button"
                          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="font-medium text-gray-900">
                          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                        <button
                          type="button"
                          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                          <div key={day} className="text-center text-xs text-gray-500 font-medium py-1">
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
                              className={`h-9 rounded-lg flex items-center justify-center text-sm transition-all duration-200 ${
                                isSelected
                                  ? 'bg-blue-500 text-white'
                                  : isToday && !isDisabled
                                  ? 'bg-blue-100 text-blue-700'
                                  : isDisabled
                                  ? 'text-gray-300 cursor-not-allowed'
                                  : 'hover:bg-gray-100 text-gray-700'
                              } ${day.isOtherMonth ? 'opacity-40' : ''}`}
                            >
                              {day.date.getDate()}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {consultationData.preferredDate && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100 transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-700">
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
                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Time Slot Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      <div className="flex items-center gap-2">
                        <Clock4 className="w-4 h-4" />
                        Preferred Time Slot *
                      </div>
                    </label>
                    <div className="space-y-3">
                      {availableTimes.map((time) => (
                        <button
                          key={time.id}
                          type="button"
                          onClick={() => setConsultationData({...consultationData, preferredTime: time.value})}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-left ${
                            consultationData.preferredTime === time.value
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="font-medium">{time.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    name="additionalNotes"
                    value={consultationData.additionalNotes}
                    onChange={handleConsultationInputChange}
                    rows={3}
                    className="w-full px-4 py-3 text-gray-900 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 resize-none"
                    placeholder="Any specific questions or topics you want to make sure we cover?"
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-yellow-600 text-sm">!</span>
                    </div>
                    <div>
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> This is a request for consultation. We'll review your request and confirm the schedule via email. We may suggest an alternative time if needed.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingConsultation || !consultationData.preferredDate || !consultationData.preferredTime}
                  className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isSubmittingConsultation ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5" />
                      <span>Request Free Consultation</span>
                    </>
                  )}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  We'll respond with a confirmed time within 12 hours
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}