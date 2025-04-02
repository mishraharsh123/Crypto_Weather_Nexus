import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { addNotification } from "./notificationsSlice"

// Define the city names we want to fetch
const CITIES = ["New York", "London", "Tokyo"]
const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY" // Replace with env variable in production

interface WeatherState {
  data: any[]
  history: any[]
  loading: boolean
  error: string | null
}

const initialState: WeatherState = {
  data: [],
  history: [],
  loading: true,
  error: null,
}

// Fetch current weather for predefined cities
export const fetchWeatherData = createAsyncThunk("weather/fetchWeatherData", async (_, { dispatch }) => {
  try {
    // Instead of making API calls, return mock data
    const mockWeatherData = [
      {
        id: 5128581,
        name: "New York",
        main: {
          temp: 22.5,
          feels_like: 21.8,
          humidity: 65,
          pressure: 1012,
        },
        weather: [
          {
            main: "Clear",
            description: "clear sky",
          },
        ],
        wind: {
          speed: 3.6,
          deg: 250,
        },
        visibility: 10000,
      },
      {
        id: 2643743,
        name: "London",
        main: {
          temp: 18.2,
          feels_like: 17.9,
          humidity: 72,
          pressure: 1008,
        },
        weather: [
          {
            main: "Clouds",
            description: "scattered clouds",
          },
        ],
        wind: {
          speed: 4.1,
          deg: 210,
        },
        visibility: 8000,
      },
      {
        id: 1850147,
        name: "Tokyo",
        main: {
          temp: 26.7,
          feels_like: 27.9,
          humidity: 68,
          pressure: 1010,
        },
        weather: [
          {
            main: "Rain",
            description: "light rain",
          },
        ],
        wind: {
          speed: 2.1,
          deg: 180,
        },
        visibility: 7000,
      },
    ]

    // Simulate a weather alert (in a real app, this would come from a real alert system)
    const randomCity = ["New York", "London", "Tokyo"][Math.floor(Math.random() * 3)]
    if (Math.random() > 0.7) {
      // 30% chance of alert
      dispatch(
        addNotification({
          type: "weather_alert",
          message: `Severe weather warning for ${randomCity}. Heavy rain expected in the next 24 hours.`,
        }),
      )
    }

    return mockWeatherData
  } catch (error) {
    return []
  }
})

// Fetch weather history for a specific city
export const fetchCityWeatherHistory = createAsyncThunk("weather/fetchCityWeatherHistory", async (city: string) => {
  try {
    // Generate mock historical data
    const today = new Date()
    const history = []

    for (let i = 0; i < 5; i++) {
      const date = new Date()
      date.setDate(today.getDate() - i)

      history.push({
        date: date.toISOString(),
        temp: Math.round(15 + Math.random() * 10), // Random temp between 15-25°C
        humidity: Math.round(60 + Math.random() * 30), // Random humidity between 60-90%
        description: ["clear sky", "few clouds", "scattered clouds", "light rain", "moderate rain"][
          Math.floor(Math.random() * 5)
        ],
        wind: Math.round(2 + Math.random() * 8), // Random wind between 2-10 m/s
        pressure: Math.round(1000 + Math.random() * 30), // Random pressure between 1000-1030 hPa
      })
    }

    return history
  } catch (error) {
    return []
  }
})

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWeatherData.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchCityWeatherHistory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCityWeatherHistory.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false
        state.history = action.payload
      })
      .addCase(fetchCityWeatherHistory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default weatherSlice.reducer

