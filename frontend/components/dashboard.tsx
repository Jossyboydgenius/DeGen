'use client';
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Bell, 
  ShieldAlert, 
  IdCard, 
  HeartPulse, 
  Cpu 
} from "lucide-react";
import { BalanceCard } from "./balance-card";
import { QuickActions } from "./quick-actions";
import { LiveUpdates } from "./live-updates";


interface DashboardProps {
  onGoToLiteMode: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onGoToLiteMode }) => {
  return (
    <div className="space-y-6 mt-16">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold"></h2>
        <Button 
          size="sm" 
          variant="secondary"
          onClick={onGoToLiteMode}
          className="gap-2"
        >
          <Zap className="h-4 w-4" />
          Lite Mode
        </Button>
      </div>
      
      <BalanceCard />
      
      <QuickActions />
      
      <LiveUpdates />
      
      <Card className="gradient-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Recent Transactions</h3>
            <Button size="sm" variant="ghost" className="text-primary">
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-muted rounded-md">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <ArrowDownLeft className="text-primary h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Received BTC</p>
                  <p className="text-muted-foreground text-sm">Today, 10:45 AM</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">+0.0045 BTC</p>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Completed
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-muted rounded-md">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <ArrowUpRight className="text-primary h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Sent ETH</p>
                  <p className="text-muted-foreground text-sm">Yesterday, 6:30 PM</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">-0.25 ETH</p>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Completed
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-muted rounded-md">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <ArrowUpRight className="text-primary h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Swap USDC to ETH</p>
                  <p className="text-muted-foreground text-sm">Yesterday, 2:15 PM</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">-120 USDC</p>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Pending
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Pending Approvals</h3>
            <div className="relative">
              <Button size="sm" variant="ghost">
                <Bell className="h-4 w-4" />
              </Button>
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                2
              </Badge>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 border border-red-200 bg-red-50 dark:bg-red-900/20 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="text-red-500 h-5 w-5" />
                  <p className="font-medium">Uniswap Router</p>
                </div>
                <Badge variant="destructive">Action Required</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Requesting approval to spend your USDC
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-red-200 text-red-600">
                  Reject
                </Button>
                <Button size="sm">Approve</Button>
              </div>
            </div>
            
            <div className="p-3 border border-red-200 bg-red-50 dark:bg-red-900/20 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="text-red-500 h-5 w-5" />
                  <p className="font-medium">Aave Lending Pool</p>
                </div>
                <Badge variant="destructive">Action Required</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Requesting approval to spend your ETH
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-red-200 text-red-600">
                  Reject
                </Button>
                <Button size="sm">Approve</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="gradient-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">iExec Data Protection</h3>
              <Badge variant="secondary">Powered by iExec</Badge>
            </div>
            <Button size="sm" variant="ghost" className="text-secondary">
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-muted rounded-md">
              <div className="flex items-center gap-3">
                <div className="bg-secondary/10 p-2 rounded-full">
                  <IdCard className="text-secondary h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Passport Data</p>
                  <p className="text-muted-foreground text-sm">Protected with iExec</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Protected
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-muted rounded-md">
              <div className="flex items-center gap-3">
                <div className="bg-secondary/10 p-2 rounded-full">
                  <HeartPulse className="text-secondary h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Health Data</p>
                  <p className="text-muted-foreground text-sm">Not yet protected</p>
                </div>
              </div>
              <div className="text-right">
                <Button size="sm" variant="secondary">Protect</Button>
              </div>
            </div>
            
            <div className="p-3 bg-secondary/10 rounded-md">
              <div className="flex items-center gap-2">
                <Cpu className="text-secondary h-4 w-4" />
                <div className="flex-1">
                  <p className="font-medium text-sm">iExec Confidential Computing</p>
                  <p className="text-xs text-muted-foreground">Process data without exposing it</p>
                </div>
                <Button size="sm" variant="outline" className="border-secondary text-secondary">
                  Configure
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};