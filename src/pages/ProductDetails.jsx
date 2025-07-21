import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "../components/ProductCard";




const ProductDetails = () => {
  const { id } = useParams();
  const {
    products,
    fetchProductById,
    fetchProductsByCategory,
    selectedProduct,
  } = useProductStore();

  useEffect(() => {
    if (id) fetchProductById(id);
  }, [id]);

  useEffect(() => {
    if (selectedProduct?.category) {
      fetchProductsByCategory(selectedProduct.category);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return <p>Loading product details...</p>;

  return (
    <div className="p-6">
      <div className="mb-10">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
        <p className="text-gray-500">${selectedProduct.price}</p>
        <p className="mt-4">{selectedProduct.description}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Similar Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products
            .filter((p) => p._id !== id)
            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
