import type { Task } from "./TaskList"

interface TaskCardProps {
  title: string
  description: string
  priority: string
  completed?: boolean
  id: string | number
  category: string
  tags?: string[]
  dueDate?: string
  onToggle?: () => void
  onDelete?: (id: string | number) => void
  onEdit?: (task: Task) => void
}

export default function TaskCard({ title, description, priority, completed, category, tags, onToggle, onDelete, id, onEdit, dueDate }: TaskCardProps) {
  const task: Task = {
    id,
    title,
    description,
    priority,
    completed: completed ?? false,
    category,
    tags,
    dueDate
  };
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = dueDate ? new Date(dueDate) : null;
  if (due) {
    due.setHours(0, 0, 0, 0);
  }

  const diffDays = due ? Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) : null;
  return (

    <article id="task-card" data-completed={completed}>
      {onToggle && (<input type="checkbox" name="complete" checked={completed} onChange={onToggle} />)}

      <div>
        <h2 style={{ textDecoration: completed ? "line-through" : "none" }}>{title} </h2>
        <p style={{ textDecoration: completed ? "line-through" : "none" }}>{description}</p>
        <p>Priority: {priority}</p>
        <p>Category: {category}</p>
        <div id="tasks-tags">
          {tags?.map((tag, index) => (
            <span style={{ marginRight: "8px" }} key={index} data-tag>{tag.trim()}</span>
          ))}
        </div>
        <p id="task-due-date">Due Date: {dueDate ? new Date(dueDate).toLocaleDateString() : "No due date"}</p>
        {!completed && due && diffDays !== null && (
          diffDays < 0 ? (
            <p data-overdue="true">Overdue</p>
          ) : diffDays === 0 ? (
            <p>Due Today</p>
          ) : diffDays <= 3 ? (
            <p>Due Soon</p>
          ) : null
        )}
      </div>
      <div>
        {onDelete && (<button type="button" onClick={() => {
          if (window.confirm("Are you sure?")) {
            onDelete?.(id);
          }
        }}>Delete</button>)}

        <button type="button" onClick={() => onEdit?.(task)}>Edit</button>

      </div>
    </article>
  )
}
