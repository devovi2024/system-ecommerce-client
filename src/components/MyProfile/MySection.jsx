import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import SectionContent from "./SectionContent";

const MySection = () => {
  const location = useLocation();
  const defaultTab = location.state?.section || "My Orders";
  const [active, setActive] = useState(defaultTab);

  useEffect(() => {
    if (location.state?.section) {
      setActive(location.state.section);
    }
  }, [location.state]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <Sidebar activeTab={active} setActiveTab={setActive} />
      <SectionContent section={active} />
    </div>
  );
};

export default MySection;
