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

const ProductRelatedServices = {
  // Buscar afiliados de um produto
  getProductAffiliates: async (productId) => {
    try {
      const response = await api.get(`/api/products/${productId}/affiliates`);
      return response.data.data;
    } catch (error) {
      console.error("Error in getProductAffiliates:", error);
      throw error;
    }
  },

  // Buscar planos de um produto
  getProductPlans: async (productId) => {
    try {
      const response = await api.get(`/api/products/${productId}/plans`);
      return response.data.data;
    } catch (error) {
      console.error("Error in getProductPlans:", error);
      throw error;
    }
  },

  // Buscar checkouts de um produto
  getProductCheckouts: async (productId) => {
    try {
      const response = await api.get(`/api/products/${productId}/checkouts`);
      return response.data.data;
    } catch (error) {
      console.error("Error in getProductCheckouts:", error);
      throw error;
    }
  },

  // Buscar URLs de um produto
  getProductUrls: async (productId) => {
    try {
      const response = await api.get(`/api/products/${productId}/urls`);
      return response.data.data;
    } catch (error) {
      console.error("Error in getProductUrls:", error);
      throw error;
    }
  },

  // Buscar cupons de um produto
  getProductCoupons: async (productId) => {
    try {
      const response = await api.get(`/api/products/${productId}/coupons`);
      return response.data.data;
    } catch (error) {
      console.error("Error in getProductCoupons:", error);
      throw error;
    }
  },

  // Buscar arquivos de um produto
  getProductFiles: async (productId) => {
    try {
      const response = await api.get(`/api/products/${productId}/files`);
      return response.data.data;
    } catch (error) {
      console.error("Error in getProductFiles:", error);
      throw error;
    }
  },

  // Buscar comissões de um produto
  getProductCommissions: async (productId) => {
    try {
      const response = await api.get(`/api/products/${productId}/commissions`);
      return response.data.data;
    } catch (error) {
      console.error("Error in getProductCommissions:", error);
      throw error;
    }
  },

  // Buscar metas de um produto
  getProductGoals: async (productId) => {
    try {
      const response = await api.get(`/api/products/${productId}/goals`);
      return response.data.data;
    } catch (error) {
      console.error("Error in getProductGoals:", error);
      throw error;
    }
  },

  // Criar um novo plano para um produto
  createProductPlan: async (productId, planData) => {
    try {
      const response = await api.post(`/api/products/${productId}/plans`, planData);
      return response.data;
    } catch (error) {
      console.error("Error in createProductPlan:", error);
      throw error;
    }
  },

  // Atualizar um plano existente
  updateProductPlan: async (productId, planId, planData) => {
    try {
      const response = await api.put(`/api/products/${productId}/plans/${planId}`, planData);
      return response.data;
    } catch (error) {
      console.error("Error in updateProductPlan:", error);
      throw error;
    }
  },

  // Deletar um plano de um produto
  deleteProductPlan: async (productId, planId) => {
    try {
      const response = await api.delete(`/api/products/${productId}/plans/${planId}`);
      return response.data;
    } catch (error) {
      console.error("Error in deleteProductPlan:", error);
      throw error;
    }
  },
  getProductGoals: async (productId) => {
    try {
      const response = await api.get(`/api/products/${productId}/goals`);
      return response.data.data;
    } catch (error) {
      console.error("Error in getProductGoals:", error);
      throw error;
    }
  },

  // Buscar componentes de um produto
  getProductComponents: async (productId) => {
    try {
      const response = await api.get(`/api/products/${productId}/components`);
      return response.data.data;
    } catch (error) {
      console.error("Error in getProductComponents:", error);
      throw error;
    }
  }
};

export default ProductRelatedServices; 