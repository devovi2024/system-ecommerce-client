import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useOrdersStore = create((set, get) => ({
  orders: [],
  filteredOrders: [],
  statusFilter: "Select Any",
  loading: false,

  fetchOrders: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/orders/my-orders"); 
      set({ orders: res.data.orders || [], loading: false });
      get().filterOrders(get().statusFilter);
    } catch (error) {
      set({ orders: [], loading: false });
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    }
  },

  setStatusFilter: (status) => {
    set({ statusFilter: status });
    get().filterOrders(status);
  },

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

  cancelOrder: async (orderId) => {
    try {
      await axios.put(`/orders/cancel/${orderId}`);
      toast.success("Order cancelled successfully");
      get().fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel order");
    }
  },
}));
