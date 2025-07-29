import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useCategoryStore } from "../stores/useCategoryStore";
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { categories, fetchCategories, loading: categoryLoading } = useCategoryStore();
  const { products, loading, error, fetchProductsByCategory } = useProductStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const searchParam = searchParams.get("search") || "";
  const sortParam = searchParams.get("sort") || "";

  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [sortOrder, setSortOrder] = useState(sortParam);
  const [visibleCount, setVisibleCount] = useState(25);

  useEffect(() => {
    if (categories.length === 0 && !categoryLoading) {
      fetchCategories();
    }
  }, [fetchCategories, categories.length, categoryLoading]);

  const loadProducts = useCallback(() => {
    if (categoryParam) {
      fetchProductsByCategory(categoryParam);
    }
  }, [categoryParam, fetchProductsByCategory]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filteredProducts = useMemo(() => {
    let filtered = products || [];

    if (searchTerm.trim()) {
      filtered = filtered.filter((p) =>
        p.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "asc") {
      filtered = filtered.slice().sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered = filtered.slice().sort((a, b) => b.price - a.price);
    }

    return filtered.slice(0, visibleCount);
  }, [products, searchTerm, sortOrder, visibleCount]);

  useEffect(() => {
    const params = {};
    if (categoryParam) params.category = categoryParam;
    if (searchTerm.trim()) params.search = searchTerm.trim();
    if (sortOrder) params.sort = sortOrder;
    setSearchParams(params);
    setVisibleCount(25);
  }, [categoryParam, searchTerm, sortOrder, setSearchParams]);

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSearchTerm("");
    setSortOrder("");
    setSearchParams({ category: newCategory });
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSortChange = (e) => setSortOrder(e.target.value);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER + FILTERS */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <h1 className="text-4xl font-extrabold tracking-wide select-none capitalize">
            {categoryParam || "All Products"}
          </h1>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-wrap gap-5 items-center"
            role="search"
            aria-label="Filter products"
          >
            <select
              id="category"
              value={categoryParam}
              onChange={handleCategoryChange}
              className="bg-gray-800 border border-gray-700 text-gray-100 rounded-lg px-4 py-2 shadow-md hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              type="search"
              id="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 w-56 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-md"
              spellCheck={false}
              autoComplete="off"
            />

            <select
              id="sort"
              value={sortOrder}
              onChange={handleSortChange}
              className="bg-gray-800 border border-gray-700 text-gray-100 rounded-lg px-4 py-2 shadow-md hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              aria-label="Sort products by price"
            >
              <option value="">Sort by Price</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </form>
        </div>

        {/* PRODUCTS SECTION */}
        {loading ? (
          <p className="text-center text-gray-300 py-24 text-xl font-semibold animate-pulse">
            Loading products...
          </p>
        ) : error ? (
          <p className="text-center text-red-500 py-20 text-lg bg-red-900/30 rounded-lg max-w-xl mx-auto font-semibold" role="alert">
            {error}
          </p>
        ) : !loading && filteredProducts.length === 0 ? (
          <p className="text-center text-gray-400 py-24 text-lg font-medium">
            No products found.
          </p>
        ) : (
          <>
            <section
              aria-live="polite"
              aria-relevant="additions removals"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </section>

            {/* LOAD MORE */}
            {filteredProducts.length < products.length && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 25)}
                  className="px-6 py-3 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition font-semibold shadow-md"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default CategoryPage;
