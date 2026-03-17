"use client"

import { motion } from "framer-motion"
import { Zap, Thermometer, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CombinedSolutionSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-black mb-8 italic uppercase tracking-tighter leading-tight">
              Photovoltaik & Wärmepumpe <br />
              <span className="text-gradient-energy">Die perfekte Kombination</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
              Maximieren Sie Ihre Energieunabhängigkeit, indem Sie Ihre Wärmepumpe mit eigenem Solarstrom betreiben. 
              Diese Synergie senkt Ihre Betriebskosten drastisch und macht Sie unabhängig von steigenden Strompreisen.
            </p>

            <div className="space-y-6 mb-10">
              {[
                {
                  title: "Eigenverbrauch optimieren",
                  desc: "Nutzen Sie Überschussstrom Ihrer PV-Anlage direkt für die Heizung oder Warmwasserbereitung."
                },
                {
                  title: "Maximale CO2-Ersparnis",
                  desc: "Heizen Sie zu 100% emissionsfrei mit der Kraft der Sonne."
                },
                {
                  title: "Intelligente Steuerung",
                  desc: "Unser Smart-Home-Energiemanager koordiniert beide Systeme für höchste Effizienz."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 glass rounded-2xl border border-primary/10">
                  <CheckCircle className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h4 className="font-bold text-foreground mb-1 italic uppercase tracking-tight text-sm">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild className="rounded-full px-8 py-6 bg-foreground text-background hover:bg-foreground/90 group shadow-glow">
              <a href="#calculator">
                <span className="text-lg font-black italic uppercase tracking-tight">Kombi-Angebot anfordern</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square glass-strong rounded-[64px] border border-primary/20 flex items-center justify-center p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
              
              {/* Visual representation of connection */}
              <div className="relative w-full h-full flex flex-col justify-between">
                <div className="flex justify-start">
                  <div className="w-32 h-32 rounded-3xl bg-accent/20 border border-accent/30 flex flex-col items-center justify-center shadow-glow-accent">
                    <Zap className="w-12 h-12 text-accent mb-2" />
                    <span className="text-[10px] font-black uppercase text-accent">Photovoltaik</span>
                  </div>
                </div>
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary animate-pulse-slow flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-primary" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="w-32 h-32 rounded-3xl bg-primary/20 border border-primary/30 flex flex-col items-center justify-center shadow-glow-primary">
                    <Thermometer className="w-12 h-12 text-primary mb-2" />
                    <span className="text-[10px] font-black uppercase text-primary">Wärmepumpe</span>
                  </div>
                </div>

                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 100 100">
                  <motion.path
                    d="M 30 30 Q 50 50 70 70"
                    stroke="url(#lineGrad)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    animate={{ strokeDashoffset: [0, -20] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--accent)" />
                      <stop offset="100%" stopColor="var(--primary)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
