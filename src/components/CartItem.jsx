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

  return (
    <div className="flex items-center justify-between p-4 mb-4 rounded-lg shadow-md bg-[#0B1F3A] text-white">
      <div className="flex items-center space-x-4 flex-1 min-w-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="flex flex-col truncate">
          <span className="font-semibold truncate">{item.title}</span>
        </div>
        <button
          onClick={() => removeFromCart(item._id)}
          className="ml-4 p-2 hover:bg-red-600 rounded"
          aria-label="Remove item"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleDecrease}
          className="p-2 hover:bg-gray-700 rounded"
          aria-label="Decrease quantity"
        >
          <Minus size={20} />
        </button>
        <span className="w-6 text-center">{item.quantity}</span>
        <button
          onClick={handleIncrease}
          className="p-2 hover:bg-gray-700 rounded"
          aria-label="Increase quantity"
        >
          <Plus size={20} />
        </button>
        <span className="ml-4 font-semibold">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
