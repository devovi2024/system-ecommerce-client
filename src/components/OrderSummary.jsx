import React from "react";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { Percent, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied } = useCartStore();

  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto space-y-6 border border-gray-200 dark:border-gray-700"
      aria-label="Order summary"
    >
      <header className="flex items-center gap-2 border-b pb-3">
        <ShoppingBag className="w-6 h-6 text-gray-700 dark:text-gray-300" aria-hidden="true" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Order Summary</h2>
      </header>

      <dl className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
        <div className="flex justify-between">
          <dt className="font-medium">Subtotal</dt>
          <dd className="font-mono">${formattedSubtotal}</dd>
        </div>

        {savings > 0 && (
          <div className="flex justify-between text-green-600 font-semibold">
            <dt>You Saved</dt>
            <dd className="font-mono">- ${formattedSavings}</dd>
          </div>
        )}

        {coupon && isCouponApplied && (
          <div className="flex justify-between items-center text-blue-600 font-semibold">
            <dt className="flex items-center gap-1">
              <Percent className="w-4 h-4" aria-hidden="true" />
              Coupon
            </dt>
            <dd className="font-mono">
              {coupon.code} ({coupon.discountPercentage}%)
            </dd>
          </div>
        )}

        <div className="flex justify-between font-bold text-lg border-t pt-3">
          <dt>Total</dt>
          <dd className="font-mono">${formattedTotal}</dd>
        </div>
      </dl>

      <button
        type="button"
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        aria-label="Proceed to checkout"
      >
        Proceed to Checkout
      </button>

      <div className="text-center">
        <Link
          to="/"
          className="text-blue-600 hover:underline text-sm"
          aria-label="Continue shopping"
        >
          &larr; Continue Shopping
        </Link>
      </div>
    </motion.section>
  );
};

export default OrderSummary;
