import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Notification {
  id: string
  type: "price_alert" | "weather_alert"
  message: string
  timestamp: string
  read: boolean
}

interface NotificationsState {
  notifications: Notification[]
}

const initialState: NotificationsState = {
  notifications: [],
}

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<{ type: "price_alert" | "weather_alert"; message: string }>) => {
      const { type, message } = action.payload

      state.notifications.unshift({
        id: Date.now().toString(),
        type,
        message,
        timestamp: new Date().toISOString(),
        read: false,
      })

      // Keep only the latest 10 notifications
      if (state.notifications.length > 10) {
        state.notifications = state.notifications.slice(0, 10)
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find((n) => n.id === action.payload)
      if (notification) {
        notification.read = true
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((notification) => {
        notification.read = true
      })
    },
  },
})

export const { addNotification, markAsRead, markAllAsRead } = notificationsSlice.actions
export default notificationsSlice.reducer

