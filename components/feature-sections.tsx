"use client"

import React, { useRef, useState } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence, type MotionValue } from "framer-motion"
import Image from "next/image"
import { Sun, Zap, Thermometer, Battery, ArrowRight, Check, Plug, Shield, Wind, BarChart3, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductDetailModal, type ProductDetailData } from "@/components/product-detail-modal"
import { FeaturePhotoCarousel, type PhotoSlide } from "@/components/feature-photo-carousel"

const SOLAR_SLIDES: PhotoSlide[] = [
  {
    src: "/solar_slide_1.jpg",
    alt: "Modernes Einfamilienhaus mit vollflächiger Photovoltaikanlage in Bremen",
    tag: "Photovoltaik Bremen",
    title: "Einfamilienhaus Vollbelegung",
    badge: "0% MwSt. • Förderbar",
    stat: "Bis 80% Autarkie",
  },
  {
    src: "/solar_slide_2.jpg",
    alt: "Luftaufnahme Photovoltaik Aufdach-Installation Norddeutschland",
    tag: "Region Bremen + 100 km",
    title: "N-Type Doppelglas Module",
    badge: "20 J. Einspeisevergütung",
    stat: "Schlüsselfertig",
  },
  {
    src: "/solar_slide_3.jpg",
    alt: "Elegantes Full-Black Photovoltaik-Dach ohne sichtbare Rahmen",
    tag: "Meisterbetrieb vor Ort",
    title: "Full-Black Premium Optik",
    badge: "30 Jahre Garantie",
    stat: "Maximaler Ertrag",
  },
]

const HEATPUMP_SLIDES: PhotoSlide[] = [
  {
    src: "/heatpump_buderus_1.jpg",
    alt: "Moderne Luft-Wasser-Wärmepumpe mit Innen- und Außeneinheit",
    tag: "Premium-Heizsystem",
    title: "Luft-Wasser-Wärmepumpe",
    badge: "Bis zu 70% KfW-Förderung",
    stat: "Silent PLUS (nur 25 dB)",
  },
  {
    src: "/heatpump_buderus_2.jpg",
    alt: "Moderne Wärmepumpe installiert vor Klinker-Einfamilienhaus",
    tag: "Modernisierung & Altbau",
    title: "Effiziente Außenaufstellung",
    badge: "Bis 21.000 € staatlicher Zuschuss",
    stat: "Bis 75°C Vorlauftemperatur",
  },
  {
    src: "/heatpump_buderus_3.png",
    alt: "Moderne Wärmepumpe Außeneinheit auf Terrasse installiert",
    tag: "Fachgerechte Montage",
    title: "Heizen ohne Öl & Gas",
    badge: "Meisterbetrieb Installation",
    stat: "A+++ Effizienz & R290",
  },
]

const MODULES_PRODUCT: ProductDetailData = {
  title: "N-Type TOPCon Glas-Glas Solarmodule",
  subtitle: "Höchste Effizienz & 30 Jahre Garantie",
  tag: "Photovoltaik",
  category: "pv",
  description: "Unsere N-Type TOPCon Doppelglas-Module liefern durch ihre bifaziale Zellarchitektur bis zu 25% mehr Ertrag über die gesamte Lebensdauer. Sie trotzen extremen Witterungsverhältnissen in Norddeutschland und bieten kompromisslose Zuverlässigkeit.",
  specs: [
    { label: "Nennleistung", value: "440W – 455W+" },
    { label: "Leistungsgarantie", value: "30 Jahre linear" },
    { label: "Bauform", value: "Doppelglas (Bifazial)" },
    { label: "Hagelschutz", value: "Klasse 4 (40 mm)" },
  ],
  highlights: [
    "Bis zu 25% Mehrertrag durch aktive Vorder- und Rückseite",
    "Geringste Degradation durch modernste N-Type Zelltechnologie",
    "Maximaler Brandschutz und Hagelsicherheit durch doppelte Glasschicht",
    "Elegantes Full-Black Design für perfekte Ästhetik auf jedem Dach",
  ]
}

