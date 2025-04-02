"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface WeatherHistoryItem {
  date: string
  temp: number
  humidity: number
  description: string
  wind: number
  pressure: number
}

export default function WeatherTable({ data }: { data: WeatherHistoryItem[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Temperature</TableHead>
            <TableHead>Humidity</TableHead>
            <TableHead>Wind</TableHead>
            <TableHead>Pressure</TableHead>
            <TableHead>Condition</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.date}>
              <TableCell>
                {new Date(item.date).toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell>{item.temp}°C</TableCell>
              <TableCell>{item.humidity}%</TableCell>
              <TableCell>{item.wind} m/s</TableCell>
              <TableCell>{item.pressure} hPa</TableCell>
              <TableCell className="capitalize">{item.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

