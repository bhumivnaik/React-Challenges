import type { Dispatch, SetStateAction } from 'react'
import { useState, useEffect } from 'react'
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

  const [categFilter, setcategFilter] = useState<string>("");
  const categfilteredTasks = categFilter === "Work"
    ? filteredTasks?.filter((task) => task.category === "Work")
    : categFilter === "General"
      ? filteredTasks?.filter((task) => task.category === "General")
      : categFilter === "Personal"
        ? filteredTasks?.filter((task) => task.category === "Personal")
        : filteredTasks;


  const [searchTxt, setSearchTxt] = useState<string>("");
  const [debouncesearchTxt, setdebounceSearchTxt] = useState<string>("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setdebounceSearchTxt(searchTxt)
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [searchTxt]);


  const filtered = [...(categfilteredTasks ?? [])];
  const searchTasks = filtered.filter((task) => task.title.toLowerCase().includes(debouncesearchTxt.toLowerCase().trim()) || task.description.toLowerCase().includes(debouncesearchTxt.toLowerCase().trim()));

  const [sortTask, setSort] = useState<"Recently Added" | "Priority: High to Low" | "Priority: Low to High" | "Alphabetical" | "Due Date(Soonest First)">("Recently Added");
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
        : sortTask === "Due Date(Soonest First)" ? filtered2.sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;   // tasks without due date go last
          if (!b.dueDate) return -1;

          return a.dueDate.localeCompare(b.dueDate);
        })
          : [...filtered2];

  return (
    <>
      <TaskForm onAddTask={handleAddTask} onUpdateTask={handleUpdateTask} editingTask={editingTask} />
      {showFilterBar && (
        <FilterBar filter={currentFilter} onFilterChange={setFilter} sort={sortTask} onSortChange={setSort} search={searchTxt} onSearchChange={setSearchTxt} category={categFilter} onCategoryChange={setcategFilter} />
      )}
      {searchTxt !== debouncesearchTxt && (
        <p id="searching-indicator">Searching...</p>
      )}
      <TaskList tasks={sortedTasks} countText={`Showing ${sortedTasks?.length} of ${tasks?.length} tasks`} onToggle={handleToggle} onDelete={onDelete} onEdit={handleEdit} />
    </>
  );
}
