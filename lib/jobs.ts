export interface JobOpening {
  id: string
  title: string
  type: string // "Vollzeit" | "Ausbildung" | "Praktikum"
  location: string
  description: string
  tasks: string[]
  requirements: string[]
  perks: string[]
}

export const jobOpenings: JobOpening[] = [
  {
    id: "solarteur",
    title: "Solarteur / PV-Anlagenmonteur (m/w/d)",
    type: "Vollzeit",
    location: "Bremen & Umgebung",
    description: "Montage und Installation von PV-Anlagen auf Steildächern, Flachdächern und Trapezblechdächern. Werde Teil unseres regionalen Montageteams.",
    tasks: [
      "Montage von Unterkonstruktionen und Photovoltaik-Modulen",
      "Kabelverlegung und Vorbereitung der elektrischen Anschlüsse bis zum Wechselrichter",
      "Einhaltung aller Arbeitsschutz- und Sicherheitsvorschriften",
      "Dokumentation der erbrachten Leistungen vor Ort"
    ],
    requirements: [
      "Erfolgreich abgeschlossene Ausbildung im handwerklichen Bereich (Dachdecker, Solarteur, Zimmermann oder vergleichbare Erfahrung)",
      "Höhentauglichkeit und Zuverlässigkeit",
      "Teamorientierte, selbstständige und qualitätsbewusste Arbeitsweise",
      "Führerschein der Klasse B (Klasse BE von Vorteil)"
    ],
    perks: [
      "Attraktives Gehalt plus Leistungsprämien",
      "Modernste PSA (Persönliche Schutzausrüstung) und Profi-Werkzeuge",
      "Keine Fernmontage: Tägliche Heimkehr (Einsätze nur in Bremen + 100km)",
      "Regelmäßige Fortbildungen und Aufstiegsmöglichkeiten"
    ]
  },
  {
    id: "elektroniker",
    title: "Elektroniker für Energie- und Gebäudetechnik (m/w/d)",
    type: "Vollzeit",
    location: "Bremen & Umgebung",
    description: "Vollständige elektrische Anbindung und Inbetriebnahme von PV-Systemen, Wechselrichtern, Stromspeichern und Wärmepumpen.",
    tasks: [
      "Installation und Verdrahtung von Wechselrichtern, Speichersystemen und Zählerschränken",
      "Netzanschluss und Inbetriebnahme der PV-Anlagen und Wärmepumpen",
      "Fehlersuche, Wartung und Reparatur von bestehenden Systemen",
      "Durchführung von Sicherheitsprüfungen und Protokollerstellung"
    ],
    requirements: [
      "Abgeschlossene Ausbildung als Elektroniker/in für Energie- und Gebäudetechnik, Elektroinstallateur/in oder vergleichbare Qualifikation",
      "Fundierte Kenntnisse in den aktuellen VDE-Richtlinien",
      "Erfahrung im Bereich erneuerbare Energien (PV, Speicher, Wallboxen) wünschenswert",
      "Strukturierte und eigenverantwortliche Arbeitsweise sowie Führerschein Klasse B"
    ],
    perks: [
      "Überdurchschnittliche Vergütung & betriebliche Altersvorsorge",
      "Eigenes, modern ausgestattetes Servicefahrzeug",
      "Regionale Einsatzgebiete ohne auswärtige Übernachtungen",
      "30 Tage Urlaub sowie Urlaubs- und Weihnachtsgeld"
    ]
  },
  {
    id: "shk-monteur",
    title: "Anlagenmechaniker SHK / Wärmepumpen-Monteur (m/w/d)",
    type: "Vollzeit",
    location: "Bremen & Umgebung",
    description: "Installation und Inbetriebnahme von modernen Luft-Wasser-Wärmepumpen und Hybrid-Heizsystemen im Wohn- und Gewerbebereich.",
    tasks: [
      "Demontage von Alt-Heizungen und fachgerechte Montage von Wärmepumpen",
      "Verrohrung, Anschluss und Dichtheitsprüfung der Heizungskomponenten",
      "Inbetriebnahme, Einregulierung und Übergabe der Anlagen an unsere Kunden",
      "Wartung, Service und Behebung von Störungen"
    ],
    requirements: [
      "Erfolgreich abgeschlossene Ausbildung als Anlagenmechaniker SHK, Gas- und Wasserinstallateur, Heizungsbauer oder vergleichbare Qualifikation",
      "Praktische Erfahrung im Einbau von Wärmepumpen oder modernen Heizungssystemen",
      "Kundenfreundliches Auftreten und Qualitätsbewusstsein",
      "Führerschein der Klasse B"
    ],
    perks: [
      "Sehr gute Bezahlung mit Bonuszahlungen",
      "Voll ausgestattetes Einsatzfahrzeug mit Premium-Werkzeug (Hilti, etc.)",
      "Hochwertige Arbeitsbekleidung und professionelles Arbeitsumfeld",
      "Unbefristeter Arbeitsvertrag in einem krisensicheren Zukunftsmarkt"
    ]
  },
  {
    id: "ausbildung-elektroniker",
    title: "Ausbildung zum Elektroniker für Energie- und Gebäudetechnik (m/w/d)",
    type: "Ausbildung",
    location: "Bremen & Umgebung",
    description: "Starte deine berufliche Zukunft mit einer fundierten Ausbildung im Bereich der erneuerbaren Energien. Lerne alles über die Installation und Inbetriebnahme moderner PV-Anlagen, Wechselrichter und Wärmepumpen.",
    tasks: [
      "Erlernen der elektrotechnischen Grundlagen und Sicherheitsregeln",
      "Unterstützung bei der Installation und Verkabelung von Wechselrichtern und Speichern",
      "Mitarbeit bei der Inbetriebnahme von Photovoltaikanlagen",
      "Besuch der Berufsschule und aktives Einbringen im Betrieb"
    ],
    requirements: [
      "Mindestens ein guter Hauptschulabschluss oder Realschulabschluss",
      "Interesse an Mathematik, Physik und handwerklichen Tätigkeiten",
      "Zuverlässigkeit, Teamfähigkeit und Lernbereitschaft",
      "Freundliches Auftreten gegenüber Kunden und Kollegen"
    ],
    perks: [
      "Attraktive Ausbildungsvergütung nach Tarif",
      "Übernahmegarantie bei guten Leistungen",
      "Echte Praxisnähe ab dem ersten Tag mit modernen Werkzeugen",
      "Kostenlose Arbeitskleidung und Unterstützung bei der Prüfungsvorbereitung"
    ]
  },
  {
    id: "praktikum",
    title: "Praktikum im Bereich erneuerbare Energien (Photovoltaik / SHK) (m/w/d)",
    type: "Praktikum",
    location: "Bremen & Umgebung",
    description: "Sammle wertvolle Praxiserfahrung und schnuppere in den Zukunftsmarkt der erneuerbaren Energien hinein – ideal für Schüler, Studenten oder zur Berufsorientierung.",
    tasks: [
      "Begleitung unserer Montageteams bei Kunden vor Ort",
      "Kennenlernen der Arbeitsabläufe bei der PV- und Wärmepumpenmontage",
      "Unterstützung bei einfacheren Handreichungen und Materialvorbereitung",
      "Einblick in die Planung und Umsetzung von Projekten"
    ],
    requirements: [
      "Interesse an Handwerk, Technik und Umweltschutz",
      "Motivation, Pünktlichkeit und Zuverlässigkeit",
      "Teamfähigkeit und Bereitschaft, Neues zu lernen",
      "Dauer: Ideal ab 2 Wochen"
    ],
    perks: [
      "Attraktive Vergütung je nach Praktikumsart und Dauer",
      "Spannende Einblicke in ein modernes, zukunftssicheres Arbeitsfeld",
      "Einbindung in ein freundliches und hilfsbereites Team",
      "Chance auf anschließenden Ausbildungsplatz oder Direkteinstieg"
    ]
  }
]
