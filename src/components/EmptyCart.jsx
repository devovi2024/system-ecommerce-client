import React from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 sm:px-0 text-gray-500 dark:text-gray-400">
    <ShoppingCart size={72} className="mb-8 text-indigo-500" />
    <h3 className="text-3xl font-extrabold mb-4 text-center text-gray-900 dark:text-white">
      Your cart is empty
    </h3>
    <p className="mb-8 max-w-md text-center text-lg leading-relaxed">
      Add some products to your cart to get started.
    </p>
    <Link
      to="/"
      className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition duration-300 font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500"
      aria-label="Start shopping"
    >
      Start Shopping
    </Link>
  </div>
);

export default EmptyCart;
