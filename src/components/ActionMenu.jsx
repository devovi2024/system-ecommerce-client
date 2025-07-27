import React, { useState, useRef, useEffect } from "react";
import {
  Share2,
  Flag,
  MoreHorizontal,
  Facebook,
  Twitter,
  Link as LinkIcon,
  Bookmark,
  EyeOff,
  Slash,
  X,
} from "lucide-react";

const REPORT_REASONS = [
  "Inappropriate content",
  "Fake information",
  "Spam or misleading",
  "Violent or repulsive",
  "Harassment or bullying",
  "Hate speech",
  "Sexual content",
  "Privacy violation",
  "Copyright infringement",
  "Other",
];

const ActionMenu = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // ESC to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleReportSubmit = (e) => {
    e.preventDefault();
    alert("✅ Report submitted. Thank you!");
    setShowModal(false);
  };

  return (
    <>
      <div className="flex ">
        <div ref={dropdownRef} className="relative flex items-center gap-2 sm:gap-4">
          {/* Share */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === "share" ? null : "share")}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              title="Share"
            >
              <Share2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            {openDropdown === "share" && (
              <div className="absolute z-50 top-12 left-0 bg-white dark:bg-gray-900 shadow-xl rounded-xl w-48 p-3 text-sm space-y-2">
                <button onClick={() => window.open("https://facebook.com")} className="flex items-center gap-2 hover:text-blue-600">
                  <Facebook size={16} /> Facebook
                </button>
                <button onClick={() => window.open("https://twitter.com")} className="flex items-center gap-2 hover:text-sky-500">
                  <Twitter size={16} /> Twitter
                </button>
                <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="flex items-center gap-2 hover:text-green-600">
                  <LinkIcon size={16} /> Copy Link
                </button>
              </div>
            )}
          </div>

          {/* Report */}
          <div>
            <button
              onClick={() => setShowModal(true)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              title="Report"
            >
              <Flag className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          {/* More */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === "more" ? null : "more")}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              title="More"
            >
              <MoreHorizontal className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            {openDropdown === "more" && (
              <div className="absolute z-50 top-12  bg-white dark:bg-gray-900 shadow-xl rounded-xl w-56 p-3 text-sm space-y-2">
                <button className="flex items-center gap-2 hover:text-yellow-500">
                  <Bookmark size={16} /> Save for later
                </button>
                <button className="flex items-center gap-2 hover:text-gray-500">
                  <EyeOff size={16} /> Hide content
                </button>
                <button className="flex items-center gap-2 hover:text-red-500">
                  <Slash size={16} /> Block content
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Report this content
            </h2>
            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Reason for reporting
                </label>
                <select
                  required
                  className="w-full border rounded-md p-2 dark:bg-gray-800 dark:text-white"
                >
                  <option value="">Select reason</option>
                  {REPORT_REASONS.map((reason, idx) => (
                    <option key={idx} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Additional Details (optional)
                </label>
                <textarea
                  rows="4"
                  className="w-full border rounded-md p-2 dark:bg-gray-800 dark:text-white"
                  placeholder="Explain what happened..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white rounded-md py-2 hover:bg-red-700 transition"
              >
                Submit Report
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ActionMenu;
