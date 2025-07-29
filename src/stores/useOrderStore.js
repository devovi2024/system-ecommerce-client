import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useOrdersStore = create((set, get) => ({
  orders: [],
  filteredOrders: [],
  statusFilter: "Select Any",
  loading: false,
  error: null,

  // Fetch logged-in user's orders
  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/orders/my-orders");
      set({ orders: res.data.orders || [], loading: false });
      get().filterOrders(get().statusFilter);
    } catch (error) {
      set({ orders: [], loading: false, error: error.response?.data?.message || "Failed to fetch orders" });
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    }
  },

  // Set status filter and filter orders locally
  setStatusFilter: (status) => {
    set({ statusFilter: status });
    get().filterOrders(status);
  },

  // Filter orders by status
  filterOrders: (status) => {
    const { orders } = get();
    if (!status || status === "Select Any") {
      set({ filteredOrders: orders });
    } else {
      set({
        filteredOrders: orders.filter((order) => order.status === status),
      });
    }
  },

  // Cancel an order by ID
  cancelOrder: async (orderId) => {
    try {
      await axios.put(`/orders/cancel/${orderId}`);
      toast.success("Order cancelled successfully");
      get().fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel order");
    }
  },

  // Create a new order (will trigger backend stock decrement)
  createOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post("/orders", orderData);
      toast.success("Order placed successfully");
      set({ loading: false });
      // Refresh orders after creating a new one
      get().fetchOrders();
    } catch (error) {
      set({ loading: false, error: error.response?.data?.message || "Failed to place order" });
      toast.error(error.response?.data?.message || "Failed to place order");
    }
  },

  clearError: () => set({ error: null }),
}));
