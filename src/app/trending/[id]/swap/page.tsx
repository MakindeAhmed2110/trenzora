'use client';
import { useParams } from 'next/navigation';
import Navbar from '@/components/navbar';


import { useEffect, useState } from 'react';
import { getCoinsTopGainers } from '@zoralabs/coins-sdk';
import Image from 'next/image';
import { ArrowUpIcon, ArrowDownIcon, ChartBarIcon, UsersIcon, ClockIcon, CurrencyDollarIcon, GlobeAltIcon, ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';

// Base ETH address (native token)
const BASE_ETH = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'; // Native ETH on Base
const BASE_CHAIN_ID = 8453;

interface CoinData {
  address: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
  holders: number;
  age: string;
  description?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
}

const jsonRpcUrlMap = {
  1: ['https://site1.moralis-nodes.com/base/']
}

function formatNumber(num: number | string) {
  if (!num) return "-";
  num = typeof num === "string" ? parseFloat(num) : num;
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toString();
}

function formatPrice(price: number) {
  if (price < 0.000001) return price.toExponential(4);
  if (price < 0.01) return price.toFixed(8);
  if (price < 1) return price.toFixed(6);
  if (price < 100) return price.toFixed(4);
  return price.toFixed(2);
}

export default function SwapPage() {
  const params = useParams();
  const coinId = params?.id as string | undefined;
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchCoinData() {
      if (!coinId) return;
      
      setLoading(true);
      setError("");
      
      try {
        // Fetch trending coins to find the specific coin
        const response = await getCoinsTopGainers({ count: 50 });
        const coins = response.data?.exploreList?.edges?.map((edge: any) => edge.node) || [];
        
        // Find the specific coin by address
        const coin = coins.find((c: any) => c.address === coinId);
        
        if (coin) {
          // Mock additional data for demonstration
          const mockData: CoinData = {
            address: coin.address,
            name: coin.name || "Unknown Token",
            symbol: coin.symbol || "UNKNOWN",
            price: Math.random() * 0.01, // Mock price
            priceChange24h: (Math.random() - 0.5) * 100, // Mock 24h change
            marketCap: parseFloat(coin.marketCap) || Math.random() * 10000000,
            volume24h: parseFloat(coin.volume24h) || Math.random() * 1000000,
            holders: coin.uniqueHolders || Math.floor(Math.random() * 10000),
            age: `${Math.floor(Math.random() * 30) + 1} days`,
            description: "A revolutionary token on the Zora platform with innovative features and strong community backing.",
            website: "https://example.com",
            twitter: "https://twitter.com/example",
            telegram: "https://t.me/example"
          };
          
          setCoinData(mockData);
        } else {
          setError("Coin not found");
        }
      } catch (err) {
        setError("Failed to fetch coin data");
      } finally {
        setLoading(false);
      }
    }

    fetchCoinData();
  }, [coinId]);

  const handleTradeClick = () => {
    window.open('https://t.me/trenzora_bot', '_blank');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="bg-[#181A20] min-h-screen w-full pb-16">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-1/3 mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-[#23242a] rounded-2xl p-8 h-96"></div>
                </div>
                <div className="bg-[#23242a] rounded-2xl p-8 h-96"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !coinData) {
    return (
      <>
        <Navbar />
        <div className="bg-[#181A20] min-h-screen w-full pb-16">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center text-red-400">
              <h1 className="text-2xl font-bold mb-4">Error</h1>
              <p>{error || "Coin not found"}</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-[#181A20] min-h-screen w-full pb-16">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{coinData.symbol.charAt(0)}</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{coinData.name}</h1>
                <p className="text-gray-400 text-lg">{coinData.symbol}</p>
              </div>
            </div>
            
            {/* Price and Change */}
            <div className="flex items-center gap-6 mb-6">
              <div className="text-3xl font-bold text-white">
                ${formatPrice(coinData.price)}
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                coinData.priceChange24h >= 0 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {coinData.priceChange24h >= 0 ? (
                  <ArrowUpIcon className="w-5 h-5" />
                ) : (
                  <ArrowDownIcon className="w-5 h-5" />
                )}
                <span className="font-semibold">
                  {coinData.priceChange24h >= 0 ? '+' : ''}{coinData.priceChange24h.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#23242a] rounded-xl p-6 border border-gray-800">
                  <div className="flex items-center gap-3 mb-3">
                    <CurrencyDollarIcon className="w-6 h-6 text-blue-400" />
                    <span className="text-gray-400 text-sm">Market Cap</span>
                  </div>
                  <div className="text-xl font-bold text-white">${formatNumber(coinData.marketCap)}</div>
                </div>
                
                <div className="bg-[#23242a] rounded-xl p-6 border border-gray-800">
                  <div className="flex items-center gap-3 mb-3">
                    <ChartBarIcon className="w-6 h-6 text-green-400" />
                    <span className="text-gray-400 text-sm">Volume 24h</span>
                  </div>
                  <div className="text-xl font-bold text-white">${formatNumber(coinData.volume24h)}</div>
                </div>
                
                <div className="bg-[#23242a] rounded-xl p-6 border border-gray-800">
                  <div className="flex items-center gap-3 mb-3">
                    <UsersIcon className="w-6 h-6 text-purple-400" />
                    <span className="text-gray-400 text-sm">Holders</span>
                  </div>
                  <div className="text-xl font-bold text-white">{formatNumber(coinData.holders)}</div>
                </div>
                
                <div className="bg-[#23242a] rounded-xl p-6 border border-gray-800">
                  <div className="flex items-center gap-3 mb-3">
                    <ClockIcon className="w-6 h-6 text-orange-400" />
                    <span className="text-gray-400 text-sm">Age</span>
                  </div>
                  <div className="text-xl font-bold text-white">{coinData.age}</div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-[#23242a] rounded-2xl p-8 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">About {coinData.name}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {coinData.description}
                </p>
              </div>

              {/* Links */}
              <div className="bg-[#23242a] rounded-2xl p-8 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-6">Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {coinData.website && (
                    <a 
                      href={coinData.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition"
                    >
                      <GlobeAltIcon className="w-5 h-5 text-blue-400" />
                      <span className="text-white">Website</span>
                    </a>
                  )}
                  {coinData.twitter && (
                    <a 
                      href={coinData.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition"
                    >
                      <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      <span className="text-white">Twitter</span>
                    </a>
                  )}
                  {coinData.telegram && (
                    <a 
                      href={coinData.telegram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition"
                    >
                      <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                      <span className="text-white">Telegram</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trade Button */}
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 border border-purple-500/20">
                <h3 className="text-2xl font-bold text-white mb-4">Trade {coinData.symbol}</h3>
                <p className="text-purple-100 mb-6">
                  Execute trades instantly through our Telegram trading bot
                </p>
                <a
                  href="https://t.me/trenzora_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-white text-purple-600 font-bold py-4 px-6 rounded-xl text-center hover:bg-gray-100 transition duration-200 shadow-lg"
                >
                  🚀 Trade on Telegram
                </a>
                <p className="text-xs text-purple-200 mt-3 text-center">
                  Fast, secure, and reliable trading
                </p>
              </div>

              {/* Token Info */}
              <div className="bg-[#23242a] rounded-2xl p-6 border border-gray-800">
                <h3 className="text-lg font-bold text-white mb-4">Token Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Address</span>
                    <span className="flex items-center gap-2">
                      <span className="text-white text-sm font-mono">
                        {coinData.address.slice(0, 6)}...{coinData.address.slice(-4)}
                      </span>
                      <button
                        onClick={() => copyToClipboard(coinData.address)}
                        className={`p-1 rounded hover:bg-gray-700 transition ${copied ? 'bg-green-600' : 'bg-gray-800'}`}
                        title="Copy address"
                      >
                        {copied ? (
                          <CheckIcon className="w-4 h-4 text-white" />
                        ) : (
                          <ClipboardDocumentIcon className="w-4 h-4 text-white" />
                        )}
                      </button>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Symbol</span>
                    <span className="text-white">{coinData.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price</span>
                    <span className="text-white">${formatPrice(coinData.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">24h Change</span>
                    <span className={`${coinData.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {coinData.priceChange24h >= 0 ? '+' : ''}{coinData.priceChange24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-[#23242a] rounded-2xl p-6 border border-gray-800">
                <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a
                    href={`https://basescan.org/address/${coinData.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block bg-blue-600 text-white py-3 px-4 rounded-xl text-center hover:bg-blue-700 transition"
                  >
                    View on Explorer
                  </a>
                  <button className="w-full bg-gray-700 text-white py-3 px-4 rounded-xl hover:bg-gray-600 transition">
                    Add to Watchlist
                  </button>
                  <button className="w-full bg-gray-700 text-white py-3 px-4 rounded-xl hover:bg-gray-600 transition">
                    Share Token
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
            