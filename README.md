# Trenzora 🚀

>>Trenzora is an all-in-one platform for discovering, analyzing, and trading trending Zora coins on Base. It combines real-time market intelligence, a powerful Telegram trading bot, and automated alerts to help users act fast and trade securely—right from their favorite messaging app.

## Problem Statement
Crypto traders on Zora ecosystems struggle to:
- Discover trending coins in real time.
- Act quickly on new opportunities.
- Trade securely and efficiently from mobile devices.
- Get timely alerts about market trends.
- Manage wallets and execute trades without complex dApps.

---

## Solution

Trenzora solves these challenges through three innovative components:

1. **Dexscreener**
   - Real-time tracking of trending Zora coins on Base
   - On-chain analytics: price, volume, holders, market cap
   - Social and sentiment data integration for deeper insights

2. **Telegram Trading Bot**
   - Secure wallet management and encrypted key storage
   - Instant buy/sell of Zora tokens with MEV protection
   - Live price quotes, gas estimation, and trade history
   - User-friendly trading directly from Telegram

3. **Alerts & Autonomous Agent**
   - Continuous market scanning and trend detection
   - Automated buy/sell/hold recommendations with confidence scores
   - Proactive alerts for trending coins and market anomalies
   - Extensible, fully autonomous or user-triggered operation

---

## Trenzora Products
- **Zora Coins Integration**
- **Telegram Trading Bot**
- **Alerts Agent**


## Trenzora Products & Key Features
### 1. *Dexscreener**
- Uses the `@zoralabs/coins-sdk` to fetch trending coins, price, volume, holders, and social data.
- Analyzes coins for buy/sell signals based on price, volume, market cap, and social presence.

### 2. **Telegram Trading Bot**
- Built with TypeScript.
  - Features:
    - Wallet creation/import/export (encrypted).
    - Balance/history tracking (ETH & Zora Tokens).
    - Buy/sell tokens with MEV protection.
    - Gas cost estimation and optimization.
    - Deposit/withdraw ETH.
    - Customizable slippage and gas settings.
- Integrates with QuickNode’s Base DeFi Power Bundle (OpenOcean API, Sentio Gas, MEV protection).

---

## Telegram Trading Bot: Codebase Breakdown & Zora Token Trading

### **Overview**
The Telegram Trading Bot is a TypeScript-based backend that allows users to trade Zora tokens directly from Telegram. It is designed for the Zora Coinathon Hackathon to showcase seamless, secure, and user-friendly DeFi trading on Base.

### **Codebase Structure**
- **Entry Point:** `telegram-trading-bot/index.ts` initializes the bot, loads environment variables, and sets up command handlers.
- **Commands:** All user interactions (buy, sell, balance, deposit, withdraw, trending, etc.) are handled in `src/commands/`.
- **Core Logic:**
  - `src/lib/swap.ts`: Handles swaps, price quotes, and gas estimation using OpenOcean and Sentio APIs.
  - `src/lib/database.ts`: Manages user wallets, balances, and transaction history (SQLite).
  - `src/lib/history.ts`: Fetches and tracks token balances and historical data.
  - `src/lib/encryption.ts`: Encrypts/decrypts private keys for secure storage.
- **Types:** All data structures and command types are defined in `src/types/`.
- **Utils:** Helper functions for formatting, validation, and keyboard UI in `src/utils/`.

### **How It Trades Zora Tokens**
1. **Wallet Management:**
   - Users can create or import a wallet directly in Telegram. Private keys are encrypted and stored securely.
2. **Token Discovery:**
   - The bot fetches trending Zora tokens using the `@zoralabs/coins-sdk` and presents them to the user.
3. **Buy/Sell Flow:**
   - User selects a token and enters the amount to buy/sell.
   - The bot fetches a live price quote and gas estimate using OpenOcean and Sentio APIs.
   - The user confirms the trade; the bot signs and sends the transaction on Base Mainnet.
   - MEV protection is applied for optimal execution.
4. **Transaction Feedback:**
   - The bot provides real-time status updates, transaction hashes, and error handling.
5. **History & Alerts:**
   - Users can view their balance and trade history for both ETH and Zora tokens.
   - The bot can send alerts for price changes, new trends, or completed trades.

### **Why This Matters for Zora Coinathon**
- **Onboarding:** Lowers the barrier for new users to trade Zora tokens—no dApp or browser wallet required.
- **Speed:** Enables instant trading and trend reaction from any device via Telegram.
- **Security:** Private keys are encrypted; MEV protection ensures fair execution.
- **Innovation:** Demonstrates how Zora’s ecosystem can be integrated into mainstream messaging apps for mass adoption.

---

### 3. **Alerts Agent**
- Scans Zora trending coins automatically and on-demand.
- Sends detailed analysis and buy/sell recommendations to users.
- Notifies users instantly when a coin starts trending.
- Accessible via Telegram commands and inline buttons.

---

## Alert Agent: Market Intelligence, Decision Making, and Autonomy

### **Market Intelligence**
- Continuously monitors Zora and Base for trending coins, price spikes, volume surges, and new mints.
- Aggregates on-chain data (price, volume, holders, market cap) and off-chain data (social, news, sentiment).
- Uses the `@zoralabs/coins-sdk` and custom logic to build a real-time intelligence feed.

### **Decision Making**
- The agent's core logic is in `telegram-trading-bot/agent/index.ts`.
- Each coin is scored using a multi-factor model:
  - **Price Change**: 24h, 1h, and 5m momentum
  - **Volume**: Trading activity and liquidity
  - **Market Cap**: Growth potential vs. risk
  - **Holder Distribution**: Community spread and whale risk
  - **Social Presence**: Twitter, Telegram, website
  - **Risk Assessment**: Volatility, liquidity, and contract safety
