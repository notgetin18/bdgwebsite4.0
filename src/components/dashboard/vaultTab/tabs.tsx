import React from "react";

const VaultTab = () => {
  return (
    <div className="w-full">
      <div className=" grid grid-cols-2 gap-6">
        <div className="p-4 border-1 rounded-lg bg-themeLight grid grid-cols-2 gap-3 text-white">
          <p>Gold</p>
          <p></p>
          <p>Weight</p>
          <p className="text-right">Gifted Weight</p>
          <p className="text-green-500">0.0031gm</p>
          <p className="text-green-500 text-right">0.0031gm</p>
        </div>
        <div className="p-4 border-1 rounded-lg bg-themeLight grid grid-cols-2 gap-3 text-white">
          <p>Silver</p>
          <p></p>
          <p>Weight</p>
          <p className="text-right">Gifted Weight</p>
          <p className="text-green-500">0.0031gm</p>
          <p className="text-green-500 text-right">0.0031gm</p>
        </div>
      </div>
    </div>
  );
};

export default VaultTab;
