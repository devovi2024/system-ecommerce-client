import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    set({ loading: true });

    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      set({ user: res.data.user });
      toast.success("Signup successful!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      set({ loading: false });
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data.user });
      toast.success("Login successful!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
      toast.success("Logged out");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  },

  checkAuth: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/auth/profile");
      set({ user: res.data });
    } catch (err) {
      set({ user: null });
    } finally {
      set({ checkingAuth: false, loading: false });
    }
  },

  fetchProfile: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/auth/profile");
      set((state) => ({ user: { ...state.user, ...res.data } }));
    } catch (err) {
      toast.error("Failed to fetch profile");
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  updateProfile: async (updatedData) => {
    set({ loading: true });
    try {
      const res = await axios.put("/auth/profile", updatedData);
      set((state) => ({ user: { ...state.user, ...res.data.user } }));
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Profile update failed");
      console.error("Update error:", err);
    } finally {
      set({ loading: false });
    }
  },
}));
