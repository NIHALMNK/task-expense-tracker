import { useEffect, useState } from "react";
import type { Expense } from "../types/expense";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense
} from "../services/expenseApi";

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadExpenses = async () => {
    setLoading(true);
    const data = await getExpenses();
    setExpenses(data);
    setLoading(false);
  };

  loadExpenses();
}, []);


  const handleCreate = async () => {
    if (!title.trim() || amount <= 0 || !category.trim()) return;

    const newExpense = await createExpense({
      title,
      amount,
      category
    });

    setExpenses((prev) => [newExpense, ...prev]);
    setTitle("");
    setAmount(0);
    setCategory("");
  };

  const handleUpdate = async (expense: Expense) => {
    const updated = await updateExpense(expense._id, {
      amount: expense.amount + 10 // simple demo update
    });

    setExpenses((prev) =>
      prev.map((e) => (e._id === updated._id ? updated : e))
    );
  };

  const handleDelete = async (id: string) => {
    await deleteExpense(id);
    setExpenses((prev) => prev.filter((e) => e._id !== id));
  };

  if (loading) return <div>Loading expenses...</div>;

  return (
    <div>
      <h2>Expenses</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={handleCreate}>Add Expense</button>

      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            <strong>{expense.title}</strong> – ₹{expense.amount} ({expense.category})
            <button onClick={() => handleUpdate(expense)}>+10</button>
            <button onClick={() => handleDelete(expense._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expenses;
