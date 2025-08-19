"use client";

import { Transaction } from "@/entities/transaction";
import { FaMoneyBillWave, FaPiggyBank, FaChartLine } from "react-icons/fa";

interface Props {
  transactions: Transaction[];
}

export default function IsiDashboard({ transactions }: Props) {
  const totalPemasukan = transactions
    .filter(
      (tx) => tx.tipe === "pemasukan" || (tx.tipe === null && tx.jumlah >= 0)
    )
    .reduce((sum, tx) => sum + tx.jumlah, 0);

  const totalPengeluaran = transactions
    .filter(
      (tx) => tx.tipe === "pengeluaran" || (tx.tipe === null && tx.jumlah < 0)
    )
    .reduce((sum, tx) => sum + tx.jumlah, 0);

  const saldo = totalPemasukan + totalPengeluaran;

  const formatRupiah = (number: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Greeting */}
      <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-6 rounded-lg shadow-lg text-white">
        <h1 className="text-3xl font-bold mb-2">👋 Halo, selamat datang!</h1>
        <p className="text-lg">
          Lihat ringkasan keuanganmu dan jangan lupa hemat 💰
        </p>
      </div>

      {/* Ringkasan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 p-5 rounded-xl shadow hover:scale-105 transition transform flex flex-col items-center">
          <FaMoneyBillWave className="text-green-600 text-3xl mb-2" />
          <h2 className="font-semibold text-lg">Total Pemasukan</h2>
          <p className="text-green-700 font-bold text-xl">
            {formatRupiah(totalPemasukan)}
          </p>
        </div>
        <div className="bg-red-100 p-5 rounded-xl shadow hover:scale-105 transition transform flex flex-col items-center">
          <FaPiggyBank className="text-red-600 text-3xl mb-2" />
          <h2 className="font-semibold text-lg">Total Pengeluaran</h2>
          <p className="text-red-700 font-bold text-xl">
            {formatRupiah(totalPengeluaran)}
          </p>
        </div>
        <div className="bg-blue-100 p-5 rounded-xl shadow hover:scale-105 transition transform flex flex-col items-center">
          <FaChartLine className="text-blue-600 text-3xl mb-2" />
          <h2 className="font-semibold text-lg">Saldo</h2>
          <p className="text-blue-700 font-bold text-xl">
            {formatRupiah(saldo)}
          </p>
        </div>
      </div>

      {/* Motivasi */}
      <div className="bg-yellow-100 p-4 rounded-lg shadow text-yellow-800 font-medium text-center animate-pulse">
        🎉 Mantap! Minggu ini kamu berhasil menabung{" "}
        {formatRupiah(totalPemasukan + totalPengeluaran)}!
      </div>
    </div>
  );
}
