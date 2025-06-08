'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Card, 
  CardContent
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sparkles, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Smartphone, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft,
  RefreshCw,
  Plus,
  Shield,
  Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Account {
  id: string;
  name: string;
  type: 'bank' | 'momo';
  balance: string;
  accountNumber: string;
  provider: string;
  isProtected: boolean;
}

interface CryptoBalance {
  currency: string;
  symbol: string;
  balance: string;
  value: string;
  change: string;
  color: string;
  isProtected: boolean;
}

export function LiteMode() {
  const [isVisible, setIsVisible] = useState(true);
  
  const accounts: Account[] = [
    {
      id: 'acc1',
      name: 'Mobile Money',
      type: 'momo',
      balance: '2,450.00',
      accountNumber: '0277 *** ***',
      provider: 'MTN MoMo',
      isProtected: true
    },
    {
      id: 'acc2',
      name: 'Savings Account',
      type: 'bank',
      balance: '5,795.50',
      accountNumber: '1234 *** *** ***',
      provider: 'GCB Bank',
      isProtected: true
    },
  ];
  
  const cryptoBalances: CryptoBalance[] = [
    {
      currency: 'Bitcoin',
      symbol: 'BTC',
      balance: '0.04',
      value: '1,542.20',
      change: '+1.2%',
      color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30',
      isProtected: true
    },
    {
      currency: 'Ethereum',
      symbol: 'ETH',
      balance: '0.35',
      value: '753.40',
      change: '-0.8%',
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30',
      isProtected: true
    },
    {
      currency: 'USD Coin',
      symbol: 'USDC',
      balance: '540',
      value: '540.00',
      change: '0.0%',
      color: 'bg-green-100 text-green-600 dark:bg-green-900/30',
      isProtected: true
    },
  ];

  return (
    <div className="container mx-auto max-w-lg pb-20">
      <div className="mb-6 flex items-center justify-between pt-6">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="flex items-center gap-2 text-xl font-bold">
            <Sparkles className="h-5 w-5 text-yellow-500" /> 
            Lite Mode
          </h1>
        </div>
      </div>
      
      <Card className="mb-6 border-0 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Total Balance</h2>
              <Badge variant="outline" className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                <span className="text-[10px]">PROTECTED</span>
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsVisible(!isVisible)}
              className="h-8 w-8 rounded-full"
            >
              {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
          
          <div className="mt-4">
            <div className="text-3xl font-bold">
              {isVisible ? "₵ 8,245.50" : "••••••"}
            </div>
            <div className="mt-1 text-sm text-green-500">+2.4% (24h)</div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <ArrowUpRight className="h-4 w-4" />
              Send
            </Button>
            <Button className="gap-2 bg-green-600 hover:bg-green-700">
              <ArrowDownLeft className="h-4 w-4" />
              Receive
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="accounts">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
        </TabsList>
        
        <TabsContent value="accounts" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-muted-foreground">Your Accounts</h2>
            <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
              <Plus className="h-3.5 w-3.5" /> Link Account
            </Button>
          </div>
          
          {accounts.map((account) => (
            <Card key={account.id} className="overflow-hidden border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 p-4">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full",
                    account.type === 'momo' 
                      ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30" 
                      : "bg-blue-100 text-blue-600 dark:bg-blue-900/30"
                  )}>
                    {account.type === 'momo' ? (
                      <Smartphone className="h-5 w-5" />
                    ) : (
                      <CreditCard className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{account.name}</span>
                      {account.isProtected && (
                        <Lock className="h-3.5 w-3.5 text-blue-500" />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {account.provider} • {account.accountNumber}
                    </div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="font-medium">
                      {isVisible ? `₵ ${account.balance}` : "••••••"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      GHS
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 border-t">
                  <Button variant="ghost" className="flex h-10 flex-col items-center justify-center gap-1 rounded-none py-5 text-xs">
                    <ArrowUpRight className="h-4 w-4" />
                    Send
                  </Button>
                  <Button variant="ghost" className="flex h-10 flex-col items-center justify-center gap-1 rounded-none border-x py-5 text-xs">
                    <ArrowDownLeft className="h-4 w-4" />
                    Receive
                  </Button>
                  <Button variant="ghost" className="flex h-10 flex-col items-center justify-center gap-1 rounded-none py-5 text-xs">
                    <RefreshCw className="h-4 w-4" />
                    Convert
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="crypto" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-muted-foreground">Your Crypto</h2>
            <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
              <Plus className="h-3.5 w-3.5" /> Buy Crypto
            </Button>
          </div>
          
          {cryptoBalances.map((crypto) => (
            <Card key={crypto.symbol} className="overflow-hidden border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 p-4">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full",
                    crypto.color
                  )}>
                    {crypto.symbol}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{crypto.currency}</span>
                      {crypto.isProtected && (
                        <Lock className="h-3.5 w-3.5 text-blue-500" />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {isVisible ? `${crypto.balance} ${crypto.symbol}` : "••••••"}
                    </div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="font-medium">
                      {isVisible ? `$${crypto.value}` : "••••••"}
                    </div>
                    <div className={cn(
                      "text-xs",
                      crypto.change.startsWith('+') ? "text-green-500" : 
                      crypto.change.startsWith('-') ? "text-red-500" : 
                      "text-muted-foreground"
                    )}>
                      {crypto.change}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 border-t">
                  <Button variant="ghost" className="flex h-10 flex-col items-center justify-center gap-1 rounded-none py-5 text-xs">
                    <ArrowUpRight className="h-4 w-4" />
                    Send
                  </Button>
                  <Button variant="ghost" className="flex h-10 flex-col items-center justify-center gap-1 rounded-none border-x py-5 text-xs">
                    <ArrowDownLeft className="h-4 w-4" />
                    Receive
                  </Button>
                  <Button variant="ghost" className="flex h-10 flex-col items-center justify-center gap-1 rounded-none py-5 text-xs">
                    <RefreshCw className="h-4 w-4" />
                    Trade
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}