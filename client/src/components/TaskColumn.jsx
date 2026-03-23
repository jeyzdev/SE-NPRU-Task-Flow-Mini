import TaskItem from "./TaskItem";

export default function TaskColumn({ title, tasks }) {
  return (
    <div className="w-80 bg-base-100 rounded-xl p-4 shadow">
      <h3 className="font-semibold mb-3">{title}</h3>

      <div className="space-y-2 min-h-[200px]">
        {tasks.length === 0 && (
          <p className="text-sm text-gray-400">ไม่มีงาน</p>
        )}

        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}
