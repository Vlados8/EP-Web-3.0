"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Check, Sparkles, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isHovered, setIsHovered] = useState(false)

  const benefits = [
    "Kostenlose Beratung & Vor-Ort-Termin",
    "Individuelles System-Design",
    "Transparente Preisgestaltung",
    "Finanzierungsmöglichkeiten verfügbar",
  ]

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"
          animate={{
            background: isHovered 
              ? "linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(255, 255, 255, 1) 50%, rgba(59, 130, 246, 0.1) 100%)"
              : "linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(255, 255, 255, 1) 50%, rgba(59, 130, 246, 0.05) 100%)"
          }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Animated particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass rounded-[2.5rem] p-12 lg:p-16 shadow-elevated text-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Decorative elements */}
          <motion.div
            className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Starten Sie jetzt</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl lg:text-6xl font-semibold tracking-tight text-foreground mb-6 text-balance"
          >
            Bereit für Ihre{" "}
            <span className="text-gradient-energy">energetische Zukunft?</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Schließen Sie sich tausenden Hausbesitzern an, die bereits auf saubere, erneuerbare Energie umgestiegen sind. 
            Starten Sie heute mit einer kostenlosen Beratung.
          </motion.p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10"
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                asChild
                size="lg"
                className="relative overflow-hidden bg-foreground text-background hover:bg-foreground/90 rounded-full px-10 py-7 text-lg font-black italic uppercase tracking-tight shadow-elevated group w-full sm:w-auto"
              >
                <a href="#calculator" className="flex items-center gap-2">
                  <span className="relative z-10 flex items-center gap-2">
                    Angebot erhalten
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </a>
              </Button>
              
              <div className="flex gap-4 w-full sm:w-auto">
                <Button 
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full px-6 py-7 border-2 hover:bg-green-500 hover:text-white hover:border-green-500 transition-colors group flex-1"
                >
                  <a href="https://wa.me/4917661951823" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-bold uppercase italic text-sm">WhatsApp</span>
                  </a>
                </Button>

                <Button 
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full px-6 py-7 border-2 hover:bg-primary hover:text-white hover:border-primary transition-colors group flex-1"
                >
                  <a href="tel:+4917661951823" className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    <span className="font-bold uppercase italic text-sm">Anrufen</span>
                  </a>
                </Button>
              </div>
            </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 pt-8 border-t border-border/50 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">1.024+</span>
              <span>Installationen</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">4,9/5</span>
              <span>Bewertung</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">Zertifiziert</span>
              <span>Qualität</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
