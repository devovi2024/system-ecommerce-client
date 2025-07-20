import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
  products: [],
  selectedProduct: null,
  loading: false,

  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/products", productData);
      set((prev) => ({
        products: [...prev.products, res.data],
        loading: false,
      }));
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to create product");
      set({ loading: false });
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/products");
      set({ products: res.data.products, loading: false });
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch products");
      set({ loading: false });
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/products/${id}`);
      set({ selectedProduct: res.data, loading: false });
    } catch (error) {
      toast.error(error.response?.data?.error || "Product not found");
      set({ selectedProduct: null, loading: false });
    }
  },

  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/products/category/${category}`);
      set({ products: res.data.products, loading: false });
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch category");
      set({ loading: false });
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axios.delete(`/products/${productId}`);
      set((prev) => ({
        products: prev.products.filter((p) => p._id !== productId),
        loading: false,
      }));
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to delete");
      set({ loading: false });
    }
  },

  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`/products/${productId}`);
      set((prev) => ({
        products: prev.products.map((p) =>
          p._id === productId ? { ...p, isFeatured: res.data.isFeatured } : p
        ),
        loading: false,
      }));
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to toggle featured");
      set({ loading: false });
    }
  },

  fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/products/featured");
      set({ products: res.data, loading: false });
    } catch (error) {
      toast.error("Failed to fetch featured products");
      set({ loading: false });
    }
  },
}));
