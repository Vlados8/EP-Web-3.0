"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Zap, Battery, Thermometer, Mail, Phone, Briefcase, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Photovoltaik", href: "/#solar", icon: Sun },
  { name: "Wärmepumpen", href: "/#heatpump", icon: Thermometer },
  { name: "Unser Team", href: "/unser-team", icon: Users },
  { name: "Karriere", href: "/karriere", icon: Briefcase },
]

export function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    if (pathname === "/karriere") {
      setActiveSection("karriere")
    } else if (pathname === "/unser-team") {
      setActiveSection("unser-team")
    } else {
      setActiveSection("")
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      if (pathname === "/karriere") return
      
      // Update active section based on scroll position
      const sections = navItems
        .filter(item => item.href.includes("#"))
        .map(item => item.href.split("#")[1])

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
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const handleScrollToCalculator = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault()
      const element = document.getElementById("calculator")
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
        window.history.replaceState(null, "", "#calculator")
      }
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 py-2 sm:py-2.5 ${
          isScrolled 
            ? "glass-strong shadow-soft border-b border-border/40" 
            : "bg-background/90 backdrop-blur-md border-b border-border/20"
        }`}
      >
        {/* Top Contact Bar - Permanently visible and accessible */}
        <div className="w-full relative z-10 mb-1.5">
          <div className="max-w-7xl mx-auto px-2 md:px-4 flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-semibold tracking-wide text-foreground">
            <a href="mailto:info@empire-premium-bau.de" className="flex items-center justify-center gap-1.5 sm:gap-2 hover:text-primary transition-colors bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 px-3 sm:px-4 py-1 rounded-full backdrop-blur-md border border-black/5 dark:border-white/10 shadow-sm">
              <Mail className="w-3.5 h-3.5 text-primary" />
              <span>info@empire-premium-bau.de</span>
            </a>
            <a href="tel:+4917661951823" className="flex items-center justify-center gap-1.5 sm:gap-2 hover:text-primary transition-colors bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 px-3 sm:px-4 py-1 rounded-full backdrop-blur-md border border-black/5 dark:border-white/10 shadow-sm">
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span>+49 176 61951823</span>
            </a>
            <a href="/karriere" className="flex items-center justify-center gap-1.5 sm:gap-2 text-primary hover:text-primary-foreground hover:bg-primary transition-all bg-primary/10 px-3 sm:px-4 py-1 rounded-full backdrop-blur-md border border-primary/20 shadow-sm font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>Wir stellen ein! 💼</span>
            </a>
          </div>
        </div>

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
                  (activeSection && activeSection === item.href.substring(1)) || (item.href.startsWith("/") && !item.href.includes("#") && pathname === item.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </span>
                {((activeSection && activeSection === item.href.substring(1)) || (item.href.startsWith("/") && !item.href.includes("#") && pathname === item.href)) && (
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
                className="relative overflow-hidden bg-foreground text-background hover:bg-foreground/90 rounded-full px-6 py-2.5 text-sm font-bold shadow-soft group cursor-pointer"
              >
                <a 
                  href="/#calculator"
                  onClick={handleScrollToCalculator}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span>Kostenloses Angebot</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
      </header>

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
                <Button asChild className="mt-4 w-full rounded-full bg-foreground text-background py-6 font-bold cursor-pointer">
                  <a 
                    href="/#calculator" 
                    onClick={(e) => {
                      setIsMobileMenuOpen(false)
                      handleScrollToCalculator(e)
                    }}
                  >
                    Kostenloses Angebot
                  </a>
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
