import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { Providers } from './providers';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ResponsiveNavigation } from '@/components/mobile-navigation';
import '@coinbase/onchainkit/styles.css';
import './globals.css';
import "@/lib/styles/onchainkit-styles.css"
import { cn } from '@/lib/utils';
import Image from 'next/image';

const outfit = Outfit({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DeGen',
  description: 'A secure decentralized finance mobile application with data protection',
  icons: {
    icon: '/degen.png',
    apple: '/degen.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={cn(
          outfit.className,
          'antialiased overflow-x-clip',
          'min-h-screen flex flex-col'
        )}
        suppressHydrationWarning
      >
        <Providers>          
          <ResponsiveNavigation
              logo={
                <div className="flex items-center gap-2">                  
                  <div className="hidden dark:block">
                    <Image 
                      src="/degen.png" 
                      alt="DeGen Logo" 
                      width={30} 
                      height={30} 
                      className="h-10 w-10"
                    />
                  </div>
                  <div className="block dark:hidden">
                    <Image 
                      src="/degen1.png" 
                      alt="DeGen Logo" 
                      width={55} 
                      height={30} 
                      className="h-10 w-15"
                    />
                  </div>
                  {/* <span className="text-2xl font-bold">DeGen</span> */}
                </div>
              }
            ThemeToggle={ThemeToggle}
            liquidGlass={true}
          />
          <main className="flex-1 relative z-10 pb-0">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}