"use client";

import { useState } from "react";
import { Category } from "@/entities/category";
import { categoryServices } from "../../services/categoryService";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCategoriesUpdate?: (categories: Category[]) => void;
}

export default function CategoryModal({
  isOpen,
  onClose,
  onCategoriesUpdate,
}: Props) {
  const [namaKategori, setNamaKategori] = useState("");
  const [tipe, setTipe] = useState<"pemasukan" | "pengeluaran">("pengeluaran");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaKategori) return;

    try {
      setLoading(true);
      await categoryServices.add(namaKategori, tipe);
      setNamaKategori("");
      setTipe("pengeluaran");
      if (onCategoriesUpdate) {
        const cats = await categoryServices.getAll();
        onCategoriesUpdate(cats);
      }
      onClose(); // tutup modal setelah submit
    } catch (err) {
      console.error("Gagal tambah kategori", err);
      alert("Gagal tambah kategori");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Tambah Kategori</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nama kategori"
            className="border px-3 py-2 rounded w-full"
            value={namaKategori}
            onChange={(e) => setNamaKategori(e.target.value)}
            disabled={loading}
          />
          <select
            value={tipe}
            onChange={(e) =>
              setTipe(e.target.value as "pemasukan" | "pengeluaran")
            }
            className="border px-3 py-2 rounded w-full"
            disabled={loading}
          >
            <option value="pemasukan">Pemasukan</option>
            <option value="pengeluaran">Pengeluaran</option>
          </select>
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border hover:bg-gray-100"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
              disabled={loading}
            >
              {loading ? "Menambah..." : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
