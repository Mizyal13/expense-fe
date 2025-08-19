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

export default function CreateTransactionModalPengeluaran({
  isOpen,
  onClose,
  categories,
  user,
  onAddTransaction,
}: Props) {
  if (!isOpen) return null; // Modal tidak tampil jika isOpen = false

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">Tambah Pengeluaran</h2>
        <TransactionForm
          categories={categories}
          type="pengeluaran"
          onSuccess={onClose}
          user={user!}
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
