"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Mail,
  MapPin,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Music,
  Heart,
  ShoppingBag,
  Users,
  GraduationCap,
  Briefcase,
  Globe,
  Star,
  ArrowUpRight,
  Sun,
  Moon,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import Image from "next/image"

export default function PortfolioLinda() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [countersAnimated, setCountersAnimated] = useState(false)
  const [mounted, setMounted] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    setIsVisible(true)

    const handleScroll = () => {
      const sections = ["hero", "about", "experience", "projects", "education", "skills", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }

      if (statsRef.current && !countersAnimated) {
        const rect = statsRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.8) {
          setCountersAnimated(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [countersAnimated])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
    const [count, setCount] = useState(0)
    useEffect(() => {
      if (!countersAnimated) return
      let start = 0
      const duration = 2000
      const increment = target / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= target) {
          setCount(target)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(timer)
    }, [countersAnimated, target])
    return <span className="stat-number">{count}{suffix}</span>
  }

  return (
    <>
      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl shadow-2xl p-8 w-[90vw] max-w-md animate-fade-in-up">
            <h2 className="text-xl font-semibold mb-6 text-accent text-center font-serif">Choose your email service</h2>
            <div className="flex flex-col gap-3">
              <button
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-300 font-medium hover:scale-[1.02] hover:border-blue-400/40 transition-all"
                onClick={() => { window.open('https://outlook.live.com/mail/0/deeplink/compose?to=lindamabrouk6@gmail.com&subject=Contact%20from%20portfolio', '_blank'); setShowEmailModal(false); }}
              >
                <Mail className="w-5 h-5" /> Outlook
              </button>
              <button
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-300 font-medium hover:scale-[1.02] hover:border-red-400/40 transition-all"
                onClick={() => { window.open('https://mail.google.com/mail/?view=cm&to=lindamabrouk6@gmail.com&su=Contact%20from%20portfolio', '_blank'); setShowEmailModal(false); }}
              >
                <Mail className="w-5 h-5" /> Gmail
              </button>
              <button
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-700 dark:text-yellow-300 font-medium hover:scale-[1.02] hover:border-yellow-400/40 transition-all"
                onClick={() => { window.open('https://compose.mail.yahoo.com/?to=lindamabrouk6@gmail.com&subj=Contact%20from%20portfolio', '_blank'); setShowEmailModal(false); }}
              >
                <Mail className="w-5 h-5" /> Yahoo
              </button>
              <button
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-muted border border-border text-muted-foreground font-medium hover:scale-[1.02] transition-all"
                onClick={() => { window.open('mailto:lindamabrouk6@gmail.com?subject=Contact%20from%20portfolio', '_blank'); setShowEmailModal(false); }}
              >
                <Mail className="w-5 h-5" /> Other (Default App)
              </button>
            </div>
            <button
              className="mt-6 w-full py-3 rounded-xl border border-border text-muted-foreground font-medium hover:bg-muted transition-colors"
              onClick={() => setShowEmailModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-background transition-colors duration-300">

        {/* ═══════════════ NAVIGATION ═══════════════ */}
        <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-xl border-b border-accent/5 z-50 transition-all duration-300">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <button onClick={() => scrollToSection("hero")} className="flex items-center gap-2 group">
                <span className="text-2xl font-bold font-serif text-shimmer">LM</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:animate-pulse"></span>
              </button>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center space-x-8">
                {[
                  { id: "hero", label: "Home" },
                  { id: "about", label: "About" },
                  { id: "experience", label: "Experience" },
                  { id: "projects", label: "Projects" },
                  { id: "skills", label: "Skills" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-sm font-medium transition-all duration-300 hover:text-accent relative ${
                      activeSection === item.id ? "text-accent" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <span className="absolute -bottom-1 left-0 right-0 h-px bg-accent"></span>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {/* Theme Toggle */}
                {mounted && (
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full border border-border hover:bg-accent/10 hover:border-accent/30 transition-all"
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? (
                      <Sun className="w-4 h-4 text-accent" />
                    ) : (
                      <Moon className="w-4 h-4 text-accent" />
                    )}
                  </button>
                )}

                <button
                  onClick={() => setShowEmailModal(true)}
                  className="hidden md:inline-flex items-center px-5 py-2 rounded-full accent-gradient text-sm font-semibold hover:scale-105 transition-transform shadow-lg shadow-accent/20"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Let&apos;s Talk
                </button>

                {/* Mobile menu */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden flex flex-col gap-1.5 p-2"
                >
                  <span className={`w-6 h-0.5 bg-accent transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`w-6 h-0.5 bg-accent transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`w-6 h-0.5 bg-accent transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
              </div>
            </div>

            {mobileMenuOpen && (
              <div className="md:hidden pt-4 pb-2 animate-fade-in-up">
                {["hero", "about", "experience", "projects", "skills", "contact"].map((id) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="block w-full text-left py-3 px-4 text-muted-foreground hover:text-accent capitalize transition-colors"
                  >
                    {id}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* ═══════════════ HERO SECTION ═══════════════ */}
        <section id="hero" className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-glow-pulse"></div>
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: `radial-gradient(var(--dot-color) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
          </div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
            {/* Text */}
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-sm font-medium">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Available for opportunities
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="text-foreground font-serif">Linda</span>
                  <span className="block text-shimmer font-serif">Mabrouk</span>
                </h1>

                <p className="text-xl text-accent/70 font-light tracking-wide italic">
                  Strategic Marketer · Digital & Innovation
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed font-light italic max-w-lg">
                  &ldquo;Building brands & experiences&rdquo;
                </p>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  Tunis, Tunisia
                </span>
                <span className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-accent" />
                  Master Innovation & Digital Strategy
                </span>
              </div>

              {/* Skill Pills */}
              <div className="flex flex-wrap gap-2">
                {["Brand Strategy", "Digital Marketing", "Event Management", "Entrepreneurship", "Community Building", "Go-to-Market"].map((skill, i) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border border-accent/20 bg-accent/5 text-accent/80 hover:scale-105 transition-transform cursor-default animate-fade-in-up"
                    style={{ animationDelay: `${i * 100 + 500}ms`, opacity: 0, animationFillMode: 'forwards' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="px-8 py-3 rounded-full accent-gradient text-sm font-semibold hover:scale-105 transition-transform shadow-lg shadow-accent/20"
                >
                  View My Work
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="px-8 py-3 rounded-full border border-accent/20 text-accent text-sm font-medium hover:bg-accent/5 hover:scale-105 transition-all"
                >
                  About Me
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <div className="relative">
                <div className="absolute -top-8 -left-8 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-glow-pulse"></div>
                <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="relative z-10 w-72 h-[420px] lg:w-80 lg:h-[480px] mx-auto hero-image-container accent-glow overflow-hidden rounded-2xl">
                  <Image
                    src="/images/linda-hero.jpg"
                    alt="Linda Mabrouk — Portrait"
                    fill
                    className="object-cover scale-110 origin-top"
                    style={{ objectPosition: 'top center' }}
                    priority
                  />
                  <div className="absolute inset-0 rounded-2xl border border-accent/20"></div>
                </div>

              </div>
            </div>
          </div>

          {/* Scroll indicator — unified circle */}
          <button
            onClick={() => scrollToSection("about")}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full border border-accent/20 flex flex-col items-center justify-center gap-1 animate-bounce hover:border-accent/40 transition-colors cursor-pointer bg-transparent"
          >
            <span className="text-[10px] text-accent/50 tracking-[0.2em] uppercase font-medium">Scroll</span>
            <ChevronDown className="w-4 h-4 text-accent/40" />
          </button>
        </section>

        {/* ═══════════════ ABOUT SECTION ═══════════════ */}
        <section id="about" className="py-24 px-4 relative">
          <div className="section-divider mb-24"></div>
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <span className="text-accent/50 text-sm tracking-[0.3em] uppercase font-medium">01 — About Me</span>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold mt-4 text-foreground">
                Crafting Digital <br /><em className="text-shimmer not-italic">Experiences</em>
              </h2>
            </div>

            <div className="grid lg:grid-cols-5 gap-12 items-start">
              <div className="lg:col-span-3 space-y-6">
                <p className="text-lg text-accent/60 leading-relaxed font-light">
                  Étudiante en Master Management de l&apos;Innovation à Digital College Tunis, je suis passionnée par la stratégie digitale B2B·B2C et l&apos;entrepreneuriat.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Mon parcours mêle marketing stratégique, création de marque et gestion d&apos;événements. De la fondation d&apos;Euphoric Tunes — une communauté musicale rassemblant 500+ participants — à la conception de marques lifestyle premium, je transforme les visions en réalités concrètes.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Ce qui me définit ? Une approche à la fois analytique et créative, un leadership naturel et une obsession pour les détails qui font la différence.
                </p>

                <div ref={statsRef} className="grid grid-cols-3 gap-6 pt-8">
                  {[
                    { target: 500, suffix: "+", label: "Event Attendees" },
                    { target: 4, suffix: "", label: "Major Projects" },
                    { target: 12, suffix: "+", label: "Team Members Led" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-3xl lg:text-4xl font-bold text-accent font-serif">
                        <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                      </div>
                      <p className="text-xs text-muted-foreground/70 mt-1 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="relative group">
                  <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden image-hover accent-glow">
                    <Image src="/images/linda-friends.jpg" alt="Linda at a professional event" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-xs text-white/80 uppercase tracking-widest">Professional Event</span>
                    </div>
                  </div>
                  <div className="absolute -inset-1 rounded-2xl border border-accent/10 -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ EXPERIENCE SECTION ═══════════════ */}
        <section id="experience" className="py-24 px-4 relative">
          <div className="section-divider mb-24"></div>
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <span className="text-accent/50 text-sm tracking-[0.3em] uppercase font-medium">02 — Experience</span>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold mt-4 text-foreground">
                Professional <br /><em className="text-shimmer not-italic">Journey</em>
              </h2>
            </div>

            <div className="space-y-8">
              {/* Euphoric Tunes */}
              <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full accent-gradient"></div>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Music className="w-5 h-5 text-accent" />
                      <h3 className="text-xl font-semibold text-foreground">Fondatrice & Event Organizer</h3>
                    </div>
                    <p className="text-accent/70 font-medium">Euphoric Tunes</p>
                  </div>
                  <span className="text-sm text-accent/50 font-medium shrink-0 px-3 py-1 rounded-full border border-accent/15 bg-accent/5">
                    2023 — 2025
                  </span>
                </div>
                <ul className="space-y-3 text-muted-foreground text-sm mb-6">
                  {[
                    "Création et développement d'une communauté musicale indépendante dédiée à la promotion de la scène tunisienne",
                    "Organisation d'événements musicaux rassemblant jusqu'à 500+ participants",
                    "Négociation, coordination logistique et gestion des équipes techniques (son, lumière, sécurité)",
                    "Développement de partenariats avec artistes, labels et acteurs culturels",
                    "Gestion de la communication événementielle : identité visuelle, réseaux sociaux, billetterie",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {["Event Management", "Community Building", "Brand Identity", "Partnerships"].map(tag => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent/70">{tag}</span>
                  ))}
                </div>
              </div>

              {/* BDE */}
              <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full accent-gradient"></div>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="w-5 h-5 text-accent" />
                      <h3 className="text-xl font-semibold text-foreground">Cheffe de Projet</h3>
                    </div>
                    <p className="text-accent/70 font-medium">Bureau des Étudiants (BDE)</p>
                  </div>
                  <span className="text-sm text-accent/50 font-medium shrink-0 px-3 py-1 rounded-full border border-accent/15 bg-accent/5">
                    2024 — 2025
                  </span>
                </div>
                <ul className="space-y-3 text-muted-foreground text-sm mb-6">
                  {[
                    "Organisation d'événements universitaires avec coordination logistique complète",
                    "Pilotage d'une équipe de 8 à 12 membres bénévoles",
                    "Gestion budgétaire : négociation prestataires et optimisation des coûts",
                    "Démarchage et fidélisation de partenaires locaux (sponsors, institutions)",
                    "Création de contenus et développement d'une communauté engagée",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {["Project Management", "Team Leadership", "Budget Management", "Sponsorship"].map(tag => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent/70">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ PROJECTS SECTION ═══════════════ */}
        <section id="projects" className="py-24 px-4 relative">
          <div className="section-divider mb-24"></div>
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <span className="text-accent/50 text-sm tracking-[0.3em] uppercase font-medium">03 — Projects</span>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold mt-4 text-foreground">
                Entrepreneurial <br /><em className="text-shimmer not-italic">Ventures</em>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Euphoric Tunes */}
              <div className="glass-card rounded-2xl p-8 relative overflow-hidden group md:col-span-2">
                <div className="absolute top-6 right-6 text-6xl font-serif font-bold text-accent/5 group-hover:text-accent/10 transition-colors">01</div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Music className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Euphoric Tunes</h3>
                    <p className="text-sm text-accent/50">Music Community & Events</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Création d&apos;une communauté musicale indépendante dédiée à la promotion de la scène tunisienne. Organisation d&apos;événements rassemblant 500+ participants avec gestion complète de la communication, logistique et partenariats.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["500+ Attendees", "Brand Identity", "Partnerships", "Social Media"].map(h => (
                    <span key={h} className="text-xs px-3 py-1 rounded-full bg-accent/5 border border-accent/15 text-accent/60">{h}</span>
                  ))}
                </div>
              </div>

              {/* Plio */}
              <div className="glass-card rounded-2xl p-8 relative overflow-hidden group">
                <div className="absolute top-6 right-6 text-6xl font-serif font-bold text-accent/5 group-hover:text-accent/10 transition-colors">02</div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Plio</h3>
                    <p className="text-sm text-accent/50">Lifestyle Premium — Pilates Reformer</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Conception d&apos;une marque lifestyle premium positionnée sur le Pilates reformer à domicile en Tunisie. Développement complet : naming, positionnement, proposition de valeur, étude de marché et stratégie go-to-market.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Brand Design", "Market Research", "Go-to-Market"].map(h => (
                    <span key={h} className="text-xs px-3 py-1 rounded-full bg-accent/5 border border-accent/15 text-accent/60">{h}</span>
                  ))}
                </div>
              </div>

              {/* Beauty Maze */}
              <div className="glass-card rounded-2xl p-8 relative overflow-hidden group">
                <div className="absolute top-6 right-6 text-6xl font-serif font-bold text-accent/5 group-hover:text-accent/10 transition-colors">03</div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Beauty Maze</h3>
                    <p className="text-sm text-accent/50">E-Commerce — Beauty Import & Resale</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Conception d&apos;un modèle e-commerce spécialisé dans l&apos;import et la revente de produits beauté. Stratégie complète de sourcing, pricing, acquisition digitale et fidélisation client.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["E-Commerce", "Supply Chain", "Digital Strategy"].map(h => (
                    <span key={h} className="text-xs px-3 py-1 rounded-full bg-accent/5 border border-accent/15 text-accent/60">{h}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ EDUCATION SECTION ═══════════════ */}
        <section id="education" className="py-24 px-4 relative">
          <div className="section-divider mb-24"></div>
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <span className="text-accent/50 text-sm tracking-[0.3em] uppercase font-medium">04 — Education</span>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold mt-4 text-foreground">
                Academic <br /><em className="text-shimmer not-italic">Foundation</em>
              </h2>
            </div>

            <div className="grid lg:grid-cols-5 gap-12 items-start">
              <div className="lg:col-span-3 space-y-6">
                {[
                  { year: "2024 — 2026", degree: "Master Management de l'Innovation & Stratégie Digitale", school: "Digital College Tunis", specs: ["Data Analytics", "UX/UI Design", "Artificial Intelligence"] },
                  { year: "2021 — 2024", degree: "Licence en Gestion — Marketing & Communication", school: "Université Européenne-Mondiale de Tunis", specs: [] },
                  { year: "2021", degree: "Baccalauréat Général — SES · HGGSP · Mathématiques", school: "Lycée Pierre Mendès France", specs: [] },
                ].map((edu, i) => (
                  <div key={i} className="glass-card rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-0.5 accent-gradient"></div>
                    <span className="text-xs text-accent/50 font-medium tracking-wider uppercase">{edu.year}</span>
                    <h3 className="text-lg font-semibold text-foreground mt-3">{edu.degree}</h3>
                    <p className="text-accent/50 text-sm mt-1">{edu.school}</p>
                    {edu.specs.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {edu.specs.map(s => (
                          <span key={s} className="text-xs px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent/70">{s}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="lg:col-span-2">
                <div className="relative group">
                  <div className="relative w-full h-80 lg:h-[420px] rounded-2xl overflow-hidden image-hover accent-glow">
                    <Image src="/images/linda-diploma.jpg" alt="Linda receiving her diploma with the jury" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-xs text-white/80 uppercase tracking-widest">Diploma Ceremony</span>
                    </div>
                  </div>
                  <div className="absolute -inset-1 rounded-2xl border border-accent/10 -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ SKILLS SECTION ═══════════════ */}
        <section id="skills" className="py-24 px-4 relative">
          <div className="section-divider mb-24"></div>
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <span className="text-accent/50 text-sm tracking-[0.3em] uppercase font-medium">05 — Skills</span>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold mt-4 text-foreground">
                Expertise & <br /><em className="text-shimmer not-italic">Capabilities</em>
              </h2>
            </div>

            <div className="space-y-10">
              {/* Technical Skills */}
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-accent" />
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "SEO On-page & Audit", "CRM Pipeline & Scoring", "Content Strategy & Copywriting B2B",
                    "Meta Ads", "Business Plan & Financial Modeling", "Google Analytics 4",
                    "Search Console", "Notion & Trello", "Canva & Figma",
                    "Go-to-Market Strategy", "Community Management", "Adobe Photoshop",
                    "Premiere Pro", "AI Tools (ChatGPT, Claude, Gemini)"
                  ].map((skill) => (
                    <span key={skill} className="text-sm px-4 py-2 rounded-full bg-accent/5 border border-accent/15 text-foreground/70 hover:bg-accent/10 hover:border-accent/30 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent" />
                  Soft Skills
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { title: "Strategy", desc: "Vision stratégique · Esprit analytique · Prise de décision" },
                    { title: "Marketing & Branding", desc: "Créativité orientée branding · Storytelling · Social media" },
                    { title: "Leadership", desc: "Leadership naturel · Intelligence émotionnelle · Communication" },
                    { title: "Organization", desc: "Gestion des priorités · Sens du détail · Autonomie" }
                  ].map((item) => (
                    <div key={item.title} className="p-4 rounded-xl bg-accent/5 border border-accent/10">
                      <h4 className="text-sm font-semibold text-accent mb-2">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-accent" />
                  Languages
                </h3>
                <div className="space-y-5">
                  {[
                    { name: "Français", level: "Native / C2", width: "100%" },
                    { name: "English", level: "Fluent / B2-C1", width: "85%" },
                    { name: "العربية", level: "Fluent / B2", width: "80%" },
                    { name: "Español", level: "Basic / A2", width: "35%" }
                  ].map((lang) => (
                    <div key={lang.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-foreground/80">{lang.name}</span>
                        <span className="text-xs text-accent/50">{lang.level}</span>
                      </div>
                      <div className="h-1 bg-accent/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full accent-gradient lang-bar-fill"
                          style={{ width: countersAnimated ? lang.width : '0%' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ PASSIONS ═══════════════ */}
        <section className="py-16 px-4 relative">
          <div className="section-divider mb-16"></div>
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <span className="text-accent/50 text-sm tracking-[0.3em] uppercase font-medium">06 — Passions</span>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold mt-4 text-foreground">
                Beyond <em className="text-shimmer not-italic">Work</em>
              </h2>
            </div>
            <div className="marquee-container py-6">
              <div className="flex gap-4 animate-marquee w-max">
                {[
                  { icon: "🚀", label: "Entrepreneurship" },
                  { icon: "🍽️", label: "Gastronomy" },
                  { icon: "💄", label: "Beauty & Trends" },
                  { icon: "📱", label: "Digital Strategy" },
                  { icon: "👗", label: "Fashion & Lifestyle" },
                  { icon: "🧠", label: "Personal Development" },
                  { icon: "📚", label: "Harvard Business Review" },
                  { icon: "✨", label: "Zero to One — Peter Thiel" },
                  { icon: "🚀", label: "Entrepreneurship" },
                  { icon: "🍽️", label: "Gastronomy" },
                  { icon: "💄", label: "Beauty & Trends" },
                  { icon: "📱", label: "Digital Strategy" },
                  { icon: "👗", label: "Fashion & Lifestyle" },
                  { icon: "🧠", label: "Personal Development" },
                  { icon: "📚", label: "Harvard Business Review" },
                  { icon: "✨", label: "Zero to One — Peter Thiel" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 px-6 py-3 rounded-full border border-accent/15 bg-accent/5 text-foreground/60 text-sm whitespace-nowrap shrink-0">
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ CONTACT SECTION ═══════════════ */}
        <section id="contact" className="py-24 px-4 relative">
          <div className="section-divider mb-24"></div>
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-3xl p-10 lg:p-16 relative overflow-hidden text-center">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent/5 rounded-full blur-3xl"></div>

              <span className="text-accent/50 text-sm tracking-[0.3em] uppercase font-medium">07 — Contact</span>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold mt-4 mb-6 text-foreground">
                Let&apos;s Create<br />Something <em className="text-shimmer not-italic">Beautiful</em>
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">
                Whether it&apos;s a brand strategy, a digital campaign, or an exciting collaboration — I&apos;d love to hear from you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
                <button
                  onClick={() => setShowEmailModal(true)}
                  className="group flex items-center gap-4 px-6 py-4 rounded-2xl border border-accent/15 bg-accent/5 hover:bg-accent/10 hover:border-accent/30 transition-all w-full sm:w-auto"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs text-accent/50 block">Email</span>
                    <span className="text-sm text-foreground/80">lindamabrouk6@gmail.com</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-accent/40 group-hover:text-accent transition-colors ml-auto" />
                </button>

                <a
                  href="https://linkedin.com/in/lindamabrouk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 px-6 py-4 rounded-2xl border border-accent/15 bg-accent/5 hover:bg-accent/10 hover:border-accent/30 transition-all w-full sm:w-auto"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <ExternalLink className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs text-accent/50 block">LinkedIn</span>
                    <span className="text-sm text-foreground/80">Linda Mabrouk</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-accent/40 group-hover:text-accent transition-colors ml-auto" />
                </a>
              </div>

              <button
                onClick={() => setShowEmailModal(true)}
                className="px-10 py-3 rounded-full accent-gradient text-sm font-semibold hover:scale-105 transition-transform shadow-lg shadow-accent/20"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Get in Touch
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* ═══════════════ FOOTER ═══════════════ */}
        <footer className="py-8 px-4 border-t border-accent/5">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl font-serif font-bold text-shimmer">LM</span>
              <span className="w-1 h-1 rounded-full bg-accent"></span>
              <span className="text-sm text-muted-foreground/50">© 2025 Linda Mabrouk. All rights reserved.</span>
            </div>
            <button onClick={() => scrollToSection("hero")} className="text-sm text-accent/40 hover:text-accent transition-colors">
              Back to top ↑
            </button>
          </div>
        </footer>

      </div>
    </>
  )
}
