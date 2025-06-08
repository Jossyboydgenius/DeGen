import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, Repeat, ShieldCheck } from "lucide-react";

export const QuickActions: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-2">
      <Button
        className="flex flex-col h-auto py-3 gap-2"
        variant="outline"
      >
        <div className="bg-primary/10 p-2 rounded-full">
          <ArrowUpRight className="text-primary h-5 w-5" />
        </div>
        <span>Send</span>
      </Button>
      
      <Button
        className="flex flex-col h-auto py-3 gap-2"
        variant="outline"
      >
        <div className="bg-primary/10 p-2 rounded-full">
          <ArrowDownLeft className="text-primary h-5 w-5" />
        </div>
        <span>Receive</span>
      </Button>
      
      <Button
        className="flex flex-col h-auto py-3 gap-2"
        variant="outline"
      >
        <div className="bg-primary/10 p-2 rounded-full">
          <Repeat className="text-primary h-5 w-5" />
        </div>
        <span>Swap</span>
      </Button>
      
      <Button
        className="flex flex-col h-auto py-3 gap-2"
        variant="outline"
      >
        <div className="bg-primary/10 p-2 rounded-full">
          <ShieldCheck className="text-primary h-5 w-5" />
        </div>
        <span>Approve</span>
      </Button>
    </div>
  );
};