import {
  Circle,
  CheckCircle2,
  Clock,
  Tag,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { useTaskStore } from "../store/useTaskStore";

export default function TaskItem({ task, provided, snapshot }) {
  const { updateTask, deleteTask } = useTaskStore();

  // ฟังก์ชันสลับสถานะ Done/Not Done
  const toggleComplete = () => {
    const newStatus = task.status === "done" ? "todo" : "done";
    updateTask(task._id, {
      status: newStatus,
      isCompleted: newStatus === "done",
    });
  };

  // สีของ Priority
  const priorityConfig = {
    high: "text-error bg-error/10",
    medium: "text-warning bg-warning/10",
    low: "text-success bg-success/10",
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`bg-base-100 p-4 mb-3 rounded-xl shadow-sm border border-base-300 group transition-all ${
        snapshot.isDragging
          ? "shadow-2xl ring-2 ring-primary rotate-1 z-50"
          : "hover:border-primary/50"
      }`}
    >
      {/* Header: Status & Title */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={toggleComplete}
            className="mt-1 text-base-content/30 hover:text-primary transition-colors"
          >
            {task.status === "done" ? (
              <CheckCircle2 className="text-success" size={20} />
            ) : (
              <Circle size={20} />
            )}
          </button>

          <div className="flex flex-col">
            <span
              className={`font-semibold leading-tight ${task.status === "done" ? "line-through text-base-content/50" : ""}`}
            >
              {task.title}
            </span>
            {task.description && (
              <p className="text-xs text-base-content/60 mt-1 line-clamp-2">
                {task.description}
              </p>
            )}
          </div>
        </div>

        {/* Delete Button (Show on hover) */}
        <button
          onClick={() => deleteTask(task._id)}
          className="text-base-content/20 hover:text-error opacity-0 group-hover:opacity-100 transition-all"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Footer: Tags & Info */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {/* Priority Badge */}
        <div
          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1 ${priorityConfig[task.priority]}`}
        >
          <AlertCircle size={10} />
          {task.priority}
        </div>

        {/* Due Date */}
        {task.dueDate && (
          <div className="flex items-center gap-1 text-[10px] text-base-content/50">
            <Clock size={10} />
            {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}

        {/* Tags */}
        {task.tags &&
          task.tags.map((tag, i) => (
            <div
              key={i}
              className="flex items-center gap-1 text-[10px] bg-base-200 px-2 py-0.5 rounded text-base-content/70"
            >
              <Tag size={10} />
              {tag}
            </div>
          ))}
      </div>
    </div>
  );
}
