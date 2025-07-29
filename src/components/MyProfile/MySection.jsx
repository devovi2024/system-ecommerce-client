// components/MyProfile/MySection.jsx
import React from "react";
import Sidebar from "./Sidebar";
import SectionContent from ".//SectionContent";

const tabMap = {
  order: "My Orders",
  profile: "Profile",
};

const MySection = ({ activeTabParam }) => {
  const tabTitle = tabMap[activeTabParam] || "My Orders";

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <Sidebar activeTab={tabTitle} />
      <SectionContent section={tabTitle} />
    </div>
  );
};

export default MySection;
