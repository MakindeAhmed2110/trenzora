# Trenzora Architecture Documentation

## Overview
Trenzora is a modular platform for discovering, analyzing, and trading trending Zora coins on Base. It consists of a modern Next.js frontend, a TypeScript-based Telegram trading bot backend, and an autonomous agent for market intelligence and alerts. The architecture is designed for extensibility, security, and real-time performance.

---

## 1. High-Level System Diagram

```plaintext
┌──────────────────────────────┐
│        User Devices         │
│ (Web, Mobile, Telegram)     │
└─────────────┬────────────────┘
              │
              ▼
┌──────────────────────────────┐
│        Next.js Frontend      │
│  - Trending Coins UI         │
│  - Analytics & Features      │
│  - Trade Links (to Bot)      │
└─────────────┬────────────────┘
              │
              ▼
┌──────────────────────────────┐
│   Telegram Trading Bot (TS)  │
│  - Wallet Management         │
│  - Buy/Sell/History/Alerts   │
│  - Agent/AI Engine           │
└─────────────┬────────────────┘
              │
              ▼
┌──────────────────────────────┐
│   Data Providers/APIs        │
│  - Zora API                  │
│  - OpenOcean, Sentio, etc.   │
└──────────────────────────────┘
```

---

## 2. Frontend (Next.js)
- **Location:** `src/app/`, `src/components/`, `src/utils/`
- **Purpose:** Provides a sleek, responsive UI for discovering and analyzing trending Zora coins.
- **Key Features:**
  - Real-time trending coins dashboard
  - Coin detail pages (price, market cap, holders, social, etc.)
  - Features section, support, and onboarding
  - Trade button linking to Telegram bot
  - Copy-to-clipboard, explorer links, and animations
- **Data Flow:**
  - Fetches trending coin data from Zora API (via `@zoralabs/coins-sdk`)
  - Displays analytics and links to trading bot

---

## 3. Backend: Telegram Trading Bot
- **Location:** `telegram-trading-bot/`
- **Purpose:** Enables secure, instant trading of Zora tokens directly from Telegram.
- **Key Features:**
  - Wallet creation/import/export (encrypted)
  - Buy/sell tokens with MEV protection
  - Balance, history, deposit, withdraw
  - Customizable slippage/gas settings
  - Alerts and trending coin notifications
- **Core Structure:**
  - `index.ts`: Bot entry point, command registration
  - `src/commands/`: Command handlers (buy, sell, trending, etc.)
  - `src/lib/`: Swap logic, database, encryption, history
  - `src/types/`: TypeScript types for safety
  - `src/utils/`: Helpers, formatters, validation
- **Data Flow:**
  - Receives user commands via Telegram
  - Interacts with Zora API, OpenOcean, Sentio for data and execution
  - Stores user data securely (SQLite, encrypted keys)

---

## 4. Agent & AI Engine
- **Location:** `telegram-trading-bot/agent/`
- **Purpose:** Scans for trending coins, analyzes market data, and generates actionable alerts and recommendations.
- **Key Features:**
  - Multi-factor scoring (price, volume, cap, holders, social, risk)
  - Generates buy/sell/hold advice with confidence and risk level
  - Sends proactive alerts to users
  - Can run autonomously or on-demand
- **Decision Flow:**
```plaintext
┌──────────────┐
│  Trigger     │
└─────┬────────┘
      ▼
┌──────────────┐
│ Scan Coins   │
└─────┬────────┘
      ▼
┌──────────────┐
│ Analyze      │
└─────┬────────┘
      ▼
┌──────────────┐
│ Score/Advice │
└─────┬────────┘
      ▼
┌──────────────┐
│ Alert User   │
└──────────────┘
```
- **Extensibility:**
  - Add new data sources, scoring factors, or alert types easily
  - Modular design for future AI/ML integration

---

## 5. Data Flow & Integration
- **Frontend:**
  - Fetches and displays trending coin data from Zora API
  - Sends users to Telegram bot for trading
- **Bot:**
  - Handles all trading, wallet, and alert logic
  - Communicates with APIs for real-time data and execution
- **Agent:**
  - Continuously or on-demand scans, analyzes, and alerts
- **Security:**
  - Private keys encrypted at rest
  - API keys stored in environment variables

---

## 6. Extensibility & Best Practices
- **Modular Codebase:**
  - Clear separation between frontend, bot, agent, and libraries
- **Type Safety:**
  - TypeScript used throughout for reliability
- **API-Driven:**
  - Easy to swap or add new data providers
- **Open Source:**
  - MIT License, well-documented for contributors

---

## 7. Component Interaction Summary

```plaintext
[User] ⇄ [Frontend (Next.js)] ⇄ [Telegram Bot] ⇄ [Agent/AI] ⇄ [APIs/Data]
```
- Users discover coins on the web, trade via Telegram, and receive alerts from the agent.
- All components communicate via APIs and secure messaging.

---

## 8. Onboarding for Developers
- **Start with the README for setup instructions.**
- **Frontend:**
  - Explore `src/app/` and `src/components/` for UI logic
- **Bot:**
  - See `telegram-trading-bot/` for backend logic and commands
- **Agent:**
  - Review `agent/` for market intelligence and alert logic
- **Environment:**
  - Configure `.env` files as described in the main README
- **Contribute:**
  - Follow modular patterns, add tests, and document your code

---

For questions or contributions, see the main README or contact the maintainers (https://t.me/thatweb3gee)
