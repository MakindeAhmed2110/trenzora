import TrenzoraAgent from './index.js';

/**
 * Trigger script for manual scanning
 * Can be called from the Telegram bot or command line
 */
async function triggerScan() {
  try {
    const agent = new TrenzoraAgent();
    console.log('🔍 Triggering manual scan...');
    await agent.manualScan();
    console.log('✅ Manual scan completed');
  } catch (error) {
    console.error('❌ Error during manual scan:', error);
    process.exit(1);
  }
}

// If called directly from command line
if (process.argv.includes('--manual-scan')) {
  triggerScan();
}

// Export for use in other modules
export { triggerScan }; 