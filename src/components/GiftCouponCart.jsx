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
      className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md"
      aria-label="Coupon application form"
    >
      <header className="flex items-center gap-3 mb-5 text-gray-800 dark:text-white">
        <BadgePercent className="w-6 h-6 text-blue-600" aria-hidden="true" />
        <h3 className="text-lg font-semibold">Apply Coupon</h3>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleApply();
        }}
        className="flex items-center gap-3"
      >
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-grow px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
          placeholder="Enter coupon code"
          aria-label="Coupon code"
          autoComplete="off"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Apply coupon"
        >
          Apply
        </button>
      </form>

      {isCouponApplied && coupon && (
        <div
          className="flex items-center gap-2 text-green-600 mt-4 font-semibold"
          role="alert"
          aria-live="polite"
        >
          <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
          <p>
            Coupon <strong>{coupon.code}</strong> applied —{" "}
            {coupon.discountPercentage}% off
          </p>
        </div>
      )}
    </section>
  );
};

export default GiftCouponCart;
