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
          className="px-6 py-4 text-center text-white"
          dangerouslySetInnerHTML={{ __html: formattedDescription }}
        />
      </div>
    </Link>
  );
};


type InputType = "text" | "number" | "email" | "password" | "date" | "textarea";
interface InputProps {
  type?: InputType;
  autoComplete?: string;
  required?: boolean;
  label?: string;
  formik: any;
  name: string;
  onblur?: any;
  placeholder?: any;
  extra?: object;
}

const FormInput = ({
  type,
  autoComplete,
  required,
  label,
  name,
  formik,
  placeholder,
  onblur,
  extra,
}: InputProps) => {
  return (
    <div className={styles.p0}>
      {label && (
        <label htmlFor="email" className={styles.p1}>
          {label}
        </label>
      )}
      <div className={styles.p4}>
        <input
          id={name}
          name={name}
          type={type || "text"}
          onChange={formik.handleChange}
          onBlur={onblur}
          value={formik.values[name]}
          autoComplete={autoComplete}
          required={required || false}
          placeholder={placeholder || `${label}${required ? "" : ""}`}
          className={styles.p2}
          {...extra}
        />
        {formik.touched[name] && formik.errors[name] ? (
          <span className={styles.p3}>{formik.errors[name]}</span>
        ) : null}
      </div>
    </div>
  );
};
const styles = {
  p0: "mb-2",
  p1: "block text-sm mb-2 text-dark-blue",
  p2: "appearance-none block w-full px-3 py-2 border-0 rounded-md theme-shadow placeholder-gray-400 focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600 sm:text-sm",
  p3: "text-red-500 text-sm",
  p4: "mt-1",
};
export default FormInput;

