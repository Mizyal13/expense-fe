export interface Transaction {
  id: number;
  user_id: number;
  deskripsi: string;
  jumlah: number;
  tanggal: string;
  tipe: "pemasukan" | "pengeluaran";
  kategori?: { id: number; nama_kategori: string };
}
