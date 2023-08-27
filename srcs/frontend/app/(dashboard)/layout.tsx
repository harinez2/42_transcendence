import React from "react";
import Navbar from "./navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full flex-col bg-neutral-700 text-white">
      <Navbar />
      <div className="grow">{children}</div>
    </div>
  );
};

export default DashboardLayout;
