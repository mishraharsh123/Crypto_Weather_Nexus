import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

const API_KEY = "YOUR_NEWSDATA_API_KEY" // Replace with env variable in production

interface NewsState {
  data: any[]
  loading: boolean
  error: string | null
}

const initialState: NewsState = {
  data: [],
  loading: true,
  error: null,
}

// Fetch crypto news
export const fetchNewsData = createAsyncThunk("news/fetchNewsData", async (_, { rejectWithValue }) => {
  try {
    // In a real app, we would use the NewsData.io API
    // For this demo, we'll generate mock data
    const mockNews = [
      {
        title: "Bitcoin Surges Past $60,000 as Institutional Adoption Grows",
        description:
          "Bitcoin has reached a new all-time high as major financial institutions announce new crypto investment products.",
        url: "https://example.com/news/1",
        source: "Crypto News Daily",
        publishedAt: new Date().toISOString(),
      },
      {
        title: "Ethereum 2.0 Upgrade Set to Launch Next Month",
        description:
          "The long-awaited Ethereum upgrade promises to improve scalability and reduce gas fees significantly.",
        url: "https://example.com/news/2",
        source: "Blockchain Insider",
        publishedAt: new Date().toISOString(),
      },
      {
        title: "Regulatory Clarity Coming for Crypto Markets, Says SEC Chair",
        description:
          "The SEC chairman announced plans to provide clearer guidelines for cryptocurrency regulations in the coming weeks.",
        url: "https://example.com/news/3",
        source: "Financial Times",
        publishedAt: new Date().toISOString(),
      },
      {
        title: "Major Retailer Announces Plans to Accept Cryptocurrency Payments",
        description:
          "A Fortune 500 retailer will begin accepting Bitcoin and Ethereum as payment methods starting next quarter.",
        url: "https://example.com/news/4",
        source: "Business Insider",
        publishedAt: new Date().toISOString(),
      },
      {
        title: "New DeFi Protocol Reaches $1 Billion in Total Value Locked",
        description:
          "The newly launched decentralized finance platform has attracted significant investment in its first month.",
        url: "https://example.com/news/5",
        source: "DeFi Daily",
        publishedAt: new Date().toISOString(),
      },
    ]

    return mockNews
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNewsData.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchNewsData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default newsSlice.reducer

