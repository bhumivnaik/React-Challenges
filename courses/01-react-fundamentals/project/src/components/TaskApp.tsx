import type { Dispatch, SetStateAction } from 'react'
import { useState, useEffect, useMemo, useCallback } from 'react'
import type { Task } from './TaskList'
import ErrorBoundary from './ErrorBoundary'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import FilterBar from './FilterBar'
import StatsPanel from './StatsPanel'
import Button from './Button'
import { useTheme } from '../contexts/ThemeContext'
import type { Action } from '../App'
import { ADD_TASK, UPDATE_TASK, TOGGLE_TASK } from '../App'
interface TaskAppProps {
  tasks?: Task[]
  // setTasks ?: Dispatch<SetStateAction<Task[]>>
  // dispatch?: (action: { type: string; payload?: unknown }) => void
  dispatch?: (action: Action) => void;
  showForm?: boolean
  countFormat?: string
  showFilterBar?: boolean
  showStatsPanel?: boolean
  onDelete?: (id: string | number) => void
  onEdit?: (id: string | number) => void
  linkToTaskDetail?: boolean
}

export default function TaskApp({ tasks, dispatch, onDelete, showFilterBar }: TaskAppProps) {
  // function handleAddTask(task: Task) {
  //   if (setTasks) {
  //     setTasks((prev) => [...prev, task]);
  //   }
  // }

  function handleAddTask(task: Task) {
    dispatch?.({
      type: ADD_TASK,
      payload: task,
    });
  }

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  function handleEdit(task: Task) {
    setEditingTask(task);
  }

  // function handleUpdateTask(updatedTask: Task) {
  //   if (!setTasks) return;

  //   setTasks(prev =>
  //     prev.map(task =>
  //       task.id === updatedTask.id
  //         ? updatedTask
  //         : task
  //     )
  //   );

  //   setEditingTask(null);
  // }

  const handleUpdateTask = useCallback((updatedTask: Task) => {
    dispatch?.({
      type: UPDATE_TASK,
      payload: updatedTask,
    });

    setEditingTask(null);
  }, []);



  // function handleToggle(id: string | number) {
  //   if (!setTasks) return;

  //   setTasks(prev => prev.map(task => task.id === id
  //     ? { ...task, completed: !task.completed, } : task
  //   )
  //   );
  // }

  const handleToggle = useCallback((id: string | number) => {
    dispatch?.({
      type: TOGGLE_TASK,
      payload: id,
    });
  }, []);

  // const completedCount = tasks?.filter(task => task.completed).length;
  // const [currentFilter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  // const filteredTasks = useMemo(() => {
  //   currentFilter === "active"
  //     ? tasks?.filter((task) => !task.completed)
  //     : currentFilter === "completed"
  //       ? tasks?.filter((task) => task.completed)
  //       : tasks;
  // }, [tasks, currentFilter]);

  // const [categFilter, setcategFilter] = useState<string>("");
  // const categfilteredTasks = useMemo(() => {
  //   categFilter === "Work"
  //     ? filteredTasks?.filter((task) => task.category === "Work")
  //     : categFilter === "General"
  //       ? filteredTasks?.filter((task) => task.category === "General")
  //       : categFilter === "Personal"
  //         ? filteredTasks?.filter((task) => task.category === "Personal")
  //         : filteredTasks;
  // }, [tasks, categFilter]);

  const [currentFilter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [categFilter, setcategFilter] = useState<string>("");

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    let result = tasks;
    if (currentFilter === "active") {
      result = result.filter((task) => !task.completed);
    } else if (currentFilter === "completed") {
      result = result.filter((task) => task.completed);
    }

    // Category filter
    if (categFilter) {
      result = result.filter((task) => task.category === categFilter);
    }
    return result;
  }, [tasks, currentFilter, categFilter]);

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


  // const filtered = [...(categfilteredTasks ?? [])];
  // const searchTasks = filtered.filter((task) => task.title.toLowerCase().includes(debouncesearchTxt.toLowerCase().trim()) || task.description.toLowerCase().includes(debouncesearchTxt.toLowerCase().trim()));

  const [sortTask, setSort] = useState<"Recently Added" | "Priority: High to Low" | "Priority: Low to High" | "Alphabetical" | "Due Date(Soonest First)">("Recently Added");
  const priorityOrder = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  // const filtered2 = debouncesearchTxt === "" ? filtered : [...(searchTasks ?? [])];
  // const sortedTasks = sortTask === "Priority: High to Low"
  //   ? filtered2.sort((a, b) =>
  //     priorityOrder[b.priority as keyof typeof priorityOrder] -
  //     priorityOrder[a.priority as keyof typeof priorityOrder]
  //   )
  //   : sortTask === "Priority: Low to High" ? filtered2.sort((a, b) =>
  //     priorityOrder[a.priority as keyof typeof priorityOrder] -
  //     priorityOrder[b.priority as keyof typeof priorityOrder]
  //   )
  //     : sortTask === "Alphabetical" ? filtered2.sort((a, b) =>
  //       a.title.toLowerCase().localeCompare(b.title.toLowerCase())
  //     )
  //       : sortTask === "Due Date(Soonest First)" ? filtered2.sort((a, b) => {
  //         if (!a.dueDate && !b.dueDate) return 0;
  //         if (!a.dueDate) return 1;   // tasks without due date go last
  //         if (!b.dueDate) return -1;

  //         return a.dueDate.localeCompare(b.dueDate);
  //       })
  //         : [...filtered2];

  const searchTasks = useMemo(() => {
    const search = debouncesearchTxt.trim().toLowerCase();

    if (search === "") {
      return filteredTasks;
    }

    return filteredTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search)
    );
  }, [filteredTasks, debouncesearchTxt]);

  const sortedTasks = useMemo(() => {
    const result = [...searchTasks];

    if (sortTask === "Priority: High to Low") {
      return result.sort(
        (a, b) =>
          priorityOrder[b.priority as keyof typeof priorityOrder] -
          priorityOrder[a.priority as keyof typeof priorityOrder]
      );
    }

    if (sortTask === "Priority: Low to High") {
      return result.sort(
        (a, b) =>
          priorityOrder[a.priority as keyof typeof priorityOrder] -
          priorityOrder[b.priority as keyof typeof priorityOrder]
      );
    }

    if (sortTask === "Alphabetical") {
      return result.sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
      );
    }

    if (sortTask === "Due Date(Soonest First)") {
      return result.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;

        return a.dueDate.localeCompare(b.dueDate);
      });
    }

    return result;

  }, [searchTasks, sortTask]);

  //Stats calculation using memo
  const { total, completed_count, completedpercent, activecount, overduecount } = useMemo(() => {
    const total = tasks?.length ?? 0;
    const completed_count = tasks?.filter((task) => task.completed).length ?? 0;
    const activecount = tasks?.filter((task) => !task.completed).length ?? 0;
    const completedpercent = total === 0 ? 0 : (completed_count / total) * 100;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const overduecount =
      tasks?.filter((task) => {
        if (task.completed || !task.dueDate) return false;

        const due = new Date(task.dueDate);
        due.setHours(0, 0, 0, 0);

        return due < today;
      }).length ?? 0;
    return { total, completed_count, completedpercent, activecount, overduecount };
  }, [tasks]);

  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div>
        <h2>Task App</h2>
        <Button type="button" onClick={toggleTheme}>{theme == "light" ? "DarkMode" : "Light Mode"}</Button>
      </div>
      <TaskForm onAddTask={handleAddTask} onUpdateTask={handleUpdateTask} editingTask={editingTask} />

      <StatsPanel total={total} completed={completed_count} active={activecount} overdue={overduecount} completedPercentage={completedpercent} />


      {showFilterBar && (
        <FilterBar filter={currentFilter} onFilterChange={setFilter} sort={sortTask} onSortChange={setSort} search={searchTxt} onSearchChange={setSearchTxt} category={categFilter} onCategoryChange={setcategFilter} />
      )}
      {searchTxt !== debouncesearchTxt && (
        <p id="searching-indicator">Searching...</p>
      )}

      <ErrorBoundary>
        <TaskList tasks={sortedTasks} countText={`Showing ${sortedTasks?.length} of ${tasks?.length} tasks`} onToggle={handleToggle} onDelete={onDelete} onEdit={handleEdit} />
      </ErrorBoundary>
    </>
  );
}
