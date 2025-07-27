import React from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, PackageCheck, Settings, UserCircle } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const navItems = [
    { name: "My Orders", icon: <PackageCheck className="w-5 h-5" />, tab: "My Orders", path: "/my-orders" },
    // { name: "Whitelist", icon: <PackageCheck className="w-5 h-5" />, tab: "Whitelist", path: "/whitelist" },
    { name: "Profile", icon: <UserCircle className="w-5 h-5" />, tab: "Profile", path: "/profile" },
    // { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, tab: "Dashboard", path: "/dashboard" },
    // { name: "Settings", icon: <Settings className="w-5 h-5" />, tab: "Settings", path: "/settings" },
  ];

  const handleClick = (item) => {
    setActiveTab(item.tab);
    navigate(item.path);
  };

  return (
    <aside className="w-full sm:w-64 bg-[#0f172a] text-white h-full p-5 rounded-xl shadow-xl">
      <h2 className="text-xl font-bold mb-6 border-b border-slate-600 pb-2">My Section</h2>
      <ul className="space-y-3">
        {navItems.map((item) => (
          <li key={item.tab}>
            <button
              onClick={() => handleClick(item)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                activeTab === item.tab ? "bg-blue-600" : "hover:bg-blue-900"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
