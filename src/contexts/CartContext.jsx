import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

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
  const addToCart = (product, plan = null, quantity = 1) => {
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
  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  // Atualizar quantidade
  const updateQuantity = (itemId, quantity) => {
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
  const clearCart = () => {
    setCart([]);
    setCoupons([]);
  };

  // Calcular subtotal
  const getSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = item.plan ? item.plan.price : item.product.price;
      return total + (price * item.quantity);
    }, 0);
  };

  // Calcular desconto dos cupons
  const getDiscount = () => {
    return coupons.reduce((total, coupon) => {
      if (coupon.type === 'percentage') {
        return total + (getSubtotal() * (coupon.value / 100));
      } else {
        return total + coupon.value;
      }
    }, 0);
  };

  // Calcular total
  const getTotal = () => {
    const subtotal = getSubtotal();
    const discount = getDiscount();
    return Math.max(0, subtotal - discount);
  };

  // Adicionar cupom
  const addCoupon = (couponCode) => {
    // Simular validação de cupom
    const mockCoupons = [
      { code: 'DESCONTO10', type: 'percentage', value: 10, description: '10% de desconto' },
      { code: 'FREEGRATIS', type: 'fixed', value: 50, description: 'R$ 50 de desconto' },
      { code: 'PROMO20', type: 'percentage', value: 20, description: '20% de desconto' }
    ];

    const coupon = mockCoupons.find(c => c.code === couponCode.toUpperCase());
    
    if (coupon) {
      const alreadyApplied = coupons.find(c => c.code === coupon.code);
      if (alreadyApplied) {
        throw new Error('Cupom já aplicado');
      }
      setCoupons(prev => [...prev, coupon]);
      return coupon;
    } else {
      throw new Error('Cupom inválido');
    }
  };

  // Remover cupom
  const removeCoupon = (couponCode) => {
    setCoupons(prev => prev.filter(coupon => coupon.code !== couponCode));
  };

  // Processar checkout
  const processCheckout = async (checkoutData) => {
    setLoading(true);
    
    try {
      // Simular processamento de pagamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const order = {
        id: Date.now(),
        items: cart,
        subtotal: getSubtotal(),
        discount: getDiscount(),
        total: getTotal(),
        coupons: coupons,
        customer: checkoutData.customer,
        payment: checkoutData.payment,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Limpar carrinho após sucesso
      clearCart();
      
      return order;
    } catch (error) {
      throw new Error('Erro ao processar pagamento: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Verificar se carrinho está vazio
  const isEmpty = cart.length === 0;

  // Contar itens no carrinho
  const getItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    coupons,
    loading,
    isEmpty,
    getItemCount,
    getSubtotal,
    getDiscount,
    getTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addCoupon,
    removeCoupon,
    processCheckout
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext; 