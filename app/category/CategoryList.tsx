"use client";

import { useState } from "react";
import { Category } from "../../entities/category";
import { categoryServices } from "../../services/categoryService";
import CategoryEditModal from "./CategoryEditModal";

interface Props {
  categories: Category[];
  onCategoriesUpdate?: (categories: Category[]) => void;
}

export default function CategoryList({
  categories,
  onCategoriesUpdate,
}: Props) {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus kategori ini?")) return;
    try {
      setLoadingId(id);
      await categoryServices.delete(id);
      if (onCategoriesUpdate) {
        const updatedCategories = await categoryServices.getAll();
        onCategoriesUpdate(updatedCategories);
      }
    } catch (err) {
      console.error("Gagal hapus kategori:", err);
      alert("Gagal hapus kategori");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="grid grid-cols-3 font-semibold text-gray-700 px-4">
        <span>Kategori</span>
        <span className="text-center">Tipe</span>
        <span className="text-right mr-15">Aksi</span>
      </div>

      {categories.map((cat) => (
        <div
          key={cat.id}
          className="grid grid-cols-3 items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition"
        >
          {/* Nama Kategori */}
          <span className="font-semibold text-gray-800">
            {cat.nama_kategori}
          </span>

          {/* Tipe di tengah */}
          <span className="text-gray-500 text-sm text-center capitalize">
            {cat.tipe || "-"}
          </span>

          {/* Aksi */}
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setEditingCategory(cat);
                setEditModalOpen(true);
              }}
              className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(cat.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
              disabled={loadingId === cat.id}
            >
              {loadingId === cat.id ? "Menghapus..." : "Hapus"}
            </button>
          </div>
        </div>
      ))}

      {/* Modal Edit */}
      <CategoryEditModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        category={editingCategory}
        onCategoriesUpdate={onCategoriesUpdate}
      />
    </div>
  );
}
