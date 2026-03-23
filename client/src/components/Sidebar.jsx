import { ListTodo, CheckCircle2 } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-base-100 border-r p-4">
      <h2 className="text-xl font-bold mb-6">My Workspace</h2>

      <ul className="menu">
        <li>
          <a className="active">
            <ListTodo size={18} />
            All Tasks
          </a>
        </li>
        <li>
          <a>
            <CheckCircle2 size={18} />
            Completed
          </a>
        </li>
      </ul>
    </div>
  );
}
