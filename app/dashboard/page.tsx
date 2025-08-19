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
import Laporan from "../transactions/Laporan";
import Content from "./Content";

interface User {
  id: number;
  username?: string;
  email?: string;
}
interface PageProps {
  transaction: any[];
}

export default function DashboardPage({ transaction }: PageProps) {
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

  // Ambil data user
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
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const txs = await getTransactions(); // ambil semua transaksi user
        const mappedTransactions: Transaction[] = txs.map((tx: any) => ({
          ...tx,
          tipe: tx.tipe || (tx.jumlah >= 0 ? "pemasukan" : "pengeluaran"),
          kategori: tx.categories
            ? {
                id: tx.categories.id,
                nama_kategori: tx.categories.nama_kategori,
              }
            : undefined,
        }));
        setTransactions(mappedTransactions);
      } catch (error) {
        console.error("Gagal ambil transaksi", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      router.push("/login");
    } catch (error) {
      console.error("Logout gagal", error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 flex text-black">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
          <div className="mb-8 text-center">
            <img
              className="w-16 h-16 mx-auto mb-2"
              src="image.png"
              alt="Logo"
            />
            <h2 className="font-bold text-lg">
              {user?.username || user?.email || "Loading..."}
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

        {/* Main content */}
        <main className="flex-1 p-6">
          {activeMenu === "dashboard" && (
            <Content transactions={transactions} />
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
              {user && (
                <CreateTransactionModalPemasukan
                  isOpen={openPemasukan}
                  onClose={() => setOpenPemasukan(false)}
                  categories={categories}
                  user={{ ...user, id: Number(user.id) }}
                  onAddTransaction={(newTx: Transaction) =>
                    setTransactions((prev) => [...prev, newTx])
                  }
                />
              )}
              <ListPemasukan
                transactions={transactions.filter(
                  (tx) => tx.tipe === "pemasukan"
                )}
                categories={categories}
                onTransactionsUpdate={setTransactions}
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
              {user && (
                <CreateTransactionModalPengeluaran
                  isOpen={openPengeluaran}
                  onClose={() => setOpenPengeluaran(false)}
                  categories={categories}
                  user={{ ...user, id: Number(user.id) }}
                  onAddTransaction={(newTx: Transaction) =>
                    setTransactions((prev) => [...prev, newTx])
                  }
                />
              )}
              <ListPengeluaran
                transactions={transactions.filter(
                  (tx) => tx.tipe === "pengeluaran"
                )}
                categories={categories}
                onTransactionsUpdate={setTransactions}
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
                onCategoriesUpdate={setCategories}
              />
              <CategoryList
                categories={categories}
                onCategoriesUpdate={setCategories}
              />
            </>
          )}

          {activeMenu === "laporan" && <Laporan userId={user?.id || 0} />}
        </main>
      </div>
    </ProtectedRoute>
  );
}
