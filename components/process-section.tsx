"use client"

import { motion } from "framer-motion"
import { MessageSquare, ClipboardList, PenTool, CheckCircle2 } from "lucide-react"

const steps = [
  {
    title: "Beratung",
    description: "Wir analysieren Ihren individuellen Energiebedarf und die Gegebenheiten vor Ort.",
    icon: MessageSquare,
    color: "bg-blue-600"
  },
  {
    title: "Planung",
    description: "Maßgeschneiderte technische Planung Ihrer Photovoltaik- oder Wärmepumpenlösung.",
    icon: ClipboardList,
    color: "bg-amber-600"
  },
  {
    title: "Installation",
    description: "Fachgerechte und schnelle Umsetzung durch unsere zertifizierten Montageteams.",
    icon: PenTool,
    color: "bg-indigo-600"
  },
  {
    title: "Inbetriebnahme",
    description: "Einweisung in das System und Übergabe der betriebsbereiten Anlage.",
    icon: CheckCircle2,
    color: "bg-emerald-600"
  }
]

export function ProcessSection() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black tracking-tighter text-foreground italic uppercase"
          >
            So funktioniert es
          </motion.h2>
          <div className="w-20 h-1.5 bg-primary mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-muted-foreground/10 -translate-y-12 z-0" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className={`w-24 h-24 rounded-[32px] ${step.color} flex items-center justify-center text-white mb-8 shadow-glow-lg group-hover:scale-110 transition-transform duration-500`}>
                <step.icon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase italic tracking-tight">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px] font-medium">
                {step.description}
              </p>
              
              {/* Step number badge */}
              <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-xs font-black text-muted-foreground shadow-soft">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
