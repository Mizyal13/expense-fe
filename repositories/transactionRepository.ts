import api from "@/lib/axios";
import { Transaction } from "@/entities/transaction";

export const transactionRepository = {
  getAll: async (): Promise<Transaction[]> => {
    const res = await api.get("/transactions");
    return res.data.transactions || [];
  },
  add: async (data: {
    deskripsi: string;
    jumlah: number;
    kategori_id: number;
    tanggal: string;
  }) => {
    await api.post("/transactions", data);
  },
};
