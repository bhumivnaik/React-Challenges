import { useParams, useNavigate } from "react-router-dom";
import Button from "./Button";
import type { Task } from "./TaskList";

export default function TaskDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const data = localStorage.getItem("task-app-tasks");
  const tasks = data ? JSON.parse(data) : [];
  const task_detail = tasks.find((task: Task) => String(task.id) === id);


  return (
    <>
      <div id="task-detail-page">
        <div style={{}}>
          {task_detail ? (
            <div>
              <h2>{task_detail.title}</h2>
              <p>{task_detail.description}</p>
              <p>{task_detail.priority}</p>
            </div>
          ) : (
            <h2>Task not found</h2>
          )}

        </div>
        <button id="task-detail-back" type="button" onClick={() => navigate('/challenge/21-react-router')}>Back to list</button>
      </div>
    </>
  );
}
