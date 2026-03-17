"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Sun, Zap, ShieldCheck, BarChart3, MessageSquare, CheckCircle2, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PhotovoltaikOldenburgPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* SEO Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
              Ihre Experten für Solarenergie in Oldenburg
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-[1.1]">
              Photovoltaik <span className="text-gradient-solar">Oldenburg</span> – Stromkosten nachhaltig senken
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-12">
              Planen Sie eine **Photovoltaik Installation Oldenburg**? Empire Premium Bau ist Ihr regionaler Partner für maßgeschneiderte Solarlösungen. Wir bieten professionelle Beratung, Montage und Wartung für Ihre **Solaranlage Oldenburg**.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-bold shadow-elevated group" id="hero-cta">
                <a href="/#calculator">
                  Kostenlos berechnen
                  <Zap className="ml-2 w-5 h-5 group-hover:fill-current transition-all" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg font-bold border-2">
                <a href="#benefits">Ihre Vorteile</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Local Benefit Section */}
      <section id="benefits" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">Warum Solar in Oldenburg?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-medium">
              Nutzen Sie die Kraft der Sonne in Niedersachsen. Eine eigene PV-Anlage schützt Sie vor steigenden Strompreisen und schont die Umwelt.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Regionale Förderung", 
                text: "Wir beraten Sie zu aktuellen Subventionen in Oldenburg und Niedersachsen.",
                icon: ShieldCheck 
              },
              { 
                title: "Maximale Rendite", 
                text: "Optimale Planung für höchste Erträge Ihrer Solaranlage Oldenburg.",
                icon: BarChart3 
              },
              { 
                title: "Full-Service", 
                text: "Von der ersten Beratung bis zur fertigen Installation alles aus einer Hand.",
                icon: Sun 
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[32px] shadow-soft border border-slate-100 hover:border-primary/20 transition-all group">
                <item.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-4 uppercase tracking-tight italic">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Highlight */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="glass-strong p-8 rounded-[40px] border border-white/10 relative">
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
                <img 
                  src="/logo.png" 
                  alt="Empire Premium Bau" 
                  className="h-8 mb-8 brightness-0 invert opacity-50" 
                />
                <h3 className="text-2xl font-bold mb-4 italic uppercase tracking-tighter">Premium Qualität</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 italic">
                  Wir verbauen ausschließlich Hochleistungs-Module und intelligente Speicherlösungen für Ihr Oldenburger Zuhause.
                </p>
                <div className="space-y-3">
                  {["Glas-Glas Module", "Smart-Meter Integration", "Notstrom-Option", "App-Steuerung"].map((t, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-primary">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-black mb-8 italic uppercase tracking-tighter line-height-[1.1]">
                Photovoltaik mit Wärmepumpe Oldenburg
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Kombinieren Sie Ihre Solaranlage mit einer modernen Wärmepumpe. Diese **Hybridlösung** ist der effizienteste Weg, Ihr Gebäude in Oldenburg autark und nachhaltig zu bewirtschaften.
              </p>
              <Button asChild variant="outline" className="rounded-full border-white/20 text-white hover:bg-white hover:text-slate-900 px-8 py-6 font-bold uppercase tracking-widest text-xs">
                <a href="#faq">Mehr erfahren</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black mb-16 text-center italic uppercase tracking-tighter">Solar-Wissen für Oldenburg</h2>
          <div className="space-y-6">
            {[
              { q: "Was kostet eine Photovoltaikanlage in Oldenburg?", a: "Die Kosten hängen von der Größe und Ausstattung ab. Wir erstellen Ihnen ein individuelles **Solar Angebot Oldenburg**, das genau auf Ihre Bedürfnisse zugeschnitten ist." },
              { q: "Gibt es Förderungen für Solar in Niedersachsen?", a: "Ja, es gibt verschiedene bundesweite und regionale Programme. Wir unterstützen Sie bei der Beantragung aller relevanten Zuschüsse." },
              { q: "Wie lange dauert eine Photovoltaik Installation Oldenburg?", a: "Von der Beauftragung bis zur Inbetriebnahme dauert es je nach Projektumfang meist nur wenige Wochen. Die eigentliche Montage erfolgt oft in 1-2 Tagen." },
              { q: "Lohnt sich Photovoltaik auch bei bewölktem Wetter?", a: "Ja, moderne Module nutzen auch diffuses Licht zur Stromerzeugung. In Norddeutschland sind die Erträge über das Jahr gesehen sehr attraktiv." }
            ].map((faq, i) => (
              <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-black mb-4 flex gap-4 text-slate-900 italic uppercase text-sm tracking-tight">
                  <MessageSquare className="w-5 h-5 text-primary shrink-0" />
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
        <div className="max-w-5xl mx-auto">
          <div className="bg-primary text-white rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden shadow-elevated">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10 uppercase tracking-tighter italic">
              Ihr Weg zur Solaranlage
            </h2>
            <p className="text-white/80 text-lg mb-12 relative z-10 max-w-2xl mx-auto font-medium">
              Starten Sie jetzt Ihre Energiewende in Oldenburg. Nutzen Sie unseren intelligenten Rechner für ein schnelles Angebot.
            </p>
            <Button asChild size="lg" variant="secondary" className="rounded-full px-12 py-9 text-2xl font-black bg-white text-primary hover:bg-slate-50 relative z-10 shadow-glow uppercase">
              <a href="/#calculator">Jetzt berechnen</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
