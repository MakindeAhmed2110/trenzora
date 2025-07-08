# Dexscreener Trending Showcase Documentation

## Table of Contents
1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Data Sources](#data-sources)
4. [User Interface & Experience](#user-interface--experience)
5. [Analytics & Insights](#analytics--insights)
6. [Integration with Trading](#integration-with-trading)
7. [Technical Implementation](#technical-implementation)
8. [Extensibility](#extensibility)
9. [Troubleshooting](#troubleshooting)

---

## 1. Overview
The Dexscreener trending showcase is a core feature of Trenzora, providing real-time discovery and analysis of trending Zora coins on Base. It empowers users to spot opportunities, analyze key metrics, and seamlessly transition to trading.

---

## 2. Key Features
- **Live Trending Coins:** Real-time list of the hottest Zora coins on Base.
- **Comprehensive Analytics:** Price, market cap, volume, holders, age, and social links.
- **Visuals:** Coin logos, tickers, and branding for quick recognition.
- **Copy & Explorer Links:** Copy contract addresses and view on BaseScan.
- **Trade Integration:** Direct trade button linking to the Telegram bot.
- **Responsive UI:** Optimized for desktop and mobile.
- **Animated & Modern Design:** Smooth transitions, hover effects, and blur backgrounds.

---

## 3. Data Sources
- **@zoralabs/coins-sdk:**
  - Fetches trending coins, price, volume, holders, and social data from Zora’s APIs.
- **BaseScan:**
  - Used for contract explorer links.
- **Coin Images:**
  - Pulled from Zora or fallback to default images in `/public`.

---

## 4. User Interface & Experience
- **Trending List:**
  - Displays top trending coins with key stats at a glance.
- **Coin Detail Card:**
  - Shows logo, name, ticker, price, market cap, volume, holders, age, and social links.
  - Includes copy-to-clipboard for contract address and a "View on Explorer" button.
- **Trade Button:**
  - Prominently displayed, links users to the Telegram bot for instant trading.
- **Animations:**
  - Fade-ins, hover effects, and blur backgrounds for a modern look.
- **Responsiveness:**
  - Layout adapts to all screen sizes for optimal usability.

---

## 5. Analytics & Insights
- **Price & Volume:**
  - Real-time updates for price and 24h volume.
- **Market Cap:**
  - Calculated and displayed for each coin.
- **Holders & Age:**
  - Shows community growth and project maturity.
- **Social Presence:**
  - Links to Twitter, Telegram, and project websites.
- **Buy/Sell Signals:**
  - Visual cues or badges for coins with strong momentum (optional, based on agent analysis).

---

## 6. Integration with Trading
- **Trade Button:**
  - Each coin card includes a button that opens the Trenzora Telegram bot with the selected coin pre-filled for trading.
- **Seamless Flow:**
  - Users can go from discovery to execution in one click.
- **Security:**
  - Trading is handled by the Telegram bot, ensuring private key safety and MEV protection.

---

## 7. Technical Implementation
- **Frontend:**
  - Built with Next.js and React.
  - Components in `src/app/trending/` and `src/components/`.
  - Styles use Tailwind CSS and custom animations.
- **Data Fetching:**
  - Uses `@zoralabs/coins-sdk` for API calls.
  - Handles loading, error, and empty states gracefully.
- **Copy/Explorer:**
  - Utilizes browser clipboard API and dynamic BaseScan links.
- **Trade Integration:**
  - Trade button uses a Telegram deep link (e.g., `https://t.me/trenzora_bot?start=trade_<contract>`).
- **Accessibility:**
  - ARIA labels and keyboard navigation supported.

---

## 8. Extensibility
- **Add New Metrics:**
  - Extend the coin card to show additional analytics (e.g., liquidity, recent trades).
- **Custom Sorting/Filtering:**
  - Allow users to sort by price, volume, or add filters for new coins, high volume, etc.
- **Alert Integration:**
  - Add inline alert setup for specific coins.
- **Multi-Chain Support:**
  - Adapt data fetching to support other chains or DEXs.

---

## 9. Troubleshooting
- **No Coins Displayed:**
  - Check Zora API key and network connectivity.
- **Stale Data:**
  - Ensure API polling interval is set appropriately.
- **Broken Images:**
  - Fallback to default image in `/public` if coin logo is missing.
- **Trade Button Not Working:**
  - Verify Telegram bot username and deep link format.
- **Explorer Links Broken:**
  - Check contract address and BaseScan URL formatting.

---

For more details, see the main README or contact the maintainers (https://t.me/thatweb3gee).
