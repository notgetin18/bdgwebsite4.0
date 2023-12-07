import { funcForDecrypt } from "@/components/helperFunctions";
import React, { useEffect, useState } from "react";

interface Wallet {
  createdAt: null
  gold: number
  goldAvgPrice: number
  goldCurrentValue: number
  holdGoldGram: number
  holdSilverGram: number
  silver: number
  silverAvgPrice: number
  silverCurrentValue: number
  totalAmount: number
  updatedAt: String
  user_id: String
  _id: String
}

const VaultTab = () => {
  const [wallet, setWallet] = useState<Wallet>();

  useEffect(() => {
    apiForWallet()
  }, [])

  const apiForWallet = () => {
    const token = localStorage.getItem('token')
    fetch(`${process.env.baseUrl}/user/vault`, { headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }).then(response => response.json())
      .then(async (data) => {
        const decryptedData = await funcForDecrypt(data.payload);
        let userWallet = JSON.parse(decryptedData).data;
        setWallet(userWallet);
      })
      .catch(error => console.error(error));
  }
  // console.log('wallet', wallet)
  return (
    <div className="w-full">
      <div className=" grid grid-cols-2 gap-6">
        <div className="p-4 border-1 rounded-lg bg-themeLight grid grid-cols-2 gap-3 text-white">
          <p>Gold</p>
          <p></p>
          <p>Weight</p>
          <p className="text-right">Gifted Weight</p>
          <p className="text-green-500">{wallet?.gold}gm</p>
          <p className="text-green-500 text-right">{wallet?.holdGoldGram}gm</p>
        </div>
        <div className="p-4 border-1 rounded-lg bg-themeLight grid grid-cols-2 gap-3 text-white">
          <p>Silver</p>
          <p></p>
          <p>Weight</p>
          <p className="text-right">Gifted Weight</p>
          <p className="text-green-500">{wallet?.silver}gm</p>
          <p className="text-green-500 text-right">{wallet?.holdSilverGram}gm</p>
        </div>
      </div>
    </div>
  );
};

export default VaultTab;
