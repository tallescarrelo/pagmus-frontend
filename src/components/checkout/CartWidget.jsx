import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useCart } from '../../contexts/CartContext';

const CartWidget = () => {
  const { getItemCount, isEmpty, getTotal } = useCart();
  const [showDropdown, setShowDropdown] = useState(false);

  const itemCount = getItemCount();
  const total = getTotal();

  return (
    <div className="cart-widget position-relative">
      <button
        className="btn btn-outline-primary position-relative"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <Icon icon="mdi:cart" className="me-1" />
        Carrinho
        {itemCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {itemCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="cart-dropdown position-absolute top-100 end-0 mt-2 bg-white border rounded shadow-lg" style={{ minWidth: '300px', zIndex: 1000 }}>
          <div className="p-3 border-bottom">
            <h6 className="mb-0">
              <Icon icon="mdi:cart" className="me-2" />
              Seu Carrinho
            </h6>
          </div>
          
          <div className="p-3">
            {isEmpty ? (
              <div className="text-center py-4">
                <Icon icon="mdi:cart-outline" className="text-muted" style={{ fontSize: '3rem' }} />
                <p className="text-muted mt-2 mb-0">Seu carrinho está vazio</p>
              </div>
            ) : (
              <div>
                <CartItems />
                <div className="border-top pt-3 mt-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-semibold">Total:</span>
                    <span className="fw-bold text-primary">
                      R$ {total.toFixed(2)}
                    </span>
                  </div>
                  <button className="btn btn-primary w-100">
                    <Icon icon="mdi:credit-card" className="me-2" />
                    Finalizar Compra
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Componente interno para mostrar os itens do carrinho
const CartItems = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="cart-items">
      {cart.map((item) => (
        <div key={item.id} className="cart-item d-flex align-items-center py-2 border-bottom">
          <div className="flex-shrink-0 me-3">
            <img
              src={item.product.image || '/images/product-placeholder.png'}
              alt={item.product.name}
              className="rounded"
              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
            />
          </div>
          
          <div className="flex-grow-1">
            <h6 className="mb-1" style={{ fontSize: '0.9rem' }}>
              {item.product.name}
            </h6>
            {item.plan && (
              <small className="text-muted d-block">
                Plano: {item.plan.name}
              </small>
            )}
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Icon icon="mdi:minus" />
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Icon icon="mdi:plus" />
                </button>
              </div>
              <div className="text-end">
                <div className="fw-semibold">
                  R$ {((item.plan ? item.plan.price : item.product.price) * item.quantity).toFixed(2)}
                </div>
                <button
                  className="btn btn-sm btn-link text-danger p-0"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Icon icon="mdi:delete" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartWidget; 