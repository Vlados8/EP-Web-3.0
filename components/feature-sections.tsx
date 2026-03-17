"use client"

import React, { useRef, useState } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { Sun, Zap, Thermometer, Battery, ArrowRight, Check, Plug, Shield, Wind, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

// ─── Shared tab types ─────────────────────────────────────────────────────────

type SolarTab = "panels" | "battery" | "inverter" | "emergency"

const SOLAR_TABS: { id: SolarTab; label: string; title: string; icon: React.ElementType }[] = [
  { id: "panels", label: "Photovoltaik-Module", title: "Photovoltaik-Module", icon: Sun },
  { id: "battery", label: "Batteriespeicher", title: "Batteriespeicher", icon: Battery },
  { id: "inverter", label: "Wechselrichter", title: "Hybrid-Wechselrichter", icon: Zap },
  { id: "emergency", label: "Notstrom", title: "Notstrom-System", icon: Shield },
]

// ═══════════════════════════════════════════════════════════════════════════════
// SOLAR + BATTERY (tabbed)
// ═══════════════════════════════════════════════════════════════════════════════

export function SolarSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<SolarTab>("panels")
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [80, -80])

  return (
    <section id="solar" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />

      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-5"
          >
            <Sun className="w-4 h-4" />
            <span className="text-sm font-medium">Photovoltaik-System</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-5xl font-black tracking-tighter text-foreground text-balance italic uppercase"
          >
            Unsere Leistungen: <span className="text-accent underline decoration-primary/30">Photovoltaik</span>
          </motion.h2>
        </div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="relative flex flex-wrap justify-center gap-1 glass rounded-2xl p-1.5 shadow-soft">
            {SOLAR_TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors duration-300 ${activeTab === id
                    ? "text-background"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {activeTab === id && (
                  <motion.div
                    layoutId="solar-tab-pill"
                    className="absolute inset-0 rounded-xl bg-foreground shadow-micro"
                    transition={{ type: "spring", stiffness: 420, damping: 38 }}
                  />
                )}
                <Icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab title header */}
        <motion.div
          key={`solar-title-${activeTab}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 text-accent shadow-micro">
            {SOLAR_TABS.find(t => t.id === activeTab)?.icon &&
              (() => {
                const Tab = SOLAR_TABS.find(t => t.id === activeTab)!
                const IconComponent = Tab.icon
                return <IconComponent className="w-4 h-4" />
              })()
            }
            <span className="text-sm font-medium">{SOLAR_TABS.find(t => t.id === activeTab)?.title}</span>
          </div>
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
          >
            {activeTab === "panels" && <SolarPanelsContent y={y} />}
            {activeTab === "battery" && <BatteryContent />}
            {activeTab === "inverter" && <InverterTabContent />}
            {activeTab === "emergency" && <EmergencyContent />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

// ─── Solar Panels content ─────────────────────────────────────────────────────

function SolarPanelsContent({ y }: { y: ReturnType<typeof useTransform> }) {
  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      {/* Text */}
      <div>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-lg text-muted-foreground leading-relaxed mb-8 text-pretty font-medium"
        >
          Unsere Experten installieren moderne Photovoltaiksysteme in der gesamten Region rund um Bremen. 
          Wir bieten branchenführende Effizienz mit einer eleganten Ästhetik für Ihr Zuhause oder Gewerbe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 gap-5 mb-10"
        >
          {[
            { value: "22,8%", label: "Zellwirkungsgrad" },
            { value: "400 W", label: "Pro Modul" },
            { value: "-0,26%", label: "Temp. Koeffizient" },
            { value: "25 J", label: "Leistungsgarantie" },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-4 shadow-micro">
              <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="space-y-3 mb-8"
        >
          {[
            "Antireflexionsbeschichtung aus gehärtetem Glas",
            "IP68 wetterfeste Anschlussdose",
            "Bifaziale Lichtaufnahme bei ausgewählten Modellen",
            "Lückenloses Rahmensystem für nahtlose Dachlinien",
          ].map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-accent" />
              </div>
              {f}
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
        >
          <Button className="rounded-full px-6 py-3 bg-foreground text-background hover:bg-foreground/90 group">
            <span>Module entdecken</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>

      {/* Visualization */}
      <motion.div style={{ y }} className="relative">
        <div className="relative aspect-square max-w-lg mx-auto">
          <motion.div
            className="absolute inset-0 rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SolarPanelVisualization />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

function SolarPanelVisualization() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-muted to-background rounded-3xl flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-accent/30 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <svg viewBox="0 0 300 300" className="w-3/4 h-3/4">
        <defs>
          <linearGradient id="panelBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <filter id="panelGlow">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.2" />
          </filter>
        </defs>

        <g transform="translate(50, 80)" filter="url(#panelGlow)">
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 4 }).map((_, col) => (
              <motion.rect
                key={`${row}-${col}`}
                x={col * 50} y={row * 35} width="45" height="30" rx="2"
                fill="url(#panelBlue)"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, delay: (row + col) * 0.2, repeat: Infinity }}
              />
            ))
          )}
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 4 }).map((_, col) => (
              <rect
                key={`ref-${row}-${col}`}
                x={col * 50 + 2} y={row * 35 + 2} width="12" height="3" rx="1"
                fill="rgba(255,255,255,0.3)"
              />
            ))
          )}
        </g>

        {Array.from({ length: 5 }).map((_, i) => (
          <motion.circle
            key={i} r="3" fill="#22c55e"
            initial={{ cx: 100 + i * 25, cy: 0, opacity: 0 }}
            animate={{ cy: [0, 300], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 glass rounded-full px-4 py-2 shadow-soft"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-2">
          <motion.span
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-sm font-medium">12.4 kWh Erzeugung</span>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Battery content ─────────────────────────────────────────────────────────

function BatteryContent() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
      {/* Visualization */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="order-2 lg:order-1"
      >
        <BatteryVisualization />
      </motion.div>

      {/* Text */}
      <div className="order-1 lg:order-2">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground leading-relaxed mb-8 text-pretty"
        >
          Unsere Lithium-Eisen-Phosphat-Batteriesysteme speichern überschüssige Solarenergie für die Nutzung während
          Spitzenzeiten oder Stromausfällen und bieten echte Energieunabhängigkeit und erhebliche Kosteneinsparungen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-5 mb-10"
        >
          {[
            { value: "13,5 kWh", label: "Nutzbare Kapazität" },
            { value: "6.000+", label: "Ladezyklen" },
            { value: "92%", label: "Wirkungsgrad" },
            { value: "10 J", label: "Garantie" },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-4 shadow-micro">
              <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="space-y-3 mb-8"
        >
          {[
            "Nahtlose automatische Notstromversorgung",
            "Smartes Energiemanagement — Laden bei niedrigen Preisen",
            "Stapelbare Module bis zu 40 kWh",
            "Native Integration mit IP-Invertern",
          ].map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-primary" />
              </div>
              {f}
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <Button className="rounded-full px-6 py-3 bg-foreground text-background hover:bg-foreground/90 group">
            <span>Speichersysteme entdecken</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

function BatteryVisualization() {
  return (
    <div className="relative aspect-square max-w-lg mx-auto flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/10 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <svg viewBox="0 0 300 300" className="w-full h-full">
        <defs>
          <linearGradient id="batteryFill" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="85%" stopColor="#22c55e" />
            <stop offset="85%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
        </defs>

        <g transform="translate(75, 50)">
          <rect width="150" height="200" rx="16" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="2" />
          <g transform="translate(15, 15)">
            {Array.from({ length: 4 }).map((_, i) => (
              <g key={i} transform={`translate(0, ${i * 45})`}>
                <rect width="120" height="40" rx="6" fill="#1e293b" />
                <motion.rect
                  x="5" y="5" width="110" height="30" rx="4"
                  fill="url(#batteryFill)"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                />
                <motion.circle
                  cx="105" cy="20" r="4" fill="#22c55e"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                />
              </g>
            ))}
          </g>
        </g>

        <motion.path
          d="M 30 150 L 75 150"
          stroke="#22c55e" strokeWidth="3" strokeDasharray="10 5" fill="none"
          animate={{ strokeDashoffset: [0, -30] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <text x="20" y="170" fill="#64748b" fontSize="8">LADEN</text>

        <motion.path
          d="M 225 150 L 270 150"
          stroke="#f59e0b" strokeWidth="3" strokeDasharray="10 5" fill="none"
          animate={{ strokeDashoffset: [0, -30] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <text x="245" y="170" fill="#64748b" fontSize="8">AUSGABE</text>

        <g transform="translate(100, 270)">
          <rect x="0" y="0" width="100" height="24" rx="12" fill="rgba(34, 197, 94, 0.1)" />
          <text x="50" y="16" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="600">
            85% Geladen
          </text>
        </g>
      </svg>
    </div>
  )
}

// ─── Inverter tab content ─────────────────────────────────────────────────────

function InverterTabContent() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
      {/* Visualization */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="order-2 lg:order-1"
      >
        <InverterTabVisualization />
      </motion.div>

      {/* Text */}
      <div className="order-1 lg:order-2">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground leading-relaxed mb-8 text-pretty"
        >
          Unsere Hybrid-Wechselrichter wandeln Gleichstrom aus der Photovoltaikanlage hocheffizient in Wechselstrom
          um — mit einem Spitzenwirkungsgrad von 97,5 % und intelligenter Energieverteilung zwischen Modulen,
          Speicher und Netz in Echtzeit.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-5 mb-10"
        >
          {[
            { value: "97,5%", label: "Wirkungsgrad" },
            { value: "10 kW", label: "Max. Leistung" },
            { value: "< 20ms", label: "Umschaltzeit" },
            { value: "10 J", label: "Garantie" },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-4 shadow-micro">
              <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="space-y-3 mb-8"
        >
          {[
            "Echtzeit-Überwachung via Smart-Home-App",
            "Automatisches Grid-Failover in unter 20 ms",
            "Großer Spannungsbereich — kompatibel mit allen Modultypen",
            "Native Integration mit unserem Batteriesystem",
          ].map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-secondary" />
              </div>
              {f}
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <Button className="rounded-full px-6 py-3 bg-foreground text-background hover:bg-foreground/90 group">
            <span>Wechselrichter entdecken</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

function InverterTabVisualization() {
  return (
    <div className="relative aspect-square max-w-lg mx-auto flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full bg-secondary/10 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <svg viewBox="0 0 300 300" className="w-full h-full">
        <defs>
          <linearGradient id="invGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
        </defs>
        <g transform="translate(75,75)">
          <rect width="150" height="150" rx="16" fill="url(#invGrad)" />
          <rect x="10" y="10" width="130" height="80" rx="8" fill="#1e293b" />
          <text x="75" y="45" textAnchor="middle" fill="#22c55e" fontSize="20" fontWeight="600">97.5%</text>
          <text x="75" y="65" textAnchor="middle" fill="#64748b" fontSize="10">EFFICIENCY</text>
          <motion.circle cx="30" cy="115" r="5" fill="#22c55e"
            animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }} />
          <motion.circle cx="50" cy="115" r="5" fill="#3b82f6"
            animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0.3 }} />
          <motion.circle cx="70" cy="115" r="5" fill="#f59e0b"
            animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0.6 }} />
          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={i} x={95 + i * 7} y="105" width="3" height="30" rx="1" fill="#94a3b8" />
          ))}
        </g>
        <motion.path d="M 30 150 L 75 150"
          stroke="#f59e0b" strokeWidth="3" strokeDasharray="10 5" fill="none"
          animate={{ strokeDashoffset: [0, -30] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
        <text x="20" y="145" fill="#64748b" fontSize="8">DC IN</text>
        <motion.path d="M 225 150 L 270 150"
          stroke="#22c55e" strokeWidth="3" strokeDasharray="10 5" fill="none"
          animate={{ strokeDashoffset: [0, -30] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
        <text x="252" y="145" fill="#64748b" fontSize="8">AC OUT</text>
        <g transform="translate(150,150)">
          <motion.circle r="8" fill="none" stroke="#3b82f6" strokeWidth="2"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
        </g>
      </svg>
    </div>
  )
}

// ─── Emergency Power tab content ──────────────────────────────────────────────

function EmergencyContent() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
      {/* Text */}
      <div>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.05 }}
          className="text-lg text-muted-foreground leading-relaxed mb-8 text-pretty"
        >
          Wenn das Netz ausfällt, bleibt Ihr Haus hell. Unser Notstrom-System erkennt Stromausfälle in
          Millisekunden und schaltet nahtlos auf die gespeicherte Solarenergie um — so bleiben Beleuchtung,
          Geräte und kritische Systeme rund um die Uhr in Betrieb.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 gap-5 mb-10"
        >
          {[
            { value: "< 20ms", label: "Umschaltgeschwindigkeit" },
            { value: "72 Std", label: "Backup-Dauer" },
            { value: "100%", label: "Kritische Lasten" },
            { value: "Null", label: "Manueller Eingriff" },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-4 shadow-micro">
              <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
          className="space-y-3 mb-8"
        >
          {[
            "Vollständige Haus- oder Teilsicherung — Ihre Wahl",
            "Automatischer täglicher Selbsttest der Einsatzbereitschaft",
            "Push-Benachrichtigungen bei Aktivierung des Backups",
            "Funktioniert bei längeren Ausfällen völlig autark",
          ].map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-3 h-3 text-primary" />
              </div>
              {f}
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
        >
          <Button className="rounded-full px-6 py-3 bg-foreground text-background hover:bg-foreground/90 group">
            <span>Mehr über Notstrom erfahren</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>

      {/* Visualization */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <EmergencyVisualization />
      </motion.div>
    </div>
  )
}

function EmergencyVisualization() {
  return (
    <div className="relative aspect-square max-w-lg mx-auto flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/10 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />
      <svg viewBox="0 0 300 300" className="w-full h-full">
        <defs>
          <linearGradient id="emergGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0fdf4" />
            <stop offset="100%" stopColor="#dcfce7" />
          </linearGradient>
        </defs>

        {/* House outline */}
        <g transform="translate(70, 60)">
          <motion.polygon
            points="80,10 150,70 10,70"
            fill="#1e293b"
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <rect x="20" y="70" width="120" height="100" rx="4" fill="#334155" />
          <rect x="50" y="100" width="30" height="40" rx="4" fill="#0f172a" />
          <rect x="90" y="100" width="30" height="30" rx="4" fill="#0f172a" />

          {/* Lightning bolt — active */}
          <motion.path
            d="M 80 30 L 65 58 L 77 58 L 62 88 L 98 52 L 83 52 Z"
            fill="#22c55e"
            animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ transformOrigin: "80px 58px" }}
          />
        </g>

        {/* Pulse rings around house */}
        {[40, 60, 80].map((r, i) => (
          <motion.circle
            key={i}
            cx="150" cy="155"
            r={r}
            fill="none"
            stroke="#22c55e"
            strokeWidth="1.5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.3, 1.5] }}
            transition={{ duration: 3, delay: i * 0.8, repeat: Infinity }}
          />
        ))}

        {/* Grid cut indicator */}
        <g transform="translate(20, 230)">
          <rect width="80" height="28" rx="14" fill="rgba(239,68,68,0.12)" />
          <text x="40" y="18" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="600">NETZ AUS</text>
        </g>

        {/* Backup active indicator */}
        <g transform="translate(200, 230)">
          <rect width="80" height="28" rx="14" fill="rgba(34,197,94,0.12)" />
          <motion.text x="40" y="18" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="600"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.2, repeat: Infinity }}>
            NOTSTROM AN
          </motion.text>
        </g>
      </svg>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════


function InverterVisualization() {
  return (
    <div className="relative aspect-square max-w-lg mx-auto flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full bg-secondary/10 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <svg viewBox="0 0 300 300" className="w-full h-full">
        <defs>
          <linearGradient id="inverterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
        </defs>

        <g transform="translate(75, 75)">
          <rect width="150" height="150" rx="16" fill="url(#inverterGrad)" />
          <rect x="10" y="10" width="130" height="80" rx="8" fill="#1e293b" />
          <text x="75" y="45" textAnchor="middle" fill="#22c55e" fontSize="20" fontWeight="600">97.5%</text>
          <text x="75" y="65" textAnchor="middle" fill="#64748b" fontSize="10">WIRKUNGSGRAD</text>

          <motion.circle cx="30" cy="115" r="5" fill="#22c55e"
            animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }} />
          <motion.circle cx="50" cy="115" r="5" fill="#3b82f6"
            animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0.3 }} />
          <motion.circle cx="70" cy="115" r="5" fill="#f59e0b"
            animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0.6 }} />

          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={i} x={95 + i * 7} y="105" width="3" height="30" rx="1" fill="#94a3b8" />
          ))}
        </g>

        <motion.path d="M 30 150 L 75 150"
          stroke="#f59e0b" strokeWidth="3" strokeDasharray="10 5" fill="none"
          animate={{ strokeDashoffset: [0, -30] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
        <text x="20" y="145" fill="#64748b" fontSize="8">DC EIN</text>

        <motion.path d="M 225 150 L 270 150"
          stroke="#22c55e" strokeWidth="3" strokeDasharray="10 5" fill="none"
          animate={{ strokeDashoffset: [0, -30] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
        <text x="252" y="145" fill="#64748b" fontSize="8">AC AUS</text>

        <g transform="translate(150, 150)">
          <motion.circle r="8" fill="none" stroke="#3b82f6" strokeWidth="2"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
        </g>
      </svg>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// HEAT PUMP SECTION (standalone)
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Heat Pump tab types ─────────────────────────────────────────────────────

type HeatPumpTab = "indoor" | "outdoor" | "statistics"

const HEATPUMP_TABS: { id: HeatPumpTab; label: string; title: string; icon: React.ElementType }[] = [
  { id: "indoor", label: "Inneneinheit", title: "Inneneinheit", icon: Thermometer },
  { id: "outdoor", label: "Außeneinheit", title: "Außeneinheit", icon: Wind },
  { id: "statistics", label: "Statistiken", title: "Leistungsdaten", icon: BarChart3 },
]

export function HeatPumpSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<HeatPumpTab>("indoor")
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="heatpump" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />

      <motion.div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-5"
          >
            <Thermometer className="w-4 h-4" />
            <span className="text-sm font-medium">Wärmepumpensystem</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-5xl font-black tracking-tighter text-foreground text-balance italic uppercase"
          >
            Unsere Leistungen: <span className="text-primary underline decoration-secondary/30">Wärmepumpen</span>
          </motion.h2>
        </div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="relative flex gap-1 glass rounded-2xl p-1.5 shadow-soft">
            {HEATPUMP_TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors duration-300 ${activeTab === id
                    ? "text-background"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {activeTab === id && (
                  <motion.div
                    layoutId="heatpump-tab-pill"
                    className="absolute inset-0 rounded-xl bg-foreground shadow-micro"
                    transition={{ type: "spring", stiffness: 420, damping: 38 }}
                  />
                )}
                <Icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab title header */}
        <motion.div
          key={`hp-title-${activeTab}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary shadow-micro">
            {HEATPUMP_TABS.find(t => t.id === activeTab)?.icon &&
              (() => {
                const Tab = HEATPUMP_TABS.find(t => t.id === activeTab)!
                const IconComponent = Tab.icon
                return <IconComponent className="w-4 h-4" />
              })()
            }
            <span className="text-sm font-medium">{HEATPUMP_TABS.find(t => t.id === activeTab)?.title}</span>
          </div>
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
          >
            {activeTab === "indoor" && <IndoorUnitContent />}
            {activeTab === "outdoor" && <OutdoorUnitContent />}
            {activeTab === "statistics" && <HeatPumpStatisticsContent />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

// ─── Indoor Unit tab content ──────────────────────────────────────────────────

function IndoorUnitContent() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.05 }}
          className="text-lg text-muted-foreground leading-relaxed mb-8 text-pretty font-medium"
        >
          Moderne Wärmepumpen sorgen für effizientes Heizen und Kühlen. Wir bieten komplette Lösungen 
          inklusive Planung und Installation in Norddeutschland und im Umkreis von 100 km.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 gap-5 mb-10"
        >
          {[
            { value: "25dB", label: "Geräuschpegel" },
            { value: "±0,5°C", label: "Präzision" },
            { value: "WiFi", label: "Steuerung" },
            { value: "10 J", label: "Garantie" },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-4 shadow-micro">
              <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
          className="space-y-3 mb-8"
        >
          {[
            "Extrem leises Gebläse mit variabler Geschwindigkeit — nur 25dB",
            "Integrierte Feuchtigkeitskontrolle und Luftqualitätssensoren",
            "Kompaktes Design fügt sich nahtlos in jede Inneneinrichtung ein",
            "Zonenbasierte Zeitplanung mit App-Integration für Smart Homes",
          ].map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-primary" />
              </div>
              {f}
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
        >
          <Button className="rounded-full px-6 py-3 bg-foreground text-background hover:bg-foreground/90 group">
            <span>Inneneinheiten ansehen</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <IndoorUnitVisualization />
      </motion.div>
    </div>
  )
}

function IndoorUnitVisualization() {
  return (
    <div className="relative aspect-square max-w-lg mx-auto flex items-center justify-center">
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-secondary/5 blur-3xl"
        animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating air particles */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/20"
          style={{ left: `${48 + (i % 3) * 6}%`, top: `${70 + (i % 2) * 8}%` }}
          animate={{
            y: [-5, -50, -5],
            opacity: [0, 0.6, 0],
            scale: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
        />
      ))}

      <svg viewBox="0 0 280 360" className="w-full h-full relative z-10">
        <defs>
          {/* Premium white gradient - Bosch style */}
          <linearGradient id="boschIndoorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fafbfc" />
            <stop offset="50%" stopColor="#f5f6f7" />
            <stop offset="100%" stopColor="#eff0f2" />
          </linearGradient>
          {/* Control panel dark circle */}
          <radialGradient id="controlPanelGrad">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </radialGradient>
          {/* Subtle depth filter */}
          <filter id="boschIndoorDepth" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.06" />
          </filter>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="140" cy="340" rx="55" ry="8" fill="rgba(0,0,0,0.07)" />

        {/* Main unit body - Tall vertical Bosch-style design */}
        <g filter="url(#boschIndoorDepth)">
          {/* Upper section */}
          <rect x="60" y="30" width="160" height="140" rx="16" fill="url(#boschIndoorGrad)" stroke="#e5e7eb" strokeWidth="1.5" />
          {/* Lower section */}
          <rect x="60" y="160" width="160" height="140" rx="16" fill="url(#boschIndoorGrad)" stroke="#e5e7eb" strokeWidth="1.5" />

          {/* Top edge highlight */}
          <rect x="65" y="35" width="150" height="2.5" rx="1.5" fill="rgba(255,255,255,0.85)" />
        </g>

        {/* Vertical panel lines for texture - upper section */}
        <g opacity="0.4" stroke="#d1d5db" strokeWidth="0.8">
          {[85, 115, 145, 175].map((x) => (
            <line key={`v-upper-${x}`} x1={x} y1="40" x2={x} y2="165" />
          ))}
        </g>

        {/* Vertical panel lines for texture - lower section */}
        <g opacity="0.4" stroke="#d1d5db" strokeWidth="0.8">
          {[85, 115, 145, 175].map((x) => (
            <line key={`v-lower-${x}`} x1={x} y1="170" x2={x} y2="295" />
          ))}
        </g>

        {/* Control panel circle - upper section center */}
        <g transform="translate(140, 85)">
          {/* Outer ring */}
          <circle cx="0" cy="0" r="28" fill="url(#controlPanelGrad)" stroke="#334155" strokeWidth="1.5" />

          {/* Digital display area */}
          <circle cx="0" cy="0" r="22" fill="#0f172a" />

          {/* Temperature display */}
          <motion.text
            x="0" y="5" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="700" fontFamily="monospace"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            22°C
          </motion.text>

          {/* Status indicator dot */}
          <motion.circle
            cx="0" cy="0" r="24.5" fill="none" stroke="#22c55e" strokeWidth="1.2"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
        </g>

        {/* Bosch branding - minimal */}
        <text x="140" y="320" textAnchor="middle" fill="#94a3b8" fontSize="7" fontWeight="600" letterSpacing="0.5">IP</text>

        {/* Air vents - upper section (subtle horizontal lines) */}
        <g opacity="0.6">
          {[55, 65, 75, 85, 95, 105].map((y, i) => (
            <motion.rect
              key={`vent-upper-${i}`}
              x="68" y={y} width="144" height="1.5" fill="#cbd5e1" rx="0.75"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2.5, delay: i * 0.15, repeat: Infinity }}
            />
          ))}
        </g>

        {/* Air flow visualization - animated arrows flowing down */}
        <g opacity="0.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.path
              key={`flow-${i}`}
              d={`M ${90 + i * 30} 125 L ${90 + i * 30} 155`}
              stroke="#22c55e"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              animate={{
                y: [0, 50, 0],
                opacity: [0, 0.7, 0],
              }}
              transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </g>

        {/* Indicator lights - lower section */}
        <g transform="translate(140, 220)">
          {/* Power indicator */}
          <circle cx="-20" cy="0" r="2.5" fill="#e5e7eb" stroke="#cbd5e1" strokeWidth="0.8" />
          <motion.circle
            cx="-20" cy="0" r="3.2" fill="none" stroke="#22c55e" strokeWidth="1"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* WiFi indicator */}
          <circle cx="0" cy="0" r="2.5" fill="#e5e7eb" stroke="#cbd5e1" strokeWidth="0.8" />
          <motion.path
            d="M -5 0 Q 0 -5 5 0" stroke="#3b82f6" strokeWidth="1.2" fill="none"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          />

          {/* Mode indicator */}
          <circle cx="20" cy="0" r="2.5" fill="#e5e7eb" stroke="#cbd5e1" strokeWidth="0.8" />
          <motion.circle
            cx="20" cy="0" r="3.2" fill="none" stroke="#f59e0b" strokeWidth="1"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
          />
        </g>

        {/* Heat output indication - lower section */}
        <g opacity="0.5">
          {[175, 185, 195, 205, 215, 225].map((y, i) => (
            <motion.rect
              key={`output-${i}`}
              x="68" y={y} width="144" height="1.5" fill="#22c55e" rx="0.75"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, delay: i * 0.12, repeat: Infinity }}
            />
          ))}
        </g>

        {/* Mode badge */}
        <g transform="translate(140, 270)">
          <rect x="-25" y="-8" width="50" height="16" rx="8" fill="#e5e7eb" stroke="#cbd5e1" strokeWidth="0.8" />
          <text x="0" y="3" textAnchor="middle" fill="#64748b" fontSize="7" fontWeight="600">HEATING MODE</text>
        </g>
      </svg>
    </div>
  )
}

