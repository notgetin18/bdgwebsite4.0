import CryptoJS from 'crypto-js';

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function AesDecrypt(data: any) {
  const key = "B?E(H+MbQeThWmZq4t7w!z$C&F)J@NcR";
  const iv = "AEF$#DQER@#R@#f3";
  var reb64 = CryptoJS.enc.Hex.parse(data);
  var bytes = reb64?.toString(CryptoJS.enc.Base64);
  let cipher = CryptoJS.AES.decrypt(bytes, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  //

  return cipher.toString(CryptoJS.enc.Utf8);
}

export function AesEncrypt(data: any) {
  const key = "B?E(H+MbQeThWmZq4t7w!z$C&F)J@NcR";
  const iv = "AEF$#DQER@#R@#f3";
  let cipher = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    CryptoJS.enc.Utf8.parse(key),
    {
      iv: CryptoJS.enc.Utf8.parse(iv), // parse the IV
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    }
  );

  // e.g. B6AeMHPHkEe7/KHsZ6TW/Q==
  let b64 = cipher.toString();
  let e64 = CryptoJS.enc.Base64.parse(b64);
  let eHex = e64.toString(CryptoJS.enc.Hex);
  return eHex;
}

export const funcForDecrypt = async (dataToBeDecrypt: any) => {
  const response = await AesDecrypt(dataToBeDecrypt);
  //
  return response;
};
export const funForAesEncrypt = async (dataToBeEncrypt: any) => {
  const response = await AesEncrypt(dataToBeEncrypt);
  //
  return response;
};
