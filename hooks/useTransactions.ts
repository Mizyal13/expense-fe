import { useState, useEffect } from "react";
import * as transactionService from "@/services/transactionService";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<
    transactionService.Transaction[]
  >([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const data = await transactionService.getTransactions();
      setTransactions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return { transactions, loading, fetchTransactions };
};
