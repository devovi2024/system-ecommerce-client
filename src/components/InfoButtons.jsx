import React from "react";
import { Truck, PlayCircle, Gift } from "lucide-react";

const InfoButtons = () => {
  const baseClasses =
    "flex items-center justify-between gap-4 w-full md:w-auto  text-white border border-blue-700 rounded-xl px-6 py-5 transition-all hover:bg-[#11293E] shadow-md";

  const textClasses = "text-lg font-semibold tracking-wide";

  return (
    <div className="flex flex-col md:flex-row gap-4  ">
      <button className={baseClasses}>
        <Truck className="w-7 h-7 text-yellow-400" />
        <span className={textClasses}>Nationwide Home Delivery</span>
      </button>

      <button className={baseClasses}>
        <span className={textClasses}>How to Place an Order</span>
        <PlayCircle className="w-7 h-7 text-blue-400" />
      </button>

      <button className={baseClasses}>
        <span className={textClasses}>Win Points by Shopping</span>
        <Gift className="w-7 h-7 text-yellow-400 bg-orange-500 rounded-full p-1" />
      </button>
    </div>
  );
};

export default InfoButtons;
