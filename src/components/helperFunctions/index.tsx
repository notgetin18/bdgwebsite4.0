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

export function ParseFloat(str: any, val: any) {
  str = str.toString();
  if (Number.isInteger(Number(str))) {
    return Number(str);
  } else {
    str = str.slice(0, str.indexOf(".") + val + 1);
  }
  return Number(str);
}

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Card = ({ title, description, imageUrl, linkTo }: any) => {
  const formattedDescription = description.replace(/LIMITED/g, 'LIMITED<br />');

  return (
    <Link href={linkTo}>
      <div className="max-w-xs coins_background rounded overflow-hidden shadow-lg flex flex-col items-center">
        <Image className="" src={imageUrl} alt={title} width={50} height={50} />
        <div className="font-bold text-xl mb-2 text-white">{title}</div>
        <div
          className="px-6 py-4 text-center"
          dangerouslySetInnerHTML={{ __html: formattedDescription }}
        />
      </div>
    </Link>
  );
};