const BATTERY_PRODUCT: ProductDetailData = {
  title: "Lithium-Eisenphosphat (LFP) Batteriespeicher",
  subtitle: "Modular & Eigensicher",
  tag: "Speichersystem",
  category: "pv",
  description: "Hochvolt-Speichersysteme mit modernster Lithium-Eisenphosphat-Zellchemie. Sie speichern den überschüssigen Solarstrom des Tages für die Nacht und bieten maximale Sicherheit ohne Brandgefahr.",
  specs: [
    { label: "Kapazität", value: "5 kWh bis 30 kWh modular" },
    { label: "Zellchemie", value: "LiFePO4 (Eigensicher)" },
    { label: "Zyklenfestigkeit", value: "> 8.000 Zyklen" },
    { label: "Wirkungsgrad", value: "> 97% Effizienz" },
  ],
  highlights: [
    "100% eigensicher: Kein thermisches Durchgehen möglich",
    "Jederzeit modular erweiterbar bei steigendem Energiebedarf",
    "Unterstützt sekundenschnelle Notstrom-Umschaltung",
    "Live-Status & Überwachung bequem per Smartphone-App",
  ]
}

const INVERTER_PRODUCT: ProductDetailData = {
  title: "3-Phasige Hybrid-Wechselrichter",
  subtitle: "Intelligentes Herzstück der Energiezentrale",
  tag: "Wechselrichter",
  category: "pv",
  description: "Kombiniert Solar-Wechselrichter, Speicherladegerät und Energiemanagement in einem kompakten Gerät. Optimiert den Eigenverbrauch und steuert Wärmepumpen oder Wallboxen intelligent an.",
  specs: [
    { label: "Wirkungsgrad", value: "Bis zu 98,4%" },
    { label: "MPP-Tracker", value: "2 – 3 unabhängige Tracker" },
    { label: "Umschaltzeit", value: "< 10 Millisekunden" },
    { label: "Garantie", value: "10 Jahre Garantie" },
  ],
  highlights: [
    "Intelligentes Schattenmanagement für optimale Teilverschattungs-Erträge",
    "SG-Ready Schnittstelle zur automatischen Ansteuerung von Wärmepumpen",
    "Integrierter Überspannungsschutz (AC & DC Typ II)",
    "Geräuscharme Kühlung ohne störende Lüftergeräusche",
  ]
}

const EMERGENCY_PRODUCT: ProductDetailData = {
  title: "Echte 3-Phasige Notstromversorgung",
  subtitle: "Volle Versorgung bei Stromausfall",
  tag: "Notstrom",
  category: "pv",
  description: "Bei einem Netzausfall trennt das automatische Umschaltrelais Ihr Gebäude in Millisekunden vom Netz und baut ein autarkes 3-Phasen-Inselnetz auf. Die Solaranlage versorgt Sie auch ohne öffentliches Netz weiter.",
  specs: [
    { label: "Phasen", value: "Echte 3 Phasen (400V)" },
    { label: "Umschaltzeit", value: "Vollautomatisch (< 20 ms)" },
    { label: "Leistung", value: "Bis 10 kW Dauerlast" },
    { label: "Funktion", value: "Schwarzstartfähig" },
  ],
  highlights: [
    "Unterbrechungsfreier Weiterbetrieb von Beleuchtung, Kühlschrank & Heizung",
    "Automatische Netztrennung für maximale Sicherheit",
    "Solaranlage lädt die Batterie auch während eines Netzausfalls weiter auf",
    "Voller Schutz für empfindliche Elektrogeräte und Homeoffice-Technik",
  ]
}

const HP_INDOOR_PRODUCT: ProductDetailData = {
  title: "Hydraulische Wärmepumpen-Inneneinheit",
  subtitle: "Kompakt, Flüsterleise & Hocheffizient",
  tag: "Wärmepumpe",
  category: "heatpump",
  description: "Die kompakte Heizzentrale verbindet Warmwasserspeicher, Hydraulik und intelligente Regelung auf engstem Raum. Sie sorgt für behagliche Wärme und warmes Wasser mit minimalem Stromverbrauch.",
  specs: [
    { label: "Speicher", value: "190L – 300L Warmwasserspeicher" },
    { label: "Schallpegel", value: "< 28 dB(A) (Flüsterleise)" },
    { label: "Effizienz", value: "A+++ im Heizbetrieb" },
    { label: "Konnektivität", value: "WLAN / App-Steuerung" },
  ],
  highlights: [
    "Kompakter All-in-One Tower spart wertvollen Platz im Haustechnikraum",
    "Nahtlose Integration mit Photovoltaik zur Nutzung von Solarüberschuss",
    "Witterungsgeführte Vorlauftemperatur für minimale Betriebskosten",
    "Inklusive hocheffizienter Umwälzpumpe und Sicherheitsgruppe",
  ]
}

