import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingSpinner() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), 5000); 
    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f172a]">
      <motion.div
        className="w-24 h-24 border-8 border-t-transparent border-emerald-400 rounded-full shadow-[0_0_30px_#34d399]"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />
    </div>
  );
}
