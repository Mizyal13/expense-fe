import { transactionServices } from "@/services/transactionService";
import { Transaction } from "@/entities/transaction";

export const addTransaction = async (data: {
  deskripsi: string;
  jumlah: number;
  kategori_id: number;
  tipe: "pemasukan" | "pengeluaran";
  tanggal?: string;
}): Promise<Transaction> => {
  console.log("📤 addTransaction dikirim ke backend:", data); // <-- log kiriman
  return await transactionServices.add(data);
};

export const updateTransaction = async (
  id: number,
  data: {
    user_id: number;
    deskripsi?: string;
    jumlah?: number;
    kategori_id?: number;
    tipe?: "pemasukan" | "pengeluaran";
    tanggal?: string;
  }
): Promise<Transaction> => {
  console.log("📤 updateTransaction ID:", id); // <-- log ID
  console.log("📤 updateTransaction Data:", data); // <-- log data
  return await transactionServices.update(id, data);
};
