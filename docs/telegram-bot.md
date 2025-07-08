# Trenzora Telegram Trading Bot Documentation

## Table of Contents
1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Architecture](#architecture)
4. [Setup & Installation](#setup--installation)
5. [Environment Variables](#environment-variables)
6. [Command List](#command-list)
7. [Trading Flow](#trading-flow)
8. [Security](#security)
9. [Troubleshooting](#troubleshooting)
10. [Extensibility](#extensibility)

---

## 1. Overview
The Trenzora Telegram Trading Bot enables users to discover, analyze, and trade trending Zora coins on Base directly from Telegram. It is designed for speed, security, and ease of use, making DeFi trading accessible from any device.

---

## 2. Key Features
- **Wallet Management:** Create, import, export, and encrypt wallets directly in Telegram.
- **Buy/Sell Tokens:** Instantly trade Zora tokens with MEV protection and live price quotes.
- **Balance & History:** View ETH and token balances, transaction history, and trade logs.
- **Trending Coins:** Discover trending Zora coins with analytics and direct trade options.
- **Alerts & Agent:** Receive automated alerts and buy/sell recommendations from the agent.
- **Custom Settings:** Adjust slippage, gas, and other trading parameters.
- **Security:** Private keys are encrypted; all sensitive actions require confirmation.

---

## 3. Architecture

```plaintext
┌──────────────┐      ┌────────────────────┐      ┌────────────────────┐
│ Telegram API │ <──> │ Trading Bot (TS)   │ <──> │ Data Providers     │
│ (User Input) │      │ - Commands         │      │ - Zora API         │
└──────────────┘      │ - Wallets/Trading  │      │ - OpenOcean/Sentio │
                     │ - Agent/Alerts     │      └────────────────────┘
                     └────────────────────┘
```
- **Entry Point:** `telegram-trading-bot/index.ts`
- **Commands:** `src/commands/` (buy, sell, trending, balance, etc.)
- **Core Logic:** `src/lib/` (swap, database, encryption, history)
- **Agent:** `agent/` (market intelligence, scoring, alerts)
- **Types & Utils:** `src/types/`, `src/utils/`

---

## 4. Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- Telegram account
- API keys (see below)

### Installation
```bash
# From the project root
$ cd telegram-trading-bot
$ npm install
```

### Running the Bot
```bash
$ npm run start
```
The bot will connect to Telegram and listen for commands.

---

## 5. Environment Variables
Create a `.env` file in `telegram-trading-bot/` with the following:
```
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
ZORA_API_KEY=your_zora_api_key
QUICKNODE_RPC=your_quicknode_rpc_url
WALLET_ENCRYPTION_KEY=your_encryption_key
DB_PATH=./database.sqlite
```
- **TELEGRAM_BOT_TOKEN:** Get from @BotFather on Telegram.
- **ZORA_API_KEY:** For fetching trending coins and analytics.
- **QUICKNODE_RPC:** Base Mainnet RPC endpoint (QuickNode recommended).
- **WALLET_ENCRYPTION_KEY:** Used to encrypt user private keys.
- **DB_PATH:** Path to the SQLite database (default: `./database.sqlite`).

---

## 6. Command List

| Command         | Description                                      |
|----------------|--------------------------------------------------|
| /start          | Start the bot and get help info                  |
| /help           | Show help and command list                       |
| /wallet         | Create, import, export, or view your wallet      |
| /balance        | Show ETH and token balances                      |
| /buy            | Buy a Zora token (guided flow)                   |
| /sell           | Sell a Zora token (guided flow)                  |
| /deposit        | Get your wallet address for deposits             |
| /withdraw       | Withdraw ETH to another address                  |
| /trending       | List trending Zora coins with analytics          |
| /history        | Show your trade and transaction history          |
| /settings       | Adjust slippage, gas, and other preferences      |
| /alerts         | Manage price/trend alerts                        |
| /import         | Import a wallet using a private key              |
| /export         | Export your wallet's private key (encrypted)     |

---

## 7. Trading Flow

1. **Wallet Setup:**
   - Use `/wallet` to create or import a wallet. Private keys are encrypted and stored securely.
2. **Discover Coins:**
   - Use `/trending` to see trending Zora coins with analytics (price, volume, holders, etc.).
3. **Buy/Sell:**
   - Use `/buy` or `/sell` and follow the guided prompts (select token, amount, confirm).
   - The bot fetches live price quotes and gas estimates, then asks for confirmation.
   - On confirmation, the bot signs and sends the transaction with MEV protection.
4. **Feedback:**
   - The bot provides transaction status, hash, and error messages if any.
5. **History & Alerts:**
   - Use `/history` to view past trades. Set up alerts with `/alerts`.

---

## 8. Security
- **Private Key Encryption:** All user private keys are encrypted using `WALLET_ENCRYPTION_KEY` before storage.
- **Confirmation Prompts:** All sensitive actions (trades, withdrawals, exports) require explicit user confirmation.
- **API Keys:** Never commit real API keys or secrets to the repository.
- **Database:** User data is stored in a local SQLite database (can be migrated to cloud DB for production).

---

## 9. Troubleshooting
- **Bot Not Responding:**
  - Check that `TELEGRAM_BOT_TOKEN` is correct and the bot is started with @BotFather.
  - Ensure the bot is not blocked or restricted in your chat.
- **API Errors:**
  - Verify all API keys and endpoints are correct and active.
  - Check for network issues or rate limits.
- **Transaction Failures:**
  - Ensure sufficient ETH for gas and token purchases.
  - Check contract addresses and slippage settings.
- **Database Issues:**
  - Ensure `DB_PATH` is writable and not corrupted.

---

## 10. Extensibility
- **Add New Commands:** Create a new file in `src/commands/` and register it in `index.ts`.
- **Integrate New Data Providers:** Add logic in `src/lib/` and update agent scoring as needed.
- **Enhance Agent/AI:** Modify or extend logic in `agent/` for new signals, alerts, or strategies.
- **UI/UX Improvements:** Use Telegram's inline keyboards and rich formatting for better user experience.

---

For more details, see the main README or contact the maintainers (https://t.me/thatweb3gee).
