import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useCategoryStore = create((set) => ({
  // State variables
  categories: [],
  loading: false,
  error: null,

  // Fetch all categories from the server
  fetchCategories: async () => {
    try {
      set({ loading: true });
      const res = await axios.get("/categories");
      set({ categories: res.data.categories, loading: false });
    } catch (error) {
      toast.error("Failed to fetch categories");
      set({ error: error.message, loading: false });
    }
  },

  // Create a new category with the given name
  createCategory: async (name) => {
    try {
      set({ loading: true });
      const res = await axios.post("/categories", { name });
      set((state) => ({
        categories: [...state.categories, res.data],
        loading: false,
      }));
      toast.success("Category created");
    } catch (error) {
      toast.error("Failed to create category");
      set({ error: error.message, loading: false });
    }
  },

  // Update an existing category's name by ID
  updateCategory: async (id, name) => {
    try {
      set({ loading: true });
      const res = await axios.put(`/categories/${id}`, { name });
      set((state) => ({
        categories: state.categories.map((cat) =>
          cat._id === id ? res.data : cat
        ),
        loading: false,
      }));
      toast.success("Category updated");
    } catch (error) {
      toast.error("Failed to update category");
      set({ error: error.message, loading: false });
    }
  },

  // Delete a category by its ID
  deleteCategory: async (id) => {
    try {
      set({ loading: true });
      await axios.delete(`/categories/${id}`);
      set((state) => ({
        categories: state.categories.filter((cat) => cat._id !== id),
        loading: false,
      }));
      toast.success("Category deleted");
    } catch (error) {
      toast.error("Failed to delete category");
      set({ error: error.message, loading: false });
    }
  },
}));
