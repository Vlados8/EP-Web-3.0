"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Thermometer, Zap, ShieldCheck, BarChart3, MessageSquare, CheckCircle2, MapPin, Wind } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WaermepumpeBremerhavenPage() {
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
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold tracking-widest uppercase mb-6 text-pretty">
              Experte für klimatechnische Lösungen in Bremerhaven
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-[1.1]">
              Wärmepumpe <span className="text-gradient-energy">Bremerhaven</span> – Effizienz direkt am Hafen
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-12">
              Planen Sie den **Wärmepumpe Einbau Bremerhaven**? Empire Premium Bau ist Ihr regionaler Partner für intelligente Heizlösungen. Wir sind spezialisiert auf die **Wärmepumpe Installation Bremerhaven** unter Berücksichtigung lokaler Gegebenheiten.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-bold shadow-elevated group" id="hero-cta">
                <a href="/#calculator">
                  Jetzt Angebot einholen
                  <Zap className="ml-2 w-5 h-5 group-hover:fill-current transition-all" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg font-bold border-2">
                <a href="#tech">Wärme aus Luft</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coastal Context Section */}
      <section id="tech" className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.08),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="glass-strong p-12 rounded-[48px] border border-white/10 relative z-10">
                <Wind className="w-16 h-16 text-secondary mb-8" />
                <h3 className="text-2xl font-black mb-4 uppercase italic tracking-tighter">Robuste Klimatechnik</h3>
                <p className="text-slate-400 text-sm italic mb-8 italic">Unsere Systeme sind für die feuchte, norddeutsche Luft in Bremerhaven konzipiert.</p>
                <div className="grid grid-cols-2 gap-4">
                  {["Anti-Korrosion", "Smart Control", "Leise Betrieb", "Eco-Mode"].map((t, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-glow" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-black mb-8 italic uppercase tracking-tighter leading-tight">Wärmepumpe mit Photovoltaik Bremerhaven</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Maximieren Sie Ihre Energieeffizienz durch die **Kombination von Photovoltaik und Wärmepumpe**. In Bremerhaven unterstützen wir Sie dabei, selbsterzeugten Strom direkt in wertvolle Heizwärme umzuwandeln.
              </p>
              <ul className="space-y-4 mb-10">
                {["Senkung der Energiekosten um bis zu 80%", "Integrierte Smart-Home Steuerung", "Regionale Förderung Seestadt nutzen"].map((point, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-300 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                    {point}
                  </div>
                ))}
              </ul>
              <Button asChild size="lg" variant="secondary" className="rounded-full px-10 py-8 text-xl font-bold bg-secondary text-white hover:bg-white hover:text-slate-900 transition-premium shadow-glow uppercase">
                <a href="#costs">Zu den Details</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Pillar */}
      <section id="costs" className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">Wärmepumpe Beratung Bremerhaven</h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Jedes Gebäude in der Seestadt hat eigene Anforderungen. Wir bieten Ihnen ein maßgeschneidertes **Wärmepumpe Angebot Bremerhaven**, das technologische Exzellenz mit Wirtschaftlichkeit vereint.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Planung", icon: BarChart3, desc: "Sorgfältige Berechnung der Heizlast für Ihre Immobilie." },
              { title: "Zertifizierung", icon: ShieldCheck, desc: "Fachmännische Abnahme und Dokumentation aller Arbeiten." },
              { title: "Förderung", icon: Zap, desc: "Maximale Nutzung staatlicher Zuschüsse in Deutschland 2026." }
            ].map((service, i) => (
              <div key={i} className="p-10 rounded-[40px] border border-slate-100 shadow-soft hover:shadow-xl transition-premium group text-center">
                <service.icon className="w-12 h-12 text-secondary mx-auto mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold mb-4 uppercase text-sm tracking-widest italic">{service.title}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Bremerhaven */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-16 text-center italic uppercase tracking-tighter">Häufige Fragen Seestadt</h2>
          <div className="space-y-6">
            {[
              { q: "Funktioniert eine Wärmepumpe auch bei Wind und Kälte?", a: "Moderne Luft-Wasser-Wärmepumpen arbeiten bis -25°C zuverlässig. Speziell in Bremerhaven sorgen sie das ganze Jahr über für wohlige Wärme." },
              { q: "Was kostet die Wärmepumpe Installation Bremerhaven?", a: "Die Kosten hängen stark vom Modell und der Einbausituation ab. Kontaktieren Sie uns für ein präzises **Wärmepumpe Angebot Bremerhaven**." },
              { q: "Ist eine Kopplung mit einer Solaranlage sinnvoll?", a: "Ja, der Eigenverbrauch des Solarstroms erhöht die Wirtschaftlichkeit Ihrer Wärmepumpe massiv." },
              { q: "Gibt es regionale Förderungen für Bremerhaven?", a: "Wir beraten Sie tagesaktuell zu allen verfügbaren Fördergeldern im Bundesland Bremen." }
            ].map((faq, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all hover:bg-slate-50">
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

      {/* Final Call */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="bg-secondary text-white rounded-[70px] p-12 md:p-32 text-center relative overflow-hidden shadow-elevated transition-transform hover:scale-[1.01]">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
            <h2 className="text-4xl md:text-7xl font-black mb-10 relative z-10 italic uppercase tracking-tighter leading-tight">
              Ihre Energiewende <br className="hidden md:block" /> Startet Hier
            </h2>
            <p className="text-white/80 text-lg mb-12 relative z-10 max-w-2xl mx-auto font-medium">
              Starten Sie jetzt mit Ihrer persönlichen **Wärmepumpe Bremerhaven**. Wir beraten Sie kompetent und herstellerunabhängig.
            </p>
            <Button asChild size="lg" className="rounded-full px-14 py-10 text-2xl font-black bg-white text-secondary hover:bg-slate-900 hover:text-white relative z-10 shadow-glow uppercase transition-all">
              <a href="/#calculator">Unverbindlich anfragen</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
