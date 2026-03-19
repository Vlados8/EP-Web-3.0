"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Sun, Zap, ShieldCheck, BarChart3, MessageSquare, CheckCircle2, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PhotovoltaikDelmenhorstPage() {
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
              Ihre Solaranlagen-Experten in Delmenhorst
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-[1.1]">
              Photovoltaik <span className="text-gradient-solar">Delmenhorst</span> – Unabhängig & Grün
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-12">
              Planen Sie eine **Solaranlage Delmenhorst**? Empire Premium Bau ist Ihr regionaler Partner für moderne **Photovoltaik Installation Delmenhorst**. Wir begleiten Sie von der ersten Beratung bis zur fertigen Montage Ihres Solarsystems.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-bold shadow-elevated group" id="hero-cta">
                <a href="/#calculator">
                  Angebot berechnen
                  <Zap className="ml-2 w-5 h-5 group-hover:fill-current transition-all" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg font-bold border-2">
                <a href="#advantages">Ihre Vorteile</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="advantages" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight italic">Solar-Vorteile in Delmenhorst</h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-medium">
              Sichern Sie sich ein Stück Unabhängigkeit in Niedersachsen. Eine eigene PV-Anlage in Delmenhorst ist eine krisensichere Investition.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Maximale Erträge", 
                text: "Optimale Ausrichtung und modernste Hochleistungs-Module für Ihre Photovoltaik Delmenhorst.",
                icon: BarChart3 
              },
              { 
                title: "Schnelle Montage", 
                text: "Kompakte Planungszyklen und professionelle Umsetzung durch unser regionales Team.",
                icon: Zap 
              },
              { 
                title: "Integrierter Service", 
                text: "Von der Förderberatung bis zur Anmeldung beim Netzbetreiber in Delmenhorst.",
                icon: ShieldCheck 
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[32px] shadow-soft border border-slate-100 hover:border-primary/20 transition-premium group">
                <item.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter italic">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Combined Solution Segment */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center lg:text-left">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-black mb-8 italic uppercase tracking-tighter line-height-[1.1]">
                Photovoltaik mit Wärmepumpe Delmenhorst
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Kombinieren Sie Ihre Solaranlage mit einer modernen Wärmepumpe. Diese **Hybridlösung** ist der effizienteste Weg, Ihr Gebäude in Delmenhorst autark und nachhaltig zu bewirtschaften.
              </p>
              <Button asChild variant="ghost" className="rounded-full border border-white/20 text-white hover:bg-white hover:text-slate-900 px-8 py-6 font-bold uppercase tracking-widest text-xs">
                <a href="#faq">Mehr erfahren</a>
              </Button>
            </div>
            <div className="relative">
              <div className="glass-strong p-8 rounded-[40px] border border-white/10 relative">
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
                <img 
                  src="/logo.png" 
                  alt="Empire Premium Bau" 
                  className="h-8 mb-8 brightness-0 opacity-80" 
                />
                <h3 className="text-2xl font-bold mb-4 italic uppercase tracking-tighter text-slate-900">Echte Qualität</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-8 italic">
                  Höchste Standards für Photovoltaik in Delmenhorst. Wir verbauen nur, was wir selbst nutzen würden.
                </p>
                <div className="space-y-3">
                  {["Premium Module", "Smart Monitoring", "Speicher-Upgrades", "Expert-Service"].map((t, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-primary">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Delmenhorst */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black mb-16 text-center italic uppercase tracking-tighter">Solar-Wissen Delmenhorst</h2>
          <div className="space-y-6">
            {[
              { q: "Lohnt sich eine Solaranlage in Delmenhorst?", a: "Absolut. Bei den aktuellen Energiekosten amortisiert sich eine Photovoltaik Delmenhorst oft schon nach wenigen Jahren – besonders wenn Speicherlösungen integriert sind." },
              { q: "Was kostet eine Photovoltaik Installation Delmenhorst?", a: "Jedes Projekt ist verschieden. Wir erstellen Ihnen ein detailliertes **Solar Angebot Delmenhorst**, das genau auf Ihr Dach und Ihren Bedarf abgestimmt ist." },
              { q: "Wie lange dauert die Zulassung in Delmenhorst?", a: "Wir übernehmen die gesamte Kommunikation mit dem Netzbetreiber in Delmenhorst, um den Prozess für Sie so schnell und reibungslos wie möglich zu gestalten." },
              { q: "Welche Förderungen kann ich nutzen?", a: "Wir beraten Sie kompetent zu allen landes- und bundesweiten Fördermitteln für Ihre **Solaranlage Delmenhorst**." }
            ].map((faq, i) => (
              <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm hover:border-primary/40 transition-premium">
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

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="bg-primary text-white rounded-[40px] md:rounded-[48px] p-8 md:p-24 text-center relative overflow-hidden shadow-elevated">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            <h2 className="text-3xl md:text-6xl font-black mb-8 relative z-10 uppercase tracking-tighter italic">
              Ihr Weg zur Solaranlage
            </h2>
            <p className="text-white/80 text-lg mb-12 relative z-10 max-w-2xl mx-auto font-medium">
              Starten Sie jetzt Ihre Energiewende in Delmenhorst. Nutzen Sie unseren intelligenten Rechner für ein schnelles Angebot.
            </p>
            <Button asChild size="lg" variant="secondary" className="rounded-full px-8 py-6 md:px-12 md:py-9 text-xl md:text-2xl font-black bg-white text-primary hover:bg-slate-50 relative z-10 shadow-glow uppercase w-full sm:w-auto">
              <a href="/#calculator">Jetzt berechnen</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
