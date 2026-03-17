"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Thermometer, Zap, ShieldCheck, BarChart3, MessageSquare, CheckCircle2, MapPin, Wind } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WaermepumpeAchimPage() {
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
              Ihr Fachbetrieb für Wärmepumpen in Achim
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-[1.1]">
              Wärmepumpe <span className="text-gradient-energy">Achim</span> – Effizient & Nachhaltig Heizen
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-12">
              Interessieren Sie sich für den **Wärmepumpe Einbau Achim**? Empire Premium Bau ist Ihr regionaler Experte für die **Wärmepumpe Installation Achim**. Wir sorgen für behagliche Wärme bei minimalen Betriebskosten.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-bold shadow-elevated group" id="hero-cta">
                <a href="/#calculator">
                  Angebot anfordern
                  <Zap className="ml-2 w-5 h-5 group-hover:fill-current transition-all" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg font-bold border-2">
                <a href="#costs">Förderung & Kosten</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technology Highlight */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-8 italic uppercase tracking-tighter line-height-[1.1]">
                Wärmepumpe mit Photovoltaik Achim
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Maximieren Sie Ihren Eigenverbrauch. Eine **Kombination aus Photovoltaik und Wärmepumpe** ist in Achim die wirtschaftlichste Lösung für Ihr Eigenheim oder Gewerbeobjekt.
              </p>
              <div className="space-y-4">
                {[
                  "Zukunftsweisende Technik aus einer Hand",
                  "Reduzierung der Heizkosten um bis zu 75%",
                  "Staatliche Förderung Deutschland 2026 optimal nutzen",
                  "Zertifizierte Fachberatung in Achim"
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
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
                <h3 className="text-2xl font-black mb-4 uppercase italic tracking-tighter">Pure Innovation</h3>
                <p className="text-slate-400 text-sm italic mb-8">Wir verbauen Systeme der nächsten Generation für Ihr Achimer Zuhause.</p>
                <div className="h-40 w-full rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center border border-white/5">
                  <span className="text-[10px] font-black uppercase tracking-[0.8em] opacity-30">Pure Efficiency</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Context */}
      <section id="costs" className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight italic">Wärmepumpe Beratung Achim</h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Jedes Haus stellt eigene Anforderungen. Wir erstellen Ihnen ein maßgeschneidertes **Wärmepumpe Angebot Achim**, das technologische Exzellenz mit Wirtschaftlichkeit vereint.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Individuelle Planung", icon: BarChart3, desc: "Wir berechnen die Heizlast für Ihr Gebäude in Achim präzise." },
              { title: "Zertifizierter Einbau", icon: ShieldCheck, desc: "Fachgerechte Installation durch unsere erfahrenen Heizungsexperten." },
              { title: "Wartungsservice", icon: Zap, desc: "Sicherheit und Effizienz durch unseren regionalen Wartungsdienst." }
            ].map((service, i) => (
              <div key={i} className="p-10 rounded-[48px] border border-slate-100 shadow-soft hover:shadow-2xl transition-premium text-center group">
                <service.icon className="w-12 h-12 text-secondary mx-auto mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold mb-4 uppercase text-sm tracking-widest italic">{service.title}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Segment */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black mb-16 text-center italic uppercase tracking-tighter text-pretty">Fragen zur Wärmepumpe in Achim</h2>
          <div className="space-y-6">
            {[
              { q: "Was kostet eine Wärmepumpe Installation Achim?", a: "Die Investition ist individuell. Wir klären alle Kosten in unserem detaillierten **Wärmepumpe Angebot Achim** – oft sogar durch attraktive Förderungen unterstützt." },
              { q: "Lohnt sich eine Wärmepumpe im Bestandsbau?", a: "Absolut. Mit der richtigen Planung und Beratung lassen sich Wärmepumpen auch in Achimer Bestandshäuser hocheffizient integrieren." },
              { q: "Gibt es regionale Förderungen in Achim?", a: "Wir informieren Sie tagesaktuell zu allen verfügbaren Fördergeldern auf Bundes- und Landesebene." },
              { q: "Ist die Kopplung mit Solar sinnvoll?", a: "Ja, der Eigenverbrauch des Solarstroms erhöht die Wirtschaftlichkeit Ihrer Wärmepumpe massiv. Das ist unser Spezialgebiet." }
            ].map((faq, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm transition-all hover:bg-slate-50">
                <h4 className="font-black mb-4 flex gap-4 text-slate-900 uppercase italic text-sm tracking-tight text-pretty">
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
            <h2 className="text-4xl md:text-7xl font-black mb-10 relative z-10 italic uppercase tracking-tighter leading-none">
              Modern Heizen <br /> in Achim
            </h2>
            <p className="text-white/80 text-lg mb-12 relative z-10 max-w-2xl mx-auto font-medium">
              Starten Sie jetzt mit Ihrer persönlichen **Wärmepumpe Achim**. Unser Expertenteam berät Sie kompetent und herstellerunabhängig.
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
