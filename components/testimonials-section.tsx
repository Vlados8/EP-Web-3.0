"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Müller",
    role: "Eigenheimbesitzerin, Berlin",
    image: "SM",
    rating: 5,
    quote: "Die Installation verlief reibungslos und die Ergebnisse haben unsere Erwartungen übertroffen. Unsere Stromrechnung ist um 80 % gesunken und wir speisen sogar überschüssigen Strom ins Netz ein.",
  },
  {
    id: 2,
    name: "David Schmidt",
    role: "Eigenheimbesitzer, Hamburg",
    image: "DS",
    rating: 5,
    quote: "Von der Erstberatung bis zur endgültigen Installation war das Team unglaublich professionell. Die Monitoring-App ist fantastisch – ich kann genau sehen, wie viel Energie wir in Echtzeit erzeugen.",
  },
  {
    id: 3,
    name: "Emma Richter",
    role: "Eigenheimbesitzerin, München",
    image: "ER",
    rating: 5,
    quote: "Wir hatten anfangs Bedenken wegen der bayerischen Winter, aber die Paneele haben das ganze Jahr über hervorragende Leistungen erbracht. Die Wärmepumpe war ein echter Wendepunkt für unsere Heizkosten.",
  },
  {
    id: 4,
    name: "Michael Thompson",
    role: "Eigenheimbesitzer, Frankfurt",
    image: "MT",
    rating: 5,
    quote: "Die beste Investition, die wir je für unser Haus getätigt haben. Die Speicherlösung war bei Stromausfällen Gold wert. Wir haben immer Strom, während es in der Nachbarschaft dunkel ist.",
  },
  {
    id: 5,
    name: "Jennifer Adams",
    role: "Eigenheimbesitzerin, Köln",
    image: "JA",
    rating: 5,
    quote: "Selbst im oft bewölkten Köln erzeugt unser System mehr als genug Energie. Das Team hat eine perfekte Lösung für unser Klima und die Architektur unseres Hauses entworfen.",
  },
]

function TestimonialCard({ testimonial, isActive }: { testimonial: typeof testimonials[0], isActive: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ 
        opacity: isActive ? 1 : 0.5, 
        scale: isActive ? 1 : 0.95,
        y: 0
      }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={`glass rounded-3xl p-8 shadow-soft ${isActive ? 'shadow-elevated' : ''} transition-all duration-500`}
    >
      {/* Quote icon */}
      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
        <Quote className="w-6 h-6 text-primary" />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-lg text-foreground leading-relaxed mb-6">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-medium">
          {testimonial.image}
        </div>
        <div>
          <div className="font-medium text-foreground">{testimonial.name}</div>
          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
        </div>
      </div>
    </motion.div>
  )
}

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const visibleTestimonials = [
    testimonials[(activeIndex - 1 + testimonials.length) % testimonials.length],
    testimonials[activeIndex],
    testimonials[(activeIndex + 1) % testimonials.length],
  ]

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-muted/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-4 text-balance">
            Von Kunden geliebt
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sehen Sie, was unsere Kunden über ihren Weg zu sauberer Energie sagen.
          </p>
        </motion.div>

        {/* Testimonials carousel */}
        <div className="relative">
          {/* Desktop view - 3 cards */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                isActive={index === 1}
              />
            ))}
          </div>

          {/* Mobile view - 1 card */}
          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <TestimonialCard 
                  testimonial={testimonials[activeIndex]} 
                  isActive={true}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full glass shadow-soft flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'w-8 bg-primary' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full glass shadow-soft flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
