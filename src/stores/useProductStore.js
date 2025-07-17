import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });

    try {
      const res = await axiosInstance.post("/products", productData);  

      set((state) => ({
        products: [...state.products, res.data.product],
        loading: false,
      }));
    } catch (error) {
      console.error("Error creating product:", error.response?.data || error.message);
      set({ loading: false });
    }
  },
}));
