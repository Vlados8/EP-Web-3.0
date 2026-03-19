"use client"

import React, { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Thermometer, ChevronRight, Zap, Home, Users, MapPin, Flame, Snowflake, HelpCircle, Check, ArrowRight, RefreshCw, ArrowLeft, LayoutGrid, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInView } from "framer-motion"

// ─── Types ───────────────────────────────────────────────────────────────────

interface AnswerOption {
  id: number
  answer_text: string
  order_index?: number
  next_question_id?: number | null
}

interface ApiQuestion {
  id: number
  question_text: string
  type: "radio" | "checkbox" | "input" | "text" | "range" | "slider" | "select" | "dropdown" | "choice" | "buttons" | "multi" | "number"
  order_index?: number
  answers?: AnswerOption[]
  config?: {
    min?: number
    max?: number
    step?: number
    default?: number
  }
  unit?: string
}

interface Subcategory {
  id: number
  name: string
  order_index?: number
  questions?: ApiQuestion[]
}

interface ApiCategory {
  id: number
  name: string
  icon?: string
  order_index?: number
  subcategories?: Subcategory[]
}

type ViewState = "category" | "subcategory" | "question" | "contact" | "result"

interface UserAnswer {
  value: string
  answerId?: number
  checkedIds?: number[]
}

type Answers = Record<number, UserAnswer>

