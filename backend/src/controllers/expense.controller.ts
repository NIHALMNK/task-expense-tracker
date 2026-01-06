import { Request, Response } from "express";
import mongoose from "mongoose";
import Expense from "../models/Expense.model";

// CREATE EXPENSE----------------->>>>>>>>>>>
export const createExpense = async (req: Request, res: Response) => {
  const { title, amount, category, expenseDate } = req.body;

  if (!title || !amount || !category) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (amount <= 0) {
    return res.status(400).json({ message: "Amount must be greater than zero" });
  }

  const expense = await Expense.create({
    userId: req.user!.id,
    title,
    amount,
    category,
    expenseDate
  });

  res.status(201).json(expense);
};

// GET USER EXPENSES------------------->>>>>>
export const getExpenses = async (req: Request, res: Response) => {
  const expenses = await Expense.find({ userId: req.user!.id }).sort({
    createdAt: -1
  });

  res.status(200).json(expenses);
};

// UPDATE EXPENSE//--------------------->>>
export const updateExpense = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid expense ID" });
  }

  const expense = await Expense.findOne({
    _id: id,
    userId: req.user!.id
  });

  if (!expense) {
    return res.status(404).json({ message: "Expense not found" });
  }

  expense.title = req.body.title ?? expense.title;
  expense.amount = req.body.amount ?? expense.amount;
  expense.category = req.body.category ?? expense.category;
  expense.expenseDate = req.body.expenseDate ?? expense.expenseDate;

  await expense.save();

  res.status(200).json(expense);
};

// DELETE EXPENSE//--------------------------->>>>
export const deleteExpense = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid expense ID" });
  }

  const expense = await Expense.findOneAndDelete({
    _id: id,
    userId: req.user!.id
  });

  if (!expense) {
    return res.status(404).json({ message: "Expense not found" });
  }

  res.status(200).json({ message: "Expense deleted successfully" });
};
