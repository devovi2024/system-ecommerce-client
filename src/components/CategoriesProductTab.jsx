import React, { useEffect, useState } from "react";
import { useCategoryStore } from "../stores/useCategoryStore";
import { useProductStore } from "../stores/useProductStore";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const CategoriesProductTab = () => {
  const { categories, fetchCategories } = useCategoryStore();
  const { products, fetchProductsByCategory, fetchAllProducts, loading } = useProductStore();
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (selectedCategory === "All") {
      fetchAllProducts();
    } else if (selectedCategory) {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedCategory, fetchProductsByCategory, fetchAllProducts]);

  return (
    <div className="max-w-8xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
      {/* Categories Sidebar */}
      <aside className="md:col-span-1 bg-[#151c2d] rounded-2xl p-6 shadow-lg sticky top-16 h-max">
        <h2 className="text-2xl font-extrabold text-white mb-8 tracking-wide">
          Categories
        </h2>
        <div className="flex flex-col gap-4">
          {/* All Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory("All")}
            className={`w-full rounded-lg py-3 font-semibold text-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
              selectedCategory === "All"
                ? "bg-emerald-500 text-white shadow-lg"
                : "bg-transparent text-gray-400 hover:text-white hover:bg-emerald-600/30"
            }`}
            type="button"
          >
            All
          </motion.button>

          {/* Category Buttons */}
          {categories.map((cat) => (
            <motion.button
              key={cat._id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat.name)}
              className={`w-full rounded-lg py-3 font-semibold text-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                selectedCategory === cat.name
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "bg-transparent text-gray-400 hover:text-white hover:bg-emerald-600/30"
              }`}
              type="button"
            >
              {cat.name}
            </motion.button>
          ))}
        </div>
      </aside>

      {/* Products Grid */}
      <section className="md:col-span-3">
        <h2 className="text-3xl font-extrabold text-white mb-8 tracking-wide">
          {selectedCategory === "All" ? "All Products" : selectedCategory}
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 text-lg mt-12 animate-pulse">
            Loading products...
          </p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-12">No products found.</p>
        ) : (
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 ">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoriesProductTab;
