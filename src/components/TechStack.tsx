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
  ArrowRight
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
        color: "blue"
      },
      {
        name: "Tailwind CSS",
        purpose: "Utility-first styling for rapid, consistent development",
        features: ["Mobile-first", "Custom design system", "Production optimized"],
        color: "cyan"
      },
      {
        name: "Modern JavaScript",
        purpose: "ES6+ features for cleaner, more maintainable code",
        features: ["Async/await", "Module imports", "Modern syntax"],
        color: "yellow"
      }
    ],
    benefits: [
      "Instant page loads with Next.js optimization",
      "Pixel-perfect responsive designs",
      "Smooth animations and transitions"
    ],
    color: "blue"
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
        color: "red"
      },
      {
        name: "RESTful APIs",
        purpose: "Clean, predictable data communication",
        features: ["Standardized endpoints", "Version control", "Documentation"],
        color: "green"
      },
      {
        name: "Authentication Systems",
        purpose: "Secure access control and user management",
        features: ["JWT tokens", "OAuth integration", "Role-based permissions"],
        color: "purple"
      }
    ],
    benefits: [
      "Enterprise-grade security practices",
      "Horizontal scalability for traffic spikes",
      "Clean separation of concerns"
    ],
    color: "emerald"
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
        color: "indigo"
      },
      {
        name: "MongoDB",
        purpose: "Flexible document storage for evolving schemas",
        features: ["JSON-like documents", "Horizontal scaling", "Rich queries"],
        color: "green"
      },
      {
        name: "Database Optimization",
        purpose: "Performance tuning for speed at scale",
        features: ["Index optimization", "Query caching", "Connection pooling"],
        color: "amber"
      }
    ],
    benefits: [
      "Data consistency and reliability",
      "Optimized for your specific access patterns",
      "Automatic backups and recovery"
    ],
    color: "purple"
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
        color: "orange"
      },
      {
        name: "Docker",
        purpose: "Consistent environments across development and production",
        features: ["Containerization", "Easy scaling", "Version control"],
        color: "blue"
      },
      {
        name: "CI/CD Pipelines",
        purpose: "Automated testing and deployment",
        features: ["GitHub Actions", "Automated tests", "Zero-downtime deploys"],
        color: "pink"
      }
    ],
    benefits: [
      "99.9% uptime with automated monitoring",
      "Quick rollbacks if needed",
      "Consistent environments team-wide"
    ],
    color: "orange"
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
          this.ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / 100)})`;
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

  constructor(x: number, y: number, maxX: number, maxY: number) {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 2 + 1;
    this.maxX = maxX;
    this.maxY = maxY;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.speed = Math.random() * 0.5 + 0.2;
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
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
    ctx.fill();
    
    // Glow effect
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity * 0.2})`;
    ctx.fill();
  }
}

export default function TechStack() {
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
      className="py-20 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden"
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
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Technologies We Use (And Why)
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Carefully selected tools that deliver reliable, scalable solutions
          </p>
        </div>

        {/* Tech Categories Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {techCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-slate-300"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 ${getColorClass(category.color).bg} rounded-xl flex items-center justify-center`}>
                  <category.icon className={`w-6 h-6 ${getColorClass(category.color).text}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {category.title}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Technologies List */}
              <div className="space-y-4 mb-6">
                {category.technologies.map((tech, techIndex) => (
                  <div key={techIndex} className="group">
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50/50 transition-colors">
                      <div className={`w-10 h-10 ${getColorClass(tech.color).bg} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}>
                        <Cpu className={`w-5 h-5 ${getColorClass(tech.color).text}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-slate-900">
                            {tech.name}
                          </h4>
                          <div className="flex gap-1">
                            {tech.features.map((_, idx) => (
                              <div 
                                key={idx}
                                className="w-1.5 h-1.5 rounded-full bg-brand/50"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">
                          {tech.purpose}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {tech.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-slate-100/50 text-slate-700 rounded text-xs font-medium"
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
              <div className="pt-4 border-t border-slate-200/50">
                <h5 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  What This Means For You:
                </h5>
                <ul className="space-y-2">
                  {category.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 mt-2 rounded-full bg-brand flex-shrink-0" />
                      <span className="text-sm text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Philosophy Card */}
        <div className="bg-gradient-to-r from-blue-50/80 to-blue-100/80 backdrop-blur-sm border border-blue-200 rounded-2xl p-8">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="lg:w-1/4">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto lg:mx-0">
                <Layers className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="lg:w-2/4 text-center lg:text-left">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Technology That Serves Your Goals
              </h3>
              <p className="text-slate-700">
                We choose the right technology for YOUR needs, not the latest trend. 
                Every decision is made with your business objectives, scalability requirements, 
                and long-term maintainability in mind.
              </p>
            </div>

            <div className="lg:w-1/4 flex flex-col items-center lg:items-end">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">100%</div>
                  <div className="text-xs text-slate-600">Client Focus</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">✓</div>
                  <div className="text-xs text-slate-600">Right Fit</div>
                </div>
              </div>
              <button 
                onClick={() => setIsContactModalOpen(true)}  
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                <span>Discuss Your Tech Needs</span>
                <ArrowRight className="w-4 h-4" />
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
            <div key={index} className="flex items-center gap-4 p-4 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <capability.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">
                  {capability.title}
                </h4>
                <p className="text-sm text-slate-600">
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
              />



    </section>
  )
}

// Helper function for color classes
function getColorClass(color: string) {
  switch (color) {
    case 'blue':
      return { bg: 'bg-blue-100', text: 'text-blue-600' }
    case 'cyan':
      return { bg: 'bg-cyan-100', text: 'text-cyan-600' }
    case 'yellow':
      return { bg: 'bg-yellow-100', text: 'text-yellow-600' }
    case 'red':
      return { bg: 'bg-red-100', text: 'text-red-600' }
    case 'green':
      return { bg: 'bg-green-100', text: 'text-green-600' }
    case 'purple':
      return { bg: 'bg-purple-100', text: 'text-purple-600' }
    case 'indigo':
      return { bg: 'bg-indigo-100', text: 'text-indigo-600' }
    case 'amber':
      return { bg: 'bg-amber-100', text: 'text-amber-600' }
    case 'orange':
      return { bg: 'bg-orange-100', text: 'text-orange-600' }
    case 'pink':
      return { bg: 'bg-pink-100', text: 'text-pink-600' }
    case 'emerald':
      return { bg: 'bg-emerald-100', text: 'text-emerald-600' }
    default:
      return { bg: 'bg-brand/10', text: 'text-brand' }
  }
}