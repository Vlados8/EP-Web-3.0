"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { ArrowDown, Play, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EnergyHouse3D } from "@/components/energy-house-3d"

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
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

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
      style={{ opacity }}
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
        className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-2 gap-12 items-center"
        style={{ y, scale }}
      >
        {/* Text content */}
        <div className="text-center lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass shadow-micro mb-8 border border-primary/20"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              Region Norddeutschland / Bremen + 100 km
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-foreground leading-[1.1] text-balance italic uppercase"
          >
            Photovoltaik & Wärmepumpen – <br />
            <span className="text-gradient-energy italic">
              Ihre Energiezukunft
            </span> <br />
            beginnt hier
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 text-pretty font-medium"
          >
            Wir bieten professionelle Installation von Photovoltaikanlagen und Wärmepumpen für Privat- und Gewerbekunden in Norddeutschland. 
            Als erfahrenes Unternehmen aus der Region Bremen realisieren wir moderne Energielösungen im Umkreis von 100 km – effizient, nachhaltig und individuell auf Ihre Bedürfnisse abgestimmt.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <Button 
              asChild
              size="lg"
              className="relative overflow-hidden bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-6 text-base font-medium shadow-elevated group w-full sm:w-auto"
            >
              <a href="#calculator">
                <span className="relative z-10">Kostenloses Angebot</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </a>
            </Button>
            
            <Button 
              variant="ghost"
              size="lg"
              className="rounded-full px-8 py-6 text-base font-medium group w-full sm:w-auto"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Play className="w-4 h-4 ml-0.5" />
                </div>
                <span>Video ansehen</span>
              </div>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-8"
          >
            {[
              { value: "98%", label: "Effizienz" },
              { value: "15k+", label: "Installationen" },
              { value: "25J", label: "Garantie" },
            ].map((stat, index) => (
              <div key={index} className="text-center lg:text-left">
                <div className="text-3xl font-semibold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3D House */}
        <motion.div
          className="relative h-[500px] lg:h-[600px]"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          <EnergyHouse3D />
          
          {/* Floating info cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute top-1/4 -left-4 lg:left-0 glass rounded-2xl p-4 shadow-soft animate-float"
            style={{ animationDelay: "0s" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-lg">☀️</span>
              </div>
              <div>
                <div className="text-sm font-medium">Solarertrag</div>
                <div className="text-xs text-muted-foreground">12.4 kWh heute</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-1/4 -right-4 lg:right-0 glass rounded-2xl p-4 shadow-soft animate-float"
            style={{ animationDelay: "2s" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <span className="text-lg">🔋</span>
              </div>
              <div>
                <div className="text-sm font-medium">Batterie</div>
                <div className="text-xs text-muted-foreground">85% geladen</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground">Scrollen zum Entdecken</span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