const HP_OUTDOOR_PRODUCT: ProductDetailData = {
  title: "Flüsterleise Monoblock Außeneinheit",
  subtitle: "Natürliches Kältemittel R290 (Propan)",
  tag: "Wärmepumpe",
  category: "heatpump",
  description: "Modernste Luft-Wasser-Wärmepumpen mit dem zukunftssicheren Kältemittel R290. Sie erreichen bis zu 75°C Vorlauftemperatur und eignen sich hervorragend sowohl für Neubauten als auch für Bestandsgebäude mit klassischen Heizkörpern.",
  specs: [
    { label: "SCOP", value: "Bis zu 5,2 Jahresarbeitszahl" },
    { label: "Kältemittel", value: "Natürliches R290 (GWP 3)" },
    { label: "Vorlauf", value: "Bis 75°C Vorlauftemperatur" },
    { label: "Förderung", value: "Bis zu 70% KfW-Zuschuss" },
  ],
  highlights: [
    "Bis zu 70% staatliche KfW-Förderung (Heizungsförderung 458)",
    "Flüsterleiser Nachtbetrieb – problemlos für dicht bebaute Wohnsiedlungen",
    "Volle Heizleistung selbst bei extremen Frosttemperaturen bis -25°C",
    "Zukunftssicher ohne F-Gase Verbotsproblematik dank natürlichem R290",
  ]
}

const HP_SYSTEM_PRODUCT: ProductDetailData = {
  title: "Komplettes Wärmepumpensystem mit PV-Kopplung",
  subtitle: "Maximale Unabhängigkeit von Gas & Öl",
  tag: "Wärmepumpe & Hybrid",
  category: "heatpump",
  description: "Die Komplettlösung aus hocheffizienter R290 Wärmepumpe, abgestimmter Hydraulikstation und intelligenter SG-Ready Photovoltaik-Steuerung. Heizen Sie Ihr Gebäude ganzjährig mit umweltfreundlicher Umweltwärme und eigenem Solarstrom.",
  specs: [
    { label: "KfW-Zuschuss", value: "Bis zu 70% staatliche Förderung" },
    { label: "Vorlauftemperatur", value: "Bis 75°C (auch für Bestandsbauten)" },
    { label: "Arbeitszahl", value: "JAZ bis 4,8+" },
    { label: "Garantie", value: "Bis zu 10 Jahre Systemgarantie" },
  ],
  highlights: [
    "Komplette Abwicklung von Planung über Förderantrag bis zur fertigen Montage",
    "Automatische thermische Speicherbeladung bei Solarstromüberschuss",
    "Demontage und fachgerechte Entsorgung Ihrer alten Öl- oder Gasheizung",
    "Hydraulischer Abgleich für maximale Fördersätze und optimalen Betrieb",
  ]
}

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
  const [modalData, setModalData] = useState<ProductDetailData | null>(null)
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
            {activeTab === "panels" && <SolarPanelsContent y={y} onOpenModal={setModalData} />}
            {activeTab === "battery" && <BatteryContent onOpenModal={setModalData} />}
            {activeTab === "inverter" && <InverterTabContent onOpenModal={setModalData} />}
            {activeTab === "emergency" && <EmergencyContent onOpenModal={setModalData} />}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <ProductDetailModal data={modalData} onClose={() => setModalData(null)} />
    </section>
  )
}

// ─── Solar Panels content ─────────────────────────────────────────────────────

