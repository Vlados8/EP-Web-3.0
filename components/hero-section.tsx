"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { ArrowDown, Sparkles, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroCarousel } from "@/components/hero-carousel"
import { HeroReviewsMarquee } from "@/components/hero-reviews-marquee"

function FloatingParticle({ delay, duration, x, y, size }: { 
  delay: number
  duration: number
  x: number
  y: number
  size: number 
}) {
  return (
    <motion.div
      className="absolute rounded-full bg-primary/20"
      style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 0.6, 0],
        scale: [0.5, 1, 0.5],
        y: [0, -100, -200],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0.4, 0.9], [1, 0])
  const scale = useTransform(scrollYProgress, [0.4, 0.9], [1, 0.95])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 30, stiffness: 200 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig)

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    duration: 5 + Math.random() * 5,
    x: Math.random() * 100,
    y: 60 + Math.random() * 40,
    size: 4 + Math.random() * 8,
  }))

  return (
    <motion.section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/30"
    >
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        
        {/* Floating particles */}
        {mounted && particles.map((particle) => (
          <FloatingParticle key={particle.id} {...particle} />
        ))}
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Main content */}
      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-8 lg:pb-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-w-0"
      >
        {/* Text content */}
        <div className="text-center lg:text-left order-1 relative z-10 w-full min-w-0 max-w-full flex flex-col items-center lg:items-start">
          {/* 1. Überschrift */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl min-[380px]:text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight sm:tracking-tighter text-foreground leading-[0.98] sm:leading-[0.95] italic uppercase break-words w-full"
          >
            Photovoltaik & <br />
            <span className="text-gradient-energy italic drop-shadow-[0_0_20px_rgba(34,197,94,0.35)]">
              Wärmepumpen
            </span>
          </motion.h1>

          {/* Region Subtitle with Asterisk */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-3 sm:mt-4 inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full glass border border-primary/30 bg-primary/5 shadow-sm max-w-full"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="text-[11px] min-[380px]:text-xs sm:text-sm font-bold text-primary tracking-wide text-center">
              * Region Norddeutschland / Bremen + 100 km
            </span>
          </motion.div>

          {/* 2. Bild (Mobile Carousel: displayed between heading and text on mobile) */}
          <div className="block lg:hidden my-6 sm:my-8 w-full max-w-full min-w-0 overflow-hidden">
            <HeroCarousel />
          </div>

          {/* 3. Überschrift / Promotional Text */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-5 sm:mt-8 max-w-xl mx-auto lg:mx-0 w-full text-center lg:text-left"
          >
            <p className="text-sm min-[380px]:text-base sm:text-lg text-foreground/90 font-medium leading-relaxed">
              <strong className="font-black text-primary uppercase tracking-wide mr-1.5">
                Förderbar:
              </strong>{" "}
              Sparen Sie Kosten und erzeugen Ihren eigenen Strom mit einer PV-Anlage und machen Sie sich unabhängig von Öl und Gas mit einer Wärmepumpe.
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 sm:mt-12 flex flex-col items-center lg:items-start gap-4 w-full"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start w-full">
              <Button 
                asChild
                size="lg"
                className="relative overflow-hidden bg-foreground text-background hover:bg-foreground/90 rounded-full px-5 min-[380px]:px-8 sm:px-10 py-5 sm:py-7 text-sm min-[380px]:text-base font-black uppercase tracking-wider sm:tracking-widest shadow-premium group w-full sm:w-auto max-w-full"
              >
                <a 
                  href="#calculator"
                  onClick={(e) => {
                    e.preventDefault()
                    const el = document.getElementById("calculator")
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" })
                      window.history.replaceState(null, "", "#calculator")
                    }
                  }}
                  className="w-full flex items-center justify-center"
                >
                  <span className="relative z-10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                    <span>Kostenloses Angebot</span>
                    <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full lowercase font-bold tracking-normal shrink-0">in 2 Min.</span>
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-primary to-secondary pointer-events-none"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </a>
              </Button>
            </div>

            {/* Reassuring trust row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 sm:gap-x-5 gap-y-1.5 text-[11px] sm:text-xs text-muted-foreground font-semibold pt-1 w-full text-center lg:text-left">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                100% kostenlos & unverbindlich
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                Meisterbetrieb Bremen
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                Antwort in 24 Std.
              </span>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 sm:mt-16 lg:mt-20 grid grid-cols-3 gap-2 sm:gap-6 lg:gap-8 w-full max-w-lg mx-auto lg:mx-0"
          >
            {[
              { value: "98%", label: "Effizienz", color: "text-primary" },
              { value: "1024+", label: "Kunden", color: "text-secondary" },
              { value: "25J", label: "Garantie", color: "text-accent" },
            ].map((stat, index) => (
              <div key={index} className="text-center lg:text-left group cursor-default min-w-0">
                <div className={`text-xl min-[380px]:text-2xl sm:text-4xl font-black tracking-tighter ${stat.color} drop-shadow-sm`}>{stat.value}</div>
                <div className="text-[9px] sm:text-xs font-black uppercase tracking-wider sm:tracking-[0.2em] text-muted-foreground/60 mt-1 group-hover:text-foreground transition-colors truncate">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Desktop Visual Carousel (hidden on mobile, shown on lg) */}
        <motion.div
          className="hidden lg:block relative order-2 w-full z-20"
          style={{ rotateX, rotateY }}
        >
          <HeroCarousel />
        </motion.div>
      </motion.div>

      {/* Customer Reviews Marquee (Right below the hero content & image) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 w-full mb-8 sm:mb-12"
      >
        <HeroReviewsMarquee />
      </motion.div>
    </motion.section>
  )
}
