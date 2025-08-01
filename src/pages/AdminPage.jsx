import React, { useEffect, useState } from 'react';
import { PlusCircle, ShoppingBag, BarChart3, Layers, Tag } from 'lucide-react'; // added Tag icon for Discount tab
import CreateProductForm from '../components/CreateProductForm';
import ProductList from '../components/ProductList';
import Analytics from '../components/Analytics';
import CategoryManager from '../components/CategoryManager';
import DiscountManage from '../components/DiscountManage'; // import your discount component
import { useProductStore } from '../stores/useProductStore';

const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBag },
  { id: "categories", label: "Categories", icon: Layers },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "discounts", label: "Discounts", icon: Tag }, // new Discounts tab
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("create");
  const { fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-950 p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-white drop-shadow">
        Admin Dashboard
      </h1>

      <div className="flex justify-center gap-6 mb-10 flex-wrap">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full transition duration-200 font-medium shadow-xl
                ${isActive
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-blue-300 hover:bg-slate-700"
                }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="max-w-4xl mx-auto">
        {activeTab === "create" && <CreateProductForm />}
        {activeTab === "products" && <ProductList />}
        {activeTab === "categories" && <CategoryManager />}
        {activeTab === "analytics" && <Analytics />}
        {activeTab === "discounts" && <DiscountManage />} {/* Render DiscountProduct */}
      </div>
    </div>
  );
}
