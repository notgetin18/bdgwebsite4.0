import DashboardTopTabs from "@/components/dashboard/tabs/tabs";
import React from "react";

const Dashboard = () => {
  return (
    <div className="bg-theme">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-2 py-8">
        <DashboardTopTabs />
      </div>
    </div>
  );
};

export default Dashboard;
