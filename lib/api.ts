import axios from "axios"

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://YOUR_SPACE_URL.hf.space"

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
})

export interface PredictionResult {
  prediction: string
  predicted_class?: string
  confidence?: number
  latency_ms: number
}

export interface HealthStatus {
  status: string
  [key: string]: unknown
}

export interface ModelInfo {
  model_name?: string
  model_type?: string
  classes?: string[]
  framework?: string
  [key: string]: unknown
}

export async function predictImage(
  formData: FormData
): Promise<PredictionResult> {
  const response = await apiClient.post<PredictionResult>(
    "/predict",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  )
  return response.data
}

export async function getHealth(): Promise<HealthStatus> {
  const response = await apiClient.get<HealthStatus>("/health")
  return response.data
}

export async function getInfo(): Promise<ModelInfo> {
  const response = await apiClient.get<ModelInfo>("/info")
  return response.data
}

export async function getMetrics(): Promise<string> {
  const response = await apiClient.get<string>("/metrics", {
    responseType: "text",
  })
  return response.data
}
