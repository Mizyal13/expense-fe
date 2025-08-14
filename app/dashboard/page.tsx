"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../components/protectedRoute";
import api from "@/lib/axios";
import { getCategories } from "@/usecase/getCategories";
import { getTransactions } from "@/usecase/getTransactions";
import { Category } from "@/entities/category";
import { Transaction } from "@/entities/transaction";
import CategoryModal from "../category/CategoryModal";
import CategoryList from "../category/CategoryList";
import { transactionServices } from "@/services/transactionService";
import ListPemasukan from "../transactions/ListPemasukan";
import ListPengeluaran from "../transactions/ListPengeluaran";
import CreateTransactionModalPemasukan from "../transactions/CreateTransactionModalPemasukan";
import CreateTransactionModalPengeluaran from "../transactions/CreateTransactionModalPengeluaran";

interface User {
  id: string;
  username?: string;
  email: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);

  const [openPemasukan, setOpenPemasukan] = useState(false);
  const [openPengeluaran, setOpenPengeluaran] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState<
    "dashboard" | "pemasukan" | "pengeluaran" | "kategori" | "laporan"
  >("dashboard");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (error) {
        console.error("Gagal ambil data user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await getCategories();
      setCategories(cats);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (activeMenu === "laporan") {
      const fetchTransactions = async () => {
        setLoading(true);
        try {
          const txs = await getTransactions();
          setTransactions(txs);
        } catch (error) {
          console.error("Gagal ambil transaksi", error);
        } finally {
          setLoading(false);
        }
      };
      fetchTransactions();
    }
  }, [activeMenu]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      router.push("/login");
    } catch (error) {
      console.log("Logout gagal", error);
    }
  };

  const formatRupiah = (number: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 flex text-black">
        <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
          <div className="mb-8 text-center">
            <img
              className="w-16 h-16 mx-auto mb-2"
              src="image.png"
              alt="Logo"
            />
            <h2 className="font-bold text-lg">
              {user ? user.username || user.email : "Loading..."}
            </h2>
          </div>
          <nav className="flex flex-col gap-2 flex-1">
            {[
              "dashboard",
              "pemasukan",
              "pengeluaran",
              "kategori",
              "laporan",
            ].map((menu) => (
              <button
                key={menu}
                onClick={() => setActiveMenu(menu as any)}
                className={`text-left px-3 py-2 rounded hover:bg-gray-200 transition ${
                  activeMenu === menu ? "bg-gray-200 font-semibold" : ""
                }`}
              >
                {menu.charAt(0).toUpperCase() + menu.slice(1)}
              </button>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            className="mt-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </aside>

        <main className="flex-1 p-6">
          {activeMenu === "dashboard" && (
            <>
              <h1 className="text-2xl font-bold mb-4">
                Selamat datang di Dashboard
              </h1>
              <p>
                Pilih menu di sidebar untuk mengelola transaksi atau melihat
                laporan.
              </p>
            </>
          )}
          {activeMenu === "pemasukan" && (
            <>
              <h1 className="text-2xl font-bold mb-4">Tambah Pemasukan</h1>
              <button
                onClick={() => setOpenPemasukan(true)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                + Pemasukan
              </button>
              <CreateTransactionModalPemasukan
                isOpen={openPemasukan}
                onClose={() => setOpenPemasukan(false)}
                categories={categories}
              />
              <ListPemasukan
                transactions={transactions}
                categories={categories}
                onTransactionsUpdate={setTransactions}
                onEdit={(tx) => {}}
              />
            </>
          )}

          {activeMenu === "pengeluaran" && (
            <>
              <h1 className="text-2xl font-bold mb-4">Tambah Pengeluaran</h1>

              <button
                onClick={() => setOpenPengeluaran(true)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                - Pengeluaran
              </button>
              <CreateTransactionModalPengeluaran
                isOpen={openPengeluaran}
                onClose={() => setOpenPengeluaran(false)}
                categories={categories}
              />
              <ListPengeluaran
                transactions={transactions}
                categories={categories}
                onTransactionsUpdate={setTransactions}
                onEdit={(tx) => {}}
              />
            </>
          )}

          {activeMenu === "kategori" && (
            <>
              <h1 className="text-2xl font-bold mb-4">Kategori</h1>
              <button
                onClick={() => setCategoryModalOpen(true)}
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Tambah Kategori
              </button>
              <CategoryModal
                isOpen={isCategoryModalOpen}
                onClose={() => setCategoryModalOpen(false)}
                onCategoriesUpdate={(cats) => setCategories(cats)}
              />

              <CategoryList
                categories={categories}
                onCategoriesUpdate={(cats) => setCategories(cats)}
              />
            </>
          )}

          {activeMenu === "laporan" && (
            <>
              <h1 className="text-3xl font-bold mb-6">Daftar Transaksi</h1>
              {loading ? (
                <p>Loading...</p>
              ) : transactions.length === 0 ? (
                <p>Belum ada transaksi.</p>
              ) : (
                <div className="space-y-2">
                  <div className="grid grid-cols-5 gap-4 font-semibold mb-2">
                    <span>Deskripsi</span>
                    <span>Kategori</span>
                    <span>Jumlah</span>
                    <span>Tanggal</span>
                    <span>Aksi</span>
                  </div>
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="grid grid-cols-5 gap-4 bg-white p-2 rounded shadow items-center"
                    >
                      <span>{tx.deskripsi}</span>
                      <span>{tx.kategori?.nama_kategori}</span>
                      <span
                        className={
                          tx.jumlah >= 0 ? "text-green-600" : "text-red-600"
                        }
                      >
                        {formatRupiah(tx.jumlah)}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {tx.tanggal}
                      </span>
                      <span className="flex gap-2">
                        <button
                          className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500 transition"
                          onClick={() => {}}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                          onClick={async () => {
                            if (
                              !confirm("Yakin ingin menghapus transaksi ini?")
                            )
                              return;
                            try {
                              await transactionServices.delete(tx.id);
                              const updated = await getTransactions();
                              setTransactions(updated);
                            } catch (err) {
                              console.error("Gagal hapus transaksi", err);
                              alert("Gagal hapus transaksi");
                            }
                          }}
                        >
                          Hapus
                        </button>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
