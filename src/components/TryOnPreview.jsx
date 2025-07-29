import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TryOnPreview = ({ product }) => {
  const [userImage, setUserImage] = useState(null);
  const [previews, setPreviews] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUserImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const generatePreviews = () => {
    if (!product?.images || !Array.isArray(product.images)) return;

    const newPreviews = product.images.map((productImageUrl) => ({
      base: productImageUrl,
      overlay: userImage,
    }));

    setPreviews(newPreviews);
  };

  useEffect(() => {
    if (userImage) {
      generatePreviews();
    }
  }, [userImage, product]);

  return (
    <div className="mt-10 space-y-4">
      <label className="block text-lg font-semibold text-white">
        Upload Your Photo to Try-On:
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="block w-full mt-2 p-2 bg-white rounded"
      />

      {userImage && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {previews.map((preview, idx) => (
            <motion.div
              key={idx}
              className="relative w-full h-64 bg-gray-800 rounded overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              {/* Product Image */}
              <img
                src={preview.base}
                alt={`Product preview ${idx + 1}`}
                className="absolute inset-0 w-full h-full object-contain z-10"
              />
              {/* User Image Overlay */}
              <img
                src={preview.overlay}
                alt="User uploaded"
                className="absolute inset-0 w-full h-full object-contain opacity-70 z-20 mix-blend-lighten"
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TryOnPreview;
