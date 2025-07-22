import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,

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
      toast.success("Cart updated successfully");
      await get().getCartItems();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update cart");
    }
  },

  applyCoupon: async (code) => {
    try {
      const res = await axios.get("/coupon/validate", { data: { code } });
      set({ coupon: res.data, isCouponApplied: true });
      get().calculateTotals();
      toast.success("Coupon applied successfully!");
    } catch (error) {
      set({ coupon: null, isCouponApplied: false });
      toast.error(error.response?.data?.message || "Invalid or expired coupon");
    }
  },

  calculateTotals: () => {
    const { cart, coupon } = get();
    const subTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    let total = subTotal;

    if (coupon?.discountPercentage) {
      const discount = subTotal * (coupon.discountPercentage / 100);
      total = subTotal - discount;
    }

    set({ subtotal: subTotal, total });
  },
}));
