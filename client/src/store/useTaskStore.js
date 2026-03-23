import { create } from "zustand";
import api from "../services/api";
import toast from "react-hot-toast";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  isLoadingTasks: false,
  isCreatingTask: false,
  isUpdatingTask: false,
  isDeletingTask: false,

  // ✅ GET /tasks
  fetchTasks: async () => {
    set({ isLoadingTasks: true });
    try {
      const res = await api.get("/tasks");
      set({ tasks: res.data });
    } catch (e) {
      toast.error(e.response?.data?.message || "โหลด tasks ไม่สำเร็จ");
    } finally {
      set({ isLoadingTasks: false });
    }
  },

  // ✅ POST /tasks
  createTask: async (data) => {
    set({ isCreatingTask: true });
    try {
      const res = await api.post("/tasks", data);

      set({ tasks: [res.data, ...get().tasks] });

      toast.success("เพิ่มงานแล้ว 🎉");
    } catch (e) {
      toast.error(e.response?.data?.message || "เพิ่มงานไม่สำเร็จ");
    } finally {
      set({ isCreatingTask: false });
    }
  },

  // ✅ PUT /tasks/:id
  updateTask: async (id, updates) => {
    set({ isUpdatingTask: true });
    try {
      const res = await api.put(`/tasks/${id}`, updates);

      const updatedTasks = get().tasks.map((t) =>
        t._id === id ? res.data : t,
      );

      set({ tasks: updatedTasks });

      toast.success("อัปเดตแล้ว");
    } catch (e) {
      toast.error(e.response?.data?.message || "อัปเดตไม่สำเร็จ");
    } finally {
      set({ isUpdatingTask: false });
    }
  },

  // ✅ DELETE /tasks/:id
  deleteTask: async (id) => {
    set({ isDeletingTask: true });
    try {
      await api.delete(`/tasks/${id}`);

      const filtered = get().tasks.filter((t) => t._id !== id);
      set({ tasks: filtered });

      toast.success("ลบแล้ว");
    } catch (e) {
      toast.error(e.response?.data?.message || "ลบไม่สำเร็จ");
    } finally {
      set({ isDeletingTask: false });
    }
  },

  // 🔥 helper (optional) ใช้กับ UI แบบ ClickUp
  getTasksByStatus: (status) => {
    return get().tasks.filter((t) => t.status === status);
  },
  updateTaskStatus: async (taskId, newStatus) => {
    const previousTasks = get().tasks;

    // 1. ทำ Optimistic Update (เปลี่ยนสถานะบนจอทันที)
    const updatedTasks = previousTasks.map((t) =>
      t._id === taskId ? { ...t, status: newStatus } : t,
    );
    set({ tasks: updatedTasks });

    try {
      // 2. ส่งไปที่ API (ใช้ _id ใน URL และส่ง status ใน Body)
      const res = await api.put(`/tasks/${taskId}`, { status: newStatus });

      // 3. Sync ข้อมูลจริงจาก Server กลับมา
      set({
        tasks: get().tasks.map((t) => (t._id === taskId ? res.data : t)),
      });
    } catch (e) {
      // 4. ถ้า Error ให้ย้อนกลับ (Rollback)
      set({ tasks: previousTasks });
      toast.error("ย้ายสถานะไม่สำเร็จ");
    }
  },
}));
