import React from 'react';
import { XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PurchaseCancelPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-white dark:from-gray-800 dark:to-gray-900 px-4 py-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="mb-6"
      >
        <XCircle className="text-red-500 w-20 h-20" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold text-gray-800 dark:text-white mb-4"
      >
        Oh no! Your payment didn’t go through.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 dark:text-gray-300 max-w-xl mb-6"
      >
        It looks like your checkout was canceled or something went wrong.
        Don’t worry — your cart is still safe, and you can try again anytime.
        If you need help, we’re always here for you.
      </motion.p>

      <div className="flex gap-4">
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-lg transition"
        >
          Return to Home
        </Link>
        <Link
          to="/cart"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white px-6 py-2 rounded-xl text-lg transition"
        >
          Back to Cart
        </Link>
      </div>

      <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
        Still facing issues? <span className="underline cursor-pointer text-blue-600 hover:text-blue-800">Contact Support</span>
      </p>
    </div>
  );
};

export default PurchaseCancelPage;
