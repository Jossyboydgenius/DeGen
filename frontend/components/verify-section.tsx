'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, QrCode, Search, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VerifiedEntity {
  id: string;
  name: string;
  type: 'merchant' | 'agent' | 'service';
  identifier: string;
  verifiedSince: string;
  isVerified: boolean;
}

interface VerifySectionProps {
  className?: string;
}

const mockVerifiedEntities: VerifiedEntity[] = [
  {
    id: 've1',
    name: 'AccraMall MoMo Agent',
    type: 'agent',
    identifier: '0277123456',
    verifiedSince: '2024-12-10',
    isVerified: true,
  },
  {
    id: 've2',
    name: 'GlobalPay Services',
    type: 'service',
    identifier: 'GP829135',
    verifiedSince: '2024-11-25',
    isVerified: true,
  },
  {
    id: 've3',
    name: 'ElectroTech Store',
    type: 'merchant',
    identifier: 'MER456789',
    verifiedSince: '2024-10-15',
    isVerified: true,
  },
  {
    id: 've4',
    name: 'QuickCash Agent',
    type: 'agent',
    identifier: '0244789123',
    verifiedSince: '',
    isVerified: false,
  },
];

export function VerifySection({ className }: VerifySectionProps) {
  return (
    <Card className={cn("border-0", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-blue-500" />
          Verification Center
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Button className="flex-1 gap-2">
            <QrCode className="h-4 w-4" />
            <span>Scan QR</span>
          </Button>
          <Button variant="outline" className="flex-1 gap-2">
            <Search className="h-4 w-4" />
            <span>Search</span>
          </Button>
        </div>
        
        <div className="mt-6">
          <h3 className="mb-4 text-sm font-medium text-muted-foreground">Recently Verified</h3>
          <div className="space-y-3">
            {mockVerifiedEntities.map((entity) => (
              <div
                key={entity.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full",
                    entity.isVerified ? "bg-green-100 text-green-600 dark:bg-green-900/30" : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30"
                  )}>
                    {entity.isVerified ? <ShieldCheck className="h-5 w-5" /> : <Info className="h-5 w-5" />}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{entity.name}</span>
                      <Badge variant="outline" className="text-[10px]">{entity.type.toUpperCase()}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">ID: {entity.identifier}</div>
                  </div>
                </div>
                
                <div>
                  {entity.isVerified ? (
                    <Badge className="bg-green-500 hover:bg-green-600">Verified</Badge>
                  ) : (
                    <Button size="sm" className="h-8 text-xs">Verify Now</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}