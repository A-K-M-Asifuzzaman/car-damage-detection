"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Database,
  Code2,
  Layers,
  Server,
  BarChart3,
  Globe,
  Cpu,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
}

const damageClasses = [
  { name: "Front Breakage", key: "F_Breakage", color: "from-orange-500/20 border-orange-500/30 text-orange-400" },
  { name: "Rear Breakage", key: "R_Breakage", color: "from-pink-500/20 border-pink-500/30 text-pink-400" },
  { name: "Door Dent", key: "Door_Dent", color: "from-cyan-500/20 border-cyan-500/30 text-cyan-400" },
  { name: "Glass Shatter", key: "Glass_Shatter", color: "from-emerald-500/20 border-emerald-500/30 text-emerald-400" },
  { name: "Head Lamp Damage", key: "Head_Lamp", color: "from-yellow-500/20 border-yellow-500/30 text-yellow-400" },
  { name: "Tail Lamp Damage", key: "Tail_Lamp", color: "from-violet-500/20 border-violet-500/30 text-violet-400" },
]

const techStack = [
  {
    category: "Machine Learning",
    icon: Brain,
    accent: "violet",
    items: [
      { name: "ResNet50", description: "Base architecture with transfer learning from ImageNet" },
      { name: "PyTorch / TensorFlow", description: "Deep learning framework for model training" },
      { name: "PIL / OpenCV", description: "Image preprocessing and augmentation" },
    ],
  },
  {
    category: "Backend API",
    icon: Server,
    accent: "cyan",
    items: [
      { name: "FastAPI", description: "High-performance Python web framework" },
      { name: "Uvicorn", description: "ASGI server for production deployment" },
      { name: "Prometheus Client", description: "Metrics collection and exposure" },
    ],
  },
  {
    category: "Frontend",
    icon: Code2,
    accent: "emerald",
    items: [
      { name: "Next.js / React", description: "Modern UI framework with server-side rendering" },
      { name: "Tailwind CSS", description: "Utility-first styling with custom dark theme" },
      { name: "Recharts", description: "Data visualization for metrics dashboard" },
      { name: "Framer Motion", description: "Production-grade animation library" },
    ],
  },
  {
    category: "Infrastructure",
    icon: Globe,
    accent: "pink",
    items: [
      { name: "Hugging Face Spaces", description: "ML model hosting and API deployment" },
      { name: "Vercel", description: "Frontend deployment with edge network" },
      { name: "Docker", description: "Containerized deployment environment" },
    ],
  },
]

const modelStats = [
  { icon: Layers, value: "50", label: "Layers deep" },
  { icon: Cpu, value: "25.6M", label: "Parameters" },
  { icon: BarChart3, value: "224×224", label: "Input resolution" },
]

const pipeline = [
  { label: "Image Upload", sub: "Client Browser" },
  { label: "FastAPI Server", sub: "Hugging Face" },
  { label: "ResNet50 Model", sub: "Inference Engine" },
  { label: "JSON Response", sub: "Prediction + Latency" },
]

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 dot-pattern opacity-[0.1]" />
      <div
        className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, oklch(0.73 0.18 197 / 0.4) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 py-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full glass border border-border/40 px-3 py-1.5 text-xs text-muted-foreground">
            <Brain className="h-3.5 w-3.5 text-primary" />
            About the Project
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
            About <span className="gradient-text">AutoInspect AI</span>
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Deep learning-powered vehicle damage detection and classification system built for production.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {/* Model overview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl border border-border/50 bg-card"
          >
            <div className="h-px w-full gradient-primary-bg" />
            <div className="p-7">
              <div className="mb-5 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-500/10">
                  <Brain className="h-4.5 w-4.5 text-violet-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">The Model</h2>
                  <p className="text-xs text-muted-foreground">ResNet50 with transfer learning</p>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    AutoInspect uses a{" "}
                    <span className="font-semibold text-foreground">ResNet50</span>{" "}
                    convolutional neural network architecture, pre-trained on ImageNet, and
                    fine-tuned with transfer learning on a curated dataset of vehicle damage images.
                  </p>
                  <p>
                    The model recognizes multiple categories of vehicle damage including structural
                    damage, glass breakage, dents, and lighting component damage. Transfer learning
                    allows the model to leverage knowledge from millions of general images while
                    specializing in automotive damage assessment.
                  </p>
                  <p>
                    The final classification layer has been replaced with a custom fully-connected
                    head tuned for the specific damage classes, achieving strong accuracy on the
                    validation set.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-3">
                  {modelStats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.25 + i * 0.1, duration: 0.4 }}
                      className="flex flex-col items-center gap-2 rounded-xl border border-border/40 bg-secondary/30 p-5 text-center"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-secondary/50">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Dataset */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl border border-border/50 bg-card"
          >
            <div className="h-px w-full" style={{ background: "linear-gradient(90deg, oklch(0.73 0.18 197), oklch(0.63 0.27 284))" }} />
            <div className="p-7">
              <div className="mb-5 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10">
                  <Database className="h-4.5 w-4.5 text-cyan-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">Dataset</h2>
                  <p className="text-xs text-muted-foreground">Car damage classification training data</p>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  The model was trained on a carefully curated dataset of vehicle damage images,
                  covering a range of damage types and severities. Each image is labeled with one
                  of the following classification categories:
                </p>

                <div className="flex flex-wrap gap-2.5">
                  {damageClasses.map((cls, i) => (
                    <motion.div
                      key={cls.key}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.07, duration: 0.35 }}
                      className={`flex items-center gap-2 rounded-xl border bg-linear-to-r px-3.5 py-2 text-xs font-medium ${cls.color}`}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      {cls.name}
                      <span className="font-mono opacity-60">· {cls.key}</span>
                    </motion.div>
                  ))}
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  Data augmentation techniques (rotation, flipping, color jitter, random cropping)
                  were applied during training to improve model robustness and generalization across
                  different lighting conditions, angles, and vehicle types.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tech stack */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">Stack</p>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Technology Stack</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {techStack.map((group, gi) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + gi * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group overflow-hidden rounded-2xl border border-border/50 bg-card transition-glow hover:glow-card hover:border-primary/20"
                >
                  <div className="h-px w-full gradient-primary-bg opacity-60" />
                  <div className="p-5">
                    <div className="mb-4 flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 bg-secondary/50 transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                        <group.icon className="h-4.5 w-4.5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">{group.category}</h3>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {group.items.map((item, ii) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + gi * 0.1 + ii * 0.07, duration: 0.35 }}
                          className="rounded-xl border border-border/30 bg-secondary/30 px-4 py-3"
                        >
                          <p className="text-sm font-medium text-foreground">{item.name}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Architecture pipeline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl border border-border/50 bg-card"
          >
            <div className="h-px w-full gradient-primary-bg" />
            <div className="p-7">
              <h2 className="mb-2 font-semibold text-foreground">System Architecture</h2>
              <p className="mb-6 text-xs text-muted-foreground">End-to-end pipeline overview</p>

              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-0">
                {pipeline.map((step, i) => (
                  <div key={step.label} className="flex flex-1 items-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                      className="flex flex-1 flex-col items-center gap-1.5 rounded-xl border border-border/40 bg-secondary/30 px-4 py-4 text-center"
                    >
                      <span className="text-sm font-semibold text-foreground">{step.label}</span>
                      <span className="text-xs text-muted-foreground">{step.sub}</span>
                    </motion.div>
                    {i < pipeline.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 0.6 + i * 0.1, duration: 0.3 }}
                        className="hidden shrink-0 sm:block"
                      >
                        <ArrowRight className="mx-2 h-4 w-4 text-primary/60" />
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
