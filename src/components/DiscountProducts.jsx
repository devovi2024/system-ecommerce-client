import React, { useEffect, useMemo } from "react";
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "./ProductCard"; // Reuses your existing beautiful ProductCard
import { Loader2 } from "lucide-react";

const DiscountProducts = () => {
  const { products, fetchAllProducts, loading, error } = useProductStore();

  useEffect(() => {
    if (!products.length) {
      fetchAllProducts();
    }
  }, [products.length, fetchAllProducts]);

  const discountedProducts = useMemo(() => {
    return products.filter((p) => p.discount && p.discount > 0);
  }, [products]);

  return (
    <section className="w-full px-4 py-10 bg-gradient-to-br from-[#0a1e3d] to-[#12294f]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-emerald-400 mb-6 text-center">
          🎯 Hot Deals - Discounted Products
        </h2>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-emerald-400" size={32} />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center font-semibold">
            {error}
          </p>
        ) : discountedProducts.length === 0 ? (
          <p className="text-emerald-200 text-center font-semibold">
            No discounted products available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {discountedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DiscountProducts;
