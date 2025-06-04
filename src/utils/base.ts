import CryptoJS from "crypto-js";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import config from "../config/app";

export function objectToFormData<T extends Record<string, unknown>>(
  obj: T
): FormData {
  const formData = new FormData();

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value); // Append files or blobs directly
    } else {
      formData.append(key, value!.toString()); // Convert other values to strings
    }
  });

  return formData;
}

const SECRET_KEY = config.secretKey || "default_secret_key";

export const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const decryptData = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const getTimeAgo = (date: Date | string): string => {
  const targetDate = new Date(date);
  const now = new Date();

  const seconds = differenceInSeconds(now, targetDate);
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }

  const minutes = differenceInMinutes(now, targetDate);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }

  const hours = differenceInHours(now, targetDate);
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  const days = differenceInDays(now, targetDate);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
};

// Helper function to check for valid non-empty values
export const isValidValue = (
  value: string | number | boolean | null | undefined
) => value !== null && value !== undefined && value !== "";

export const formatKey = (key: string) => {
  return key
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase()); // Capitalize words
};

export const renderValue = (
  value: string | number | boolean | null | undefined
) => {
  return value;
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(value);
};

// Format number with commas
export const formatNumber = (num: number) => {
  return num.toLocaleString();
};

// Format large numbers
export const formatLargeNumber = (num: number) => {
  if (num >= 1000000000) {
    return `₦${(num / 1000000000).toFixed(1)}B`;
  } else if (num >= 1000000) {
    return `₦${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `₦${(num / 1000).toFixed(1)}K`;
  }
  return `₦${num}`;
};
