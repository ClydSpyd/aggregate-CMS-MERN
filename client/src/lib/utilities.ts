import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const generateUID = (input: string) => {
  let hash = 5381; // Initialize the hash value
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i); // XOR each character
  }
  return hash >>> 0; // Ensure a positive 32-bit integer
};

export const delay = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const randomS3Avatar = () => {
  const s3Available = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const imgNumber = s3Available[Math.floor(Math.random() * s3Available.length)];
  return `https://aggregate-imgs.s3.eu-north-1.amazonaws.com/avatars/abstract_${imgNumber}.png`;
};

export const debounce = <T extends FunctionGeneric>(
  callback: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export const encodeQueryData = (data: Record<string, string>) => {
  const ret = [];
  for (let d in data) {
    ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
  }
  return ret.join("&");
}

export const addParamToUrl = (key: string, value: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({}, "", url.toString());
}

export const removeParamFromUrl = (key: string) => {
  const url = new URL(window.location.href);
  url.searchParams.delete(key);
  window.history.pushState({}, "", url.toString());
}

export const getRandomEntries = (arr: string[], x: number): string[] => {
    
  const randomEntries: string[] = [];
  const length = Math.min(x, arr.length);
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const randomEntry = arr[randomIndex];
    
    if (!randomEntries.includes(randomEntry)) {
      randomEntries.push(randomEntry);
      arr.splice(randomIndex, 1);
    } else {
      i--;
    }
  }
  
  return randomEntries;
};

export const truncateString = (str: string, num: number) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};