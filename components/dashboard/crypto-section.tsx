"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/redux/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toggleFavoriteCrypto } from "@/redux/features/userPreferencesSlice"
import Link from "next/link"
import { Star, TrendingDown, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function CryptoSection() {
  const { data, loading, error } = useSelector((state: RootState) => state.crypto)
  const { favoriteCryptos } = useSelector((state: RootState) => state.userPreferences)
  const dispatch = useDispatch<AppDispatch>()

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cryptocurrency</CardTitle>
          <CardDescription>Live prices and market data</CardDescription>
        </CardHeader>
        <CardContent>
          {[1, 2, 3].map((i) => (
            <div key={i} className="mb-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cryptocurrency</CardTitle>
          <CardDescription>Live prices and market data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
            Error loading cryptocurrency data. Please try again later.
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cryptocurrency</CardTitle>
        <CardDescription>Live prices and market data</CardDescription>
      </CardHeader>
      <CardContent>
        {data.map((crypto) => (
          <Link href={`/crypto/${crypto.id}`} key={crypto.id} className="block mb-4">
            <div className="p-4 border rounded-lg hover:bg-accent transition-colors">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-lg">
                  {crypto.name} ({crypto.symbol.toUpperCase()})
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault()
                    dispatch(toggleFavoriteCrypto(crypto.id))
                  }}
                >
                  <Star
                    className={`h-5 w-5 ${
                      favoriteCryptos.includes(crypto.id) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                  <span className="sr-only">
                    {favoriteCryptos.includes(crypto.id) ? "Remove from favorites" : "Add to favorites"}
                  </span>
                </Button>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">${Number.parseFloat(crypto.priceUsd).toFixed(2)}</span>
                <span
                  className={`flex items-center ${
                    Number.parseFloat(crypto.changePercent24Hr) >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {Number.parseFloat(crypto.changePercent24Hr) >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(Number.parseFloat(crypto.changePercent24Hr)).toFixed(2)}%
                </span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Market Cap: ${(Number.parseFloat(crypto.marketCapUsd) / 1e9).toFixed(2)}B
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

