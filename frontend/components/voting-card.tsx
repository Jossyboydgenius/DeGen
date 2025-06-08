'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Vote, Timer, Trophy, Flame, Users, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VotingEvent {
  id: string;
  title: string;
  category: 'sports' | 'entertainment' | 'politics' | 'crypto';
  endTime: string;
  options: {
    id: string;
    name: string;
    odds: number;
    votes: number;
    userVoted: boolean;
  }[];
  totalVotes: number;
  isHot: boolean;
  isPredicted: boolean;
}

interface VotingCardProps {
  className?: string;
}

const mockVotingEvents: VotingEvent[] = [
  {
    id: 'v1',
    title: 'Ghana Premier League: Hearts of Oak vs Asante Kotoko',
    category: 'sports',
    endTime: '2025-01-20 15:00',
    options: [
      { id: 'o1', name: 'Hearts of Oak Win', odds: 2.4, votes: 1250, userVoted: true },
      { id: 'o2', name: 'Draw', odds: 3.1, votes: 850, userVoted: false },
      { id: 'o3', name: 'Asante Kotoko Win', odds: 2.7, votes: 1100, userVoted: false },
    ],
    totalVotes: 3200,
    isHot: true,
    isPredicted: false,
  },
  {
    id: 'v2',
    title: 'Bitcoin Price on Feb 1st, 2025',
    category: 'crypto',
    endTime: '2025-02-01 00:00',
    options: [
      { id: 'o4', name: 'Under $75,000', odds: 2.1, votes: 2100, userVoted: false },
      { id: 'o5', name: '$75,000 - $85,000', odds: 2.5, votes: 1800, userVoted: false },
      { id: 'o6', name: 'Over $85,000', odds: 3.0, votes: 2300, userVoted: false },
    ],
    totalVotes: 6200,
    isHot: true,
    isPredicted: false,
  },
  {
    id: 'v3',
    title: 'Ghana Music Awards Best Artist',
    category: 'entertainment',
    endTime: '2025-03-15 20:00',
    options: [
      { id: 'o7', name: 'Artist A', odds: 1.8, votes: 3500, userVoted: false },
      { id: 'o8', name: 'Artist B', odds: 2.2, votes: 2900, userVoted: false },
      { id: 'o9', name: 'Artist C', odds: 4.0, votes: 1200, userVoted: false },
    ],
    totalVotes: 7600,
    isHot: false,
    isPredicted: false,
  },
];

export function VotingCard({ className }: VotingCardProps) {
  const getCategoryColor = (category: 'sports' | 'entertainment' | 'politics' | 'crypto') => {
    switch (category) {
      case 'sports':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30';
      case 'entertainment':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30';
      case 'politics':
        return 'bg-orange-100 text-orange-600 dark:bg-orange-900/30';
      case 'crypto':
        return 'bg-green-100 text-green-600 dark:bg-green-900/30';
    }
  };

  return (
    <Card className={cn("border-0", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Vote className="h-5 w-5 text-purple-500" />
          Conditional Voting
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="hot">Hot 🔥</TabsTrigger>
            <TabsTrigger value="my">My Votes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-4 space-y-6">
            {mockVotingEvents.map((event) => (
              <div key={event.id} className="rounded-lg border p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium">{event.title}</h3>
                      {event.isHot && (
                        <Badge variant="outline" className="flex items-center gap-1 bg-red-100 text-[10px] text-red-600 dark:bg-red-900/30">
                          <Flame className="h-3 w-3" /> HOT
                        </Badge>
                      )}
                    </div>
                    
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          getCategoryColor(event.category)
                        )}
                      >
                        {event.category}
                      </Badge>
                      
                      <div className="flex items-center gap-1">
                        <Timer className="h-3.5 w-3.5" />
                        <span>
                          Ends: {new Date(event.endTime).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        <span>{event.totalVotes.toLocaleString()} votes</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  {event.options.map((option) => (
                    <div key={option.id} className={cn(
                      "rounded-lg p-3",
                      option.userVoted ? "bg-primary/10" : "bg-muted/50"
                    )}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={option.userVoted ? "font-medium" : ""}>
                            {option.name}
                          </span>
                          {option.userVoted && (
                            <Badge variant="outline" className="text-[10px]">YOUR VOTE</Badge>
                          )}
                        </div>
                        <div className="text-sm font-medium">
                          {option.odds}x
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                          <span>{Math.round((option.votes / event.totalVotes) * 100)}%</span>
                          <span>{option.votes.toLocaleString()} votes</span>
                        </div>
                        <Progress 
                          value={event.totalVotes > 0 ? (option.votes / event.totalVotes) * 100 : 0} 
                          className={cn(
                            "h-1.5",
                            option.userVoted && "bg-primary/20"
                          )}
                        />
                      </div>
                      
                      {!option.userVoted && !event.options.some(o => o.userVoted) && (
                        <Button 
                          className="mt-2 w-full" 
                          size="sm"
                          variant="outline"
                        >
                          Vote
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-between">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View Details
                  </Button>
                  
                  {event.options.some(o => o.userVoted) && (
                    <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs">
                      <Trophy className="h-3.5 w-3.5" />
                      Potential Reward: 250 USDC
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="hot">
            <div className="py-8 text-center text-muted-foreground">
              Loading hot events...
            </div>
          </TabsContent>
          
          <TabsContent value="my">
            <div className="py-8 text-center text-muted-foreground">
              Your voted events will appear here
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}