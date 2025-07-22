import React from "react";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { Percent, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";

const stripePromise = loadStripe(
  "pk_test_51Rnhq5CWiY0jcsxLSAGpY6WbRu0cZCN7rJT6N1PssborHer4ZNg9X7D5Vwmt9pcRgojDz0k9YYKGrJpc8koyDmc700emqIAHzI"
);

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    try {
      const res = await axios.post("/payments/create-checkout-session", {
        products: cart,
        couponCode: coupon ? coupon.code : null,
      });
      const session = res.data;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result.error) {
        console.error("Stripe error:", result.error.message);
      }
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-300 dark:border-gray-700 max-w-md mx-auto w-full"
      aria-label="Order summary"
    >
      <header className="flex items-center gap-3 border-b border-gray-300 dark:border-gray-700 pb-4 text-gray-900 dark:text-gray-100">
        <ShoppingBag
          className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
          aria-hidden="true"
        />
        <h2 className="text-xl font-semibold tracking-tight">Order Summary</h2>
      </header>

      <dl className="mt-6 space-y-4 text-gray-700 dark:text-gray-300 text-base">
        <div className="flex justify-between">
          <dt className="font-semibold">Subtotal</dt>
          <dd className="font-mono">${formattedSubtotal}</dd>
        </div>

        {savings > 0 && (
          <div className="flex justify-between text-green-600 font-semibold">
            <dt>You Saved</dt>
            <dd className="font-mono">- ${formattedSavings}</dd>
          </div>
        )}

        {coupon && isCouponApplied && (
          <div className="flex items-center gap-3 border-b border-gray-300 dark:border-gray-700 pb-4">
            <dt className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <Percent className="w-5 h-5" aria-hidden="true" />
              Coupon
            </dt>
            <dd className="font-mono">
              {coupon.code} ({coupon.discountPercentage}%)
            </dd>
          </div>
        )}

        <div className="flex justify-between font-bold text-lg border-t border-gray-300 dark:border-gray-700 pt-5">
          <dt>Total</dt>
          <dd className="font-mono">${formattedTotal}</dd>
        </div>
      </dl>

      <button
        onClick={handlePayment}
        type="button"
        className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:ring-indigo-500 focus-visible:ring-4 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
        aria-label="Proceed to checkout"
      >
        Proceed to Checkout
      </button>

      <div className="text-center mt-5">
        <Link
          to="/"
          className="text-indigo-600 hover:underline text-sm font-medium"
          aria-label="Continue shopping"
        >
          &larr; Continue Shopping
        </Link>
      </div>
    </motion.section>
  );
};

export default OrderSummary;
