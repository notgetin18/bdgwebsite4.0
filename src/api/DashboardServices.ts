import { funcForDecrypt } from "@/components/helperFunctions";
import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.baseUrl}`, // Replace with your API base URL
});

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

// export const fetchUserDetails = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     const configHeaders = {
//       headers: {
//         authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     };

//     const response = await fetch(
//       `${process.env.baseUrl}/auth/validate/token`,
//       configHeaders
//     );

//     if (!response.ok) {
//       throw new Error(`Failed to validate token. Status: ${response.status}`);
//     }

//     const data = await response.json();
//     const decryptedData = await funcForDecrypt(data.payload);
//     const userDetails = JSON.parse(decryptedData).data;
//     return userDetails;
//   } catch (error) {
//     console.error("Error fetching user details:", error);
//     // Handle errors here if needed
//   }
// };

// Example of using the function
// fetchUserDetails();
