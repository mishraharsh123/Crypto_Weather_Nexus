import type * as React from "react"

const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full">{children}</div>
}

const Chart = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full h-full">{children}</div>
}

interface ChartTooltipContentProps {
  children: React.ReactNode
}

const ChartTooltipContent = ({ children }: ChartTooltipContentProps) => {
  return <div className="rounded-md border bg-popover p-4 text-popover-foreground shadow-sm">{children}</div>
}

const ChartTooltip = () => {
  return null
}

export { ChartContainer, Chart, ChartTooltipContent, ChartTooltip }

