import React, { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCategoryStore } from "../stores/useCategoryStore";

const CategoryDropdown = ({ onClose = () => {} }) => {
  const { categories, fetchCategories, loading, error } = useCategoryStore();

  useEffect(() => {
    if (categories.length === 0 && !loading) {
      fetchCategories();
    }
  }, [fetchCategories, categories.length, loading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-50 border border-gray-200"
    >
      <div className="max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <ul className="flex flex-col divide-y">
          {loading && (
            <li className="px-4 py-3 text-sm text-gray-500">Loading...</li>
          )}

          {!loading && error && (
            <li className="px-4 py-3 text-sm text-red-500">Failed to load categories</li>
          )}

          {!loading && !error && categories.length === 0 && (
            <li className="px-4 py-3 text-sm text-gray-500">No categories available</li>
          )}

          {!loading &&
            !error &&
            categories.map((cat) => (
<Link
  key={cat._id}
  to={`/shop?category=${encodeURIComponent(cat.name)}`}
  onClick={onClose}
  className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition"
>
                <span className="flex items-center gap-2 text-gray-800">
                  <span className="text-lg">{cat.icon || "📁"}</span>
                  {cat.name}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default CategoryDropdown;
