"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Send, Mail, Phone, MapPin, ChevronLeft, ChevronRight, Bug, HelpCircle, AlertTriangle, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SupportForm } from "@/components/support-form"

export default function KontaktPage() {
  return (
    <main className="flex flex-col min-h-screen pt-32 bg-background text-foreground">
      <Navigation />
      
      <div className="flex-grow max-w-7xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Contact Details */}
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl font-black mb-6 tracking-tight uppercase italic">Support & <span className="text-primary">Kontakt</span></h1>
              <p className="text-xl text-slate-500 font-medium max-w-md leading-relaxed">
                Helfen Sie uns, Ihr Anliegen schneller zu bearbeiten. Nutzen Sie unser Support-System für technische Anfragen.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Telefon</p>
                  <p className="text-xl font-bold text-[#0f172a] hover:text-primary transition-colors cursor-pointer">+49 176 61951823</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">E-Mail</p>
                  <p className="text-xl font-bold text-[#0f172a] hover:text-primary transition-colors cursor-pointer">info@empire-premium-bau.de</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Adresse</p>
                  <p className="text-xl font-bold text-[#0f172a]">Hastedter Heerstraße 63, 28207 Bremen</p>
                </div>
              </div>
            </div>
          </div>

          {/* Support Form */}
          <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-elevated">
            <SupportForm />
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full h-[500px] rounded-[3rem] overflow-hidden border border-slate-100 shadow-soft">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2394.8814725357385!2d8.8687295772391!3d53.06734299616551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b1297e28972e35%3A0xc6657c9a92437e91!2sHastedter%20Heerstra%C3%9Fe%2063%2C%2028207%20Bremen!5e0!3m2!1sde!2sde!4v1710689400000!5m2!1sde!2sde" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <Footer />
    </main>
  )
}
