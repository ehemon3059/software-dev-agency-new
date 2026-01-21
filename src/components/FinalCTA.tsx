'use client'

import { 
  Calendar,
  Mail,
  Rocket,
  CheckCircle,
  Shield,
  Clock,
  Users,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { useState } from 'react'
import ContactModal from './ContactModal'

export default function FinalCTA() {


const [isContactModalOpen, setIsContactModalOpen] = useState(false)



  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Building?
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Let's turn your idea into production-ready software
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column - What We'll Discuss */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand/20 rounded-xl flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-brand-light" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Schedule a free 30-minute consultation
                  </h3>
                  <p className="text-slate-300">
                    No commitment. No sales pressure. Just honest advice about your project.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h4 className="text-lg font-bold mb-4 text-white">
                  We'll discuss:
                </h4>
                <div className="space-y-4">
                  {[
                    {
                      icon: Users,
                      title: "Your goals and challenges",
                      description: "Understand your business objectives"
                    },
                    {
                      icon: Sparkles,
                      title: "Technical recommendations",
                      description: "Right technology for your needs"
                    },
                    {
                      icon: Clock,
                      title: "Realistic timeline and pricing",
                      description: "Clear expectations upfront"
                    },
                    {
                      icon: Shield,
                      title: "Whether we're a good fit",
                      description: "Honest assessment before starting"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-brand/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <item.icon className="w-4 h-4 text-brand-light" />
                      </div>
                      <div>
                        <div className="font-semibold text-white mb-1">
                          {item.title}
                        </div>
                        <div className="text-sm text-slate-300">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - CTA Buttons */}
            <div className="space-y-6">
              {/* Primary CTA */}
              <button onClick={() => setIsContactModalOpen(true)} className="group w-full bg-gradient-to-r from-brand to-brand-dark text-white font-semibold rounded-xl p-5 hover:shadow-2xl hover:shadow-brand/25 transition-all duration-300 flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="text-left flex-1" >
                  <div className="text-lg font-bold">Schedule Free Consultation</div>
                  <div className="text-sm text-white/80">30 minutes, no commitment</div>
                </div>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>

                <ContactModal 
                    isOpen={isContactModalOpen}
                    onClose={() => setIsContactModalOpen(false)}
                    defaultTab="consultation" // This will open with consultation tab active
                  />

              {/* Secondary CTA */}
              <button onClick={() => setIsContactModalOpen(true)} className="group w-full bg-white/5 border border-white/10 text-white font-semibold rounded-xl p-5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="text-left flex-1">
                  <div className="text-lg font-bold">Email Us Your Requirements</div>
                  <div className="text-sm text-white/80">Get a detailed proposal</div>
                </div>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>


              <ContactModal 
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
                // defaultTab="consultation" // This will open with consultation tab active
              />
              {/* Quick Info */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-center mb-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/20 text-brand-light rounded-full text-sm font-medium">
                    <Clock className="w-4 h-4" />
                    <span>Response time: within 24 hours</span>
                  </div>
                </div>
                <p className="text-center text-sm text-slate-300">
                  We'll reply with available time slots or a detailed response to your inquiry
                </p>
              </div>
            </div>
          </div>

          {/* Risk Reversal Grid */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-center mb-8">
              No Risk, All Reward
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: CheckCircle,
                  title: "Free consultation",
                  description: "No commitment required - just honest advice"
                },
                {
                  icon: Shield,
                  title: "Clear fixed-price quotes",
                  description: "Know exactly what you'll pay before starting"
                },
                {
                  icon: Users,
                  title: "You own everything",
                  description: "All code, documentation, and intellectual property"
                },
                {
                  icon: Clock,
                  title: "30-day support included",
                  description: "Post-launch bug fixes and adjustments"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-brand/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-brand-light" />
                  </div>
                  <h4 className="font-bold text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Assurance */}
          <div className="text-center">
            <div className="inline-flex flex-wrap justify-center gap-6 mb-8">
              {[
                "No hidden fees",
                "No pressure sales",
                "No technical jargon",
                "No long-term contracts"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand rounded-full" />
                  <span className="text-slate-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
            
            <p className="text-slate-300 italic max-w-2xl mx-auto">
              We believe in building long-term partnerships, not making quick sales. 
              If we're not the right fit, we'll tell you honestly.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}