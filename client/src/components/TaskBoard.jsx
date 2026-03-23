import { useEffect } from "react";
import TaskColumn from "./TaskColumn";
import TaskForm from "./TaskForm";
import { useTaskStore } from "../store/useTaskStore";

export default function TaskBoard() {
  const { fetchTasks, getTasksByStatus, isLoadingTasks } = useTaskStore();

  const todo = useTaskStore((s) => s.getTasksByStatus("todo"));
  const inProgress = useTaskStore((s) => s.getTasksByStatus("in_progress"));
  const done = useTaskStore((s) => s.getTasksByStatus("done"));

  useEffect(() => {
    fetchTasks();
  }, []);

  if (isLoadingTasks) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="flex-1 p-6 overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      <TaskForm />

      <div className="flex gap-4 mt-4">
        <TaskColumn title="To Do" tasks={todo} status="todo" />
        <TaskColumn
          title="In Progress"
          tasks={inProgress}
          status="in_progress"
        />
        <TaskColumn title="Done" tasks={done} status="done" />
      </div>
    </div>
  );
}
