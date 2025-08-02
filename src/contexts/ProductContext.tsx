import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import ProductsServices from '../services/api/products-stable.js';
import { useAuth } from './AuthContext';

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

interface ProductData {
  name: string;
  description: string;
  price: number;
  image?: string;
  [key: string]: any;
}

interface ProductContextType {
  products: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  loadProducts: () => Promise<void>;
  loadProductById: (productId: number) => Promise<Product>;
  createProduct: (productData: ProductData) => Promise<any>;
  updateProduct: (productId: number, updateData: Partial<ProductData>) => Promise<any>;
  deleteProduct: (productId: number) => Promise<void>;
  clearCurrentProduct: () => void;
  clearError: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct deve ser usado dentro de um ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar todos os produtos do usuário
  const loadProducts = async (): Promise<void> => {
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
  const loadProductById = async (productId: number): Promise<Product> => {
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
  const createProduct = async (productData: ProductData): Promise<any> => {
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
  const updateProduct = async (productId: number, updateData: Partial<ProductData>): Promise<any> => {
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
  const deleteProduct = async (productId: number): Promise<void> => {
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
  const clearCurrentProduct = (): void => {
    setCurrentProduct(null);
  };

  // Limpar erro
  const clearError = (): void => {
    setError(null);
  };

  // Carregar produtos quando autenticado
  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
    }
  }, [isAuthenticated]);

  const value: ProductContextType = {
    products,
    currentProduct,
    loading,
    error,
    loadProducts,
    loadProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    clearCurrentProduct,
    clearError
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}; 