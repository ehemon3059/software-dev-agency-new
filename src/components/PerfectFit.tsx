'use client'

import { 
  Rocket, 
  RefreshCw, 
  Shield, 
  Users, 
  Briefcase,
  X,
  CheckCircle,
  Zap,
  Clock,
  DollarSign,
  Smartphone,
  HeartHandshake,
  ArrowRight
} from 'lucide-react'
import ContactModal from './ContactModal'
import { useState, useEffect, useRef } from 'react'

// Particle system class
class ParticleNetwork {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationFrameId: number | null = null;
  private isRunning: boolean = false;
  private resizeTimeout: NodeJS.Timeout | null = null;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private mouseRadius: number = 150;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.init();
    this.bindEvents();
  }

  private init() {
    this.resizeCanvas();
    this.createParticles();
  }

  private bindEvents() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  private handleResize() {
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.resizeCanvas();
      this.createParticles();
    }, 250);
  }

  private handleMouseMove(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
  }

  private resizeCanvas() {
    const parent = this.canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
    
    this.ctx.scale(dpr, dpr);
  }

  private createParticles() {
    this.particles = [];
    const particleCount = Math.min(50, Math.floor(this.canvas.width / 20));
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(
        Math.random() * this.canvas.width,
        Math.random() * this.canvas.height,
        this.canvas.width,
        this.canvas.height
      ));
    }
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw connecting lines
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - distance / 100)})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }

    // Draw particles
    this.particles.forEach(particle => {
      // Mouse interaction
      const dx = this.mouseX - particle.x;
      const dy = this.mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < this.mouseRadius) {
        const angle = Math.atan2(dy, dx);
        const force = (this.mouseRadius - distance) / this.mouseRadius;
        particle.vx -= Math.cos(angle) * force * 0.5;
        particle.vy -= Math.sin(angle) * force * 0.5;
      }
      
      particle.update();
      particle.draw(this.ctx);
    });
  }

  private animate() {
    if (!this.isRunning) return;
    
    this.draw();
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  cleanup() {
    this.stop();
    window.removeEventListener('resize', this.handleResize.bind(this));
    this.canvas.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
  }
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxX: number;
  maxY: number;
  originalX: number;
  originalY: number;
  opacity: number;
  speed: number;
  color: string;

  constructor(x: number, y: number, maxX: number, maxY: number) {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.radius = Math.random() * 1.5 + 0.5;
    this.maxX = maxX;
    this.maxY = maxY;
    this.opacity = Math.random() * 0.4 + 0.2;
    this.speed = Math.random() * 0.3 + 0.1;
    // Subtle color variations within indigo spectrum
    const hue = 240 + Math.random() * 20 - 10; // Indigo with slight variations
    this.color = `hsla(${hue}, 85%, 65%, ${this.opacity})`;
  }

  update() {
    this.x += this.vx * this.speed;
    this.y += this.vy * this.speed;

    // Bounce off edges
    if (this.x <= 0 || this.x >= this.maxX) this.vx *= -0.95;
    if (this.y <= 0 || this.y >= this.maxY) this.vy *= -0.95;

    // Gentle drift back to original position
    this.vx += (this.originalX - this.x) * 0.00005;
    this.vy += (this.originalY - this.y) * 0.00005;

    // Dampen velocity
    this.vx *= 0.995;
    this.vy *= 0.995;

    // Add some randomness occasionally
    if (Math.random() < 0.01) {
      this.vx += (Math.random() - 0.5) * 0.1;
      this.vy += (Math.random() - 0.5) * 0.1;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Main particle
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    
    // Subtle glow effect
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.radius * 3
    );
    gradient.addColorStop(0, `hsla(240, 85%, 65%, ${this.opacity * 0.3})`);
    gradient.addColorStop(1, `hsla(240, 85%, 65%, 0)`);
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}

export default function PerfectFit() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleNetworkRef = useRef<ParticleNetwork | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Initialize particle network when section enters viewport
            if (canvasRef.current && !particleNetworkRef.current) {
              particleNetworkRef.current = new ParticleNetwork(canvasRef.current);
              particleNetworkRef.current.start();
            }
          } else if (particleNetworkRef.current) {
            // Stop particle network when section leaves viewport
            particleNetworkRef.current.stop();
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of section is visible
        rootMargin: '50px' // Start loading slightly before entering viewport
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      // Cleanup particle network
      if (particleNetworkRef.current) {
        particleNetworkRef.current.cleanup();
        particleNetworkRef.current = null;
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      {/* Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
        aria-hidden="true"
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Is This For You?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Clear expectations lead to successful partnerships
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Left Column - Perfect For */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full font-semibold mb-4">
                <CheckCircle className="w-5 h-5" />
                <span>We're Perfect For:</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Clients Who Value Quality & Partnership
              </h3>
              <p className="text-slate-600">
                You're looking for more than just code - you want a reliable partner
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Rocket,
                  title: "Startups with funding",
                  description: "Looking for an MVP in 4-8 weeks that's built to scale",
                  details: ["Clear timeline", "Scalable architecture", "Investor-ready"]
                },
                {
                  icon: RefreshCw,
                  title: "Businesses with legacy systems",
                  description: "Stuck with PHP/WordPress needing modernization without losing data",
                  details: ["Data migration", "Modern frameworks", "Zero downtime"]
                },
                {
                  icon: Shield,
                  title: "Companies burned by freelancers",
                  description: "Developers who disappeared or left unmaintainable code",
                  details: ["Code audits", "Complete documentation", "Long-term support"]
                },
                {
                  icon: Users,
                  title: "Non-technical founders",
                  description: "Need someone to guide tech decisions and explain options clearly",
                  details: ["Plain English", "No jargon", "Decision frameworks"]
                },
                {
                  icon: Briefcase,
                  title: "Service-based businesses",
                  description: "Needing custom dashboards, booking systems, or client portals",
                  details: ["Custom workflows", "Automation", "Client experience"]
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="group p-5 bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-xl hover:border-emerald-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-slate-700 mb-3">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.details.map((detail, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium"
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Not a Good Fit */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-700 rounded-full font-semibold mb-4">
                <X className="w-5 h-5" />
                <span>We're NOT a Good Fit For:</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Projects That Don't Align With Our Values
              </h3>
              <p className="text-slate-600">
                Setting clear boundaries ensures we deliver our best work
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Clock,
                  title: "One-day quick fixes",
                  description: "\"$50 WordPress tweaks\" or emergency patches without proper planning",
                  reasons: ["No planning", "Technical debt", "Future problems"]
                },
                {
                  icon: Zap,
                  title: "Unclear requirements",
                  description: "Projects with \"figure it out as you go\" approach or constantly changing scope",
                  reasons: ["Scope creep", "Missed deadlines", "Budget overruns"]
                },
                {
                  icon: DollarSign,
                  title: "Lowest price focus",
                  description: "Clients who want cheapest price over quality and long-term value",
                  reasons: ["Quality issues", "Hidden costs", "Poor maintenance"]
                },
                {
                  icon: Smartphone,
                  title: "Native mobile apps",
                  description: "Projects requiring iOS/Android native app development",
                  reasons: ["Specialized skill set", "Different process", "Separate focus"]
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="group p-5 bg-white/80 backdrop-blur-sm border border-rose-100 rounded-xl hover:border-rose-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-6 h-6 text-rose-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-slate-700 mb-3">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.reasons.map((reason, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-xs font-medium"
                          >
                            {reason}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <X className="w-4 h-4 text-rose-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Philosophy Statement */}
        <div className="bg-gradient-to-r from-blue-50/90 to-blue-100/90 backdrop-blur-sm border border-blue-200 rounded-2xl p-8 md:p-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/4">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto lg:mx-0">
                <HeartHandshake className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="lg:w-2/4 text-center lg:text-left">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Quality & Long-Term Partnerships
              </h3>
              <p className="text-slate-700 mb-6">
                We work with clients who value craftsmanship, clear communication, 
                and sustainable solutions. Our best work happens when we partner with 
                businesses that understand software is an investment, not just an expense.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="text-sm text-slate-700">Clear communication</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="text-sm text-slate-700">Realistic timelines</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="text-sm text-slate-700">Transparent pricing</span>
                </div>
              </div>
            </div>

            <div className="lg:w-1/4">
              <button 
                onClick={() => setIsContactModalOpen(true)} 
                className="group w-full lg:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg"
              >
                <span>Start a Conversation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

             
            </div>
          </div>
        </div>

        {/* Self-Assessment Questions */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Still Unsure If We're a Good Fit?
          </h3>
        
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                Answer YES if:
              </h4>
              <ul className="space-y-3">
                {[
                  "You have a clear business problem to solve",
                  "You value quality over speed",
                  "You're willing to invest in proper planning",
                  "You want a long-term solution, not a quick fix",
                  "You appreciate transparent communication"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-emerald-600 text-sm font-bold">✓</span>
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <X className="w-5 h-5 text-rose-500" />
                Answer NO if:
              </h4>
              <ul className="space-y-3">
                {[
                  "You need it done yesterday",
                  "Your requirements change daily",
                  "Price is your only concern",
                  "You don't have time for meetings",
                  "You want ongoing free support"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-rose-600 text-sm font-bold">✗</span>
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200 text-center">
            <p className="text-slate-600 mb-4">
              If you answered mostly YES, we should talk. If mostly NO, we might not be the right fit.
            </p>
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300"
            >
              <span>Still Have Questions?</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>


            {/* Contact Modal */}
              <ContactModal 
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
              />


    </section>
  )
}