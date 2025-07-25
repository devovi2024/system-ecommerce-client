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
      className="relative flex flex-col rounded-3xl bg-white bg-opacity-10 backdrop-blur-md border border-emerald-500 shadow-lg hover:shadow-emerald-400/60 hover:scale-[1.07] transition-transform duration-500 ease-in-out cursor-pointer max-w-xs mx-auto overflow-hidden"
    >
      {/* Image */}
      <div className="relative w-full h-56 overflow-hidden rounded-t-3xl">
        <img
          src={product.image || "/placeholder.jpg"}
          alt={product.title || "Product Image"}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
          draggable={false}
          decoding="async"
        />
        {/* subtle glow */}
        <div className="absolute inset-0 rounded-t-3xl bg-gradient-to-t from-transparent via-emerald-600/30 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6 space-y-4">
        <h3 className="text-white text-xl font-bold truncate drop-shadow-md">{product.title}</h3>

        <p className="text-emerald-400 font-extrabold text-3xl tracking-wide drop-shadow-md">
          ${product.price.toFixed(2)}
        </p>

        <button
          onClick={handleAddToCart}
          type="button"
          aria-label={`Add ${product.title} to cart`}
          className="mt-auto flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg hover:bg-emerald-700 active:scale-95 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-400"
        >
          <ShoppingCart size={20} className="mr-3" />
          Add to cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
