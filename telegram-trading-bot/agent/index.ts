import { setApiKey, getCoinsTopGainers } from "@zoralabs/coins-sdk";
import axios from "axios";
import dotenv from "dotenv";
import { formatEther, formatUnits } from "viem";

// Load environment variables
dotenv.config();

// Types for trending coin data
export interface TrendingCoin {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  holders: number;
  description?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
}

export interface CoinAnalysis {
  coin: TrendingCoin;
  buyAdvice: "STRONG_BUY" | "BUY" | "HOLD" | "SELL" | "STRONG_SELL";
  confidence: number;
  reasoning: string[];
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  potentialReturn: number;
}

export class TrenzoraAgent {
  private zoraApiKey: string;

  constructor() {
    this.zoraApiKey = process.env.ZORA_API_KEY || "";

    if (!this.zoraApiKey) {
      throw new Error("ZORA_API_KEY is required in .env file");
    }

    // Set up Zora API key
    setApiKey(this.zoraApiKey);
  }

  /**
   * Scan trending coins and return analysis
   */
  async scanTrendingCoins(): Promise<{
    allAnalyses: CoinAnalysis[];
    buyRecommendations: CoinAnalysis[];
    summary: string;
  }> {
    try {
      console.log("📊 Scanning trending coins...");
      
      // Get trending coins from Zora
      const trendingCoins = await this.getTrendingCoins();
      
      if (trendingCoins.length === 0) {
        console.log("No trending coins found");
        return {
          allAnalyses: [],
          buyRecommendations: [],
          summary: "No trending coins found at the moment."
        };
      }

      // Analyze each coin
      const analyses = await Promise.all(
        trendingCoins.map(coin => this.analyzeCoin(coin))
      );

      // Filter for coins with buy recommendations
      const buyRecommendations = analyses.filter(
        analysis => analysis.buyAdvice === "STRONG_BUY" || analysis.buyAdvice === "BUY"
      );

      // Generate summary
      const summary = this.generateSummary(analyses, buyRecommendations);

      return {
        allAnalyses: analyses,
        buyRecommendations,
        summary
      };

    } catch (error) {
      console.error("Error scanning trending coins:", error);
      throw error;
    }
  }

  /**
   * Get trending coins from Zora API
   */
  private async getTrendingCoins(): Promise<TrendingCoin[]> {
    try {
      // Get trending coins from Zora SDK
      const response = await getCoinsTopGainers({ count: 20 });

      const coins: TrendingCoin[] = [];

      if (response.data?.exploreList?.edges) {
        for (const edge of response.data.exploreList.edges) {
          const coin = edge.node;
          try {
            // Get additional details for each coin
            const details = await this.getCoinDetails(coin.address);
            
            coins.push({
              address: coin.address,
              name: coin.name || "Unknown",
              symbol: coin.symbol || "UNKNOWN",
              decimals: 18, // Default to 18 decimals
              totalSupply: coin.totalSupply || "0",
              price: details.price || 0,
              priceChange24h: details.priceChange24h || 0,
              volume24h: details.volume24h || 0,
              marketCap: details.marketCap || 0,
              holders: details.holders || 0,
              description: details.description,
              website: details.website,
              twitter: details.twitter,
              telegram: details.telegram
            });
          } catch (error) {
            console.error(`Error getting details for coin ${coin.address}:`, error);
          }
        }
      }

      return coins;
    } catch (error) {
      console.error("Error fetching trending coins:", error);
      return [];
    }
  }

  /**
   * Get detailed information for a specific coin
   */
  private async getCoinDetails(address: string): Promise<any> {
    try {
      // You can extend this with additional API calls to get more detailed information
      // For now, we'll return basic structure
      return {
        price: Math.random() * 0.01, // Mock price
        priceChange24h: (Math.random() - 0.5) * 100, // Mock 24h change
        volume24h: Math.random() * 1000000, // Mock volume
        marketCap: Math.random() * 10000000, // Mock market cap
        holders: Math.floor(Math.random() * 10000), // Mock holders
        description: "Sample description",
        website: "https://example.com",
        twitter: "https://twitter.com/example",
        telegram: "https://t.me/example"
      };
    } catch (error) {
      console.error(`Error getting coin details for ${address}:`, error);
      return {};
    }
  }

