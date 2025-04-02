"use client"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface WeatherHistoryItem {
  date: string
  temp: number
  humidity: number
  description: string
}

export default function WeatherChart({ data }: { data: WeatherHistoryItem[] }) {
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
            <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}°C`} />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#0ea5e9"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as WeatherHistoryItem
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
                        <span className="text-muted-foreground">Temperature:</span>
                        <span className="font-medium">{data.temp}°C</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-muted-foreground">Humidity:</span>
                        <span className="font-medium">{data.humidity}%</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-muted-foreground">Condition:</span>
                        <span className="font-medium capitalize">{data.description}</span>
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

