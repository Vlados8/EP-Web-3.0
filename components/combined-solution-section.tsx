"use client"

import React, { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Zap, Thermometer, ArrowRight, CheckCircle, TrendingDown, Leaf, Wallet, Clock, Sparkles, Cpu, Sun } from "lucide-react"
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
    title: "Energiekosten",
    value: "-70%",
    description: "Deutliche monatliche Kostenersparnis",
  },
  {
    icon: TrendingDown,
    title: "Unabhängigkeit",
    value: "Autark",
    description: "Schutz vor steigenden Energiepreisen",
  },
  {
    icon: Leaf,
    title: "Nachhaltigkeit",
    value: "100%",
    description: "Emissionsfreie Wärme & Strom",
  },
  {
    icon: Clock,
    title: "Immobilienwert",
    value: "+Wert",
    description: "Zukunftssichere Wertsteigerung",
  },
]

function CompactAnimatedChart() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const maxCumulative = Math.max(...savingsData.map((d) => d.cumulative))

  const points = savingsData.map((data, i) => {
    const x = (i / (savingsData.length - 1)) * 100
    const y = 100 - (data.cumulative / maxCumulative) * 100
    return { x, y }
  })

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")
  const areaPath = `${linePath} L 100 100 L 0 100 Z`

  return (
    <div ref={ref} className="relative h-60 sm:h-64 w-full group/chart pt-2">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-1 bottom-7 w-12 flex flex-col justify-between text-[10px] font-black text-slate-400 uppercase tracking-tighter">
        <span>{(maxCumulative / 1000).toFixed(0)}k €</span>
        <span>{(maxCumulative / 2000).toFixed(0)}k €</span>
        <span>0 €</span>
      </div>

      {/* Chart area */}
      <div className="absolute left-12 right-2 top-1 bottom-7">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
          {[0, 1, 2].map((_, i) => (
            <div key={i} className="border-t border-slate-300 dark:border-slate-700" />
          ))}
        </div>

        {/* SVG Chart */}
        <div className="absolute inset-0 pt-2 overflow-visible">
          <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none" className="overflow-visible">
            <defs>
              <linearGradient id="compactAreaGrad" x1="0%" y1="0%" x2="0%" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Area Fill */}
            <motion.path
              d={areaPath}
              fill="url(#compactAreaGrad)"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={isInView ? { opacity: 1, pathLength: 1 } : {}}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            {/* Main Line */}
            <motion.path
              d={linePath}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </svg>

          {/* Data Points */}
          <div className="absolute inset-0">
            {points.map((p, index) => (
              <div
                key={index}
                className="absolute w-3.5 h-3.5 -ml-[7px] -mt-[7px] cursor-pointer z-20"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  className="w-full h-full rounded-full bg-white border-[3px] border-primary shadow-[0_0_10px_rgba(34,197,94,0.6)]"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.08, type: "spring" }}
                  whileHover={{ scale: 1.6, backgroundColor: "var(--primary)" }}
                />

                {/* Tooltip vertical line */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 0.35, height: `${100 - p.y}%` }}
                      exit={{ opacity: 0, height: 0 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-px bg-primary pointer-events-none"
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* X-axis labels */}
        <div className="absolute -bottom-7 left-0 right-0 flex justify-between px-0">
          {savingsData.map((data, index) => (
            <div key={index} className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
              {data.year}
            </div>
          ))}
        </div>
      </div>

      {/* Floating Hover Tooltip */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute top-0 right-0 glass rounded-xl px-3.5 py-2 shadow-elevated z-30 border border-primary/30 backdrop-blur-md"
          >
            <div className="text-base sm:text-lg font-black text-primary leading-tight">
              +{savingsData[hoveredIndex].cumulative.toLocaleString()} €
            </div>
            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
              Gespart bis {savingsData[hoveredIndex].year}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function CombinedSolutionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="kombination" ref={ref} className="py-16 sm:py-24 bg-gradient-to-b from-background via-muted/10 to-background overflow-hidden scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[11px] font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3 h-3 text-primary" />
            Perfekte Synergie & Wirtschaftlichkeit
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground text-balance leading-tight">
            Photovoltaik & Wärmepumpe: <br />
            <span className="text-gradient-energy">Die perfekte Kombination</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground font-medium leading-relaxed">
            Nutzen Sie Ihren selbst erzeugten Solarstrom direkt für Ihre Wärmepumpe. Sie sparen bis zu 70% Energiekosten und machen sich dauerhaft unabhängig von Öl, Gas und Strompreiserhöhungen.
          </p>
        </motion.div>

        {/* Master Bento Container (Unified & Dense) */}
        <div className="bg-card/70 dark:bg-card/40 border border-primary/15 rounded-3xl p-5 sm:p-8 shadow-xl backdrop-blur-xl">
          {/* Top 4 Key Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
                className="p-3.5 sm:p-4 rounded-2xl bg-white/70 dark:bg-background/50 border border-slate-200/80 dark:border-border/60 flex items-center gap-3 shadow-xs hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <b.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="text-xl sm:text-2xl font-black text-foreground tracking-tight leading-none">
                    {b.value}
                  </div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight mt-0.5 truncate">
                    {b.title}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground truncate">
                    {b.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 2-Column Core: Left = Interactive Synergy Flow & Benefits; Right = Cumulative Savings Chart */}
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* Left: Synergy Flow & 3 Checkmarks (6 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-6 flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white/60 dark:bg-background/40 border border-slate-200/70 dark:border-border/60"
            >
              <div>
                {/* Visual Energy Flow Banner */}
                <div className="relative p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-primary/10 to-emerald-500/10 border border-primary/20 mb-6 overflow-hidden">
                  <div className="flex items-center justify-between gap-2 relative z-10">
                    {/* PV Node */}
                    <div className="flex items-center gap-2 bg-white/90 dark:bg-background/80 px-3 py-2 rounded-xl shadow-xs border border-amber-500/30">
                      <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                      <div className="text-left">
                        <div className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 leading-none">Solar (PV)</div>
                        <div className="text-[9px] text-muted-foreground font-medium">Eigener Strom</div>
                      </div>
                    </div>

                    {/* Flow Line & Manager */}
                    <div className="flex-1 flex flex-col items-center px-1">
                      <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary flex items-center justify-center shadow-xs">
                        <Cpu className="w-3.5 h-3.5 text-primary animate-pulse" />
                      </div>
                      <span className="text-[9px] font-bold text-primary tracking-tight mt-0.5">Smart Control</span>
                    </div>

                    {/* WP Node */}
                    <div className="flex items-center gap-2 bg-white/90 dark:bg-background/80 px-3 py-2 rounded-xl shadow-xs border border-primary/30">
                      <Thermometer className="w-4 h-4 text-primary shrink-0" />
                      <div className="text-left">
                        <div className="text-[10px] font-black uppercase text-primary leading-none">Wärmepumpe</div>
                        <div className="text-[9px] text-muted-foreground font-medium">Heizung & Warm</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3 Synergy Points */}
                <div className="space-y-3 mb-6">
                  {[
                    {
                      title: "Eigenverbrauch optimieren",
                      desc: "Überschussstrom Ihrer Solaranlage heizt Ihr Haus und erwärmt Ihr Brauchwasser kostenlos.",
                    },
                    {
                      title: "100% Maximale CO2-Ersparnis",
                      desc: "Saubere Wärme mit grünem Strom von Ihrem Dach – frei von fossilem Öl und Erdgas.",
                    },
                    {
                      title: "Intelligente Steuerung",
                      desc: "Smart-Home-Energiemanager steuert die Wärmepumpe exakt dann, wenn Solarstrom im Überfluss da ist.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-foreground leading-tight">{item.title}</div>
                        <div className="text-xs text-muted-foreground leading-relaxed font-medium mt-0.5">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-200/60 dark:border-border/40 flex flex-col sm:flex-row items-center gap-3">
                <Button asChild size="default" className="w-full sm:w-auto rounded-full px-6 py-5 bg-foreground text-background hover:bg-foreground/90 font-black uppercase tracking-wider text-xs shadow-md">
                  <a href="#calculator" className="flex items-center justify-center gap-2">
                    <span>Kombi-Angebot anfordern</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
                <span className="text-[11px] text-muted-foreground font-semibold">
                  ⏱️ In 2 Minuten unverbindlich kalkulieren
                </span>
              </div>
            </motion.div>

            {/* Right: Cumulative Savings Chart Card (6 cols) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="lg:col-span-6 flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white/60 dark:bg-background/40 border border-slate-200/70 dark:border-border/60"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="text-sm sm:text-base font-black text-foreground uppercase tracking-tight">
                    Kumulierte Ersparnisse (25 Jahre)
                  </h3>
                  <span className="text-[11px] font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                    Bis zu 58.400 € Ersparnis
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-medium mb-3">
                  Basierend auf durchschnittlicher 8-kWp Solaranlage mit Speicher und Wärmepumpe.
                </p>

                {/* Animated Chart Component */}
                <CompactAnimatedChart />
              </div>

              {/* Bottom Quick Callout */}
              <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-border/40 flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">
                  Individuelle Förderung & Einsparung prüfen:
                </span>
                <a
                  href="#calculator"
                  className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                >
                  Zum Rechner <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
