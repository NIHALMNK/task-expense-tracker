import api from "./api";
import type { Expense } from "../types/expense";

export const getExpenses = async (): Promise<Expense[]> => {
  const res = await api.get<Expense[]>("/expenses");
  return res.data;
};

export const createExpense = async (
  expense: Pick<Expense, "title" | "amount" | "category" | "expenseDate">
): Promise<Expense> => {
  const res = await api.post<Expense>("/expenses", expense);
  return res.data;
};

export const updateExpense = async (
  id: string,
  updates: Partial<Pick<Expense, "title" | "amount" | "category" | "expenseDate">>
): Promise<Expense> => {
  const res = await api.put<Expense>(`/expenses/${id}`, updates);
  return res.data;
};

export const deleteExpense = async (id: string): Promise<void> => {
  await api.delete(`/expenses/${id}`);
};
