"use client"

import Navbar from "../navbar"
import { motion } from "framer-motion"
import { MagnifyingGlassIcon, BellAlertIcon } from "@heroicons/react/24/outline";
import { FaTelegramPlane } from "react-icons/fa";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#181A20] via-[#23242a] to-[#23242a] relative overflow-hidden">
            <Navbar />
            {/* Animated background gradient blobs */}
            <motion.div
                className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#6c2eb7]/40 to-[#23242a]/0 blur-3xl opacity-60 z-0"
                animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#6c2eb7]/30 to-[#23242a]/0 blur-2xl opacity-50 z-0"
                animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
                <motion.h1
                    className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-[#6c2eb7] drop-shadow-lg mb-6"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Discover & Trade the Hottest Zora Coins Instantly
                </motion.h1>
                <motion.p
                    className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                >
                    Track real-time mint trends on Zora, analyze what’s pumping, and execute instant swaps on Base 
                </motion.p>
                <motion.div
                    className="flex gap-6 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1 }}
                >
                    <a
                        href="/trending"
                        className="px-8 py-3 rounded-full bg-[#6c2eb7] text-white font-semibold text-lg shadow-lg hover:bg-[#7d3eea] transition"
                    >
                        Explore Coins
                    </a>
                    <a
                        href="/trending"
                        className="px-8 py-3 rounded-full border border-white/20 text-white font-semibold text-lg bg-white/5 hover:bg-white/10 transition"
                    >
                        Trade Now
                    </a>
                </motion.div>
            </div>
            {/* Features Section */}
            <section className="relative z-10 w-full flex flex-col items-center justify-center py-20 px-4">
                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-[#6c2eb7] drop-shadow-lg mb-8 text-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    Why Trenzora?
                </motion.h2>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.2,
                            },
                        },
                    }}
                >
                    {/* Feature 1 */}
                    <motion.div
                        className="bg-[#23242a]/80 rounded-2xl p-8 shadow-xl border border-[#2d2d3a] flex flex-col items-center backdrop-blur-xl hover:scale-105 transition-transform duration-300"
                        whileHover={{ scale: 1.07 }}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="bg-gradient-to-br from-yellow-400 to-orange-400 p-4 rounded-full mb-4 shadow-lg">
                            <MagnifyingGlassIcon className="w-10 h-10 text-white" />
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-2">Real-Time Dexscreener</h3>
                        <p className="text-gray-300 mb-2">
                            Discover trending Zora coins on Base by tracking mint activity, velocity, and user engagement.
                        </p>
                    </motion.div>
                    {/* Feature 2 */}
                    <motion.div
                        className="bg-[#23242a]/80 rounded-2xl p-8 shadow-xl border border-[#2d2d3a] flex flex-col items-center backdrop-blur-xl hover:scale-105 transition-transform duration-300"
                        whileHover={{ scale: 1.07 }}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9 }}
                    >
                        <span className="bg-gradient-to-br from-blue-400 to-purple-500 p-4 rounded-full mb-4 shadow-lg">
                            <FaTelegramPlane className="w-10 h-10 text-white" />
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-2">Telegram Trading Bot</h3>
                        <p className="text-gray-300 mb-2">
                            Instantly trade tokens directly from Telegram with live price previews and one-tap swaps.
                        </p>
                    </motion.div>
                    {/* Feature 3 */}
                    <motion.div
                        className="bg-[#23242a]/80 rounded-2xl p-8 shadow-xl border border-[#2d2d3a] flex flex-col items-center backdrop-blur-xl hover:scale-105 transition-transform duration-300"
                        whileHover={{ scale: 1.07 }}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1 }}
                    >
                        <span className="bg-gradient-to-br from-pink-400 to-red-400 p-4 rounded-full mb-4 shadow-lg">
                            <BellAlertIcon className="w-10 h-10 text-white" />
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-2">Live Trend Alerts</h3>
                        <p className="text-gray-300 mb-2">
                            Get notified the moment a coin starts trending, so you never miss the next big move.
                        </p>
                    </motion.div>
                </motion.div>
            </section>
            {/* Subtle animated particles */}
            <div className="pointer-events-none absolute inset-0 z-0">
                {[...Array(18)].map((_, i) => (
                    <motion.span
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-white/10"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, Math.random() * 40 - 20, 0],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 6 + Math.random() * 6,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>
        </div>
    )
}