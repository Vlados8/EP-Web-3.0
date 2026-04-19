"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Zap, Shield, Heart, Globe } from "lucide-react"

const values = [
  {
    icon: Zap,
    title: "Innovation",
    description: "Wir setzen auf modernste Technologien in der Photovoltaik und Wärmepumpentechnik.",
    color: "bg-blue-500"
  },
  {
    icon: Shield,
    title: "Qualität",
    description: "Nur die hochwertigsten Komponenten finden den Weg in unsere Systeme.",
    color: "bg-green-500"
  },
  {
    icon: Heart,
    title: "Leidenschaft",
    description: "Unser Team brennt für die Energiewende und eine nachhaltige Zukunft.",
    color: "bg-red-500"
  },
  {
    icon: Globe,
    title: "Nachhaltigkeit",
    description: "Wir helfen Ihnen, Ihren ökologischen Fußabdruck dauerhaft zu reduzieren.",
    color: "bg-amber-500"
  }
]

export default function UeberUnsPage() {
  return (
    <main className="flex flex-col min-h-screen pt-32 bg-background text-foreground overflow-hidden">
      <Navigation />
      
      <div className="flex-grow">
        {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-8 tracking-tight"
          >
            Gemeinsam für eine <span className="text-primary prose-primary">grüne Zukunft</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Empire Premium Bau ist Ihr Partner für intelligente Energielösungen. Wir glauben, dass jeder Haushalt einen Beitrag zum Klimaschutz leisten kann – ohne Kompromisse bei Komfort und Effizienz.
          </motion.p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-slate-50 py-24 mb-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Unsere Philosophie</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Seit unserer Gründung steht die Empire Premium Bau UG für Exzellenz im Bereich der erneuerbaren Energien. Mit Sitz in Bremen betreuen wir Kunden in ganz Norddeutschland bei der Planung und Umsetzung ihrer individuellen Energiewende.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Wir begleiten Sie von der ersten unverbindlichen Beratung bis zur fertigen Installation und darüber hinaus. Qualität, Zuverlässigkeit und Transparenz sind dabei unser höchstes Gebot.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div 
                  key={v.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft"
                >
                  <div className={`w-12 h-12 ${v.color}/10 rounded-2xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 text-white`} style={{ color: 'inherit' }} />
                  </div>
                  <h3 className="font-bold mb-2">{v.title}</h3>
                  <p className="text-xs text-slate-500 leading-normal">{v.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
      </div>

      <Footer />
    </main>
  )
}
