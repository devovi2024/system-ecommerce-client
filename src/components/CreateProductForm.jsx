import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
    } catch {
      console.log("error creating a product");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-8 max-w-xl mx-auto shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-extrabold mb-6 text-emerald-400 tracking-wide drop-shadow-md">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-300 mb-1"
          >
            Product Name
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
            className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white placeholder-gray-400 shadow-inner
              focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:ring-opacity-60 transition"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-300 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            rows="4"
            className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white placeholder-gray-400 shadow-inner
              focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:ring-opacity-60 transition resize-none"
            placeholder="Write a brief product description"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-semibold text-gray-300 mb-1"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            step="0.01"
            className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white placeholder-gray-400 shadow-inner
              focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:ring-opacity-60 transition"
            placeholder="0.00"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-semibold text-gray-300 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white shadow-inner
              focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:ring-opacity-60 transition"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="text-gray-900">
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div className="flex items-center space-x-4">
          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="flex items-center cursor-pointer bg-gradient-to-r from-emerald-600 to-emerald-400 hover:brightness-110
              py-2 px-4 rounded-md shadow-md text-white font-semibold transition"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Image
          </label>
          {newProduct.image && (
            <span className="text-sm text-emerald-300 font-medium select-none">
              Image uploaded
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-700
            hover:from-emerald-600 hover:to-emerald-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed
            py-3 rounded-lg text-white font-bold shadow-lg transition focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:ring-opacity-60"
        >
          {loading ? (
            <>
              <Loader className="h-5 w-5 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className="h-5 w-5" />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;
