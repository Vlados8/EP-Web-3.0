"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-black mb-8 italic uppercase tracking-tighter leading-tight">
              Besuchen Sie uns <br />
              <span className="text-primary">In Bremen</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed font-medium">
              Haben Sie Fragen zu unseren Leistungen oder möchten Sie eine persönliche Beratung? 
              Kommen Sie gerne in unserem Büro in Bremen vorbei oder kontaktieren Sie uns direkt.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1 italic uppercase tracking-tight">Adresse</h4>
                  <p className="text-muted-foreground font-medium">Hastedter Heerstraße 63, 28207 Bremen</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1 italic uppercase tracking-tight">Kontakt</h4>
                  <p className="text-muted-foreground font-medium">+49 17661951823</p>
                  <p className="text-muted-foreground font-medium">info@empire-premium-bau.de</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1 italic uppercase tracking-tight">Öffnungszeiten</h4>
                  <p className="text-muted-foreground font-medium">Mo - Fr: 08:00 - 18:00</p>
                  <p className="text-muted-foreground font-medium">Sa: Nach Vereinbarung</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] lg:h-auto min-h-[400px] rounded-[3rem] overflow-hidden border border-border/50 shadow-elevated"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2396.1478!2d8.8687!3d53.0712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b1287c88000001%3A0x66f68e0000000000!2sHastedter%20Heerstr.%2063%2C%2028207%20Bremen!5e0!3m2!1sde!2sde!4v1710600000000!5m2!1sde!2sde"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-125 brightness-90 hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
