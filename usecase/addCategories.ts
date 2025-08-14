import { categoryRepository } from "@/repositories/categoryRepository";
import { Category } from "@/entities/category";

export const addCategory = async (nama_kategori: string): Promise<Category> => {
  return await categoryRepository.add(nama_kategori);
};
