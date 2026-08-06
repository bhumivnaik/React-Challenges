import { useState, useEffect } from "react";
import type { Task } from "./TaskList";

interface TaskFormProps {
  onAddTask?: (task: Task) => void
  onUpdateTask?: (task: Task) => void
  editingTask?: Task | null;
  clearEditing?: () => void
}

export default function TaskForm({ onAddTask, onUpdateTask, editingTask, clearEditing }: TaskFormProps) {
  useEffect(() => {
    if (editingTask) {
      setNewTask(editingTask);
      setMsg("");
    }
  }, [editingTask]);

  const [newTask, setNewTask] = useState<Task>({
    id: Date.now(),
    title: "",
    description: "",
    priority: "Low",
    completed: false
  });

  const [msg, setMsg] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setNewTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (newTask.title === "") {
      setMsg("Title is Required");
      return;
    }
    if (!editingTask) {
      onAddTask?.(newTask);
      setNewTask({
        id: Date.now(),
        title: "",
        description: "",
        priority: "Low",
        completed: false
      });
      setMsg("");
    }
    else {
      onUpdateTask?.(newTask);
      setNewTask({
        id: Date.now(),
        title: "",
        description: "",
        priority: "Low",
        completed: false
      });
      setMsg("");
      clearEditing?.();
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} id="task-form">


        <h2>{editingTask ? "Edit Task" : "Add New Task"}</h2>
        <label htmlFor="task-title">Title:</label>
        <input type="text" name="title" value={newTask.title} onChange={handleChange} id="task-title" /><br /><br />

        <label htmlFor="task-desc">Description:</label>
        <input type="text" name="description" value={newTask.description} onChange={handleChange} id="task-desc" /><br /><br />

        <label htmlFor="task-prior">Priority:</label>
        <select name="priority" value={newTask.priority} onChange={handleChange} id="task-prior">
          <option value="High">High</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
        </select><br /><br />
        <p id="task-form-error">{msg}</p><br />
        <div style={{ display: "flex", gap: 20 }}>
          <button type="submit" >{editingTask ? "Edit Task" : "Add New Task"}</button>
          <button type="button" onClick={() => {
            clearEditing?.();
            setNewTask({
              id: Date.now(),
              title: "",
              description: "",
              priority: "Low",
              completed: false,
            });
            setMsg("");
          }}>Cancel</button>
        </div>
      </form >
    </>
  );
}
