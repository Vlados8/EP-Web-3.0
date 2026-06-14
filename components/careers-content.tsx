"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Send, 
  AlertCircle, 
  Zap, 
  Euro, 
  ShieldCheck, 
  Sparkles,
  ChevronDown,
  User,
  Mail,
  Phone,
  MessageSquare
} from "lucide-react"
import { Button } from "@/components/ui/button"

import { jobOpenings } from "@/lib/jobs"

const companyPerks = [
  {
    icon: Euro,
    title: "Top Vergütung",
    description: "Attraktive Gehälter über Branchendurchschnitt plus leistungsbezogene Boni und Urlaubs-/Weihnachtsgeld.",
    color: "from-amber-500/10 to-yellow-500/5",
    iconColor: "text-amber-500"
  },
  {
    icon: ShieldCheck,
    title: "Krisensicherer Job",
    description: "Erneuerbare Energien sind die Zukunft. Genießen Sie langfristige Stabilität in einem wachsenden Markt.",
    color: "from-emerald-500/10 to-green-500/5",
    iconColor: "text-emerald-500"
  },
  {
    icon: MapPin,
    title: "Regionale Einsätze",
    description: "Keine Wochenenden auswärts. Unsere Kunden befinden sich alle im Umkreis von 100km um Bremen.",
    color: "from-blue-500/10 to-indigo-500/5",
    iconColor: "text-blue-500"
  },
  {
    icon: Zap,
    title: "Modernste Ausstattung",
    description: "Premium-Einsatzfahrzeuge, Hilti-Werkzeuge und moderne PSA stehen für Sie bereit.",
    color: "from-rose-500/10 to-red-500/5",
    iconColor: "text-rose-500"
  }
]

