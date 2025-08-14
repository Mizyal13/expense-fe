import api from "@/lib/axios";
import { Category } from "@/entities/category";

export const categoryServices = {
  getAll: async (): Promise<Category[]> => {
    const res = await api.get("/categories");
    return res.data.categories || [];
  },

  delete: async (id: number) => {
    const res = await api.delete(`/categories/${id}`);
    return res.data;
  },

  add: async (nama_kategori: string, tipe: string): Promise<Category> => {
    const res = await api.post("/categories", { nama_kategori, tipe });
    return res.data.category;
  },

  update: async (
    id: number,
    nama_kategori: string,
    tipe: string
  ): Promise<Category> => {
    const res = await api.put(`/categories/${id}`, { nama_kategori, tipe });
    return res.data.category;
  },
};
