import React, { createContext, useContext, useState, useEffect } from 'react';
import ProductsServices from '../services/api/products-stable.js';
import { useAuth } from './AuthContext';



const ProductContext = createContext();

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct deve ser usado dentro de um ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carregar todos os produtos do usuário
  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const productsData = await ProductsServices.getProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setError('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  // Carregar produto específico por ID
  const loadProductById = async (productId) => {
    setLoading(true);
    setError(null);
    try {
      const productData = await ProductsServices.getProductById(productId);
      setCurrentProduct(productData);
      return productData;
    } catch (error) {
      console.error('Erro ao carregar produto:', error);
      setError('Erro ao carregar produto');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Criar novo produto
  const createProduct = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const newProduct = await ProductsServices.registerProduct(productData);
      setProducts(prev => [...prev, newProduct.data]);
      return newProduct;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      setError('Erro ao criar produto');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Atualizar produto
  const updateProduct = async (productId, updateData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedProduct = await ProductsServices.updateProduct(productId, updateData);
      setProducts(prev => 
        prev.map(product => 
          product.id === productId ? updatedProduct.data : product
        )
      );
      if (currentProduct?.id === productId) {
        setCurrentProduct(updatedProduct.data);
      }
      return updatedProduct;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      setError('Erro ao atualizar produto');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Deletar produto
  const deleteProduct = async (productId) => {
    setLoading(true);
    setError(null);
    try {
      await ProductsServices.deleteProduct(productId);
      setProducts(prev => prev.filter(product => product.id !== productId));
      if (currentProduct?.id === productId) {
        setCurrentProduct(null);
      }
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      setError('Erro ao deletar produto');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Limpar produto atual
  const clearCurrentProduct = () => {
    setCurrentProduct(null);
  };

  // Carregar produtos na inicialização apenas se autenticado
  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
    }
  }, [isAuthenticated]);

  const value = {
    products,
    currentProduct,
    loading,
    error,
    loadProducts,
    loadProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    clearCurrentProduct
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext; 