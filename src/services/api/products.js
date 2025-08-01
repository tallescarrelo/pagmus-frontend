import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Configuração do axios com interceptor para token
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
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
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// APIs de Produtos
export const productsAPI = {
  // Obter todos os produtos
  getAll: () => api.get('/products'),
  
  // Obter produto por ID
  getById: (id) => api.get(`/products/${id}`),
  
  // Criar produto
  create: (data) => api.post('/products', data),
  
  // Atualizar produto
  update: (id, data) => api.put(`/products/${id}`, data),
  
  // Deletar produto
  delete: (id) => api.delete(`/products/${id}`),
};

// APIs de Planos
export const plansAPI = {
  // Obter planos de um produto
  getByProduct: (productId) => api.get(`/products/${productId}/plans`),
  
  // Criar plano
  create: (productId, data) => api.post(`/products/${productId}/plans`, data),
  
  // Atualizar plano
  update: (productId, planId, data) => api.put(`/products/${productId}/plans/${planId}`, data),
  
  // Deletar plano
  delete: (productId, planId) => api.delete(`/products/${productId}/plans/${planId}`),
};

// APIs de Checkouts
export const checkoutsAPI = {
  // Obter checkouts de um produto
  getByProduct: (productId) => api.get(`/products/${productId}/checkouts`),
  
  // Criar checkout
  create: (productId, data) => api.post(`/products/${productId}/checkouts`, data),
  
  // Atualizar checkout
  update: (productId, checkoutId, data) => api.put(`/products/${productId}/checkouts/${checkoutId}`, data),
  
  // Deletar checkout
  delete: (productId, checkoutId) => api.delete(`/products/${productId}/checkouts/${checkoutId}`),
};

// APIs de Cupons
export const couponsAPI = {
  // Obter cupons de um produto
  getByProduct: (productId) => api.get(`/products/${productId}/coupons`),
  
  // Criar cupom
  create: (productId, data) => api.post(`/products/${productId}/coupons`, data),
  
  // Atualizar cupom
  update: (productId, couponId, data) => api.put(`/products/${productId}/coupons/${couponId}`, data),
  
  // Deletar cupom
  delete: (productId, couponId) => api.delete(`/products/${productId}/coupons/${couponId}`),
};

// APIs de URLs do Produto
export const productUrlsAPI = {
  // Obter URLs de um produto
  getByProduct: (productId) => api.get(`/products/${productId}/urls`),
  
  // Criar URL
  create: (productId, data) => api.post(`/products/${productId}/urls`, data),
  
  // Atualizar URL
  update: (productId, urlId, data) => api.put(`/products/${productId}/urls/${urlId}`, data),
  
  // Deletar URL
  delete: (productId, urlId) => api.delete(`/products/${productId}/urls/${urlId}`),
};

// APIs de Comissões de Afiliados
export const affiliateCommissionsAPI = {
  // Obter comissões de um produto
  getByProduct: (productId) => api.get(`/products/${productId}/affiliate-commissions`),
  
  // Criar comissão
  create: (productId, data) => api.post(`/products/${productId}/affiliate-commissions`, data),
  
  // Atualizar comissão
  update: (productId, commissionId, data) => api.put(`/products/${productId}/affiliate-commissions/${commissionId}`, data),
  
  // Deletar comissão
  delete: (productId, commissionId) => api.delete(`/products/${productId}/affiliate-commissions/${commissionId}`),
};

// APIs de Metas de Afiliados
export const affiliateGoalsAPI = {
  // Obter metas de um produto
  getByProduct: (productId) => api.get(`/products/${productId}/affiliate-goals`),
  
  // Criar meta
  create: (productId, data) => api.post(`/products/${productId}/affiliate-goals`, data),
  
  // Atualizar meta
  update: (productId, goalId, data) => api.put(`/products/${productId}/affiliate-goals/${goalId}`, data),
  
  // Deletar meta
  delete: (productId, goalId) => api.delete(`/products/${productId}/affiliate-goals/${goalId}`),
};

// APIs de Arquivos do Produto
export const productFilesAPI = {
  // Obter arquivos de um produto
  getByProduct: (productId) => api.get(`/products/${productId}/files`),
  
  // Criar arquivo
  create: (productId, data) => api.post(`/products/${productId}/files`, data),
  
  // Atualizar arquivo
  update: (productId, fileId, data) => api.put(`/products/${productId}/files/${fileId}`, data),
  
  // Deletar arquivo
  delete: (productId, fileId) => api.delete(`/products/${productId}/files/${fileId}`),
};

// APIs de Afiliados do Produto
export const productAffiliatesAPI = {
  // Obter afiliados de um produto
  getByProduct: (productId) => api.get(`/products/${productId}/affiliates`),
  
  // Criar afiliado
  create: (productId, data) => api.post(`/products/${productId}/affiliates`, data),
  
  // Atualizar afiliado
  update: (productId, affiliateId, data) => api.put(`/products/${productId}/affiliates/${affiliateId}`, data),
  
  // Deletar afiliado
  delete: (productId, affiliateId) => api.delete(`/products/${productId}/affiliates/${affiliateId}`),
};

// APIs de Componentes do Produto
export const productComponentsAPI = {
  // Obter componentes de um produto
  getByProduct: (productId) => api.get(`/products/${productId}/components`),
  
  // Criar componente
  create: (productId, data) => api.post(`/products/${productId}/components`, data),
  
  // Atualizar componente
  update: (productId, componentId, data) => api.put(`/products/${productId}/components/${componentId}`, data),
  
  // Deletar componente
  delete: (productId, componentId) => api.delete(`/products/${productId}/components/${componentId}`),
};

export default api; 