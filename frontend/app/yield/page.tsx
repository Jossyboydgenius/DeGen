import { YieldCard } from '@/components/yield-card';

export default function YieldPage() {
  return (
    <div className="container mx-auto max-w-lg p-4 pb-20">
      <div className="mb-6 flex items-center justify-between pt-4">
        <h1 className="text-xl font-bold">Yield Farming</h1>
      </div>
      
      <YieldCard />
    </div>
  );
}