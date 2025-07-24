import React, { useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { BadgePercent, CheckCircle2, XCircle } from "lucide-react";

const GiftCouponCart = () => {
  const [code, setCode] = useState("");
  const {
    applyCoupon,
    removeCoupon,
    isCouponApplied,
    coupon,
  } = useCartStore();

  const handleApply = async () => {
    if (!code.trim()) return;
    await applyCoupon(code.trim());
    setCode("");
  };

  return (
    <section className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm max-w-md mx-auto w-full">
      <header className="flex items-center gap-3 mb-4 text-gray-800 dark:text-white">
        <BadgePercent className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-lg font-semibold">Apply Discount Coupon</h3>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleApply();
        }}
        className="flex gap-3"
      >
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onBlur={(e) => setCode(e.target.value.trim())}
          placeholder="Enter coupon code"
          autoComplete="off"
          className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={!code.trim()}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Apply
        </button>
      </form>

      {isCouponApplied && coupon && (
        <div className="mt-5 flex items-center justify-between bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 px-4 py-2 rounded-lg text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>
              <strong>{coupon.code}</strong> applied — {coupon.discountPercentage}% off
            </span>
          </div>
          <button
            onClick={removeCoupon}
            className="hover:text-red-500 transition"
            title="Remove coupon"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  );
};

export default GiftCouponCart;
