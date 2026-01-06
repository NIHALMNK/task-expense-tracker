import api from "./api";
import type { Task } from "../types/task";

export const getTasks = async (): Promise<Task[]> => {
  const res = await api.get<Task[]>("/tasks");
  return res.data;
};

export const createTask = async (
  task: Pick<Task, "title" | "description" | "dueDate">
): Promise<Task> => {
  const res = await api.post<Task>("/tasks", task);
  return res.data;
};

export const updateTask = async (
  id: string,
  updates: Partial<Pick<Task, "status" | "title" | "description" | "dueDate">>
): Promise<Task> => {
  const res = await api.put<Task>(`/tasks/${id}`, updates);
  return res.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
