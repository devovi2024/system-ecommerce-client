import { create } from "zustand";
import axios from "../lib/axios";

export const useReviewStore = create((set, get) => ({
  reviews: [],
  loading: false,
  error: null,

  fetchReviews: async (productId) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/reviews/${productId}`);
      set({ reviews: res.data.reviews, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message || "Failed to fetch reviews",
        loading: false,
      });
    }
  },

  createReview: async ({ productId, rating, comment }) => {
    if (!productId) throw new Error("Product ID is required");
    if (!rating || rating < 1 || rating > 5) throw new Error("Rating must be 1 to 5");
    if (!comment || comment.trim().length === 0) throw new Error("Comment is required");

    set({ loading: true, error: null });
    try {
      const res = await axios.post(`/reviews/`, { productId, rating, comment });
      await get().fetchReviews(productId);
      set({ loading: false });
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message || "Failed to create review",
        loading: false,
      });
      throw err;
    }
  },

  voteReviewHelpful: async ({ reviewId, type }) => {
    if (!reviewId) throw new Error("Review ID is required");
    if (!["helpful", "unhelpful"].includes(type)) throw new Error("Invalid vote type");

    set({ loading: true, error: null });
    try {
      const res = await axios.put(`/reviews/${reviewId}/vote`, { type });
      set((state) => {
        const updatedReviews = state.reviews.map((r) =>
          r._id === reviewId ? res.data.review : r
        );
        return { reviews: updatedReviews, loading: false };
      });
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message || "Failed to vote",
        loading: false,
      });
      throw err;
    }
  },
}));
