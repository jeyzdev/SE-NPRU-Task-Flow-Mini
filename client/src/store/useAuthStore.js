import { create } from "zustand";
import api from "../services/api";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isLoggingIn: false,
  isSigningUp: false,
  isUpdatingProfile: false,
  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await api.post("/auth/register", data);
      set({ authUser: response.data });
      get().connectSocket();
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
      set({ authUser: response.data });
      get().connectSocket();
      toast.success("Logged in successfully!");
    } catch (e) {
      toast.error(e.response.data.message || "Log in Failed");
      set({ authUser: null });
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logOut: async () => {
    try {
      const response = await api.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
      toast.success(response.data.message);
    } catch (e) {
      toast.error(e.response.data.message || "Log Out failed");
    }
  },
  checkAuth: async () => {
    try {
      const response = await api.get("/auth/me");
      set({ authUser: response.data });
      get().connectSocket();
    } catch (e) {
      console.error("Error in check Auth", e);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await api.put(`/users/update-profile`, data);
      set({ authUser: response.data.user });
      toast(response.data.message);
    } catch (e) {
      toast.error(e.response.data.message || "Update Profile failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

}));
