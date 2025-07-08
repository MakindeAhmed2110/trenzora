'use client'

import { PrivyProvider } from '@privy-io/react-auth'
import { base, baseSepolia, zora } from 'viem/chains'

export default function CustomPrivyProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#6c2eb7', // Match your brand color
          logo: '/logo.jpg',
          walletList: [
            'metamask',
            'rabby_wallet',
            'rainbow',
            'wallet_connect',
          ],
        },

        defaultChain: base,
        supportedChains: [base, baseSepolia, zora],
      }}
    >
      {children}
    </PrivyProvider>
  )
}