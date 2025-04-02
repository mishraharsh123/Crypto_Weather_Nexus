"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/redux/store"
import { fetchCityWeatherHistory } from "@/redux/features/weatherSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { toggleFavoriteCity } from "@/redux/features/userPreferencesSlice"
import WeatherChart from "@/components/weather/weather-chart"
import WeatherTable from "@/components/weather/weather-table"

export default function CityDetailPage({ city }: { city: string }) {
  const dispatch = useDispatch<AppDispatch>()
  const { data, history, loading, error } = useSelector((state: RootState) => state.weather)
  const { favoriteCities } = useSelector((state: RootState) => state.userPreferences)

  const cityData = data.find((c) => c.name.toLowerCase() === city.toLowerCase())
  const cityName = cityData?.name || city
  const isFavorite = favoriteCities.includes(cityName)

  useEffect(() => {
    if (cityName) {
      dispatch(fetchCityWeatherHistory(cityName))
    }
  }, [dispatch, cityName])

  if (loading && !cityData) {
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

  if (error || (!loading && !cityData)) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight capitalize">{city}</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
              {error ? "Error loading weather data. Please try again later." : "City not found."}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

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
          <h1 className="text-3xl font-bold tracking-tight">{cityName}</h1>
        </div>
        <Button variant="outline" size="icon" onClick={() => dispatch(toggleFavoriteCity(cityName))}>
          <Star className={`h-5 w-5 ${isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
          <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
        </Button>
      </div>

      {cityData && (
        <Card>
          <CardHeader>
            <CardTitle>Current Weather</CardTitle>
            <CardDescription>Last updated: {new Date().toLocaleTimeString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="text-6xl font-bold">{Math.round(cityData.main.temp)}°C</div>
                <div className="text-xl capitalize">{cityData.weather[0].description}</div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Feels Like</p>
                  <p className="text-xl font-medium">{Math.round(cityData.main.feels_like)}°C</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Humidity</p>
                  <p className="text-xl font-medium">{cityData.main.humidity}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Wind</p>
                  <p className="text-xl font-medium">{Math.round(cityData.wind.speed)} m/s</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pressure</p>
                  <p className="text-xl font-medium">{cityData.main.pressure} hPa</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Visibility</p>
                  <p className="text-xl font-medium">{(cityData.visibility / 1000).toFixed(1)} km</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {history.length > 0 ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Temperature History</CardTitle>
              <CardDescription>Last 5 days temperature trend</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <WeatherChart data={history} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weather History</CardTitle>
              <CardDescription>Detailed weather data for the past 5 days</CardDescription>
            </CardHeader>
            <CardContent>
              <WeatherTable data={history} />
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="p-6 flex justify-center items-center h-[300px]">
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-[200px] w-full max-w-md" />
              <p className="text-muted-foreground">Loading weather history...</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

