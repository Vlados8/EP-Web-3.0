"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  Users, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  Wrench, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  HeartHandshake, 
  SunMedium, 
  Briefcase,
  Flame,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { value: "100%", label: "Eigenes Fachpersonal", desc: "Keine anonymen Subunternehmer" },
  { value: "1.000+", label: "Realisierte Projekte", desc: "In Bremen & Norddeutschland" },
  { value: "Meister", label: "Geführter Betrieb", desc: "Elektro- & Klimatechnik" },
  { value: "25 Jahre", label: "Leistungsgarantie", desc: "Höchste Verlässlichkeit" },
]

const departments = [
  {
    title: "Energieberatung & Projektierung",
    desc: "Unsere Berater analysieren Ihre Dachgeometrie, Verbrauchsprofile und Fördermöglichkeiten für die perfekte wirtschaftliche Auslegung.",
    icon: SunMedium,
    color: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-500",
  },
  {
    title: "Dachmontage & Solarteure",
    desc: "Zertifizierte Monteure installieren Ihre Module sturmsicher, materialschonend und nach strengsten handwerklichen Sicherheitsstandards.",
    icon: Zap,
    color: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-500",
  },
  {
    title: "Elektromeister & Netzanbindung",
    desc: "Unsere Meister und Elektrotechniker kümmern sich um Zählerschrank, Wechselrichter, Speicheranbindung und die bürokratische Netzbetreiber-Anmeldung.",
    icon: ShieldCheck,
    color: "from-blue-500/20 to-indigo-500/10",
    iconColor: "text-blue-500",
  },
  {
    title: "Wärmepumpen- & SHK-Spezialisten",
    desc: "Hydraulischer Abgleich, Demontage alter Heizsysteme und präzise Einbindung modernster Wärmepumpentechnik für maximale Jahresarbeitszahlen.",
    icon: Flame,
    color: "from-cyan-500/20 to-blue-500/10",
    iconColor: "text-cyan-500",
  },
]

const values = [
  {
    title: "Echtes Handwerk auf Augenhöhe",
    desc: "Bei uns gibt es keine leeren Marketing-Versprechen. Wir sind ein anpackendes Team, das vor Ort für beste Ergebnisse arbeitet.",
    icon: Wrench,
  },
  {
    title: "Zuverlässig & Termintreu",
    desc: "Von der Zusage bis zur schlüsselfertigen Übergabe halten wir unsere Absprachen pünktlich und transparent ein.",
    icon: CheckCircle2,
  },
  {
    title: "Regionale Nähe zu Ihnen",
    desc: "Unser Standort in Bremen bedeutet schnelle Wege, persönliche Ansprechpartner und Service auch Jahre nach der Montage.",
    icon: HeartHandshake,
  },
]

