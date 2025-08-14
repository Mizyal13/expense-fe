import api from "@/lib/axios";
import { Transaction } from "@/entities/transaction";

export const transactionServices = {
  getAll: async (): Promise<Transaction[]> => {
    const res = await api.get("/transactions");
    return res.data.transactions || [];
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
