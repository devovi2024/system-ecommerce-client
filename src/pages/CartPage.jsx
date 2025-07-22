import React, { useEffect } from "react";
import { useCartStore } from "../stores/useCartStore";
import { ShoppingCart } from "lucide-react";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import { motion } from "framer-motion";

const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
    <ShoppingCart size={48} className="mb-4" />
    <h3 className="text-2xl font-semibold mb-2">Your cart is empty</h3>
    <p className="mb-4 text-center">Add something to your cart to get started.</p>
    <Link
      to="/"
      className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
    >
      Start Shopping
    </Link>
  </div>
);

const CartPage = () => {
  const { cart = [], getCartItems } = useCartStore();

  useEffect(() => {
    getCartItems?.();
  }, [getCartItems]);

  const hasItems = cart.length > 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        🛒 Your Cart
      </h1>

      {!hasItems ? (
        <EmptyCart />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => item && <CartItem key={item._id} item={item} />)}
          </div>
          <div className="w-full">
            <OrderSummary />
          </div>
        </motion.div>
      )}

      <div className="mt-16">
        <PeopleAlsoBought />
      </div>
    </div>
  );
};

export default CartPage;