interface ContactInfo {
  name: string
  email: string
  phone: string
  zip: string
  notes: string
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ChoiceGrid({
  question,
  value,
  onChange
}: {
  question: ApiQuestion
  value: string | undefined
  onChange: (ans: AnswerOption) => void
}) {
  return (
    <div className="flex flex-col gap-3 w-full max-w-lg mx-auto">
      {question.answers?.map((ans) => {
        const isSelected = value === ans.answer_text
        return (
          <motion.button
            key={ans.id}
            onClick={() => onChange(ans)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`group relative w-full flex items-center justify-between p-6 rounded-2xl transition-all duration-300 border-2
              ${isSelected
                ? "bg-white border-primary shadow-[0_25px_50px_-12px_rgba(59,130,246,0.3),0_0_40px_rgba(59,130,246,0.15)]"
                : "bg-white border-slate-100 hover:border-primary/20 shadow-[0_10px_40px_0px_rgba(0,0,0,0.25),0_0_20px_rgba(59,130,246,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12),0_0_25px_rgba(59,130,246,0.05)]"}`}
          >
            <span className={`text-lg font-bold ${isSelected ? "text-[#0f172a]" : "text-[#475569]"}`}>
              {ans.answer_text}
            </span>
            <ChevronRight className={`w-5 h-5 transition-colors ${isSelected ? "text-primary" : "text-slate-300"}`} />
          </motion.button>
        )
      })}
    </div>
  )
}

function CheckboxGrid({ question, checkedIds, onChange }: {
  question: ApiQuestion
  checkedIds: number[]
  onChange: (ids: number[], text: string) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {question.answers?.sort((a, b) => (a.order_index || 0) - (b.order_index || 0)).map((opt) => {
        const isChecked = checkedIds.includes(opt.id)
        return (
          <motion.button
            key={opt.id}
            onClick={() => {
              const newIds = isChecked
                ? checkedIds.filter(id => id !== opt.id)
                : [...checkedIds, opt.id]
              const newText = question.answers?.filter(a => newIds.includes(a.id)).map(a => a.answer_text).join(", ") || ""
              onChange(newIds, newText)
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              relative text-left p-4 rounded-2xl border transition-all duration-300
              ${isChecked
                ? "bg-primary/10 border-primary shadow-[0_15px_30px_-8px_rgba(59,130,246,0.3),0_0_20px_rgba(59,130,246,0.1)]"
                : "glass border-border/40 hover:border-primary/40 hover:bg-primary/5 shadow-micro hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.08)]"
              }
            `}
          >
            <div className={`
              absolute top-3 right-3 w-5 h-5 rounded border flex items-center justify-center transition-colors
              ${isChecked ? "bg-primary border-primary" : "border-border/60"}
            `}>
              {isChecked && <Check className="w-3 h-3 text-primary-foreground" />}
            </div>
            <span className="block text-sm font-medium text-foreground">{opt.answer_text}</span>
          </motion.button>
        )
      })}
    </div>
  )
}

function RangeInput({ question, value, onChange }: {
  question: ApiQuestion
  value: string | undefined
  onChange: (v: string) => void
}) {
  const min = question.config?.min ?? 0
  const max = question.config?.max ?? 1000
  const step = question.config?.step ?? 10
  const unit = question.unit ?? "€"
  const current = value ? parseInt(value) : (question.config?.default ?? min)
  const pct = ((current - min) / (max - min)) * 100

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-3xl font-extrabold text-[#0f172a]">
          {current.toLocaleString()}{unit}
        </span>
      </div>
      <div className="relative h-2 rounded-full bg-muted overflow-visible">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all duration-100"
          style={{ width: `${pct}%` }}
        />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 -ml-3 rounded-full bg-primary shadow-elevated flex items-center justify-center"
          style={{ left: `${pct}%` }}
          whileHover={{ scale: 1.2 }}
        >
          <div className="w-2 h-2 rounded-full bg-primary-foreground" />
        </motion.div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={current}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  )
}

function ResultPanel({ status, onReset }: {
  status: { success: boolean, message: string }
  onReset: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 flex flex-col items-center justify-center min-h-[450px]"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
        className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 relative
          ${status.success ? "bg-green-100" : "bg-red-100"}`}
      >
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute inset-0 rounded-full ${status.success ? "bg-green-200" : "bg-red-200"}`}
        />
        {status.success ? (
          <Check className="w-10 h-10 text-green-600 stroke-[3px] relative z-10" />
        ) : (
          <RefreshCw className="w-10 h-10 text-red-600 stroke-[3px] animate-spin relative z-10" />
        )}
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-3xl md:text-4xl font-black text-[#1e293b] mb-4 tracking-tight"
      >
        {status.success ? "Anfrage gesendet!" : "Fehler"}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-lg text-slate-500 font-medium mb-12 max-w-lg mx-auto leading-relaxed"
      >
        {status.success
          ? "Vielen Dank für Ihr Vertrauen. Ein Experte von Empire Premium wird Ihre Daten prüfen und sich innerhalb von 24 Stunden bei Ihnen melden."
          : status.message}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          onClick={onReset}
          className="bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-xl px-12 py-7 h-auto text-lg font-bold shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          Schließen
        </Button>
      </motion.div>
    </motion.div>
  )
}

function ContactStep({ info, onChange }: {
  info: ContactInfo
  onChange: (field: keyof ContactInfo, val: string) => void
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-black text-slate-600 uppercase tracking-wider ml-1">Name / Firma *</label>
        <input
          type="text"
          value={info.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Max Mustermann"
          className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-5 focus:outline-none focus:ring-4 focus:ring-primary/10 shadow-[0_15px_45px_-10px_rgba(0,0,0,0.12),0_0_20px_rgba(59,130,246,0.03)] focus:shadow-[0_20px_60px_-8px_rgba(59,130,246,0.25)] transition-all duration-300 placeholder:text-slate-400 font-bold text-lg text-slate-900"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-600 uppercase tracking-wider ml-1">E-Mail Adresse *</label>
          <input
            type="email"
            value={info.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="max@beispiel.de"
            className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-5 focus:outline-none focus:ring-4 focus:ring-primary/10 shadow-[0_15px_45px_-10px_rgba(0,0,0,0.12),0_0_20px_rgba(59,130,246,0.03)] focus:shadow-[0_20px_60px_-8px_rgba(59,130,246,0.25)] transition-all duration-300 placeholder:text-slate-400 font-bold text-lg text-slate-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-600 uppercase tracking-wider ml-1">Telefonnummer *</label>
          <input
            type="tel"
            value={info.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="0123 456789"
            className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-5 focus:outline-none focus:ring-4 focus:ring-primary/10 shadow-[0_15px_45px_-10px_rgba(0,0,0,0.12),0_0_20px_rgba(59,130,246,0.03)] focus:shadow-[0_20px_60px_-8px_rgba(59,130,246,0.25)] transition-all duration-300 placeholder:text-slate-400 font-bold text-lg text-slate-900"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-black text-slate-600 uppercase tracking-wider ml-1">Wohnort / PLZ *</label>
        <input
          type="text"
          value={info.zip}
          onChange={(e) => onChange("zip", e.target.value)}
          placeholder="12345 Berlin"
          className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-5 focus:outline-none focus:ring-4 focus:ring-primary/10 shadow-[0_15px_45px_-10px_rgba(0,0,0,0.12),0_0_20px_rgba(59,130,246,0.03)] focus:shadow-[0_20px_60px_-8px_rgba(59,130,246,0.25)] transition-all duration-300 placeholder:text-slate-400 font-bold text-lg text-slate-900"
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-black text-slate-600 uppercase tracking-wider ml-1">Nachricht / Notizen</label>
        <textarea
          value={info.notes}
          onChange={(e) => onChange("notes", e.target.value)}
          placeholder="Haben Sie spezielle Wünsche?"
          rows={4}
          className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-5 focus:outline-none focus:ring-4 focus:ring-primary/10 shadow-[0_15px_45px_-10px_rgba(0,0,0,0.12),0_0_20px_rgba(59,130,246,0.03)] focus:shadow-[0_20px_60px_-8px_rgba(59,130,246,0.25)] transition-all duration-300 placeholder:text-slate-400 font-bold text-lg text-slate-900 resize-none"
        />
      </div>
    </div>
  )
}

// ─── Category Card ────────────────────────────────────────────────────────────

function CategoryCard({ category, selected, onSelect }: {
  category: ApiCategory
  selected: boolean
  onSelect: () => void
}) {
  const isSolar = category.name.toLowerCase().includes("solar") || category.name.toLowerCase().includes("pv")
  const iconName = category.icon || (isSolar ? "solar-panel" : "thermometer")

  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: selected ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative w-full text-left rounded-3xl p-6 border transition-all duration-500 overflow-hidden group
        ${selected
          ? isSolar
            ? "bg-accent/10 border-accent shadow-soft"
            : "bg-primary/10 border-primary shadow-soft"
          : "glass border-border/40 hover:border-border"
        }
      `}
    >
      <motion.div
        className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl pointer-events-none
          ${isSolar ? "bg-accent/30" : "bg-primary/30"}`}
        animate={{ scale: selected ? 1.5 : 1, opacity: selected ? 0.4 : 0.15 }}
        transition={{ duration: 0.5 }}
      />

      <div className={`
        relative w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300
        ${selected
          ? isSolar ? "bg-accent/20" : "bg-primary/20"
          : "bg-muted"
        }
      `}>
        {isSolar
          ? <Sun className={`w-6 h-6 ${selected ? "text-accent" : "text-muted-foreground"}`} />
          : <Thermometer className={`w-6 h-6 ${selected ? "text-primary" : "text-muted-foreground"}`} />
        }
      </div>

      <h3 className="text-lg font-semibold text-foreground">
        {category.name}
      </h3>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={`
              absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center
              ${isSolar ? "bg-accent" : "bg-primary"}
            `}
          >
            <Check className="w-3.5 h-3.5 text-white" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute bottom-6 right-6"
        animate={{ x: selected ? 4 : 0, opacity: selected ? 0 : 0.4 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </motion.div>
    </motion.button>
  )
}

function QuestionStep({
  question,
  value,
  onChange,
  onMultiChange,
  checkedIds
}: {
  question: ApiQuestion
  value: string | undefined
  onChange: (ans: AnswerOption) => void
  onMultiChange: (ids: number[], text: string) => void
  checkedIds: number[]
}) {
  console.log("Rendering Question:", question.id, "Type:", question.type, "Answers:", question.answers?.length)

  const isChoice = !question.type || question.type === "radio" || question.type === "choice" || question.type === "buttons"
  const isCheckbox = question.type === "checkbox" || question.type === "multi"
  const isRange = question.type === "range" || question.type === "slider"
  const isInput = question.type === "input" || question.type === "text"
  const isSelect = question.type === "select" || question.type === "dropdown"

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center text-center py-10"
    >
      <div className="mb-8">
        <div className="inline-flex py-1.5 px-4 bg-[#eff6ff] text-[#3b82f6] text-[11px] font-black uppercase tracking-widest rounded-full border border-[#dbeafe] mb-10">
          SCHRITT {question.order_index || 1} VON 10
        </div>
        <h3 className="text-3xl md:text-5xl font-black text-[#0f172a] leading-tight max-w-3xl mx-auto">
          {question.question_text}
        </h3>
      </div>

      {/* Input Types */}
      {isChoice && (
        <ChoiceGrid
          question={question}
          value={value}
          onChange={onChange}
        />
      )}
      {isCheckbox && (
        <CheckboxGrid
          question={question}
          checkedIds={checkedIds}
          onChange={onMultiChange}
        />
      )}
      {isRange && (
        <RangeInput
          question={question}
          value={value}
          onChange={(v) => onChange({ id: -1, answer_text: v })}
        />
      )}
      {isInput && (
        <div className="w-full max-w-lg mx-auto">
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange({ id: -1, answer_text: e.target.value })}
            placeholder="Ihre Antwort..."
            className="w-full bg-white border border-slate-100 rounded-2xl px-6 py-5 focus:outline-none focus:ring-4 focus:ring-primary/10 shadow-[0_15px_45px_-10px_rgba(0,0,0,0.12),0_0_20px_rgba(59,130,246,0.03)] focus:shadow-[0_20px_60px_-12px_rgba(59,130,246,0.25)] transition-all duration-300 placeholder:text-slate-300 font-medium text-lg"
          />
        </div>
      )}
      {isSelect && (
        <div className="space-y-4">
          <select
            value={value || ""}
            onChange={(e) => {
              const opt = question.answers?.find(a => a.answer_text === e.target.value)
              if (opt) onChange(opt)
            }}
            className="w-full bg-background border border-border/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          >
            <option value="" disabled>Bitte wählen...</option>
            {question.answers?.map(opt => (
              <option key={opt.id} value={opt.answer_text}>{opt.answer_text}</option>
            ))}
          </select>
        </div>
      )}

      {!(isChoice || isCheckbox || isRange || isInput || isSelect) && (
        <div className="p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 text-yellow-600 dark:text-yellow-500 text-sm italic">
          Unbekannter Fragetyp: {question.type || "nicht definiert"}. Bitte kontaktieren Sie den Support.
        </div>
      )}
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

const CRM_API_URL = process.env.NEXT_PUBLIC_CRM_API_URL || "https://admin.empire-premium.de/api/v1"
const CRM_API_KEY = "ep_71089631cd09ba8d4fe00f726af56ed90aa23c5eb0988647" // Hardcoded for now as per template, ideally move to env if possible

export function IntelligentCalculator() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [view, setView] = useState<ViewState>("category")
  const [categories, setCategories] = useState<ApiCategory[]>([])
  const [currentCategory, setCurrentCategory] = useState<ApiCategory | null>(null)
  const [currentSubcategory, setCurrentSubcategory] = useState<Subcategory | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<ApiQuestion | null>(null)
  const [history, setHistory] = useState<any[]>([])
  const [answers, setAnswers] = useState<Answers>({})
  const [contactInfo, setContactInfo] = useState<ContactInfo>({ name: "", email: "", phone: "", zip: "", notes: "" })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean, message: string } | null>(null)

  // Initialization: Fetch categories
  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`${CRM_API_URL}/categories`, {
          headers: { "x-api-key": CRM_API_KEY }
        })
        if (!response.ok) throw new Error("API connection failed")
        const json = await response.json()
        const fetched = json.data?.categories || json.data || json
        setCategories(fetched.sort((a: any, b: any) => (a.order_index || 0) - (b.order_index || 0)))
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  // Navigation handlers
  function handleCategorySelect(cat: ApiCategory) {
    setCurrentCategory(cat)
    setHistory(["category"])
    setAnswers({})

    if (cat.subcategories && cat.subcategories.length > 0) {
      setView("subcategory")
    } else {
      setView("contact")
    }
  }

  function handleSubcategorySelect(sub: Subcategory) {
    setCurrentSubcategory(sub)
    setHistory((prev) => [...prev, "subcategory"])

    if (sub.questions && sub.questions.length > 0) {
      setView("question")
      const firstQ = [...sub.questions].sort((a, b) => (a.order_index || 0) - (b.order_index || 0))[0]
      setCurrentQuestion(firstQ)
    } else {
      setView("contact")
    }
  }

  function handleAnswer(q: ApiQuestion, val: string, answerId?: number, nextId?: number | null) {
    const newAnswers = { ...answers, [q.id]: { value: val, answerId } }
    setAnswers(newAnswers)

    // DON'T auto-advance for range/input types
    const isManual = q.type === "range" || q.type === "slider" || q.type === "input" || q.type === "text" || q.type === "number"
    if (isManual) return

    setHistory((prev) => [...prev, { view: "question", qId: q.id }])

    if (nextId) {
      const nextQ = currentSubcategory?.questions?.find(qx => qx.id === nextId)
      if (nextQ) {
        setCurrentQuestion(nextQ)
        return
      }
    }

    const sortedQs = [...(currentSubcategory?.questions || [])].sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
    const currentIndex = sortedQs.findIndex(qx => qx.id === q.id)
    if (currentIndex > -1 && currentIndex < sortedQs.length - 1) {
      setCurrentQuestion(sortedQs[currentIndex + 1])
    } else {
      setView("contact")
    }
  }

  function handleManualNext(q: ApiQuestion) {
    setHistory((prev) => [...prev, { view: "question", qId: q.id }])

    const sortedQs = [...(currentSubcategory?.questions || [])].sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
    const currentIndex = sortedQs.findIndex(qx => qx.id === q.id)
    if (currentIndex > -1 && currentIndex < sortedQs.length - 1) {
      setCurrentQuestion(sortedQs[currentIndex + 1])
    } else {
      setView("contact")
    }
  }

  function handleMultiAnswer(q: ApiQuestion, checkedIds: number[], val: string) {
    const newAnswers = { ...answers, [q.id]: { value: val, checkedIds } }
    setAnswers(newAnswers)
  }

  function handleMultiNext(q: ApiQuestion) {
    const ans = answers[q.id]
    if (!ans || !ans.checkedIds || ans.checkedIds.length === 0) return

    setHistory((prev) => [...prev, { view: "question", qId: q.id }])

    // Check if any selected answer has a next_question_id
    const nextId = q.answers?.find(a => ans.checkedIds?.includes(a.id))?.next_question_id

    if (nextId) {
      const nextQ = currentSubcategory?.questions?.find(qx => qx.id === nextId)
      if (nextQ) {
        setCurrentQuestion(nextQ)
        return
      }
    }

    const sortedQs = [...(currentSubcategory?.questions || [])].sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
    const currentIndex = sortedQs.findIndex(qx => qx.id === q.id)
    if (currentIndex > -1 && currentIndex < sortedQs.length - 1) {
      setCurrentQuestion(sortedQs[currentIndex + 1])
    } else {
      setView("contact")
    }
  }

  function handleBack() {
    if (history.length === 0) return
    const newHistory = [...history]
    const last = newHistory.pop()
    setHistory(newHistory)

    if (last === "category") {
      setView("category")
      setCurrentCategory(null)
    } else if (last === "subcategory") {
      setView("subcategory")
      setCurrentSubcategory(null)
    } else if (typeof last === "object" && last.view === "question") {
      setView("question")
      const prevQ = currentSubcategory?.questions?.find(qx => qx.id === last.qId)
      if (prevQ) setCurrentQuestion(prevQ)
    }
  }

  async function submitInquiry() {
    setSubmitting(true)
    setSubmitStatus(null)

    const payload = {
      title: "Website-Anfrage (Intelligenter Rechner)",
      category_id: currentCategory?.id,
      subcategory_id: currentSubcategory?.id,
      contact_name: contactInfo.name,
      contact_email: contactInfo.email,
      contact_phone: contactInfo.phone,
      location: contactInfo.zip,
      notes: contactInfo.notes,
      source_website: typeof window !== "undefined" ? window.location.hostname : "imperia-premium.de",
      answers: Object.entries(answers).map(([qId, ans]) => ({
        question_id: parseInt(qId),
        answer_value: ans.value
      }))
    }

    try {
      const response = await fetch(`${CRM_API_URL}/inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": CRM_API_KEY
        },
        body: JSON.stringify(payload)
      })

      const resData = await response.json()
      if (response.ok) {
        setSubmitStatus({ success: true, message: "Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt. Wir werden uns in Kürze bei Ihnen melden." })
        setView("result")
      } else {
        throw new Error(resData.message || "Fehler beim Senden der Anfrage")
      }
    } catch (error: any) {
      setSubmitStatus({ success: false, message: error.message || "Ein unerwarteter Fehler ist aufgetreten." })
    } finally {
      setSubmitting(false)
    }
  }

  function handleReset() {
    setView("category")
    setCurrentCategory(null)
    setCurrentSubcategory(null)
    setCurrentQuestion(null)
    setHistory([])
    setAnswers({})
    setContactInfo({ name: "", email: "", phone: "", zip: "", notes: "" })
    setSubmitStatus(null)
  }

  return (
    <section id="calculator" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header section based on reference */}
        {!currentCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight">
              Wählen Sie Ihre Services
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
              Stellen Sie Ihr individuelles Paket für Ihr intelligentes Zuhause zusammen
            </p>
          </motion.div>
        )}

