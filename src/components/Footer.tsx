'use client'

import { 
  Mail, 
  MessageSquare, 
  MapPin, 
  Clock,
  Heart,
  Linkedin,
  Github,
  Twitter,
  ExternalLink,
  Zap,
  Shield,
  Award
} from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
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

  return (
    <footer className={`relative transition-colors duration-300 ${
      isDarkMode
        ? 'bg-gradient-to-b from-gray-950 via-orange-950/10 to-gray-950'
        : 'bg-gradient-to-b from-gray-900 via-orange-900/20 to-gray-950'
    }`}
    style={{ fontFamily: "'Quicksand', sans-serif" }}
    >
      {/* Tiger Accent Line */}
      <div className="h-1 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600" />
      
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="py-12">
          {/* Special Tiger Badge at Top */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-orange-500/20 border-2 border-orange-500/30 rounded-full">
              <span className="text-4xl">🐯</span>
              <span className={`text-xl font-black transition-colors duration-300 ${
                isDarkMode ? 'text-gray-50' : 'text-white'
              }`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                Built by Tigers, For Innovators
              </span>
              <span className="text-4xl">🔥</span>
            </div>
            <p className={`mt-4 text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-300'
            }`}>
              Crafting powerful web solutions with passion and precision ⚡
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Column 1: Contact Information */}
            <div>
              <h3 className={`text-lg font-black mb-6 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-50' : 'text-white'
              }`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                Contact Information 📞
              </h3>
              <div className="space-y-4">
                <a 
                  href="mailto:hello@papatiger.tech"
                  className={`flex items-center gap-3 transition-colors group ${
                    isDarkMode
                      ? 'text-gray-300 hover:text-orange-400'
                      : 'text-gray-300 hover:text-orange-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isDarkMode
                      ? 'bg-orange-500/20 group-hover:bg-orange-500/30'
                      : 'bg-orange-500/30 group-hover:bg-orange-500/40'
                  }`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold" style={{ fontFamily: "'Rubik', sans-serif" }}>Email us 📧</div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                      hello@papatiger.tech
                    </div>
                  </div>
                </a>

                <a 
                  href="https://wa.me/880XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 transition-colors group ${
                    isDarkMode
                      ? 'text-gray-300 hover:text-emerald-400'
                      : 'text-gray-300 hover:text-emerald-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isDarkMode
                      ? 'bg-emerald-500/20 group-hover:bg-emerald-500/30'
                      : 'bg-emerald-500/30 group-hover:bg-emerald-500/40'
                  }`}>
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold" style={{ fontFamily: "'Rubik', sans-serif" }}>WhatsApp 💬</div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                      +8801-721-821456
                    </div>
                  </div>
                </a>

                <div className={`flex items-center gap-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-300'}`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isDarkMode ? 'bg-amber-500/20' : 'bg-amber-500/30'
                  }`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold" style={{ fontFamily: "'Rubik', sans-serif" }}>Location 🌍</div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                      Dhaka, Bangladesh (GMT+6)
                    </div>
                  </div>
                </div>

                <div className={`flex items-center gap-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-300'}`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isDarkMode ? 'bg-orange-500/20' : 'bg-orange-500/30'
                  }`}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold" style={{ fontFamily: "'Rubik', sans-serif" }}>Response Time ⚡</div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                      Within 24 hours
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className={`text-lg font-black mb-6 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-50' : 'text-white'
              }`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                Quick Links 🔗
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "CaseStudies", href: "#CaseStudies" },
                  { label: "ProblemSolution", href: "#ProblemSolution" },
                  { label: "ProcessSection", href: "#ProcessSection" },
                  // { label: "Founders", href: "#Founders" },
                  // { label: "Blog", href: "#", optional: true },
                  { label: "Pricing", href: "#Pricing" },
                  { label: "FAQ", href: "#FAQ" },
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className={`flex items-center gap-2 transition-colors group py-1 ${
                        isDarkMode
                          ? 'text-gray-300 hover:text-orange-400'
                          : 'text-gray-300 hover:text-orange-300'
                      }`}
                    >
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="font-medium">{link.label}</span>
                      {link.optional && (
                        <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                          isDarkMode
                            ? 'bg-gray-800 text-gray-400'
                            : 'bg-gray-800 text-gray-400'
                        }`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                          Coming Soon
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services */}
            <div>
              <h3 className={`text-lg font-black mb-6 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-50' : 'text-white'
              }`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                Services 🚀
              </h3>
              <ul className="space-y-3">
                {[
                  "Custom Web Development",
                  "Application Fix & Upgrade",
                  "API Development",
                  "Deployment & DevOps"
                ].map((service, index) => (
                  <li key={index}>
                    <div className={`flex items-center gap-2 group py-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-300'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full group-hover:scale-125 transition-transform ${
                        isDarkMode ? 'bg-orange-400' : 'bg-orange-400'
                      }`} />
                      <span className="font-medium">{service}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Legal & Trust */}
            <div>
              <h3 className={`text-lg font-black mb-6 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-50' : 'text-white'
              }`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                Legal & Trust 🛡️
              </h3>
              <ul className="space-y-3">
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Refund Policy"
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className={`transition-colors py-1 inline-block font-medium ${
                        isDarkMode
                          ? 'text-gray-300 hover:text-orange-400'
                          : 'text-gray-300 hover:text-orange-300'
                      }`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t py-8 ${isDarkMode ? 'border-orange-500/20' : 'border-orange-500/30'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`}>
                <span className="font-bold" style={{ fontFamily: "'Rubik', sans-serif" }}>
                  © {currentYear} papatiger.tech 🐯
                </span>
                <span className="hidden sm:inline">Built with</span>
                <Heart className="w-4 h-4 text-red-500 inline animate-pulse" />
                <span className="hidden sm:inline">in Dhaka, Bangladesh.</span>
              </div>
              <div className={`sm:hidden text-sm mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Built with care in Dhaka, Bangladesh 🇧🇩
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              <a
                href="https://linkedin.com/company"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all hover:scale-110 ${
                  isDarkMode
                    ? 'text-gray-400 hover:text-orange-400'
                    : 'text-gray-400 hover:text-orange-300'
                }`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all hover:scale-110 ${
                  isDarkMode
                    ? 'text-gray-400 hover:text-orange-400'
                    : 'text-gray-400 hover:text-orange-300'
                }`}
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all hover:scale-110 ${
                  isDarkMode
                    ? 'text-gray-400 hover:text-orange-400'
                    : 'text-gray-400 hover:text-orange-300'
                }`}
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Trust Badges - SPECIAL TIGER EDITION */}
          <div className={`mt-8 pt-6 border-t ${isDarkMode ? 'border-orange-500/20' : 'border-orange-500/30'}`}>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                { icon: Shield, text: "Secure & Encrypted", color: "emerald" },
                { icon: Award, text: "100% Client Satisfaction", color: "orange" },
                { icon: Zap, text: "GDPR Compliant", color: "amber" }
              ].map((badge, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center gap-3 px-4 py-3 rounded-lg border-2 transition-all hover:scale-105 ${
                    isDarkMode
                      ? `border-${badge.color}-500/20 bg-${badge.color}-500/10`
                      : `border-${badge.color}-500/30 bg-${badge.color}-500/20`
                  }`}
                >
                  <badge.icon className={`w-5 h-5 ${
                    badge.color === 'emerald' ? 'text-emerald-400' :
                    badge.color === 'orange' ? 'text-orange-400' :
                    'text-amber-400'
                  }`} />
                  <span className={`text-sm font-bold ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-200'
                  }`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                    {badge.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Final Tiger Message */}
            <div className="text-center">
              <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-colors ${
                isDarkMode
                  ? 'border-orange-500/30 bg-orange-500/10'
                  : 'border-orange-500/40 bg-orange-500/20'
              }`}>
                <span className="text-2xl">🐾</span>
                <span className={`text-sm font-black ${
                  isDarkMode ? 'text-orange-400' : 'text-orange-300'
                }`} style={{ fontFamily: "'Rubik', sans-serif" }}>
                  ROAR-SOME PROJECTS START HERE
                </span>
                <span className="text-2xl">🔥</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tiger Stripe */}
      <div className="h-2 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600" />
    </footer>
  )
}