  /**
   * Analyze a coin and provide buy advice
   */
  private async analyzeCoin(coin: TrendingCoin): Promise<CoinAnalysis> {
    const reasoning: string[] = [];
    let buyAdvice: "STRONG_BUY" | "BUY" | "HOLD" | "SELL" | "STRONG_SELL" = "HOLD";
    let confidence = 50;
    let riskLevel: "LOW" | "MEDIUM" | "HIGH" = "MEDIUM";
    let potentialReturn = 0;

    // Analyze price change
    if (coin.priceChange24h > 50) {
      reasoning.push("🚀 Strong 24h price increase");
      buyAdvice = "STRONG_BUY";
      confidence += 20;
      potentialReturn = 100;
    } else if (coin.priceChange24h > 20) {
      reasoning.push("📈 Good 24h price increase");
      buyAdvice = "BUY";
      confidence += 15;
      potentialReturn = 50;
    } else if (coin.priceChange24h < -30) {
      reasoning.push("📉 Significant price decline");
      buyAdvice = "SELL";
      confidence += 10;
    }

    // Analyze volume
    if (coin.volume24h > 500000) {
      reasoning.push("💪 High trading volume");
      confidence += 10;
    } else if (coin.volume24h < 10000) {
      reasoning.push("⚠️ Low trading volume");
      confidence -= 10;
      riskLevel = "HIGH";
    }

    // Analyze market cap
    if (coin.marketCap < 1000000) {
      reasoning.push("💰 Low market cap - high potential");
      confidence += 15;
      potentialReturn += 200;
    } else if (coin.marketCap > 10000000) {
      reasoning.push("🏢 High market cap - lower potential");
      confidence -= 10;
    }

    // Analyze holders
    if (coin.holders > 1000) {
      reasoning.push("👥 Good holder distribution");
      confidence += 5;
    } else if (coin.holders < 100) {
      reasoning.push("⚠️ Low holder count - risky");
      confidence -= 15;
      riskLevel = "HIGH";
    }

    // Social presence analysis
    if (coin.twitter || coin.telegram) {
      reasoning.push("📱 Active social presence");
      confidence += 5;
    }

    // Normalize confidence to 0-100 range
    confidence = Math.max(0, Math.min(100, confidence));

    return {
      coin,
      buyAdvice,
      confidence,
      reasoning,
      riskLevel,
      potentialReturn
    };
  }

  /**
   * Generate summary text
   */
  private generateSummary(
    allAnalyses: CoinAnalysis[],
    buyRecommendations: CoinAnalysis[]
  ): string {
    const timestamp = new Date().toLocaleString();
    
    let summary = `📊 *Zora Trending Coins Report*\n`;
    summary += `🕐 *${timestamp}*\n\n`;
    
    summary += `📈 *Summary*\n`;
    summary += `• Total coins analyzed: ${allAnalyses.length}\n`;
    summary += `• Buy recommendations: ${buyRecommendations.length}\n`;
    summary += `• Average confidence: ${Math.round(allAnalyses.reduce((sum, a) => sum + a.confidence, 0) / allAnalyses.length)}%\n\n`;

    if (buyRecommendations.length > 0) {
      summary += `🔥 *TOP BUY RECOMMENDATIONS*\n\n`;
      
      // Sort by confidence and potential return
      const sortedRecommendations = buyRecommendations.sort((a, b) => 
        (b.confidence + b.potentialReturn) - (a.confidence + a.potentialReturn)
      );

      for (let i = 0; i < Math.min(3, sortedRecommendations.length); i++) {
        const analysis = sortedRecommendations[i];
        const coin = analysis.coin;
        
        summary += `*${i + 1}. ${coin.name} (${coin.symbol})*\n`;
        summary += `💰 Price: $${coin.price.toFixed(6)}\n`;
        summary += `📈 24h Change: ${coin.priceChange24h > 0 ? '+' : ''}${coin.priceChange24h.toFixed(2)}%\n`;
        summary += `💎 Market Cap: $${(coin.marketCap / 1000000).toFixed(2)}M\n`;
        summary += `🎯 Advice: ${this.getAdviceEmoji(analysis.buyAdvice)} ${analysis.buyAdvice}\n`;
        summary += `📊 Confidence: ${analysis.confidence}%\n`;
        summary += `📍 Address: \`${coin.address}\`\n\n`;
      }
    }

    return summary;
  }

