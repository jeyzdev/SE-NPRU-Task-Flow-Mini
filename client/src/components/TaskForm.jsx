import { useState } from "react";
import { Plus } from "lucide-react";
import { useTaskStore } from "../store/useTaskStore";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const { createTask, isCreatingTask } = useTaskStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    createTask({ title });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="input input-bordered w-full"
        placeholder="เพิ่มงาน..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button className="btn btn-primary" disabled={isCreatingTask}>
        <Plus size={18} />
      </button>
    </form>
  );
}
