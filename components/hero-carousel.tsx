"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Sparkles, Sun, Battery, ShieldCheck, Zap } from "lucide-react"
import { EnergyHouse3D } from "@/components/energy-house-3d"

export interface SlideItem {
  id: string
  type: "3d" | "image"
  title: string
  subtitle: string
  badge: string
  src?: string
}

const SLIDES: SlideItem[] = [
  {
    id: "3d-simulation",
    type: "3d",
    title: "Energie-Haus 3D",
    subtitle: "Interaktives Gesamtsystem",
    badge: "3D Simulation",
  },
  {
    id: "pv-installation",
    type: "image",
    title: "Photovoltaik Bremen",
    subtitle: "Bis zu 80% Stromkosten sparen",
    badge: "Solarstrom",
    src: "/solar_installation_bremen_1.png",
  },
  {
    id: "heat-pump",
    type: "image",
    title: "Moderne Wärmepumpe",
    subtitle: "Bis zu 70% staatliche Förderung",
    badge: "Heiztechnik",
    src: "/heat_pump_installation_bremen_1.png",
  },
  {
    id: "pv-roof",
    type: "image",
    title: "Komplettsystem Dach",
    subtitle: "Regionale Meistermontage",
    badge: "Qualitätsarbeit",
    src: "/solar_roof_clean.png",
  },
]

const AUTO_PLAY_INTERVAL = 5500

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState(1)

  const goToNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length)
  }, [])

  const goToPrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      goToNext()
    }, AUTO_PLAY_INTERVAL)

    return () => clearInterval(timer)
  }, [isPaused, goToNext])

  const currentSlide = SLIDES[currentIndex]

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    }),
  }

  return (
    <div
      className="relative w-full max-w-full h-[320px] min-[380px]:h-[360px] sm:h-[460px] lg:h-[560px] rounded-2xl sm:rounded-3xl overflow-hidden glass border border-primary/20 shadow-2xl group select-none mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 pointer-events-none" />

      {/* Main Slide Display */}
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {currentSlide.type === "3d" ? (
              <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4">
                <EnergyHouse3D />

                {/* Floating info cards for 3D simulation */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="absolute top-4 sm:top-6 left-3 sm:left-6 glass rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-soft border border-foreground/10"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                      <Sun className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-[11px] sm:text-sm font-bold text-foreground">Solarertrag</div>
                      <div className="text-[9px] sm:text-xs text-muted-foreground">12.4 kWh heute</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute bottom-12 sm:bottom-16 right-3 sm:right-6 glass rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-soft border border-foreground/10"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-secondary/15 flex items-center justify-center shrink-0">
                      <Battery className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-secondary" />
                    </div>
                    <div>
                      <div className="text-[11px] sm:text-sm font-bold text-foreground">Batterie</div>
                      <div className="text-[9px] sm:text-xs text-muted-foreground">85% geladen</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : (
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={currentSlide.src || ""}
                  alt={currentSlide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={currentIndex === 1}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                {/* Floating caption card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="absolute bottom-11 sm:bottom-16 left-3 right-3 sm:left-6 sm:right-auto sm:w-auto max-w-sm rounded-xl sm:rounded-2xl glass-dark p-3 sm:p-5 border border-white/15 shadow-2xl backdrop-blur-md text-center sm:text-left z-20"
                >
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-primary bg-primary/20 px-2 sm:px-2.5 py-0.5 rounded-full border border-primary/30">
                      <Sparkles className="w-2.5 h-2.5" />
                      {currentSlide.badge}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-lg font-black text-white uppercase italic tracking-tight text-center sm:text-left">
                    {currentSlide.title}
                  </h3>
                  <p className="text-[11px] sm:text-sm text-white/80 font-medium mt-0.5 text-center sm:text-left">
                    {currentSlide.subtitle}
                  </p>
                </motion.div>

                {/* Corner highlight badge */}
                <div className="absolute top-3 sm:top-6 right-3 sm:right-6">
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full glass-dark text-white/90 text-[10px] sm:text-xs font-bold border border-white/10 backdrop-blur-md shadow-lg">
                    <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
                    Meisterqualität
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons (visible on hover or tap) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          goToPrev()
        }}
        aria-label="Vorheriges Bild"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-11 sm:h-11 rounded-full glass flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/20 border border-foreground/10 opacity-70 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110 cursor-pointer z-30 pointer-events-auto"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          goToNext()
        }}
        aria-label="Nächstes Bild"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-11 sm:h-11 rounded-full glass flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/20 border border-foreground/10 opacity-70 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110 cursor-pointer z-30 pointer-events-auto"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* Slide Indicators & Auto-play progress */}
      <div className="absolute bottom-2.5 sm:bottom-4 inset-x-0 flex items-center justify-center gap-1.5 sm:gap-2 z-20">
        {SLIDES.map((slide, index) => {
          const isActive = index === currentIndex
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Slide ${index + 1}: ${slide.title}`}
              className="relative h-2 rounded-full transition-all duration-300 overflow-hidden cursor-pointer"
              style={{
                width: isActive ? "36px" : "12px",
                backgroundColor: isActive ? "var(--primary)" : "rgba(150, 150, 150, 0.35)",
              }}
            >
              {isActive && !isPaused && (
                <motion.div
                  className="absolute inset-0 bg-white/40"
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: AUTO_PLAY_INTERVAL / 1000, ease: "linear" }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
