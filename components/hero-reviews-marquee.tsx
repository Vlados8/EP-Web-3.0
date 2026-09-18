"use client"

import React, { useRef } from "react"
import Image from "next/image"
import { Star, CheckCircle2, ChevronLeft, ChevronRight, Sun, Thermometer, Sparkles } from "lucide-react"

interface ReviewItem {
  id: string
  name: string
  location: string
  category: "Photovoltaik" | "Wärmepumpe" | "Kombi-System"
  image: string
  quote: string
  rating: number
  verified: boolean
}

const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Markus W.",
    location: "Bremen",
    category: "Photovoltaik",
    image: "/review_pv_1.jpg",
    quote: "12,4 kWp PV-Anlage auf unserem Dach. Stromkosten um 78% gesenkt. Schnelle Montage in nur 2 Tagen!",
    rating: 5,
    verified: true,
  },
  {
    id: "rev-2",
    name: "Familie Jansen",
    location: "Oldenburg",
    category: "Wärmepumpe",
    image: "/review_hp_1.jpg",
    quote: "Die Wärmepumpe läuft super leise. 70% KfW-Förderung wurde komplett für uns beantragt. Großes Lob!",
    rating: 5,
    verified: true,
  },
  {
    id: "rev-3",
    name: "Torsten B.",
    location: "Achim",
    category: "Photovoltaik",
    image: "/solar_slide_2.jpg",
    quote: "Innerhalb von 3 Wochen von der 3D-Planung bis zum Netzanschluss. Saubere Arbeit, top Meisterbetrieb.",
    rating: 5,
    verified: true,
  },
  {
    id: "rev-4",
    name: "Jens & Claudia K.",
    location: "Delmenhorst",
    category: "Wärmepumpe",
    image: "/heatpump_slide_2.jpg",
    quote: "Alte Ölheizung raus, moderne Wärmepumpe rein. Heizkosten um 62% gefallen und das Haus ist mollig warm.",
    rating: 5,
    verified: true,
  },
  {
    id: "rev-5",
    name: "Stefan M.",
    location: "Bremen-Nord",
    category: "Photovoltaik",
    image: "/solar_slide_3.jpg",
    quote: "Die Full-Black Module sehen fantastisch aus auf unserem Dach. Ertrag ist sogar höher als berechnet.",
    rating: 5,
    verified: true,
  },
  {
    id: "rev-6",
    name: "Michael & Sarah R.",
    location: "Verden",
    category: "Kombi-System",
    image: "/heatpump_slide_3.jpg",
    quote: "Kombination aus Wärmepumpe und PV-Anlage ist genial. Im Sommer kühlen, im Winter heizen mit eigenem Strom.",
    rating: 5,
    verified: true,
  },
  {
    id: "rev-7",
    name: "Andrea & Dirk L.",
    location: "Osterholz",
    category: "Photovoltaik",
    image: "/solar_slide_1.jpg",
    quote: "Sehr ehrliche Beratung vor Ort ohne Verkaufsdruck. Die 0% Mehrwertsteuer machen sich direkt bemerkbar.",
    rating: 5,
    verified: true,
  },
  {
    id: "rev-8",
    name: "Familie Neumann",
    location: "Weyhe",
    category: "Wärmepumpe",
    image: "/heatpump_slide_1.jpg",
    quote: "Die Übergabe war vorbildlich. Alles genau erklärt, sauber hinterlassen und der Förderzuschuss pünktlich da.",
    rating: 5,
    verified: true,
  },
]

export function HeroReviewsMarquee() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleManualScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return
    const offset = direction === "left" ? -280 : 280
    scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" })
  }

  // Double the array for seamless infinite scroll
  const marqueeItems = [...REVIEWS, ...REVIEWS]

  return (
    <div className="relative w-full max-w-[1440px] mx-auto overflow-hidden py-3 sm:py-5">
      {/* Top Header bar with Trust Rating and Navigation Buttons */}
      <div className="flex items-center justify-between px-6 mb-3 sm:mb-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-foreground">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
            <span className="flex text-emerald-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-emerald-500 text-emerald-500" />
              ))}
            </span>
            <span>4.9 / 5</span>
          </span>
          <span className="text-muted-foreground font-medium hidden sm:inline">•</span>
          <span className="text-muted-foreground font-semibold text-xs sm:text-sm">
            Echte Kundenbewertungen aus Bremen & Norddeutschland
          </span>
        </div>

        {/* Manual scroll buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleManualScroll("left")}
            aria-label="Nach links scrollen"
            className="w-8 h-8 rounded-full glass border border-border/60 hover:border-primary/40 text-foreground flex items-center justify-center hover:bg-muted transition-all active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleManualScroll("right")}
            aria-label="Nach rechts scrollen"
            className="w-8 h-8 rounded-full glass border border-border/60 hover:border-primary/40 text-foreground flex items-center justify-center hover:bg-muted transition-all active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Marquee Track Container */}
      <div className="relative w-full group overflow-hidden">
        {/* Left & Right gradient edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />

        {/* Scrolling Strip */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide py-2 px-6 animate-marquee-right hover:[animation-play-state:paused]"
        >
          {marqueeItems.map((item, index) => {
            const isPV = item.category === "Photovoltaik"
            const isKombi = item.category === "Kombi-System"

            return (
              <div
                key={`${item.id}-${index}`}
                className="w-[230px] sm:w-[255px] shrink-0 bg-card/95 dark:bg-card/85 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-border/60 shadow-soft hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] flex flex-col group/card cursor-pointer select-none"
              >
                {/* Photo at top */}
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-3 bg-muted shadow-sm">
                  <Image
                    src={item.image}
                    alt={`${item.name} - ${item.category}`}
                    fill
                    sizes="260px"
                    className="object-cover object-center transform transition-transform duration-700 ease-out group-hover/card:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Category Pill on Image */}
                  <div className="absolute top-2 left-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-md shadow-sm border ${
                        isPV
                          ? "bg-amber-500/90 text-white border-amber-400/30"
                          : isKombi
                          ? "bg-primary/90 text-white border-primary/30"
                          : "bg-emerald-600/90 text-white border-emerald-400/30"
                      }`}
                    >
                      {isPV ? (
                        <Sun className="w-2.5 h-2.5" />
                      ) : isKombi ? (
                        <Sparkles className="w-2.5 h-2.5" />
                      ) : (
                        <Thermometer className="w-2.5 h-2.5" />
                      )}
                      {item.category}
                    </span>
                  </div>

                  {/* Location badge bottom-left */}
                  <div className="absolute bottom-2 left-2">
                    <span className="text-[10px] font-bold text-white/95 px-2 py-0.5 rounded-md glass-dark backdrop-blur-md border border-white/20">
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Review Quote */}
                <p className="text-[11px] sm:text-[12px] font-medium text-foreground/90 leading-snug line-clamp-3 mb-2.5 text-center flex-grow">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* 5 Green Rating Stars */}
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500"
                    />
                  ))}
                </div>

                {/* Author Name + Verified Checkmark */}
                <div className="flex items-center justify-center gap-1.5 pt-1.5 border-t border-border/40">
                  <span className="text-xs font-bold text-foreground">
                    {item.name}
                  </span>
                  {item.verified && (
                    <span className="inline-flex items-center text-emerald-500" title="Verifizierter Kunde">
                      <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-500/15" />
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
