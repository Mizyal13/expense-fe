import { transactionRepository } from "@/repositories/transactionRepository";
import { Transaction } from "@/entities/transaction";

export const getTransactions = async (): Promise<Transaction[]> => {
  return await transactionRepository.getAll();
};