        {/* Main interactive area */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative min-h-[600px] flex flex-col items-center w-full"
        >
          <AnimatePresence mode="wait">
            {view === "result" && submitStatus ? (
              <ResultPanel status={submitStatus} onReset={handleReset} />
            ) : !currentCategory ? (
              /* 1. Initial Selection: Perfectly matching the first reference */
              <motion.div
                key="initial-selection"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="grid md:grid-cols-2 gap-10 w-full max-w-5xl"
              >
                {loading ? (
                  <div className="md:col-span-2 flex items-center justify-center p-20">
                    <RefreshCw className="w-8 h-8 animate-spin text-primary/40" />
                  </div>
                ) : (
                  categories.slice(0, 2).map((cat, idx) => (
                    <motion.button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat)}
                      whileHover={{
                        y: -8,
                        boxShadow: "0 20px 50px -12px rgba(0,0,0,0.3), 0 0 30px rgba(59,130,246,0.1)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative flex flex-col items-center bg-white p-12 rounded-3xl shadow-[0_10px_40px_0px_rgba(0,0,0,0.25),0_0_20px_rgba(59,130,246,0.03)] border border-slate-100 transition-all duration-500 hover:border-primary/20 overflow-hidden w-full"
                    >
                      <div className="w-24 h-24 rounded-2xl bg-slate-50 border border-slate-100 mb-8 flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] group-hover:bg-white group-hover:shadow-soft transition-all duration-500">
                        {idx === 0
                          ? <Sun className="w-12 h-12 text-[#0f172a]" />
                          : <Thermometer className="w-12 h-12 text-[#0f172a]" />
                        }
                      </div>

                      <h3 className="text-3xl font-extrabold text-[#0f172a] mb-12 tracking-tight">{cat.name}</h3>

                      <div
                        className="w-full py-5 rounded-xl bg-[#f1f5f9] text-[#0f172a] font-bold text-lg group-hover:bg-primary group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                      >
                        Starten
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.button>
                  ))
                )}
              </motion.div>
            ) : (
              /* 2. Wizard View */
              <motion.div
                key="wizard-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15),0_0_50px_rgba(59,130,246,0.08)] border border-slate-100 overflow-hidden min-h-[600px] p-10 flex flex-col relative"
              >
                {/* Simplified Header - Perfectly matching the reference */}
                <div className="flex items-center mb-6">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 text-sm font-bold text-[#b4c3d2] hover:text-[#0f172a] transition-all group"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Zurück zur Auswahl
                  </button>
                </div>

                {/* Wizard Content Area */}
                <div className="flex-1 flex flex-col">
                  <AnimatePresence mode="wait">
                    {/* Subcategory selection */}
                    {view === "subcategory" && (
                      <motion.div
                        key="subcategory"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center text-center py-10"
                      >
                        <div className="mb-12">
                          <h3 className="text-3xl md:text-5xl font-black text-[#0f172a] leading-tight mb-4">
                            Präzisieren Sie Ihre Wahl
                          </h3>
                          <p className="text-xl text-slate-500 font-medium">Was genau suchen Sie heute?</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
                          {currentCategory?.subcategories?.map(sub => (
                            <motion.button
                              key={sub.id}
                              onClick={() => handleSubcategorySelect(sub)}
                              whileHover={{
                                y: -12,
                                scale: 1.02,
                                boxShadow: "0 30px 60px -12px rgba(0,0,0,0.2), 0 18px 36px -18px rgba(0,0,0,0.25), 0 0 40px rgba(59,130,246,0.05)"
                              }}
                              whileTap={{ scale: 0.98 }}
                              className="flex flex-col items-start text-left p-10 rounded-3xl bg-white border border-slate-100 hover:border-primary/40 shadow-[0_10px_40px_0px_rgba(0,0,0,0.25),0_0_20px_rgba(59,130,246,0.03)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3),0_0_35px_rgba(59,130,246,0.1)] transition-all duration-500 gap-8 group relative overflow-hidden"
                            >
                              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                                <LayoutGrid className="w-8 h-8 text-[#0f172a] group-hover:text-primary transition-colors" />
                              </div>
                              <div className="space-y-2">
                                <span className="block font-black text-[#0f172a] text-2xl tracking-tight leading-tight">{sub.name}</span>
                                <div className="flex items-center gap-2 text-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                  Auswählen <ChevronRight className="w-4 h-4" />
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Question selection */}
                    {view === "question" && currentQuestion && (
                      <motion.div key={`q-${currentQuestion.id}`} className="flex-1 flex flex-col justify-between">
                        <QuestionStep
                          question={currentQuestion}
                          value={answers[currentQuestion.id]?.value}
                          checkedIds={answers[currentQuestion.id]?.checkedIds || []}
                          onChange={(ans) => handleAnswer(currentQuestion, ans.answer_text, ans.id, ans.next_question_id)}
                          onMultiChange={(ids, text) => handleMultiAnswer(currentQuestion, ids, text)}
                        />

                        {/* Navigation */}
                        <div className="flex items-center justify-between pt-10 border-t border-slate-50 mt-auto">
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleBack}
                            className="group flex items-center gap-2 px-8 py-3 rounded-full border border-slate-100 text-sm font-bold text-slate-400 hover:text-[#0f172a] transition-all"
                          >
                            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Zurück
                          </motion.button>

                          {(currentQuestion.type === "checkbox" || currentQuestion.type === "multi" || currentQuestion.type === "range" || currentQuestion.type === "slider" || currentQuestion.type === "input" || currentQuestion.type === "text" || currentQuestion.type === "number") && (
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => {
                                if (currentQuestion.type === "checkbox" || currentQuestion.type === "multi") {
                                  handleMultiNext(currentQuestion)
                                } else {
                                  handleManualNext(currentQuestion)
                                }
                              }}
                              disabled={
                                (currentQuestion.type === "checkbox" || currentQuestion.type === "multi")
                                  ? !answers[currentQuestion.id]?.checkedIds?.length
                                  : !answers[currentQuestion.id]?.value
                              }
                              className="flex items-center gap-2 px-10 py-3 rounded-full text-sm font-bold bg-[#3b82f6] text-white disabled:opacity-50 shadow-[0_20px_40px_-12px_rgba(59,130,246,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.4)] transition-all"
                            >
                              Weiter
                              <ChevronRight className="w-5 h-5" />
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Contact form */}
                    {view === "contact" && (
                      <motion.div key="contact" className="flex-1 flex flex-col justify-between py-10">
                        <div className="space-y-8 max-w-2xl mx-auto w-full">
                          <div className="text-center">
                            <h3 className="text-3xl font-black text-[#0f172a] mb-2">Fast am Ziel!</h3>
                            <p className="text-slate-500 font-medium">Ihre unverbindliche Schätzung ist bereit.</p>
                          </div>
                          <ContactStep
                            info={contactInfo}
                            onChange={(f, v) => setContactInfo(prev => ({ ...prev, [f]: v }))}
                          />
                        </div>

                        <div className="flex items-center justify-between pt-10 border-t border-slate-50 mt-10">
                          <motion.button
                            onClick={handleBack}
                            className="px-8 py-3 rounded-full border border-slate-100 text-sm font-bold text-slate-400"
                          >
                            Zurück
                          </motion.button>

                          <Button
                            onClick={submitInquiry}
                            disabled={submitting || !contactInfo.name || !contactInfo.email || !contactInfo.phone || !contactInfo.zip}
                            className="rounded-full px-12 py-8 h-auto text-lg font-black bg-[#3b82f6] text-white shadow-soft hover:shadow-elevated transition-colors"
                          >
                            {submitting ? (
                              <span className="flex items-center gap-3">
                                <RefreshCw className="w-5 h-5 animate-spin" />
                                Wird gesendet...
                              </span>
                            ) : (
                              "Angebot erhalten"
                            )}
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {/* Final status - REMOVED from here as it's now handled at the top level of AnimatePresence */}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
