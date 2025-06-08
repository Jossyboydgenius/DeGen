'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowDown, 
  ArrowUp, 
  CheckSquare, 
  DollarSign, 
  Eye, 
  EyeOff,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BalanceCardProps {
  className?: string;
}

export function BalanceCard({ className }: BalanceCardProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Card className={cn("border-0 bg-gradient-to-br from-primary/10 to-accent/5 backdrop-blur-sm", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary">Your Balance</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible(!isVisible)}
            className="h-8 w-8 rounded-full"
          >
            {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        </div>

        <Tabs defaultValue="fiat" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="fiat">Fiat</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
          </TabsList>
          <TabsContent value="fiat" className="space-y-4">
            <div className="mt-6">
              <div className="text-sm text-muted-foreground">Total Balance</div>
              <div className="mt-1 flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-primary" />
                <span className="text-3xl font-bold">
                  {isVisible ? "₵ 8,245.50" : "••••••"}
                </span>
              </div>
              <div className="mt-1 text-sm text-green-500">+2.4% (24h)</div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-lg bg-background/60 p-3">
                <div className="text-muted-foreground">Mobile Money</div>
                <div className="mt-1 font-medium">
                  {isVisible ? "₵ 2,450.00" : "••••••"}
                </div>
              </div>
              <div className="rounded-lg bg-background/60 p-3">
                <div className="text-muted-foreground">Bank Account</div>
                <div className="mt-1 font-medium">
                  {isVisible ? "₵ 5,795.50" : "••••••"}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="crypto" className="space-y-4">
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-background/60 p-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30">
                    BTC
                  </div>
                  <div>
                    <div className="font-medium">Bitcoin</div>
                    <div className="text-xs text-muted-foreground">
                      {isVisible ? "0.04 BTC" : "••••••"}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    {isVisible ? "$1,542.20" : "••••••"}
                  </div>
                  <div className="text-xs text-green-500">+1.2%</div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-background/60 p-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30">
                    ETH
                  </div>
                  <div>
                    <div className="font-medium">Ethereum</div>
                    <div className="text-xs text-muted-foreground">
                      {isVisible ? "0.35 ETH" : "••••••"}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    {isVisible ? "$753.40" : "••••••"}
                  </div>
                  <div className="text-xs text-red-500">-0.8%</div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-background/60 p-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30">
                    USDC
                  </div>
                  <div>
                    <div className="font-medium">USD Coin</div>
                    <div className="text-xs text-muted-foreground">
                      {isVisible ? "540 USDC" : "••••••"}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    {isVisible ? "$540.00" : "••••••"}
                  </div>
                  <div className="text-xs text-muted-foreground">0.0%</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 grid grid-cols-4 gap-2">
          <Button variant="outline" size="sm" className="flex flex-col gap-1 py-4">
            <ArrowUp size={16} />
            <span className="text-xs">Send</span>
          </Button>
          <Button variant="outline" size="sm" className="flex flex-col gap-1 py-4">
            <ArrowDown size={16} />
            <span className="text-xs">Receive</span>
          </Button>
          <Button variant="outline" size="sm" className="flex flex-col gap-1 py-4">
            <CheckSquare size={16} />
            <span className="text-xs">Approve</span>
          </Button>
          <Link href="/lite">
            <Button variant="outline" size="sm" className="flex h-full w-full flex-row gap-4 py-2">
              <Sparkles size={16} />
              <span className="text-xs">Lite</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}