function SolarPanelsContent({ y, onOpenModal }: { y: MotionValue<number>; onOpenModal: (data: ProductDetailData) => void }) {
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
          <strong className="text-foreground font-black">Förderbar & steuerfrei:</strong> Sparen Sie Kosten und erzeugen Sie Ihren eigenen Strom. 
          Mit einer modernen Photovoltaikanlage machen Sie sich in Bremen und Umgebung dauerhaft unabhängig von Energieversorgern und steigenden Strompreisen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 gap-4 sm:gap-5 mb-10"
        >
          {[
            { value: "0% MwSt.", label: "Dauerhaft steuerfrei (19% Ersparnis)" },
            { value: "Bis 80%", label: "Stromkosten im Haushalt senken" },
            { value: "20 Jahre", label: "Staatliche EEG-Einspeisevergütung" },
            { value: "30 Jahre", label: "Lineare Leistungsgarantie" },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-4 shadow-micro border border-primary/15">
              <div className="text-2xl font-black text-foreground tracking-tight">{stat.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="space-y-3.5 mb-8"
        >
          {[
            "Dauerhaft 0% Mehrwertsteuer auf Solaranlage & Speicher sparen",
            "Strom für nur ca. 8–10 ct/kWh selbst erzeugen statt 38+ ct/kWh zahlen",
            "20 Jahre staatlich garantierte Einspeisevergütung nach EEG",
            "Schlüsselfertige Montage & Netzanschluss vom Meisterbetrieb Bremen",
          ].map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground/90">
              <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-primary" />
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
          className="flex flex-wrap items-center gap-3"
        >
          <Button 
            asChild
            className="rounded-full px-7 py-6 bg-foreground text-background hover:bg-foreground/90 group cursor-pointer shadow-md font-bold"
          >
            <a href="#calculator" className="flex items-center gap-2">
              <span>Photovoltaik-Angebot anfragen</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button 
            variant="ghost"
            onClick={() => onOpenModal(MODULES_PRODUCT)}
            className="rounded-full px-5 py-6 text-xs font-bold text-muted-foreground hover:text-foreground"
          >
            Technische Daten
          </Button>
        </motion.div>
      </div>

      {/* Real Photo Slider Visualization */}
      <motion.div style={{ y }} className="relative">
        <FeaturePhotoCarousel
          slides={SOLAR_SLIDES}
          badgeIcon={Sun}
          badgeIconColor="text-amber-400"
          accentColorClass="text-amber-400"
          autoPlayInterval={4800}
        />
      </motion.div>
    </div>
  )
}

// ─── Battery content ─────────────────────────────────────────────────────────

function BatteryContent({ onOpenModal }: { onOpenModal: (data: ProductDetailData) => void }) {
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
          <Button 
            onClick={() => onOpenModal(BATTERY_PRODUCT)}
            className="rounded-full px-6 py-3 bg-foreground text-background hover:bg-foreground/90 group cursor-pointer"
          >
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

function InverterTabContent({ onOpenModal }: { onOpenModal: (data: ProductDetailData) => void }) {
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
          <Button 
            onClick={() => onOpenModal(INVERTER_PRODUCT)}
            className="rounded-full px-6 py-3 bg-foreground text-background hover:bg-foreground/90 group cursor-pointer"
          >
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
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
        </g>
      </svg>
    </div>
  )
}

// ─── Emergency Power tab content ──────────────────────────────────────────────

function EmergencyContent({ onOpenModal }: { onOpenModal: (data: ProductDetailData) => void }) {
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
          <Button 
            onClick={() => onOpenModal(EMERGENCY_PRODUCT)}
            className="rounded-full px-6 py-3 bg-foreground text-background hover:bg-foreground/90 group cursor-pointer"
          >
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
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 360] }}
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
  const [modalData, setModalData] = useState<ProductDetailData | null>(null)
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
            {activeTab === "indoor" && <IndoorUnitContent onOpenModal={setModalData} />}
            {activeTab === "outdoor" && <OutdoorUnitContent onOpenModal={setModalData} />}
            {activeTab === "statistics" && <HeatPumpStatisticsContent onOpenModal={setModalData} />}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <ProductDetailModal data={modalData} onClose={() => setModalData(null)} />
    </section>
  )
}

// ─── Indoor Unit tab content ──────────────────────────────────────────────────

