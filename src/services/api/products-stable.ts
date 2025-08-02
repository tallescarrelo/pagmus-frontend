import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

// Tipos
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  status: 'active' | 'inactive';
  user_id: number;
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

interface ProductPayload {
  name: string;
  description: string;
  price: number;
  image?: string;
  [key: string]: any;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Criar instância do axios com interceptors
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para adicionar token
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const ProductsServicesStable = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await api.get<ApiResponse<Product[]>>("/api/products");
      return response.data.data;
    } catch (error) {
      console.error("Error in ProductsServicesStable.getProducts:", error);
      throw error;
    }
  },

  getProductById: async (id: number): Promise<Product> => {
    try {
      const response = await api.get<ApiResponse<Product>>(`/api/products/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Error in ProductsServicesStable.getProductById:", error);
      throw error;
    }
  },

  registerProduct: async (payload: ProductPayload): Promise<ApiResponse<Product>> => {
    try {
      const response = await api.post<ApiResponse<Product>>("/api/products", payload);
      return response.data;
    } catch (error) {
      console.error("Error in ProductsServicesStable.registerProduct:", error);
      throw error;
    }
  },

  updateProduct: async (id: number, payload: Partial<ProductPayload>): Promise<ApiResponse<Product>> => {
    try {
      const response = await api.put<ApiResponse<Product>>(`/api/products/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error("Error in ProductsServicesStable.updateProduct:", error);
      throw error;
    }
  },

  deleteProduct: async (id: number): Promise<ApiResponse<any>> => {
    try {
      const response = await api.delete<ApiResponse<any>>(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error in ProductsServicesStable.deleteProduct:", error);
      throw error;
    }
  },
};

export default ProductsServicesStable; 