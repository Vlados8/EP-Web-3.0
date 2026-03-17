"use client"

import { motion } from "framer-motion"
import { Camera, MapPin, CheckCircle2 } from "lucide-react"

const projects = [
  {
    image: "/solar_installation_bremen_1.png",
    title: "Photovoltaik-Anlage",
    location: "Bremen-Hastedt",
    description: "12,4 kWp Komplettanlage mit Batteriespeicher."
  },
  {
    image: "/heat_pump_installation_bremen_1.png",
    title: "Wärmepumpen-Einbau",
    location: "Oldenburg",
    description: "Luft-Wasser-Wärmepumpe für ein Einfamilienhaus."
  },
  {
    image: "/solar_roof_clean.png",
    title: "Dachmontage",
    location: "Delmenhorst",
    description: "Professionelle Installation durch unser Fach-Team."
  }
]

export function ProjectGallery() {
  return (
    <section className="py-24 bg-muted/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
          >
            <Camera className="w-4 h-4" />
            <span className="text-sm font-black uppercase tracking-widest">Unsere Referenzen</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-tight mb-6"
          >
            Echte <span className="text-primary">Projekte</span> aus der Region
          </motion.h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Überzeugen Sie sich von unserer Arbeitsqualität. Hier sehen Sie Auszüge unserer täglichen Arbeit in Norddeutschland.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative glass rounded-[32px] overflow-hidden border border-white/5 shadow-soft hover:shadow-elevated transition-all duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-white/90 text-xs font-bold uppercase tracking-widest mb-2">
                    <MapPin className="w-3 h-3 text-primary" />
                    {project.location}
                  </div>
                  <h3 className="text-xl font-black text-white italic uppercase tracking-tight">{project.title}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Abgeschlossen</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
