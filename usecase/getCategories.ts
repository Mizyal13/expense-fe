import { categoryRepository } from "@/repositories/categoryRepository";
import { Category } from "@/entities/category";

export const getCategories = async (): Promise<Category[]> => {
  return await categoryRepository.getAll();
};
