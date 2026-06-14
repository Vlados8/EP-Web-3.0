import type { Metadata } from 'next'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CareersContent } from "@/components/careers-content"
import { jobOpenings } from "@/lib/jobs"

export const metadata: Metadata = {
  title: 'Karriere & Jobs | Empire Premium Bau – Gestalte die Energiewende in Bremen',
  description: 'Werde Teil unseres Teams in Bremen! Offene Stellen als Solarteur, Elektroniker für Energie- und Gebäudetechnik, SHK-Anlagenmechaniker sowie Ausbildungsplätze und Praktika. Jetzt in 1 Minute bewerben!',
  keywords: [
    'Jobs Photovoltaik Bremen',
    'Solarteur Stellenangebote',
    'Jobs Wärmepumpe Bremen',
    'Elektroniker Stellenangebote Bremen',
    'Empire Premium Bau Karriere',
    'Job Energie Bremen',
    'Ausbildung Elektroniker Bremen',
    'Ausbildung Bremen Solar',
    'Praktikum Photovoltaik Bremen',
    'Praktikanten Jobs Bremen'
  ],
  openGraph: {
    title: 'Karriere & Jobs | Empire Premium Bau',
    description: 'Gestalte mit uns die Energiewende in Norddeutschland. Offene Jobs, Ausbildungsplätze & Praktika in Bremen.',
    url: 'https://empire-premium-bau.de/karriere',
    type: 'website',
  }
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://empire-premium-bau.de"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Karriere",
      "item": "https://empire-premium-bau.de/karriere"
    }
  ]
}

const jobsSchema = jobOpenings.map(job => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": job.title,
  "description": `${job.description}\n\nAufgaben:\n${job.tasks.map(t => `- ${t}`).join("\n")}\n\nAnforderungen:\n${job.requirements.map(r => `- ${r}`).join("\n")}`,
  "datePosted": "2026-06-14",
  "validThrough": "2027-06-14",
  "employmentType": job.type === "Ausbildung" ? "FULL_TIME" : job.type === "Praktikum" ? "INTERNSHIP" : "FULL_TIME",
  "hiringOrganization": {
    "@type": "Organization",
    "name": "Empire Premium Bau UG",
    "sameAs": "https://empire-premium-bau.de",
    "logo": "https://empire-premium-bau.de/logo.png"
  },
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Hastedter Heerstraße 63",
      "addressLocality": "Bremen",
      "postalCode": "28207",
      "addressCountry": "DE"
    }
  }
}))

export default function KarrierePage() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      <Navigation />
      
      <CareersContent />
      
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      
      {jobsSchema.map((job, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(job)
          }}
        />
      ))}
      
      <Footer />
    </main>
  )
}
