"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { MessageSquare, ClipboardList, PenTool, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    step: "01",
    title: "Beratung",
    subtitle: "Kostenlos & vor Ort",
    description: "Wir analysieren Ihren individuellen Energiebedarf, prüfen Dach & Heizsystem vor Ort und ermitteln Ihr persönliches Einsparpotenzial.",
    image: "/process_beratung.jpg",
    icon: MessageSquare,
    accent: "text-blue-400",
  },
  {
    step: "02",
    title: "Planung",
    subtitle: "Maßgeschneidert in 3D",
    description: "Präzise 3D-CAD-Planung, Ertragsprognose und optimale Auslegung Ihrer Anlage. Wir sichern Ihnen die maximale staatliche Förderung (bis zu 70%).",
    image: "/process_planung.jpg",
    icon: ClipboardList,
    accent: "text-amber-400",
  },
  {
    step: "03",
    title: "Installation",
    subtitle: "Eigene Meisterteams",
    description: "Fachgerechte, saubere und schnelle Umsetzung durch unsere festangestellten Montageteams – pünktlich und schlüsselfertig.",
    image: "/process_installation.jpg",
    icon: PenTool,
    accent: "text-primary",
  },
  {
    step: "04",
    title: "Inbetriebnahme",
    subtitle: "100% Bereit & Betreut",
    description: "Vollständige Einweisung, Einrichtung Ihrer Smartphone-App und die komplette behördliche Abwicklung samt Anmeldung beim Netzbetreiber.",
    image: "/process_inbetriebnahme.jpg",
    icon: CheckCircle2,
    accent: "text-emerald-400",
  }
]

export function ProcessSection() {
  return (
    <section className="py-24 bg-background overflow-hidden relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4"
          >
            In 4 Schritten zur eigenen Energie
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black tracking-tighter text-foreground italic uppercase"
          >
            So funktioniert es
          </motion.h2>
          <div className="w-20 h-1.5 bg-primary mx-auto mt-5 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              className="glass rounded-3xl p-4 sm:p-5 border border-border/60 hover:border-primary/40 transition-all duration-300 shadow-soft hover:shadow-xl flex flex-col group"
            >
              {/* Image Container with Badges */}
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-5 bg-muted shadow-sm">
                <Image
                  src={step.image}
                  alt={`Schritt ${step.step}: ${step.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/30 pointer-events-none" />

                {/* Step number badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-xl glass-dark text-white font-black text-xs border border-white/25 shadow-md backdrop-blur-md">
                    Schritt {step.step}
                  </span>
                </div>

                {/* Floating pill badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-dark text-white text-xs font-bold border border-white/20 backdrop-blur-md shadow-md">
                    <step.icon className={`w-3.5 h-3.5 ${step.accent}`} />
                    <span>{step.subtitle}</span>
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="flex flex-col flex-grow text-left px-1">
                <h3 className="text-xl font-black mb-2 uppercase italic tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-14 text-center flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <span className="text-muted-foreground text-sm font-semibold">
            Bereit für Ihre persönliche Energiewende?
          </span>
          <Button
            asChild
            className="rounded-full px-7 py-5 bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-glow-sm group cursor-pointer"
          >
            <a href="#calculator" className="flex items-center gap-2">
              <span>Jetzt kostenloses Angebot berechnen</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
