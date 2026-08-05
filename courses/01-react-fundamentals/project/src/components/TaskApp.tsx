import type { Dispatch, SetStateAction } from 'react'
import type { Task } from './TaskList'
import TaskList from './TaskList'
import TaskForm from './TaskForm'

interface TaskAppProps {
  tasks?: Task[]
  setTasks?: Dispatch<SetStateAction<Task[]>>
  dispatch?: (action: { type: string; payload?: unknown }) => void
  showForm?: boolean
  countFormat?: string
  showFilterBar?: boolean
  showStatsPanel?: boolean
  onDelete?: (id: string | number) => void
  linkToTaskDetail?: boolean
}

export default function TaskApp({ tasks, setTasks, onDelete }: TaskAppProps) {
  function handleAddTask(task: Task) {
    if (setTasks) {
      setTasks((prev) => [...prev, task]);
    }
  }

  function handleToggle(id: string | number) {
    if (!setTasks) return;

    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
            ...task,
            completed: !task.completed,
          }
          : task
      )
    );
  }

  const completedCount = tasks?.filter(task => task.completed).length;

  return (
    <>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks} countText={`${completedCount} of ${tasks?.length} completed`} onToggle={handleToggle} onDelete={onDelete} />
    </>
  );
}
