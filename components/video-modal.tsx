"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sun, Battery, Thermometer, ShieldCheck, ArrowRight, Sparkles, Flame, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
}

type SimulationMode = "solar" | "heatpump" | "combined"

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const [mode, setMode] = useState<SimulationMode>("combined")
  const [livePower, setLivePower] = useState(8.6)
  const [heatOutput, setHeatOutput] = useState(4.2)

  // Live pulsing numbers for high-tech telemetry feeling
  useEffect(() => {
    if (!isOpen) return
    const interval = setInterval(() => {
      setLivePower(prev => +(8.2 + Math.random() * 1.6).toFixed(1))
      setHeatOutput(prev => +(4.0 + Math.random() * 0.8).toFixed(1))
    }, 1800)
    return () => clearInterval(interval)
  }, [isOpen])

  const handleGoToCalculator = () => {
    onClose()
    const element = document.getElementById("calculator")
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      window.history.replaceState(null, "", "#calculator")
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8">
          {/* Soft clean backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Main Modal - Clean light theme matching website design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative w-full max-w-5xl bg-background border border-border/80 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[92vh]"
          >
            {/* Top Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/60 bg-card">
              <div className="flex items-center gap-3">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight flex items-center gap-2">
                    Empire Premium <span>Energiesystem 360°</span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold tracking-wide">
                      INTERAKTIV
                    </span>
                  </h3>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    Photovoltaik, Stromspeicher & Wärmepumpe im perfekten Zusammenspiel
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-muted hover:bg-muted/80 text-foreground flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Schließen"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="px-6 py-3 bg-muted/20 border-b border-border/40 flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Betriebsmodus wählen:
              </div>
              <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-2xl border border-border/50">
                <button
                  onClick={() => setMode("combined")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    mode === "combined"
                      ? "bg-background text-foreground shadow-xs border border-border/40"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  ⚡ Kombi-System (PV + WP)
                </button>
                <button
                  onClick={() => setMode("solar")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    mode === "solar"
                      ? "bg-background text-foreground shadow-xs border border-border/40"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  ☀️ Solar-Erzeugung
                </button>
                <button
                  onClick={() => setMode("heatpump")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    mode === "heatpump"
                      ? "bg-background text-foreground shadow-xs border border-border/40"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  ♨️ Wärmepumpen-Betrieb
                </button>
              </div>
            </div>

            {/* Animation Stage */}
            <div className="relative flex-1 overflow-y-auto p-4 sm:p-6 bg-background space-y-5">
              {/* Telemetry Dashboard Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-micro">
                  <div className="flex items-center gap-2 text-amber-500 text-xs font-semibold mb-1">
                    <Sun className="w-4 h-4" />
                    <span>Solar-Leistung</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-foreground">
                    {mode === "heatpump" ? "2.4 kW" : `${livePower} kW`}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">N-Type TOPCon Glas-Glas</div>
                </div>

                <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-micro">
                  <div className="flex items-center gap-2 text-primary text-xs font-semibold mb-1">
                    <Battery className="w-4 h-4" />
                    <span>Batteriestatus</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-foreground">
                    {mode === "heatpump" ? "78%" : "96%"}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">12.5 kWh LFP-Speicher</div>
                </div>

                <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-micro">
                  <div className="flex items-center gap-2 text-sky-600 text-xs font-semibold mb-1">
                    <Thermometer className="w-4 h-4" />
                    <span>Wärme-Effizienz</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-foreground">
                    COP {heatOutput}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">R290 Vorlauf bis 75°C</div>
                </div>

                <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-micro">
                  <div className="flex items-center gap-2 text-indigo-600 text-xs font-semibold mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>Autarkiegrad</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-foreground">
                    {mode === "combined" ? "Bis zu 92%" : "Bis zu 80%"}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">Netzunabhängig</div>
                </div>
              </div>

              {/* Animated House Simulation Canvas - Clean light aesthetic */}
              <div className="relative w-full h-[280px] sm:h-[340px] rounded-2xl bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/80 dark:from-slate-900/60 dark:to-slate-950 border border-border/80 overflow-hidden flex items-center justify-center shadow-micro">
                {/* Subtle warm & cool lighting */}
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-amber-200/25 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-200/25 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Simulation SVG */}
                <svg className="w-full h-full max-w-2xl px-2 sm:px-6" viewBox="0 0 600 320" fill="none">
                  {/* Sun */}
                  <g transform="translate(100, 60)">
                    <circle cx="0" cy="0" r="26" fill="#F59E0B" />
                    <circle cx="0" cy="0" r="34" stroke="#FBBF24" strokeWidth="2" strokeDasharray="4 4" className="animate-spin-slow origin-center" />
                    <text x="-12" y="5" fill="#FFFFFF" fontSize="14" fontWeight="bold">☀️</text>
                  </g>

                  {/* Flow from Sun to Solar Roof */}
                  <path d="M 125 75 Q 180 90 230 110" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="5 5" className="animate-pulse" />

                  {/* House Structure */}
                  <g id="house">
                    {/* Roof */}
                    <polygon points="300,70 180,140 420,140" fill="#334155" stroke="#1E293B" strokeWidth="2" />
                    
                    {/* Solar Panels on Roof */}
                    <polygon points="295,85 210,135 270,135 315,95" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" />
                    <polygon points="305,85 325,95 390,135 330,135" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" />
                    
                    {/* Main Building Body */}
                    <rect x="200" y="140" width="200" height="130" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" rx="6" />

                    {/* Windows with warm gentle light */}
                    <rect x="225" y="160" width="40" height="40" rx="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
                    <rect x="335" y="160" width="40" height="40" rx="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
                    
                    {/* Door */}
                    <rect x="280" y="210" width="40" height="60" rx="4" fill="#64748B" stroke="#475569" strokeWidth="1.5" />

                    {/* Inside: Battery Storage */}
                    <g transform="translate(230, 225)">
                      <rect x="0" y="0" width="28" height="40" rx="4" fill="#10B981" stroke="#059669" strokeWidth="1.5" />
                      <line x1="6" y1="12" x2="22" y2="12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                      <line x1="6" y1="20" x2="22" y2="20" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                      <line x1="6" y1="28" x2="22" y2="28" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                    </g>

                    {/* Inside: Inverter */}
                    <g transform="translate(345, 225)">
                      <rect x="0" y="0" width="26" height="32" rx="4" fill="#0284C7" stroke="#0369A1" strokeWidth="1.5" />
                      <circle cx="13" cy="16" r="6" fill="#BAE6FD" />
                    </g>
                  </g>

                  {/* Heat Pump Outdoor Unit (Right Side of House) */}
                  <g id="heatpump-outdoor" transform="translate(450, 220)">
                    <rect x="0" y="0" width="55" height="50" rx="8" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
                    {/* Fan */}
                    <circle cx="27" cy="25" r="16" stroke="#06B6D4" strokeWidth="1.5" fill="#F1F5F9" />
                    <line x1="27" y1="11" x2="27" y2="39" stroke="#06B6D4" strokeWidth="2" className="animate-spin origin-center" />
                    <line x1="13" y1="25" x2="41" y2="25" stroke="#06B6D4" strokeWidth="2" className="animate-spin origin-center" />
                  </g>

                  {/* Dynamic Energy Lines */}
                  {/* 1. Solar Roof down to Inverter */}
                  <path
                    d="M 310 140 L 358 225"
                    stroke="#F59E0B"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                    className="animate-pulse"
                  />

                  {/* 2. Inverter to Battery */}
                  <path
                    d="M 345 240 L 260 240"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                    className="animate-pulse"
                  />

                  {/* 3. Inverter to Heat Pump */}
                  <path
                    d="M 370 240 L 450 240"
                    stroke="#0284C7"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                    className="animate-pulse"
                  />

                  {/* 4. Heat Pump warm airflow */}
                  <path
                    d="M 450 230 Q 425 210 400 220"
                    stroke="#F97316"
                    strokeWidth="2.5"
                    strokeDasharray="5 5"
                    className="animate-pulse"
                  />

                  {/* Clear labels */}
                  <text x="300" y="55" fill="#0369A1" fontSize="11" fontWeight="bold" textAnchor="middle" className="tracking-wide">
                    Photovoltaik-Anlage (Glas-Glas)
                  </text>
                  <text x="244" y="280" fill="#059669" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Batteriespeicher
                  </text>
                  <text x="477" y="285" fill="#0891B2" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Wärmepumpe
                  </text>
                </svg>

                {/* Floating Clean Badge */}
                <div className="absolute bottom-3 left-4 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-card/95 border border-border/80 text-foreground text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                  <Activity className="w-3.5 h-3.5 text-primary animate-pulse" />
                  <span>100% Ökostrom & Wärme im Eigenverbrauch</span>
                </div>
              </div>

              {/* Clean Feature Benefit Cards */}
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-card border border-border/80 flex items-start gap-3 shadow-micro">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0 mt-0.5">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-foreground">Eigenen Strom erzeugen</h5>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">Modernste Glas-Glas-Module mit 30 Jahren Leistungsgarantie.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-card border border-border/80 flex items-start gap-3 shadow-micro">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-600 shrink-0 mt-0.5">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-foreground">Günstig & sauber heizen</h5>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">Wärmepumpe nutzt kostenlosen PV-Strom für Heizung & Warmwasser.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-card border border-border/80 flex items-start gap-3 shadow-micro">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-foreground">Alles aus einer Hand</h5>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">Beratung, Förderung, Montage & Inbetriebnahme durch Meisterbetrieb.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Conversion Bar */}
            <div className="p-5 sm:p-6 bg-card border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="text-sm font-bold text-foreground flex items-center justify-center sm:justify-start gap-2">
                  <span>Berechnen Sie jetzt Ihr persönliches Angebot</span>
                  <span className="text-xs text-primary font-semibold bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                    100% Kostenlos
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  In 2 Minuten online konfigurieren • Region Bremen + 100km • Unverbindlich
                </p>
              </div>

              <Button
                onClick={handleGoToCalculator}
                size="lg"
                className="w-full sm:w-auto rounded-full px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm tracking-wide shadow-sm flex items-center justify-center gap-2 group transition-all cursor-pointer"
              >
                <span>Kostenloses Angebot berechnen</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
