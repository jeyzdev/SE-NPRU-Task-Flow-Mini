import { Circle, CheckCircle2, Loader2, Trash2 } from "lucide-react";
import { useTaskStore } from "../store/useTaskStore";

export default function TaskItem({ task }) {
  const { updateTask, deleteTask } = useTaskStore();

  const nextStatus = {
    todo: "in_progress",
    in_progress: "done",
    done: "todo",
  };

  const icons = {
    todo: <Circle size={16} />,
    in_progress: <Loader2 size={16} />,
    done: <CheckCircle2 size={16} />,
  };

  return (
    <div className="group p-3 bg-base-200 rounded-lg flex items-center justify-between hover:bg-base-300">
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            updateTask(task._id, {
              status: nextStatus[task.status],
            })
          }
        >
          {icons[task.status]}
        </button>

        <span className="text-sm">{task.title}</span>
      </div>

      <button
        className="opacity-0 group-hover:opacity-100"
        onClick={() => deleteTask(task._id)}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
