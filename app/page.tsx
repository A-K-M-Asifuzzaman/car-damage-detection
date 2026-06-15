"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Scan,
  Zap,
  Shield,
  BarChart3,
  Brain,
  Upload,
  Eye,
  Cpu,
  Github,
  ExternalLink,
} from "lucide-react"

/* ── animation variants ── */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE, delay: i * 0.1 },
  }),
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

/* ── data ── */
const features = [
  {
    icon: Brain,
    title: "Deep Learning Model",
    description:
      "ResNet50 with transfer learning, trained on thousands of vehicle damage images for pinpoint classification.",
    color: "from-violet-500/20 to-violet-500/5",
    iconColor: "text-violet-400",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description:
      "Get damage predictions in milliseconds. Upload an image and receive classified results with confidence scores.",
    color: "from-cyan-500/20 to-cyan-500/5",
    iconColor: "text-cyan-400",
  },
  {
    icon: Shield,
    title: "Multiple Damage Types",
    description:
      "Detects front breakage, rear breakage, door dents, glass shatter, head lamp and tail lamp damage.",
    color: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-400",
  },
  {
    icon: BarChart3,
    title: "Real-time Monitoring",
    description:
      "Built-in dashboard with Prometheus metrics tracking API health, prediction counts, and inference latency.",
    color: "from-pink-500/20 to-pink-500/5",
    iconColor: "text-pink-400",
  },
]

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Image",
    description: "Drag and drop or select a vehicle photo from your device.",
    color: "from-violet-500 to-violet-700",
  },
  {
    icon: Scan,
    step: "02",
    title: "AI Analysis",
    description: "Our deep learning model processes and classifies the damage type in real time.",
    color: "from-cyan-500 to-cyan-700",
  },
  {
    icon: Eye,
    step: "03",
    title: "View Results",
    description: "Get the predicted damage class with latency metrics instantly.",
    color: "from-emerald-500 to-emerald-700",
  },
]

const stats = [
  { value: "6", label: "Damage Classes", icon: Shield },
  { value: "50", label: "ResNet Layers", icon: Cpu },
  { value: "<100ms", label: "Inference Time", icon: Zap },
]

export default function HomePage() {
  return (
    <div className="flex flex-col overflow-hidden">

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section className="relative flex min-h-[92vh] items-center">
        {/* Background layers */}
        <div className="pointer-events-none absolute inset-0 dot-pattern opacity-[0.18]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -20%, oklch(0.63 0.27 284 / 0.12) 0%, transparent 70%)",
          }}
        />
        {/* Floating orbs */}
        <div className="animate-orb pointer-events-none absolute right-[10%] top-[15%] h-125 w-125 rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, oklch(0.63 0.27 284 / 0.25) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div className="animate-float-alt pointer-events-none absolute -left-20 bottom-[15%] h-95 w-95 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, oklch(0.73 0.18 197 / 0.25) 0%, transparent 70%)", filter: "blur(60px)" }}
        />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-28 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center gap-8"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} custom={0}>
              <div className="inline-flex items-center gap-2.5 rounded-full glass border border-border/40 px-4 py-2 text-sm text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute animate-ping-slow rounded-full bg-primary opacity-75 inset-0" />
                  <span className="relative h-2 w-2 rounded-full bg-primary" />
                </span>
                <span>AI-Powered Vehicle Damage Detection</span>
                <span className="h-3.5 w-px bg-border/60" />
                <span className="font-mono text-xs text-primary">ResNet50</span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="max-w-5xl text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              Detect Vehicle Damage{" "}
              <span className="gradient-text">Instantly</span>
              <br className="hidden sm:block" />
              {" "}with AI
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
            >
              Upload a photo of any vehicle and let our deep learning model classify the
              damage type in real time — built on ResNet50 with transfer learning for
              maximum accuracy.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/predict"
                  className="inline-flex items-center gap-2 rounded-xl gradient-primary-bg px-7 py-3.5 text-base font-semibold text-white glow-primary transition-opacity hover:opacity-90"
                >
                  Start Analysis
                  <ArrowRight className="h-4.5 w-4.5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl glass border border-border/50 px-7 py-3.5 text-base font-semibold text-foreground hover:border-primary/40 transition-colors"
                >
                  View Dashboard
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="mt-4 flex w-full items-center gap-0 divide-x divide-border/40 rounded-2xl glass border border-border/30 px-2 sm:w-auto"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-1 flex-col items-center gap-1 px-4 py-4 sm:flex-none sm:px-8 sm:py-5"
                >
                  <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
          style={{ background: "linear-gradient(to bottom, transparent, var(--background))" }}
        />
      </section>

      {/* ══════════════════════ FEATURES ══════════════════════ */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">Capabilities</p>
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Why <span className="gradient-text">AutoInspect?</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Production-grade ML pipeline for vehicle damage classification
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-glow hover:glow-card hover:border-primary/25"
            >
              <div className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-secondary/50 transition-colors group-hover:border-primary/30 group-hover:bg-secondary">
                  <feature.icon className={`h-5 w-5 ${feature.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════ HOW IT WORKS ══════════════════════ */}
      <section className="relative overflow-hidden border-y border-border/40 py-24">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.12]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.63 0.27 284 / 0.06) 0%, transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 text-center"
          >
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">How it works</p>
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
              Three Steps to <span className="gradient-text">Results</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              From upload to insight in seconds
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="relative grid gap-8 md:grid-cols-3"
          >
            {/* Connector line */}
            <div className="absolute left-1/2 top-8 hidden h-px w-2/3 -translate-x-1/2 border-t border-dashed border-border/50 md:block" />

            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                custom={i}
                className="group flex flex-col items-center gap-5 text-center"
              >
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br ${step.color} shadow-lg`}
                  >
                    <step.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <div className="absolute -right-2.5 -top-2.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-primary text-[11px] font-bold text-primary-foreground shadow">
                    {step.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ CTA ══════════════════════ */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl gradient-border"
        >
          <div
            className="relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl px-8 py-16 text-center"
            style={{ background: "linear-gradient(135deg, oklch(0.11 0.013 265) 0%, oklch(0.08 0.010 265) 100%)" }}
          >
            {/* BG orb */}
            <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-30"
              style={{ background: "radial-gradient(circle, oklch(0.63 0.27 284 / 0.5) 0%, transparent 70%)", filter: "blur(40px)" }}
            />
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Ready to try?</p>
            <h2 className="max-w-xl text-balance text-3xl font-bold text-foreground sm:text-4xl">
              Analyze vehicle damage with{" "}
              <span className="gradient-text">AI precision</span>
            </h2>
            <p className="max-w-lg text-muted-foreground">
              Upload an image now and get instant AI-powered damage classification results
              with detailed inference metrics.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/predict"
                  className="inline-flex items-center gap-2 rounded-xl gradient-primary-bg px-7 py-3.5 text-base font-semibold text-white glow-primary hover:opacity-90 transition-opacity"
                >
                  Try It Now
                  <ArrowRight className="h-4.5 w-4.5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-xl glass border border-border/50 px-7 py-3.5 text-base font-semibold text-foreground hover:border-primary/30 transition-colors"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════ FOOTER ══════════════════════ */}
      <footer className="border-t border-border/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-primary-bg">
              <Scan className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-semibold text-foreground">AutoInspect AI</span>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            ResNet50 + FastAPI + Next.js · Portfolio Project
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/predict" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Predict
            </Link>
            <Link href="/dashboard" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
