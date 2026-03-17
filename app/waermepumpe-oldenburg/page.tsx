"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Thermometer, Zap, ShieldCheck, BarChart3, MessageSquare, CheckCircle2, MapPin, Wind } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WaermepumpeOldenburgPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* SEO Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold tracking-widest uppercase mb-6">
              Ihr Spezialist für Wärmetechnik in Oldenburg
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-[1.1]">
              Wärmepumpe <span className="text-gradient-energy">Oldenburg</span> – Modernes Heizen erleben
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-12">
              Suchen Sie nach Experten für den **Wärmepumpe Einbau Oldenburg**? Empire Premium Bau ist Ihr regionaler Partner für nachhaltige Heizsysteme. Wir bieten Fachwissen in der **Wärmepumpe Installation Oldenburg** und Systemintegration.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-bold shadow-elevated group" id="hero-cta">
                <a href="/#calculator">
                  Angebot erstellen
                  <Zap className="ml-2 w-5 h-5 group-hover:fill-current transition-all" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg font-bold border-2">
                <a href="#costs">Kosten & Förderung</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technology Highlight */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-8 italic uppercase tracking-tighter">Wärmepumpe mit Photovoltaik Oldenburg</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Profitieren Sie von der perfekten **Kombination aus Photovoltaik und Wärmepumpe**. Nutzen Sie selbsterzeugten Strom, um Ihr Haus in Oldenburg effizient zu beheizen – eine Investition, die sich doppelt lohnt.
              </p>
              <div className="space-y-4">
                {[
                  "Intelligente Hybridlösung für maximale Autarkie",
                  "Reduzierung der Heizkosten um bis zu 75%",
                  "Staatliche Förderung Wärmepumpe Deutschland 2026",
                  "Installation durch zertifizierte Oldenburger Fachkräfte"
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-slate-200">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="glass-strong p-12 rounded-[40px] border border-white/10 relative z-10">
                <div className="flex justify-between mb-8">
                  <Wind className="w-12 h-12 text-secondary" />
                  <Thermometer className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 italic uppercase tracking-tighter">Die Zukunft des Heizens</h3>
                <p className="text-slate-400 text-sm italic mb-8">Effizient, leise und umweltfreundlich – die perfekte Heizung für Oldenburg.</p>
                <div className="h-40 w-full rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center border border-white/5">
                  <span className="text-[10px] font-black uppercase tracking-[0.8em] opacity-30">Pure Innovation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Process */}
      <section id="costs" className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">Wärmepumpe Beratung Oldenburg</h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-medium">
              Wir begleiten Sie von der ersten Analyse bis zur Inbetriebnahme. Erhalten Sie jetzt Ihr individuelles **Wärmepumpe Angebot Oldenburg**.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Bedarfsanalyse", icon: BarChart3, desc: "Wir ermitteln die optimale Heizleistung für Ihr Gebäude." },
              { title: "Fachmontage", icon: ShieldCheck, desc: "Sauberer und schneller Einbau durch unsere Experten." },
              { title: "Wartung", icon: Zap, desc: "Langfristige Sicherheit durch unseren regionalen Service." }
            ].map((service, i) => (
              <div key={i} className="p-8 rounded-3xl border border-slate-100 shadow-soft hover:shadow-lg transition-all text-center group">
                <service.icon className="w-10 h-10 text-secondary mx-auto mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold mb-4 uppercase text-sm tracking-wider italic">{service.title}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black mb-16 text-center italic uppercase tracking-tighter">Häufige Fragen Oldenburg</h2>
          <div className="space-y-6">
            {[
              { q: "Lohnt sich die Umstellung auf eine Wärmepumpe?", a: "Bei den aktuellen Energiepreisen und Förderungen amortisiert sich eine Wärmepumpe oft schneller als gedacht – besonders in Kombi mit Solar." },
              { q: "Was kostet eine Wärmepumpe mit Einbau in Oldenburg?", a: "Die Kosten variieren je nach System. Fordern Sie ein unverbindliches **Wärmepumpe Angebot Oldenburg** bei uns an." },
              { q: "Kann eine Wärmepumpe auch im Altbau installiert werden?", a: "In vielen Fällen ja. Eine professionelle **Wärmepumpe Beratung Oldenburg** klärt die technischen Voraussetzungen." },
              { q: "Gibt es lokale Ansprechpartner bei Problemen?", a: "Ja, als regionales Unternehmen sind wir bei Service- oder Wartungsfragen schnell für Sie vor Ort." }
            ].map((faq, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <h4 className="font-black mb-4 flex gap-4 text-slate-900 italic uppercase text-sm tracking-tight">
                  <MessageSquare className="w-5 h-5 text-secondary shrink-0" />
                  {faq.q}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed pl-9 font-medium">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="bg-secondary text-white rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden shadow-elevated">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
            <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10 uppercase tracking-tighter italic leading-none">
              Jetzt Heizkosten halbieren
            </h2>
            <p className="text-white/80 text-lg mb-12 relative z-10 max-w-2xl mx-auto font-medium">
              Wechseln Sie jetzt zum Heizen der Zukunft. Nutzen Sie unser Expertenwissen für Ihre **Wärmepumpe Oldenburg**.
            </p>
            <Button asChild size="lg" variant="secondary" className="rounded-full px-12 py-9 text-2xl font-black bg-white text-secondary hover:bg-slate-50 relative z-10 shadow-glow uppercase">
              <a href="/#calculator">Handeln Sie jetzt</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
