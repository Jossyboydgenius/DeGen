'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Wallet,
  Smartphone,
  Bitcoin
} from 'lucide-react';
import { cn } from '@/lib/utils';

type TransactionType = 'all' | 'bank' | 'momo' | 'crypto';
type TransactionStatus = 'success' | 'pending' | 'failed';

interface Transaction {
  id: string;
  type: 'bank' | 'momo' | 'crypto';
  direction: 'in' | 'out';
  amount: string;
  currency: string;
  description: string;
  date: string;
  status: TransactionStatus;
  counterparty: string;
}

interface TransactionListProps {
  className?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: 't1',
    type: 'bank',
    direction: 'out',
    amount: '350.00',
    currency: 'GHS',
    description: 'Payment to Merchant',
    date: '2025-01-15 14:30',
    status: 'success',
    counterparty: 'ABC Store',
  },
  {
    id: 't2',
    type: 'momo',
    direction: 'in',
    amount: '500.00',
    currency: 'GHS',
    description: 'Received from John',
    date: '2025-01-14 09:45',
    status: 'success',
    counterparty: 'John Doe',
  },
  {
    id: 't3',
    type: 'crypto',
    direction: 'out',
    amount: '0.05',
    currency: 'ETH',
    description: 'Transfer to wallet',
    date: '2025-01-13 18:20',
    status: 'pending',
    counterparty: '0x12ab...ef78',
  },
  {
    id: 't4',
    type: 'bank',
    direction: 'out',
    amount: '1200.00',
    currency: 'GHS',
    description: 'Rent payment',
    date: '2025-01-12 11:10',
    status: 'success',
    counterparty: 'Landlord Co.',
  },
  {
    id: 't5',
    type: 'crypto',
    direction: 'in',
    amount: '100',
    currency: 'USDC',
    description: 'Yield rewards',
    date: '2025-01-11 22:30',
    status: 'success',
    counterparty: 'Yield Farm',
  },
  {
    id: 't6',
    type: 'momo',
    direction: 'out',
    amount: '75.00',
    currency: 'GHS',
    description: 'Utility bill',
    date: '2025-01-10 15:45',
    status: 'failed',
    counterparty: 'Utility Co.',
  },
];

export function TransactionList({ className }: TransactionListProps) {
  const [filter, setFilter] = useState<TransactionType>('all');

  const filteredTransactions = mockTransactions.filter((transaction) => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  });

  const getStatusIcon = (status: TransactionStatus) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getTypeIcon = (type: 'bank' | 'momo' | 'crypto') => {
    switch (type) {
      case 'bank':
        return <Wallet className="h-4 w-4" />;
      case 'momo':
        return <Smartphone className="h-4 w-4" />;
      case 'crypto':
        return <Bitcoin className="h-4 w-4" />;
    }
  };

  return (
    <Card className={cn("border-0", className)}>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as TransactionType)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="bank">Bank</TabsTrigger>
            <TabsTrigger value="momo">MoMo</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
          </TabsList>
          
          <TabsContent value={filter} className="mt-4 space-y-4">
            {filteredTransactions.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                No transactions found
              </div>
            ) : (
              filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between rounded-lg p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full", 
                      transaction.direction === 'in' 
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30" 
                        : "bg-red-100 text-red-600 dark:bg-red-900/30"
                    )}>
                      {transaction.direction === 'in' ? (
                        <ArrowDownLeft className="h-5 w-5" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {transaction.description}
                        </span>
                        <Badge variant="outline" className="flex gap-1 py-0">
                          {getTypeIcon(transaction.type)}
                          <span className="text-[10px] uppercase">{transaction.type}</span>
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        {getStatusIcon(transaction.status)}
                        <span>
                          {transaction.counterparty} • {new Date(transaction.date).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={cn(
                    "text-right font-medium",
                    transaction.direction === 'in' ? "text-green-600" : "text-foreground"
                  )}>
                    {transaction.direction === 'in' ? '+' : '-'} 
                    {transaction.currency === 'GHS' ? '₵' : ''} 
                    {transaction.amount} 
                    {transaction.currency !== 'GHS' ? ` ${transaction.currency}` : ''}
                  </div>
                </div>
              ))
            )}
            
            <Button variant="ghost" className="w-full">
              View all transactions
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}