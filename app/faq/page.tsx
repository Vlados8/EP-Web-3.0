import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FAQSection } from "@/components/faq-section"
import { motion } from "framer-motion"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Häufig gestellte Fragen (FAQ) | Empire Premium Bau',
  description: 'Antworten auf die wichtigsten Fragen zu Photovoltaik, Wärmepumpen und staatlichen Förderungen in Deutschland.',
}

export default function FAQPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-32">
        <FAQSection />
      </div>
      
      {/* JSON-LD for FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Was kostet eine Photovoltaikanlage in Deutschland?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Die Kosten für eine Photovoltaikanlage hängen von der Größe und Ausstattung ab. In der Regel liegen die Preise zwischen 8.000 € und 20.000 €. Eine individuelle Beratung hilft dabei, die optimale Lösung für Ihr Gebäude zu finden."
                }
              },
              {
                "@type": "Question",
                "name": "Was kostet eine Wärmepumpe?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Die Kosten für eine Wärmepumpe variieren je nach System und Gebäude. Durchschnittlich liegen sie zwischen 15.000 € und 35.000 € inklusive Installation. Durch staatliche Förderungen können die Kosten deutlich reduziert werden."
                }
              },
              {
                "@type": "Question",
                "name": "Lohnt sich eine Kombination aus Photovoltaik und Wärmepumpe?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, die Kombination aus Photovoltaik und Wärmepumpe ist besonders effizient. Der selbst erzeugte Solarstrom kann direkt für das Heizen genutzt werden. Dadurch sparen Sie Energiekosten und werden unabhängiger vom Strommarkt."
                }
              },
              {
                "@type": "Question",
                "name": "Welche Förderungen gibt es in Deutschland?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "In Deutschland gibt es verschiedene Förderprogramme für Photovoltaikanlagen und Wärmepumpen. Je nach Projekt können Sie Zuschüsse oder günstige Kredite erhalten. Wir beraten Sie gerne zu aktuellen Fördermöglichkeiten."
                }
              },
              {
                "@type": "Question",
                "name": "Wie lange dauert die Installation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Die Installation einer Photovoltaikanlage dauert in der Regel 1–3 Tage. Der Einbau einer Wärmepumpe kann je nach Projekt einige Tage bis wenige Wochen in Anspruch nehmen."
                }
              },
              {
                "@type": "Question",
                "name": "In welchen Regionen arbeiten Sie?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Wir arbeiten im Raum Bremen sowie im gesamten Umkreis von 100 km. Dazu gehören unter anderem: Oldenburg, Bremerhaven und Delmenhorst."
                }
              },
              {
                "@type": "Question",
                "name": "Wie schnell kann ich ein Angebot erhalten?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "In der Regel erhalten Sie innerhalb von 24–48 Stunden ein individuelles Angebot."
                }
              },
              {
                "@type": "Question",
                "name": "Bieten Sie auch Wartung und Service an?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, wir bieten neben der Installation auch Wartung und Service für Photovoltaikanlagen und Wärmepumpen an."
                }
              }
            ]
          })
        }}
      />
      
      <Footer />
    </main>
  )
}
