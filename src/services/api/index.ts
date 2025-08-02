import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
    });

    this.api.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Limpar dados de autenticação e redirecionar
          localStorage.removeItem("auth_token");
          localStorage.removeItem("token");
          localStorage.removeItem("user_data");
          window.location.href = "/";
        }
        return Promise.reject(error);
      }
    );
  }

  get(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
    return this.api.get(url, config);
  }

  post(url: string, data: any, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
    return this.api.post(url, data, config);
  }

  put(url: string, data: any, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
    return this.api.put(url, data, config);
  }

  delete(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
    return this.api.delete(url, config);
  }
}

const apiService = new ApiService();
export default apiService; 