"use client";

import { useState, useEffect } from "react";
import { Category } from "@/entities/category";
import { addTransaction, updateTransaction } from "@/usecase/addTransaction";
import { Transaction } from "@/entities/transaction";

interface Props {
  user: { id: number; username?: string; email?: string };
  categories: Category[];
  type: "pemasukan" | "pengeluaran";
  transaction?: Transaction;
  onSuccess?: () => void;
}

export default function TransactionForm({
  user,
  categories,
  type,
  transaction,
  onSuccess,
}: Props) {
  const [deskripsi, setDeskripsi] = useState(transaction?.deskripsi || "");
  const [jumlah, setJumlah] = useState(transaction?.jumlah || 0);
  const [kategoriId, setKategoriId] = useState(transaction?.kategori?.id || 0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🟢 Form submit triggered");
    console.log("💾 Current form state:", {
      deskripsi,
      jumlah,
      kategoriId,
      tipe: type,
    });
    console.log("👤 User info:", user);

    setLoading(true);

    try {
      const payload = {
        user_id: Number(user.id),
        deskripsi,
        jumlah,
        kategori_id: kategoriId,
        tipe: type,
      };

      console.log(transaction ? "✏️ Update mode" : "➕ Create mode");
      console.log("📤 Payload to send:", payload);

      let res;
      if (transaction) {
        res = await updateTransaction(transaction.id, payload);
      } else {
        res = await addTransaction(payload);
      }

      console.log("📥 API response:", res);

      // Reset form
      setDeskripsi("");
      setJumlah(0);
      setKategoriId(0);
      console.log("🔄 Form reset to initial state");

      onSuccess?.();
      console.log("✅ onSuccess callback executed");
    } catch (err) {
      console.error("❌ Gagal simpan transaksi:", err);
      alert("Gagal simpan transaksi");
    } finally {
      setLoading(false);
      console.log("⏳ Loading state set to false");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow space-y-3"
    >
      <input
        type="text"
        placeholder="Deskripsi"
        value={deskripsi}
        onChange={(e) => {
          setDeskripsi(e.target.value);
          console.log("✏️ Deskripsi changed:", e.target.value);
        }}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Jumlah"
        value={jumlah}
        onChange={(e) => {
          const val = Number(e.target.value);
          setJumlah(val);
          console.log("💰 Jumlah changed:", val);
        }}
        className="w-full p-2 border rounded"
        required
      />
      <select
        value={kategoriId}
        onChange={(e) => {
          const val = Number(e.target.value);
          setKategoriId(val);
          console.log("📂 Kategori changed:", val);
        }}
        className="w-full p-2 border rounded"
        required
      >
        <option value={0}>Pilih Kategori</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nama_kategori} ({cat.tipe})
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        {loading ? "Menyimpan..." : transaction ? "Update" : "Tambah"}
      </button>
    </form>
  );
}
