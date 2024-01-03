import { funcForDecrypt } from "@/components/helperFunctions";
import { Wallet } from "@/types";
import React, { memo, useEffect, useState } from "react";

const Vault = () => {
  const [wallet, setWallet] = useState<Wallet>();

  useEffect(() => {
    apiForWallet();
  }, []);

  const apiForWallet = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.baseUrl}/user/vault`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        const decryptedData = await funcForDecrypt(data.payload);
        let userWallet = JSON.parse(decryptedData).data;
        setWallet(userWallet);
      })
      .catch((error) => console.error(error));
  };
  console.log("wallet", wallet);
  return (
    <div className="w-full">
      <div className=" grid sm:grid-cols-2 gap-6">
        <div className="p-4 border-1 rounded-lg bg-themeLight grid grid-cols-2 gap-3 text-white">
          <p>
            <img src="/Goldbarbanner.png" className="h-5 inline-block mr-2" />{" "}
            Gold Weight
          </p>
          <p className="text-right">
            {" "}
            <img src="/ban3.png" className="h-7 inline-block mr-1" /> Gifted
            Weight
          </p>
          <p className="text-green-500">{wallet?.gold}gm</p>
          <p className="text-green-500 text-right">{wallet?.holdGoldGram}gm</p>
        </div>
        <div className="p-4 border-1 rounded-lg bg-themeLight grid grid-cols-2 gap-3 text-white">
          <p>
            {" "}
            <img src="/Silverbar.png" className="h-5 inline-block mr-2" />{" "}
            Silver Weight
          </p>
          <p className="text-right">
            <img src="/ban3.png" className="h-7 inline-block mr-1" /> Gifted
            Weight
          </p>
          <p className="text-green-500">{wallet?.silver}gm</p>
          <p className="text-green-500 text-right">
            {wallet?.holdSilverGram}gm
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(Vault);
