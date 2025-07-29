import React, { useEffect, useMemo } from "react";
import ProductCard from "./ProductCard";
import { useProductStore } from "../stores/useProductStore";

const CategoryProducts = ({ category, searchTerm, sortOrder }) => {
  const { products, loading, error, fetchProductsByCategory } = useProductStore();

  useEffect(() => {
    if (category) fetchProductsByCategory(category);
  }, [category, fetchProductsByCategory]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products;

    if (searchTerm?.trim()) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "asc") {
      filtered = filtered.slice().sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered = filtered.slice().sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, searchTerm, sortOrder]);

  if (loading)
    return (
      <p className="text-center text-gray-300 py-20 text-xl font-semibold animate-pulse">
        Loading products...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-500 py-20 text-lg bg-red-900/20 rounded-md max-w-lg mx-auto font-medium">
        {error}
      </p>
    );

  if (!filteredProducts.length)
    return (
      <p className="text-center text-gray-400 py-20 text-lg font-medium">
        No products found.
      </p>
    );

  return (
    <section
      aria-live="polite"
      aria-relevant="additions removals"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
    >
      {filteredProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </section>
  );
};

export default CategoryProducts;
