"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MetricCard } from "@/components/metric-card"
import { StatusDot } from "@/components/status-dot"
import { Loader } from "@/components/loader"
import { getHealth, getInfo, getMetrics } from "@/lib/api"
import {
  parsePrometheusMetrics,
  extractKeyMetrics,
  type ParsedMetric,
} from "@/lib/parse-metrics"
import type { HealthStatus, ModelInfo } from "@/lib/api"
import {
  Activity,
  Server,
  Brain,
  Timer,
  Hash,
  RefreshCw,
  Layers,
  Cpu,
  Database,
  AlertCircle,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

const CHART_COLORS = [
  "oklch(0.63 0.27 284)",
  "oklch(0.73 0.18 197)",
  "oklch(0.78 0.17 80)",
  "oklch(0.65 0.22 340)",
  "oklch(0.70 0.22 35)",
]

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay: i * 0.08 },
  }),
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export default function DashboardPage() {
  const [health, setHealth] = useState<HealthStatus | null>(null)
  const [info, setInfo] = useState<ModelInfo | null>(null)
  const [metricsData, setMetricsData] = useState<{
    requestTotal: number
    predictionTotal: number
    avgLatencyMs: number | null
    allMetrics: ParsedMetric[]
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [healthRes, infoRes, metricsRes] = await Promise.allSettled([
        getHealth(),
        getInfo(),
        getMetrics(),
      ])
      if (healthRes.status === "fulfilled") setHealth(healthRes.value)
      if (infoRes.status === "fulfilled") setInfo(infoRes.value)
      if (metricsRes.status === "fulfilled") {
        const parsed = parsePrometheusMetrics(metricsRes.value)
        const extracted = extractKeyMetrics(parsed)
        setMetricsData(extracted)
      }
      setLastUpdated(new Date())
    } catch {
      setError("Failed to fetch dashboard data. Ensure the backend is running.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAll()
    const interval = setInterval(fetchAll, 30000)
    return () => clearInterval(interval)
  }, [fetchAll])

  const isHealthy = health?.status === "ok" || health?.status === "healthy"

  const chartData =
    metricsData?.allMetrics
      .filter((m) => (m.type === "counter" || m.type === "gauge" || m.type === "untyped") && m.values.length > 0 && !m.name.includes("_bucket"))
      .slice(0, 8)
      .map((m) => ({
        name: m.name.replace(/_total$/, "").replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase()),
        value: m.values.reduce((sum, v) => sum + v.value, 0),
      })) || []

  if (loading && !metricsData) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader text="Fetching dashboard data..." />
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 dot-pattern opacity-[0.1]" />
      <div
        className="pointer-events-none absolute right-0 top-0 h-125 w-125 translate-x-1/3 -translate-y-1/3 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, oklch(0.63 0.27 284 / 0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full glass border border-border/40 px-3 py-1.5 text-xs text-muted-foreground">
              <Activity className="h-3.5 w-3.5 text-primary" />
              Live Monitoring
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              System <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="mt-2 text-muted-foreground">
              Real-time health, model info, and Prometheus metrics
            </p>
          </div>

          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="font-mono text-xs text-muted-foreground">
                Updated {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={fetchAll}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border/50 bg-secondary/50 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </motion.button>
          </div>
        </motion.div>

        {/* Error banner */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4"
            >
              <AlertCircle className="h-4.5 w-4.5 shrink-0 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Key metrics */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              title: "API Health",
              value: isHealthy ? "Online" : health ? "Degraded" : "Unknown",
              subtitle: isHealthy ? "All systems operational" : "Check connection",
              icon: Server,
              trend: (isHealthy ? "up" : "neutral") as "up" | "neutral",
            },
            {
              title: "Total Requests",
              value: metricsData?.requestTotal?.toLocaleString() ?? "--",
              subtitle: "API requests served",
              icon: Activity,
            },
            {
              title: "Total Predictions",
              value: metricsData?.predictionTotal?.toLocaleString() ?? "--",
              subtitle: "Images analyzed",
              icon: Brain,
            },
            {
              title: "Avg Latency",
              value: metricsData?.avgLatencyMs ? `${metricsData.avgLatencyMs.toFixed(1)} ms` : "--",
              subtitle: metricsData?.avgLatencyMs ? "Per inference" : "No data",
              icon: Timer,
            },
          ].map((card, i) => (
            <motion.div key={card.title} variants={fadeUp} custom={i}>
              <MetricCard {...card} delay={i * 0.08} />
            </motion.div>
          ))}
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* API Health card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl border border-border/50 bg-card"
          >
            <div className="h-px w-full gradient-primary-bg" />
            <div className="p-6">
              <div className="mb-5 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 bg-secondary/50">
                  <Server className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">API Health Status</h3>
                  <p className="text-xs text-muted-foreground">Response from /health endpoint</p>
                </div>
              </div>

              {health ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <StatusDot status={isHealthy ? "online" : "offline"} />
                    <span className="font-semibold text-foreground">
                      {isHealthy ? "Healthy" : "Unhealthy"}
                    </span>
                    <Badge
                      variant={isHealthy ? "default" : "destructive"}
                      className={isHealthy ? "gradient-primary-bg border-0 text-white" : ""}
                    >
                      {String(health.status)}
                    </Badge>
                  </div>
                  <div className="rounded-xl border border-border/40 bg-secondary/30 p-4">
                    <pre className="overflow-x-auto font-mono text-xs text-muted-foreground">
                      {JSON.stringify(health, null, 2)}
                    </pre>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Unable to fetch health status</p>
              )}
            </div>
          </motion.div>

          {/* Model info card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl border border-border/50 bg-card"
          >
            <div className="h-px w-full" style={{ background: "linear-gradient(90deg, oklch(0.73 0.18 197), oklch(0.63 0.27 284))" }} />
            <div className="p-6">
              <div className="mb-5 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 bg-secondary/50">
                  <Brain className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Model Information</h3>
                  <p className="text-xs text-muted-foreground">Response from /info endpoint</p>
                </div>
              </div>

              {info ? (
                <div className="flex flex-col gap-2.5">
                  {Object.entries(info).map(([key, value], i) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.06, duration: 0.35 }}
                      className="flex items-start justify-between gap-4 rounded-xl border border-border/40 bg-secondary/30 px-4 py-3"
                    >
                      <span className="text-xs font-medium capitalize text-muted-foreground">
                        {key.replace(/_/g, " ")}
                      </span>
                      <span className="text-right text-xs font-medium text-foreground">
                        {Array.isArray(value) ? value.join(", ") : String(value)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Unable to fetch model info</p>
              )}
            </div>
          </motion.div>

          {/* Metrics chart */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl border border-border/50 bg-card lg:col-span-2"
          >
            <div className="h-px w-full gradient-primary-bg" />
            <div className="p-6">
              <div className="mb-6 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 bg-secondary/50">
                  <Layers className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Prometheus Metrics</h3>
                  <p className="text-xs text-muted-foreground">
                    Parsed from /metrics · auto-refreshes every 30s
                  </p>
                </div>
              </div>

              {chartData.length > 0 ? (
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barGap={4}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.20 0.015 265 / 0.5)" vertical={false} />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 11, fill: "oklch(0.55 0.012 265)" }}
                        angle={-20}
                        textAnchor="end"
                        height={60}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "oklch(0.55 0.012 265)" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(0.10 0.013 265)",
                          border: "1px solid oklch(0.20 0.015 265)",
                          borderRadius: "12px",
                          color: "oklch(0.97 0.004 265)",
                          fontSize: "12px",
                          boxShadow: "0 8px 32px oklch(0 0 0 / 0.4)",
                        }}
                        cursor={{ fill: "oklch(0.63 0.27 284 / 0.05)" }}
                      />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        {chartData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border/40">
                  <p className="text-sm text-muted-foreground">
                    No chart data · ensure /metrics endpoint is accessible
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Raw metrics table */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl border border-border/50 bg-card lg:col-span-2"
          >
            <div className="h-px w-full" style={{ background: "linear-gradient(90deg, oklch(0.73 0.18 197), oklch(0.63 0.27 284))" }} />
            <div className="p-6">
              <div className="mb-5 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 bg-secondary/50">
                  <Database className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">All Parsed Metrics</h3>
                  <p className="text-xs text-muted-foreground">Detailed breakdown of all Prometheus metrics</p>
                </div>
              </div>

              {metricsData && metricsData.allMetrics.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/40">
                        <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Hash className="h-3 w-3" />
                            Metric
                          </div>
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Cpu className="h-3 w-3" />
                            Type
                          </div>
                        </th>
                        <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {metricsData.allMetrics.map((metric) =>
                        metric.values.map((v, vIdx) => (
                          <motion.tr
                            key={`${metric.name}-${vIdx}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: vIdx * 0.02 }}
                            className="border-b border-border/20 transition-colors hover:bg-secondary/20"
                          >
                            <td className="px-3 py-3">
                              <code className="font-mono text-xs text-foreground">
                                {metric.name}
                              </code>
                              {Object.keys(v.labels).length > 0 && (
                                <div className="mt-1 flex flex-wrap gap-1">
                                  {Object.entries(v.labels).map(([k, val]) => (
                                    <Badge
                                      key={k}
                                      variant="outline"
                                      className="text-[10px] px-1.5 py-0 font-mono border-border/50"
                                    >
                                      {k}={val}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </td>
                            <td className="px-3 py-3">
                              <span className="rounded-md border border-border/40 bg-secondary/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                                {metric.type}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-right font-mono text-xs text-foreground">
                              {v.value.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                            </td>
                          </motion.tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-border/40">
                  <p className="text-sm text-muted-foreground">No metrics data available</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
