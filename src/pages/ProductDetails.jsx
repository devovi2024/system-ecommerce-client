// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add product to cart");
      return;
    }

    if (!product?._id) {
      toast.error("Product ID not found");
      return;
    }

    addToCart(product);
    toast.success("Product added to cart");
  };

  if (!product) return <div className="text-center p-10 text-white">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-[#0a1e3d] text-white rounded-xl shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[400px] object-contain bg-white rounded-xl p-6"
        />
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-4xl font-bold text-emerald-400">{product.title}</h1>
          <p className="text-2xl text-emerald-300 font-semibold">${product.price.toFixed(2)}</p>
          <p className="text-white/80 leading-relaxed">{product.description}</p>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 justify-center mt-4 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition active:scale-95 w-fit"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
