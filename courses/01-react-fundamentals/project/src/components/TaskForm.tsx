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
      setTagInput(editingTask.tags?.join(", ") ?? "");
      setMsg("");
    }
  }, [editingTask]);

  const [tagInput, setTagInput] = useState("");
  const [newTask, setNewTask] = useState<Task>({
    id: Date.now(),
    title: "",
    description: "",
    priority: "Low",
    completed: false,
    category: "General",
    tags: [],
    dueDate: ""
  });

  const [msg, setMsg] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    if (e.target.name === "tags") {
      const value = e.target.value;
      setTagInput(value);
      const arrtags = value.split(",").map(tag => tag.trim());
      const finaltags = arrtags.filter((tag) => tag !== "");
      setNewTask((prev) => ({ ...prev, [e.target.name]: finaltags }));
    } else {
      setNewTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(newTask);
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
        completed: false,
        category: "General",
        tags: [],
        dueDate: ""
      });
      setMsg("");
      setTagInput("");
    }
    else {
      onUpdateTask?.(newTask);
      setNewTask({
        id: Date.now(),
        title: "",
        description: "",
        priority: "Low",
        completed: false,
        category: "General",
        tags: [],
        dueDate: undefined
      });
      setMsg("");
      clearEditing?.();
      setTagInput("");
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

        <label htmlFor="task-categ">Category:</label>
        <select name="category" value={newTask.category} onChange={handleChange} id="task-categ">
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          {/* <option value="Other">Other</option> */}
        </select><br /><br />
        {/* {
          newTask.category === "Other" ? (<>
            <label htmlFor="task-newcat">New Category</label>
            <input type="text" name="category" value="" onChange={handleChange} id="task-newcat" /><br /><br />
          </>) : null
        } */}

        <label htmlFor="task-tags">Tags:(comma separated)</label>
        <input type="text" name="tags" value={tagInput} onChange={handleChange} id="task-tags" /><br /><br />

        <label htmlFor="date">Date</label>
        <input type="date" id="date" name="dueDate"
          value={newTask.dueDate ?? ""}
          onChange={handleChange} /> <br />

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
              category: "General",
              tags: []
            });
            setMsg("");
          }}>Cancel</button>
        </div>
      </form >
    </>
  );
}
