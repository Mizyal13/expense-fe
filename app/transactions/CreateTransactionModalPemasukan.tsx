"use client";

import TransactionForm from "./TransactionForm";
import { Transaction } from "@/entities/transaction";
import { Category } from "@/entities/category";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  user: { id: number; username?: string; email?: string } | null;
  onAddTransaction: (tx: Transaction) => void;
}

export default function CreateTransactionModalPemasukan({
  isOpen,
  onClose,
  categories,
  user,
  onAddTransaction,
}: Props) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">Tambah Pemasukan</h2>
        <TransactionForm
          user={user}
          categories={categories}
          type="pemasukan"
          onSuccess={onClose}
          onAddTransaction={onAddTransaction}
        />
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-300 py-2 rounded hover:bg-gray-400 transition"
        >
          Batal
        </button>
      </div>
    </div>
  );
}
