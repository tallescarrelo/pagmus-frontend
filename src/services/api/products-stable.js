import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

// Criar instância do axios com interceptors
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para adicionar token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const ProductsServicesStable = {
  getProducts: async () => {
    try {
      const response = await api.get("/api/products");
      return response.data.data;
    } catch (error) {
      console.error("Error in ProductsServicesStable.getProducts:", error);
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await api.get(`/api/products/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Error in ProductsServicesStable.getProductById:", error);
      throw error;
    }
  },

  registerProduct: async (payload) => {
    try {
      const response = await api.post("/api/products", payload);
      return response.data;
    } catch (error) {
      console.error("Error in ProductsServicesStable.registerProduct:", error);
      throw error;
    }
  },

  updateProduct: async (id, payload) => {
    try {
      const response = await api.put(`/api/products/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error("Error in ProductsServicesStable.updateProduct:", error);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error in ProductsServicesStable.deleteProduct:", error);
      throw error;
    }
  },
};

export default ProductsServicesStable; 