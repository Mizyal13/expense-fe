import { transactionServices } from "@/services/transactionService";
import { Transaction } from "@/entities/transaction";

export const getTransactions = async (): Promise<Transaction[]> => {
  return await transactionServices.getAll();
};
