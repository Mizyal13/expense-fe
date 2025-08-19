"use client";

import { useState, useEffect } from "react";
import { Transaction } from "@/entities/transaction";
import { transactionServices } from "@/services/transactionService";
import Swal from "sweetalert2";
import { ChartBarIcon } from "@heroicons/react/24/outline";

interface Props {
  userId: number;
}

export default function Laporan({ userId }: Props) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "pemasukan" | "pengeluaran" | "total"
  >("pemasukan");
  const [collapsedDays, setCollapsedDays] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await transactionServices.getAll();
        setTransactions(
          data.map((tx) => ({
            ...tx,
            tipe: tx.tipe || (tx.jumlah >= 0 ? "pemasukan" : "pengeluaran"),
          }))
        );
      } catch (err) {
        console.error("Gagal mengambil transaksi:", err);
        Swal.fire("Error", "Gagal mengambil transaksi", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [userId]);

  const formatRupiah = (number: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);

  const formatTanggal = (dateString: string) => {
    const d = new Date(dateString);
    return {
      tanggal: d.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
      waktu: d.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Jakarta",
      }),
      bulan: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
    };
  };

  const filteredTransactions =
    activeTab === "total"
      ? transactions
      : transactions.filter((tx) => tx.tipe === activeTab);

  const transactionsPerHari: Record<string, Transaction[]> = {};
  filteredTransactions.forEach((tx) => {
    const { tanggal } = formatTanggal(tx.tanggal);
    if (!transactionsPerHari[tanggal]) transactionsPerHari[tanggal] = [];
    transactionsPerHari[tanggal].push(tx);
  });

  const totalPerBulanByType = (txs: Transaction[]) => {
    const result: Record<string, { pemasukan: number; pengeluaran: number }> =
      {};
    txs.forEach((tx) => {
      const { bulan } = formatTanggal(tx.tanggal);
      if (!result[bulan]) result[bulan] = { pemasukan: 0, pengeluaran: 0 };
      if (tx.tipe === "pemasukan") result[bulan].pemasukan += tx.jumlah;
      else if (tx.tipe === "pengeluaran")
        result[bulan].pengeluaran += tx.jumlah;
    });
    return result;
  };

  const totalPemasukan = transactions
    .filter((tx) => tx.tipe === "pemasukan")
    .reduce((sum, tx) => sum + tx.jumlah, 0);

  const totalPengeluaran = transactions
    .filter((tx) => tx.tipe === "pengeluaran")
    .reduce((sum, tx) => sum + tx.jumlah, 0);

  const saldoBersih = totalPemasukan - Math.abs(totalPengeluaran);

  if (loading) return <p>Loading...</p>;
  if (transactions.length === 0) return <p>Belum ada transaksi.</p>;

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Yakin hapus transaksi?",
      text: "Data transaksi yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await transactionServices.delete(id);
        setTransactions(transactions.filter((t) => t.id !== id));
        Swal.fire("Terhapus!", "Transaksi berhasil dihapus.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Gagal menghapus transaksi.", "error");
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <ChartBarIcon className="w-6 h-6 text-blue-500" /> Laporan Transaksi
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        {["pemasukan", "pengeluaran", "total"].map((tab) => (
          <button
            key={tab}
            className={`flex items-center gap-1 px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition`}
            onClick={() =>
              setActiveTab(tab as "pemasukan" | "pengeluaran" | "total")
            }
          >
            {tab === "pemasukan" && "💚"}
            {tab === "pengeluaran" && "❤️"}
            {tab === "total" && "📊"}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Total Bulanan */}
      <div className="bg-gray-50 p-4 rounded shadow space-y-2">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <ChartBarIcon className="w-5 h-5 text-blue-500" /> Total per Bulan
        </h3>
        {Object.entries(totalPerBulanByType(transactions)).map(
          ([bln, totals]) => (
            <p key={bln} className="text-sm">
              {bln} -
              <span className="text-green-600">
                {" "}
                Pemasukan: {formatRupiah(totals.pemasukan)}
              </span>
              ,
              <span className="text-red-600">
                {" "}
                Pengeluaran: {formatRupiah(Math.abs(totals.pengeluaran))}
              </span>
              , Saldo:{" "}
              <span
                className={
                  totals.pemasukan - Math.abs(totals.pengeluaran) >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {formatRupiah(totals.pemasukan - Math.abs(totals.pengeluaran))}
              </span>
            </p>
          )
        )}
      </div>

      {/* Summary Total Keseluruhan */}
      {activeTab === "total" && (
        <div className="bg-gray-50 p-4 rounded shadow space-y-2">
          <p className="font-semibold">
            Total Pemasukan:{" "}
            <span className="text-green-600">
              {formatRupiah(totalPemasukan)}
            </span>
          </p>
          <p className="font-semibold">
            Total Pengeluaran:{" "}
            <span className="text-red-600">
              {formatRupiah(Math.abs(totalPengeluaran))}
            </span>
          </p>
          <p className="font-semibold">
            Saldo Bersih:{" "}
            <span
              className={saldoBersih >= 0 ? "text-green-600" : "text-red-600"}
            >
              {formatRupiah(saldoBersih)}
            </span>
          </p>
        </div>
      )}

      {/* Transactions per day */}
      {activeTab !== "total" &&
        Object.entries(transactionsPerHari).map(([tanggal, txs]) => {
          const totalHari = txs.reduce((sum, tx) => sum + tx.jumlah, 0);
          const isCollapsed = !collapsedDays[tanggal];

          return (
            <div key={tanggal} className="bg-gray-50 p-3 rounded-lg shadow">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() =>
                  setCollapsedDays((prev) => ({
                    ...prev,
                    [tanggal]: !prev[tanggal],
                  }))
                }
              >
                <h2 className="font-semibold text-lg">{tanggal}</h2>
                <span
                  className={totalHari >= 0 ? "text-green-600" : "text-red-600"}
                >
                  Total: {formatRupiah(totalHari)}
                </span>
              </div>

              {!isCollapsed && (
                <div className="mt-2 space-y-2">
                  <div className="grid grid-cols-5 gap-4 font-semibold text-gray-700 px-2">
                    <span>Deskripsi</span>
                    <span>Kategori</span>
                    <span>Jumlah</span>
                    <span>Tanggal</span>
                    <span>Waktu</span>
                  </div>

                  {txs.map((tx) => {
                    const { tanggal, waktu } = formatTanggal(tx.tanggal);
                    return (
                      <div
                        key={tx.id}
                        className="grid grid-cols-5 gap-4 bg-white p-2 rounded shadow items-center hover:shadow-md transition"
                      >
                        <span>{tx.deskripsi}</span>
                        <span>{tx.kategori?.nama_kategori || "-"}</span>
                        <span
                          className={
                            tx.jumlah >= 0 ? "text-green-600" : "text-red-600"
                          }
                        >
                          {formatRupiah(tx.jumlah)}
                        </span>
                        <span className="text-gray-400 text-sm">{tanggal}</span>
                        <span className="text-gray-400 text-sm">{waktu}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}
