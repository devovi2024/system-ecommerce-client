import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import { useReviewStore } from "../stores/useReviewStore";
import { useNavigate } from "react-router-dom";

export default function ReviewSection({ productId }) {
  const { user } = useUserStore();
  const {
    reviews,
    loading,
    error,
    fetchReviews,
    createReview,
    markReviewHelpful,
  } = useReviewStore();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitError, setSubmitError] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");
  const [helpfulLoading, setHelpfulLoading] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (productId) fetchReviews(productId);
  }, [productId, fetchReviews]);

  const sortedReviews = useMemo(() => {
    if (!reviews) return [];
    return [...reviews].sort((a, b) => {
      if (sortOrder === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOrder === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortOrder === "highest") return b.rating - a.rating;
      if (sortOrder === "lowest") return a.rating - b.rating;
      return 0;
    });
  }, [reviews, sortOrder]);

  const averageRating = useMemo(() => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return total / reviews.length;
  }, [reviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    try {
      await createReview({ productId, rating, comment });
      setRating(5);
      setComment("");
      await fetchReviews(productId);
    } catch (err) {
      setSubmitError(err.message || "Failed to submit review");
    }
  };

  const handleLoginClick = () => navigate("/login");

  const handleMarkHelpful = async (reviewId) => {
    setHelpfulLoading(reviewId);
    try {
      await markReviewHelpful(reviewId);
      await fetchReviews(productId);
    } catch (err) {
      console.error("Failed to mark helpful:", err);
    } finally {
      setHelpfulLoading(null);
    }
  };

  const Stars = ({ count }) => (
    <div className="flex space-x-1 text-yellow-400">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill={i < count ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.18 6.71a1
              1 0 00.95.69h7.07c.969 0 1.371 1.24.588
              1.81l-5.73 4.153a1 1 0 00-.364 1.118l2.18
              6.71c.3.921-.755 1.688-1.54 1.118l-5.73-4.153a1
              1 0 00-1.176 0l-5.73 4.153c-.784.57-1.838-.197-1.54-1.118l2.18-6.71a1
              1 0 00-.364-1.118L2.34 12.137c-.783-.57-.38-1.81.588-1.81h7.07a1
              1 0 00.95-.69l2.18-6.71z"
            />
          </svg>
        ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 mt-10 bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-2xl shadow-2xl text-gray-200 font-sans"
    >
      {/* Header with optional login button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold tracking-wide text-cyan-400 drop-shadow-lg">
          Customer Reviews
        </h2>
        {!user && (
          <button
            onClick={handleLoginClick}
            className="bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white font-semibold py-2 px-5 rounded-lg shadow-lg shadow-cyan-700/50 transition select-none"
          >
            Please log in to write a review
          </button>
        )}
      </div>

      {/* Average Rating Summary */}
<div className="flex flex-wrap justify-between">
  {/* Left Section */}
  <div className="">
    <div className="text-5xl font-extrabold text-yellow-400">{averageRating.toFixed(2)}</div>
    <div>
      <Stars count={Math.round(averageRating)} />
      <p className="text-gray-400">{reviews.length} Ratings and {reviews.length} Reviews</p>
    </div>
  </div>

  {/* Right Section */}
  <div className="w-full md:w-1/2 mt-4 md:mt-0 space-y-3">
    {[5, 4, 3, 2, 1].map((star) => {
      const count = reviews.filter((r) => r.rating === star).length;
      const percent = (count / reviews.length) * 100 || 0;
      return (
        <div key={star} className="flex items-center gap-2">
          <span className="w-6 text-sm text-gray-200">{star} ★</span>
          <div className="flex-1 bg-gray-700 rounded h-2">
            <div
              className="bg-yellow-400 h-full rounded"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="text-gray-400 text-xs w-6 text-right">{count}</span>
        </div>
      );
    })}
  </div>
</div>

<div className="flex flex-col-reverse md:flex-row justify-between gap-8 mt-25">
  {/* Left: Review List */}
  <div className="w-full md:w-1/2">
    <ul className="space-y-5 mb-8 border-t border-gray-600">
      {sortedReviews.length === 0 && !loading && (
        <p className="text-center text-gray-400 italic mt-6">No reviews yet.</p>
      )}
      <AnimatePresence>
        {sortedReviews.map((r) => (
          <motion.li
            key={r._id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            layout
            className="border-b border-gray-700 py-4"
          >
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <div className="bg-cyan-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold uppercase">
                  {r.user?.name?.[0] || "A"}
                </div>
                <p className="font-semibold text-cyan-300 select-none">
                  {r.user?.name ? `${r.user.name.slice(0, 3)}****` : "Anonymous"}
                </p>
              </div>
              <time
                className="text-xs text-gray-400 italic"
                dateTime={new Date(r.createdAt).toISOString()}
              >
                {new Date(r.createdAt).toLocaleDateString()}
              </time>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 flex-1">
                <Stars count={r.rating} />
                <p className="mt-3 sm:mt-0 text-gray-300 leading-relaxed select-text break-words">
                  {r.comment}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-2 sm:mt-0">
                <button
                  onClick={() => handleMarkHelpful(r._id)}
                  disabled={helpfulLoading === r._id}
                  className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition"
                >
                  👍 Helpful ({r.helpfulCount || 0})
                </button>
                <button
                  disabled
                  className="text-sm font-semibold text-gray-500 cursor-default"
                >
                  👎 Not Helpful ({r.notHelpfulCount || 0})
                </button>
              </div>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  </div>

  {/* Right: Sorting Dropdown */}
  <div className=" flex flex-col justify-start items-start">
    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 mb-6 w-full">
      <label htmlFor="sort" className="font-semibold text-cyan-300 whitespace-nowrap">
        Sort by:
      </label>
      <select
        id="sort"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="bg-[#334155] text-gray-300 px-3 py-2 rounded-md shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500 transition w-full sm:w-auto"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="highest">Highest Rating</option>
        <option value="lowest">Lowest Rating</option>
      </select>
    </div>
  </div>
</div>


      {/* Review Form Only If Logged In */}
      {user && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-xl space-y-6 bg-[#273449] p-6 rounded-xl shadow-inner border border-cyan-700"
        >
          <h3 className="text-xl font-bold text-cyan-400">Write a Review</h3>
          <div>
            <label htmlFor="rating" className="block font-semibold mb-2 text-gray-300">
              Rating (1 to 5)
            </label>
            <input
              id="rating"
              type="range"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="mt-1 text-cyan-300 font-semibold select-none">{rating} ⭐</div>
          </div>
          <div>
            <label htmlFor="comment" className="block font-semibold mb-2 text-gray-300">
              Comment
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full rounded-md p-3 bg-[#1e293b] border border-cyan-600 placeholder-cyan-400 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none transition"
              placeholder="Share your experience..."
              required
              maxLength={500}
            />
            <p className="mt-1 text-xs text-gray-400 text-right select-none">
              {comment.length} / 500
            </p>
          </div>
          {submitError && (
            <p className="text-red-500 font-semibold select-none">{submitError}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-cyan-700/50 transition disabled:opacity-50 disabled:cursor-not-allowed select-none"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </motion.form>
      )}
    </motion.div>
  );
}
