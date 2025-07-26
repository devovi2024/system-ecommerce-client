import React, { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "./ProductCard";

const RecommendationProduct = ({ productId }) => {
  const { relatedProducts, fetchRelatedProducts, loading } = useProductStore();

  useEffect(() => {
    if (productId) fetchRelatedProducts(productId);
  }, [productId]);

  if (loading) return <p className="text-white">Loading recommendations...</p>;
  if (!relatedProducts?.length) return null;

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Recommended for You
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RecommendationProduct;
