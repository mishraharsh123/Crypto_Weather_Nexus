"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/redux/store"
import { fetchCryptoHistory } from "@/redux/features/cryptoSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Star, TrendingDown, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { toggleFavoriteCrypto } from "@/redux/features/userPreferencesSlice"
import CryptoChart from "@/components/crypto/crypto-chart"
import CryptoMetrics from "@/components/crypto/crypto-metrics"

export default function CryptoDetailPage({ id }: { id: string }) {
  const dispatch = useDispatch<AppDispatch>()
  const { data, history, loading, error } = useSelector((state: RootState) => state.crypto)
  const { favoriteCryptos } = useSelector((state: RootState) => state.userPreferences)

  const cryptoData = data.find((c) => c.id === id)
  const isFavorite = favoriteCryptos.includes(id)

  useEffect(() => {
    dispatch(fetchCryptoHistory(id))
  }, [dispatch, id])

  if (loading && !cryptoData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <Skeleton className="h-8 w-40" />
          </div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-5 w-60" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-5 w-60" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || (!loading && !cryptoData)) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{id}</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
              {error ? "Error loading cryptocurrency data. Please try again later." : "Cryptocurrency not found."}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!cryptoData) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">
            {cryptoData.name} ({cryptoData.symbol.toUpperCase()})
          </h1>
        </div>
        <Button variant="outline" size="icon" onClick={() => dispatch(toggleFavoriteCrypto(id))}>
          <Star className={`h-5 w-5 ${isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
          <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Price</CardTitle>
          <CardDescription>Last updated: {new Date().toLocaleTimeString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="text-6xl font-bold">${Number.parseFloat(cryptoData.priceUsd).toFixed(2)}</div>
              <div
                className={`flex items-center text-xl ${
                  Number.parseFloat(cryptoData.changePercent24Hr) >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {Number.parseFloat(cryptoData.changePercent24Hr) >= 0 ? (
                  <TrendingUp className="h-6 w-6 mr-1" />
                ) : (
                  <TrendingDown className="h-6 w-6 mr-1" />
                )}
                {Math.abs(Number.parseFloat(cryptoData.changePercent24Hr)).toFixed(2)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {history.length > 0 ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Price History</CardTitle>
              <CardDescription>Last 7 days price trend</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <CryptoChart data={history} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Extended Metrics</CardTitle>
              <CardDescription>Detailed market data</CardDescription>
            </CardHeader>
            <CardContent>
              <CryptoMetrics data={cryptoData} />
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="p-6 flex justify-center items-center h-[300px]">
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-[200px] w-full max-w-md" />
              <p className="text-muted-foreground">Loading price history...</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

