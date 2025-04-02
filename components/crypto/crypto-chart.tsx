"use client"

import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface CryptoHistoryItem {
  date: string
  price: number
  volume: number
  marketCap: number
}

export default function CryptoChart({ data }: { data: CryptoHistoryItem[] }) {
  return (
    <ChartContainer>
      <Chart>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric" })
              }
            />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value.toLocaleString()}`} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as CryptoHistoryItem
                  return (
                    <ChartTooltipContent>
                      <div className="text-sm font-medium">
                        {new Date(data.date).toLocaleDateString(undefined, {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-muted-foreground">Price:</span>
                        <span className="font-medium">${data.price.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-muted-foreground">Volume:</span>
                        <span className="font-medium">${(data.volume / 1e6).toFixed(2)}M</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-muted-foreground">Market Cap:</span>
                        <span className="font-medium">${(data.marketCap / 1e9).toFixed(2)}B</span>
                      </div>
                    </ChartTooltipContent>
                  )
                }
                return null
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Chart>
    </ChartContainer>
  )
}

