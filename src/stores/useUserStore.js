import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      set({ loading: false });
      return;
    }

    try {
      const res = await axios.post("/auth/signup", {
        name,
        email,
        password,
      });

      set({ user: res.data.user, loading: false });
      toast.success("Signup successful!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
      set({ loading: false });
    }
  },
}));
