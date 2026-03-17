"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Sun, Thermometer, ShieldCheck, Zap, MessageSquare, CheckCircle2, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PhotovoltaikBremenPage() {
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
              Regionaler Partner in Bremen
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-[1.1]">
              Photovoltaik <span className="text-gradient-energy">Bremen</span> – Solarenergie für Ihr Zuhause
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-12">
              Empire Premium Bau ist Ihr Fachpartner für die Installation von Photovoltaikanlagen und Wärmepumpen in **Bremen** und Umgebung. Wir unterstützen Sie dabei, Ihre Energiekosten nachhaltig zu senken und unabhängig von steigenden Strompreisen zu werden.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-bold shadow-elevated group" id="contact-cta">
                <a href="/#calculator">
                  Kostenlose Beratung anfordern
                  <Zap className="ml-2 w-5 h-5 group-hover:fill-current transition-all" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-tight">Expertise in Photovoltaik & Wärmepumpen</h2>
              <p className="text-slate-600 mb-8 leading-relaxed italic">
                Als Experten für **Solar Bremen** bieten wir Ihnen keine Lösungen von der Stange. Wir planen jede Anlage individuell, um die maximale Effizienz für Ihr Dach in Bremen, Oldenburg oder Delmenhorst herauszuholen.
              </p>
              <ul className="space-y-4">
                {[
                  "Hochleistungs-Photovoltaik-Module",
                  "Moderne Stromspeicher-Systeme",
                  "Effiziente Wärmepumpen-Installation",
                  "Individuelle Wirtschaftlichkeits-Analyse"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <div className="grid grid-cols-2 gap-4 translate-y-8">
              <div className="space-y-4 pt-12">
                <div className="glass-strong p-8 rounded-3xl shadow-soft">
                  <Sun className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-bold mb-2">Solar Bremen</h3>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-black">Effizienz</p>
                </div>
                <div className="glass-strong p-8 rounded-3xl shadow-soft">
                  <Zap className="w-10 h-10 text-secondary mb-4" />
                  <h3 className="font-bold mb-2 uppercase tracking-tighter">Speicher</h3>
                  <p className="text-xs text-slate-500 italic">Strom nutzen, wenn Sie ihn brauchen.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="glass-strong p-8 rounded-3xl shadow-soft">
                  <Thermometer className="w-10 h-10 text-accent mb-4" />
                  <h3 className="font-bold mb-2">Wärme</h3>
                  <p className="text-xs text-slate-500 font-medium">Nachhaltig heizen.</p>
                </div>
                <div className="glass-strong p-8 rounded-3xl shadow-soft">
                  <ShieldCheck className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-bold mb-2 uppercase tracking-widest">Service</h3>
                  <p className="text-xs text-slate-500">Volle Wartung.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Content */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-12 uppercase tracking-tighter">Warum Photovoltaik Installation Bremen?</h2>
          <div className="grid sm:grid-cols-3 gap-8 text-left">
            <div className="p-8 rounded-3xl bg-background border border-slate-100 shadow-soft">
              <h4 className="font-black mb-4 text-primary uppercase text-xs tracking-[0.2em]">01. Kosten sparen</h4>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Mit einer eigenen Solaranlage in Bremen senken Sie Ihre Stromkosten ab dem ersten Tag um bis zu 80%.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-background border border-slate-100 shadow-soft">
              <h4 className="font-black mb-4 text-primary uppercase text-xs tracking-[0.2em]">02. Freiheit</h4>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Machen Sie sich frei von den Preisschwankungen der großen Energiekonzerne durch regionale Eigenversorgung.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-background border border-slate-100 shadow-soft">
              <h4 className="font-black mb-4 text-primary uppercase text-xs tracking-[0.2em]">03. Zukunft</h4>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Reduzieren Sie Ihren CO2-Fußabdruck massiv und leisten Sie einen Beitrag zur Energiewende in Norddeutschland.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-black mb-16 text-center uppercase tracking-tighter">FAQ – Solarenergie in Bremen</h2>
        <div className="space-y-6 text-left">
          {[
            { q: "Lohnt sich Photovoltaik in Bremen?", a: "Ja, absolut. Trotz des norddeutschen Wetters erzielen moderne PV-Anlagen in Bremen hohe Erträge, da sie auch diffuses Licht hervorragend nutzen." },
            { q: "Welche Förderungen gibt es für Solaranlagen in Bremen?", a: "Neben der bundesweiten Einspeisevergütung und KfW-Krediten gibt es oft regionale Förderprogramme. Wir beraten Sie zu den aktuellen Möglichkeiten." },
            { q: "Wie lange dauert eine Photovoltaik Installation Bremen?", a: "Nach der Planung dauert die reine Montage vor Ort meist nur 1 bis 3 Tage." },
            { q: "Kombiniert Empire Premium Bau Photovoltaik und Wärmepumpen?", a: "Ja, das ist unsere Spezialität. Die Kombination aus Wärmepumpe Einbau Bremen und einer Solaranlage bietet die höchste Effizienz." }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold mb-4 flex gap-3 italic">
                <MessageSquare className="w-5 h-5 text-primary shrink-0" />
                {item.q}
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed pl-8">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Service Area */}
      <section className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-bold mb-8">
            <MapPin className="w-4 h-4" /> Servicegebiet
          </div>
          <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">Region Nordwest</h2>
          <p className="text-slate-600 mb-12">
            Unser Hauptsitz befindet sich in **Bremen**. Wir installieren Solaranlagen und Wärmepumpen in einem Umkreis von **100 km**, einschließlich:
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
            <span>Bremen</span>
            <span>Oldenburg</span>
            <span>Bremerhaven</span>
            <span>Delmenhorst</span>
            <span>Verden</span>
            <span>Syke</span>
            <span>Osterholz-Scharmbeck</span>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#020617] text-white rounded-[32px] p-12 md:p-20 text-center relative overflow-hidden shadow-elevated border border-white/5">
            <div className="absolute inset-0 bg-primary/5 blur-[100px] pointer-events-none translate-y-1/2" />
            <h2 className="text-3xl md:text-5xl font-black mb-8 relative z-10 uppercase tracking-tighter italic">
              Bereit für Ihre Energiewende in Bremen?
            </h2>
            <p className="text-slate-400 text-lg mb-12 relative z-10 max-w-2xl mx-auto">
              Lassen Sie uns gemeinsam berechnen, wie viel Sie mit einer Solaranlage sparen können. Kontaktieren Sie uns noch heute für ein unverbindliches Angebot.
            </p>
            <Button asChild size="lg" className="rounded-full px-12 py-8 text-xl font-bold bg-primary text-white hover:bg-primary/90 relative z-10 shadow-glow">
              <a href="/#calculator">Handeln Sie jetzt</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
