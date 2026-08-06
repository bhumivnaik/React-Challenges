import type { Task } from "./TaskList"

interface TaskCardProps {
  title: string
  description: string
  priority: string
  completed?: boolean
  id: string | number
  onToggle?: () => void
  onDelete?: (id: string | number) => void
  onEdit?: (task: Task) => void
}

export default function TaskCard({ title, description, priority, completed, onToggle, onDelete, id, onEdit }: TaskCardProps) {
  const task: Task = {
    id,
    title,
    description,
    priority,
    completed: completed ?? false,
  };
  return (
    <article id="task-card" data-completed={completed}>
      {onToggle && (<input type="checkbox" name="complete" checked={completed} onChange={onToggle} />)}

      <div>
        <h2 style={{ textDecoration: completed ? "line-through" : "none" }}>{title} </h2>
        <p style={{ textDecoration: completed ? "line-through" : "none" }}>{description}</p>
        <p>Priority: {priority}</p>
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
