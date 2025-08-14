"use client";

import { useState } from "react";
import { addCategory } from "@/usecase/addCategories";
import { getCategories } from "@/usecase/getCategories";
import { Category } from "@/entities/category";

interface Props {
  onCategoriesUpdate?: (categories: Category[]) => void;
}

export default function CategoryForm({ onCategoriesUpdate }: Props) {
  const [namaKategori, setNamaKategori] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaKategori) return;
    try {
      await addCategory(namaKategori);
      setNamaKategori("");

      // refresh daftar kategori jika ada callback
      if (onCategoriesUpdate) {
        const categories = await getCategories();
        onCategoriesUpdate(categories);
      }
    } catch (error) {
      console.error("Gagal tambah kategori", error);
      alert("Gagal tambah kategori");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={namaKategori}
        onChange={(e) => setNamaKategori(e.target.value)}
        placeholder="Nama kategori"
        className="border px-3 py-2 rounded flex-1"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Tambah
      </button>
    </form>
  );
}
