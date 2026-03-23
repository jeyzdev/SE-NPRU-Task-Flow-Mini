import Sidebar from "../components/Sidebar";
import TaskBoard from "../components/TaskBoard";

export default function Home() {
  return (
    <div className="flex h-screen bg-base-200">
      <Sidebar />
      <TaskBoard />
    </div>
  );
}
