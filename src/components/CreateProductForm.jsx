import React, { useState } from "react"; 
import { PlusCircle, Upload, Loader } from "lucide-react";

const categories = ["Electronics", "Clothes", "Furniture", "Books", "Sports"];

const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    countInStock: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result,
        });
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      countInStock: "",
      image: null,
    });
    setImagePreview(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0f172a] text-white p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-6 text-blue-400">
        Create New Product
      </h2>


      <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-300">Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#1e293b] border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter product name"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-300">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full p-2 rounded bg-[#1e293b] border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter description"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-300">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#1e293b] border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter price"
          required
          min="0"
          step="0.01"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-300">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#1e293b] border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="" disabled>
            Select category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-300">Count In Stock</label>
        <input
          type="number"
          name="countInStock"
          value={formData.countInStock}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#1e293b] border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter stock quantity"
          required
          min="0"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 text-sm text-gray-300">Upload Image</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          className="w-full p-2 rounded bg-[#1e293b] border border-blue-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          required
        />
      </div>

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="mb-6 max-h-48 object-contain rounded-lg"
        />
      )}

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white px-6 py-2 rounded-lg font-semibold w-full"
      >
        Create Product
      </button>
    </form>
  );
};

export default CreateProductForm;
