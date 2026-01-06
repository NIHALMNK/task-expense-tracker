import { Request, Response } from "express";
import mongoose from "mongoose";
import Task from "../models/Task.model";
import { asyncHandler } from "../utils/asyncHandler";

// CREATE TASK
export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const task = await Task.create({
    userId: req.user!.id,
    title,
    description,
    dueDate
  });

  res.status(201).json(task);
});

// GET ALL USER TASKS
export const getTasks = asyncHandler(async (req: Request, res: Response) => {
  const tasks = await Task.find({ userId: req.user!.id });
  res.status(200).json(tasks);
});

// UPDATE TASK
export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  // 🔐 ID VALIDATION (this was missing)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  const task = await Task.findOne({
    _id: id,
    userId: req.user!.id
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = req.body.title ?? task.title;
  task.description = req.body.description ?? task.description;
  task.status = req.body.status ?? task.status;
  task.dueDate = req.body.dueDate ?? task.dueDate;

  await task.save();

  res.status(200).json(task);
});

// DELETE TASK
export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  // 🔐 ID VALIDATION (this was missing)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  const task = await Task.findOneAndDelete({
    _id: id,
    userId: req.user!.id
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json({ message: "Task deleted successfully" });
});
