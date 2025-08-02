import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

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

interface Affiliate {
  id: number;
  name: string;
  email: string;
  status: string;
  [key: string]: any;
}

interface Plan {
  id: number;
  name: string;
  price: number;
  description?: string;
  [key: string]: any;
}

interface Checkout {
  id: number;
  name: string;
  status: string;
  [key: string]: any;
}

interface ProductUrl {
  id: number;
  url: string;
  type: string;
  [key: string]: any;
}

interface Coupon {
  id: number;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  [key: string]: any;
}

interface ProductFile {
  id: number;
  name: string;
  url: string;
  type: string;
  [key: string]: any;
}

interface Commission {
  id: number;
  type: 'percentage' | 'fixed';
  value: number;
  [key: string]: any;
}

interface Goal {
  id: number;
  name: string;
  target: number;
  current: number;
  [key: string]: any;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const ProductRelatedServices = {
  // Buscar afiliados de um produto
  getProductAffiliates: async (productId: number): Promise<Affiliate[]> => {
    try {
      const response = await api.get<ApiResponse<Affiliate[]>>(`/api/products/${productId}/affiliates`);
      return response.data.data;
    } catch (error) {
      console.error("Error in getProductAffiliates:", error);
      throw error;
    }
  },

  // Buscar planos de um produto
  getProductPlans: async (productId: number): Promise<Plan[]> => {
    try {
      const response = await api.get<ApiResponse<Plan[]>>(`/api/products/${productId}/plans`);
      return response.data.data;
    } catch (error) {
      console.error("Error in getProductPlans:", error);
      throw error;
    }
  },

  // Buscar checkouts de um produto
  getProductCheckouts: async (productId: number): Promise<Checkout[]> => {
    try {
      const response = await api.get<ApiResponse<Checkout[]>>(`/api/products/${productId}/checkouts`);
      return response.data.data;
    } catch (error) {
      console.error("Error in getProductCheckouts:", error);
      throw error;
    }
  },

  // Buscar URLs de um produto
  getProductUrls: async (productId: number): Promise<ProductUrl[]> => {
    try {
      const response = await api.get<ApiResponse<ProductUrl[]>>(`/api/products/${productId}/urls`);
      return response.data.data;
    } catch (error) {
      console.error("Error in getProductUrls:", error);
      throw error;
    }
  },

  // Buscar cupons de um produto
  getProductCoupons: async (productId: number): Promise<Coupon[]> => {
    try {
      const response = await api.get<ApiResponse<Coupon[]>>(`/api/products/${productId}/coupons`);
      return response.data.data;
    } catch (error) {
      console.error("Error in getProductCoupons:", error);
      throw error;
    }
  },

  // Buscar arquivos de um produto
  getProductFiles: async (productId: number): Promise<ProductFile[]> => {
    try {
      const response = await api.get<ApiResponse<ProductFile[]>>(`/api/products/${productId}/files`);
      return response.data.data;
    } catch (error) {
      console.error("Error in getProductFiles:", error);
      throw error;
    }
  },

  // Buscar comissões de um produto
  getProductCommissions: async (productId: number): Promise<Commission[]> => {
    try {
      const response = await api.get<ApiResponse<Commission[]>>(`/api/products/${productId}/commissions`);
      return response.data.data;
    } catch (error) {
      console.error("Error in getProductCommissions:", error);
      throw error;
    }
  },

  // Buscar metas de um produto
  getProductGoals: async (productId: number): Promise<Goal[]> => {
    try {
      const response = await api.get<ApiResponse<Goal[]>>(`/api/products/${productId}/goals`);
      return response.data.data;
    } catch (error) {
      console.error("Error in getProductGoals:", error);
      throw error;
    }
  },

  // Criar plano para um produto
  createProductPlan: async (productId: number, planData: Partial<Plan>): Promise<ApiResponse<Plan>> => {
    try {
      const response = await api.post<ApiResponse<Plan>>(`/api/products/${productId}/plans`, planData);
      return response.data;
    } catch (error) {
      console.error("Error in createProductPlan:", error);
      throw error;
    }
  },

  // Atualizar plano de um produto
  updateProductPlan: async (productId: number, planId: number, planData: Partial<Plan>): Promise<ApiResponse<Plan>> => {
    try {
      const response = await api.put<ApiResponse<Plan>>(`/api/products/${productId}/plans/${planId}`, planData);
      return response.data;
    } catch (error) {
      console.error("Error in updateProductPlan:", error);
      throw error;
    }
  },

  // Deletar plano de um produto
  deleteProductPlan: async (productId: number, planId: number): Promise<ApiResponse<any>> => {
    try {
      const response = await api.delete<ApiResponse<any>>(`/api/products/${productId}/plans/${planId}`);
      return response.data;
    } catch (error) {
      console.error("Error in deleteProductPlan:", error);
      throw error;
    }
  },

  // Aprovar/reprovar afiliado de um produto
  approveRejectAffiliate: async (productId: number, affiliateId: number, action: 'approve' | 'reject'): Promise<ApiResponse<any>> => {
    try {
      const response = await api.post<ApiResponse<any>>(`/api/products/${productId}/affiliates/${affiliateId}/${action}`);
      return response.data;
    } catch (error) {
      console.error("Error in approveRejectAffiliate:", error);
      throw error;
    }
  },

  // Atualizar comissão de um produto
  updateProductCommission: async (productId: number, commissionData: Partial<Commission>): Promise<ApiResponse<Commission>> => {
    try {
      const response = await api.put<ApiResponse<Commission>>(`/api/products/${productId}/commissions`, commissionData);
      return response.data;
    } catch (error) {
      console.error("Error in updateProductCommission:", error);
      throw error;
    }
  },

  // Criar cupom para um produto
  createProductCoupon: async (productId: number, couponData: Partial<Coupon>): Promise<ApiResponse<Coupon>> => {
    try {
      const response = await api.post<ApiResponse<Coupon>>(`/api/products/${productId}/coupons`, couponData);
      return response.data;
    } catch (error) {
      console.error("Error in createProductCoupon:", error);
      throw error;
    }
  },

  // Deletar cupom de um produto
  deleteProductCoupon: async (productId: number, couponId: number): Promise<ApiResponse<any>> => {
    try {
      const response = await api.delete<ApiResponse<any>>(`/api/products/${productId}/coupons/${couponId}`);
      return response.data;
    } catch (error) {
      console.error("Error in deleteProductCoupon:", error);
      throw error;
    }
  },

  // Upload de arquivo para um produto
  uploadProductFile: async (productId: number, file: File): Promise<ApiResponse<ProductFile>> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post<ApiResponse<ProductFile>>(`/api/products/${productId}/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in uploadProductFile:", error);
      throw error;
    }
  },

  // Deletar arquivo de um produto
  deleteProductFile: async (productId: number, fileId: number): Promise<ApiResponse<any>> => {
    try {
      const response = await api.delete<ApiResponse<any>>(`/api/products/${productId}/files/${fileId}`);
      return response.data;
    } catch (error) {
      console.error("Error in deleteProductFile:", error);
      throw error;
    }
  },
};

export default ProductRelatedServices; 