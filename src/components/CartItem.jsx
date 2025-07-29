import React from "react";
import { useCartStore } from "../stores/useCartStore";
import { Minus, Plus, Trash2 } from "lucide-react";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item._id, item.quantity - 1);
    } else {
      removeFromCart(item._id);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item._id, item.quantity + 1);
  };

  const discount = item.discount || 0;
  const originalPrice = item.price;
  const discountedPrice =
    discount > 0 ? originalPrice * (1 - discount / 100) : originalPrice;
  const totalPrice = discountedPrice * item.quantity;

  return (
    <div className="flex items-center justify-between p-6 mb-4 rounded-2xl shadow-md bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100">
      <div className="flex items-center space-x-4 flex-1 min-w-0">
        <img
          src={item.images && item.images.length > 0 ? item.images[0] : "/placeholder.jpg"}
          alt={item.title}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="flex flex-col truncate">
          <span className="font-semibold truncate">{item.title}</span>
          {discount > 0 && (
            <span className="text-sm text-red-600 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-green-600 font-semibold">
            ${discountedPrice.toFixed(2)} each
          </span>
        </div>
        <button
          onClick={() => removeFromCart(item._id)}
          className="ml-4 p-2 hover:bg-red-600 rounded-lg transition"
          aria-label="Remove item"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleDecrease}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
          aria-label="Decrease quantity"
        >
          <Minus size={20} />
        </button>
        <span className="w-6 text-center font-mono">{item.quantity}</span>
        <button
          onClick={handleIncrease}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
          aria-label="Increase quantity"
        >
          <Plus size={20} />
        </button>
        <span className="ml-4 font-semibold font-mono">
          ${totalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
