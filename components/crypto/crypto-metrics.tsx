"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface CryptoData {
  id: string
  name: string
  symbol: string
  priceUsd: string
  changePercent24Hr: string
  marketCapUsd: string
  volumeUsd24Hr: string
  supply: string
  maxSupply: string
  vwap24Hr: string
  explorer: string
}

export default function CryptoMetrics({ data }: { data: CryptoData }) {
  const metrics = [
    {
      name: "Market Cap",
      value: `$${(Number.parseFloat(data.marketCapUsd) / 1e9).toFixed(2)} billion`,
    },
    {
      name: "24h Volume",
      value: `$${(Number.parseFloat(data.volumeUsd24Hr) / 1e6).toFixed(2)} million`,
    },
    {
      name: "Circulating Supply",
      value: `${(Number.parseFloat(data.supply) / 1e6).toFixed(2)} million ${data.symbol.toUpperCase()}`,
    },
    {
      name: "Max Supply",
      value: data.maxSupply
        ? `${(Number.parseFloat(data.maxSupply) / 1e6).toFixed(2)} million ${data.symbol.toUpperCase()}`
        : "Unlimited",
    },
    {
      name: "Volume Weighted Avg Price (24h)",
      value: `$${Number.parseFloat(data.vwap24Hr).toFixed(2)}`,
    },
    {
      name: "Explorer",
      value: data.explorer ? (
        <a href={data.explorer} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          View on Blockchain Explorer
        </a>
      ) : (
        "Not available"
      ),
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Metric</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {metrics.map((metric) => (
            <TableRow key={metric.name}>
              <TableCell className="font-medium">{metric.name}</TableCell>
              <TableCell>{metric.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

