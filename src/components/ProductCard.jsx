import React from "react";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
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
      {/* Image container */}
      <div className="relative w-full h-48 overflow-hidden rounded-t-2xl bg-white/5 flex items-center justify-center">
        <img
          src={product.image || "/placeholder.jpg"}
          alt={product.title || "Product Image"}
          loading="lazy"
          className="
            max-h-40 w-full object-contain transition-transform duration-700 ease-in-out transform-gpu will-change-transform 
            group-hover:scale-105
          "
          draggable={false}
          decoding="async"
        />
        {/* subtle dark overlay for contrast */}
        <div className="absolute inset-0 rounded-t-2xl bg-gradient-to-t from-transparent via-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4 space-y-2">
        <h3 className="text-emerald-400 text-base font-semibold leading-snug line-clamp-2 drop-shadow-md">
          {product.title}
        </h3>

        <p className="text-emerald-300 font-bold text-xl tracking-wide drop-shadow-md">
          ${product.price.toFixed(2)}
        </p>

        <button
          onClick={handleAddToCart}
          type="button"
          aria-label={`Add ${product.title} to cart`}
          className="
            mt-auto flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-2 font-semibold text-white shadow-md
            hover:bg-emerald-700 active:scale-95 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400
          "
        >
          <ShoppingCart size={18} />
          Add
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
