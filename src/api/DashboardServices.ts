import { funcForDecrypt } from "@/components/helperFunctions";

export const metalPrice = async () => {
  const price = await fetch(`${process.env.baseUrl}/public/metal/price`, {
    headers: { "content-type": "application/json" },
  })
    .then((response) => response.json())
    .then(async (data) => {
      const decryptedData = await funcForDecrypt(data.payload);
      console.log("JSON.parse(decryptedData)", JSON.parse(decryptedData));
    });

  console.log("price ====> ", price);
};
