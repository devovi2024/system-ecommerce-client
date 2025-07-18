import React, { useEffect, useState } from "react";

const ConfirmModal = ({ message, onConfirm, onCancel, loading }) => {
  const [progress, setProgress] = useState(0);
  const duration = 3;

  useEffect(() => {
    if (!loading) {
      setProgress(0);
      return;
    }
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct === 100) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#10172a] p-6 rounded max-w-sm w-full text-white shadow">
        <p className="mb-6 text-center text-lg">{message}</p>
        {loading && (
          <>
            <div className="bg-gray-700 rounded h-4 overflow-hidden mb-2">
              <div
                className="bg-red-600 h-4 transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-sm">
              {(duration - (progress / 100) * duration).toFixed(1)}s left
            </p>
          </>
        )}
        <div className="flex justify-center gap-4 mt-4">
          <button
            disabled={loading}
            onClick={onCancel}
            className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={onConfirm}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
