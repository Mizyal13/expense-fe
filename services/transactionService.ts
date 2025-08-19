import api from "@/lib/axios";
import { Transaction } from "@/entities/transaction";

export const transactionServices = {
  getAll: async (): Promise<Transaction[]> => {
    const res = await api.get("/transactions");
    console.log("data get:", res);
    res.data.transactions || [];

    const mappedTransactions: Transaction[] = res.data.map((tx: any) => ({
      id: tx.id,
      user_id: tx.user_id,
      deskripsi: tx.deskripsi,
      jumlah: tx.jumlah,
      tanggal: tx.tanggal,
      tipe: tx.tipe || (tx.jumlah >= 0 ? "pemasukan" : "pengeluaran"),
      kategori: tx.categories
        ? { id: tx.categories.id, nama_kategori: tx.categories.nama_kategori }
        : undefined,
    }));

    return mappedTransactions;
  },

  add: async (data: {
    deskripsi: string;
    jumlah: number;
    kategori_id: number;
    tanggal?: string;
  }): Promise<Transaction> => {
    console.log("📤 Sending transaction data:", data); // log sebelum kirim

    const res = await api.post("/transactions", data);

    console.log("📥 Received API response:", res.data);
    return res.data.transaction;
  },

  update: async (
    id: number,
    data: {
      deskripsi?: string;
      jumlah?: number;
      kategori_id?: number;
      tanggal?: string;
    }
  ): Promise<Transaction> => {
    const res = await api.put(`/transactions/${id}`, data);
    return res.data.transaction;
  },

  delete: async (id: number) => {
    const res = await api.delete(`/transactions/${id}`);
    return res.data;
  },
};
