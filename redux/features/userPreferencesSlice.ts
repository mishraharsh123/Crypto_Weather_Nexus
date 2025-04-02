import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UserPreferencesState {
  favoriteCities: string[]
  favoriteCryptos: string[]
}

// Load preferences from localStorage if available
const loadPreferences = (): UserPreferencesState => {
  if (typeof window !== "undefined") {
    const savedPreferences = localStorage.getItem("userPreferences")
    if (savedPreferences) {
      return JSON.parse(savedPreferences)
    }
  }
  return {
    favoriteCities: [],
    favoriteCryptos: [],
  }
}

const initialState: UserPreferencesState = loadPreferences()

const userPreferencesSlice = createSlice({
  name: "userPreferences",
  initialState,
  reducers: {
    toggleFavoriteCity: (state, action: PayloadAction<string>) => {
      const city = action.payload
      const index = state.favoriteCities.indexOf(city)

      if (index === -1) {
        state.favoriteCities.push(city)
      } else {
        state.favoriteCities.splice(index, 1)
      }

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("userPreferences", JSON.stringify(state))
      }
    },
    toggleFavoriteCrypto: (state, action: PayloadAction<string>) => {
      const crypto = action.payload
      const index = state.favoriteCryptos.indexOf(crypto)

      if (index === -1) {
        state.favoriteCryptos.push(crypto)
      } else {
        state.favoriteCryptos.splice(index, 1)
      }

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("userPreferences", JSON.stringify(state))
      }
    },
  },
})

export const { toggleFavoriteCity, toggleFavoriteCrypto } = userPreferencesSlice.actions
export default userPreferencesSlice.reducer

