import { useEffect, useState, useRef } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, ChevronRight, HardHat, Ruler, Wrench, Building2, PaintRoller, Zap, CheckCircle2, MapPin, Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const queryClient = new QueryClient();

// --- Components ---

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-primary/95 backdrop-blur-md py-4 shadow-lg border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('top')}>
          <div className="w-10 h-10 bg-secondary flex items-center justify-center">
            <Building2 className="text-primary w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className={`font-display font-bold text-xl leading-none tracking-wider ${scrolled ? 'text-white' : 'text-white'}`}>AARVANTA</span>
            <span className={`text-[0.65rem] font-medium tracking-[0.2em] ${scrolled ? 'text-white/70' : 'text-white/80'}`}>INFRAWORKS</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {['About', 'Services', 'Process', 'Projects', 'FAQ'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollTo(item.toLowerCase())}
              className={`text-sm font-medium transition-colors hover:text-secondary ${scrolled ? 'text-white/80' : 'text-white/90'}`}
            >
              {item}
            </button>
          ))}
          <Button 
            onClick={() => scrollTo('contact')}
            className="bg-secondary hover:bg-secondary/90 text-primary font-bold rounded-none px-6"
          >
            Get a Quote
          </Button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden bg-primary">
      <div className="absolute inset-0 z-0">
        <img src="/hero-bg.png" alt="Construction Site" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-medium text-white tracking-widest uppercase">Jaipur, Rajasthan</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[1.1] mb-6">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-amber-300">Precision</span>.<br />
              Building Trust.
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl font-light">
              Premier civil construction, interior design, and MEP contracting. We turn blueprints into reality with an unwavering commitment to quality and deadlines.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-bold rounded-none h-14 px-8 text-base" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Discuss Your Project <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-none h-14 px-8 text-base bg-transparent" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Services
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom decorative bar */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-secondary" />
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 bg-white relative engineer-grid">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2">
              <div className="h-[1px] w-8 bg-secondary" />
              <span className="text-sm font-bold text-primary tracking-widest uppercase">About Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
              We don't just build structures.<br />We engineer reliability.
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Aarvanta Infraworks was founded on a simple premise: commercial and residential construction shouldn't be unpredictable. Based in Jaipur, we bring rigorous project management, technical expertise, and premium craftsmanship to every site.
            </p>
            <p className="text-muted-foreground text-lg mb-8">
              Whether pouring a foundation, routing complex MEP systems, or executing a high-end interior fit-out, we operate with complete transparency and zero compromises on quality.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
              <div className="flex gap-4">
                <ShieldCheck className="w-8 h-8 text-secondary shrink-0" />
                <div>
                  <h4 className="font-bold text-primary mb-1">Uncompromising Quality</h4>
                  <p className="text-sm text-muted-foreground">Premium materials and strict structural compliance.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="w-8 h-8 text-secondary shrink-0" />
                <div>
                  <h4 className="font-bold text-primary mb-1">On-Time Delivery</h4>
                  <p className="text-sm text-muted-foreground">Rigorous scheduling ensures we meet our deadlines.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="relative">
            <div className="aspect-[4/5] bg-muted relative overflow-hidden">
              <img src="/gallery-exterior.png" alt="Commercial Building" className="w-full h-full object-cover" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-secondary/10 border border-secondary/20 -z-10" />
            <div className="absolute -top-6 -right-6 w-32 h-32 engineer-grid -z-10" />
            <div className="absolute bottom-10 -left-10 bg-primary p-6 shadow-xl border-l-4 border-secondary max-w-[200px]">
              <div className="text-3xl font-display font-bold text-white mb-1">100%</div>
              <div className="text-sm text-white/70">Commitment to Engineering Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Civil Construction",
      desc: "Residential & commercial construction from the ground up. Foundations, structural framing, masonry, and complete shell construction."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "MEP Contracting",
      desc: "Comprehensive Mechanical, Electrical, and Plumbing solutions. Wiring, HVAC routing, piping, and industrial-grade installations."
    },
    {
      icon: <Ruler className="w-8 h-8" />,
      title: "Interior Design & Fit-outs",
      desc: "Premium interior transformations. Space planning, false ceilings, custom millwork, flooring, and bespoke finishes."
    },
    {
      icon: <HardHat className="w-8 h-8" />,
      title: "Turnkey Projects",
      desc: "End-to-end project management. From initial architectural planning to final handover, we handle every detail."
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Renovation",
      desc: "Structural upgrades, aesthetic modernization, and adaptive reuse of existing commercial and residential spaces."
    },
    {
      icon: <PaintRoller className="w-8 h-8" />,
      title: "Finishing Works",
      desc: "High-quality painting, advanced flooring solutions, acoustic treatments, and architectural detailing."
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-50 relative border-t border-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-[1px] w-8 bg-secondary" />
            <span className="text-sm font-bold text-primary tracking-widest uppercase">Our Capabilities</span>
            <div className="h-[1px] w-8 bg-secondary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
            Comprehensive Contracting Solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            We provide specialized teams for every phase of construction, ensuring tight integration between structural works, systems, and finishes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-border">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-10 border-r border-b border-border group hover:bg-primary transition-colors duration-300"
            >
              <div className="w-16 h-16 bg-slate-50 flex items-center justify-center mb-6 text-primary group-hover:bg-white/10 group-hover:text-secondary transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-white transition-colors">{service.title}</h3>
              <p className="text-muted-foreground group-hover:text-white/70 transition-colors line-clamp-3">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="projects" className="py-24 bg-primary text-white clip-diagonal">
      <div className="container mx-auto px-6 md:px-12 pt-8 pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2">
              <div className="h-[1px] w-8 bg-secondary" />
              <span className="text-sm font-bold text-white tracking-widest uppercase">Project Showcase</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Engineered for Excellence
            </h2>
            <p className="text-white/70 text-lg">
              A glimpse into our standards of execution across civil structures, intricate MEP installations, and refined interiors.
            </p>
          </div>
          <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-primary rounded-none">
            View All Projects
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group relative overflow-hidden bg-white/5 aspect-[4/3]">
            <img src="/gallery-mep.png" alt="MEP Installation" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
              <div className="text-secondary font-bold text-sm tracking-widest uppercase mb-2">Commercial MEP</div>
              <h3 className="text-2xl font-display font-bold">Advanced HVAC & Electrical Routing</h3>
            </div>
          </div>
          <div className="group relative overflow-hidden bg-white/5 aspect-[4/3]">
            <img src="/gallery-interior.png" alt="Interior Design" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
              <div className="text-secondary font-bold text-sm tracking-widest uppercase mb-2">Premium Fit-out</div>
              <h3 className="text-2xl font-display font-bold">Luxury Residential Interior</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { num: "01", title: "Consultation & Planning", desc: "Detailed requirements gathering, site analysis, and transparent cost estimation." },
    { num: "02", title: "Design & Engineering", desc: "Architectural layouts, structural engineering, and MEP systems design." },
    { num: "03", title: "Execution & Management", desc: "Rigorous on-site management, quality control, and schedule adherence." },
    { num: "04", title: "Handover", desc: "Final inspections, testing, and delivery of a flawless finished project." },
  ];

  return (
    <section id="process" className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
            Our Working Process
          </h2>
          <p className="text-muted-foreground text-lg">
            A systematic, predictable approach to construction management that eliminates surprises and guarantees results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-border -z-10" />
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative text-center">
              <div className="w-24 h-24 mx-auto bg-slate-50 border border-border flex items-center justify-center rounded-full mb-6 z-10 relative">
                <span className="text-2xl font-display font-bold text-primary">{step.num}</span>
                {/* Active indicator */}
                <div className="absolute -inset-2 border border-secondary rounded-full opacity-0 hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-24 bg-slate-50 border-y border-border engineer-grid">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-display font-bold text-primary mb-6">
              Built on Trust. <br/>Ready for Your Project.
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Aarvanta Infraworks is a newly established firm bringing decades of collective engineering experience to Jaipur. We are currently accepting new projects and are committed to making our founding clients our strongest advocates.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-none px-8" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Be Our First Success Story
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-slate-50 z-10 pointer-events-none" />
            <div className="space-y-6 opacity-60">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white p-8 border border-border shadow-sm">
                  <div className="flex gap-1 text-secondary mb-4">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    ))}
                  </div>
                  <div className="h-4 bg-muted w-3/4 mb-3 rounded" />
                  <div className="h-4 bg-muted w-full mb-3 rounded" />
                  <div className="h-4 bg-muted w-5/6 mb-6 rounded" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-full" />
                    <div>
                      <div className="h-4 bg-muted w-24 mb-2 rounded" />
                      <div className="h-3 bg-muted w-16 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm p-6 border border-border shadow-lg text-center max-w-sm">
                <Building2 className="w-8 h-8 text-secondary mx-auto mb-3" />
                <h4 className="font-bold text-primary mb-2">Space Reserved for You</h4>
                <p className="text-sm text-muted-foreground">Partner with us for your next build, and let our work speak for itself.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="mb-4 inline-flex items-center gap-2">
              <div className="h-[1px] w-8 bg-secondary" />
              <span className="text-sm font-bold text-primary tracking-widest uppercase">Get in Touch</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
              Start Your Project With Us
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Contact our engineering team to discuss your requirements, request a site visit, or get a detailed project estimate.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-50 border border-border flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">Phone</h4>
                  <p className="text-muted-foreground">+91 9929300846</p>
                  <p className="text-muted-foreground">+91 9929312666</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-50 border border-border flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">Office Address</h4>
                  <p className="text-muted-foreground max-w-[250px]">
                    B-82 A, Arya Nagar Vistar, Near Kedia Palace, Murlipura, Jaipur - 302039, Rajasthan, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-50 border border-border flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">Email</h4>
                  <p className="text-muted-foreground">info@aarvantainfraworks.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary p-8 md:p-10 relative">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-secondary" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-secondary" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-secondary" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-secondary" />

            <h3 className="text-2xl font-display font-bold text-white mb-6">Request an Estimate</h3>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/80">Full Name</Label>
                  <Input id="name" placeholder="John Doe" className="bg-white/5 border-white/20 text-white placeholder:text-white/30 rounded-none h-12 focus-visible:ring-secondary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white/80">Phone Number</Label>
                  <Input id="phone" placeholder="+91 XXXXX XXXXX" className="bg-white/5 border-white/20 text-white placeholder:text-white/30 rounded-none h-12 focus-visible:ring-secondary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" className="bg-white/5 border-white/20 text-white placeholder:text-white/30 rounded-none h-12 focus-visible:ring-secondary" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="service" className="text-white/80">Service Required</Label>
                <Select>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white rounded-none h-12 focus:ring-secondary">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="civil">Civil Construction</SelectItem>
                    <SelectItem value="mep">MEP Contracting</SelectItem>
                    <SelectItem value="interior">Interior Design</SelectItem>
                    <SelectItem value="turnkey">Turnkey Project</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white/80">Project Details</Label>
                <Textarea id="message" placeholder="Tell us about your project scale, timeline, and requirements..." className="bg-white/5 border-white/20 text-white placeholder:text-white/30 rounded-none min-h-[120px] focus-visible:ring-secondary" />
              </div>

              <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold rounded-none h-12 text-base mt-2">
                Send Inquiry
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="py-24 bg-slate-50 border-t border-border">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">Clear answers for prospective clients.</p>
        </div>

        <Accordion type="single" collapsible className="w-full bg-white border border-border">
          <AccordionItem value="item-1" className="border-b border-border px-6">
            <AccordionTrigger className="text-left font-bold text-primary hover:text-secondary py-6">What geographical areas do you serve?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
              Aarvanta Infraworks is based in Jaipur, Rajasthan. We primarily serve clients within Jaipur and surrounding regions in Rajasthan for civil construction, MEP, and interior projects. For large-scale turnkey projects, we are open to discussing opportunities across broader regions.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b border-border px-6">
            <AccordionTrigger className="text-left font-bold text-primary hover:text-secondary py-6">Do you handle both residential and commercial projects?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
              Yes, our engineering teams are equipped to handle both luxury residential builds and large-scale commercial structures. Our MEP and structural approaches scale to meet the specific compliance and load requirements of commercial properties while maintaining the refined finish quality expected in high-end residential work.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-b border-border px-6">
            <AccordionTrigger className="text-left font-bold text-primary hover:text-secondary py-6">What does a "Turnkey Project" include?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
              Our turnkey solutions provide a single point of contact from empty plot to move-in readiness. This includes site clearing, foundation pouring, structural framing, complete MEP installation (wiring, plumbing, HVAC), interior fit-outs (flooring, false ceilings), painting, and final handover. We manage all subcontractors and schedules.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="px-6 border-b-0">
            <AccordionTrigger className="text-left font-bold text-primary hover:text-secondary py-6">How do you ensure project timelines are met?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
              We employ rigorous project management methodologies. Before breaking ground, we provide a detailed project schedule with clear milestones. We maintain a reliable supply chain for materials and deploy dedicated site supervisors to ensure daily progress aligns with our master timeline.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#050A15] text-white pt-20 pb-8 border-t-[8px] border-secondary">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-secondary flex items-center justify-center">
                <Building2 className="text-primary w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl leading-none tracking-wider text-white">AARVANTA</span>
                <span className="text-[0.65rem] font-medium tracking-[0.2em] text-white/70">INFRAWORKS</span>
              </div>
            </div>
            <p className="text-white/60 max-w-sm mb-8 leading-relaxed">
              Premier civil construction, interior design, and MEP contracting in Jaipur. Engineering precision and uncompromising quality for commercial and residential builds.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 text-white/60">
              <li><button onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-secondary transition-colors">About Us</button></li>
              <li><button onClick={() => document.getElementById('services')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-secondary transition-colors">Services</button></li>
              <li><button onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-secondary transition-colors">Projects</button></li>
              <li><button onClick={() => document.getElementById('process')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-secondary transition-colors">Process</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-3 text-white/60">
              <li>Civil Construction</li>
              <li>MEP Contracting</li>
              <li>Interior Fit-outs</li>
              <li>Turnkey Projects</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} Aarvanta Infraworks. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Process />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
