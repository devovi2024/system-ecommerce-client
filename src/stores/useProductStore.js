import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

export const useProductStore = create(
  persist(
    (set) => ({
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
          console.error("Error creating product:", error.response?.data || error.message);
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
          console.error("Error fetching products:", error.response?.data || error.message);
          toast.error(error.response?.data?.message || "Failed to fetch products.");
          set({ loading: false });
        }
      },


      deleteProduct: async (id) => {},
      toggleFeaturedProduct: async (id) => {},
    }),
    {
      name: "product-store", 
      partialize: (state) => ({ products: state.products }), 
    }
  )
);
