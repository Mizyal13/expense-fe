import { transactionServices } from "@/services/transactionService";

export const deleteTransaction = async (id: number) => {
  return await transactionServices.delete(id);
};
