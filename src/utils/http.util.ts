import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { getItem } from "./storage.util";
import { STORAGE_KEYS } from "../constants/storage.constant";
import { BASE_URL, ROUTING } from "../constants/system.constant";
import AuthService from "../services/auth.service";

const redirectToLogin = () => {
  AuthService.logout();
  window.location.href =
    ROUTING.login + `?return-url=${encodeURIComponent(window.location.href)}`;
};

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        Accept: "application/json",
      },
    });

    // Request interceptor to handle common configurations or headers
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const accessToken = getItem(STORAGE_KEYS.AUTHENTICATION);
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle common response handling or error handling
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data;
      },
      (error: AxiosError) => {
        const response = error.response;
        console.log(
          "🚀 ~ file: http.util.ts:50 ~ ApiClient ~ constructor ~ response:",
          response
        );
        if (response) {
          if (response.status === 401) redirectToLogin();
        }
        return Promise.reject(error);
      }
    );
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.axiosInstance.get<T>(url, config);
  }

  public post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<any> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  public put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<any> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.axiosInstance.delete<T>(url, config);
  }
}

export default new ApiClient();
