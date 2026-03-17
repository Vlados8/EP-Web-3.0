"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { TrendingUp, Leaf, DollarSign, Home } from "lucide-react"

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
}

function AnimatedCounter({ value, suffix = "", prefix = "", duration = 2 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    const endValue = value

    const animate = () => {
      const now = Date.now()
      const elapsed = (now - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(easeOutQuart * endValue)
      
      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return (
    <span ref={ref}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  )
}

const stats = [
  {
    icon: Home,
    value: 15420,
    suffix: "+",
    label: "Versorgte Haushalte",
    description: "Saubere Energieinstallationen weltweit",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Leaf,
    value: 45000,
    suffix: "t",
    label: "CO₂-Einsparung",
    description: "Jährlich vermiedene Emissionen",
    gradient: "from-primary/20 to-secondary/5",
  },
  {
    icon: DollarSign,
    value: 12,
    suffix: " Mio+",
    prefix: "€",
    label: "Kundenersparnisse",
    description: "Gesamte Energiekostenersparnis",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: TrendingUp,
    value: 98,
    suffix: "%",
    label: "Zufriedenheitsrate",
    description: "Zufriedenheitswert unserer Kunden",
    gradient: "from-secondary/20 to-secondary/5",
  },
]

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-4 text-balance">
            Tausendfaches Vertrauen
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Werden Sie Teil der wachsenden Gemeinschaft von Eigenheimbesitzern, die ihre Energiezukunft selbst in die Hand nehmen.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative glass rounded-3xl p-8 shadow-soft hover:shadow-elevated transition-all duration-500 overflow-hidden h-full">
                {/* Background gradient */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${stat.gradient} blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Value */}
                <div className="relative text-4xl font-semibold text-foreground mb-2">
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix} 
                    prefix={stat.prefix}
                  />
                </div>

                {/* Label */}
                <div className="relative text-lg font-medium text-foreground mb-1">
                  {stat.label}
                </div>

                {/* Description */}
                <div className="relative text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
