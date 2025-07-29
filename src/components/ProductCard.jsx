import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ShoppingCart, Heart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  if (!product || !product._id) return null;

  const firstImage = product.images?.[0] || "/placeholder.jpg";
  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice = hasDiscount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : null;

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to add products to cart");
      return;
    }
    if (product.stock <= 0) {
      toast.error("Sorry, this product is out of stock.");
      return;
    }

    addToCart(product);
    toast.success("Added to cart!");
  };

  return (
    <article
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={`Product: ${product.title}, Price: $${product.price.toFixed(
        2
      )}`}
      className="
        group relative flex flex-col rounded-2xl bg-gradient-to-br from-[#0a1e3d] to-[#12294f] 
        border border-[#2e3a5c] shadow-lg shadow-black/70 cursor-pointer
        w-full max-w-xs mx-auto overflow-hidden
        hover:shadow-emerald-500/80 hover:scale-[1.03] transition-transform duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-emerald-400
      "
    >
      <div className="relative w-full h-48 overflow-hidden rounded-t-2xl bg-white/5 flex items-center justify-center">
        <img
          src={firstImage}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          draggable={false}
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/40 to-transparent rounded-t-2xl" />

        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
            -{product.discount}%
          </span>
        )}
      </div>

      <div className="flex flex-col flex-grow p-4 space-y-2">
        <h3 className="text-emerald-400 text-base font-semibold line-clamp-2">
          {product.title}
        </h3>

        {product.category && (
          <p className="text-emerald-300 text-sm italic">{product.category.name}</p>
        )}

        {hasDiscount ? (
          <div className="flex items-center gap-2">
            <span className="text-red-400 text-lg font-semibold line-through">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-emerald-300 text-xl font-bold">
              ${discountedPrice}
            </span>
          </div>
        ) : (
          <p className="text-emerald-300 font-bold text-xl">
            ${product.price.toFixed(2)}
          </p>
        )}

        {/* Stock display */}
        <p
          className={`${
            product.stock <= 0
              ? "text-red-600 font-bold"
              : product.stock <= 5
              ? "text-yellow-400 font-semibold"
              : "text-emerald-300"
          } text-sm`}
        >
          {product.stock > 0
            ? `In Stock: ${product.stock}`
            : "Out of Stock"}
        </p>

        <button
          onClick={handleAddToCart}
          type="button"
          aria-label={`Add ${product.title} to cart`}
          disabled={product.stock <= 0}
          className={`mt-auto flex items-center justify-center gap-2 rounded-full px-4 py-2 font-semibold shadow-md transition
            ${
              product.stock <= 0
                ? "bg-gray-600 cursor-not-allowed text-gray-300"
                : "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95"
            }
          `}
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>

      <button
        type="button"
        aria-label={`Add ${product.title} to wishlist`}
        onClick={(e) => e.stopPropagation()}
        className="absolute top-4 right-4 text-emerald-400 hover:text-emerald-600 transition"
      >
        <Heart size={20} />
      </button>
    </article>
  );
};

export default ProductCard;
