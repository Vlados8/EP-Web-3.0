import type { Metadata } from 'next'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TeamPageContent } from "@/components/team-page-content"

export const metadata: Metadata = {
  title: 'Unser Team | Empire Premium Bau – Experten für Photovoltaik & Wärmepumpen',
  description: 'Lernen Sie das engagierte Team hinter Empire Premium Bau kennen. Meisterhandwerk, zertifizierte Elektrotechniker und Solarspezialisten in Bremen & Norddeutschland.',
  keywords: [
    'Empire Premium Bau Team',
    'Photovoltaik Team Bremen',
    'Wärmepumpen Experten Bremen',
    'Solartechnik Fachbetrieb Bremen',
    'Elektromeister Bremen Solar',
  ],
  openGraph: {
    title: 'Unser Team | Empire Premium Bau',
    description: 'Das Team hinter der Energiewende in Norddeutschland. Meisterhandwerk, Zuverlässigkeit und persönliche Betreuung.',
    url: 'https://empire-premium-bau.de/unser-team',
    type: 'website',
  },
}

export default function UnserTeamPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      <Navigation />
      <TeamPageContent />
      <Footer />
    </main>
  )
}
