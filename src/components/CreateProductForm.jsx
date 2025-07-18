import React, { useState } from "react";
import { Upload, Loader, PlusCircle, ChevronDown } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["Electronics", "Clothes", "Furniture", "Books", "Sports"];

const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [open, setOpen] = useState(false);

  const { createProduct, loading } = useProductStore();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const file = files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "price" ? (value === "" ? "" : Number(value)) : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload an image!");
      return;
    }

    if (!formData.category) {
      alert("Please select a category!");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price); 
    data.append("category", formData.category.toLowerCase());
    data.append("image", imageFile);

    await createProduct(data);

    // reset form
    setFormData({
      title: "",
      description: "",
      price: "",
      category: "",
    });
    setImageFile(null);
    setImagePreview(null);
    setOpen(false);
  };

  const handleSelect = (val) => {
    setFormData((prev) => ({ ...prev, category: val }));
    setOpen(false);
  };

  return (
    <div className="min-h-screen py-10 px-4 flex items-center justify-center bg-[#0f172a]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0f172a] p-8 rounded-3xl shadow-2xl max-w-xl w-full space-y-6 border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-gray-200 flex items-center gap-2 tracking-tight">
          <PlusCircle className="w-6 h-6 text-blue-600" />
          Create a New Product
        </h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Product Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Apple Watch Series 8"
            className="w-full border border-gray-600 bg-[#1e293b] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of the product..."
            className="w-full border border-gray-600 bg-[#1e293b] text-white rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="49.99"
              className="w-full border border-gray-600 bg-[#1e293b] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="relative space-y-2">
            <label className="block text-sm font-medium text-gray-300">Category</label>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-haspopup="listbox"
              aria-expanded={open}
              className="w-full flex justify-between items-center border border-gray-600 rounded-xl px-4 py-3 bg-[#1e293b] text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
            >
              {formData.category || "Select category"}
              <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
            </button>

            <AnimatePresence>
              {open && (
                <motion.ul
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="absolute z-50 mt-2 w-full bg-[#1e293b] text-gray-100 border border-gray-700 rounded-xl shadow-lg overflow-hidden"
                  role="listbox"
                >
                  {categories.map((cat) => (
                    <li
                      key={cat}
                      onClick={() => handleSelect(cat)}
                      className="px-4 py-2 hover:bg-blue-600 cursor-pointer transition"
                      role="option"
                      aria-selected={formData.category === cat}
                    >
                      {cat}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Product Image</label>
          <label className="flex items-center gap-3 cursor-pointer text-blue-600 hover:text-blue-800 font-medium">
            <Upload className="w-5 h-5" />
            Upload Image
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              required={!imagePreview}
            />
          </label>

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border mt-2"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white px-6 py-2 rounded-xl font-semibold flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="animate-spin w-5 h-5" />
              Creating...
            </>
          ) : (
            "Create Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
