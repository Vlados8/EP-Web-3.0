"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Bug, 
  HelpCircle, 
  AlertTriangle, 
  MoreHorizontal, 
  Send, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"

const topics = [
  { id: "software", label: "Software-Problem", icon: Bug },
  { id: "help", label: "Benutzerfrage / Hilfe", icon: HelpCircle },
  { id: "defect", label: "Defektmeldung", icon: AlertTriangle },
  { id: "other", label: "Sonstiges", icon: MoreHorizontal },
]

const priorities = [
  { value: "low", label: "Niedrig" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "Hoch" },
  { value: "urgent", label: "Dringend" },
]

export function SupportForm() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    topic: "",
    subject: "",
    description: "",
    client_name: "",
    client_email: "",
    client_phone: "",
    priority: "normal"
  })

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_CRM_API_URL || "https://admin.empire-premium.de/api/v1"
      const apiKey = process.env.NEXT_PUBLIC_CRM_API_KEY || ""

      const response = await fetch(`${baseUrl}/support`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body: JSON.stringify({
          subject: formData.subject,
          description: `[${formData.topic}] ${formData.description}`,
          client_name: formData.client_name,
          client_email: formData.client_email,
          client_phone: formData.client_phone,
          priority: formData.priority,
          source_website: window.location.hostname
        })
      })

      if (!response.ok) throw new Error("Fehler beim Senden des Tickets.")
      
      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow border border-green-500/20">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-black italic uppercase tracking-tight mb-4">Ticket gesendet!</h3>
        <p className="text-slate-500 font-medium mb-8">
          Vielen Dank. Wir haben Ihr Support-Ticket erhalten und werden uns schnellstmöglich bei Ihnen melden.
        </p>
        <Button 
          onClick={() => {
            setSuccess(false)
            setStep(1)
            setFormData({
              topic: "",
              subject: "",
              description: "",
              client_name: "",
              client_email: "",
              client_phone: "",
              priority: "normal"
            })
          }}
          className="rounded-full px-8 bg-foreground text-background"
        >
          Neues Ticket erstellen
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Progress */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${
              step >= s ? "bg-primary text-white shadow-glow" : "bg-slate-100 text-slate-400"
            }`}>
              {s}
            </div>
            {s < 3 && (
              <div className={`w-12 h-1 mx-2 rounded-full transition-all duration-500 ${
                step > s ? "bg-primary" : "bg-slate-100"
              }`} />
            )}
          </div>
        ))}
        <div className="text-right">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Schritt {step} von 3</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-black italic uppercase tracking-tight">Was ist Ihr Anliegen?</h3>
            <div className="grid grid-cols-2 gap-4">
              {topics.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setFormData({ ...formData, topic: item.label })
                    nextStep()
                  }}
                  className={`p-6 rounded-3xl border-2 text-center transition-all group flex flex-col items-center gap-4 ${
                    formData.topic === item.label 
                      ? "border-primary bg-primary/5 shadow-glow" 
                      : "border-slate-100 bg-slate-50 hover:border-primary/50 hover:bg-white"
                  }`}
                >
                  <item.icon className={`w-8 h-8 transition-transform group-hover:scale-110 ${
                    formData.topic === item.label ? "text-primary" : "text-slate-400"
                  }`} />
                  <span className={`text-sm font-bold uppercase tracking-tight ${
                    formData.topic === item.label ? "text-primary" : "text-slate-600"
                  }`}>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Betreff *</label>
                <input 
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Kurze Zusammenfassung" 
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-input" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Beschreibung *</label>
                <textarea 
                  rows={5} 
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Bitte beschreiben Sie Ihr Problem so genau wie möglich..." 
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-input resize-none"
                ></textarea>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={prevStep} className="flex-1 h-14 rounded-full font-bold">
                <ChevronLeft className="w-5 h-5 mr-2" /> Zurück
              </Button>
              <Button 
                disabled={!formData.subject || !formData.description}
                onClick={nextStep} 
                className="flex-[2] h-14 rounded-full font-bold bg-primary hover:bg-primary/90"
              >
                Weiter <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Ihr Name *</label>
                  <input 
                    type="text" 
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    placeholder="Vor- und Nachname" 
                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-input" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">E-Mail *</label>
                  <input 
                    type="email" 
                    value={formData.client_email}
                    onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                    placeholder="email@beispiel.de" 
                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-input" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Telefon (Optional)</label>
                  <input 
                    type="tel" 
                    value={formData.client_phone}
                    onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                    placeholder="+49 123 456789" 
                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-input" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Priorität</label>
                  <div className="flex gap-2 h-full py-1">
                    {priorities.map((p) => (
                      <button
                        key={p.value}
                        onClick={() => setFormData({ ...formData, priority: p.value })}
                        className={`flex-1 rounded-xl text-[10px] font-bold uppercase transition-all border-2 ${
                          formData.priority === p.value 
                            ? "bg-primary border-primary text-white shadow-glow" 
                            : "bg-slate-50 border-slate-100 text-slate-400 hover:border-primary/30"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-sm font-medium animate-shake">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <Button variant="outline" onClick={prevStep} className="flex-1 h-14 rounded-full font-bold">
                <ChevronLeft className="w-5 h-5 mr-2" /> Zurück
              </Button>
              <Button 
                disabled={loading || !formData.client_name || !formData.client_email}
                onClick={handleSubmit} 
                className="flex-[2] h-14 rounded-full font-bold bg-primary hover:bg-primary/90 flex items-center justify-center gap-2 group shadow-lg shadow-primary/20"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    Support-Anfrage senden
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
