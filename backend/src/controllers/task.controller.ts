import { Request, Response } from "express";
import Task from "../models/Task.model";

// CREATE TASK-------------------->>>
export const createTask = async (req: Request, res: Response) => {
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
};

// GET ALL USER TASKS------------------->>>>
export const getTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find({ userId: req.user!.id }).sort({
    createdAt: -1
  });

  res.status(200).json(tasks);
};

// UPDATE TASK-------------------->>>>
export const updateTask = async (req: Request, res: Response) => {
  const task = await Task.findOne({
    _id: req.params.id,
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
};

// DELETE TASK----------------->>>>
export const deleteTask = async (req: Request, res: Response) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user!.id
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json({ message: "Task deleted successfully" });
};
