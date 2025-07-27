import React, { useEffect } from "react";
import { FaTruck, FaCheckCircle, FaTimesCircle, FaSpinner, FaUndo } from "react-icons/fa";
import { MdOutlineCancel, MdOutlinePayments } from "react-icons/md";
import { useOrdersStore } from "../stores/useOrderStore";

const statusColors = {
  PROCESSING: "bg-yellow-300 text-yellow-900",
  COMPLETED: "bg-green-300 text-green-900",
  CANCELLED: "bg-red-300 text-red-900",
  RETURNED: "bg-gray-300 text-gray-900",
  APPROVED: "bg-blue-300 text-blue-900",
  ON_SHIPPING: "bg-indigo-300 text-indigo-900",
  SHIPPED: "bg-purple-300 text-purple-900",
};

const statusIcons = {
  PROCESSING: <FaSpinner className="inline animate-spin mr-1" />,
  COMPLETED: <FaCheckCircle className="inline mr-1" />,
  CANCELLED: <FaTimesCircle className="inline mr-1" />,
  RETURNED: <FaUndo className="inline mr-1" />,
  APPROVED: <FaCheckCircle className="inline mr-1" />,
  ON_SHIPPING: <FaTruck className="inline mr-1" />,
  SHIPPED: <FaTruck className="inline mr-1" />,
};

const MyOrders = () => {
  const {
    filteredOrders,
    statusFilter,
    setStatusFilter,
    fetchOrders,
    loading,
    cancelOrder,
  } = useOrdersStore();

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a2540] text-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <label className="text-white text-sm">Status:</label>
            <select
              className="rounded px-3 py-2 text-sm text-gray-800 bg-white shadow"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>Select Any</option>
              <option>PROCESSING</option>
              <option>COMPLETED</option>
              <option>RETURNED</option>
              <option>CANCELLED</option>
              <option>APPROVED</option>
              <option>ON_SHIPPING</option>
              <option>SHIPPED</option>
            </select>
          </div>
        </div>

        {loading && <p className="text-center text-white">Loading orders...</p>}

        <div className="space-y-6">
          {!loading && filteredOrders.length === 0 && (
            <p className="text-center text-white">No orders found for this status.</p>
          )}

          {!loading &&
            filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white text-gray-800 rounded-xl shadow-md p-4 flex gap-4"
              >
                <img
                  src={order.products[0]?.product?.image || "/placeholder.png"}
                  alt={order.products[0]?.product?.title || "Product"}
                  className="w-24 h-32 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold">
                        {order.products[0]?.product?.title || "Product Title"}
                      </h2>
                      <p className="text-sm mt-1">
                        Order ID:{" "}
                        <span className="text-blue-600">{order._id}</span>
                      </p>
                      <p className="text-sm mt-1">
                        Price: TK.{" "}
                        {order.products
                          .reduce(
                            (sum, p) => sum + p.price * p.quantity,
                            0
                          )
                          .toFixed(2)}
                      </p>
                    </div>
                    <div
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        statusColors[order.status] || "bg-gray-300 text-gray-900"
                      }`}
                    >
                      {statusIcons[order.status]} {order.status}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2 flex-wrap">
                    {order.status === "COMPLETED" && (
                      <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm">
                        <FaTruck className="inline mr-1" /> Track Order
                      </button>
                    )}

                    {order.status === "PROCESSING" && (
                      <>
                        <button
                          onClick={() => cancelOrder(order._id)}
                          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm"
                        >
                          <MdOutlineCancel className="inline mr-1" /> Cancel
                        </button>
                        <button className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 text-sm">
                          <MdOutlinePayments className="inline mr-1" /> Pay by Nagad
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
