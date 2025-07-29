import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useCategoryStore } from "../stores/useCategoryStore";

const CreateProductForm = () => {
  const { createProduct, loading } = useProductStore();
  const { categories, fetchCategories } = useCategoryStore();

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",             // Added stock field here
    images: ["", "", "", ""],
    category: "",
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value, // convert price and stock to Number
    }));
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newImages = [...newProduct.images];
      newImages[index] = reader.result;
      setNewProduct((prev) => ({ ...prev, images: newImages }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate stock
    if (newProduct.stock === "" || newProduct.stock < 0) {
      alert("Please enter a valid stock number (0 or greater).");
      return;
    }

    // Filter out empty images before sending
    const imagesToSend = newProduct.images.filter((img) => img !== "");

    if (imagesToSend.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    const productData = {
      ...newProduct,
      images: imagesToSend,
    };

    await createProduct(productData);

    setNewProduct({
      title: "",
      description: "",
      price: "",
      stock: "",
      images: ["", "", "", ""],
      category: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center px-4 py-10">
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-xl rounded-2xl p-8 space-y-6 text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-center text-white tracking-wide">
          Create Product
        </h2>

        <input
          name="title"
          value={newProduct.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="w-full p-3 bg-white/10 border border-white/20 rounded-xl placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
          required
        />

        <textarea
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
          className="w-full p-3 bg-white/10 border border-white/20 rounded-xl placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none transition-all"
          required
        />

        <input
          name="price"
          type="number"
          min="0"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Price ($)"
          className="w-full p-3 bg-white/10 border border-white/20 rounded-xl placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
          required
        />

        <input
          name="stock"
          type="number"
          min="0"
          value={newProduct.stock}
          onChange={handleChange}
          placeholder="Stock Quantity"
          className="w-full p-3 bg-white/10 border border-white/20 rounded-xl placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
          required
        />

        <select
          name="category"
          value={newProduct.category}
          onChange={handleChange}
          className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id} className="text-black">
              {cat.name}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-4">
          {newProduct.images.map((img, i) => (
            <div key={i}>
              <label className="block mb-2 text-sm text-gray-300">Image {i + 1}</label>
              <label className="flex items-center gap-3 cursor-pointer bg-white/10 border border-white/20 p-3 rounded-xl hover:bg-white/20 transition-all">
                <Upload size={20} />
                <span className="text-sm text-gray-200">Choose Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(i, e)}
                  className="hidden"
                />
              </label>
              {img && (
                <img
                  src={img}
                  alt={`Preview ${i + 1}`}
                  className="mt-2 h-32 w-full object-cover rounded-xl border border-white/10"
                />
              )}
            </div>
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all duration-300"
        >
          {loading ? (
            <Loader className="animate-spin" size={20} />
          ) : (
            <>
              <PlusCircle size={20} />
              Create Product
            </>
          )}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default CreateProductForm;
