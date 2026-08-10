import type { Task } from "./TaskList"
import Button from "./Button"
import Badge from "./Badge"
import StatusIndicator from "./StatusIndicator"
import React from "react"
import { useNavigate, Link } from "react-router-dom";

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

function TaskCard({ title, description, priority, completed, category, tags, onToggle, onDelete, id, onEdit, dueDate }: TaskCardProps) {
  const navigate = useNavigate();
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
        <Badge variant="priority">Priority: {priority}</Badge>
        <Badge variant="priority">Category: {category}</Badge>
        <div id="tasks-tags">
          {tags?.map((tag, index) => (
            <span style={{ marginRight: "8px" }} key={index} data-tag>{tag.trim()}</span>
          ))}
        </div>
        <p id="task-due-date">Due Date: {dueDate ? new Date(dueDate).toLocaleDateString() : "No due date"}</p>
        {!completed && due && diffDays !== null && (
          diffDays < 0 ? (
            <StatusIndicator status="overdue" />
            // <p data-overdue="true">Overdue</p>
          ) : diffDays === 0 ? (
            <StatusIndicator status="due-today" />
          ) : diffDays <= 3 ? (
            <StatusIndicator status="due-soon" />
          ) : null
        )}
      </div>
      <div>
        {onDelete && (<Button type="button" onClick={() => {
          if (window.confirm("Are you sure?")) {
            onDelete?.(id);
          }
        }}>Delete</Button>)}

        <Button type="button" onClick={() => onEdit?.(task)}>Edit</Button>
        {/* <Button type="button" onClick={() => navigate(`/challenge/21-react-router/task/${task.id}`)}>Details</Button> */}

        <Link to={`/challenge/21-react-router/task/${task.id}`}>
          <Button type="button">Details</Button>
        </Link>


      </div>
    </article>
  )
}

export default React.memo(TaskCard);
