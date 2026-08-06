import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import type { Task } from './TaskList'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import FilterBar from './FilterBar'

interface TaskAppProps {
  tasks?: Task[]
  setTasks?: Dispatch<SetStateAction<Task[]>>
  dispatch?: (action: { type: string; payload?: unknown }) => void
  showForm?: boolean
  countFormat?: string
  showFilterBar?: boolean
  showStatsPanel?: boolean
  onDelete?: (id: string | number) => void
  onEdit?: (id: string | number) => void
  linkToTaskDetail?: boolean
}

export default function TaskApp({ tasks, setTasks, onDelete, showFilterBar }: TaskAppProps) {
  function handleAddTask(task: Task) {
    if (setTasks) {
      setTasks((prev) => [...prev, task]);
    }
  }

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  function handleEdit(task: Task) {
    setEditingTask(task);
  }

  function handleUpdateTask(updatedTask: Task) {
    if (!setTasks) return;

    setTasks(prev =>
      prev.map(task =>
        task.id === updatedTask.id
          ? updatedTask
          : task
      )
    );

    setEditingTask(null);
  }

  function handleToggle(id: string | number) {
    if (!setTasks) return;

    setTasks(prev => prev.map(task => task.id === id
      ? { ...task, completed: !task.completed, } : task
    )
    );
  }

  // const completedCount = tasks?.filter(task => task.completed).length;
  const [currentFilter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const filteredTasks = currentFilter === "active"
    ? tasks?.filter((task) => !task.completed)
    : currentFilter === "completed"
      ? tasks?.filter((task) => task.completed)
      : tasks;


  const [searchTxt, setSearchTxt] = useState<string>("");


  const filtered = [...(filteredTasks ?? [])];
  const searchTasks = filtered.filter((task) => task.title.toLowerCase().includes(searchTxt.toLowerCase().trim()) || task.description.toLowerCase().includes(searchTxt.toLowerCase().trim()));

  const [sortTask, setSort] = useState<"Recently Added" | "Priority: High to Low" | "Priority: Low to High" | "Alphabetical">("Recently Added");
  const priorityOrder = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  const filtered2 = searchTxt === "" ? filtered : [...(searchTasks ?? [])];
  const sortedTasks = sortTask === "Priority: High to Low"
    ? filtered2.sort((a, b) =>
      priorityOrder[b.priority as keyof typeof priorityOrder] -
      priorityOrder[a.priority as keyof typeof priorityOrder]
    )
    : sortTask === "Priority: Low to High" ? filtered2.sort((a, b) =>
      priorityOrder[a.priority as keyof typeof priorityOrder] -
      priorityOrder[b.priority as keyof typeof priorityOrder]
    )
      : sortTask === "Alphabetical" ? filtered2.sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
      )
        : [...filtered2];

  return (
    <>
      <TaskForm onAddTask={handleAddTask} onUpdateTask={handleUpdateTask} editingTask={editingTask} />
      {showFilterBar && (
        <FilterBar filter={currentFilter} onFilterChange={setFilter} sort={sortTask} onSortChange={setSort} search={searchTxt} onSearchChange={setSearchTxt} />
      )}
      <TaskList tasks={sortedTasks} countText={`Showing ${sortedTasks?.length} of ${tasks?.length} tasks`} onToggle={handleToggle} onDelete={onDelete} onEdit={handleEdit} />
    </>
  );
}