function IndoorUnitContent({ onOpenModal }: { onOpenModal: (data: ProductDetailData) => void }) {
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
          <strong className="text-foreground font-black">Bis zu 70% staatliche KfW-Förderung:</strong> Tauschen Sie Ihre alte Gas- oder Ölheizung gegen eine moderne Wärmepumpe und sichern Sie sich bis zu 21.000 € Zuschuss vom Staat. 
          Senken Sie Ihre Heizkosten um bis zu 65% und heizen Sie 100% zukunftssicher, unabhängig von Öl und Gas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 gap-4 sm:gap-5 mb-10"
        >
          {[
            { value: "Bis 70%", label: "Staatlicher KfW-Zuschuss (bis 21.000 €)" },
            { value: "-65%", label: "Heizkosten dauerhaft einsparen" },
            { value: "A+++", label: "Höchste Energieeffizienzklasse" },
            { value: "100%", label: "Unabhängig von Öl & Gaspreisen" },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-4 shadow-micro border border-primary/15">
              <div className="text-2xl font-black text-foreground tracking-tight">{stat.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="space-y-3.5 mb-8"
        >
          {[
            "Bis zu 70% Förderung (KfW 458): Grundförderung + Klimabonus gesichert",
            "Heizkosten drastisch senken: Nutzt bis zu 75% kostenlose Umweltwärme",
            "Nie wieder teures Öl oder Gas kaufen – dauerhafter Schutz vor CO2-Steuern",
            "Heizen im Winter & Kühlen im Sommer bei flüsterleisem Betrieb (nur 25 dB)",
          ].map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground/90">
              <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
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
          className="flex flex-wrap items-center gap-3"
        >
          <Button 
            asChild
            className="rounded-full px-7 py-6 bg-foreground text-background hover:bg-foreground/90 group cursor-pointer shadow-md font-bold"
          >
            <a href="#calculator" className="flex items-center gap-2">
              <span>Wärmepumpen-Angebot anfragen</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button 
            variant="ghost"
            onClick={() => onOpenModal(HP_INDOOR_PRODUCT)}
            className="rounded-full px-5 py-6 text-xs font-bold text-muted-foreground hover:text-foreground"
          >
            Technische Daten
          </Button>
        </motion.div>
      </div>

      {/* Real Photo Slider Visualization */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        <FeaturePhotoCarousel
          slides={HEATPUMP_SLIDES}
          badgeIcon={Thermometer}
          badgeIconColor="text-primary"
          accentColorClass="text-primary"
          autoPlayInterval={4800}
        />
      </motion.div>
    </div>
  )
}

// ─── Outdoor Unit tab content ─────────────────────────────────────────────────

function OutdoorUnitContent({ onOpenModal }: { onOpenModal: (data: ProductDetailData) => void }) {
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
          <Button 
            onClick={() => onOpenModal(HP_OUTDOOR_PRODUCT)}
            className="rounded-full px-6 py-3 bg-foreground text-background hover:bg-foreground/90 group cursor-pointer"
          >
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
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
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

function HeatPumpStatisticsContent({ onOpenModal }: { onOpenModal: (data: ProductDetailData) => void }) {
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

      {/* Action CTA card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6 }}
        className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 glass rounded-3xl p-6 border border-primary/20 bg-primary/5 shadow-soft"
      >
        <div>
          <h4 className="font-bold text-foreground text-base">Bereit für den Umstieg auf eine moderne Wärmepumpe?</h4>
          <p className="text-xs text-muted-foreground mt-1">Erhalten Sie bis zu 70% staatliche KfW-Förderung und senken Sie Ihre Heizkosten dauerhaft.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <Button
            onClick={() => onOpenModal(HP_SYSTEM_PRODUCT)}
            variant="outline"
            className="rounded-full px-5 py-2.5 text-xs font-semibold cursor-pointer w-full sm:w-auto"
          >
            Systemdetails
          </Button>
          <Button
            asChild
            className="rounded-full px-6 py-2.5 bg-foreground text-background hover:bg-foreground/90 text-xs font-bold cursor-pointer w-full sm:w-auto shadow-sm"
          >
            <a href="/#calculator">
              Angebot berechnen
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}


