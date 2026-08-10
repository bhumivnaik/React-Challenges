import './App.css'
import { useState, useCallback, useEffect, useReducer } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChallengeList from './components/ChallengeList'
import TaskList from './components/TaskList'
import TaskApp from './components/TaskApp'
import TaskDetailPage from './components/TaskDetailPage'
import FetchDemoView from './components/FetchDemoView'
import { ThemeProvider } from './contexts/ThemeContext'
import type { Task } from './components/TaskList'
import { useTheme } from './contexts/ThemeContext'
const INITIAL_TASKS: Task[] = [
  { id: 1, title: 'First Task', description: 'Description one', priority: 'High', completed: false, category: "General" },
  { id: 2, title: 'Second Task', description: 'Description two', priority: 'Medium', completed: false, category: "General" },
  { id: 3, title: 'Third Task', description: 'Description three', priority: 'Low', completed: false, category: "General" },
  { id: 4, title: 'Fourth Task', description: 'Description four', priority: 'Medium', completed: false, category: "General" },
  { id: 5, title: 'Fifth Task', description: 'Description five', priority: 'High', completed: false, category: "General" },
]

export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const TOGGLE_TASK = "TOGGLE_TASK";
export const SET_TASKS = "SET_TASKS";

export type Action = { type: "ADD_TASK", payload: Task } | { type: "UPDATE_TASK", payload: Task } | { type: "DELETE_TASK", payload: string | number } | { type: "TOGGLE_TASK", payload: string | number } | { type: "SET_TASKS", payload: Task[] }

function taskReducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload];

    case UPDATE_TASK:
      return state.map(t => t.id === action.payload.id ? { ...t, ...action.payload } : t);

    case DELETE_TASK:
      return state.filter(t => t.id !== action.payload);

    case TOGGLE_TASK:
      return state.map(t => t.id === action.payload ? { ...t, completed: !t.completed } : t);

    case SET_TASKS:
      return action.payload;

    default:
      return state;
  }

}

