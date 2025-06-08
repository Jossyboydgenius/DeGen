'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Leaf, 
  TrendingUp, 
  Timer, 
  Gem, 
  Landmark 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface YieldOption {
  id: string;
  name: string;
  description: string;
  apy: number;
  risk: 'low' | 'medium' | 'high';
  lockPeriod: string;
  provider: string;
  userParticipating: boolean;
}

interface YieldCardProps {
  className?: string;
}

const mockYieldOptions: YieldOption[] = [
  {
    id: 'y1',
    name: 'Stablecoin Savings',
    description: 'Earn yield on USDC by providing liquidity to lending protocols',
    apy: 4.2,
    risk: 'low',
    lockPeriod: '0 days',
    provider: 'Aave',
    userParticipating: true,
  },
  {
    id: 'y2',
    name: 'ETH Staking Pool',
    description: 'Stake ETH and earn rewards from network validation',
    apy: 5.8,
    risk: 'low',
    lockPeriod: '30 days',
    provider: 'Lido',
    userParticipating: false,
  },
  {
    id: 'y3',
    name: 'Liquidity Mining',
    description: 'Provide liquidity to token pairs and earn trading fees plus rewards',
    apy: 12.5,
    risk: 'medium',
    lockPeriod: '7 days',
    provider: 'Uniswap',
    userParticipating: false,
  },
  {
    id: 'y4',
    name: 'Yield Optimizer',
    description: 'Automatically compounds yields across multiple protocols',
    apy: 18.9,
    risk: 'high',
    lockPeriod: '14 days',
    provider: 'Yearn',
    userParticipating: false,
  },
];

export function YieldCard({ className }: YieldCardProps) {
  const getRiskColor = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-600 dark:bg-green-900/30';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30';
      case 'high':
        return 'bg-red-100 text-red-600 dark:bg-red-900/30';
    }
  };

  return (
    <Card className={cn("border-0", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-500" />
          Yield Farming
        </CardTitle>
        <CardDescription>
          Earn passive income from your crypto assets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockYieldOptions.map((option) => (
            <div
              key={option.id}
              className={cn(
                "rounded-lg border p-4 transition-colors",
                option.userParticipating && "border-primary/50 bg-primary/5"
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{option.name}</h3>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-[10px]", 
                        getRiskColor(option.risk)
                      )}
                    >
                      {option.risk.toUpperCase()} RISK
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-500">
                    {option.apy}% <span className="text-xs font-normal">APY</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Timer className="h-3.5 w-3.5" />
                  <span>Lock: {option.lockPeriod}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Landmark className="h-3.5 w-3.5" />
                  <span>Provider: {option.provider}</span>
                </div>
              </div>
              
              {option.userParticipating && (
                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span>Your position</span>
                    <span className="font-medium">$540 USDC</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
              )}
              
              <div className="mt-4">
                <Button 
                  className="w-full"
                  variant={option.userParticipating ? "outline" : "default"}
                >
                  {option.userParticipating ? "Manage Position" : "Start Earning"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}