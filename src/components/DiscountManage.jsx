import React, { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";

const DiscountManage = () => {
  const {
    products,
    fetchAllProducts,
    updateProduct,
    loading,
    error,
    clearError,
  } = useProductStore();

  const [discountInputs, setDiscountInputs] = useState({}); // { productId: discountValue }

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (error) {
      // Clear error after 3 seconds
      const timer = setTimeout(() => clearError(), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleDiscountChange = (productId, value) => {
    if (value === "" || (/^\d+$/.test(value) && +value <= 100)) {
      setDiscountInputs((prev) => ({
        ...prev,
        [productId]: value,
      }));
    }
  };

  const handleSaveDiscount = async (productId) => {
    const discount = discountInputs[productId];
    if (discount === undefined || discount === "") {
      alert("Please enter a valid discount (0-100)");
      return;
    }
    await updateProduct(productId, { discount: Number(discount) });
  };

  const handleClearDiscount = async (productId) => {
    await updateProduct(productId, { discount: 0 });
    setDiscountInputs((prev) => ({
      ...prev,
      [productId]: "0",
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-emerald-600">Manage Discounts</h1>

      {loading && <p className="mb-4 text-blue-600">Loading products...</p>}
      {error && <p className="mb-4 text-red-600">Error: {error}</p>}

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-emerald-700 text-white">
            <th className="p-3 text-left">Product</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Current Discount (%)</th>
            <th className="p-3 text-left">Set Discount (%)</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && !loading && (
            <tr>
              <td colSpan={5} className="text-center p-6 text-gray-500">
                No products available.
              </td>
            </tr>
          )}

          {products.map((product) => (
            <tr key={product._id} className="border-b border-gray-300">
              <td className="p-3">{product.title}</td>
              <td className="p-3">${product.price.toFixed(2)}</td>
              <td className="p-3">{product.discount ? product.discount : 0}</td>
              <td className="p-3">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={
                    discountInputs[product._id] !== undefined
                      ? discountInputs[product._id]
                      : product.discount || 0
                  }
                  onChange={(e) => handleDiscountChange(product._id, e.target.value)}
                  className="border border-gray-400 rounded px-2 py-1 w-20"
                  aria-label={`Set discount for ${product.title}`}
                />
              </td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => handleSaveDiscount(product._id)}
                  className="bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => handleClearDiscount(product._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Clear
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiscountManage;
