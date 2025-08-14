"use client";

import { useState, useEffect } from "react";
import { Category } from "@/entities/category";
import { categoryServices } from "@/services/categoryService";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
  onCategoriesUpdate?: (categories: Category[]) => void;
}

export default function CategoryEditModal({
  isOpen,
  onClose,
  category,
  onCategoriesUpdate,
}: Props) {
  const [namaKategori, setNamaKategori] = useState("");
  const [tipe, setTipe] = useState<"pemasukan" | "pengeluaran">("pengeluaran");
  const [loading, setLoading] = useState(false);

  // Set form ketika modal terbuka atau category berubah
  useEffect(() => {
    if (category) {
      setNamaKategori(category.nama_kategori);
      setTipe(category.tipe);
    }
  }, [category]);

  if (!isOpen || !category) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await categoryServices.update(category.id, namaKategori, tipe);

      // Refresh list kategori
      if (onCategoriesUpdate) {
        const cats = await categoryServices.getAll();
        onCategoriesUpdate(cats);
      }

      onClose();
    } catch (err) {
      console.error("Gagal update kategori", err);
      alert("Gagal update kategori");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Kategori</h2>
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
              className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
