import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PurchaseSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-h-screen flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-[#0f1b2e] rounded-3xl p-12 text-center space-y-8  font-sans">
        <CheckCircle className="mx-auto text-[#3b82f6] w-20 h-20" />

        <h1
          className="text-4xl font-extrabold text-[#e0e7ff] leading-tight tracking-tight"
          style={{ fontFeatureSettings: '"liga", "kern"' }}
        >
          Payment Successful!
        </h1>

        <p
          className="text-gray-300 text-lg max-w-md mx-auto leading-relaxed"
          style={{ fontWeight: 400 }}
        >
          Thank you for your purchase. Your payment has been successfully processed.
        </p>

        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 shadow-md"
          style={{ boxShadow: '0 4px 14px rgb(37 99 235 / 0.6)' }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;
