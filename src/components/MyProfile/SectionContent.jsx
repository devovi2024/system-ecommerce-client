import React from "react";
import MyOrders from "../MyOrders";
import ProfileForm from "./ProfileForm";

const SectionContent = ({ section }) => {
  const renderContent = () => {
    switch (section) {
      case "My Orders":
        return <MyOrders />;
        case "Profile" :
            return <ProfileForm/>;
       
      default:
        return (
          <div className="flex-1 p-10 text-slate-100">
            <h1 className="text-3xl font-bold mb-4">{section}</h1>
            <p className="text-slate-400 text-sm">
              Content for <strong>{section}</strong> will appear here.
            </p>
          </div>
        );
    }
  };

  return <div className="flex-1 overflow-y-auto bg-slate-900 p-6">{renderContent()}</div>;
};

export default SectionContent;
