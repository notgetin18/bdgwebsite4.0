import { funcForDecrypt } from "@/components/helperFunctions";

export const metalPrice = async () => {
  try {
    const response = await fetch(`${process.env.baseUrl}/public/metal/price`, {
      headers: { "content-type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch metal price. Status: ${response.status}`
      );
    }

    const data = await response.json();
    const decryptedData = await funcForDecrypt(data.payload);
    // console.log("JSON.parse(decryptedData)", JSON.parse(decryptedData));
    return decryptedData;
  } catch (error) {
    console.error("Error fetching metal price:", error);
  }
};

export const fetchCoupons = async () => {
  try {
    const response = await fetch(`${process.env.baseUrl}/public/coupons`, {
      headers: { "content-type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Coupons. Status: ${response.status}`);
    }

    const data = await response.json();
    const decryptedData = await funcForDecrypt(data.payload);
    // console.log("JSON.parse(decryptedData)", JSON.parse(decryptedData));
    return decryptedData;
  } catch (error) {
    console.error("Error fetching metal price:", error);
  }
};
