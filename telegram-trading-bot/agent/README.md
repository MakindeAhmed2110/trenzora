# Trenzora Agent - Integrated with Telegram Bot

This agent is now fully integrated with the Telegram trading bot and automatically sends trending coins analysis when users start the bot.

## Features

- 🔍 **Automatic Scanning**: Scans Zora trending coins when users start the bot
- 📊 **Detailed Analysis**: Provides comprehensive coin analysis with buy/sell recommendations
- 🎯 **Smart Recommendations**: Uses multiple factors to generate buy advice
- 📱 **Telegram Integration**: Sends detailed reports directly to users
- ⚡ **Real-time Updates**: Monitors price changes, volume, and market metrics
- 🛡️ **Risk Assessment**: Evaluates risk levels for each coin

## Integration

The agent is now part of the main Telegram bot and:

1. **Automatic on Start**: Sends trending coins analysis when users start the bot
2. **Manual Commands**: Users can trigger analysis with `/trending` and `/quicktrending`
3. **Button Integration**: Trending analysis accessible via inline keyboard buttons

## Environment Variables

Add these to your main `.env` file:

```env
# Zora API Configuration
ZORA_API_KEY=your_zora_api_key_here
```

## Usage

### Automatic (on bot start)
- New users: Receive trending coins analysis after welcome message
- Existing users: Receive trending coins update after welcome back message

### Manual Commands
- `/trending` - Get detailed trending coins analysis with buy recommendations
- `/quicktrending` - Get quick trending overview
- `/trendingsettings` - Configure trending preferences

### Button Access
- Click "📈 Trending" button in the main menu

## Analysis Factors

The agent analyzes coins based on:

- **Price Performance**: 24h price changes
- **Volume**: Trading volume analysis
- **Market Cap**: Size and potential
- **Holder Distribution**: Community spread
- **Social Presence**: Twitter, Telegram, website
- **Risk Assessment**: Volatility and liquidity

## Buy Advice Levels

- 🚀 **STRONG_BUY**: High confidence, strong indicators
- 📈 **BUY**: Good potential, positive indicators
- ⏸️ **HOLD**: Neutral, wait for better signals
- 📉 **SELL**: Consider selling, negative indicators
- 💥 **STRONG_SELL**: High confidence sell signal

## Files

- `index.ts` - Main agent class with scanning and analysis logic
- `trigger.ts` - Trigger script for manual scanning (legacy)
- `README.md` - This documentation

## Dependencies

The agent uses the main bot's dependencies:
- `@zoralabs/coins-sdk` - For fetching trending coins
- `axios` - For HTTP requests
- `viem` - For blockchain interactions

## Troubleshooting

1. **"ZORA_API_KEY is required"** - Add your Zora API key to the main `.env` file
2. **No coins found** - Check your Zora API key permissions and network connectivity
3. **Analysis errors** - Check the bot logs for detailed error messages

## Security

- API keys are loaded from environment variables
- No sensitive data is logged
- Error handling prevents bot crashes 