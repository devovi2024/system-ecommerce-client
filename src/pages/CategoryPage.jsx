import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";

const CategoryPage = () => {
  const { category } = useParams();
  const { fetchProductsByCategory, products, loading } = useProductStore();

  useEffect(() => {
    if (category) {
      fetchProductsByCategory(category.toLowerCase());
    }
  }, [category]);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Collection: {category?.charAt(0).toUpperCase() + category?.slice(1)}
      </h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-red-500">No products found.</div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-300"
            >
              <img
                src={product.image || "https://via.placeholder.com/300x200"}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
              <p className="text-gray-500 text-sm line-clamp-2 mb-2">
                {product.description || "No description available."}
              </p>
              <div className="text-blue-600 font-bold text-lg">${product.price}</div>
              <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
