import { TransactionList } from '@/components/transaction-list';

export default function TransactionsPage() {
  return (
    <div className="container mx-auto max-w-lg p-4 pb-20 mt-14">
      <div className="mb-6 flex items-center justify-between pt-4">
        <h1 className="text-xl font-bold"></h1>
      </div>

      <TransactionList />
    </div>
  );
}