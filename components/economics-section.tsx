"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { TrendingDown, Leaf, Wallet, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const savingsData = [
  { year: "Jahr 1", savings: 1200, cumulative: 1200 },
  { year: "Jahr 3", savings: 1400, cumulative: 4200 },
  { year: "Jahr 5", savings: 1600, cumulative: 7400 },
  { year: "Jahr 10", savings: 2000, cumulative: 16400 },
  { year: "Jahr 15", savings: 2400, cumulative: 27400 },
  { year: "Jahr 20", savings: 2800, cumulative: 41400 },
  { year: "Jahr 25", savings: 3200, cumulative: 58400 },
]

const benefits = [
  {
    icon: Wallet,
    title: "Energiekosten senken",
    value: "70%",
    description: "Deutliche Senkung der monatlichen Energiekosten",
  },
  {
    icon: TrendingDown,
    title: "Unabhängigkeit",
    value: "Autark",
    description: "Unabhängigkeit von Energieversorgern und Strompreisen",
  },
  {
    icon: Leaf,
    title: "Nachhaltigkeit",
    value: "100%",
    description: "Nachhaltige und umweltfreundliche Energie für Ihr Zuhause",
  },
  {
    icon: Clock,
    title: "Immobilienwert",
    value: "+Wert",
    description: "Nachhaltige Wertsteigerung Ihrer Immobilie durch zertifizierte Technik",
  },
]

function AnimatedChart() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const maxCumulative = Math.max(...savingsData.map(d => d.cumulative))

  return (
    <div ref={ref} className="relative h-80 w-full">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 bottom-8 w-16 flex flex-col justify-between text-xs text-muted-foreground">
        <span>{(maxCumulative / 1000).toFixed(0)}k €</span>
        <span>{(maxCumulative / 2000).toFixed(0)}k €</span>
        <span>0 €</span>
      </div>

      {/* Chart area */}
      <div className="absolute left-20 right-0 top-0 bottom-0">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2].map((_, i) => (
            <div key={i} className="border-t border-border/30" />
          ))}
        </div>

        {/* Bars */}
        <div className="absolute inset-x-0 bottom-8 top-0 flex items-end justify-around gap-2 px-2">
          {savingsData.map((data, index) => {
            const height = (data.cumulative / maxCumulative) * 100

            return (
              <motion.div
                key={index}
                className="relative flex-1 flex flex-col items-center"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Bar */}
                <motion.div
                  className="relative w-full rounded-t-lg bg-gradient-to-t from-primary to-primary/70 cursor-pointer overflow-hidden group"
                  initial={{ height: 0 }}
                  animate={isInView ? { height: `${height}%` } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={isInView ? { x: "100%" } : {}}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  />
                  
                  {/* Glow on hover */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>

                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-full mb-2 glass rounded-xl px-3 py-2 shadow-elevated z-10 whitespace-nowrap"
                    >
                      <div className="text-sm font-semibold text-foreground">
                        {data.cumulative.toLocaleString()} €
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Gesamteinsparung
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* X-axis label */}
                <div className="absolute -bottom-6 text-xs text-muted-foreground whitespace-nowrap">
                  {data.year}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function EconomicsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <TrendingDown className="w-4 h-4" />
            <span className="text-sm font-medium">Ihre Vorteile</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-6 uppercase tracking-tight italic">
            Photovoltaik & Wärmepumpe – <br />
            <span className="text-gradient-energy">Die perfekte Kombination</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Die Kombination aus Photovoltaik und Wärmepumpe ermöglicht maximale Energieeffizienz. 
            Nutzen Sie selbst erzeugten Strom für Ihr Heizsystem und profitieren Sie von staatlichen Förderungen in Deutschland.
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-3xl p-8 shadow-soft"
          >
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Kumulierte Ersparnisse im Zeitverlauf
            </h3>
            <p className="text-sm text-muted-foreground mb-8">
              Basierend auf einer durchschnittlichen 8-kW-Solaranlage mit Speicher
            </p>
            <AnimatedChart />
          </motion.div>

          {/* Benefits grid */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="group glass rounded-2xl p-6 shadow-micro hover:shadow-soft transition-all duration-500"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                      <benefit.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-3xl font-semibold text-foreground mb-1">
                      {benefit.value}
                    </div>
                    <div className="text-sm font-medium text-foreground mb-1">
                      {benefit.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {benefit.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass rounded-3xl p-8 shadow-soft bg-gradient-to-br from-primary/5 to-secondary/5"
            >
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                Berechnen Sie Ihre Ersparnis
              </h3>
              <p className="text-muted-foreground mb-6">
                Erhalten Sie eine personalisierte Schätzung basierend auf Ihrem Energieverbrauch und Standort.
              </p>
              <Button asChild className="rounded-full px-6 py-3 bg-foreground text-background hover:bg-foreground/90 group w-full sm:w-auto">
                <a href="#calculator" className="flex items-center">
                  <span>Kostenloses Angebot</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
