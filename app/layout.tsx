import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/redux/provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CryptoWeather Nexus",
  description: "Dashboard combining weather data, cryptocurrency information, and real-time notifications",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Providers>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'