import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,

  // Fetch cart items from backend (with discount info)
  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");
      set({ cart: res.data.cartItems || [] });
      get().calculateTotals();
    } catch (error) {
      set({ cart: [] });
      toast.error(error.response?.data?.message || "Failed to fetch cart");
    }
  },

  // Add product by product._id, backend handles quantity increment
  addToCart: async (product) => {
    try {
      await axios.post("/cart", { productId: product._id });
      toast.success("Product added to cart");
      await get().getCartItems();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  },

  removeFromCart: async (productId) => {
    try {
      await axios.delete(`/cart/${productId}`);
      toast.success("Product removed from cart");
      await get().getCartItems();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove from cart");
    }
  },

  updateQuantity: async (productId, quantity) => {
    try {
      if (quantity === 0) return await get().removeFromCart(productId);
      await axios.put(`/cart/${productId}`, { quantity });
      toast.success("Cart updated");
      await get().getCartItems();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  },

  applyCoupon: async (code) => {
    try {
      const res = await axios.post("/coupon", { code });
      set({ coupon: res.data, isCouponApplied: true });
      get().calculateTotals();
      toast.success("Coupon applied");
    } catch (error) {
      set({ coupon: null, isCouponApplied: false });
      toast.error(error.response?.data?.message || "Invalid or expired coupon");
    }
  },

  removeCoupon: () => {
    set({ coupon: null, isCouponApplied: false });
    get().calculateTotals();
    toast.success("Coupon removed");
  },

  // Calculate totals based on discountedPrice (if available) else price
  calculateTotals: () => {
    const { cart, coupon } = get();
    const subtotal = cart.reduce((acc, item) => {
      const price = item.discountedPrice ?? item.price;
      return acc + price * item.quantity;
    }, 0);
    let total = subtotal;

    if (coupon?.discountPercentage) {
      total = subtotal - subtotal * (coupon.discountPercentage / 100);
    }

    set({ subtotal, total });
  },

  clearCart: () => {
    set({
      cart: [],
      coupon: null,
      total: 0,
      subtotal: 0,
      isCouponApplied: false,
    });
  },
}));
