'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAccount } from 'wagmi';
import { cn } from '@/lib/utils';
import WalletConnection from '@/components/wallet-connection'; // Adjust path as needed
import {
  LayoutGrid,
  ArrowRightLeft,
  MessageSquare,
  ShieldCheck,
  Leaf,
  Vote,
  Sparkles,
  Gamepad2Icon
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  requiresWallet?: boolean;
}

interface ResponsiveNavigationProps {
  logo?: React.ReactNode;
  ThemeToggle: React.ComponentType;
  liquidGlass?: boolean;
}

export function ResponsiveNavigation({ 
  logo, 
  ThemeToggle, 
  liquidGlass = false 
}: ResponsiveNavigationProps) {
  const pathname = usePathname();
  const { isConnected } = useAccount();
 
  const navItems: NavItem[] = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutGrid size={20} />,
      requiresWallet: true,
    },
    {
      label: 'Transactions',
      href: '/transactions',
      icon: <ArrowRightLeft size={20} />,
      requiresWallet: true,
    },
    {
      label: 'Messages',
      href: '/messages',
      icon: <MessageSquare size={20} />,
      requiresWallet: true,
    },
    {
      label: 'Verify',
      href: '/verify',
      icon: <ShieldCheck size={20} />,
      requiresWallet: false,
    },
    {
      label: 'Yield',
      href: '/yield',
      icon: <Leaf size={20} />,
      requiresWallet: true,
    },
    {
      label: 'Vote',
      href: '/vote',
      icon: <Vote size={20} />,
      requiresWallet: false,
    },
    {
      label: 'Lite',
      href: '/lite',
      icon: <Sparkles size={20} />,
      requiresWallet: false,
    },
    {
      label: 'Games',
      href: '/game',
      icon: <Gamepad2Icon size={20} />,
      requiresWallet: false,
    },
  ];

  // Filter nav items based on wallet connection
  const visibleNavItems = navItems.filter(item => 
    !item.requiresWallet || isConnected
  );

  // Liquid glass styles for dark mode
  const liquidGlassClasses = liquidGlass 
    ? 'dark:bg-white/10 dark:backdrop-blur-[20px] dark:backdrop-saturate-[180%] dark:border-white/20 dark:shadow-[0_8px_32px_rgba(0,0,0,0.1)] bg-white/80 backdrop-blur-md border-border/40'
    : 'bg-background/80 backdrop-blur-md border-border/40';

  return (
    <>
      {/* Header Navigation for all screen sizes */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-4",
        liquidGlassClasses
      )}>
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            {logo || <div className="text-lg font-bold">Logo</div>}
          </Link>
        </div>

        {/* Wallet + Theme Toggle */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <ThemeToggle />
          </div>
          <WalletConnection 
            className="text-sm px-3 py-1" 
            buttonLabel="Connect Wallet"
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-4 left-0 right-0 z-50 mx-auto w-[95%] md:w-[80%] lg:w-[60%] max-w-3xl">
        <nav className={cn(
          "flex items-center justify-between rounded-full p-1 shadow-lg",
          liquidGlassClasses
        )}>
          {visibleNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center rounded-full p-1.5 text-xs transition-all duration-200",
                "min-w-[40px]", // Reduced minimum width from 50px to 40px
                pathname === item.href
                  ? "bg-primary text-primary-foreground scale-105 dark:bg-white/30 dark:text-white dark:shadow-lg"
                  : "text-foreground dark:text-white/70 hover:bg-accent hover:text-accent-foreground dark:hover:bg-white/20 dark:hover:text-white hover:scale-105"
              )}
            >
              <div className="transition-transform duration-200">
                {item.icon}
              </div>
              <span className={cn(
                "mt-0.5 text-[8px] md:text-[10px] font-medium truncate w-full text-center transition-opacity duration-200",
                "leading-tight" // Better line height for small text
              )}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Wallet Connection Status Indicator */}
      {!isConnected && (
        <div className={cn(
          "fixed bottom-20 left-0 right-0 z-40 mx-auto w-[95%] md:w-[80%] lg:w-[60%] max-w-3xl",
          "flex items-center justify-center p-3 rounded-lg",
          liquidGlassClasses
        )}>
          <p className={cn(
            "text-sm text-center",
            "text-foreground dark:text-white/80"
          )}>
            Connect your wallet to access all features
          </p>
        </div>
      )}

      {/* Add padding to body to account for fixed navigation */}
      <style jsx global>{`
        body {
          padding-top: 56px; /* Header height */
          padding-bottom: ${isConnected ? '60px' : '100px'}; /* Reduced bottom padding */
        }

        /* Enhanced liquid glass animation */
        .dark .backdrop-blur-[20px] {
          backdrop-filter: blur(20px) saturate(180%) brightness(110%);
        }
        
        /* Subtle shimmer effect for liquid glass */
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </>
  );
}