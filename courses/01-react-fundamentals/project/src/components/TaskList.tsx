import TaskCard from "./TaskCard";

export interface Task {
  id: string | number
  title: string
  description: string
  priority: string
  completed: boolean
  category?: string
  tags?: string[]
  dueDate?: string | number
}

interface TaskListProps {
  tasks?: Task[]
  countText?: string
  onToggle?: (id: string | number) => void
  onDelete?: (id: string | number) => void
  onEdit?: (task: Task) => void
  linkToTaskDetail?: boolean
}

export default function TaskList({ tasks, countText, onToggle, onDelete, onEdit }: TaskListProps) {
  return (
    <section id="task-list">
      <h3 id="task-count">{countText}</h3>
      {
        tasks?.map((task) => (
          <TaskCard key={task.id}
            title={task.title}
            id={task.id}
            description={task.description}
            priority={task.priority}
            completed={task.completed}
            onToggle={onToggle ? () => onToggle(task.id) : undefined}
            onDelete={onDelete}
            onEdit={onEdit} />
        ))
      }
      {tasks?.length === 0 && (
        <p id="filter-empty-message">
          No tasks match this filter
        </p>
      )}
    </section>)
}
