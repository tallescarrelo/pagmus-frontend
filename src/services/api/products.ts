import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Configuração do axios com interceptor para token
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

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

interface Plan {
  id: number;
  name: string;
  price: number;
  description?: string;
  available_for_sale: boolean;
  featured: boolean;
  [key: string]: any;
}

interface Checkout {
  id: number;
  name: string;
  status: string;
  product_id: number;
  [key: string]: any;
}

interface Coupon {
  id: number;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  [key: string]: any;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// APIs de Produtos
export const productsAPI = {
  // Obter todos os produtos
  getAll: (): Promise<AxiosResponse<ApiResponse<Product[]>>> => api.get('/products'),
  
  // Obter produto por ID
  getById: (id: number): Promise<AxiosResponse<ApiResponse<Product>>> => api.get(`/products/${id}`),
  
  // Criar produto
  create: (data: Partial<Product>): Promise<AxiosResponse<ApiResponse<Product>>> => api.post('/products', data),
  
  // Atualizar produto
  update: (id: number, data: Partial<Product>): Promise<AxiosResponse<ApiResponse<Product>>> => api.put(`/products/${id}`, data),
  
  // Deletar produto
  delete: (id: number): Promise<AxiosResponse<ApiResponse<any>>> => api.delete(`/products/${id}`),
};

// APIs de Planos
export const plansAPI = {
  // Buscar planos de um produto
  getByProduct: (productId: number): Promise<AxiosResponse<ApiResponse<Plan[]>>> => api.get(`/api/products/${productId}/plans`),
  
  // Criar novo plano
  create: (productId: number, data: Partial<Plan>): Promise<AxiosResponse<ApiResponse<Plan>>> => api.post(`/api/products/${productId}/plans`, data),
  
  // Atualizar plano
  update: (productId: number, planId: number, data: Partial<Plan>): Promise<AxiosResponse<ApiResponse<Plan>>> => api.put(`/api/products/${productId}/plans/${planId}`, data),
  
  // Excluir plano
  delete: (productId: number, planId: number): Promise<AxiosResponse<ApiResponse<any>>> => api.delete(`/api/products/${productId}/plans/${planId}`)
};

// APIs de Checkouts
export const checkoutsAPI = {
  // Obter checkouts de um produto
  getByProduct: (productId: number): Promise<AxiosResponse<ApiResponse<Checkout[]>>> => api.get(`/products/${productId}/checkouts`),
  
  // Criar checkout
  create: (productId: number, data: Partial<Checkout>): Promise<AxiosResponse<ApiResponse<Checkout>>> => api.post(`/products/${productId}/checkouts`, data),
  
  // Atualizar checkout
  update: (productId: number, checkoutId: number, data: Partial<Checkout>): Promise<AxiosResponse<ApiResponse<Checkout>>> => api.put(`/products/${productId}/checkouts/${checkoutId}`, data),
  
  // Deletar checkout
  delete: (productId: number, checkoutId: number): Promise<AxiosResponse<ApiResponse<any>>> => api.delete(`/products/${productId}/checkouts/${checkoutId}`),
};

// APIs de Cupons
export const couponsAPI = {
  // Obter cupons de um produto
  getByProduct: (productId: number): Promise<AxiosResponse<ApiResponse<Coupon[]>>> => api.get(`/products/${productId}/coupons`),
  
  // Criar cupom
  create: (productId: number, data: Partial<Coupon>): Promise<AxiosResponse<ApiResponse<Coupon>>> => api.post(`/products/${productId}/coupons`, data),
  
  // Atualizar cupom
  update: (productId: number, couponId: number, data: Partial<Coupon>): Promise<AxiosResponse<ApiResponse<Coupon>>> => api.put(`/products/${productId}/coupons/${couponId}`, data),
  
  // Deletar cupom
  delete: (productId: number, couponId: number): Promise<AxiosResponse<ApiResponse<any>>> => api.delete(`/products/${productId}/coupons/${couponId}`),
};

// APIs de Afiliados
export const affiliatesAPI = {
  // Obter afiliados de um produto
  getByProduct: (productId: number): Promise<AxiosResponse<ApiResponse<any[]>>> => api.get(`/products/${productId}/affiliates`),
  
  // Aprovar afiliado
  approve: (productId: number, affiliateId: number): Promise<AxiosResponse<ApiResponse<any>>> => api.post(`/products/${productId}/affiliates/${affiliateId}/approve`),
  
  // Reprovar afiliado
  reject: (productId: number, affiliateId: number): Promise<AxiosResponse<ApiResponse<any>>> => api.post(`/products/${productId}/affiliates/${affiliateId}/reject`),
  
  // Atualizar comissão de afiliado
  updateCommission: (productId: number, affiliateId: number, commission: number): Promise<AxiosResponse<ApiResponse<any>>> => api.put(`/products/${productId}/affiliates/${affiliateId}/commission`, { commission }),
};

// APIs de Arquivos
export const filesAPI = {
  // Obter arquivos de um produto
  getByProduct: (productId: number): Promise<AxiosResponse<ApiResponse<any[]>>> => api.get(`/products/${productId}/files`),
  
  // Upload de arquivo
  upload: (productId: number, file: File): Promise<AxiosResponse<ApiResponse<any>>> => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/products/${productId}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  // Deletar arquivo
  delete: (productId: number, fileId: number): Promise<AxiosResponse<ApiResponse<any>>> => api.delete(`/products/${productId}/files/${fileId}`),
};

// APIs de URLs
export const urlsAPI = {
  // Obter URLs de um produto
  getByProduct: (productId: number): Promise<AxiosResponse<ApiResponse<any[]>>> => api.get(`/products/${productId}/urls`),
  
  // Criar URL
  create: (productId: number, data: any): Promise<AxiosResponse<ApiResponse<any>>> => api.post(`/products/${productId}/urls`, data),
  
  // Atualizar URL
  update: (productId: number, urlId: number, data: any): Promise<AxiosResponse<ApiResponse<any>>> => api.put(`/products/${productId}/urls/${urlId}`, data),
  
  // Deletar URL
  delete: (productId: number, urlId: number): Promise<AxiosResponse<ApiResponse<any>>> => api.delete(`/products/${productId}/urls/${urlId}`),
};

// APIs de Componentes
export const componentsAPI = {
  // Obter componentes de um produto
  getByProduct: (productId: number): Promise<AxiosResponse<ApiResponse<any[]>>> => api.get(`/products/${productId}/components`),
  
  // Criar componente
  create: (productId: number, data: any): Promise<AxiosResponse<ApiResponse<any>>> => api.post(`/products/${productId}/components`, data),
  
  // Atualizar componente
  update: (productId: number, componentId: number, data: any): Promise<AxiosResponse<ApiResponse<any>>> => api.put(`/products/${productId}/components/${componentId}`, data),
  
  // Deletar componente
  delete: (productId: number, componentId: number): Promise<AxiosResponse<ApiResponse<any>>> => api.delete(`/products/${productId}/components/${componentId}`),
};

export default {
  products: productsAPI,
  plans: plansAPI,
  checkouts: checkoutsAPI,
  coupons: couponsAPI,
  affiliates: affiliatesAPI,
  files: filesAPI,
  urls: urlsAPI,
  components: componentsAPI,
}; 