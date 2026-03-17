import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ImpressumPage() {
  return (
    <main className="flex flex-col min-h-screen pt-32 bg-background text-foreground">
      <Navigation />
      <div className="flex-grow max-w-4xl mx-auto px-6 pb-20">
        <h1 className="text-4xl md:text-5xl font-black mb-12 tracking-tight">Impressum</h1>
        
        <div className="space-y-12 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#0f172a] mb-4 uppercase tracking-widest text-sm">Angaben gemäß § 5 TMG</h2>
            <p className="text-lg">
              Empire Premium Bau GmbH<br />
              Hastedter Heerstraße 63<br />
              28207 Bremen<br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0f172a] mb-4 uppercase tracking-widest text-sm">Vertreten durch</h2>
            <p className="text-lg">Arkadi Saribekian (Geschäftsführer)</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0f172a] mb-4 uppercase tracking-widest text-sm">Kontakt</h2>
            <p className="text-lg">
              Telefon: +49 17661951823<br />
              E-Mail: info@empire-premium-bau.de
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0f172a] mb-4 uppercase tracking-widest text-sm">Registereintrag</h2>
            <p className="text-lg">
              Eintragung im Handelsregister.<br />
              Registergericht: Amtsgericht Bremen<br />
              Registernummer: HRB 40235
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0f172a] mb-4 uppercase tracking-widest text-sm">Umsatzsteuer-ID</h2>
            <p className="text-lg">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              DE123456789
            </p>
          </section>

          <div className="pt-12 border-t border-slate-100 italic text-sm">
            <p>Haftungsausschluss: Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
