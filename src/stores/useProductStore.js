import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/products", productData);
      set((state) => ({
        products: [...(state.products || []), res.data.product],
        loading: false,
      }));
      toast.success("Product created successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create product.");
      set({ loading: false });
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/products");
      set({ products: response.data.products || [], loading: false });
      toast.success("Products fetched successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch products.");
      set({ loading: false });
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/products/${productId}`);
      set((state) => ({
        products: state.products.filter((p) => p._id !== productId),
        loading: false,
      }));
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product.");
      set({ loading: false });
    }
  },

  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.patch(`/products/${productId}`);
      const updatedFeatured = response.data.featured;
      set((state) => ({
        products: state.products.map((p) =>
          p._id === productId ? { ...p, featured: updatedFeatured } : p
        ),
        loading: false,
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to toggle featured.");
      set({ loading: false });
    }
  },


fetchProductsByCategory: async (category) => {
  set({ loading: true });
  try {
    const response = await axiosInstance.get(`/products/category/${category}`);
    console.log("API Response:", response.data);

    const data = Array.isArray(response.data) ? response.data : response.data.products;
    set({ products: data || [], loading: false });
  } catch (error) {
    set({ loading: false });
    console.error(error);
  }
},



}));
