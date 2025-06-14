'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster as SonnerToaster } from 'sonner';
import { OnchainKitProvider } from "@coinbase/onchainkit"
// import { base } from "wagmi/chains"
import { useCustomTheme, ThemeProviderCustom } from "@/lib/theme-context"
import { http, createConfig, WagmiProvider } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { Toaster } from '@/components/ui/toaster';

const BASE_API_KEY = process.env.COINBASE_TOKEN
const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID || 'YOUR_PROJECT_ID'

export const config = createConfig({
  chains: [baseSepolia,],
  transports: {
    [baseSepolia.id]: http(),
    // [sepolia.id]: http(),
  },
})

// This component can safely use the custom theme hook since it's inside ThemeProviderCustom
function OnchainKitProviderInner({ children }: { children: React.ReactNode }) {
  const { customTheme } = useCustomTheme()

  return (
    <OnchainKitProvider
      apiKey={BASE_API_KEY}
      projectId={PROJECT_ID}
      chain={baseSepolia}
      config={{
        appearance: {
          name: "DeGen",
          logo: "https://raw.githubusercontent.com/Jossyboydgenius/DeGen/refs/heads/main/frontend/public/degen2.png",
          mode: customTheme === "dark" ? "dark" : "light",
          theme: "base",
        },
        wallet: {
          display: "modal",
          termsUrl: "/terms",
          privacyUrl: "/privacy",
        },
      }}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange      >
        {children}
        <SonnerToaster position="top-center" richColors />
        <Toaster />
      </ThemeProvider>
    </OnchainKitProvider>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <ThemeProviderCustom>
        <OnchainKitProviderInner>
          {children}
        </OnchainKitProviderInner>
      </ThemeProviderCustom>
    </WagmiProvider>
  );
}