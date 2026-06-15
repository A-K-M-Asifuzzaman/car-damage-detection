import { cn } from "@/lib/utils"

interface StatusDotProps {
  status: "online" | "offline" | "loading"
  className?: string
}

export function StatusDot({ status, className }: StatusDotProps) {
  return (
    <span className={cn("relative flex h-3 w-3", className)}>
      {status === "online" && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
      )}
      <span
        className={cn(
          "relative inline-flex h-3 w-3 rounded-full",
          status === "online" && "bg-success",
          status === "offline" && "bg-destructive",
          status === "loading" && "bg-warning animate-pulse"
        )}
      />
    </span>
  )
}
