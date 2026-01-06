import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskApi";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      setLoading(false);
    };

    fetchTasks();
  }, []);

  const handleCreate = async () => {
    if (!title.trim()) return;
    const newTask = await createTask({ title });
    setTasks((prev) => [newTask, ...prev]);
    setTitle("");
  };

  const toggleStatus = async (task: Task) => {
    const updated = await updateTask(task._id, {
      status: task.status === "pending" ? "completed" : "pending",
    });

    setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  if (loading) return <div>Loading tasks...</div>;

  return (
    <div>
      <h2>Tasks</h2>

      <input
        placeholder="New task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleCreate}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span
              style={{
                textDecoration:
                  task.status === "completed" ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => toggleStatus(task)}
            >
              {task.title}
            </span>
            <button onClick={() => handleDelete(task._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
