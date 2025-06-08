'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
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
}

interface ResponsiveNavigationProps {
  logo?: React.ReactNode;
  ThemeToggle: React.ComponentType;
}

export function ResponsiveNavigation({ logo, ThemeToggle }: ResponsiveNavigationProps) {
  const pathname = usePathname();
 
  const navItems: NavItem[] = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutGrid size={20} />,
    },
    {
      label: 'Transactions',
      href: '/transactions',
      icon: <ArrowRightLeft size={20} />,
    },
    {
      label: 'Messages',
      href: '/messages',
      icon: <MessageSquare size={20} />,
    },
    {
      label: 'Verify',
      href: '/verify',
      icon: <ShieldCheck size={20} />,
    },
    {
      label: 'Yield',
      href: '/yield',
      icon: <Leaf size={20} />,
    },
    {
      label: 'Vote',
      href: '/vote',
      icon: <Vote size={20} />,
    },
    {
      label: 'Lite',
      href: '/lite',
      icon: <Sparkles size={20} />,
    },
    {
      label: 'Games',
      href: '/game',
      icon: <Gamepad2Icon size={20} />,
    },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:fixed md:top-0 md:left-0 md:right-0 md:z-50 md:flex md:items-center md:justify-between md:border-b md:border-border/40 md:bg-background/80 md:px-6 md:py-4 md:backdrop-blur-md">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            {logo || <div className="text-xl font-bold">Logo</div>}
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile Header (Logo + Theme Toggle) */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-background/80 px-4 py-3 backdrop-blur-md md:hidden">
        {/* Logo */}
        <div className="flex items-center">
          {logo || <div className="text-lg font-bold">Logo</div>}
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed bottom-4 left-0 right-0 z-50 mx-auto w-[95%] max-w-lg md:hidden">
        <nav className="flex items-center justify-between rounded-full border border-border/40 bg-background/80 p-1 shadow-lg backdrop-blur-md">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center rounded-full p-2 text-xs transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {item.icon}
              <span className="mt-1 text-[10px]">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}