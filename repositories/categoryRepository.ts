import api from "@/lib/axios";
import { Category } from "@/entities/category";

export const categoryRepository = {
  getAll: async (): Promise<Category[]> => {
    const res = await api.get("/categories");
    return res.data.categories || [];
  },

  add: async (nama_kategori: string): Promise<Category> => {
    const res = await api.post("/categories", { nama_kategori });
    return res.data.category;
  },
};
