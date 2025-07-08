import { InlineKeyboard } from "grammy";
import { BotContext } from "../context";
import { CommandHandler } from "../types/commands";
import TrenzoraAgent from "../../agent/index";

// Trending coins handler
export const trendingHandler: CommandHandler = {
  command: "trending",
  description: "Get trending coins analysis and buy recommendations",
  handler: async (ctx: BotContext) => {
    try {
      const userId = ctx.from?.id.toString();

      if (!userId) {
        await ctx.reply("❌ Unable to identify user. Please try again later.");
        return;
      }

      // Send initial message
      const message = await ctx.reply(
        "🔍 *Scanning Zora Trending Coins...*\n\n" +
        "Please wait while I analyze the latest trending coins and generate buy recommendations.",
        { parse_mode: "Markdown" }
      );

      try {
        // Create agent instance and scan trending coins
        const agent = new TrenzoraAgent();
        const result = await agent.scanTrendingCoins();

        // Generate detailed report
        const detailedReport = agent.generateDetailedReport(
          result.allAnalyses,
          result.buyRecommendations
        );

        // Split message if too long
        const messageParts = agent.splitMessage(detailedReport);

        // Send each part
        for (let i = 0; i < messageParts.length; i++) {
          if (i === 0) {
            // Update the original message with the first part
            await ctx.api.editMessageText(
              ctx.chat?.id || 0,
              message.message_id,
              messageParts[i],
              { parse_mode: "Markdown" }
            );
          } else {
            // Send additional parts as new messages
            await ctx.reply(messageParts[i], { parse_mode: "Markdown" });
          }
        }

      } catch (error) {
        console.error("Error scanning trending coins:", error);
        
        // Update the message with error
        await ctx.api.editMessageText(
          ctx.chat?.id || 0,
          message.message_id,
          "❌ *Scan Failed*\n\n" +
          "There was an error scanning trending coins. Please try again later or check the logs.",
          { parse_mode: "Markdown" }
        );
      }

    } catch (error) {
      console.error("Error in trending command:", error);
      await ctx.reply("❌ An error occurred. Please try again later.");
    }
  },
};

// Quick scan handler for faster response
export const quickTrendingHandler: CommandHandler = {
  command: "quicktrending",
  description: "Get quick trending coins overview",
  handler: async (ctx: BotContext) => {
    try {
      const userId = ctx.from?.id.toString();

      if (!userId) {
        await ctx.reply("❌ Unable to identify user. Please try again later.");
        return;
      }

      // Send initial message
      const message = await ctx.reply(
        "🔍 *Quick Scan in Progress...*\n\n" +
        "Getting the latest trending coins overview.",
        { parse_mode: "Markdown" }
      );

      try {
        // Create agent instance and scan trending coins
        const agent = new TrenzoraAgent();
        const result = await agent.scanTrendingCoins();

        // Update with the summary
        await ctx.api.editMessageText(
          ctx.chat?.id || 0,
          message.message_id,
          result.summary,
          { parse_mode: "Markdown" }
        );

      } catch (error) {
        console.error("Error in quick trending scan:", error);
        
        // Update the message with error
        await ctx.api.editMessageText(
          ctx.chat?.id || 0,
          message.message_id,
          "❌ *Quick Scan Failed*\n\n" +
          "There was an error getting trending coins. Please try again later.",
          { parse_mode: "Markdown" }
        );
      }

    } catch (error) {
      console.error("Error in quick trending command:", error);
      await ctx.reply("❌ An error occurred. Please try again later.");
    }
  },
};

// Settings handler for trending preferences
export const trendingSettingsHandler: CommandHandler = {
  command: "trendingsettings",
  description: "Configure trending coins preferences",
  handler: async (ctx: BotContext) => {
    try {
      const keyboard = new InlineKeyboard()
        .text("⏰ Scan Interval", "trending_interval")
        .text("📊 Analysis Depth", "trending_depth")
        .row()
        .text("🎯 Risk Level", "trending_risk")
        .text("📱 Notifications", "trending_notifications")
        .row()
        .text("🔙 Back", "back_to_main");

      await ctx.reply(
        "⚙️ *Trending Coins Settings*\n\n" +
        "Configure your preferences for trending coins analysis:",
        {
          parse_mode: "Markdown",
          reply_markup: keyboard,
        }
      );

    } catch (error) {
      console.error("Error in trending settings command:", error);
      await ctx.reply("❌ An error occurred. Please try again later.");
    }
  },
};

 