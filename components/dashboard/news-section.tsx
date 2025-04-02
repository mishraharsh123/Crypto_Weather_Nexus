"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink } from "lucide-react"

export default function NewsSection() {
  const { data, loading, error } = useSelector((state: RootState) => state.news)

  if (loading) {
    return (
      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <CardTitle>Crypto News</CardTitle>
          <CardDescription>Latest headlines</CardDescription>
        </CardHeader>
        <CardContent>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="mb-4 p-4 border rounded-lg">
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex justify-between mt-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <CardTitle>Crypto News</CardTitle>
          <CardDescription>Latest headlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
            Error loading news data. Please try again later.
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <CardTitle>Crypto News</CardTitle>
        <CardDescription>Latest headlines</CardDescription>
      </CardHeader>
      <CardContent>
        {data.slice(0, 5).map((article) => (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            key={article.title}
            className="block mb-4 p-4 border rounded-lg hover:bg-accent transition-colors"
          >
            <h3 className="font-medium text-base line-clamp-2 mb-1">{article.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{article.description}</p>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{article.source}</span>
              <span className="flex items-center">
                <ExternalLink className="h-3 w-3 mr-1" /> Read more
              </span>
            </div>
          </a>
        ))}
      </CardContent>
    </Card>
  )
}

