"use client";
import { setApiKey } from "@zoralabs/coins-sdk";

setApiKey(process.env.NEXT_PUBLIC_ZORA_API_KEY!); // Use NEXT_PUBLIC_ for client-side env

import { useEffect, useState } from "react";
import { getCoinsTopGainers, getCoinsMostValuable } from "@zoralabs/coins-sdk";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Link from 'next/link';

const FILTERS = [
  { label: "Last 24 hours", active: true },
  { label: "Trending", active: false },
  { label: "5M", active: false },
  { label: "1H", active: false },
  { label: "6H", active: false },
  { label: "24H", active: true },
];

const TABLE_HEADERS = [
  "#", "TOKEN", "MARKET CAP", "VOLUME", "HOLDERS", "AGE"
];

function formatNumber(num: number | string) {
  if (!num) return "-";
  num = typeof num === "string" ? parseFloat(num) : num;
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toString();
}

function formatPercent(val: string | number | undefined) {
  if (val === undefined) return "-";
  const num = typeof val === "string" ? parseFloat(val) : val;
  const sign = num > 0 ? "+" : "";
  return sign + num.toFixed(2) + "%";
}

function percentColor(val: string | number | undefined) {
  if (val === undefined) return "text-gray-400";
  const num = typeof val === "string" ? parseFloat(val) : val;
  if (num > 0) return "text-green-400";
  if (num < 0) return "text-red-400";
  return "text-gray-400";
}

