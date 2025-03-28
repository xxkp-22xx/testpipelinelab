"use client"

import { useTheme } from "next-themes"

export function BarChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="w-full h-full flex items-end justify-between gap-1">
      {[40, 30, 70, 50, 90, 60, 50, 75, 45, 60, 80, 35].map((height, i) => (
        <div
          key={i}
          className="h-full flex-1 rounded-sm bg-primary/20 relative overflow-hidden"
          style={{ maxHeight: "100%" }}
        >
          <div
            className="absolute bottom-0 w-full bg-primary transition-all duration-500"
            style={{ height: `${height}%` }}
          />
        </div>
      ))}
    </div>
  )
}

export function LineChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // SVG path for a simple line chart
  const path = "M0,60 L20,40 L40,45 L60,20 L80,30 L100,10"

  return (
    <div className="w-full h-full">
      <svg width="100%" height="100%" viewBox="0 0 100 80" preserveAspectRatio="none">
        <path d={path} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
        <path d={`${path} L100,80 L0,80 Z`} fill="hsl(var(--primary) / 0.2)" strokeWidth="0" />
      </svg>
    </div>
  )
}

export function PieChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="hsl(var(--primary) / 0.2)" strokeWidth="20" />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="hsl(var(--primary))"
          strokeWidth="20"
          strokeDasharray="251.2"
          strokeDashoffset="62.8"
          transform="rotate(-90 50 50)"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth="20"
          strokeDasharray="251.2"
          strokeDashoffset="188.4"
          transform="rotate(-90 50 50)"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

