import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Tipos
interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  [key: string]: any;
}

interface Plan {
  id: number;
  name: string;
  price: number;
  [key: string]: any;
}

interface CartItem {
  id: number;
  product: Product;
  plan?: Plan;
  quantity: number;
  addedAt: string;
}

interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  [key: string]: any;
}

interface CheckoutData {
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  payment: {
    method: string;
    [key: string]: any;
  };
  [key: string]: any;
}

interface CartContextType {
  cart: CartItem[];
  coupons: Coupon[];
  loading: boolean;
  addToCart: (product: Product, plan?: Plan, quantity?: number) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  addCoupon: (couponCode: string) => Promise<boolean>;
  removeCoupon: (couponCode: string) => void;
  processCheckout: (checkoutData: CheckoutData) => Promise<{ success: boolean; orderId?: string; error?: string }>;
  getItemCount: () => number;
  isEmpty: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Carregar carrinho do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('pagmus_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
        setCart([]);
      }
    }
  }, []);

  // Salvar carrinho no localStorage
  useEffect(() => {
    localStorage.setItem('pagmus_cart', JSON.stringify(cart));
  }, [cart]);

  // Adicionar produto ao carrinho
  const addToCart = (product: Product, plan?: Plan, quantity: number = 1): void => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.product.id === product.id && 
        (!plan || item.plan?.id === plan.id)
      );

      if (existingItem) {
        // Atualizar quantidade se já existe
        return prevCart.map(item =>
          item.product.id === product.id && 
          (!plan || item.plan?.id === plan.id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Adicionar novo item
        return [...prevCart, {
          id: Date.now(),
          product,
          plan,
          quantity,
          addedAt: new Date().toISOString()
        }];
      }
    });
  };

  // Remover produto do carrinho
  const removeFromCart = (itemId: number): void => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  // Atualizar quantidade
  const updateQuantity = (itemId: number, quantity: number): void => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  // Limpar carrinho
  const clearCart = (): void => {
    setCart([]);
    setCoupons([]);
  };

  // Calcular subtotal
  const getSubtotal = (): number => {
    return cart.reduce((total, item) => {
      const price = item.plan ? item.plan.price : item.product.price;
      return total + (price * item.quantity);
    }, 0);
  };

  // Calcular desconto dos cupons
  const getDiscount = (): number => {
    return coupons.reduce((total, coupon) => {
      if (coupon.type === 'percentage') {
        return total + (getSubtotal() * (coupon.discount / 100));
      } else {
        return total + coupon.discount;
      }
    }, 0);
  };

  // Calcular total
  const getTotal = (): number => {
    return getSubtotal() - getDiscount();
  };

  // Adicionar cupom
  const addCoupon = async (couponCode: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock de cupom válido
      const mockCoupon: Coupon = {
        code: couponCode,
        discount: 10,
        type: 'percentage'
      };

      setCoupons(prev => [...prev, mockCoupon]);
      return true;
    } catch (error) {
      console.error('Erro ao adicionar cupom:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Remover cupom
  const removeCoupon = (couponCode: string): void => {
    setCoupons(prev => prev.filter(coupon => coupon.code !== couponCode));
  };

  // Processar checkout
  const processCheckout = async (checkoutData: CheckoutData): Promise<{ success: boolean; orderId?: string; error?: string }> => {
    setLoading(true);
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock de sucesso
      const orderId = `ORDER-${Date.now()}`;
      
      // Limpar carrinho após sucesso
      clearCart();
      
      return { success: true, orderId };
    } catch (error) {
      console.error('Erro no checkout:', error);
      return { success: false, error: 'Erro ao processar checkout' };
    } finally {
      setLoading(false);
    }
  };

  // Contar itens no carrinho
  const getItemCount = (): number => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Verificar se carrinho está vazio
  const isEmpty: boolean = cart.length === 0;

  const value: CartContextType = {
    cart,
    coupons,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getSubtotal,
    getDiscount,
    getTotal,
    addCoupon,
    removeCoupon,
    processCheckout,
    getItemCount,
    isEmpty
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 