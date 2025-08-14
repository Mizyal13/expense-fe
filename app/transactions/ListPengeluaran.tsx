"use client";

import { Transaction } from "@/entities/transaction";
import { Category } from "@/entities/category";

interface Props {
  transactions: Transaction[];
  categories: Category[];
  onTransactionsUpdate: (transactions: Transaction[]) => void;
  onEdit: (tx: Transaction) => void; // ✅ callback untuk edit
}

export default function ListPengeluaran({
  transactions,
  categories,
  onTransactionsUpdate,
  onEdit,
}: Props) {
  // Filter transaksi pengeluaran (jumlah < 0)
  const pengeluaran = transactions.filter((tx) => tx.jumlah < 0);

  return (
    <div className="space-y-2">
      {pengeluaran.length === 0 ? (
        <p>Belum ada pengeluaran.</p>
      ) : (
        pengeluaran.map((tx) => (
          <div
            key={tx.id}
            className="grid grid-cols-5 gap-4 bg-white p-2 rounded shadow items-center"
          >
            <span>{tx.deskripsi}</span>
            <span>{tx.kategori?.nama_kategori}</span>
            <span className="text-red-600">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(tx.jumlah)}
            </span>
            <span className="text-gray-400 text-sm">{tx.tanggal}</span>
            <span className="flex gap-2">
              <button
                className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500 transition"
                onClick={() => onEdit(tx)} // ✅ panggil callback edit
              >
                Edit
              </button>
            </span>
          </div>
        ))
      )}
    </div>
  );
}