function getAge(createdAt: string) {
  const now = Date.now();
  const created = new Date(createdAt).getTime();
  const diff = now - created;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

export default function TrendingPage() {
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalVolume24h, setTotalVolume24h] = useState(0);

  // Add missing state for most valuable coins
  const [valuableCoins, setValuableCoins] = useState<any[]>([]);
  const [loadingValuable, setLoadingValuable] = useState(true);
  const [errorValuable, setErrorValuable] = useState("");

  useEffect(() => {
    async function fetchTrending() {
      setLoading(true);
      setError("");
      try {
        const response = await getCoinsTopGainers({ count: 10 });
        const tokens = response.data?.exploreList?.edges?.map((edge: any) => edge.node) || [];
        setCoins(tokens);
        // Calculate total 24h volume
        const total = tokens.reduce((sum, coin) => sum + (parseFloat(coin.volume24h) || 0), 0);
        setTotalVolume24h(total);
      } catch (err) {
        setError("Failed to fetch trending coins.");
      } finally {
        setLoading(false);
      }
    }

    async function fetchMostValuable() {
      setLoadingValuable(true);
      setErrorValuable("");
      try {
        const response = await getCoinsMostValuable({ count: 10 });
        const tokens = response.data?.exploreList?.edges?.map((edge: any) => edge.node) || [];
        setValuableCoins(tokens);
      } catch (err) {
        setErrorValuable("Failed to fetch most valuable coins.");
      } finally {
        setLoadingValuable(false);
      }
    }
    fetchTrending();
    fetchMostValuable();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-[#181A20] min-h-screen w-full pb-16">
        <h1 className="text-white text-5xl py-10 px-4">Trending Coins</h1>
        <div className="sticky top-0 z-30 bg-[#181A20] border-b border-[#23242a] px-4 py-4 flex flex-wrap gap-2 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            <span className="text-gray-400 font-semibold mr-4">24H VOLUME: <span className="text-white">${formatNumber(totalVolume24h)}</span></span>
            {FILTERS.map((f, i) => (
              <button
                key={f.label}
                className={`px-4 py-1 rounded-lg text-sm font-semibold ${f.active ? "bg-[#23242a] text-blue-400" : "bg-[#23242a] text-gray-400 hover:text-white"}`}
              >
                {f.label}
              </button>
            ))}
            <button className="ml-2 px-4 py-1 rounded-lg bg-[#23242a] text-white font-semibold">Top</button>
            <button className="ml-2 px-4 py-1 rounded-lg bg-[#23242a] text-white font-semibold">Gainers</button>
            <button className="ml-2 px-4 py-1 rounded-lg bg-[#23242a] text-white font-semibold">New Pairs</button>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-gray-400 font-semibold">Rank by:</span>
            <span className="text-white font-semibold">Trending</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-2 md:px-6 lg:px-8 mt-8">
          <div className="overflow-x-auto rounded-xl shadow-lg">
            <table className="min-w-full bg-[#181A20] text-white">
              <thead>
                <tr className="text-xs uppercase text-gray-400 bg-[#23242a]">
                  {TABLE_HEADERS.map((header, i) => (
                    <th key={header} className={`py-3 px-2 text-left font-bold ${i === 0 ? "w-10" : ""}`}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={TABLE_HEADERS.length} className="text-center py-12 text-gray-400">Loading...</td></tr>
                ) : error ? (
                  <tr><td colSpan={TABLE_HEADERS.length} className="text-center py-12 text-red-400">{error}</td></tr>
                ) : coins.length === 0 ? (
                  <tr><td colSpan={TABLE_HEADERS.length} className="text-center py-12 text-gray-400">No data</td></tr>
                ) : (
                  coins.map((coin, idx) => (
                    <tr key={coin.address} className="border-b border-[#23242a] hover:bg-[#23242a] transition">
                      <td className={`py-3 px-2 font-bold ${idx < 3 ? "text-yellow-400" : "text-gray-300"}`}>#{idx + 1}</td>
                      <td className="py-3 px-2 flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                          <Image src="/zora.jpg" alt="Zora" width={28} height={28} className="rounded-full bg-black" />
                          <div>
                            <Link href={`/trending/${coin.address}/swap`}>
                              <div className="font-semibold text-white leading-tight hover:underline cursor-pointer">{coin.name}</div>
                            </Link>
                            <div className="text-xs text-gray-400 leading-tight">{coin.symbol}</div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-300 mt-1">
                          {`Coin ${idx + 1}: ${coin.name} (${coin.symbol}) Market Cap: ${coin.marketCap} 24h Volume: ${coin.volume24h} Holders: ${coin.uniqueHolders}`}
                        </div>
                      </td>
                      {/* Market Cap */}
                      <td className="py-3 px-2 text-white">${formatNumber(coin.marketCap)}</td>
                      {/* Volume */}
                      <td className="py-3 px-2 text-white">${formatNumber(coin.volume24h)}</td>
                      {/* Holders */}
                      <td className="py-3 px-2 text-white">{formatNumber(coin.uniqueHolders)}</td>
                      {/* Age */}
                      <td className="py-3 px-2 text-white">{coin.createdAt ? getAge(coin.createdAt) : "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Most Valuable Coins Section */}
        <div className="max-w-7xl mx-auto px-2 md:px-6 lg:px-8 mt-16">
          <h2 className="text-white text-3xl mb-6">Most Valuable Coins</h2>
          <div className="overflow-x-auto rounded-xl shadow-lg">
            <table className="min-w-full bg-[#181A20] text-white">
              <thead>
                <tr className="text-xs uppercase text-gray-400 bg-[#23242a]">
                  {TABLE_HEADERS.map((header, i) => (
                    <th key={header} className={`py-3 px-2 text-left font-bold ${i === 0 ? "w-10" : ""}`}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loadingValuable ? (
                  <tr><td colSpan={TABLE_HEADERS.length} className="text-center py-12 text-gray-400">Loading...</td></tr>
                ) : errorValuable ? (
                  <tr><td colSpan={TABLE_HEADERS.length} className="text-center py-12 text-red-400">{errorValuable}</td></tr>
                ) : valuableCoins.length === 0 ? (
                  <tr><td colSpan={TABLE_HEADERS.length} className="text-center py-12 text-gray-400">No data</td></tr>
                ) : (
                  valuableCoins.map((coin, idx) => (
                    <tr key={coin.address} className="border-b border-[#23242a] hover:bg-[#23242a] transition">
                      <td className={`py-3 px-2 font-bold ${idx < 3 ? "text-yellow-400" : "text-gray-300"}`}>#{idx + 1}</td>
                      <td className="py-3 px-2 flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                          <Image src="/zora.jpg" alt="Zora" width={28} height={28} className="rounded-full bg-black" />
                          <div>
                            <Link href={`/trending/${coin.address}/swap`}>
                              <div className="font-semibold text-white leading-tight hover:underline cursor-pointer">{coin.name}</div>
                            </Link>
                            <div className="text-xs text-gray-400 leading-tight">{coin.symbol}</div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-300 mt-1">
                          {`Coin ${idx + 1}: ${coin.name} (${coin.symbol}) Market Cap: ${coin.marketCap} 24h Volume: ${coin.volume24h} Holders: ${coin.uniqueHolders}`}
                        </div>
                      </td>
                      {/* Market Cap */}
                      <td className="py-3 px-2 text-white">${formatNumber(coin.marketCap)}</td>
                      {/* Volume */}
                      <td className="py-3 px-2 text-white">${formatNumber(coin.volume24h)}</td>
                      {/* Holders */}
                      <td className="py-3 px-2 text-white">{formatNumber(coin.uniqueHolders)}</td>
                      {/* Age */}
                      <td className="py-3 px-2 text-white">{coin.createdAt ? getAge(coin.createdAt) : "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
