"use client"

import React, { useRef, useState, useId } from "react"
import { motion } from "framer-motion"

export function EnergyHouse3D() {
  const uid = useId().replace(/:/g, "-")
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-72 sm:w-80 h-72 sm:h-80 rounded-full bg-gradient-to-br from-primary/20 via-emerald-500/15 to-secondary/20 blur-3xl pointer-events-none"
          animate={{ 
            scale: isHovered ? 1.08 : 1,
            opacity: isHovered ? 0.75 : 0.45
          }}
          transition={{ duration: 0.8 }}
        />
      </div>

      {/* SVG House illustration */}
      <motion.div 
        className="relative w-full max-w-[340px] sm:max-w-md aspect-square flex items-center justify-center"
        animate={{ 
          rotateY: isHovered ? 4 : 0,
          rotateX: isHovered ? -3 : 0,
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full drop-shadow-lg"
        >
          {/* Definitions with uniquely scoped IDs */}
          <defs>
            {/* Gradients */}
            <linearGradient id={`${uid}-houseGradient`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            
            <linearGradient id={`${uid}-roofGradient`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            
            <linearGradient id={`${uid}-solarGradient`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#0c4a6e" />
            </linearGradient>
            
            <linearGradient id={`${uid}-glassGradient`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.7" />
            </linearGradient>

            <linearGradient id={`${uid}-batteryGradient`} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="85%" stopColor="#22c55e" />
              <stop offset="85%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>

            <filter id={`${uid}-softGlow`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ground shadow */}
          <ellipse cx="200" cy="365" rx="145" ry="18" fill="rgba(15, 23, 42, 0.08)" />

          {/* House Structure Group (No buggy filter wrapper) */}
          <g id="house-main-structure">
            {/* Foundation Line */}
            <rect x="94" y="326" width="212" height="6" rx="3" fill="#cbd5e1" />

            {/* Main Walls / House Body */}
            <rect 
              x="100" y="180" width="200" height="148" rx="6" 
              fill={`url(#${uid}-houseGradient)`} 
              stroke="#cbd5e1" 
              strokeWidth="2" 
            />
            
            {/* Subtle facade shadow accent */}
            <line x1="100" y1="182" x2="300" y2="182" stroke="rgba(0,0,0,0.06)" strokeWidth="4" />

            {/* Roof Base & Fill */}
            <polygon 
              points="75,182 200,94 325,182" 
              fill={`url(#${uid}-roofGradient)`} 
              stroke="#0f172a" 
              strokeWidth="2" 
              strokeLinejoin="round" 
            />
            
            {/* Roof overhang shadow */}
            <polygon points="76,182 200,188 324,182 200,192" fill="rgba(0,0,0,0.18)" />

            {/* Solar panels on roof */}
            <g className="solar-panels">
              {/* Panel row 1 */}
              <motion.rect 
                x="118" y="122" width="46" height="30" rx="3" 
                fill={`url(#${uid}-solarGradient)`}
                stroke="#38bdf8"
                strokeWidth="1.5"
                animate={{ opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <motion.rect 
                x="170" y="122" width="46" height="30" rx="3" 
                fill={`url(#${uid}-solarGradient)`}
                stroke="#38bdf8"
                strokeWidth="1.5"
                animate={{ opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
              />

              {/* Panel row 2 */}
              <motion.rect 
                x="132" y="156" width="46" height="26" rx="3" 
                fill={`url(#${uid}-solarGradient)`}
                stroke="#38bdf8"
                strokeWidth="1.5"
                animate={{ opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
              />
              <motion.rect 
                x="184" y="156" width="46" height="26" rx="3" 
                fill={`url(#${uid}-solarGradient)`}
                stroke="#38bdf8"
                strokeWidth="1.5"
                animate={{ opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }}
              />
              
              {/* Grid cell lines on solar panels */}
              <line x1="141" y1="122" x2="141" y2="152" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
              <line x1="193" y1="122" x2="193" y2="152" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
              <line x1="155" y1="156" x2="155" y2="182" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
              <line x1="207" y1="156" x2="207" y2="182" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />

              {/* Glass reflections on panels */}
              <rect x="121" y="124" width="12" height="3" rx="1.5" fill="rgba(255,255,255,0.6)" />
              <rect x="173" y="124" width="12" height="3" rx="1.5" fill="rgba(255,255,255,0.6)" />
              <rect x="135" y="158" width="12" height="3" rx="1.5" fill="rgba(255,255,255,0.6)" />
              <rect x="187" y="158" width="12" height="3" rx="1.5" fill="rgba(255,255,255,0.6)" />
            </g>

            {/* Modern Windows */}
            <rect x="124" y="210" width="52" height="52" rx="4" fill={`url(#${uid}-glassGradient)`} stroke="#94a3b8" strokeWidth="2" />
            <line x1="150" y1="210" x2="150" y2="262" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="124" y1="236" x2="176" y2="236" stroke="#94a3b8" strokeWidth="1.5" />
            
            <rect x="224" y="210" width="52" height="52" rx="4" fill={`url(#${uid}-glassGradient)`} stroke="#94a3b8" strokeWidth="2" />
            <line x1="250" y1="210" x2="250" y2="262" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="224" y1="236" x2="276" y2="236" stroke="#94a3b8" strokeWidth="1.5" />

            {/* Window Glass Glare */}
            <polygon points="126,212 142,212 126,240" fill="rgba(255,255,255,0.4)" />
            <polygon points="226,212 242,212 226,240" fill="rgba(255,255,255,0.4)" />

            {/* Front Door */}
            <rect x="174" y="268" width="52" height="60" rx="4" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
            <rect x="182" y="276" width="36" height="24" rx="2" fill="#475569" opacity="0.6" />
            <circle cx="216" cy="302" r="3" fill="#e2e8f0" />
            <rect x="170" y="325" width="60" height="4" rx="2" fill="#94a3b8" />
          </g>

          {/* Battery unit */}
          <g transform="translate(315, 255)">
            <rect x="0" y="0" width="44" height="74" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <rect x="5" y="6" width="34" height="58" rx="3" fill={`url(#${uid}-batteryGradient)`} />
            <rect x="14" y="-5" width="16" height="6" rx="2" fill="#94a3b8" />
            
            {/* Battery indicator lights */}
            <motion.circle 
              cx="22" cy="52" r="3.5" 
              fill="#22c55e"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </g>

          {/* Heat pump unit */}
          <g transform="translate(38, 265)">
            <rect x="0" y="0" width="54" height="64" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            {/* Fan grill */}
            <circle cx="27" cy="27" r="16" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "27px 27px" }}
            >
              <line x1="27" y1="13" x2="27" y2="41" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="13" y1="27" x2="41" y2="27" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="17" y1="17" x2="37" y2="37" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
              <line x1="37" y1="17" x2="17" y2="37" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
            </motion.g>
            
            {/* Status indicator */}
            <motion.rect 
              x="12" y="51" width="30" height="4" rx="2"
              fill="#0284c7"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </g>

          {/* Energy flow lines */}
          <g className="energy-flows" filter={`url(#${uid}-softGlow)`}>
            {/* Solar to house */}
            <motion.path
              d="M 180 156 L 180 180"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              fill="none"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
            
            {/* House to battery */}
            <motion.path
              d="M 300 265 L 315 265"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              fill="none"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
            
            {/* House to heat pump */}
            <motion.path
              d="M 100 295 L 92 295"
              stroke="#0284c7"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              fill="none"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          </g>

          {/* Sun rays above house */}
          <g className="sun-rays" opacity="0.85">
            <motion.line 
              x1="180" y1="45" x2="180" y2="75" 
              stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.line 
              x1="145" y1="55" x2="162" y2="82" 
              stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            <motion.line 
              x1="215" y1="55" x2="198" y2="82" 
              stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            />
          </g>

          {/* Glowing central energy pulse */}
          <motion.circle
            cx="180"
            cy="138"
            r="6"
            fill="#22c55e"
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.9, 0.5, 0.9]
            }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </svg>
      </motion.div>

      {/* Floating status indicators */}
      <motion.div
        className="absolute top-4 sm:top-6 right-4 sm:right-6 glass rounded-xl px-2.5 sm:px-3 py-1.5 shadow-soft border border-foreground/10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-bold text-foreground">System Active</span>
        </div>
      </motion.div>
    </div>
  )
}
