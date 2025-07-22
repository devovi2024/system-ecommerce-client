import { ShoppingCart } from "lucide-react";

export default function CartHeader() {
  return (
    <div className="relative overflow-hidden">
      <h1 className="text-4xl sm:text-5xl mb-14 text-gray-900 dark:text-white tracking-tight leading-tight">
        Your Shopping Cart
      </h1>

      {/* Scrolling sentence with icon on the right */}
      <div className="absolute top-0 right-0 h-10 flex items-center overflow-hidden w-full max-w-xs">
        <div className="flex space-x-4 animate-scrollText">
          <ShoppingCart className="text-indigo-600" size={24} />
          <p className="whitespace-nowrap text-indigo-700 font-semibold">
            Thank you for shopping with us! Every purchase supports a better future.
          </p>
        </div>
      </div>

      {/* Add this style to your global CSS or in a <style jsx> */}
      <style jsx>{`
        @keyframes scrollText {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scrollText {
          animation: scrollText 15s linear infinite;
        }
      `}</style>
    </div>
  );
}
