"use client"

import React, { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Home, 
  Users, 
  HelpCircle, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Calendar, 
  FileText, 
  Check, 
  ChevronRight,
  Sun,
  Thermometer,
  Lock
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

interface SavedInquiry {
  name?: string
  category?: string
  subcategory?: string
  zip?: string
  email?: string
  phone?: string
  date?: string
}

function ThankYouContent() {
  const searchParams = useSearchParams()
  const nameParam = searchParams.get("name") || ""
  const serviceParam = searchParams.get("service") || ""
  const zipParam = searchParams.get("zip") || ""

  const [inquiry, setInquiry] = useState<SavedInquiry>({
    name: nameParam,
    category: serviceParam || "Photovoltaik & Wärmepumpe",
    zip: zipParam
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("ep_last_inquiry")
        if (stored) {
          const parsed = JSON.parse(stored)
          setInquiry(prev => ({
            ...prev,
            ...parsed,
            name: parsed.name || prev.name,
            category: parsed.category || prev.category,
            zip: parsed.zip || prev.zip
          }))
        }
      } catch (e) {
        // ignore
      }
    }
  }, [])

  const displayName = inquiry.name ? inquiry.name.split(" ")[0] : ""
  const isSolar = inquiry.category?.toLowerCase().includes("solar") || inquiry.category?.toLowerCase().includes("photovoltaik")
  const isHeatPump = inquiry.category?.toLowerCase().includes("wärme") || inquiry.category?.toLowerCase().includes("waerme")

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pb-24">
      {/* Success Hero Badge & Heading */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="relative inline-flex items-center justify-center mb-6"
        >
          {/* Glowing pulse rings */}
          <div className="absolute inset-0 rounded-full bg-primary/25 animate-ping opacity-60 scale-125 pointer-events-none" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-emerald-400 blur-xl opacity-50 pointer-events-none" />
          
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary via-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-[0_15px_35px_-5px_rgba(34,197,94,0.5)] border-2 border-white/40">
            <Check className="w-10 h-10 sm:w-12 sm:h-12 stroke-[3]" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/30 bg-primary/10 text-primary text-xs sm:text-sm font-black uppercase tracking-wider mb-4 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Anfrage erfolgreich eingegangen
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground uppercase italic leading-[1.05]"
        >
          Vielen Dank{displayName ? `, ${displayName}` : ""}! <br />
          <span className="text-gradient-energy italic drop-shadow-sm">
            Ihr Angebot wird erstellt
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto"
        >
          Wir haben Ihre Angaben erfolgreich erhalten. Unsere Fachplaner und Energie-Experten prüfen derzeit die Machbarkeit und erstellen Ihre maßgeschneiderte Wirtschaftlichkeitsberechnung.
        </motion.p>

        {/* Trust Badges Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-bold text-foreground"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/80 border border-border">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            100% kostenlos & unverbindlich
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/80 border border-border">
            <Lock className="w-3.5 h-3.5 text-primary" />
            Keine Werbeanrufe
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/80 border border-border">
            <Clock className="w-3.5 h-3.5 text-primary" />
            Antwort in unter 24 Std.
          </span>
        </motion.div>
      </div>

      {/* Overview Card: Inquiry summary */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55 }}
        className="rounded-3xl glass-strong border border-border/60 p-6 sm:p-8 shadow-elevated mb-12 sm:mb-16 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/40">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Status Ihrer Anfrage</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-foreground">In Bearbeitung durch Meisterbetrieb</h2>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Region: Norddeutschland / Bremen + 100 km {inquiry.zip ? `• PLZ: ${inquiry.zip}` : ""}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start md:self-auto px-4 py-2 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-bold text-xs sm:text-sm">
            <Clock className="w-4 h-4 shrink-0" />
            <span>Garantierte Rückmeldung innerhalb von 24h</span>
          </div>
        </div>

        {/* Key details grid */}
        <div className="grid sm:grid-cols-3 gap-4 pt-6">
          <div className="p-4 rounded-2xl bg-muted/40 border border-border/40">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">Gewählte Lösung</span>
            <div className="flex items-center gap-2 font-black text-foreground text-sm sm:text-base">
              {isSolar ? <Sun className="w-4 h-4 text-amber-500" /> : isHeatPump ? <Thermometer className="w-4 h-4 text-emerald-500" /> : <Sparkles className="w-4 h-4 text-primary" />}
              <span>{inquiry.category || "Photovoltaik / Wärmepumpe"}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-muted/40 border border-border/40">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">Fördermöglichkeiten</span>
            <div className="font-black text-primary text-sm sm:text-base">
              Bis zu 70% KfW-Zuschuss
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-muted/40 border border-border/40">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">Ihr Ansprechpartner</span>
            <div className="font-black text-foreground text-sm sm:text-base">
              Empire Premium Bau Experten
            </div>
          </div>
        </div>
      </motion.div>

      {/* Next Steps: 3-Schritte Ablauf */}
      <div className="mb-12 sm:mb-16">
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-primary">Transparenter Ablauf</span>
          <h2 className="text-2xl sm:text-4xl font-black text-foreground uppercase italic tracking-tight mt-1">
            Was passiert als Nächstes?
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mt-2">
            In drei einfachen Schritten zu Ihrer neuen Energieunabhängigkeit:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="p-6 rounded-3xl glass border border-border/50 shadow-soft relative flex flex-col group hover:border-primary/40 transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center font-black text-lg mb-4 group-hover:scale-110 transition-transform">
              01
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Heute</span>
            <h3 className="text-lg font-black text-foreground uppercase italic mb-2">
              Prüfung & Vorab-Analyse
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-grow">
              Unsere Planungsingenieure analysieren Ihre Angaben, Gebäudegröße, Dachausrichtung (bzw. Heizlast) und die Einspeisemöglichkeiten.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="p-6 rounded-3xl glass border border-border/50 shadow-soft relative flex flex-col group hover:border-primary/40 transition-all bg-primary/[0.02]"
          >
            <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center font-black text-lg mb-4 group-hover:scale-110 transition-transform">
              02
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">Innerhalb 24 Stunden</span>
            <h3 className="text-lg font-black text-foreground uppercase italic mb-2">
              Individuelles Festpreisangebot
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-grow">
              Sie erhalten ein maßgeschneidertes Angebot inklusive 3D-Simulation, genauer Wirtschaftlichkeitsprognose und maximalem Fördermittel-Check.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="p-6 rounded-3xl glass border border-border/50 shadow-soft relative flex flex-col group hover:border-primary/40 transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-lg mb-4 group-hover:scale-110 transition-transform">
              03
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1">Persönlich & Vor Ort</span>
            <h3 className="text-lg font-black text-foreground uppercase italic mb-2">
              Kostenlose Beratung
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-grow">
              Auf Wunsch besprechen wir alle Details telefonisch oder unser Meisterbetrieb kommt für eine finale Begutachtung direkt zu Ihnen nach Hause.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Direct Contact Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.85 }}
        className="rounded-3xl bg-foreground text-background p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-12"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-primary mb-1 block">Dringende Fragen?</span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight">
              Möchten Sie etwas ergänzen oder direkt mit einem Meister sprechen?
            </h2>
            <p className="text-sm text-background/80 mt-2 max-w-md leading-relaxed">
              Unser Team in Bremen steht Ihnen montags bis freitags von 08:00 bis 18:00 Uhr gerne persönlich zur Verfügung.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6">
              <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-black cursor-pointer shadow-lg">
                <a href="tel:+4917661951823" className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Jetzt anrufen: +49 176 61951823</span>
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold cursor-pointer">
                <a href="mailto:info@empire-premium-bau.de" className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>E-Mail senden</span>
                </a>
              </Button>
            </div>
          </div>

          <div className="space-y-4 lg:pl-8 lg:border-l lg:border-white/15">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-background/60 block">Standort & Büro</span>
                <span className="text-sm font-bold text-white">Hastedter Heerstraße 63, 28207 Bremen</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-background/60 block">Erreichbarkeit</span>
                <span className="text-sm font-bold text-white">Mo. – Fr.: 08:00 – 18:00 Uhr</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-background/60 block">Garantie</span>
                <span className="text-sm font-bold text-white">Zertifizierter Fachbetrieb für Photovoltaik & Wärmepumpen</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Return to Home & Navigation actions */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-center">
        <Button asChild size="lg" className="rounded-full px-8 py-6 text-sm font-black uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90 shadow-md cursor-pointer">
          <Link href="/" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            <span>Zurück zur Startseite</span>
          </Link>
        </Button>

        <Button asChild variant="outline" size="lg" className="rounded-full px-6 py-6 text-sm font-bold border-border/80 hover:bg-muted cursor-pointer">
          <Link href="/unser-team" className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span>Unser Team kennenlernen</span>
          </Link>
        </Button>

        <Button asChild variant="ghost" size="lg" className="rounded-full px-6 py-6 text-sm font-bold hover:bg-muted cursor-pointer">
          <Link href="/#faq" className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-muted-foreground" />
            <span>Häufige Fragen (FAQ)</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <main className="flex flex-col min-h-screen pt-28 sm:pt-36 bg-gradient-to-b from-background via-background to-muted/30 text-foreground overflow-x-clip">
      <Navigation />
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="flex-grow">
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <ThankYouContent />
        </Suspense>
      </div>

      <Footer />
    </main>
  )
}
