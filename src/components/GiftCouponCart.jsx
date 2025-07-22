import React, { useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { BadgePercent, CheckCircle2 } from "lucide-react";

const GiftCouponCart = () => {
  const [code, setCode] = useState("");
  const { applyCoupon, isCouponApplied, coupon } = useCartStore();

  const handleApply = async () => {
    if (!code.trim()) return;
    await applyCoupon(code.trim());
    setCode("");
  };

  return (
    <section
      className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-300 dark:border-gray-700 max-w-md mx-auto w-full"
      aria-label="Coupon application form"
    >
      <header className="flex items-center gap-3 mb-5 text-gray-900 dark:text-gray-100">
        <BadgePercent className="w-6 h-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
        <h3 className="text-lg font-semibold tracking-tight">Apply Coupon</h3>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleApply();
        }}
        className="flex gap-3"
        role="form"
      >
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter coupon code"
          aria-label="Coupon code"
          autoComplete="off"
          className="flex-grow rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 px-4 py-2 text-sm transition"
        />

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:ring-indigo-500 focus-visible:ring-4 text-white px-5 py-2 rounded-lg font-semibold text-sm transition"
          aria-label="Apply coupon"
        >
          Apply
        </button>
      </form>

      {isCouponApplied && coupon && (
        <div
          className="flex items-center gap-2 text-green-600 mt-5 font-semibold tracking-tight"
          role="alert"
          aria-live="polite"
        >
          <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
          <p>
            Coupon <strong>{coupon.code}</strong> applied — {coupon.discountPercentage}% off
          </p>
        </div>
      )}
    </section>
  );
};

export default GiftCouponCart;
