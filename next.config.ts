import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        zlib: false,
        stream: false,
        util: false,
        assert: false,
        buffer: false,
        crypto: false,
      };
    }
    return config;
  },
};
export default nextConfig;
