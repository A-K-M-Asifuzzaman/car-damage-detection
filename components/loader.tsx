import { cn } from "@/lib/utils"

interface LoaderProps {
  className?: string
  text?: string
}

export function Loader({ className, text = "Analyzing..." }: LoaderProps) {
  return (
    <div className={cn("flex flex-col items-center gap-5", className)}>
      {/* Nested spinner rings */}
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full border-2 border-border/30" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary" />
        <div
          className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-t-accent"
          style={{ animationDuration: "0.85s", animationDirection: "reverse" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
        </div>
      </div>

      {/* Pulsing text */}
      <div className="flex flex-col items-center gap-1.5">
        <p className="text-sm font-semibold text-foreground animate-pulse">{text}</p>
        {/* Animated dots */}
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1 w-1 rounded-full bg-primary"
              style={{
                animation: "pulse 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
