"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { NotificationDropdown } from "@/components/notifications/notification-dropdown"

export default function Header() {
  const pathname = usePathname()
  const { notifications } = useSelector((state: RootState) => state.notifications)
  const hasUnreadNotifications = notifications.some((notification) => !notification.read)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-xl">CryptoWeather Nexus</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Dashboard
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <NotificationDropdown />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

