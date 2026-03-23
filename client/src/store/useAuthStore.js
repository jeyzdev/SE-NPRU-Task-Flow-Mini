import { create } from "zustand";
import api from "../services/api";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isLoggingIn: false,
  isSigningUp: false,
  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await api.post("/auth/register", data);
      set({ authUser: response.data });
      toast.success("Account created successfully!");
    } catch (e) {
      toast.error(e.response.data.message || "Sign Up failed");
      set({ authUser: null });
    } finally {
      set({ isSigningUp: false });
    }
  },
  logIn: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await api.post("/auth/login", data);

      // 1. เก็บข้อมูลเบื้องต้นที่ได้จาก Login (เช่น token หรือ user พื้นฐาน)
      set({ authUser: response.data });

      // 2. เรียกเช็ค Auth อีกรอบทันทีเพื่อให้ได้ข้อมูล Profile ที่สมบูรณ์
      // และรอให้มันทำงานเสร็จก่อน (await) เพื่อให้ State นิ่ง
      await get().checkAuth();

      toast.success("Logged in successfully!");
    } catch (e) {
      toast.error(e.response?.data?.message || "Log in Failed");
      set({ authUser: null });
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logOut: async () => {
    try {
      const response = await api.post("/auth/logout");
      set({ authUser: null });
      toast.success(response.data.message);
    } catch (e) {
      toast.error(e.response.data.message || "Log Out failed");
    }
  },
  checkAuth: async () => {
    try {
      const response = await api.get("/auth/me");
      set({ authUser: response.data });
    } catch (e) {
      console.error("Error in check Auth", e);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
