"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Menu, X, Sun, Zap, Battery, Thermometer, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Photovoltaik", href: "/#solar", icon: Sun },
  { name: "Wärmepumpen", href: "/#heatpump", icon: Thermometer },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { scrollY } = useScroll()
  
  // Create smooth background opacity based on scroll
  const headerBgOpacity = useTransform(scrollY, [8, 80], [0, 1])
  const headerYPadding = useTransform(scrollY, [0, 80], [24, 12]) // py-6 (24px) to py-3 (12px)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        style={{ paddingTop: headerYPadding, paddingBottom: headerYPadding }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        {/* Animated Background Layer */}
        <motion.div 
          className="absolute inset-0 glass-strong shadow-soft pointer-events-none"
          style={{ opacity: headerBgOpacity }}
        />

        {/* Top Contact Bar */}
        <motion.div 
          initial={false}
          animate={{ 
            height: isScrolled ? 0 : 'auto',
            opacity: isScrolled ? 0 : 1,
            marginBottom: isScrolled ? 0 : '0.5rem'
          }}
          className="w-full overflow-hidden relative z-10"
        >
          <div className="max-w-7xl mx-auto px-2 md:px-4 py-1 flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-semibold tracking-wide text-foreground">
            <a href="mailto:info@empire-premium-bau.de" className="flex items-center justify-center gap-1.5 sm:gap-2 hover:text-primary transition-colors bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 px-3 sm:px-4 py-1.5 rounded-full backdrop-blur-md border border-black/5 dark:border-white/10 shadow-sm">
              <Mail className="w-3.5 h-3.5 text-primary" />
              <span>info@empire-premium-bau.de</span>
            </a>
            <a href="tel:+4917661951823" className="flex items-center justify-center gap-1.5 sm:gap-2 hover:text-primary transition-colors bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 px-3 sm:px-4 py-1.5 rounded-full backdrop-blur-md border border-black/5 dark:border-white/10 shadow-sm">
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span>+49 176 61951823</span>
            </a>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-10">
          {/* Logo */}
          <motion.a 
            href="/"
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative w-12 h-12 flex items-center justify-center">
              <img src="/logo.png" alt="Empire Premium Bau" className="h-10 w-auto object-contain" />
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full group ${
                  activeSection === item.href.substring(1)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </span>
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary/10 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="absolute inset-0 rounded-full bg-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button 
                asChild
                className="relative overflow-hidden bg-foreground text-background hover:bg-foreground/90 rounded-full px-6 py-2 text-sm font-medium shadow-soft group"
              >
                <a href="/#calculator">
                  <span className="relative z-10">Angebot erstellen</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-full glass"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-20 z-40 p-4 md:hidden"
          >
            <div className="glass-strong rounded-3xl p-6 shadow-elevated">
              <nav className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-foreground hover:bg-muted transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{item.name}</span>
                  </motion.a>
                ))}
                <Button asChild className="mt-4 w-full rounded-full bg-foreground text-background">
                  <a href="/#calculator" onClick={() => setIsMobileMenuOpen(false)}>Angebot erstellen</a>
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
