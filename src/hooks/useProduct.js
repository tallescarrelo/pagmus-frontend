import { useState, useEffect, useCallback } from 'react';
import { 
  productsAPI, 
  plansAPI, 
  checkoutsAPI, 
  couponsAPI,
  productUrlsAPI,
  affiliateCommissionsAPI,
  affiliateGoalsAPI,
  productFilesAPI,
  productAffiliatesAPI,
  productComponentsAPI
} from '../services/api/products';

export const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [plans, setPlans] = useState([]);
  const [checkouts, setCheckouts] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [urls, setUrls] = useState([]);
  const [affiliateCommissions, setAffiliateCommissions] = useState([]);
  const [affiliateGoals, setAffiliateGoals] = useState([]);
  const [files, setFiles] = useState([]);
  const [affiliates, setAffiliates] = useState([]);
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar dados do produto
  const loadProduct = useCallback(async () => {
    if (!productId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const [productRes, plansRes, checkoutsRes, couponsRes, urlsRes, commissionsRes, goalsRes, filesRes, affiliatesRes, componentsRes] = await Promise.all([
        productsAPI.getById(productId),
        plansAPI.getByProduct(productId),
        checkoutsAPI.getByProduct(productId),
        couponsAPI.getByProduct(productId),
        productUrlsAPI.getByProduct(productId),
        affiliateCommissionsAPI.getByProduct(productId),
        affiliateGoalsAPI.getByProduct(productId),
        productFilesAPI.getByProduct(productId),
        productAffiliatesAPI.getByProduct(productId),
        productComponentsAPI.getByProduct(productId)
      ]);

      setProduct(productRes.data);
      setPlans(plansRes.data);
      setCheckouts(checkoutsRes.data);
      setCoupons(couponsRes.data);
      setUrls(urlsRes.data);
      setAffiliateCommissions(commissionsRes.data);
      setAffiliateGoals(goalsRes.data);
      setFiles(filesRes.data);
      setAffiliates(affiliatesRes.data);
      setComponents(componentsRes.data);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao carregar dados do produto:', err);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  // Atualizar produto
  const updateProduct = useCallback(async (data) => {
    try {
      const response = await productsAPI.update(productId, data);
      setProduct(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [productId]);

  // Criar plano
  const createPlan = useCallback(async (data) => {
    try {
      const response = await plansAPI.create(productId, data);
      setPlans(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [productId]);

  // Criar checkout
  const createCheckout = useCallback(async (data) => {
    try {
      const response = await checkoutsAPI.create(productId, data);
      setCheckouts(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [productId]);

  // Criar cupom
  const createCoupon = useCallback(async (data) => {
    try {
      const response = await couponsAPI.create(productId, data);
      setCoupons(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [productId]);

  // Criar URL
  const createUrl = useCallback(async (data) => {
    try {
      const response = await productUrlsAPI.create(productId, data);
      setUrls(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [productId]);

  // Criar comissão
  const createCommission = useCallback(async (data) => {
    try {
      const response = await affiliateCommissionsAPI.create(productId, data);
      setAffiliateCommissions(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [productId]);

  // Criar meta
  const createGoal = useCallback(async (data) => {
    try {
      const response = await affiliateGoalsAPI.create(productId, data);
      setAffiliateGoals(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [productId]);

  // Criar arquivo
  const createFile = useCallback(async (data) => {
    try {
      const response = await productFilesAPI.create(productId, data);
      setFiles(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [productId]);

  // Criar afiliado
  const createAffiliate = useCallback(async (data) => {
    try {
      const response = await productAffiliatesAPI.create(productId, data);
      setAffiliates(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [productId]);

  // Criar componente
  const createComponent = useCallback(async (data) => {
    try {
      const response = await productComponentsAPI.create(productId, data);
      setComponents(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [productId]);

  // Carregar dados quando o componente montar ou productId mudar
  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  return {
    // Dados
    product,
    plans,
    checkouts,
    coupons,
    urls,
    affiliateCommissions,
    affiliateGoals,
    files,
    affiliates,
    components,
    
    // Estado
    loading,
    error,
    
    // Funções
    loadProduct,
    updateProduct,
    createPlan,
    createCheckout,
    createCoupon,
    createUrl,
    createCommission,
    createGoal,
    createFile,
    createAffiliate,
    createComponent,
  };
}; 