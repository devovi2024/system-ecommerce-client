import React, { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [dailySalesData, setDailySalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get("/analytics");
        const { analyticsData, dailySalesData } = res.data;

        setAnalyticsData({
          users: analyticsData.users,
          products: analyticsData.products,
          totalSales: analyticsData.sales,
          totalRevenue: analyticsData.revenue,
        });

        setDailySalesData(
          dailySalesData.map(({ date, totalSales, totalRevenue }) => ({
            date,
            totalSales,
            totalRevenue,
          }))
        );
      } catch (err) {
        setError("Failed to fetch analytics data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (isLoading)
    return (
      <div className="p-6 text-center text-gray-300 bg-gradient-to-br from-navyBlue-900 to-navyBlue-800 min-h-screen flex items-center justify-center">
        Loading analytics...
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-center text-red-400 font-semibold bg-gradient-to-br from-navyBlue-900 to-navyBlue-800 min-h-screen flex items-center justify-center">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1e3f] to-[#162d5d] p-6 max-w-6xl mx-auto space-y-8 text-gray-200">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Users", value: analyticsData.users, colorFrom: "from-purple-500", colorTo: "to-indigo-600" },
          { label: "Products", value: analyticsData.products, colorFrom: "from-green-400", colorTo: "to-teal-500" },
          { label: "Total Sales", value: analyticsData.totalSales, colorFrom: "from-pink-500", colorTo: "to-red-500" },
          { label: "Total Revenue", value: `$${analyticsData.totalRevenue.toFixed(2)}`, colorFrom: "from-yellow-400", colorTo: "to-orange-500" },
        ].map(({ label, value, colorFrom, colorTo }) => (
          <div
            key={label}
            className={`rounded-lg p-5 flex flex-col items-center bg-gradient-to-br ${colorFrom} ${colorTo} shadow-lg transform hover:scale-105 transition-transform duration-300`}
          >
            <p className="text-sm uppercase opacity-80">{label}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="bg-[#14274e] rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-200">
          Daily Sales (Last 7 Days)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailySalesData}>
            <CartesianGrid stroke="#2a3e7b" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              stroke="#9ca3af"
              tick={{ fontSize: 12, fill: "#cbd5e1" }}
            />
            <YAxis
              stroke="#9ca3af"
              tick={{ fontSize: 12, fill: "#cbd5e1" }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#1e293b", borderRadius: 8, border: 'none' }}
              labelStyle={{ color: "#facc15", fontWeight: "bold" }}
              formatter={(value) => `$${value}`}
            />
            <Line
              type="monotone"
              dataKey="totalSales"
              stroke="#8b5cf6" // violet-500
              strokeWidth={3}
              dot={{ r: 5, fill: "#a78bfa" }}
              activeDot={{ r: 8, fill: "#c4b5fd" }}
            />
            <Line
              type="monotone"
              dataKey="totalRevenue"
              stroke="#22c55e" // green-500
              strokeWidth={3}
              dot={{ r: 5, fill: "#4ade80" }}
              activeDot={{ r: 8, fill: "#86efac" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