function AppContent() {
  // const [tasks, setTasks] = useState<Task[]>(() => {
  //   try {
  //     const data = localStorage.getItem("task-app-tasks");
  //     if (data) {
  //       const response = JSON.parse(data) as Task[];
  //       return response.map((task) => ({
  //         ...task,
  //         category: task.category ?? "General",
  //         tags: task.tags ?? [],
  //       }));
  //     }
  //     return INITIAL_TASKS;
  //   } catch (e) {
  //     console.error("Failed to load tasks:", e);
  //     return INITIAL_TASKS.map((task) => ({
  //       ...task,
  //       category: task.category ?? "General",
  //       tags: task.tags ?? [],
  //     }));
  //   }
  // });

  const [tasks, dispatch] = useReducer(taskReducer, INITIAL_TASKS,
    (initialTasks) => {
      try {
        const savedTasks = localStorage.getItem("task-app-tasks");

        if (!savedTasks) {
          return initialTasks;
        }

        const parsedTasks = JSON.parse(savedTasks) as Task[];

        return parsedTasks.map((task) => ({
          ...task,
          category: task.category ?? "General",
          tags: task.tags ?? [],
        }));
      } catch {
        return initialTasks;
      }
    }
  );


  // const handleDelete = (id: string | number) => {
  //   if (window.confirm('Are you sure?')) {
  //     setTasks((prev) => prev.filter((t) => t.id !== id))
  //   }
  // }

  const handleDelete = useCallback((id: string | number) => {
    if (window.confirm("Are you sure?")) {
      dispatch({
        type: DELETE_TASK, payload: id,
      });
    }
  }
    , []);

  useEffect(() =>
    localStorage.setItem("task-app-tasks", JSON.stringify(tasks))
    , [tasks]);

  const { theme } = useTheme();


  return (
    <BrowserRouter>
      <div className="App" data-theme={theme}>
        <main>
          <Routes>
            <Route path="/" element={<ChallengeList />} />
            <Route path="/challenge/01-static-task-display" element={<TaskList />} />
            <Route path="/challenge/02-dynamic-task-rendering" element={<TaskApp tasks={tasks} /*setTasks={setTasks}*/ dispatch={dispatch} showForm={false} countFormat="tasks" />} />
            <Route path="/challenge/03-adding-new-tasks" element={<TaskApp tasks={tasks} dispatch={dispatch} showForm countFormat="tasks" />} />
            <Route path="/challenge/04-task-completion-toggle" element={<TaskApp tasks={tasks} dispatch={dispatch} showForm countFormat="completed" />} />
            <Route path="/challenge/05-task-deletion" element={<TaskApp tasks={tasks} dispatch={dispatch} showForm countFormat="tasks" onDelete={handleDelete} />} />
            <Route path="/challenge/06-task-filtering" element={<TaskApp tasks={tasks} dispatch={dispatch} showForm countFormat="tasks" showFilterBar />} />
            <Route path="/challenge/07-priority-based-sorting" element={<TaskApp tasks={tasks} dispatch={dispatch} showForm countFormat="tasks" showFilterBar />} />
            <Route path="/challenge/08-task-editing" element={<TaskApp tasks={tasks} dispatch={dispatch} showForm countFormat="tasks" />} />
            <Route path="/challenge/09-search-functionality" element={<TaskApp tasks={tasks} dispatch={dispatch} showForm countFormat="tasks" showFilterBar />} />
            <Route path="/challenge/10-useeffect-local-storage" element={<TaskApp tasks={tasks} dispatch={dispatch} showForm countFormat="tasks" />} />
            <Route path="/challenge/11-useeffect-debounced-search" element={<TaskApp tasks={tasks} dispatch={dispatch} showForm countFormat="tasks" showFilterBar />} />
            <Route path="/challenge/12-categories-and-tags" element={<TaskApp tasks={tasks} dispatch={dispatch} showForm countFormat="tasks" showFilterBar />} />
            <Route path="/challenge/13-due-dates-and-sorting" element={<TaskApp tasks={tasks} dispatch={dispatch} showForm countFormat="tasks" showFilterBar />} />
            <Route path="/challenge/14-task-statistics-dashboard" element={<TaskApp tasks={tasks} dispatch={dispatch} showForm countFormat="tasks" showStatsPanel />} />
            <Route path="/challenge/15-component-organization" element={<TaskApp tasks={tasks} dispatch={dispatch} showForm countFormat="tasks" />} />
            <Route path="/challenge/16-context-api-theme" element={<TaskApp tasks={tasks} dispatch={dispatch} showForm countFormat="tasks" />} />
            <Route path="/challenge/17-custom-hook-uselocalstorage" element={<TaskApp tasks={tasks} dispatch={dispatch} showForm countFormat="tasks" />} />
            <Route path="/challenge/18-usereducer-complex-state" element={<TaskApp tasks={tasks} dispatch={dispatch} showForm countFormat="tasks" />} />
            <Route path="/challenge/19-performance-optimization" element={<TaskApp tasks={tasks} dispatch={dispatch} showForm countFormat="tasks" />} />
            <Route path="/challenge/20-error-boundaries" element={<TaskApp tasks={tasks} dispatch={dispatch} showForm countFormat="tasks" />} />
            <Route path="/challenge/21-react-router" element={<TaskApp tasks={tasks} dispatch={dispatch} showForm countFormat="tasks" linkToTaskDetail />} />
            <Route path="/challenge/21-react-router/task/:id" element={<TaskDetailPage />} />
            <Route path="/challenge/22-data-fetching" element={<FetchDemoView />} />
            <Route path="/challenge/23-useref-focus-management" element={<TaskApp tasks={tasks} dispatch={dispatch} showForm countFormat="tasks" showFilterBar />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
