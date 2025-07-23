import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/useCartStore';
import axios from '../lib/axios';

const PurchaseSuccessPage = () => {
  const [isProcessing, setProcessing] = useState(true);
  const navigate = useNavigate();
  const { clearCart } = useCartStore();

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get('session_id');

    if (!sessionId) {
      setProcessing(false);
      return;
    }

    const confirmPayment = async () => {
      try {
        await axios.post('/payments/checkout-success', { sessionId });
        clearCart();
      } catch (error) {
        console.error("❌ Payment failed:", error.response?.data || error.message);
      } finally {
        setProcessing(false);
      }
    };

    confirmPayment();
  }, [clearCart]);

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="text-lg text-white">Processing your payment...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0f172a]">
      <div className="max-w-lg w-full bg-[#0f1b2e] rounded-3xl p-12 text-center space-y-8 font-sans shadow-lg">
        <CheckCircle className="mx-auto text-[#3b82f6] w-20 h-20" />
        <h1 className="text-4xl font-extrabold text-[#e0e7ff] leading-tight tracking-tight">
          Payment Successful!
        </h1>
        <p className="text-gray-300 text-lg max-w-md mx-auto leading-relaxed">
          Thank you for your purchase. Your payment has been successfully processed.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 shadow-md"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;
