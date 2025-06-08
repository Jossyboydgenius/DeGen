'use client'
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Bitcoin, Zap, DollarSign } from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const priceData = [
  { time: "00:00", btc: 28500, eth: 1850 },
  { time: "04:00", btc: 28700, eth: 1830 },
  { time: "08:00", btc: 29100, eth: 1860 },
  { time: "12:00", btc: 28900, eth: 1880 },
  { time: "16:00", btc: 29300, eth: 1910 },
  { time: "20:00", btc: 29500, eth: 1930 },
  { time: "24:00", btc: 29800, eth: 1950 },
];

export const LiveUpdates: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Live Market</h3>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Live via Chainlink</span>
          </div>
        </div>
        
        <div className="h-[200px] mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                yAxisId="btc"
                orientation="right"
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={false}
                domain={['dataMin - 500', 'dataMax + 500']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(24, 26, 32, 0.95)', 
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px'
                }}
                itemStyle={{ color: '#fff' }}
                labelStyle={{ color: '#a1a1aa' }}
              />
              <Line 
                yAxisId="btc"
                type="monotone" 
                dataKey="btc" 
                stroke="#F0B90B" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#F0B90B", stroke: "#fff", strokeWidth: 2 }}
              />
              <Line 
                yAxisId="btc"
                type="monotone" 
                dataKey="eth" 
                stroke="#627EEA" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#627EEA", stroke: "#fff", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-2 bg-muted rounded-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                <Bitcoin className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium">Bitcoin</p>
                <div className="flex items-center gap-1">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +1.2%
                  </Badge>
                  <span className="text-xs text-muted-foreground">24h</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">$29,800.45</p>
              <p className="text-sm text-muted-foreground">Updated 30s ago</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-muted rounded-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium">Ethereum</p>
                <div className="flex items-center gap-1">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +2.5%
                  </Badge>
                  <span className="text-xs text-muted-foreground">24h</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">$1,950.32</p>
              <p className="text-sm text-muted-foreground">Updated 45s ago</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-muted rounded-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium">BNB</p>
                <div className="flex items-center gap-1">
                  <Badge variant="secondary" className="bg-red-100 text-red-800 gap-1">
                    <TrendingDown className="h-3 w-3" />
                    -0.8%
                  </Badge>
                  <span className="text-xs text-muted-foreground">24h</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">$245.78</p>
              <p className="text-sm text-muted-foreground">Updated 1m ago</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};