import React, { useEffect } from "react";
import { useCartStore } from "../stores/useCartStore";
import CartItem from "../components/CartItem";
import { motion } from "framer-motion";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCart from "../components/GiftCouponCart";
import EmptyCart from "../components/EmptyCart";
import CartHeader from "../components/CartHeader";

const CartPage = () => {
  const { cart = [], getCartItems } = useCartStore();

  useEffect(() => {
    getCartItems?.();
  }, [getCartItems]);

  const hasItems = cart.length > 0;

  return (
    <main className="px-4 sm:px-8 lg:px-12 py-10">
      <div>
        <CartHeader />
      </div>

      {!hasItems ? (
        <EmptyCart />
      ) : (
        <>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col lg:flex-row gap-12"
          >
            {/* Cart Items */}
            <section
              aria-label="Shopping cart items"
              className="flex-1 space-y-6"
            >
              {cart.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </section>

            {/* Order Summary & Coupon */}
            <aside
              aria-label="Order summary and coupon"
              className="w-full lg:w-[400px] sticky top-24 self-start"
            >
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 space-y-8">
                <OrderSummary />
                <GiftCouponCart />
              </div>
            </aside>
          </motion.section>
        </>
      )}
    </main>
  );
};

export default CartPage;
