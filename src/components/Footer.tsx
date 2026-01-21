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
  ExternalLink
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Column 1: Contact Information */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Contact Information</h3>
              <div className="space-y-4">
                <a 
                  href="mailto:hello@devagency.com"
                  className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 bg-brand/20 rounded-lg flex items-center justify-center group-hover:bg-brand/30 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium">Email us</div>
                    <div className="text-sm text-slate-400">hello@devagency.com</div>
                  </div>
                </a>

                <a 
                  href="https://wa.me/880XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium">WhatsApp</div>
                    <div className="text-sm text-slate-400">+8801-721-821456</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-sm text-slate-400">Dhaka, Bangladesh (GMT+6)</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium">Response Time</div>
                    <div className="text-sm text-slate-400">Within 24 hours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { label: "Services", href: "#services" },
                  { label: "Case Studies", href: "#Case_Studies" },
                  { label: "Process", href: "#Process" },
                  { label: "Pricing", href: "#Pricing" },
                  { label: "FAQ", href: "#FAQ" },
                  { label: "Blog", href: "#", optional: true }
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group py-1"
                    >
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link.label}</span>
                      {link.optional && (
                        <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
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
              <h3 className="text-lg font-bold mb-6 text-white">Services</h3>
              <ul className="space-y-3">
                {[
                  "Custom Web Development",
                  "Application Fix & Upgrade",
                  "API Development",
                  "Deployment & DevOps"
                ].map((service, index) => (
                  <li key={index}>
                    <div className="flex items-center gap-2 text-slate-300 group py-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand group-hover:scale-125 transition-transform" />
                      <span>{service}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Legal & Trust */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Legal & Trust</h3>
              <ul className="space-y-3">
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Refund Policy"
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-slate-300 hover:text-white transition-colors py-1 inline-block"
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
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 text-slate-400">
                <span>© {currentYear} DevAgency.</span>
                <span className="hidden sm:inline">Built with</span>
                <Heart className="w-4 h-4 text-rose-500 inline" />
                <span className="hidden sm:inline">in Dhaka, Bangladesh.</span>
              </div>
              <div className="sm:hidden text-sm text-slate-500 mt-1">
                Built with care in Dhaka, Bangladesh
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              <a
                href="https://linkedin.com/company"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span>Secure & Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span>100% Client Satisfaction</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span>GDPR Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}