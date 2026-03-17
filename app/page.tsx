"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { SolarSection, HeatPumpSection } from "@/components/feature-sections"
import { CombinedSolutionSection } from "@/components/combined-solution-section"
import { StatsSection } from "@/components/stats-section"
import { ProcessSection } from "@/components/process-section"
import { EconomicsSection } from "@/components/economics-section"
import { GeographySection } from "@/components/geography-section"
import { ProjectGallery } from "@/components/project-gallery"
import { IntelligentCalculator } from "@/components/intelligent-calculator"
import { TestimonialsSection } from "@/components/testimonials-section"
import { WhyUsSection } from "@/components/why-us-section"
import { FAQSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <SolarSection />
      <HeatPumpSection />
      <CombinedSolutionSection />
      <IntelligentCalculator />
      <ProcessSection />
      <StatsSection />
      <EconomicsSection />
      <GeographySection />
      <ProjectGallery />
      <TestimonialsSection />
      <WhyUsSection />
      <FAQSection />
      <ContactSection />
      <CTASection />
      <Footer />
    </main>
  )
}
