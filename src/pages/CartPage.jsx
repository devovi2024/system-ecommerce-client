import React, { useEffect } from "react";
import { useCartStore } from "../stores/useCartStore";
import { ShoppingCart } from "lucide-react";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCart from "../components/GiftCouponCart";
import { motion } from "framer-motion";

const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 sm:px-0 text-gray-600 dark:text-gray-400">
    <ShoppingCart size={72} className="mb-6" />
    <h3 className="text-3xl font-semibold mb-3 text-center">Your cart is empty</h3>
    <p className="mb-6 max-w-md text-center text-lg leading-relaxed">
      Add some products to your cart to get started.
    </p>
    <Link
      to="/"
      className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Start shopping"
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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-12 text-gray-900 dark:text-white tracking-tight">
        Your Shopping Cart
      </h1>

      {!hasItems ? (
        <EmptyCart />
      ) : (
        <>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row gap-10"
          >
            {/* Cart Items */}
            <section aria-label="Shopping cart items" className="flex-1 space-y-6">
              {cart.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </section>

            {/* Order Summary & Coupon */}
            <aside aria-label="Order summary and coupon" className="w-full lg:w-[380px]">
              <div className="sticky top-20 bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 space-y-8 border border-gray-200 dark:border-gray-700">
                <OrderSummary />
                <GiftCouponCart />
              </div>
            </aside>
          </motion.section>

          {/* People Also Bought */}
          <section aria-label="People also bought products" className="mt-20">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8">
              People Also Bought
            </h2>
            <PeopleAlsoBought />
          </section>
        </>
      )}
    </main>
  );
};

export default CartPage;
