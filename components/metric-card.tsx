"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: "up" | "down" | "neutral"
  className?: string
  delay?: number
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
  delay = 0,
}: MetricCardProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-5 transition-glow hover:glow-card hover:border-primary/20",
        className
      )}
    >
      {/* Subtle gradient on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5 min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {title}
          </p>
          <p className="truncate text-2xl font-bold tracking-tight text-foreground">
            {value}
          </p>
          {subtitle && (
            <p
              className={cn(
                "text-xs font-medium",
                trend === "up" && "text-success",
                trend === "down" && "text-destructive",
                (!trend || trend === "neutral") && "text-muted-foreground"
              )}
            >
              {trend === "up" && "↑ "}
              {trend === "down" && "↓ "}
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-secondary/50 transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </motion.div>
  )
}
