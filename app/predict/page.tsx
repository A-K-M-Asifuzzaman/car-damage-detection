"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UploadBox } from "@/components/upload-box"
import { Loader } from "@/components/loader"
import { predictImage, type PredictionResult } from "@/lib/api"
import {
  Scan,
  Clock,
  Tag,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Zap,
  ArrowRight,
} from "lucide-react"

const damageLabels: Record<string, { label: string; gradient: string; color: string }> = {
  F_Breakage: {
    label: "Front Breakage",
    gradient: "from-orange-500 to-red-500",
    color: "text-orange-400",
  },
  R_Breakage: {
    label: "Rear Breakage",
    gradient: "from-pink-500 to-rose-500",
    color: "text-pink-400",
  },
  Door_Dent: {
    label: "Door Dent",
    gradient: "from-blue-500 to-cyan-500",
    color: "text-cyan-400",
  },
  Glass_Shatter: {
    label: "Glass Shatter",
    gradient: "from-emerald-500 to-teal-500",
    color: "text-emerald-400",
  },
  Head_Lamp: {
    label: "Head Lamp Damage",
    gradient: "from-yellow-500 to-amber-500",
    color: "text-yellow-400",
  },
  Tail_Lamp: {
    label: "Tail Lamp Damage",
    gradient: "from-violet-500 to-purple-500",
    color: "text-violet-400",
  },
}

function getDamageLabel(cls?: string) {
  const safeCls = cls ?? "Unknown"
  return (
    damageLabels[safeCls] || {
      label: safeCls.replace(/_/g, " "),
      gradient: "from-primary to-accent",
      color: "text-primary",
    }
  )
}

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

export default function PredictPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file)
    setResult(null)
    setError(null)
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)
  }, [])

  const handleClear = useCallback(() => {
    setSelectedFile(null)
    setPreview(null)
    setResult(null)
    setError(null)
  }, [])

  const handlePredict = useCallback(async () => {
    if (!selectedFile) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const formData = new FormData()
      formData.append("file", selectedFile)
      const response = await predictImage(formData)
      setResult(response)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to get prediction"
      setError(
        message.includes("Network")
          ? "Cannot connect to API server. Check backend is running."
          : message
      )
    } finally {
      setLoading(false)
    }
  }, [selectedFile])

  const damageInfo = result?.prediction ? getDamageLabel(result.prediction) : null

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 dot-pattern opacity-[0.12]" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, oklch(0.63 0.27 284 / 0.4) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 py-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full glass border border-border/40 px-3 py-1.5 text-xs text-muted-foreground">
            <Scan className="h-3.5 w-3.5 text-primary" />
            AI Damage Analysis
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
            Damage <span className="gradient-text">Prediction</span>
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Upload a vehicle image to detect and classify damage using deep learning.
            Results arrive in milliseconds.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {/* Upload card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl border border-border/50 bg-card"
          >
            {/* Top gradient line */}
            <div className="h-px w-full gradient-primary-bg" />

            <div className="p-6">
              <div className="mb-5 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 bg-secondary/50">
                  <Scan className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-foreground">Upload Vehicle Image</h2>
                  <p className="text-xs text-muted-foreground">Supports JPG, PNG, WebP</p>
                </div>
              </div>

              <UploadBox
                onFileSelect={handleFileSelect}
                preview={preview}
                onClear={handleClear}
                disabled={loading}
              />

              <AnimatePresence>
                {selectedFile && !loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-5 flex items-center gap-3"
                  >
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handlePredict}
                      className="inline-flex items-center gap-2 rounded-xl gradient-primary-bg px-5 py-2.5 text-sm font-semibold text-white glow-primary hover:opacity-90 transition-opacity"
                    >
                      <Zap className="h-4 w-4" />
                      Analyze Damage
                      <ArrowRight className="h-3.5 w-3.5" />
                    </motion.button>
                    <span className="font-mono text-xs text-muted-foreground">
                      {selectedFile.name} · {(selectedFile.size / 1024).toFixed(1)} KB
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-8 flex flex-col items-center gap-6"
                  >
                    <Loader text="Running model inference..." />
                    {/* Progress bar */}
                    <div className="h-0.5 w-full max-w-xs overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                        className="h-full gradient-primary-bg"
                      />
                    </div>
                    <p className="font-mono text-xs text-muted-foreground">
                      ResNet50 · Processing...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="overflow-hidden rounded-2xl border border-destructive/30 bg-destructive/5"
              >
                <div className="h-px w-full bg-destructive/50" />
                <div className="flex items-start gap-4 p-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-destructive/10">
                    <AlertTriangle className="h-4.5 w-4.5 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-destructive">Prediction Failed</p>
                    <p className="mt-1 text-sm text-muted-foreground">{error}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 gap-2 border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                      onClick={handlePredict}
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Retry
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {result?.prediction && damageInfo && (
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-2xl border border-primary/20 bg-card"
              >
                <div className="h-px w-full gradient-primary-bg" />

                <div className="p-6">
                  <div className="mb-5 flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-success/30 bg-success/10">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-foreground">Analysis Results</h2>
                      <p className="text-xs text-muted-foreground">ResNet50 classification complete</p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Damage class */}
                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                      className="rounded-xl border border-border/40 bg-secondary/30 p-5"
                    >
                      <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <Tag className="h-3.5 w-3.5" />
                        Predicted Class
                      </div>
                      <div className={`inline-flex items-center gap-2 rounded-lg bg-linear-to-r ${damageInfo.gradient} px-4 py-2`}>
                        <span className="text-sm font-bold text-white">{damageInfo.label}</span>
                      </div>
                      <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                        raw: {result.prediction}
                      </p>
                    </motion.div>

                    {/* Latency */}
                    <motion.div
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="rounded-xl border border-border/40 bg-secondary/30 p-5"
                    >
                      <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        Inference Latency
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold gradient-text">
                          {result.latency_ms.toFixed(1)}
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">ms</span>
                      </div>
                      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                        <motion.div
                          initial={{ scaleX: 0, originX: 0 }}
                          animate={{ scaleX: Math.min(result.latency_ms / 200, 1) }}
                          transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
                          className="h-full gradient-primary-bg"
                        />
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-5"
                  >
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleClear}
                      className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-secondary/50 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Analyze Another Image
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
