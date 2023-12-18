import MyAccountTabs from "@/components/myAccount/tabs/tabs";
import React from "react";

const Profile = () => {
  return (
    <div className="bg-theme">
      <div className="mx-auto px-2 sm:px-6 lg:px-16 py-8">
        <MyAccountTabs />
      </div>
    </div>
  );
};

export default Profile;
