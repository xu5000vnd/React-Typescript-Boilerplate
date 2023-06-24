import { STORAGE_KEYS } from "../constants/storage.constant";
import { getItem, removeItem } from "../utils/storage.util";
import apiClient from "../utils/http.util";
import { API_URL, ROUTING } from "../constants/system.constant";
import { redirect } from "react-router-dom";

class AuthService {
  static async login(email: string, password: string) {
    try {
      const data = await apiClient.post(API_URL.auth.login, {
        email,
        password,
      });
      return data;
    } catch (error) {
      throw new Error("Login failed");
    }
  }

  static logout() {
    try {
      removeItem(STORAGE_KEYS.AUTHENTICATION);
      redirect(ROUTING.home);
    } catch (error) {
      console.error("Logout failed:", error);
      throw new Error("Logout failed");
    }
  }

  static async signup(email: string, password: string) {
    try {
      const data = await apiClient.post(API_URL.auth.signup, {
        email,
        password,
      });

      return data;
    } catch (error) {
      throw new Error("Signup failed");
    }
  }

  static checkAuth() {
    const auth = getItem(STORAGE_KEYS.AUTHENTICATION);
    if (auth) {
      return true;
    }
    return false;
  }
}

export default AuthService;
