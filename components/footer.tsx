"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Mail, Phone, MapPin, Instagram, Globe } from "lucide-react"

// Custom TikTok icon since it's not in basic lucide
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)

const footerLinks = {
  products: [
    { name: "Photovoltaik-Module", href: "/#solar" },
    { name: "Wärmepumpen", href: "/#heatpump" },
  ],
  company: [
    { name: "Über uns", href: "/ueber-uns" },
    { name: "Kontakt", href: "/kontakt" },
  ],
  resources: [
    { name: "FAQ", href: "/faq" },
    { name: "Support", href: "/kontakt" },
  ],
  legal: [
    { name: "Datenschutz", href: "/datenschutz" },
    { name: "Impressum", href: "/impressum" },
  ],
  regions: [
    { name: "Bremen", href: "/photovoltaik-bremen" },
    { name: "Oldenburg", href: "/photovoltaik-oldenburg" },
    { name: "Bremerhaven", href: "/photovoltaik-bremerhaven" },
    { name: "Delmenhorst", href: "/photovoltaik-delmenhorst" },
    { name: "Achim", href: "/photovoltaik-achim" },
  ],
}

const socialLinks = [
  { 
    name: "Instagram", 
    href: "https://www.instagram.com/empire_premium_bau", 
    icon: Instagram 
  },
  { 
    name: "TikTok", 
    href: "https://www.tiktok.com/@empire.premium.bau", 
    icon: TikTokIcon 
  },
]

export function Footer() {
  return (
    <footer className="relative bg-[#020617] text-slate-100 overflow-hidden pt-1">
      {/* Premium Energy Line - Animated Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50">
        <motion.div 
          className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Soft Background Glow */}
      <div className="absolute top-[-10%] left-[20%] w-[60%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 pb-16 border-b border-white/5">
          {/* Brand & Contact */}
          <div className="space-y-8">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative group">
                <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img src="/logo.png" alt="Empire Premium Bau" className="relative h-10 w-auto brightness-0 invert object-contain" />
              </div>
            </motion.div>
            
            <p className="text-slate-400 max-w-sm leading-relaxed text-sm">
              Nachhaltige Energie für Ihr Zuhause. Premium-Photovoltaik und 
              Wärmepumpensysteme für eine grüne Zukunft.
            </p>

            <div className="space-y-4">
              <a href="tel:+4917661951823" className="flex items-center gap-4 text-slate-400 hover:text-primary transition-premium group">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-white/5 group-hover:border-primary/20">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">+49 176 61951823</span>
              </a>
              <a href="mailto:info@empire-premium-bau.de" className="flex items-center gap-4 text-slate-400 hover:text-primary transition-premium group">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-white/5 group-hover:border-primary/20">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">info@empire-premium-bau.de</span>
              </a>
              <div className="flex items-center gap-4 text-slate-400 group">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-white/5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Hastedter Heerstraße 63, 28207 Bremen</span>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
            {[
              { label: "Produkte", items: footerLinks.products },
              { label: "Unternehmen", items: footerLinks.company },
              { label: "Support", items: footerLinks.resources },
              { label: "Rechtliches", items: footerLinks.legal }
            ].map((col) => (
              <div key={col.label}>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-8">
                  {col.label}
                </h4>
                <ul className="space-y-4">
                  {col.items.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href} 
                        className="text-sm text-slate-400 hover:text-slate-100 transition-premium hover:translate-x-1 inline-block"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Specialized Regions Column */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-8">
                Regionen
              </h4>
              <ul className="space-y-6">
                {footerLinks.regions.map((region) => (
                  <li key={region.name} className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
                      {region.name}
                    </span>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      <a 
                        href={`/photovoltaik-${region.name.toLowerCase()}`}
                        className="text-xs text-slate-400 hover:text-primary transition-premium flex items-center gap-1.5"
                      >
                        <Globe className="w-3 h-3" /> Solar
                      </a>
                      <a 
                        href={`/waermepumpe-${region.name.toLowerCase()}`}
                        className="text-xs text-slate-400 hover:text-secondary transition-premium flex items-center gap-1.5"
                      >
                        <ArrowUpRight className="w-3 h-3" /> Wärmepumpe
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-8">
          <p className="text-xs text-slate-500 font-medium">
            © 2026 Empire Premium Bau. Alle Rechte vorbehalten.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/20 transition-premium shadow-soft hover:shadow-primary/5 group"
              >
                <link.icon className="w-5 h-5 transition-transform duration-500 group-hover:rotate-12" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom accent glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </footer>
  )
}
