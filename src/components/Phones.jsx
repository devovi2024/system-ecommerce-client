import React, { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "../components/ProductCard";

const Phones = () => {
  const {
    products,
    fetchProductsByCategory,
    loading,
    error,
  } = useProductStore();

  useEffect(() => {
    fetchProductsByCategory("phones"); 
  }, [fetchProductsByCategory]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Phones</h1>

      {loading && <p className="text-white/70">Loading phones...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {!loading && products.length > 0 ? (
          products.map((product) => <ProductCard key={product._id} product={product} />)
        ) : (
          !loading && <p className="col-span-full text-white/50">No phones found.</p>
        )}
      </div>
    </section>
  );
};

export default Phones;
