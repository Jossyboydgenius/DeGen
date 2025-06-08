import { VerifySection } from '@/components/verify-section';

export default function VerifyPage() {
  return (
    <div className="container mx-auto max-w-lg p-4 pb-20 mt-20">
      <div className="mb-6 flex items-center justify-between pt-4">
        <h1 className="text-xl font-bold"></h1>
      </div>
      
      <VerifySection />
    </div>
  );
}