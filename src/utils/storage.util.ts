import { isJson } from "./common.util";

export function getItem(key: string): any {
  try {
    const value = localStorage.getItem(key);
    if (isJson(value)) {
      return JSON.parse(value as string);
    }
    return value !== null ? value : null;
  } catch (error) {
    console.error("Error retrieving item from localStorage:", error);
    return null;
  }
}

export function setItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error("Error setting item in localStorage:", error);
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing item from localStorage:", error);
  }
}
