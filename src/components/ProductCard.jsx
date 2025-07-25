import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    if (!user) {
      toast.error("Please login to add products to cart");
      return;
    }

    if (!product?._id) {
      toast.error("Product ID not found");
      return;
    }

    addToCart(product);
  };

  if (!product || !product._id) return null;

  return (
    <Link to={`/product/${product._id}`} className="no-underline">
      <article
        tabIndex={0}
        aria-label={`Product: ${product.title}, Price: $${product.price.toFixed(2)}`}
        className="
          group relative flex flex-col rounded-2xl bg-gradient-to-br from-[#0a1e3d] to-[#12294f] 
          border border-[#2e3a5c] shadow-lg shadow-black/70 cursor-pointer
          w-full max-w-xs mx-auto overflow-hidden
          hover:shadow-emerald-500/80 hover:scale-[1.03] transition-transform duration-300 ease-in-out
        "
      >
        <div className="relative w-full h-48 overflow-hidden rounded-t-2xl bg-white/5 flex items-center justify-center">
          <img
            src={product.image || "/placeholder.jpg"}
            alt={product.title}
            className="max-h-40 w-full object-contain transition-transform duration-700 group-hover:scale-105"
            draggable={false}
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/40 to-transparent rounded-t-2xl" />
        </div>

        <div className="flex flex-col flex-grow p-4 space-y-2">
          <h3 className="text-emerald-400 text-base font-semibold line-clamp-2">
            {product.title}
          </h3>
          <p className="text-emerald-300 font-bold text-xl">${product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            type="button"
            className="mt-auto flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-white font-semibold shadow-md hover:bg-emerald-700 active:scale-95"
          >
            <ShoppingCart size={18} />
            Add
          </button>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
