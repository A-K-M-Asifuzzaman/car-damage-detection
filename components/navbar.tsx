"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Menu, X, Scan, Zap } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/predict", label: "Predict" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "glass-strong border-b border-border/40 shadow-lg shadow-background/50"
          : "bg-background/60 backdrop-blur-md border-b border-border/20"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary-bg glow-primary shadow-lg"
          >
            <Scan className="h-4.5 w-4.5 text-white" />
          </motion.div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight text-foreground group-hover:gradient-text transition-all">
              AutoInspect
            </span>
            <span className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase">
              AI
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-secondary/80 border border-border/50"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground glass rounded-full px-3 py-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute animate-ping-slow rounded-full bg-success opacity-75 inset-0" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            Live
          </div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/predict"
              className="inline-flex items-center gap-1.5 rounded-lg gradient-primary-bg px-4 py-2 text-sm font-semibold text-white glow-primary transition-all duration-200 hover:opacity-90"
            >
              <Zap className="h-3.5 w-3.5" />
              Analyze Now
            </Link>
          </motion.div>
        </div>

        {/* Mobile toggle */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-4.5 w-4.5" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu className="h-4.5 w-4.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/40 md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-secondary text-foreground border border-border/50"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                      )}
                    >
                      {link.label}
                      {isActive && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full gradient-primary-bg" />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.05, duration: 0.2 }}
                className="mt-2 pt-2 border-t border-border/30"
              >
                <Link
                  href="/predict"
                  className="flex items-center justify-center gap-2 rounded-xl gradient-primary-bg px-4 py-3 text-sm font-semibold text-white"
                >
                  <Zap className="h-4 w-4" />
                  Start Analysis
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