  /**
   * Generate detailed report for Telegram
   */
  generateDetailedReport(
    allAnalyses: CoinAnalysis[],
    buyRecommendations: CoinAnalysis[]
  ): string {
    const timestamp = new Date().toLocaleString();
    
    let message = `📊 *Zora Trending Coins Report*\n`;
    message += `🕐 *${timestamp}*\n\n`;
    
    message += `📈 *Summary*\n`;
    message += `• Total coins analyzed: ${allAnalyses.length}\n`;
    message += `• Buy recommendations: ${buyRecommendations.length}\n`;
    message += `• Average confidence: ${Math.round(allAnalyses.reduce((sum, a) => sum + a.confidence, 0) / allAnalyses.length)}%\n\n`;

    if (buyRecommendations.length > 0) {
      message += `🔥 *TOP BUY RECOMMENDATIONS*\n\n`;
      
      // Sort by confidence and potential return
      const sortedRecommendations = buyRecommendations.sort((a, b) => 
        (b.confidence + b.potentialReturn) - (a.confidence + a.potentialReturn)
      );

      for (let i = 0; i < Math.min(5, sortedRecommendations.length); i++) {
        const analysis = sortedRecommendations[i];
        const coin = analysis.coin;
        
        message += `*${i + 1}. ${coin.name} (${coin.symbol})*\n`;
        message += `💰 Price: $${coin.price.toFixed(6)}\n`;
        message += `📈 24h Change: ${coin.priceChange24h > 0 ? '+' : ''}${coin.priceChange24h.toFixed(2)}%\n`;
        message += `💎 Market Cap: $${(coin.marketCap / 1000000).toFixed(2)}M\n`;
        message += `👥 Holders: ${coin.holders.toLocaleString()}\n`;
        message += `🎯 Advice: ${this.getAdviceEmoji(analysis.buyAdvice)} ${analysis.buyAdvice}\n`;
        message += `📊 Confidence: ${analysis.confidence}%\n`;
        message += `⚠️ Risk: ${analysis.riskLevel}\n`;
        message += `🚀 Potential Return: ${analysis.potentialReturn}%\n`;
        message += `📍 Address: \`${coin.address}\`\n`;
        
        if (analysis.reasoning.length > 0) {
          message += `💡 Key Points:\n`;
          analysis.reasoning.slice(0, 3).forEach(reason => {
            message += `  • ${reason}\n`;
          });
        }
        
        message += `\n`;
      }
    }

    message += `📋 *All Analyzed Coins*\n`;
    message += `(Sorted by recommendation strength)\n\n`;

    const sortedAllAnalyses = allAnalyses.sort((a, b) => {
      const aScore = this.getAdviceScore(a.buyAdvice) * a.confidence;
      const bScore = this.getAdviceScore(b.buyAdvice) * b.confidence;
      return bScore - aScore;
    });

    for (const analysis of sortedAllAnalyses.slice(0, 10)) {
      const coin = analysis.coin;
      message += `${this.getAdviceEmoji(analysis.buyAdvice)} *${coin.symbol}* - ${analysis.buyAdvice} (${analysis.confidence}%)\n`;
      message += `   💰 $${coin.price.toFixed(6)} | 📈 ${coin.priceChange24h > 0 ? '+' : ''}${coin.priceChange24h.toFixed(1)}%\n\n`;
    }

    message += `\n🔗 *Quick Actions*\n`;
    message += `• Use /buy to purchase recommended tokens\n`;
    message += `• Check /balance for your current holdings\n`;
    message += `• View /history for past transactions\n`;

    return message;
  }

  /**
   * Get emoji for buy advice
   */
  private getAdviceEmoji(advice: string): string {
    switch (advice) {
      case "STRONG_BUY": return "🚀";
      case "BUY": return "📈";
      case "HOLD": return "⏸️";
      case "SELL": return "📉";
      case "STRONG_SELL": return "💥";
      default: return "❓";
    }
  }

  /**
   * Get numerical score for advice ranking
   */
  private getAdviceScore(advice: string): number {
    switch (advice) {
      case "STRONG_BUY": return 5;
      case "BUY": return 4;
      case "HOLD": return 3;
      case "SELL": return 2;
      case "STRONG_SELL": return 1;
      default: return 0;
    }
  }

  /**
   * Split long message into parts
   */
  splitMessage(message: string): string[] {
    const maxLength = 4000;
    const parts: string[] = [];
    let currentPart = "";

    const lines = message.split('\n');
    
    for (const line of lines) {
      if ((currentPart + line + '\n').length > maxLength) {
        if (currentPart) {
          parts.push(currentPart.trim());
          currentPart = "";
        }
      }
      currentPart += line + '\n';
    }

    if (currentPart.trim()) {
      parts.push(currentPart.trim());
    }

    return parts;
  }
}

// Export the agent class
export default TrenzoraAgent;