import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import BottomNavbar from "../components/BottomNavbar";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 pb-20 md:pb-0">
        <Outlet />
      </main>
      <BottomNavbar />
    </div>
  );
};

export default AppLayout;
