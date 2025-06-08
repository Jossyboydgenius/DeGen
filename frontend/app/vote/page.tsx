import { VotingCard } from '@/components/voting-card';

export default function VotePage() {
  return (
    <div className="container mx-auto max-w-lg p-4 pb-20 mt-10">
      <div className="mb-6 flex items-center justify-between pt-4">
        <h1 className="text-xl font-bold"></h1>
      </div>
      
      <VotingCard />
    </div>
  );
}