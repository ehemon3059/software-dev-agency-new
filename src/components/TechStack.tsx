'use client'

import { 
  Zap, 
  Server, 
  Database, 
  Cloud, 
  Cpu,
  Shield,
  TrendingUp,
  Clock,
  GitBranch,
  CheckCircle,
  Layers,
  ArrowRight,
  Sparkles,
  Gauge,
  Lock
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import ContactModal from './ContactModal'

const techCategories = [
  {
    icon: Zap,
    title: "Fast, Modern User Interfaces",
    description: "Responsive, lightning-fast experiences that engage users",
    technologies: [
      {
        name: "React & Next.js",
        purpose: "Server-side rendering, optimal performance, SEO-friendly",
        features: ["Component-based", "TypeScript ready", "Automatic optimization"],
        color: "brand"
      },
      {
        name: "Tailwind CSS",
        purpose: "Utility-first styling for rapid, consistent development",
        features: ["Mobile-first", "Custom design system", "Production optimized"],
        color: "brand"
      },
      {
        name: "Modern JavaScript",
        purpose: "ES6+ features for cleaner, more maintainable code",
        features: ["Async/await", "Module imports", "Modern syntax"],
        color: "brand"
      }
    ],
    benefits: [
      "Instant page loads with Next.js optimization",
      "Pixel-perfect responsive designs",
      "Smooth animations and transitions"
    ],
    color: "brand"
  },
  {
    icon: Server,
    title: "Scalable Backend Systems",
    description: "Secure, maintainable APIs that grow with your business",
    technologies: [
      {
        name: "Laravel & Node.js",
        purpose: "Robust frameworks for complex business logic",
        features: ["MVC architecture", "Middleware support", "Queue management"],
        color: "brand"
      },
      {
        name: "RESTful APIs",
        purpose: "Clean, predictable data communication",
        features: ["Standardized endpoints", "Version control", "Documentation"],
        color: "brand"
      },
      {
        name: "Authentication Systems",
        purpose: "Secure access control and user management",
        features: ["JWT tokens", "OAuth integration", "Role-based permissions"],
        color: "brand"
      }
    ],
    benefits: [
      "Enterprise-grade security practices",
      "Horizontal scalability for traffic spikes",
      "Clean separation of concerns"
    ],
    color: "brand"
  },
  {
    icon: Database,
    title: "Reliable Data Management",
    description: "Optimized storage solutions for your specific data needs",
    technologies: [
      {
        name: "MySQL & PostgreSQL",
        purpose: "Relational databases for structured data",
        features: ["ACID compliance", "Complex queries", "Data integrity"],
        color: "brand"
      },
      {
        name: "MongoDB",
        purpose: "Flexible document storage for evolving schemas",
        features: ["JSON-like documents", "Horizontal scaling", "Rich queries"],
        color: "brand"
      },
      {
        name: "Database Optimization",
        purpose: "Performance tuning for speed at scale",
        features: ["Index optimization", "Query caching", "Connection pooling"],
        color: "brand"
      }
    ],
    benefits: [
      "Data consistency and reliability",
      "Optimized for your specific access patterns",
      "Automatic backups and recovery"
    ],
    color: "brand"
  },
  {
    icon: Cloud,
    title: "Professional Deployment",
    description: "Reliable hosting and seamless deployment workflows",
    technologies: [
      {
        name: "AWS & DigitalOcean",
        purpose: "Scalable cloud infrastructure",
        features: ["Auto-scaling", "Load balancing", "CDN integration"],
        color: "brand"
      },
      {
        name: "Docker",
        purpose: "Consistent environments across development and production",
        features: ["Containerization", "Easy scaling", "Version control"],
        color: "brand"
      },
      {
        name: "CI/CD Pipelines",
        purpose: "Automated testing and deployment",
        features: ["GitHub Actions", "Automated tests", "Zero-downtime deploys"],
        color: "brand"
      }
    ],
    benefits: [
      "99.9% uptime with automated monitoring",
      "Quick rollbacks if needed",
      "Consistent environments team-wide"
    ],
    color: "brand"
  }
]

// Particle system class
class ParticleNetwork {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationFrameId: number | null = null;
  private isRunning: boolean = false;
  private resizeTimeout: NodeJS.Timeout | null = null;
  private isDarkMode: boolean;

  constructor(canvas: HTMLCanvasElement, isDarkMode: boolean) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.isDarkMode = isDarkMode;
    this.init();
    this.bindEvents();
  }

  private init() {
    this.resizeCanvas();
    this.createParticles();
  }

  private bindEvents() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  private handleResize() {
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.resizeCanvas();
      this.createParticles();
    }, 250);
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
        this.canvas.height,
        this.isDarkMode
      ));
    }
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Use accent color #4f6ef7 for particles
    const particleColor = '79, 110, 247'; // #4f6ef7 in RGB

    // Draw connecting lines
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(${particleColor}, ${this.isDarkMode ? 0.15 : 0.1 * (1 - distance / 100)})`;
          this.ctx.lineWidth = 1;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }

    // Draw particles
    this.particles.forEach(particle => {
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
  isDarkMode: boolean;

  constructor(x: number, y: number, maxX: number, maxY: number, isDarkMode: boolean) {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 2 + 1;
    this.maxX = maxX;
    this.maxY = maxY;
    this.opacity = isDarkMode ? Math.random() * 0.3 + 0.1 : Math.random() * 0.2 + 0.05;
    this.speed = Math.random() * 0.5 + 0.2;
    this.isDarkMode = isDarkMode;
  }

  update() {
    this.x += this.vx * this.speed;
    this.y += this.vy * this.speed;

    // Bounce off edges
    if (this.x <= 0 || this.x >= this.maxX) this.vx *= -1;
    if (this.y <= 0 || this.y >= this.maxY) this.vy *= -1;

    // Gentle drift back to original position
    this.vx += (this.originalX - this.x) * 0.0001;
    this.vy += (this.originalY - this.y) * 0.0001;

    // Dampen velocity
    this.vx *= 0.99;
    this.vy *= 0.99;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const particleColor = '79, 110, 247'; // #4f6ef7 in RGB
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${particleColor}, ${this.opacity})`;
    ctx.fill();
    
    // Glow effect (only in dark mode)
    if (this.isDarkMode) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${particleColor}, ${this.opacity * 0.3})`;
      ctx.fill();
    }
  }
}

export default function TechStack() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleNetworkRef = useRef<ParticleNetwork | null>(null);

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

  // Reinitialize particle network when dark mode changes
  useEffect(() => {
    if (particleNetworkRef.current && canvasRef.current) {
      particleNetworkRef.current.cleanup();
      particleNetworkRef.current = new ParticleNetwork(canvasRef.current, isDarkMode);
      particleNetworkRef.current.start();
    }
  }, [isDarkMode]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Initialize particle network when section enters viewport
            if (canvasRef.current && !particleNetworkRef.current) {
              particleNetworkRef.current = new ParticleNetwork(canvasRef.current, isDarkMode);
              particleNetworkRef.current.start();
            }
          } else if (particleNetworkRef.current) {
            // Stop particle network when section leaves viewport
            particleNetworkRef.current.stop();
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (particleNetworkRef.current) {
        particleNetworkRef.current.cleanup();
        particleNetworkRef.current = null;
      }
    };
  }, [isDarkMode]);

  return (
    <section 
      ref={sectionRef} 
      className={`py-20 transition-colors duration-300 relative overflow-hidden ${
        isDarkMode 
          ? 'bg-[#000000]' 
          : 'bg-[#ffffff]'
      }`}
    >
      {/* Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-[#fafafa]' : 'text-[#09090b]'
          }`}>
            Technologies We Use (And Why)
          </h2>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
            isDarkMode ? 'text-[#a1a1aa]' : 'text-[#71717a]'
          }`}>
            Carefully selected tools that deliver reliable, scalable solutions
          </p>
        </div>

        {/* Tech Categories Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {techCategories.map((category, index) => (
            <div 
              key={index}
              className={`border rounded-xl p-6 hover:shadow-lg transition-all duration-500 hover:scale-[1.02] ${
                isDarkMode
                  ? 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] hover:border-[#4f6ef7] hover:shadow-[#4f6ef7]/10'
                  : 'bg-[rgba(0,0,0,0.02)] border-[rgba(0,0,0,0.08)] hover:border-[#4f6ef7] hover:shadow-[#4f6ef7]/10'
              }`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 ${getColorClass(category.color, isDarkMode).bg} rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
                  <category.icon className={`w-6 h-6 ${getColorClass(category.color, isDarkMode).text}`} />
                </div>
                <div>
                  <h3 className={`text-xl font-bold transition-colors duration-300 ${
                    isDarkMode ? 'text-[#fafafa]' : 'text-[#09090b]'
                  }`}>
                    {category.title}
                  </h3>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-[#a1a1aa]' : 'text-[#71717a]'
                  }`}>
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Technologies List */}
              <div className="space-y-4 mb-6">
                {category.technologies.map((tech, techIndex) => (
                  <div key={techIndex} className="group">
                    <div className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-300 ${
                      isDarkMode 
                        ? 'hover:bg-[rgba(255,255,255,0.03)] hover:border-l-2 hover:border-l-[#4f6ef7]' 
                        : 'hover:bg-[rgba(0,0,0,0.02)] hover:border-l-2 hover:border-l-[#4f6ef7]'
                    }`}>
                      <div className={`w-10 h-10 ${getColorClass(tech.color, isDarkMode).bg} rounded-lg flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                        <Cpu className={`w-5 h-5 ${getColorClass(tech.color, isDarkMode).text}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`font-bold transition-colors duration-300 ${
                            isDarkMode ? 'text-[#fafafa]' : 'text-[#09090b]'
                          }`}>
                            {tech.name}
                          </h4>
                          <div className="flex gap-1">
                            {tech.features.map((_, idx) => (
                              <div 
                                key={idx}
                                className={`w-1.5 h-1.5 rounded-full bg-[#4f6ef7] ${
                                  isDarkMode ? 'opacity-50' : 'opacity-30'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className={`text-sm mb-2 transition-colors duration-300 ${
                          isDarkMode ? 'text-[#a1a1aa]' : 'text-[#71717a]'
                        }`}>
                          {tech.purpose}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {tech.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className={`px-2 py-1 rounded text-xs font-medium transition-all duration-300 ${
                                isDarkMode 
                                  ? 'bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[#a1a1aa]' 
                                  : 'bg-[rgba(0,0,0,0.02)] border border-[rgba(0,0,0,0.08)] text-[#71717a]'
                              }`}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className={`pt-4 border-t transition-colors duration-300 ${
                isDarkMode ? 'border-[rgba(255,255,255,0.08)]' : 'border-[rgba(0,0,0,0.08)]'
              }`}>
                <h5 className={`text-sm font-semibold mb-3 flex items-center gap-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-[#fafafa]' : 'text-[#09090b]'
                }`}>
                  <CheckCircle className={`w-4 h-4 text-[#4f6ef7]`} />
                  What This Means For You:
                </h5>
                <ul className="space-y-2">
                  {category.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className={`w-1.5 h-1.5 mt-2 rounded-full flex-shrink-0 bg-[#4f6ef7] ${
                        isDarkMode ? 'opacity-80' : 'opacity-100'
                      }`} />
                      <span className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? 'text-[#a1a1aa]' : 'text-[#71717a]'
                      }`}>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Philosophy Card */}
        <div className={`border rounded-2xl p-8 transition-all duration-500 hover:shadow-xl ${
          isDarkMode
            ? 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] hover:border-[#4f6ef7] hover:shadow-[#4f6ef7]/20'
            : 'bg-[rgba(0,0,0,0.02)] border-[rgba(0,0,0,0.08)] hover:border-[#4f6ef7] hover:shadow-[#4f6ef7]/10'
        }`}>
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="lg:w-1/4">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto lg:mx-0 transition-all duration-300 hover:scale-110 hover:rotate-3 bg-[#4f6ef7] bg-opacity-10`}>
                <Layers className="w-8 h-8 text-[#4f6ef7]" />
              </div>
            </div>
            
            <div className="lg:w-2/4 text-center lg:text-left">
              <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-[#fafafa]' : 'text-[#09090b]'
              }`}>
                Technology That Serves Your Goals
              </h3>
              <p className={`transition-colors duration-300 ${
                isDarkMode ? 'text-[#a1a1aa]' : 'text-[#71717a]'
              }`}>
                We choose the right technology for YOUR needs, not the latest trend. 
                Every decision is made with your business objectives, scalability requirements, 
                and long-term maintainability in mind.
              </p>
            </div>

            <div className="lg:w-1/4 flex flex-col items-center lg:items-end">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#4f6ef7]">100%</div>
                  <div className={`text-xs transition-colors duration-300 ${
                    isDarkMode ? 'text-[#a1a1aa]' : 'text-[#71717a]'
                  }`}>Client Focus</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#4f6ef7]">✓</div>
                  <div className={`text-xs transition-colors duration-300 ${
                    isDarkMode ? 'text-[#a1a1aa]' : 'text-[#71717a]'
                  }`}>Right Fit</div>
                </div>
              </div>
              <button 
                onClick={() => setIsContactModalOpen(true)}  
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4f6ef7] text-white font-semibold rounded-lg hover:bg-[#4f6ef7]/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#4f6ef7]/25"
              >
                <span>Discuss Your Tech Needs</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Additional Capabilities */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Shield,
              title: "Security First",
              description: "Built-in security practices at every layer"
            },
            {
              icon: TrendingUp,
              title: "Performance Optimized",
              description: "Speed and efficiency as core principles"
            },
            {
              icon: GitBranch,
              title: "Modern Workflow",
              description: "Git, CI/CD, and team collaboration tools"
            }
          ].map((capability, index) => (
            <div 
              key={index} 
              className={`flex items-center gap-4 p-4 border rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-lg ${
                isDarkMode
                  ? 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] hover:border-[#4f6ef7] hover:shadow-[#4f6ef7]/10'
                  : 'bg-[rgba(0,0,0,0.02)] border-[rgba(0,0,0,0.08)] hover:border-[#4f6ef7] hover:shadow-[#4f6ef7]/10'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 bg-[#4f6ef7] bg-opacity-10`}>
                <capability.icon className="w-6 h-6 text-[#4f6ef7]" />
              </div>
              <div>
                <h4 className={`font-bold mb-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-[#fafafa]' : 'text-[#09090b]'
                }`}>
                  {capability.title}
                </h4>
                <p className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-[#a1a1aa]' : 'text-[#71717a]'
                }`}>
                  {capability.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        isDarkMode={isDarkMode}
      />
    </section>
  )
}

// Helper function for color classes with dark mode support
function getColorClass(color: string, isDarkMode: boolean) {
  if (isDarkMode) {
    switch (color) {
      case 'brand':
        return { bg: 'bg-[rgba(79,110,247,0.2)]', text: 'text-[#4f6ef7]' }
      case 'blue':
        return { bg: 'bg-[rgba(79,110,247,0.2)]', text: 'text-[#4f6ef7]' }
      case 'cyan':
        return { bg: 'bg-[rgba(79,110,247,0.2)]', text: 'text-[#4f6ef7]' }
      case 'yellow':
        return { bg: 'bg-[rgba(79,110,247,0.2)]', text: 'text-[#4f6ef7]' }
      case 'red':
        return { bg: 'bg-[rgba(79,110,247,0.2)]', text: 'text-[#4f6ef7]' }
      case 'green':
        return { bg: 'bg-[rgba(79,110,247,0.2)]', text: 'text-[#4f6ef7]' }
      case 'purple':
        return { bg: 'bg-[rgba(79,110,247,0.2)]', text: 'text-[#4f6ef7]' }
      case 'indigo':
        return { bg: 'bg-[rgba(79,110,247,0.2)]', text: 'text-[#4f6ef7]' }
      case 'amber':
        return { bg: 'bg-[rgba(79,110,247,0.2)]', text: 'text-[#4f6ef7]' }
      case 'orange':
        return { bg: 'bg-[rgba(79,110,247,0.2)]', text: 'text-[#4f6ef7]' }
      case 'pink':
        return { bg: 'bg-[rgba(79,110,247,0.2)]', text: 'text-[#4f6ef7]' }
      case 'emerald':
        return { bg: 'bg-[rgba(79,110,247,0.2)]', text: 'text-[#4f6ef7]' }
      default:
        return { bg: 'bg-[rgba(255,255,255,0.03)]', text: 'text-[#a1a1aa]' }
    }
  } else {
    switch (color) {
      case 'brand':
        return { bg: 'bg-[rgba(79,110,247,0.1)]', text: 'text-[#4f6ef7]' }
      case 'blue':
        return { bg: 'bg-[rgba(79,110,247,0.1)]', text: 'text-[#4f6ef7]' }
      case 'cyan':
        return { bg: 'bg-[rgba(79,110,247,0.1)]', text: 'text-[#4f6ef7]' }
      case 'yellow':
        return { bg: 'bg-[rgba(79,110,247,0.1)]', text: 'text-[#4f6ef7]' }
      case 'red':
        return { bg: 'bg-[rgba(79,110,247,0.1)]', text: 'text-[#4f6ef7]' }
      case 'green':
        return { bg: 'bg-[rgba(79,110,247,0.1)]', text: 'text-[#4f6ef7]' }
      case 'purple':
        return { bg: 'bg-[rgba(79,110,247,0.1)]', text: 'text-[#4f6ef7]' }
      case 'indigo':
        return { bg: 'bg-[rgba(79,110,247,0.1)]', text: 'text-[#4f6ef7]' }
      case 'amber':
        return { bg: 'bg-[rgba(79,110,247,0.1)]', text: 'text-[#4f6ef7]' }
      case 'orange':
        return { bg: 'bg-[rgba(79,110,247,0.1)]', text: 'text-[#4f6ef7]' }
      case 'pink':
        return { bg: 'bg-[rgba(79,110,247,0.1)]', text: 'text-[#4f6ef7]' }
      case 'emerald':
        return { bg: 'bg-[rgba(79,110,247,0.1)]', text: 'text-[#4f6ef7]' }
      default:
        return { bg: 'bg-[rgba(0,0,0,0.02)]', text: 'text-[#71717a]' }
    }
  }
}