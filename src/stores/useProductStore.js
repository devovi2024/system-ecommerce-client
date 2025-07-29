import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set) => ({
  products: [],
  discountedProducts: [],
  featuredProducts: [],
  selectedProduct: null,
  relatedProducts: [],
  peopleAlsoBought: [],
  topRated: [],
  loading: false,
  error: null,

  setProducts: (products) => set({ products }),

  fetchAllProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/products");
      set({ products: res.data.products, loading: false });
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Failed to fetch products" });
      toast.error("Failed to fetch products");
    }
  },

  fetchDiscountedProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/products/discounted");
      set({ discountedProducts: res.data.products, loading: false });
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Failed to fetch discounted products" });
      toast.error("Failed to fetch discounted products");
    }
  },

  fetchFeaturedProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/products/featured");
      const unique = Array.from(new Map(res.data.map(p => [p._id, p])).values());
      set({ featuredProducts: unique, loading: false });
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Failed to fetch featured products" });
      toast.error("Failed to fetch featured products");
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/products/${id}`);
      set({ selectedProduct: res.data, loading: false });
    } catch (err) {
      set({ selectedProduct: null, loading: false, error: err.response?.data?.message || "Product not found" });
      toast.error("Product not found");
    }
  },

  fetchProductsByCategory: async (category) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/products/category/${category}`);
      set({ products: res.data.products, loading: false });
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Failed to fetch category products" });
      toast.error("Failed to fetch category products");
    }
  },

  createProduct: async (productData) => {
    set({ loading: true, error: null });
    try {
      // productData should contain: title, description, price, images (array of base64 or URLs), category, discount (optional), stock
      const res = await axios.post("/products", productData);
      set((state) => ({
        products: [...state.products, res.data],
        loading: false,
      }));
      toast.success("Product created successfully");
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Failed to create product" });
      toast.error("Failed to create product");
    }
  },

  updateProduct: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      // updatedData can include stock and discount fields too
      const res = await axios.patch(`/products/${id}`, updatedData);
      set((state) => ({
        products: state.products.map((p) => (p._id === id ? res.data : p)),
        loading: false,
      }));
      // Update selectedProduct if currently loaded product is updated
      set((state) => ({
        selectedProduct: state.selectedProduct && state.selectedProduct._id === id ? res.data : state.selectedProduct,
      }));
      toast.success("Product updated successfully");
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Failed to update product" });
      toast.error("Failed to update product");
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/products/${id}`);
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
        loading: false,
      }));
      toast.success("Product deleted successfully");
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Failed to delete product" });
      toast.error("Failed to delete product");
    }
  },

  toggleFeaturedProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.patch(`/products/toggle-featured/${id}`);
      set((state) => ({
        products: state.products.map((p) =>
          p._id === id ? { ...p, isFeatured: res.data.isFeatured } : p
        ),
        loading: false,
      }));
      toast.success("Featured status updated");
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Failed to toggle featured status" });
      toast.error("Failed to toggle featured status");
    }
  },

  fetchRelatedProducts: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/products/related/${id}`);
      set({ relatedProducts: res.data.relatedProducts || [], loading: false });
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Failed to fetch related products" });
      toast.error("Failed to fetch related products");
    }
  },

  fetchPeopleAlsoBought: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/products/people-also-bought/${id}`);
      set({ peopleAlsoBought: res.data.peopleAlsoBought || [], loading: false });
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Failed to fetch recommendations" });
      toast.error("Failed to fetch recommendations");
    }
  },

  fetchTopRated: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/products/top-rated");
      set({ topRated: res.data.products || [], loading: false });
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Failed to fetch top-rated products" });
      toast.error("Failed to fetch top-rated products");
    }
  },

  clearError: () => set({ error: null }),
}));
