import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useUserStore } from "../stores/useUserStore";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!user) {
      const res = await Swal.fire({
        title: "Login Required",
        text: "Please login to add products to cart.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
      });
      if (res.isConfirmed) navigate("/login");
      return;
    }

    toast.success("Product added to cart");
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className="group block bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
      />

      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-gray-600 mb-3">${product.price}</p>

      <button
        onClick={handleAddToCart}
        className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
      >
        <ShoppingCart size={16} />
        Add to Cart
      </button>
    </Link>
  );
};

export default ProductCard;
