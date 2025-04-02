"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/redux/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toggleFavoriteCity } from "@/redux/features/userPreferencesSlice"
import Link from "next/link"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function WeatherSection() {
  const { data, loading, error } = useSelector((state: RootState) => state.weather)
  const { favoriteCities } = useSelector((state: RootState) => state.userPreferences)
  const dispatch = useDispatch<AppDispatch>()

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weather</CardTitle>
          <CardDescription>Current conditions in selected cities</CardDescription>
        </CardHeader>
        <CardContent>
          {[1, 2, 3].map((i) => (
            <div key={i} className="mb-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-40" />
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
          <CardTitle>Weather</CardTitle>
          <CardDescription>Current conditions in selected cities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
            Error loading weather data. Please try again later.
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather</CardTitle>
        <CardDescription>Current conditions in selected cities</CardDescription>
      </CardHeader>
      <CardContent>
        {data.map((city) => (
          <Link href={`/weather/${city.name.toLowerCase()}`} key={city.id} className="block mb-4">
            <div className="p-4 border rounded-lg hover:bg-accent transition-colors">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-lg">{city.name}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault()
                    dispatch(toggleFavoriteCity(city.name))
                  }}
                >
                  <Star
                    className={`h-5 w-5 ${
                      favoriteCities.includes(city.name) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                  <span className="sr-only">
                    {favoriteCities.includes(city.name) ? "Remove from favorites" : "Add to favorites"}
                  </span>
                </Button>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">{Math.round(city.main.temp)}°C</span>
                <span className="text-muted-foreground capitalize">{city.weather[0].description}</span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Humidity: {city.main.humidity}% | Wind: {Math.round(city.wind.speed)} m/s
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

