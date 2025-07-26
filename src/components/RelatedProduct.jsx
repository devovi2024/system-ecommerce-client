import React, { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "./ProductCard";

const RelatedProducts = ({ productId }) => {
  const { relatedProducts, fetchRelatedProducts, loading } = useProductStore();

  useEffect(() => {
    if (productId) fetchRelatedProducts(productId);
  }, [productId]);

  if (loading) return null;
  if (!relatedProducts?.length) return null;

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-white mb-4">Related Products</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