export function TeamPageContent() {
  const [imgSrc, setImgSrc] = useState<string>("/team.jpg")

  return (
    <div className="flex-grow pt-32 pb-24">
      {/* ─── Hero Section ─────────────────────────────────── */}
      <section className="relative px-6 max-w-7xl mx-auto mb-16 text-center">
        {/* Glow ambient background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-primary/15 via-secondary/10 to-transparent blur-3xl -z-10 pointer-events-none" />

        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Empire Premium Bau • Unser Team</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1] mb-6"
        >
          Die Köpfe hinter Ihrer <br className="hidden sm:inline" />
          <span className="text-gradient-energy">persönlichen Energiewende</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Lernen Sie die Menschen kennen, die täglich mit meisterhafter Präzision, Leidenschaft 
          und hanseatischer Zuverlässigkeit für saubere Energie in Bremen und ganz Norddeutschland sorgen.
        </motion.p>
      </section>

      {/* ─── Grand Team Photo Showcase ─────────────────────── */}
      <section className="px-6 max-w-7xl mx-auto mb-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative group rounded-3xl overflow-hidden border border-border/80 dark:border-white/10 bg-card shadow-elevated"
        >
          {/* Subtle Ambient Backlight */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition duration-700 pointer-events-none" />

          {/* Photo container with 16:9 ratio */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] min-h-[360px] sm:min-h-[440px] lg:min-h-[540px] overflow-hidden bg-slate-900 flex items-center justify-center">
            <img
              src={imgSrc}
              alt="Das Team von Empire Premium Bau"
              onError={() => {
                // Fallback to existing working photo if /team.jpg is not yet uploaded
                if (imgSrc !== "/solar_team_working_1.png") {
                  setImgSrc("/solar_team_working_1.png")
                }
              }}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
            />

            {/* Gradient Overlay for legibility & premium look */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Top Floating Badge */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex flex-wrap gap-2.5 z-10">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg">
                <Users className="w-4 h-4 text-primary" />
                <span>Empire Premium Bau Mannschaft</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/90 text-primary-foreground text-xs font-bold shadow-lg">
                <Check className="w-3.5 h-3.5" />
                <span>Meistergeführt</span>
              </div>
            </div>

            {/* Bottom Caption Info */}
            <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="max-w-xl text-white">
                <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1">
                  Teamgeist & Kompetenz
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white drop-shadow-md">
                  Handwerk, das begeistert.
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed line-clamp-2">
                  Gemeinsam planen, montieren und vernetzen wir modernste Photovoltaik- und Wärmepumpensysteme aus einer Hand.
                </p>
              </div>

              <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>Standort Bremen & 100 km Radius</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid Under Photo */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm text-center shadow-soft hover:shadow-medium transition-all"
            >
              <div className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                {item.value}
              </div>
              <div className="text-sm font-bold text-primary mt-1">
                {item.label}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5 font-medium">
                {item.desc}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ─── Departments & Competencies ────────────────────── */}
      <section className="px-6 max-w-7xl mx-auto mb-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
            Gewerke & Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Alle Fachbereiche fest im eigenen Haus
          </h2>
          <p className="text-muted-foreground mt-3 text-base sm:text-lg">
            Vom ersten Beratungsgespräch bis zum Zählerwechsel arbeiten alle Gewerke Hand in Hand – ohne Reibungsverluste.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {departments.map((dept, i) => {
            const Icon = dept.icon
            return (
              <motion.div
                key={dept.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-8 rounded-3xl border border-border bg-card shadow-soft hover:shadow-elevated transition-all group overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${dept.color} rounded-bl-full pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`} />
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-6">
                  <Icon className={`w-6 h-6 ${dept.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                  {dept.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {dept.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ─── Values / Culture ──────────────────────────────── */}
      <section className="bg-muted/40 py-20 border-y border-border mb-24">
        <div className="px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-black tracking-tight text-foreground">
              Worauf Sie sich bei uns verlassen können
            </h2>
            <p className="text-muted-foreground mt-2 text-base">
              Unsere Grundsätze für jede Baustelle und jeden Kundenkontakt.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <div
                  key={v.title}
                  className="bg-card p-8 rounded-3xl border border-border shadow-soft flex flex-col items-start"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Bottom Dual CTA ───────────────────────────────── */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* CTA 1: Request offer */}
          <div className="p-10 rounded-3xl bg-foreground text-background relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <span className="text-xs uppercase font-bold tracking-widest text-primary">
                Projekt anfragen
              </span>
              <h3 className="text-2xl sm:text-3xl font-black mt-2 mb-4 text-white">
                Bereit für Ihre Energiezukunft?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                Nutzen Sie unseren Online-Rechner und erhalten Sie innerhalb kürzester Zeit Ihr maßgeschneidertes Angebot für Photovoltaik oder Wärmepumpe.
              </p>
            </div>
            <div className="relative z-10">
              <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6">
                <a href="/#calculator">
                  Jetzt Angebot anfordern
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* CTA 2: Careers */}
          <div className="p-10 rounded-3xl border border-border bg-card relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <span className="text-xs uppercase font-bold tracking-widest text-primary">
                Karriere & Jobs
              </span>
              <h3 className="text-2xl sm:text-3xl font-black mt-2 mb-4 text-foreground">
                Teil unseres Teams werden
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8">
                Wir suchen laufend motivierte Solarteure, Elektrotechniker und Quereinsteiger, die gemeinsam mit uns die Energiewende vorantreiben wollen.
              </p>
            </div>
            <div className="relative z-10">
              <Button asChild variant="outline" size="lg" className="rounded-full font-bold px-8 py-6 border-foreground/20 hover:bg-muted">
                <a href="/karriere">
                  Offene Stellen ansehen
                  <Briefcase className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
