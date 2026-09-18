"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, LucideIcon } from "lucide-react"

export interface PhotoSlide {
  src: string
  alt: string
  tag: string
  title: string
  badge: string
  stat: string
}

interface FeaturePhotoCarouselProps {
  slides: PhotoSlide[]
  badgeIcon: LucideIcon
  badgeIconColor?: string
  autoPlayInterval?: number
  accentColorClass?: string
}

export function FeaturePhotoCarousel({
  slides,
  badgeIcon: BadgeIcon,
  badgeIconColor = "text-primary",
  autoPlayInterval = 4500,
  accentColorClass = "text-primary",
}: FeaturePhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState(1)

  const goToNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const goToPrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (isPaused || slides.length <= 1) return
    const timer = setInterval(() => {
      goToNext()
    }, autoPlayInterval)

    return () => clearInterval(timer)
  }, [isPaused, goToNext, autoPlayInterval, slides.length])

  const currentSlide = slides[currentIndex]

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 32 },
        opacity: { duration: 0.35 },
        scale: { duration: 0.35 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 32 },
        opacity: { duration: 0.28 },
        scale: { duration: 0.28 },
      },
    }),
  }

  return (
    <div
      className="relative aspect-square max-w-lg mx-auto rounded-3xl overflow-hidden shadow-2xl border border-primary/20 group select-none bg-muted/40"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Bildergalerie"
    >
      {/* Slides Container */}
      <div className="relative w-full h-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide.src}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={currentSlide.src}
              alt={currentSlide.alt}
              fill
              priority={currentIndex === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Ambient gradients for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/35 pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Top Floating Badge */}
      <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-dark text-white text-xs font-bold border border-white/20 backdrop-blur-md shadow-lg">
          <BadgeIcon className={`w-3.5 h-3.5 ${badgeIconColor}`} />
          {currentSlide.badge}
        </span>
      </div>

      {/* Slide counter top right */}
      <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 pointer-events-none">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full glass-dark text-white/90 text-[11px] font-bold border border-white/15 backdrop-blur-md">
          {currentIndex + 1} / {slides.length}
        </span>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        aria-label="Vorheriges Bild"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full glass-dark border border-white/20 text-white flex items-center justify-center opacity-85 sm:opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 transition-all shadow-lg backdrop-blur-md cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={goToNext}
        aria-label="Nächstes Bild"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full glass-dark border border-white/20 text-white flex items-center justify-center opacity-85 sm:opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 transition-all shadow-lg backdrop-blur-md cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom Floating Info Pill + Navigation Dots */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 z-20 flex flex-col gap-3">
        <div className="glass-dark rounded-2xl p-3.5 sm:p-4 border border-white/15 backdrop-blur-md flex items-center justify-between shadow-xl">
          <div className="min-w-0 pr-2">
            <div className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider ${accentColorClass} truncate`}>
              {currentSlide.tag}
            </div>
            <div className="text-xs sm:text-sm font-black text-white truncate">
              {currentSlide.title}
            </div>
          </div>
          <span className={`text-[11px] sm:text-xs font-bold ${accentColorClass} bg-white/10 border border-white/15 px-2.5 sm:px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0`}>
            {currentSlide.stat}
          </span>
        </div>

        {/* Indicators Dots */}
        <div className="flex items-center justify-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Gehe zu Bild ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? "w-7 bg-white shadow-glow-sm"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
