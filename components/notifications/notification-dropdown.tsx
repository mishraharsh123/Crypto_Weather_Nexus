"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/redux/store"
import { markAllAsRead, markAsRead } from "@/redux/features/notificationsSlice"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function NotificationDropdown() {
  const { notifications } = useSelector((state: RootState) => state.notifications)
  const dispatch = useDispatch<AppDispatch>()

  const hasUnreadNotifications = notifications.some((notification) => !notification.read)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {hasUnreadNotifications && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {hasUnreadNotifications && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto text-xs px-2 py-1"
              onClick={() => dispatch(markAllAsRead())}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn("flex flex-col items-start p-3 cursor-default", !notification.read && "bg-muted/50")}
                onClick={() => dispatch(markAsRead(notification.id))}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">
                    {notification.type === "price_alert" ? "Price Alert" : "Weather Alert"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm mt-1">{notification.message}</p>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">No notifications</div>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

