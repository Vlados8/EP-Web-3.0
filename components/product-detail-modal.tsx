"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle2, ShieldCheck, Zap, ArrowRight, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface ProductDetailData {
  title: string
  subtitle: string
  tag: string
  category: "pv" | "heatpump"
  specs: { label: string; value: string }[]
  highlights: string[]
  description: string
  image?: string
}

interface ProductDetailModalProps {
  data: ProductDetailData | null
  onClose: () => void
}

export function ProductDetailModal({ data, onClose }: ProductDetailModalProps) {
  if (!data) return null

  const handleRequestQuote = () => {
    onClose()
    const element = document.getElementById("calculator")
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      window.history.replaceState(null, "", "#calculator")
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-card border border-border/60 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/40 bg-muted/30">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                {data.tag}
              </span>
              <h3 className="text-base font-bold text-foreground">
                Komponenten-Details
              </h3>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-muted hover:bg-muted/80 text-foreground flex items-center justify-center transition-colors"
              aria-label="Schließen"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground uppercase tracking-tight mb-2">
                {data.title}
              </h2>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                {data.description}
              </p>
            </div>

            {/* Spec grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {data.specs.map((s, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-muted/40 border border-border/30">
                  <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{s.label}</div>
                  <div className="text-base sm:text-lg font-black text-foreground mt-0.5">{s.value}</div>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-foreground uppercase tracking-wider">
                Ihre Vorteile auf einen Blick:
              </h4>
              <div className="space-y-2">
                {data.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badge */}
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs text-muted-foreground">
                <span className="font-bold text-foreground block">Geprüfte Premium-Qualität</span>
                Ausschließlich zertifizierte Komponenten führender Hersteller, montiert von unserem eigenen Meisterbetrieb.
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-6 border-t border-border/40 bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-muted-foreground text-center sm:text-left">
              Unverbindliche Beratung & Festpreisangebot
            </div>
            <Button
              onClick={handleRequestQuote}
              className="w-full sm:w-auto rounded-full px-8 py-6 bg-foreground text-background hover:bg-foreground/90 font-black uppercase text-sm tracking-wider shadow-elevated flex items-center justify-center gap-2 group"
            >
              <span>Angebot für dieses System</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
