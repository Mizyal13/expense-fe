"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Transaction } from "@/entities/transaction";
import { Category } from "@/entities/category";

interface Props {
  transactions: Transaction[];
  categories: Category[];
  onTransactionsUpdate: (transactions: Transaction[]) => void;
}

const MySwal = withReactContent(Swal);

export default function ListPengeluaran({
  transactions,
  categories,
  onTransactionsUpdate,
}: Props) {
  // Filter transaksi pengeluaran
  const pengeluaran = transactions.filter(
    (tx) => tx.tipe === "pengeluaran" || (tx.tipe === null && tx.jumlah < 0)
  );

  if (pengeluaran.length === 0) {
    return <p className="text-gray-500">Belum ada pengeluaran.</p>;
  }

  const formatRupiah = (number: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);

  // Handle hapus transaksi dengan SweetAlert2
  const handleDelete = (txId: number) => {
    MySwal.fire({
      title: "Hapus Transaksi?",
      text: "Apakah Anda yakin ingin menghapus transaksi ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        onTransactionsUpdate(transactions.filter((t) => t.id !== txId));
        MySwal.fire("Terhapus!", "Transaksi berhasil dihapus.", "success");
      }
    });
  };

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="grid grid-cols-6 gap-4 font-semibold mb-2 text-gray-700">
        <span>Deskripsi</span>
        <span>Kategori</span>
        <span>Jumlah</span>
        <span>Tanggal</span>
        <span>Waktu</span>
        <span>Aksi</span>
      </div>

      {pengeluaran.map((tx) => {
        const dateObj = new Date(tx.tanggal);
        const tanggal = dateObj.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        const waktu = dateObj.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Jakarta",
        });

        return (
          <div
            key={tx.id}
            className="grid grid-cols-6 gap-4 bg-white p-2 rounded shadow items-center hover:shadow-md transition"
          >
            <span>{tx.deskripsi}</span>
            <span>{tx.kategori?.nama_kategori}</span>
            <span className="text-red-600 font-semibold">
              {formatRupiah(tx.jumlah)}
            </span>
            <span className="text-gray-400 text-sm">{tanggal}</span>
            <span className="text-gray-400 text-sm">{waktu}</span>
            <span className="flex gap-2">
              {/* Tombol Hapus */}
              <button
                onClick={() => handleDelete(tx.id)}
                className="p-2 rounded bg-red-500 hover:bg-red-600 text-white transition flex items-center"
                aria-label="Hapus"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </span>
          </div>
        );
      })}
    </div>
  );
}
