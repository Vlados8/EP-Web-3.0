"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"

export function EnergyHouse3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl"
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            opacity: isHovered ? 0.8 : 0.5
          }}
          transition={{ duration: 0.8 }}
        />
      </div>

      {/* SVG House illustration */}
      <motion.div 
        className="relative w-full max-w-md aspect-square"
        animate={{ 
          rotateY: isHovered ? 5 : 0,
          rotateX: isHovered ? -5 : 0
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full drop-shadow-2xl"
          style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.1))" }}
        >
          {/* Definitions */}
          <defs>
            {/* Gradients */}
            <linearGradient id="houseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            
            <linearGradient id="roofGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            
            <linearGradient id="solarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a5f" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            
            <linearGradient id="energyFlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
              <stop offset="50%" stopColor="#22c55e" stopOpacity="1" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
            
            <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.6" />
            </linearGradient>

            <linearGradient id="batteryGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="85%" stopColor="#22c55e" />
              <stop offset="85%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>

            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.1" />
            </filter>
          </defs>

          {/* Ground shadow */}
          <ellipse cx="200" cy="370" rx="140" ry="20" fill="rgba(0,0,0,0.05)" />

          {/* House base */}
          <g filter="url(#shadow)">
            {/* Main structure */}
            <rect x="100" y="180" width="200" height="150" rx="4" fill="url(#houseGradient)" />
            
            {/* Roof */}
            <polygon points="80,180 200,100 320,180" fill="url(#roofGradient)" />
            
            {/* Solar panels on roof */}
            <g className="solar-panels">
              {/* Panel row 1 */}
              <motion.rect 
                x="120" y="125" width="45" height="30" rx="2" 
                fill="url(#solarGradient)"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.rect 
                x="170" y="125" width="45" height="30" rx="2" 
                fill="url(#solarGradient)"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              />
              {/* Panel row 2 */}
              <motion.rect 
                x="135" y="160" width="45" height="25" rx="2" 
                fill="url(#solarGradient)"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              />
              <motion.rect 
                x="185" y="160" width="45" height="25" rx="2" 
                fill="url(#solarGradient)"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
              />
              
              {/* Panel reflections */}
              <rect x="122" y="127" width="10" height="2" rx="1" fill="rgba(255,255,255,0.4)" />
              <rect x="172" y="127" width="10" height="2" rx="1" fill="rgba(255,255,255,0.4)" />
              <rect x="137" y="162" width="10" height="2" rx="1" fill="rgba(255,255,255,0.4)" />
              <rect x="187" y="162" width="10" height="2" rx="1" fill="rgba(255,255,255,0.4)" />
            </g>

            {/* Windows */}
            <rect x="125" y="210" width="50" height="50" rx="3" fill="url(#glassGradient)" />
            <rect x="225" y="210" width="50" height="50" rx="3" fill="url(#glassGradient)" />
            
            {/* Window frames */}
            <rect x="125" y="210" width="50" height="50" rx="3" fill="none" stroke="#94a3b8" strokeWidth="2" />
            <line x1="150" y1="210" x2="150" y2="260" stroke="#94a3b8" strokeWidth="1" />
            <line x1="125" y1="235" x2="175" y2="235" stroke="#94a3b8" strokeWidth="1" />
            
            <rect x="225" y="210" width="50" height="50" rx="3" fill="none" stroke="#94a3b8" strokeWidth="2" />
            <line x1="250" y1="210" x2="250" y2="260" stroke="#94a3b8" strokeWidth="1" />
            <line x1="225" y1="235" x2="275" y2="235" stroke="#94a3b8" strokeWidth="1" />

            {/* Door */}
            <rect x="175" y="270" width="50" height="60" rx="3" fill="#475569" />
            <circle cx="215" cy="300" r="3" fill="#94a3b8" />
          </g>

          {/* Battery unit */}
          <g transform="translate(320, 260)">
            <rect x="0" y="0" width="40" height="70" rx="4" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="2" />
            <rect x="5" y="5" width="30" height="55" rx="2" fill="url(#batteryGradient)" />
            <rect x="12" y="-5" width="16" height="8" rx="2" fill="#94a3b8" />
            
            {/* Battery indicator lights */}
            <motion.circle 
              cx="20" cy="50" r="3" 
              fill="#22c55e"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </g>

          {/* Heat pump unit */}
          <g transform="translate(40, 270)">
            <rect x="0" y="0" width="50" height="60" rx="4" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="2" />
            {/* Fan grill */}
            <circle cx="25" cy="25" r="15" fill="none" stroke="#94a3b8" strokeWidth="1" />
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "25px 25px" }}
            >
              <line x1="25" y1="12" x2="25" y2="38" stroke="#64748b" strokeWidth="2" />
              <line x1="12" y1="25" x2="38" y2="25" stroke="#64748b" strokeWidth="2" />
              <line x1="16" y1="16" x2="34" y2="34" stroke="#64748b" strokeWidth="2" />
              <line x1="34" y1="16" x2="16" y2="34" stroke="#64748b" strokeWidth="2" />
            </motion.g>
            
            {/* Status indicator */}
            <motion.rect 
              x="10" y="48" width="30" height="4" rx="2"
              fill="#3b82f6"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </g>

          {/* Energy flow lines */}
          <g className="energy-flows" filter="url(#softGlow)">
            {/* Solar to house */}
            <motion.path
              d="M 180 160 L 180 180"
              stroke="#22c55e"
              strokeWidth="2"
              strokeDasharray="8 4"
              fill="none"
              animate={{ strokeDashoffset: [0, -24] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            
            {/* House to battery */}
            <motion.path
              d="M 300 260 L 320 260"
              stroke="#22c55e"
              strokeWidth="2"
              strokeDasharray="8 4"
              fill="none"
              animate={{ strokeDashoffset: [0, -24] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            
            {/* House to heat pump */}
            <motion.path
              d="M 100 300 L 90 300"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray="8 4"
              fill="none"
              animate={{ strokeDashoffset: [0, -24] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </g>

          {/* Sun rays */}
          <g className="sun-rays" opacity="0.6">
            <motion.line 
              x1="180" y1="50" x2="180" y2="80" 
              stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.line 
              x1="150" y1="60" x2="165" y2="85" 
              stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            <motion.line 
              x1="210" y1="60" x2="195" y2="85" 
              stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            />
          </g>

          {/* Glowing energy indicators */}
          <motion.circle
            cx="180"
            cy="140"
            r="5"
            fill="#22c55e"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.8, 0.4, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      </motion.div>

      {/* Floating status indicators */}
      <motion.div
        className="absolute top-10 right-10 glass rounded-xl px-3 py-2 shadow-soft"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium">System Active</span>
        </div>
      </motion.div>
    </div>
  )
}
