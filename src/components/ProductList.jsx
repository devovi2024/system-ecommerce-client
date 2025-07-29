import React, { useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { motion } from "framer-motion";
import { Star, Trash2 } from "lucide-react";
import ConfirmModal from "./ConfirmModal";

const ProductList = () => {
  const { products, deleteProduct, toggleFeaturedProduct } = useProductStore();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleDeleteClick = (productId) => {
    setSelectedProductId(productId);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await deleteProduct(selectedProductId);
      setConfirmOpen(false);
      setSelectedProductId(null);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    if (loading) return;
    setConfirmOpen(false);
    setSelectedProductId(null);
  };

  if (!products.length) {
    return (
      <div className="text-center text-gray-400 mt-10 text-lg">
        No products available.
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-[#0a0f24] min-h-screen text-white px-4 md:px-8 py-10"
      >
        <h1 className="text-3xl font-semibold mb-8 text-center">📦 Product List</h1>

        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-700">
          <table className="min-w-full bg-[#10172a] text-left">
            <thead className="bg-[#1f2937] text-gray-300">
              <tr>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">In Stock</th>
                <th className="px-6 py-3">Featured</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, i) => (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="hover:bg-[#1c253a] border-b border-gray-700"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    {product.images && product.images.length > 0 && (
                      <img
                        src={product.images[0]} // show first image
                        alt={product.title}
                        className="w-10 h-10 object-cover rounded-md"
                      />
                    )}
                    <span className="font-medium">{product.title}</span>
                  </td>

                  <td className="px-6 py-4">${product.price.toFixed(2)}</td>

                  <td className="px-6 py-4 capitalize">
                    {product.category?.name || "N/A"}
                  </td>

                  <td className="px-6 py-4">{product.countStock}</td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleFeaturedProduct(product._id)}
                      className={`p-1 rounded-full transition-transform hover:scale-110 ${
                        product.featured ? "text-yellow-400" : "text-gray-500"
                      }`}
                      aria-label="Toggle Featured"
                    >
                      <Star
                        size={20}
                        fill={product.featured ? "yellow" : "none"}
                      />
                    </button>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteClick(product._id)}
                      className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded flex items-center gap-1"
                      aria-label="Delete Product"
                      disabled={loading && selectedProductId === product._id}
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {confirmOpen && (
        <ConfirmModal
          message="Are you sure you want to delete this product?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          loading={loading}
        />
      )}
    </>
  );
};

export default ProductList;