- The agent generates a buy/sell/hold/alert decision for each coin, with confidence and risk level.
- Example (from code):
```ts
// agent/index.ts (simplified)
if (coin.priceChange24h > 50) buyAdvice = "STRONG_BUY";
else if (coin.priceChange24h > 20) buyAdvice = "BUY";
else if (coin.priceChange24h < -30) buyAdvice = "SELL";
// ...plus volume, cap, holders, social, risk
```

### **Autonomous Features**
- Runs on a schedule or on-demand (via Telegram commands or triggers).
- Sends proactive alerts to users when:
  - A coin starts trending
  - A buy/sell threshold is crossed
  - Market anomalies are detected
- Can operate fully autonomously or in response to user queries.
- Designed for extensibility: add new data sources, signals, or alert types easily.

---

## Agent Flow Structure
- **Startup:** On bot start, agent scans trending coins and sends analysis.
- **Manual Trigger:** Users can run `/trending` or `/quicktrending` for instant analysis.
- **Analysis:** Each coin is scored for price change, volume, market cap, holders, and social presence.
- **Buy Advice:** Generates STRONG_BUY, BUY, HOLD, SELL, or STRONG_SELL with confidence and risk level.
- **Alerts:** Sends top recommendations and summary to users.

---

## Codebase Architecture

### High-Level Structure
```
trenzora/
  ├── src/
  │   ├── app/                # Next.js frontend (UI, pages, components)
  │   └── components/
  │   └── utils/
  ├── telegram-trading-bot/   # Telegram bot backend
  │   ├── agent/              # Agent for trending/alerts/analysis
  │   ├── src/
  │   │   ├── commands/       # Telegram bot commands (buy, sell, balance, etc.)
  │   │   ├── lib/            # Core logic (swap, database, history, etc.)
  │   │   ├── types/          # TypeScript types
  │   │   └── utils/          # Helpers, constants, formatters
  │   ├── index.ts            # Bot entry point
  │   └── README.md
  └── README.md
```

### Key Files
- `agent/index.ts`: Main agent logic (scanning, analysis, recommendations).
- `src/commands/`: Telegram bot commands (buy, sell, trending, etc.).
- `src/lib/`: Core logic for swaps, database, history, encryption.
- `src/app/`: Next.js frontend (UI, features, support, trending, etc.).

---

## Agent Code Decision Flow (Simplified)
```mermaid
flowchart TD
    Start([Start/Trigger])
    Scan[Scan Trending Coins (Zora API)]
    Analyze[Analyze Each Coin]
    Score[Score: Price, Volume, Cap, Holders, Social]
    Advice[Generate Buy/Sell Advice]
    Alert[Send Analysis/Alert to User]
    End([End])

    Start --> Scan --> Analyze --> Score --> Advice --> Alert --> End
```

---

## Summary Table

| Feature                | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| DexScreener( Zora Coins Integration ) | Real-time trending coin data, price, volume, holders, social, analysis      |
| Telegram Trading Bot   | Wallet, buy/sell, MEV protection, history, settings, all in Telegram        |
| Alerts Agent           | Auto/manual trending scans, buy/sell advice, instant notifications          |
| Codebase Architecture  | Modular: Next.js frontend, Telegram bot backend, agent, commands, libraries |

---

## 🚀 Getting Started

Follow these steps to set up and run Trenzora locally:

```bash
# 1. Clone the repository
 git clone https://github.com/MakindeAhmed2110/trenzora.git
 cd trenzora

# 2. Install dependencies
 npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your API keys and settings

# 4. Start the Next.js web app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Running the Telegram Trading Bot

```bash
# In a new terminal, from the project root:
cd telegram-trading-bot
npm install # if not already done
npm run start
```

---

## 🛠️ Environment Configuration

### Main Trenzora App (.env)
```env
# Zora API Key (public for frontend usage)
NEXT_PUBLIC_ZORA_API_KEY=

# Privy Auth App ID (for authentication)
NEXT_PUBLIC_PRIVY_APP_ID=
```

### Telegram Trading Bot (.env)
```env
# Telegram Bot Token
TELEGRAM_BOT_TOKEN=

# Zora API Key (for agent/analysis)
ZORA_API_KEY=

# QuickNode RPC URL (Base Mainnet)
QUICKNODE_RPC=

# Wallet Encryption Key (for secure storage)
WALLET_ENCRYPTION_KEY=

# SQLite Database Path (optional, default: ./database.sqlite)
DB_PATH=
```

> Edit these files with your actual API keys and secrets before running the app or bot.

---

## 📈 Performance

- Near-instant trade execution via Telegram bot and optimized backend
- Automated risk management and proactive alerts for trending coins
- Lower slippage and MEV protection compared to standard AMM swaps
- Real-time analytics and decision engine for fast, data-driven trading

---

## 🛣 Roadmap

### Phase 1: Core Platform (Current)
- [x] Dexscreener integration for Zora coins
- [x] Telegram trading bot with MEV protection
- [x] Automated alerts and intelligence agent
- [x] Secure wallet management
- [ ] Enhanced UI dashboard

### Phase 2: Advanced Features (Q3 2024)
- [ ] Multi-chain and multi-DEX support
- [ ] Advanced analytics and custom alerts
- [ ] Social sentiment and news integration
- [ ] Portfolio tracking and optimization

## 👥 Target Users

1. **Active Crypto Traders**
   - Real-time trend discovery and instant execution
   - Telegram-based trading for speed and convenience
   - Lower slippage and MEV protection

2. **Zora Ecosystem Enthusiasts**
   - Early access to trending Zora coins
   - Automated alerts and buy/sell recommendations
   - Secure, mobile-first trading experience

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">Built with ❤️ for Zora Coinathon 2024</p>
