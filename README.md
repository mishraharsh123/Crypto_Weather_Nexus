CryptoWeatherNexus



A modern Next.js application that combines real-time cryptocurrency tracking, weather forecasting, and news updates in one elegant dashboard.

🌟 Features

Real-time Cryptocurrency Tracking: Live price updates, historical data, and price alerts

Weather Forecasting: Current conditions, 5-day forecast, and severe weather alerts

News Aggregation: Latest financial, technology, and global news

Smart Dashboard: Customizable interface with widgets and dark/light mode

User Preferences: Save favorite cities, cryptocurrencies, and news sources

Real-time Notifications: Price alerts and severe weather warnings

Responsive Design: Optimized for desktop, tablet, and mobile devices

🚀 Live Demo

Check out the live application: CryptoWeatherNexus

🛠️ Technologies

Frontend: Next.js (App Router), TypeScript

Styling: Tailwind CSS

State Management: Zustand

API Integration: RESTful API clients for real-time updates

Build Tool: pnpm for fast and efficient dependency management

🗏️ Prerequisites

Before you begin, ensure you have the following installed:

Node.js (v16 or higher)

pnpm (recommended for package management)

🔧 Installation

Clone the repository:

git clone https://github.com/mishraharsh123/CryptoWeatherNexus.git
cd CryptoWeatherNexus

Install dependencies:

pnpm install

Create a .env file in the root directory with your API keys:

NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key
NEXT_PUBLIC_CRYPTO_API_KEY=your_crypto_api_key
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key

Start the development server:

pnpm dev

Open your browser and go to http://localhost:3000

📚 API References

This project integrates multiple APIs for fetching real-time data:

Weather API

Provider: OpenWeatherMap API

Usage: Weather forecasts, current conditions, and alerts

Endpoints:

/data/2.5/weather → Current Weather

/data/2.5/forecast → 5-Day Forecast

/data/2.5/onecall → Weather Alerts

Cryptocurrency API

Provider: CoinGecko API

Usage: Cryptocurrency prices, market data, and historical charts

Endpoints:

/api/v3/coins/list → Coin List

/api/v3/coins/markets → Market Data

/api/v3/coins/{id}/market_chart → Historical Data

News API

Provider: NewsAPI

Usage: Fetch latest headlines from various sources

Endpoints:

/v2/top-headlines → Top Headlines

/v2/everything → All News

🧷 Project Structure

├── public/             # Static assets
├── app/                # Next.js App Router structure
│   ├── components/     # React components
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Legacy pages (if any)
│   ├── store/          # Global state
│   ├── styles/         # Global styles
│   ├── api/            # API clients
│   ├── layout.tsx      # Application layout
│   └── page.tsx        # Main entry page
├── .env.example        # Example environment variables
├── package.json        # Project dependencies
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
├── next.config.mjs     # Next.js configuration
└── README.md           # Documentation

🔄 State Management

The application uses Zustand for managing global state, handling:

weather: Weather data and forecasts

crypto: Cryptocurrency prices and trends

news: News articles and sources

userPreferences: User settings and favorites

🚢 Deployment

To deploy the application:

Build the project:

pnpm build

Deploy to Vercel:

vercel --prod

🏆 Key Challenges & Solutions

1. Handling API Rate Limits

Challenge: APIs have rate limits that can block excessive requests.

Solution: Implemented caching mechanisms and debounced API calls to optimize requests.

2. Optimizing Performance

Challenge: Fetching real-time data for multiple services can slow down performance.

Solution: Used Server-Side Rendering (SSR) in Next.js to pre-fetch data where applicable.

3. Managing Responsive UI

Challenge: UI needs to be optimized for multiple screen sizes.

Solution: Leveraged Tailwind CSS and flex/grid layouts for better responsiveness.

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Author

Harsh Mishra

GitHub: @mishraharsh123

🙏 Acknowledgements

OpenWeatherMap for weather data

CoinGecko for cryptocurrency data

NewsAPI for news data

Tailwind CSS for styling

Next.js for server-side rendering

Vercel for hosting

