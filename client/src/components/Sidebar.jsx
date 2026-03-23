import { ListTodo, CheckCircle2, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export default function Sidebar() {
  const { logOut, authUser } = useAuthStore();

if (!authUser) {
  return (
    <div className="w-64 border-r p-4 flex justify-center">
      <span className="loading loading-spinner"></span>
    </div>
  );
}

  return (
    <div className="w-64 bg-base-100 border-r p-4 flex flex-col h-screen sticky top-0">
      {/* ส่วนบน: Logo & Menu */}
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-6 px-4 italic text-primary">
          My Workspace
        </h2>

        <ul className="menu menu-md p-0 gap-1">
          <li>
            <a className="active flex gap-3 py-3 rounded-lg">
              <ListTodo size={20} />
              <span className="font-medium text-sm">All Tasks</span>
            </a>
          </li>
          <li>
            <a className="flex gap-3 py-3 hover:bg-base-200 rounded-lg transition-colors">
              <CheckCircle2 size={20} />
              <span className="font-medium text-sm text-base-content/70">
                Completed
              </span>
            </a>
          </li>
        </ul>
      </div>

      {/* ส่วนล่าง: User Profile with Logout Icon */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between group p-2 rounded-xl hover:bg-base-200/50 transition-all">
          <div className="flex items-center gap-3 overflow-hidden">
            {/* Avatar Section */}
            <div className="avatar placeholder shrink-0">
              <div className="bg-primary text-primary-content rounded-full w-9 h-9 ring-2 ring-primary/20">
                {authUser?.profilePic ? (
                  <img src={authUser.profilePic} alt="profile" />
                ) : (
                  <span className="text-sm font-bold uppercase">
                    {authUser?.fullName?.charAt(0) || "U"}
                  </span>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="flex flex-col overflow-hidden">
              <span className="font-bold text-sm truncate uppercase tracking-tight">
                {authUser?.fullName}
              </span>
              <span className="text-[10px] text-base-content/50 truncate">
                {authUser?.email}
              </span>
            </div>
          </div>

          {/* Logout Icon Button */}
          <button
            onClick={logOut}
            className="btn btn-ghost btn-circle btn-sm text-base-content/40 hover:text-error hover:bg-error/10 transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
