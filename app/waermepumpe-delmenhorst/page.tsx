"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Thermometer, Zap, ShieldCheck, BarChart3, MessageSquare, CheckCircle2, MapPin, Wind } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WaermepumpeDelmenhorstPage() {
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
              Ihre Heizspezialisten in Delmenhorst
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-[1.1]">
              Wärmepumpe <span className="text-gradient-energy">Delmenhorst</span> – Sparsam & Effizient Heizen
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-12 text-pretty">
              Suchen Sie nach einem Fachbetrieb für den **Wärmepumpe Einbau Delmenhorst**? Empire Premium Bau ist Ihr regionaler Experte für moderne Heiztechnik. Wir bieten professionelle **Wärmepumpe Installation Delmenhorst** und umfassenden Service.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-bold shadow-elevated group" id="hero-cta">
                <a href="/#calculator">
                  Angebot berechnen
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

      {/* Technology Focus */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.08),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="glass-strong p-16 rounded-[60px] border border-white/10 relative z-10">
                <div className="glass-strong p-12 rounded-[48px] border border-white/10 relative z-10 transition-premium hover:shadow-2xl">
                  <Wind className="w-16 h-16 text-secondary mb-8" />
                  <h3 className="text-2xl font-black mb-4 uppercase italic tracking-tighter text-slate-900">Robuste Klimatechnik</h3>
                  <p className="text-slate-600 text-sm italic mb-8 font-medium">Unsere Systeme sind für die spezifischen Anforderungen in Delmenhorst und dem Oldenburger Land konzipiert.</p>
                  <div className="grid grid-cols-2 gap-4">
                    {["Hocheffizient", "Smart Control", "Leise Betrieb", "Eco-Mode"].map((t, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 rounded-2xl bg-slate-900/5 border border-slate-900/10 text-[10px] font-black uppercase tracking-widest text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-glow" />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-8 italic uppercase tracking-tighter leading-tight">Wärmepumpe mit Photovoltaik Delmenhorst</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed text-pretty">
                Die ideale **Hybridlösung**: Nutzen Sie selbsterzeugten Solarstrom, um Ihre Wärmepumpe in Delmenhorst zu betreiben. Das spart nicht nur Kosten, sondern macht Sie nachhaltig unabhängig von fossilen Brennstoffen.
              </p>
              <ul className="space-y-4 mb-10">
                {["Senkung der Energiekosten um bis zu 75%", "Staatliche Förderung Deutschland 2026", "Zertifizierter Einbau durch regionales Fachpersonal"].map((point, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-300 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    {point}
                  </div>
                ))}
              </ul>
              <Button asChild size="lg" className="rounded-full px-12 py-8 text-xl font-bold bg-white text-slate-900 hover:bg-secondary hover:text-white transition-premium shadow-glow uppercase">
                <a href="/#calculator">Handeln Sie jetzt</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Context */}
      <section id="costs" className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight italic">Wärmepumpe Beratung Delmenhorst</h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Wir begleiten Sie kompetent und professionell durch den gesamten Prozess Ihrer Energiewende in Delmenhorst.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Bedarfsanalyse", icon: BarChart3, desc: "Wir ermitteln präzise die benötigte Heizleistung für Ihre Immobilie." },
              { title: "Förderberatung", icon: Zap, desc: "Wir zeigen Ihnen, wie Sie das Maximum an Zuschüssen herausholen." },
              { title: "Regio-Service", icon: MapPin, desc: "Als lokaler Anbieter sind wir für Wartung und Support schnell vor Ort." }
            ].map((service, i) => (
              <div key={i} className="p-10 rounded-[48px] border border-slate-100 shadow-soft hover:shadow-2xl transition-all group text-center">
                <service.icon className="w-12 h-12 text-secondary mx-auto mb-6 group-hover:scale-110 transition-transform duration-500" />
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
          <h2 className="text-3xl md:text-5xl font-black mb-16 text-center italic uppercase tracking-tighter">Wärmepumpen-Check Delmenhorst</h2>
          <div className="space-y-6">
            {[
              { q: "Was kostet ein Wärmepumpe Einbau Delmenhorst?", a: "Die Kosten hängen von der Art der Wärmepumpe und den baulichen Gegebenheiten ab. Wir erstellen Ihnen ein transparentes **Wärmepumpe Angebot Delmenhorst**." },
              { q: "Lohnt sich eine Wärmepumpe im Bestandsbau?", a: "Ja, in den meisten Fällen lässt sich eine Wärmepumpe auch in bestehende Heizsysteme integrieren – oft sogar sehr effizient." },
              { q: "Welche Förderungen gibt es in Delmenhorst?", a: "Es gibt attraktive Programme auf Bundes- und Landesebene. Im Rahmen unserer **Wärmepumpe Beratung Delmenhorst** klären wir alle Details." },
              { q: "Wie leise ist eine moderne Wärmepumpe?", a: "Unsere Systeme sind extrem geräuscharm und erfüllen alle gesetzlichen Vorgaben für Wohngebiete in Delmenhorst problemlos." }
            ].map((faq, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm transition-premium rotate-[0.5deg] hover:rotate-0">
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
          <div className="bg-secondary text-white rounded-[40px] md:rounded-[70px] p-8 md:p-32 text-center relative overflow-hidden shadow-elevated transition-transform hover:scale-[1.01]">
            <h2 className="text-3xl md:text-7xl font-black mb-10 relative z-10 italic uppercase tracking-tighter leading-none">
              Modern Heizen <br /> in Delmenhorst
            </h2>
            <p className="text-white/80 text-lg mb-12 relative z-10 max-w-2xl mx-auto font-medium">
              Starten Sie jetzt mit Ihrer persönlichen **Wärmepumpe Delmenhorst**. Unser Expertenteam berät Sie kompetent und herstellerunabhängig.
            </p>
            <Button asChild size="lg" className="rounded-full px-8 py-6 md:px-14 md:py-10 text-xl md:text-2xl font-black bg-white text-secondary hover:bg-slate-900 hover:text-white relative z-10 shadow-glow uppercase transition-all w-full sm:w-auto">
              <a href="/#calculator">Unverbindlich anfragen</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