// ─── Outdoor Unit tab content ─────────────────────────────────────────────────

function OutdoorUnitContent() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <OutdoorUnitVisualization />
      </motion.div>

      <div>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground leading-relaxed mb-8 text-pretty"
        >
          Die wetterfeste Außeneinheit entzieht der Umgebungsluft selbst unter extremen Bedingungen Wärme.
          Ihre titangebundenen Aluminiumlamellen widerstehen Korrosion und harten Witterungseinflüssen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-5 mb-10"
        >
          {[
            { value: "4,5 COP", label: "Effizienz" },
            { value: "-25°C", label: "Min. Temp." },
            { value: "75%", label: "Ersparnis" },
            { value: "15 J", label: "Lebensdauer" },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-4 shadow-micro">
              <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="space-y-3 mb-8"
        >
          {[
            "Effizienter Betrieb bis -25°C mit elektrischem Abtaumodus",
            "Titangebundene Aluminiumlamellen widerstehen UV-Degradation",
            "Kompressor mit variabler Geschwindigkeit passt sich in Echtzeit an",
            "Integrierte Anti-Vibrationshalterungen halten Lärm unter 60dB",
          ].map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-primary" />
              </div>
              {f}
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <Button className="rounded-full px-6 py-3 bg-foreground text-background hover:bg-foreground/90 group">
            <span>Außeneinheiten ansehen</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

function OutdoorUnitVisualization() {
  return (
    <div className="relative aspect-square max-w-lg mx-auto flex items-center justify-center">
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-secondary/12 to-primary/8 blur-3xl"
        animate={{ scale: [1, 1.18, 1], opacity: [0.2, 0.42, 0.2] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Heat extraction particles */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-secondary/22"
          style={{ left: `${20 + i * 18}%`, top: `${35 + (i % 2) * 12}%` }}
          animate={{
            x: [0, 50, 0],
            opacity: [0, 0.5, 0],
            scale: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 3.8, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
        />
      ))}

      <svg viewBox="0 0 300 300" className="w-full h-full relative z-10">
        <defs>
          {/* Premium white gradient - Bosch outdoor style */}
          <linearGradient id="boschOutdoorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fafbfc" />
            <stop offset="50%" stopColor="#f5f6f7" />
            <stop offset="100%" stopColor="#eff0f2" />
          </linearGradient>
          {/* Dark fan center */}
          <radialGradient id="fanCenterGrad">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </radialGradient>
          {/* Depth filter */}
          <filter id="boschOutdoorDepth" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="5" stdDeviation="7" floodOpacity="0.07" />
          </filter>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="150" cy="275" rx="65" ry="10" fill="rgba(0,0,0,0.07)" />

        {/* Support feet */}
        <rect x="75" y="255" width="18" height="16" rx="2" fill="#cbd5e1" />
        <rect x="207" y="255" width="18" height="16" rx="2" fill="#cbd5e1" />

        {/* Main unit body - compact Bosch box */}
        <g filter="url(#boschOutdoorDepth)">
          <rect x="55" y="45" width="190" height="190" rx="14" fill="url(#boschOutdoorGrad)" stroke="#d1d5db" strokeWidth="1.5" />

          {/* Top edge highlight */}
          <rect x="60" y="50" width="180" height="2.5" rx="1" fill="rgba(255,255,255,0.85)" />
        </g>

        {/* Horizontal vents pattern - top */}
        <g opacity="0.35" stroke="#d1d5db" strokeWidth="0.7">
          {[60, 68, 76, 84, 92].map((y) => (
            <line key={`h-vent-${y}`} x1="65" y1={y} x2="235" y2={y} />
          ))}
        </g>

        {/* Large circular fan grille - DOMINANT ELEMENT */}
        <g transform="translate(150, 140)">
          {/* Outer fan ring */}
          <circle cx="0" cy="0" r="60" fill="none" stroke="#cbd5e1" strokeWidth="1.2" />

          {/* Concentric rings for Bosch premium look */}
          {[50, 42, 34, 26].map((r, i) => (
            <circle key={i} cx="0" cy="0" r={r} fill="none" stroke="#e5e7eb" strokeWidth="0.8" opacity={0.6} />
          ))}

          {/* Rotating fan blades - Bosch curved design */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <path
                key={i}
                d={`M 0 0 Q 18 -28 28 -48 Q 20 -32 12 -14 Z`}
                fill="#94a3b8"
                opacity={0.85}
                transform={`rotate(${i * 90})`}
              />
            ))}
          </motion.g>

          {/* Fan center dark disk */}
          <circle cx="0" cy="0" r="14" fill="url(#fanCenterGrad)" stroke="#334155" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="5.5" fill="#0f172a" />

          {/* Subtle glow */}
          <motion.circle
            cx="0" cy="0" r="62" fill="none" stroke="#3b82f6" strokeWidth="0.8"
            animate={{ opacity: [0.08, 0.25, 0.08] }}
            transition={{ duration: 2.8, repeat: Infinity }}
          />
        </g>

        {/* Minimal control indicators - below fan */}
        <g transform="translate(150, 220)">
          <rect x="-22" y="-6" width="44" height="12" rx="6" fill="#e5e7eb" stroke="#cbd5e1" strokeWidth="0.8" />
          {/* Three small status dots */}
          <circle cx="-8" cy="0" r="1.5" fill="#94a3b8" />
          <circle cx="0" cy="0" r="1.5" fill="#94a3b8" />
          <circle cx="8" cy="0" r="1.5" fill="#94a3b8" />
        </g>

        {/* Brand branding */}
        <text x="150" y="68" textAnchor="middle" fill="#94a3b8" fontSize="7" fontWeight="600" letterSpacing="0.5">IP</text>

        {/* Heat extraction flowing in indicator */}
        <g opacity="0.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.path
              key={`extract-${i}`}
              d={`M ${70 + i * 30} 105 L ${70 + i * 30} 140`}
              stroke="#3b82f6"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              animate={{
                y: [0, 40, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{ duration: 2.2, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </g>

        {/* Operating status indicator */}
        <motion.g
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <circle cx="255" cy="75" r="3" fill="#e5e7eb" stroke="#cbd5e1" strokeWidth="0.8" />
          <circle cx="255" cy="75" r="4" fill="none" stroke="#22c55e" strokeWidth="1.2" />
        </motion.g>

        {/* Performance mode label */}
        <g transform="translate(150, 245)">
          <rect x="-28" y="-7" width="56" height="14" rx="7" fill="#e5e7eb" stroke="#cbd5e1" strokeWidth="0.8" />
          <text x="0" y="3" textAnchor="middle" fill="#64748b" fontSize="6" fontWeight="600">ECO MODE</text>
        </g>
      </svg>
    </div>
  )
}

// ─── Heat Pump Statistics tab content ─────────────────────────────────────────

function HeatPumpStatisticsContent() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  const monthlyData = [
    { month: "Jan", savings: 42, efficiency: 3.8 },
    { month: "Feb", savings: 38, efficiency: 3.9 },
    { month: "Mar", savings: 35, efficiency: 4.1 },
    { month: "Apr", savings: 28, efficiency: 4.3 },
    { month: "May", savings: 18, efficiency: 4.5 },
    { month: "Jun", savings: 12, efficiency: 4.6 },
    { month: "Jul", savings: 15, efficiency: 4.5 },
    { month: "Aug", savings: 14, efficiency: 4.5 },
    { month: "Sep", savings: 20, efficiency: 4.4 },
    { month: "Oct", savings: 30, efficiency: 4.2 },
    { month: "Nov", savings: 38, efficiency: 4.0 },
    { month: "Dec", savings: 45, efficiency: 3.7 },
  ]

  const maxSavings = Math.max(...monthlyData.map(d => d.savings))

  return (
    <div ref={ref} className="max-w-5xl mx-auto">
      {/* Summary stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {[
          { value: "2.340 €", label: "Jährliche Ersparnis", color: "text-primary" },
          { value: "4,2", label: "Durchschn. COP-Wert", color: "text-secondary" },
          { value: "8,4t", label: "CO₂ eingespart", color: "text-primary" },
          { value: "92%", label: "Systemverfügbarkeit", color: "text-accent" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-5 text-center shadow-soft"
          >
            <div className={`text-3xl font-semibold ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Chart area */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 }}
        className="glass rounded-3xl p-6 md:p-8 shadow-elevated"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground">Monatliche Ersparnis</h3>
            <p className="text-sm text-muted-foreground mt-1">Geschätzte Ersparnis gegenüber herkömmlichen Heizungen</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Ersparnis (€)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <span className="text-sm text-muted-foreground">COP-Wert</span>
            </div>
          </div>
        </div>

        {/* Bar chart */}
        <div className="relative h-64 md:h-72">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-8 w-10 flex flex-col justify-between text-xs text-muted-foreground">
            <span>€50</span>
            <span>€25</span>
            <span>€0</span>
          </div>

          {/* Chart grid */}
          <div className="absolute left-12 right-0 top-0 bottom-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="absolute w-full border-t border-border/50" style={{ top: `${i * 50}%` }} />
            ))}
          </div>

          {/* Bars */}
          <div className="absolute left-12 right-0 top-0 bottom-8 flex items-end justify-between gap-1 md:gap-2 px-1">
            {monthlyData.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                {/* Efficiency dot */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="relative"
                  style={{ marginBottom: `${((d.efficiency - 3.5) / 1.5) * 100}%` }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary shadow-sm" />
                </motion.div>

                {/* Savings bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={isInView ? { height: `${(d.savings / maxSavings) * 100}%` } : {}}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.6, ease: "easeOut" }}
                  className="w-full max-w-8 bg-gradient-to-t from-primary to-primary/70 rounded-t-md relative group cursor-pointer"
                >
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    €{d.savings} saved
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* X-axis labels */}
          <div className="absolute left-12 right-0 bottom-0 flex justify-between px-1">
            {monthlyData.map((d) => (
              <span key={d.month} className="flex-1 text-center text-xs text-muted-foreground">{d.month}</span>
            ))}
          </div>
        </div>

        {/* Efficiency line indicator */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Higher COP values in warmer months indicate better heat pump efficiency.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Peak efficiency:</span>
              <span className="font-semibold text-secondary">4.6 COP (June)</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Additional insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5 }}
        className="grid md:grid-cols-3 gap-4 mt-6"
      >
        {[
          { title: "Winter Performance", desc: "Maintains 3.7+ COP even at -15°C outdoor temperature", icon: "❄️" },
          { title: "Summer Cooling", desc: "Reverse cycle provides efficient air conditioning", icon: "☀️" },
          { title: "Smart Learning", desc: "AI optimizes runtime based on your usage patterns", icon: "🧠" },
        ].map((item, i) => (
          <div key={i} className="glass rounded-xl p-4 shadow-micro">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h4 className="font-medium text-foreground text-sm">{item.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}