export function CareersContent() {
  const formRef = useRef<HTMLDivElement>(null)
  const [selectedJobId, setSelectedJobId] = useState(jobOpenings[0].id)
  const [expandedJob, setExpandedJob] = useState<string | null>(jobOpenings[0].id)
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    experience: "beginner"
  })

  const handleApplyClick = (jobId: string) => {
    setSelectedJobId(jobId)
    setFormData(prev => ({ ...prev }))
    
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 100)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const jobTitle = jobOpenings.find(j => j.id === selectedJobId)?.title || "Stellenausschreibung"

    try {
      const baseUrl = process.env.NEXT_PUBLIC_CRM_API_URL || "https://admin.empire-premium.de/api/v1"
      const apiKey = process.env.NEXT_PUBLIC_CRM_API_KEY || ""
      const companyToken = process.env.NEXT_PUBLIC_CRM_COMPANY_TOKEN || "d3ba48fd-35d4-466d-93c2-5b23ff3fcc44"

      const response = await fetch(`${baseUrl}/bewerbungen/public/${companyToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body: JSON.stringify({
          stelle: jobTitle,
          email: formData.email,
          telefon: formData.phone,
          erfahrung: formData.experience === "expert" ? "Profi (Mehrjährige Erfahrung)" : formData.experience === "intermediate" ? "Erfahren (Einige Jahre Erfahrung)" : "Einsteiger / Quereinsteiger",
          nachricht: `Name: ${formData.name}\n\n${formData.message || ""}`.trim()
        })
      })

      if (!response.ok) throw new Error("Fehler beim Übermitteln der Bewerbung. Bitte versuchen Sie es erneut.")
      
      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-grow">
      {/* Hero Header */}
      <section className="relative pt-44 pb-20 overflow-hidden bg-slate-50 text-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-slate-50 to-slate-50 pointer-events-none" />
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-8 border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" /> Werde Teil der Energiewende
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-8 uppercase tracking-tighter leading-none text-slate-900">
              Gestalte Deine <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-secondary">Zukunft</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto mb-10 font-medium">
              Bist Du bereit für eine Karriere mit Sinn? Bei Empire Premium Bau installieren wir Premium-Photovoltaik und Wärmepumpen in ganz Norddeutschland. Finde Deinen Traumjob in einem starken, familiären Team.
            </p>
            <div className="flex justify-center">
              <Button 
                onClick={() => handleApplyClick(selectedJobId)}
                size="lg" 
                className="rounded-full px-8 py-6 text-sm font-black uppercase tracking-widest bg-gradient-to-r from-primary to-secondary hover:opacity-95 text-white shadow-lg shadow-primary/20 transition-all border border-white/10"
              >
                Jetzt Schnellbewerbung starten
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-24 bg-white text-slate-900 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Deine Benefits Bei Uns</h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Wir wissen, dass gute Arbeit nur mit guten Bedingungen möglich ist. Deshalb bieten wir Dir ein Umfeld, das Deine Leistungen wertschätzt.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyPerks.map((perk, index) => {
              const Icon = perk.icon
              return (
                <motion.div
                  key={perk.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -6 }}
                  className={`p-8 rounded-[32px] bg-gradient-to-br ${perk.color} border border-slate-100 shadow-soft transition-all`}
                >
                  <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-md mb-6 ${perk.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-3">{perk.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{perk.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Jobs Accordion Listings */}
      <section className="py-24 bg-slate-100 text-slate-900 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Offene Positionen</h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Klicke auf eine Position, um mehr über Aufgaben, Anforderungen und Benefits zu erfahren.
            </p>
          </div>

          <div className="space-y-4">
            {jobOpenings.map((job) => {
              const isOpen = expandedJob === job.id
              return (
                <div 
                  key={job.id} 
                  className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? "border-primary/40 bg-slate-950 text-white shadow-lg shadow-primary/5" 
                      : "border-slate-800 bg-slate-900 text-slate-100 hover:border-primary/20 hover:bg-slate-950"
                  }`}
                >
                  {/* Header Button */}
                  <button
                    onClick={() => setExpandedJob(isOpen ? null : job.id)}
                    className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4 select-none outline-none"
                  >
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-slate-300 text-[10px] font-bold uppercase tracking-wider mb-3">
                        <Briefcase className="w-3 h-3 text-slate-400" /> {job.type}
                      </span>
                      <h3 className="text-lg sm:text-2xl font-black text-white uppercase tracking-tight leading-tight mb-2">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-primary" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-secondary" /> Sofortiger Einstieg
                        </span>
                      </div>
                    </div>
                    
                    <motion.div 
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    </motion.div>
                  </button>

                  {/* Body Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-8 sm:px-8 sm:pb-10 pt-2 border-t border-white/5 space-y-8 text-sm">
                          <p className="text-slate-300 font-medium leading-relaxed text-base">
                            {job.description}
                          </p>

                          <div className="grid md:grid-cols-2 gap-8">
                            {/* Tasks & Requirements */}
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Deine Aufgaben
                                </h4>
                                <ul className="space-y-3">
                                  {job.tasks.map((task) => (
                                    <li key={task} className="flex items-start gap-2.5 font-medium text-slate-300 leading-snug">
                                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                      <span>{task}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div className="space-y-6">
                              <div>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> Dein Profil
                                </h4>
                                <ul className="space-y-3">
                                  {job.requirements.map((req) => (
                                    <li key={req} className="flex items-start gap-2.5 font-medium text-slate-300 leading-snug">
                                      <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                                      <span>{req}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* Specific Perks */}
                          <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Das bieten wir Dir extra
                            </h4>
                            <div className="grid sm:grid-cols-2 gap-4">
                              {job.perks.map((perk) => (
                                <div key={perk} className="flex items-center gap-3 font-semibold text-slate-200">
                                  <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                                    <Euro className="w-3.5 h-3.5 text-emerald-500" />
                                  </div>
                                  <span className="text-xs sm:text-sm">{perk}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* CTA Apply */}
                          <div className="flex justify-end">
                            <Button 
                              onClick={() => handleApplyClick(job.id)}
                              className="rounded-full px-6 py-5 bg-white text-slate-950 hover:bg-slate-200 font-bold text-xs uppercase tracking-widest"
                            >
                              Jetzt für diese Stelle bewerben
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Form Application Section */}
      <section ref={formRef} className="py-24 bg-white text-slate-900 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-[20%] left-[-10%] w-[30%] h-[30%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[30%] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <div className="bg-slate-950 text-white border border-white/5 rounded-[3rem] p-8 sm:p-12 shadow-elevated">
            
            {success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tight mb-4">Bewerbung gesendet!</h3>
                <p className="text-slate-400 font-medium mb-8 leading-relaxed">
                  Vielen Dank für Dein Interesse! Wir haben Deine Bewerbung erfolgreich empfangen und melden uns in Kürze bei Dir.
                </p>
                <Button 
                  onClick={() => {
                    setSuccess(false)
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      message: "",
                      experience: "beginner"
                    })
                  }}
                  className="rounded-full px-8 bg-white text-slate-950 hover:bg-slate-200"
                >
                  Weitere Bewerbung senden
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="text-center sm:text-left mb-6">
                  <h3 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tight mb-2">Express-Bewerbung</h3>
                  <p className="text-slate-400 font-medium text-xs sm:text-sm">
                    Kein Lebenslauf bereit? Kein Problem! Bewirb dich einfach in 1 Minute über unser Expressformular.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Select Position */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Stelle *</label>
                    <select
                      value={selectedJobId}
                      onChange={(e) => setSelectedJobId(e.target.value)}
                      className="w-full bg-slate-900 border-2 border-slate-800 hover:border-slate-700 rounded-2xl px-5 py-4 focus:border-primary/50 outline-none transition-all font-semibold text-sm text-white"
                    >
                      {jobOpenings.map((job) => (
                        <option key={job.id} value={job.id} className="bg-slate-950 text-white">
                          {job.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Vor- und Nachname" 
                        className="w-full bg-slate-900 border-none rounded-2xl pl-12 pr-5 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-input text-sm text-white font-medium" 
                      />
                    </div>
                  </div>

                  {/* Email & Phone Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">E-Mail *</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="email@beispiel.de" 
                          className="w-full bg-slate-900 border-none rounded-2xl pl-12 pr-5 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-input text-sm text-white font-medium" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Telefon *</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input 
                          type="tel" 
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+49 123 456789" 
                          className="w-full bg-slate-900 border-none rounded-2xl pl-12 pr-5 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-input text-sm text-white font-medium" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Experience Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Erfahrung *</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: "beginner", label: "Einsteiger" },
                        { value: "intermediate", label: "Erfahren" },
                        { value: "expert", label: "Profi" }
                      ].map((item) => (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, experience: item.value })}
                          className={`rounded-xl py-3 text-xs font-bold uppercase transition-all border-2 ${
                            formData.experience === item.value 
                              ? "bg-primary border-primary text-white shadow-glow" 
                              : "bg-slate-900 border-slate-800 text-slate-400 hover:border-primary/20"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nachricht / Kurzbewerbung (Optional)</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-5 w-5 h-5 text-slate-500" />
                      <textarea 
                        rows={4} 
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Erzähl uns kurz etwas über Dich und Deine Berufserfahrung..." 
                        className="w-full bg-slate-900 border-none rounded-2xl pl-12 pr-5 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-input text-sm text-white font-medium resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-sm font-medium animate-shake">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    {error}
                  </div>
                )}

                <Button 
                  disabled={loading || !formData.name || !formData.email || !formData.phone}
                  type="submit"
                  className="w-full h-14 rounded-full font-black uppercase tracking-widest text-xs bg-primary hover:bg-primary/95 text-white flex items-center justify-center gap-2 group shadow-lg shadow-primary/10"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      Bewerbung absenden
                    </>
                  )}
                </Button>
              </form>
            )}

          </div>
        </div>
      </section>
    </div>
  )
}
