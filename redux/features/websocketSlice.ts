import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { updateCryptoPrice } from "./cryptoSlice"
import { addNotification } from "./notificationsSlice"

interface WebSocketState {
  connected: boolean
  error: string | null
}

const initialState: WebSocketState = {
  connected: false,
  error: null,
}

// Initialize WebSocket connection
export const initializeWebSocket = createAsyncThunk("websocket/initialize", async (_, { dispatch }) => {
  try {
    console.log("WebSocket connection established")

    // Simulate WebSocket messages with setInterval
    const interval = setInterval(() => {
      // Randomly decide which crypto to update
      const cryptos = ["bitcoin", "ethereum"]
      const crypto = cryptos[Math.floor(Math.random() * cryptos.length)]

      // Generate a random price change
      const basePrice = crypto === "bitcoin" ? 42500 : 2350
      const newPrice = (basePrice * (0.995 + Math.random() * 0.01)).toFixed(2)

      // Update the price
      dispatch(updateCryptoPrice({ id: crypto, price: newPrice }))

      // Occasionally generate a price alert notification
      if (Math.random() > 0.85) {
        // 15% chance
        const direction = Math.random() > 0.5 ? "up" : "down"
        const changePercent = (Math.random() * 5 + 1).toFixed(2)

        dispatch(
          addNotification({
            type: "price_alert",
            message: `${crypto.charAt(0).toUpperCase() + crypto.slice(1)} price ${direction} ${changePercent}% to $${newPrice}`,
          }),
        )
      }
    }, 5000) // Every 5 seconds

    // In a real implementation, we would return the WebSocket instance
    // Here we just return the interval ID so we can clean it up later if needed
    return interval
  } catch (error) {
    console.error("WebSocket simulation error:", error)
    return null
  }
})

const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    setConnected: (state, action) => {
      state.connected = action.payload
      state.error = null
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { setConnected, setError } = websocketSlice.actions
export default websocketSlice.reducer

