'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ChevronRight } from 'lucide-react'
import ContactModal from './ContactModal' // Import the ContactModal component

const NAV_ITEMS = [
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'Case_Studies', label: 'Case Studies', href: '#Case_Studies' },
  { id: 'Process', label: 'Process', href: '#Process' },
  { id: 'Pricing', label: 'Pricing', href: '#Pricing' },
  { id: 'FAQ', label: 'FAQ', href: '#FAQ' },
]

// Mobile Menu Component
function MobileMenu({ isOpen, onClose, activeSection, onNavClick, onCTAClick }: {
  isOpen: boolean
  onClose: () => void
  activeSection: string
  onNavClick: (href: string) => void
  onCTAClick: () => void
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl animate-slideInRight">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <span className="text-xl font-bold text-slate-900">
              Menu
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-slate-600" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavClick(item.href)
                  onClose()
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="p-6 border-t border-slate-200">
            <button
              onClick={() => {
                onCTAClick()
                onClose()
              }}
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Get Free Consultation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Header() {
  const [scrollY, setScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      updateActiveSection()
    }

    const updateActiveSection = () => {
      const sections = NAV_ITEMS.map(item => item.id)
      const scrollPosition = window.scrollY + 100

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    updateActiveSection()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Prevent body scroll when contact modal is open
  useEffect(() => {
    if (isContactModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isContactModalOpen])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleCTAClick = () => {
    setIsContactModalOpen(true)
  }

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrollY > 100
            ? 'bg-white shadow-lg py-3'
            : 'bg-white/95 backdrop-blur-md shadow-sm py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1 transition-transform hover:scale-105"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">SD</span>
              </div>
              <span className="text-xl font-bold text-slate-900">
                Dev<span className="text-blue-600">Agency</span>
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    activeSection === item.id
                      ? 'text-blue-700 bg-blue-50 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Desktop CTA Button */}
              <button
                onClick={handleCTAClick}
                className="ml-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
                aria-label="Get free consultation"
              >
                <span>Get Free Consultation</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-slate-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onNavClick={handleNavClick}
        onCTAClick={handleCTAClick}
      />

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={handleCloseContactModal}
      />
    </>
  )
}