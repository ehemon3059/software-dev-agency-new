'use client'

import { X, ChevronRight } from 'lucide-react'
import { MobileMenuProps } from '@/types'

const NAV_ITEMS = [
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'Case_Studies', label: 'Case Studies', href: '#Case_Studies' },
  { id: 'Process', label: 'Process', href: '#Process' },
  { id: 'Pricing', label: 'Pricing', href: '#Pricing' },
  { id: 'FAQ', label: 'FAQ', href: '#FAQ' },
]

interface ExtendedMobileMenuProps extends MobileMenuProps {
  onNavClick: (href: string) => void
  onCTAClick: () => void
}

export default function MobileMenu({
  isOpen,
  onClose,
  activeSection,
  onNavClick,
  onCTAClick,
}: ExtendedMobileMenuProps) {
  const handleItemClick = (href: string) => {
    onNavClick(href)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SD</span>
              </div>
              <span className="text-xl font-bold text-primary">
                Dev<span className="text-brand">Agency</span>
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-primary" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-6">
            <div className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.href)}
                  className={`w-full px-4 py-3 rounded-lg text-left font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand ${
                    activeSection === item.id
                      ? 'text-brand bg-brand/10'
                      : 'text-primary hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          {/* CTA Button */}
          <div className="p-6 border-t">
            <button
              onClick={() => {
                onCTAClick()
                onClose()
              }}
              className="w-full px-6 py-3.5 bg-brand text-white font-semibold rounded-lg hover:bg-brand-dark transition-colors duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
              aria-label="Get free consultation"
            >
              <span>Get Free Consultation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}