export interface ParsedMetric {
  name: string
  help: string
  type: string
  values: {
    labels: Record<string, string>
    value: number
  }[]
}

export function parsePrometheusMetrics(raw: string): ParsedMetric[] {
  const lines = raw.split("\n")
  const metrics: ParsedMetric[] = []
  let current: ParsedMetric | null = null

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    if (trimmed.startsWith("# HELP ")) {
      const rest = trimmed.slice(7)
      const spaceIdx = rest.indexOf(" ")
      const name = spaceIdx !== -1 ? rest.slice(0, spaceIdx) : rest
      const help = spaceIdx !== -1 ? rest.slice(spaceIdx + 1) : ""
      current = { name, help, type: "untyped", values: [] }
      metrics.push(current)
      continue
    }

    if (trimmed.startsWith("# TYPE ")) {
      const rest = trimmed.slice(7)
      const parts = rest.split(" ")
      if (current && parts[0] === current.name) {
        current.type = parts[1] || "untyped"
      }
      continue
    }

    if (trimmed.startsWith("#")) continue

    // Parse metric line: metric_name{label="value",...} value
    const match = trimmed.match(/^([a-zA-Z_:][a-zA-Z0-9_:]*)\{?(.*?)\}?\s+(.+)$/)
    if (match) {
      const metricName = match[1]
      const labelsStr = match[2]
      const value = parseFloat(match[3])

      const labels: Record<string, string> = {}
      if (labelsStr) {
        const labelMatches = labelsStr.matchAll(/([a-zA-Z_][a-zA-Z0-9_]*)="([^"]*)"/g)
        for (const lm of labelMatches) {
          labels[lm[1]] = lm[2]
        }
      }

      // Find or create metric
      let metric = metrics.find((m) => m.name === metricName)
      if (!metric) {
        // Check for histogram/summary sub-metrics
        const baseName = metricName.replace(/_total$|_count$|_sum$|_bucket$/, "")
        metric = metrics.find((m) => m.name === baseName)
      }
      if (!metric) {
        metric = { name: metricName, help: "", type: "untyped", values: [] }
        metrics.push(metric)
      }

      metric.values.push({ labels, value })
    }
  }

  return metrics
}

export function getMetricValue(
  metrics: ParsedMetric[],
  name: string,
  labels?: Record<string, string>
): number | null {
  const metric = metrics.find(
    (m) => m.name === name || m.name === name.replace(/_total$/, "")
  )
  if (!metric) return null

  if (!labels || Object.keys(labels).length === 0) {
    // Return sum or first value
    if (metric.values.length === 0) return null
    if (metric.values.length === 1) return metric.values[0].value
    return metric.values.reduce((sum, v) => sum + v.value, 0)
  }

  const entry = metric.values.find((v) =>
    Object.entries(labels).every(([k, val]) => v.labels[k] === val)
  )
  return entry?.value ?? null
}

export function extractKeyMetrics(metrics: ParsedMetric[]) {
  const requestTotal =
    getMetricValue(metrics, "api_requests_total") ??
    getMetricValue(metrics, "http_requests_total") ??
    getMetricValue(metrics, "requests_total") ??
    0

  const predictionTotal =
    getMetricValue(metrics, "model_predictions_total") ??
    getMetricValue(metrics, "predictions_total") ??
    0

  // Try to get latency stats
  const latencySum =
    getMetricValue(metrics, "model_inference_seconds_sum") ??
    getMetricValue(metrics, "inference_seconds_sum") ??
    getMetricValue(metrics, "prediction_latency_seconds_sum") ??
    null

  const latencyCount =
    getMetricValue(metrics, "model_inference_seconds_count") ??
    getMetricValue(metrics, "inference_seconds_count") ??
    getMetricValue(metrics, "prediction_latency_seconds_count") ??
    null

  const avgLatencyMs =
    latencySum !== null && latencyCount !== null && latencyCount > 0
      ? (latencySum / latencyCount) * 1000
      : null

  return {
    requestTotal,
    predictionTotal,
    avgLatencyMs,
    allMetrics: metrics,
  }
}
