import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function DatenschutzPage() {
  return (
    <main className="flex flex-col min-h-screen pt-32 bg-background text-foreground">
      <Navigation />
      <div className="flex-grow max-w-4xl mx-auto px-6 pb-20">
        <h1 className="text-4xl md:text-5xl font-black mb-12 tracking-tight">Datenschutz</h1>
        
        <div className="space-y-12 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#0f172a] mb-4 uppercase tracking-widest text-sm">1. Datenschutz auf einen Blick</h2>
            <h3 className="font-bold mb-2">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0f172a] mb-4 uppercase tracking-widest text-sm">2. Datenerfassung auf dieser Website</h2>
            <h3 className="font-bold mb-2">Anfragen über das Kontaktformular</h3>
            <p>
              Wenn Sie uns per Kontaktformular oder über unseren Kalkulator Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0f172a] mb-4 uppercase tracking-widest text-sm">3. Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.
            </p>
          </section>

          <div className="pt-12 border-t border-slate-100 text-sm italic">
            <p>Stand: März 2026. Wir behalten uns vor, diese Datenschutzerklärung gelegentlich anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
