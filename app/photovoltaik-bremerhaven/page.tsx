"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Sun, Zap, ShieldCheck, BarChart3, MessageSquare, CheckCircle2, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PhotovoltaikBremerhavenPage() {
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
              Ihr Photovoltaik-Spezialist für Bremerhaven
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-[1.1]">
              Photovoltaik <span className="text-gradient-solar">Bremerhaven</span> – Die Kraft der Seeküste nutzen
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-12">
              Interessieren Sie sich für eine **Solaranlage Bremerhaven**? Empire Premium Bau bietet professionelle **Photovoltaik Installation Bremerhaven** und umfassende Energieberatung. Profitieren Sie von unserer Erfahrung an der Küste.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-bold shadow-elevated group" id="hero-cta">
                <a href="/#calculator">
                  Gratis-Angebot
                  <Zap className="ml-2 w-5 h-5 group-hover:fill-current transition-all" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg font-bold border-2">
                <a href="#coastal">Küsten-Vorteile</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coastal Context Section */}
      <section id="coastal" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight italic">Solartechnik an der Küste</h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-medium">
              In Bremerhaven nutzen wir die hohe Lichtintensität und die frische Brise, um Ihre Photovoltaikanlage optimal zu betreiben.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Korrosionsschutz", 
                text: "Witterungsbeständige Komponenten, speziell ausgewählt für die salzhaltige Luft in Bremerhaven.",
                icon: ShieldCheck 
              },
              { 
                title: "Windlast-Planung", 
                text: "Sichere Montage unter Berücksichtigung der norddeutschen Windverhältnisse.",
                icon: Zap 
              },
              { 
                title: "Lokale Expertise", 
                text: "Wir kennen die regionalen Gegebenheiten und Förderungen in der Seestadt.",
                icon: MapPin 
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[32px] shadow-soft border border-slate-100 group">
                <item.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter italic">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Segment */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.1),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-8 italic uppercase tracking-tighter">Wärmepumpe mit Photovoltaik Bremerhaven</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Kombinieren Sie Ihre Solaranlage mit einer hocheffizienten Wärmepumpe. Diese **Hybridlösung** wandelt selbsterzeugten Strom direkt in Wärme um – der smarteste Weg zur Autarkie in Bremerhaven.
              </p>
              <ul className="space-y-4 mb-10">
                {["Senkung der Energiekosten um bis zu 80%", "Unabhängigkeit von fossilen Brennstoffen", "Zukunftssichere Heiztechnik für Bremerhaven"].map((point, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-300 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {point}
                  </div>
                ))}
              </ul>
              <Button asChild size="lg" className="rounded-full px-10 py-8 text-xl font-bold bg-white text-slate-900 hover:bg-primary hover:text-white transition-premium shadow-glow">
                <a href="/#calculator">Jetzt planen</a>
              </Button>
            </div>
            <div className="relative">
              <div className="glass-strong p-12 rounded-[40px] border border-white/10 relative z-10 text-center">
                <BarChart3 className="w-16 h-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-black mb-4 uppercase italic">Ihre Rendite</h3>
                <p className="text-slate-400 text-sm italic mb-8">Wir berechnen das maximale Sparpotenzial Ihrer Solaranlage Bremerhaven.</p>
                <div className="h-1 bg-white/10 rounded-full mb-8 relative overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-primary"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 0.85 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Coastal Efficiency Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ for the region */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black mb-16 text-center italic uppercase tracking-tighter">Coastal FAQ Bremerhaven</h2>
          <div className="space-y-6">
            {[
              { q: "Lohnt sich eine Solaranlage in Bremerhaven bei viel Wind?", a: "Absolut. Unsere Installationssysteme sind für hohe Windlasten zertifiziert. Der Wind kühlt die Module zudem leicht ab, was deren Effizienz steigern kann." },
              { q: "Was kostet eine Photovoltaikanlage in Bremerhaven?", a: "Jedes Projekt ist individuell. Wir bieten Ihnen ein maßgeschneidertes **Solar Angebot Bremerhaven** inklusive Wirtschaftlichkeitsberechnung." },
              { q: "Übernehmen Sie auch die Anmeldung beim Netzbetreiber?", a: "Ja, wir bieten einen Full-Service an. Von der Planung über die **Photovoltaik Installation Bremerhaven** bis hin zur Zertifizierung und Anmeldung." },
              { q: "Gibt es spezielle Förderungen für die Seestadt?", a: "Wir informieren Sie über alle landesweiten und bundesweiten Förderprogramme, die für Bremerhaven relevant sind." }
            ].map((faq, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm transition-all hover:border-primary/30">
                <h4 className="font-black mb-4 flex gap-4 text-slate-900 uppercase italic text-sm tracking-tight text-pretty">
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
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-900 text-white rounded-[60px] p-12 md:p-24 text-center relative overflow-hidden shadow-elevated border border-white/5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
            <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10 italic uppercase tracking-tighter">
              Bringen Sie die Sonne an Bord
            </h2>
            <p className="text-slate-400 text-lg mb-12 relative z-10 max-w-2xl mx-auto font-medium">
              Sichern Sie sich jetzt Ihr kostenfreies Konzept für Ihre **Photovoltaik Bremerhaven**. Unser Expertenteam berät Sie unverbindlich.
            </p>
            <Button asChild size="lg" className="rounded-full px-12 py-9 text-2xl font-black bg-primary text-white hover:bg-white hover:text-slate-900 relative z-10 shadow-glow uppercase transition-premium">
              <a href="/#calculator">Handeln Sie jetzt</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
