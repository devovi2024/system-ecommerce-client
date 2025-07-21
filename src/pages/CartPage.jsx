import React, { useEffect } from "react";
import { useCartStore } from "../stores/useCartStore";
import { ShoppingCart } from "lucide-react";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
    <ShoppingCart size={48} className="mb-4" />
    <h3 className="text-2xl font-semibold mb-2">Your cart is empty</h3>
    <p className="mb-4">Add something to your cart to get started.</p>
    <Link
      to="/"
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Start Shopping
    </Link>
  </div>
);

const CartPage = () => {
  const { cart = [], getCartItems } = useCartStore();

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="space-y-4">
          {cart.map((item) => item && <CartItem key={item._id} item={item} />)}
        </div>
      )}
    </div>
  );
};

export default CartPage;
