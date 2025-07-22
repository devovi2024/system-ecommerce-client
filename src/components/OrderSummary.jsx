import React from 'react';
import { useCartStore } from '../stores/useCartStore';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied } = useCartStore();

  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto space-y-5 border"
    >
      <h2 className="text-xl font-bold border-b pb-3">🧾 Order Summary</h2>

      <div className="space-y-2 text-gray-700 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${formattedSubtotal}</span>
        </div>

        {savings > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>You Saved</span>
            <span>- ${formattedSavings}</span>
          </div>
        )}

        {coupon && isCouponApplied && (
          <div className="flex justify-between text-blue-600 font-medium">
            <span>Coupon</span>
            <span>{coupon.code} ({coupon.discountPercentage}%)</span>
          </div>
        )}

        <div className="flex justify-between font-bold text-lg border-t pt-3">
          <span>Total</span>
          <span>${formattedTotal}</span>
        </div>
      </div>

      <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
        Proceed to Checkout
      </button>

      <div className="text-center">
        <Link to="/" className="text-blue-600 hover:underline text-sm">
          ⬅️ Continue Shopping
        </Link>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
