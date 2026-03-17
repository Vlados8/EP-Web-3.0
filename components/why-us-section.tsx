"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Shield, Award, Headphones, Wrench, Zap, Clock } from "lucide-react"

const reasons = [
  {
    icon: Shield,
    title: "Regionale Erfahrung",
    description: "Tief verwurzelt in Norddeutschland kennen wir die spezifischen Anforderungen für Bremen und Umgebung.",
  },
  {
    icon: Clock,
    title: "Schneller Service",
    description: "Dank lokaler Teams garantieren wir kurze Anfahrtswege und eine zügige Projektumsetzung.",
  },
  {
    icon: Zap,
    title: "Lokales Unternehmen",
    description: "Wir sind direkt vor Ort ansprechbar – echtes Handwerk aus der Region für die Region.",
  },
  {
    icon: Headphones,
    title: "Persönliche Beratung",
    description: "Individuelle Betreuung ohne Callcenter – Ihr Projektchef ist immer für Sie erreichbar.",
  },
  {
    icon: Award,
    title: "Beste Qualität",
    description: "Wir verbauen ausschließlich High-End-Komponenten marktführender Hersteller.",
  },
  {
    icon: Wrench,
    title: "Full-Service",
    description: "Von der ersten Planung bis zur fertigen Installation und Wartung – alles aus einer Hand.",
  },
]

export function WhyUsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-black mb-6 uppercase tracking-tighter italic">
            Warum wir?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Wir setzen uns bei jedem Schritt für außergewöhnliche Qualität und erstklassigen Service ein.
          </p>
        </motion.div>

        {/* Orbital layout for desktop */}
        <div className="relative">
          {/* Center logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary items-center justify-center shadow-elevated z-10"
          >
            <div className="w-24 h-24 rounded-full bg-background flex items-center justify-center">
              <span className="text-2xl font-bold text-gradient-energy">EP</span>
            </div>
          </motion.div>

          {/* Orbital ring - only on desktop */}
          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.1 } : {}}
              transition={{ duration: 1 }}
              className="absolute inset-0 rounded-full border border-primary"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              {isMounted && [0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-primary/30"
                  style={{
                    left: `calc(50% + ${Math.cos(angle * Math.PI / 180) * 250}px - 4px)`,
                    top: `calc(50% + ${Math.sin(angle * Math.PI / 180) * 250}px - 4px)`,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Grid of reasons */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group relative"
              >
                <div className="relative glass rounded-3xl p-8 shadow-micro hover:shadow-soft transition-all duration-500 h-full">
                  {/* Connecting line to center - only visible on larger screens */}
                  <div className="hidden lg:block absolute top-1/2 left-0 w-4 h-px bg-gradient-to-r from-transparent to-primary/20 -translate-y-1/2 -translate-x-full" />

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <reason.icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
