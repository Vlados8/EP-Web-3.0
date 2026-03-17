"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Thermometer, Zap, ShieldCheck, BarChart3, MessageSquare, CheckCircle2, MapPin, Wind } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WaermepumpeBremenPage() {
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
              Ihr Spezialist für Wärmetechnik in Bremen
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-[1.1]">
              Wärmepumpe <span className="text-gradient-energy">Bremen</span> – Effizient & Nachhaltig Heizen
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-12">
              Suchen Sie nach einem Experten für den **Wärmepumpe Einbau Bremen**? Empire Premium Bau ist Ihr regionaler Partner für moderne Heizsysteme. Wir bieten professionelle **Wärmepumpe Installation Bremen** und integrierte Lösungen mit Photovoltaik.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-bold shadow-elevated group" id="hero-cta">
                <a href="/#calculator">
                  Jetzt Angebot anfordern
                  <Zap className="ml-2 w-5 h-5 group-hover:fill-current transition-all" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg font-bold border-2">
                <a href="#costs">Kosten prüfen</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Combined Solution Highlight */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-8 italic uppercase tracking-tighter">Wärmepumpe mit Photovoltaik Bremen</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Die ultimative **Kombination aus Photovoltaik und Wärmepumpe** macht Sie nahezu energieautark. Nutzen Sie Ihren eigenen Solarstrom, um Ihr Haus in Bremen zu heizen – umweltfreundlich und extrem kosteneffizient.
              </p>
              <div className="space-y-4">
                {[
                  "Hybridlösung Wärmepumpe Photovoltaik für maximale Ersparnis",
                  "Intelligente Steuerung für optimale Eigenstromnutzung",
                  "Bis zu 80% weniger Heizkosten im Jahr",
                  "Regionale Förderung Wärmepumpe Deutschland 2026 nutzen"
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
                  <Thermometer className="w-12 h-12 text-secondary" />
                  <Zap className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 italic">Die Komplettlösung</h3>
                <p className="text-slate-400 text-sm italic mb-8">Wir installieren Solar und Wärmepumpe als perfekt aufeinander abgestimmtes System.</p>
                <div className="h-40 w-full rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <span className="text-xs font-black uppercase tracking-[0.5em] opacity-30">Smart Energy Flow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Costs & Commercial Section */}
      <section id="costs" className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">Wärmepumpe Kosten & Beratung</h2>
          <p className="text-slate-600 mb-16 max-w-2xl mx-auto">
            Was kostet ein moderner **Wärmepumpe Einbau Einfamilienhaus Bremen**? Wir bieten Ihnen volle Transparenz und ein maßgeschneidertes **Wärmepumpe Angebot Bremen**.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl border border-slate-100 shadow-soft hover:border-secondary/30 transition-all group">
              <BarChart3 className="w-10 h-10 text-secondary mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Beratung</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Individuelle **Wärmepumpe Beratung Bremen** direkt bei Ihnen vor Ort.</p>
            </div>
            <div className="p-8 rounded-3xl border border-slate-100 shadow-soft hover:border-secondary/30 transition-all group">
              <Wind className="w-10 h-10 text-secondary mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Planung</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Wir berechnen die optimale Heizlast für Ihr Gebäude.</p>
            </div>
            <div className="p-8 rounded-3xl border border-slate-100 shadow-soft hover:border-secondary/30 transition-all group">
              <ShieldCheck className="w-10 h-10 text-secondary mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Förderung</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Maximale staatliche Zuschüsse durch unsere zertifizierten Experten.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Informational FAQ Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black mb-16 text-center italic uppercase tracking-tighter">Häufige Fragen zu Wärmepumpen</h2>
          <div className="space-y-6">
            {[
              { q: "Lohnt sich eine Wärmepumpe mit Photovoltaik?", a: "Absolut. Durch die **Photovoltaik Anlage mit Wärmepumpe** nutzen Sie kostenlosen Solarstrom für Ihre Heizung, was die Amortisationszeit deutlich verkürzt." },
              { q: "Was kostet eine Wärmepumpe in Deutschland 2026?", a: "Die Kosten hängen vom Modell und dem Aufwand ab. Wir erstellen Ihnen ein detailliertes **Wärmepumpe Angebot Bremen**, das alle Förderungen berücksichtigt." },
              { q: "Wie funktioniert eine Wärmepumpe mit Solar?", a: "Überschüssiger Solarstrom wird direkt in Heizwärme oder Warmwasser umgewandelt. Eine intelligente Steuerung sorgt dafür, dass die Wärmepumpe bevorzugt läuft, wenn die Sonne scheint." },
              { q: "Gibt es eine Solar Firma Bremen, die beides macht?", a: "Ja, Empire Premium Bau ist Ihre spezialisierte **Solar Firma Bremen** für kombinierte Energielösungen." }
            ].map((faq, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <h4 className="font-black mb-4 flex gap-4 text-slate-900 italic">
                  <MessageSquare className="w-5 h-5 text-secondary shrink-0" />
                  {faq.q}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed pl-9 font-medium">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Geo-Targets Service Area */}
      <section className="py-24 bg-background border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-bold mb-8 uppercase tracking-widest">
            <MapPin className="w-4 h-4" /> Servicegebiet NordWEST
          </div>
          <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">Wärmepumpe Nähe Bremen & Umgebung</h2>
          <p className="text-slate-600 mb-12 font-medium">
            Wir sind nicht nur in Bremen aktiv. Als Experten für **Wärmepumpe Oldenburg**, **Wärmepumpe Bremerhaven** und **Solar Delmenhorst** decken wir das gesamte Umland ab.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
            <span>Bremen</span>
            <span>Oldenburg</span>
            <span>Bremerhaven</span>
            <span>Delmenhorst</span>
            <span>Niedersachsen</span>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="bg-secondary text-white rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden shadow-elevated">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
            <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10 uppercase tracking-tighter italic">
              Jetzt Energieautark werden
            </h2>
            <p className="text-white/80 text-lg mb-12 relative z-10 max-w-2xl mx-auto font-medium">
              Starten Sie jetzt mit Ihrer persönlichen **Solar und Wärmepumpe Komplettlösung**. Wir beraten Sie kompetent und herstellerunabhängig.
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
