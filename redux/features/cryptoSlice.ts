import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

// Define the crypto IDs we want to fetch
const CRYPTO_IDS = ["bitcoin", "ethereum", "cardano"]

interface CryptoState {
  data: any[]
  history: any[]
  loading: boolean
  error: string | null
}

const initialState: CryptoState = {
  data: [],
  history: [],
  loading: true,
  error: null,
}

// Fetch current crypto data
export const fetchCryptoData = createAsyncThunk("crypto/fetchCryptoData", async () => {
  try {
    // Return mock cryptocurrency data
    return [
      {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "btc",
        priceUsd: "42568.75",
        changePercent24Hr: "2.45",
        marketCapUsd: "830456789123",
        volumeUsd24Hr: "28765432198",
        supply: "19250000",
        maxSupply: "21000000",
        vwap24Hr: "42345.67",
        explorer: "https://blockchain.info/",
      },
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "eth",
        priceUsd: "2345.67",
        changePercent24Hr: "-1.23",
        marketCapUsd: "280765432198",
        volumeUsd24Hr: "15678901234",
        supply: "120450000",
        maxSupply: null,
        vwap24Hr: "2340.12",
        explorer: "https://etherscan.io/",
      },
      {
        id: "cardano",
        name: "Cardano",
        symbol: "ada",
        priceUsd: "0.45",
        changePercent24Hr: "3.21",
        marketCapUsd: "15876543210",
        volumeUsd24Hr: "987654321",
        supply: "35230000000",
        maxSupply: "45000000000",
        vwap24Hr: "0.44",
        explorer: "https://cardanoscan.io/",
      },
    ]
  } catch (error) {
    return []
  }
})

// Fetch crypto price history
export const fetchCryptoHistory = createAsyncThunk("crypto/fetchCryptoHistory", async (id: string) => {
  try {
    // Generate mock historical data
    const today = new Date()
    const history = []

    // Base price depends on which crypto we're looking at
    let basePrice = 0
    switch (id) {
      case "bitcoin":
        basePrice = 42000
        break
      case "ethereum":
        basePrice = 2300
        break
      case "cardano":
        basePrice = 0.45
        break
      default:
        basePrice = 100
    }

    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(today.getDate() - i)

      // Create some price variation
      const priceVariation = Math.random() * 0.1 - 0.05 // -5% to +5%
      const price = basePrice * (1 + priceVariation)

      history.push({
        date: date.toISOString(),
        price: price,
        volume: basePrice * 1000000 * (0.8 + Math.random() * 0.4), // Random volume
        marketCap: price * (id === "bitcoin" ? 19250000 : id === "ethereum" ? 120450000 : 35230000000),
      })
    }

    return history
  } catch (error) {
    return []
  }
})

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    updateCryptoPrice: (state, action: PayloadAction<{ id: string; price: string }>) => {
      const { id, price } = action.payload
      const cryptoIndex = state.data.findIndex((crypto) => crypto.id === id)

      if (cryptoIndex !== -1) {
        // Calculate the change from the previous price
        const oldPrice = Number.parseFloat(state.data[cryptoIndex].priceUsd)
        const newPrice = Number.parseFloat(price)

        // Update the price
        state.data[cryptoIndex] = {
          ...state.data[cryptoIndex],
          priceUsd: price,
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCryptoData.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchCryptoHistory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCryptoHistory.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false
        state.history = action.payload
      })
      .addCase(fetchCryptoHistory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { updateCryptoPrice } = cryptoSlice.actions
export default cryptoSlice.reducer

