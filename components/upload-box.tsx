"use client"

import { useCallback, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Upload, ImageIcon, X, CheckCircle2 } from "lucide-react"

interface UploadBoxProps {
  onFileSelect: (file: File) => void
  preview: string | null
  onClear: () => void
  disabled?: boolean
}

export function UploadBox({ onFileSelect, preview, onClear, disabled }: UploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      if (!disabled) setIsDragging(true)
    },
    [disabled]
  )

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      if (disabled) return
      const file = e.dataTransfer.files[0]
      if (file && file.type.startsWith("image/")) onFileSelect(file)
    },
    [onFileSelect, disabled]
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) onFileSelect(file)
    },
    [onFileSelect]
  )

  if (preview) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-border/50 bg-card"
      >
        {/* Gradient border top */}
        <div className="h-px w-full gradient-primary-bg opacity-60" />

        <div className="relative aspect-video w-full overflow-hidden bg-secondary/20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Preview of uploaded vehicle image"
            className="h-full w-full object-contain p-4"
          />
          {/* Corner badge */}
          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full glass border border-success/30 px-2.5 py-1 text-xs font-medium text-success">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Ready
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border/40 px-5 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ImageIcon className="h-4 w-4 text-primary" />
            <span>Image ready for analysis</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClear}
            disabled={disabled}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors disabled:pointer-events-none"
          >
            <X className="h-3.5 w-3.5" />
            Remove
          </motion.button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      animate={{
        borderColor: isDragging
          ? "oklch(0.63 0.27 284 / 0.8)"
          : "oklch(0.20 0.015 265 / 0.5)",
        backgroundColor: isDragging
          ? "oklch(0.63 0.27 284 / 0.05)"
          : "transparent",
      }}
      transition={{ duration: 0.2 }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed p-14 text-center transition-all",
        disabled && "pointer-events-none opacity-40"
      )}
      role="button"
      tabIndex={0}
      aria-label="Upload image for damage detection"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          inputRef.current?.click()
        }
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled}
      />

      {/* Animated corner accents */}
      <div className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-primary/30 rounded-tl transition-all duration-300 group-hover:border-primary/70 group-hover:h-5 group-hover:w-5" />
      <div className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-primary/30 rounded-tr transition-all duration-300 group-hover:border-primary/70 group-hover:h-5 group-hover:w-5" />
      <div className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-primary/30 rounded-bl transition-all duration-300 group-hover:border-primary/70 group-hover:h-5 group-hover:w-5" />
      <div className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-primary/30 rounded-br transition-all duration-300 group-hover:border-primary/70 group-hover:h-5 group-hover:w-5" />

      <div className="flex flex-col items-center gap-5">
        <motion.div
          animate={isDragging ? { scale: 1.15, y: -4 } : { scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border/50 bg-secondary/50 transition-colors group-hover:border-primary/30 group-hover:bg-primary/10"
        >
          <Upload className="h-7 w-7 text-muted-foreground transition-colors group-hover:text-primary" />
        </motion.div>

        <div className="flex flex-col gap-1.5">
          <p className="text-base font-semibold text-foreground">
            {isDragging ? "Drop it here!" : "Drop your image or click to browse"}
          </p>
          <p className="text-sm text-muted-foreground">
            Supports <span className="text-foreground/70 font-mono text-xs">JPG · PNG · WebP</span>
          </p>
        </div>

        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center rounded-2xl bg-primary/5"
            >
              <div className="rounded-2xl border-2 border-primary/60 p-8 text-center">
                <Upload className="mx-auto mb-2 h-10 w-10 text-primary animate-float" />
                <p className="text-sm font-semibold text-primary">Release to upload</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
