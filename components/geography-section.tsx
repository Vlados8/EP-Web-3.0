"use client"

import { motion } from "framer-motion"
import { MapPin, Navigation, Globe, Shield } from "lucide-react"

const cities = ["Bremen", "Oldenburg", "Bremerhaven", "Delmenhorst", "Achim", "Stuhr", "Syke", "Verden", "Osterholz-Scharmbeck"]

export function GeographySection() {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Navigation className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary/80">Regionaler Fokus</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black mb-8 italic uppercase tracking-tighter leading-tight">
              Unser <span className="text-primary">Einsatzgebiet</span>
            </h2>
            
            <p className="text-slate-400 text-lg mb-8 leading-relaxed font-medium">
              Wir arbeiten in der Region Norddeutschland und betreuen Kunden im gesamten Umkreis von 100 km rund um Bremen. 
              Unsere lokalen Teams garantieren schnelle Reaktionszeiten und persönliche Beratung vor Ort.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
              {cities.map((city, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-xl border border-white/10 shadow-soft"
                >
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm font-bold text-white uppercase tracking-tight">{city}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-6 p-6 bg-slate-800/80 rounded-3xl border border-white/10 shadow-soft">
              <Shield className="w-12 h-12 text-primary shrink-0" />
              <div>
                <h4 className="font-black italic uppercase text-lg tracking-tight mb-1 text-white">Ihr Vorteil vor Ort</h4>
                <p className="text-sm text-slate-400 font-medium italic leading-relaxed">
                  Kurze Anfahrtswege, lokale Expertise und direkte Ansprechpartner in Ihrer Nähe.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-[64px] overflow-hidden border border-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/10 opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4/5 h-4/5 rounded-full border-2 border-white/5 flex items-center justify-center animate-pulse-slow">
                  <Globe className="w-32 h-32 text-white/10" />
                </div>
              </div>
              
              {/* Radar effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full border border-primary/30 animate-ping opacity-20" />
              
              {/* 100km radius marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-4xl font-black text-white italic uppercase tracking-tighter mb-1">100 KM</div>
                <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Umkreis Bremen</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
