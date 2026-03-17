"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "Was kostet eine Photovoltaikanlage in Deutschland?",
    answer: "Die Kosten für eine Photovoltaikanlage hängen von der Größe und Ausstattung ab. In der Regel liegen die Preise zwischen 8.000 € und 20.000 €. Eine individuelle Beratung hilft dabei, die optimale Lösung für Ihr Gebäude zu finden."
  },
  {
    question: "Was kostet eine Wärmepumpe?",
    answer: "Die Kosten für eine Wärmepumpe variieren je nach System und Gebäude. Durchschnittlich liegen sie zwischen 15.000 € und 35.000 € inklusive Installation. Durch staatliche Förderungen können die Kosten deutlich reduziert werden."
  },
  {
    question: "Lohnt sich eine Kombination aus Photovoltaik und Wärmepumpe?",
    answer: "Ja, die Kombination aus Photovoltaik und Wärmepumpe ist besonders effizient. Der selbst erzeugte Solarstrom kann direkt für das Heizen genutzt werden. Dadurch sparen Sie Energiekosten und werden unabhängiger vom Strommarkt."
  },
  {
    question: "Welche Förderungen gibt es in Deutschland?",
    answer: "In Deutschland gibt es verschiedene Förderprogramme für Photovoltaikanlagen und Wärmepumpen. Je nach Projekt können Sie Zuschüsse oder günstige Kredite erhalten. Wir beraten Sie gerne zu aktuellen Fördermöglichkeiten."
  },
  {
    question: "Wie lange dauert die Installation?",
    answer: "Die Installation einer Photovoltaikanlage dauert in der Regel 1–3 Tage. Der Einbau einer Wärmepumpe kann je nach Projekt einige Tage bis wenige Wochen in Anspruch nehmen."
  },
  {
    question: "In welchen Regionen arbeiten Sie?",
    answer: "Wir arbeiten im Raum Bremen sowie im gesamten Umkreis von 100 km. Dazu gehören unter anderem: Oldenburg, Bremerhaven und Delmenhorst."
  },
  {
    question: "Wie schnell kann ich ein Angebot erhalten?",
    answer: "In der Regel erhalten Sie innerhalb von 24–48 Stunden ein individuelles Angebot."
  },
  {
    question: "Bieten Sie auch Wartung und Service an?",
    answer: "Ja, wir bieten neben der Installation auch Wartung und Service für Photovoltaikanlagen und Wärmepumpen an."
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 bg-slate-50/50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Support</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-tight mb-6"
          >
            Häufig gestellte <br />
            <span className="text-primary italic">Fragen (FAQ)</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 font-medium max-w-2xl mx-auto"
          >
            Hier finden Sie Antworten auf die wichtigsten Fragen rund um Photovoltaik und Wärmepumpen.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-[2rem] border transition-all duration-300 ${
                openIndex === index 
                  ? "bg-white border-primary/20 shadow-elevated" 
                  : "bg-white/50 border-slate-100 hover:border-primary/20 hover:bg-white"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none group"
              >
                <span className="text-lg font-bold text-slate-800 tracking-tight pr-8">
                  {faq.question}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                  openIndex === index ? "bg-primary text-white rotate-180" : "bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary"
                }`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-8 pt-0 text-slate-500 font-medium leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
