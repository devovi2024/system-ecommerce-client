import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set) => ({
  products: [],
  featuredProducts: [],
  selectedProduct: null,
  relatedProducts: [],
  peopleAlsoBought: [],
  topRated: [],
  loading: false,
  error: null,

  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post("/products", productData);
      set((state) => ({
        products: [...state.products, res.data],
        loading: false,
        error: null,
      }));
      toast.success("Product created successfully!");
    } catch (error) {
      set({ loading: false, error: error.response?.data?.error || "Failed to create product" });
      toast.error(error.response?.data?.error || "Failed to create product");
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/products");
      set({ products: res.data.products, loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: error.response?.data?.error || "Failed to fetch products" });
      toast.error(error.response?.data?.error || "Failed to fetch products");
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/products/${id}`);
      set({ selectedProduct: res.data, loading: false, error: null });
    } catch (error) {
      set({ selectedProduct: null, loading: false, error: error.response?.data?.error || "Product not found" });
      toast.error(error.response?.data?.error || "Product not found");
    }
  },

  fetchProductsByCategory: async (category) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/products/category/${category}`);
      set({ products: res.data.products, loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: error.response?.data?.error || "Failed to fetch category" });
      toast.error(error.response?.data?.error || "Failed to fetch category");
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/products/${productId}`);
      set((state) => ({
        products: state.products.filter((p) => p._id !== productId),
        loading: false,
        error: null,
      }));
      toast.success("Product deleted");
    } catch (error) {
      set({ loading: false, error: error.response?.data?.error || "Failed to delete" });
      toast.error(error.response?.data?.error || "Failed to delete");
    }
  },

  toggleFeaturedProduct: async (productId) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.patch(`/products/${productId}`);
      set((state) => ({
        products: state.products.map((p) =>
          p._id === productId ? { ...p, isFeatured: res.data.isFeatured } : p
        ),
        loading: false,
        error: null,
      }));
      toast.success("Featured status toggled");
    } catch (error) {
      set({ loading: false, error: error.response?.data?.error || "Failed to toggle featured" });
      toast.error(error.response?.data?.error || "Failed to toggle featured");
    }
  },

  fetchFeaturedProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/products/featured");
      set({ featuredProducts: res.data, loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: "Failed to fetch featured products" });
      toast.error("Failed to fetch featured products");
    }
  },

  fetchRelatedProducts: async (productId) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/products/related/${productId}`);
      set({ relatedProducts: res.data.relatedProducts, loading: false });
    } catch (error) {
      set({ loading: false, error: "Failed to fetch related products" });
      toast.error("Failed to fetch related products");
    }
  },

  fetchPeopleAlsoBought: async (productId) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/products/people-also-bought/${productId}`);
      set({ peopleAlsoBought: res.data.peopleAlsoBought || [], loading: false });
    } catch (error) {
      set({ loading: false, error: error.response?.data?.error || "Failed to fetch people also bought" });
      toast.error(error.response?.data?.error || "Failed to fetch people also bought");
    }
  },

fetchTopRated: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/products/top-rated");
      set({ topRated: res.data.products, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error", loading: false });
      toast.error(err.response?.data?.message || "Failed to fetch top-rated");
    }
  },
}));
