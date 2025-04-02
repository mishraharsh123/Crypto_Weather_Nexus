"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/redux/store"
import { fetchWeatherData } from "@/redux/features/weatherSlice"
import { fetchCryptoData } from "@/redux/features/cryptoSlice"
import { fetchNewsData } from "@/redux/features/newsSlice"
import { initializeWebSocket } from "@/redux/features/websocketSlice"
import WeatherSection from "@/components/dashboard/weather-section"
import CryptoSection from "@/components/dashboard/crypto-section"
import NewsSection from "@/components/dashboard/news-section"

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    // Initial data fetch
    dispatch(fetchWeatherData())
    dispatch(fetchCryptoData())
    dispatch(fetchNewsData())

    // Initialize WebSocket connection
    dispatch(initializeWebSocket())

    // Set up periodic data refresh (every 60 seconds)
    const intervalId = setInterval(() => {
      dispatch(fetchWeatherData())
      dispatch(fetchCryptoData())
      dispatch(fetchNewsData())
    }, 60000)

    return () => {
      clearInterval(intervalId)
    }
  }, [dispatch])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <WeatherSection />
        <CryptoSection />
        <NewsSection />
      </div>
    </div>
  )
}

