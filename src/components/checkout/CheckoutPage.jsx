import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import MasterLayout from '../../masterLayout/MasterLayout';
import Breadcrumb from '../../components/Breadcrumb';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, coupons, getSubtotal, getDiscount, getTotal, addCoupon, removeCoupon, processCheckout, loading } = useCart();
  const { user } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [formData, setFormData] = useState({
    customer: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      cpf: user?.cpf || ''
    },
    billing: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Brasil'
    },
    payment: {
      method: 'credit_card',
      cardNumber: '',
      cardName: '',
      cardExpiry: '',
      cardCvv: '',
      installments: 1
    }
  });

  const [errors, setErrors] = useState({});

  // Validar formulário
  const validateForm = () => {
    const newErrors = {};

    // Validação do cliente
    if (!formData.customer.name) newErrors.customerName = 'Nome é obrigatório';
    if (!formData.customer.email) newErrors.customerEmail = 'Email é obrigatório';
    if (!formData.customer.phone) newErrors.customerPhone = 'Telefone é obrigatório';
    if (!formData.customer.cpf) newErrors.customerCpf = 'CPF é obrigatório';

    // Validação do endereço
    if (!formData.billing.address) newErrors.billingAddress = 'Endereço é obrigatório';
    if (!formData.billing.city) newErrors.billingCity = 'Cidade é obrigatória';
    if (!formData.billing.state) newErrors.billingState = 'Estado é obrigatório';
    if (!formData.billing.zipCode) newErrors.billingZipCode = 'CEP é obrigatório';

    // Validação do pagamento
    if (formData.payment.method === 'credit_card') {
      if (!formData.payment.cardNumber) newErrors.cardNumber = 'Número do cartão é obrigatório';
      if (!formData.payment.cardName) newErrors.cardName = 'Nome no cartão é obrigatório';
      if (!formData.payment.cardExpiry) newErrors.cardExpiry = 'Data de validade é obrigatória';
      if (!formData.payment.cardCvv) newErrors.cardCvv = 'CVV é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Aplicar cupom
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Digite um código de cupom');
      return;
    }

    try {
      addCoupon(couponCode);
      setCouponCode('');
      setCouponError('');
    } catch (error) {
      setCouponError(error.message);
    }
  };

  // Processar pagamento
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const order = await processCheckout(formData);
      navigate('/checkout/success', { state: { order } });
    } catch (error) {
      alert('Erro ao processar pagamento: ' + error.message);
    }
  };

  // Formatar número do cartão
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Formatar data de validade
  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (cart.length === 0) {
    return (
      <MasterLayout>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center py-5">
              <Icon icon="mdi:cart-outline" className="text-muted" style={{ fontSize: '5rem' }} />
              <h3 className="mt-3">Carrinho Vazio</h3>
              <p className="text-muted">Adicione produtos ao seu carrinho para continuar.</p>
              <button className="btn btn-primary" onClick={() => navigate('/products')}>
                <Icon icon="mdi:shopping" className="me-2" />
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      </MasterLayout>
    );
  }

  return (
    <MasterLayout>
      <Breadcrumb 
        title="Checkout" 
        items={[
          { label: 'Produtos', path: '/products' },
          { label: 'Carrinho', path: '/cart' },
          { label: 'Checkout', path: '/checkout' }
        ]}
      />

      <div className="container-fluid">
        <div className="row">
          {/* Coluna do Formulário */}
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <Icon icon="mdi:account" className="me-2" />
                  Informações do Cliente
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Nome Completo *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.customerName ? 'is-invalid' : ''}`}
                        value={formData.customer.name}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          customer: { ...prev.customer, name: e.target.value }
                        }))}
                      />
                      {errors.customerName && (
                        <div className="invalid-feedback">{errors.customerName}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        className={`form-control ${errors.customerEmail ? 'is-invalid' : ''}`}
                        value={formData.customer.email}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          customer: { ...prev.customer, email: e.target.value }
                        }))}
                      />
                      {errors.customerEmail && (
                        <div className="invalid-feedback">{errors.customerEmail}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Telefone *</label>
                      <input
                        type="tel"
                        className={`form-control ${errors.customerPhone ? 'is-invalid' : ''}`}
                        value={formData.customer.phone}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          customer: { ...prev.customer, phone: e.target.value }
                        }))}
                      />
                      {errors.customerPhone && (
                        <div className="invalid-feedback">{errors.customerPhone}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">CPF *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.customerCpf ? 'is-invalid' : ''}`}
                        value={formData.customer.cpf}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          customer: { ...prev.customer, cpf: e.target.value }
                        }))}
                      />
                      {errors.customerCpf && (
                        <div className="invalid-feedback">{errors.customerCpf}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mt-4">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <Icon icon="mdi:map-marker" className="me-2" />
                  Endereço de Cobrança
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Endereço *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.billingAddress ? 'is-invalid' : ''}`}
                    value={formData.billing.address}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      billing: { ...prev.billing, address: e.target.value }
                    }))}
                  />
                  {errors.billingAddress && (
                    <div className="invalid-feedback">{errors.billingAddress}</div>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Cidade *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.billingCity ? 'is-invalid' : ''}`}
                        value={formData.billing.city}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          billing: { ...prev.billing, city: e.target.value }
                        }))}
                      />
                      {errors.billingCity && (
                        <div className="invalid-feedback">{errors.billingCity}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">Estado *</label>
                      <select
                        className={`form-select ${errors.billingState ? 'is-invalid' : ''}`}
                        value={formData.billing.state}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          billing: { ...prev.billing, state: e.target.value }
                        }))}
                      >
                        <option value="">Selecione</option>
                        <option value="SP">São Paulo</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="PR">Paraná</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="BA">Bahia</option>
                        <option value="GO">Goiás</option>
                        <option value="PE">Pernambuco</option>
                        <option value="CE">Ceará</option>
                      </select>
                      {errors.billingState && (
                        <div className="invalid-feedback">{errors.billingState}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">CEP *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.billingZipCode ? 'is-invalid' : ''}`}
                        value={formData.billing.zipCode}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          billing: { ...prev.billing, zipCode: e.target.value }
                        }))}
                      />
                      {errors.billingZipCode && (
                        <div className="invalid-feedback">{errors.billingZipCode}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mt-4">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <Icon icon="mdi:credit-card" className="me-2" />
                  Forma de Pagamento
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="creditCard"
                      value="credit_card"
                      checked={formData.payment.method === 'credit_card'}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        payment: { ...prev.payment, method: e.target.value }
                      }))}
                    />
                    <label className="form-check-label" htmlFor="creditCard">
                      <Icon icon="mdi:credit-card" className="me-2" />
                      Cartão de Crédito
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="boleto"
                      value="boleto"
                      checked={formData.payment.method === 'boleto'}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        payment: { ...prev.payment, method: e.target.value }
                      }))}
                    />
                    <label className="form-check-label" htmlFor="boleto">
                      <Icon icon="mdi:file-document" className="me-2" />
                      Boleto Bancário
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="pix"
                      value="pix"
                      checked={formData.payment.method === 'pix'}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        payment: { ...prev.payment, method: e.target.value }
                      }))}
                    />
                    <label className="form-check-label" htmlFor="pix">
                      <Icon icon="mdi:qrcode" className="me-2" />
                      PIX
                    </label>
                  </div>
                </div>

                {formData.payment.method === 'credit_card' && (
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label">Número do Cartão *</label>
                        <input
                          type="text"
                          className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                          value={formData.payment.cardNumber}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            payment: { ...prev.payment, cardNumber: formatCardNumber(e.target.value) }
                          }))}
                          maxLength="19"
                          placeholder="0000 0000 0000 0000"
                        />
                        {errors.cardNumber && (
                          <div className="invalid-feedback">{errors.cardNumber}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Nome no Cartão *</label>
                        <input
                          type="text"
                          className={`form-control ${errors.cardName ? 'is-invalid' : ''}`}
                          value={formData.payment.cardName}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            payment: { ...prev.payment, cardName: e.target.value }
                          }))}
                        />
                        {errors.cardName && (
                          <div className="invalid-feedback">{errors.cardName}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label className="form-label">Validade *</label>
                        <input
                          type="text"
                          className={`form-control ${errors.cardExpiry ? 'is-invalid' : ''}`}
                          value={formData.payment.cardExpiry}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            payment: { ...prev.payment, cardExpiry: formatExpiry(e.target.value) }
                          }))}
                          maxLength="5"
                          placeholder="MM/AA"
                        />
                        {errors.cardExpiry && (
                          <div className="invalid-feedback">{errors.cardExpiry}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label className="form-label">CVV *</label>
                        <input
                          type="text"
                          className={`form-control ${errors.cardCvv ? 'is-invalid' : ''}`}
                          value={formData.payment.cardCvv}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            payment: { ...prev.payment, cardCvv: e.target.value }
                          }))}
                          maxLength="4"
                          placeholder="123"
                        />
                        {errors.cardCvv && (
                          <div className="invalid-feedback">{errors.cardCvv}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Parcelas</label>
                        <select
                          className="form-select"
                          value={formData.payment.installments}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            payment: { ...prev.payment, installments: parseInt(e.target.value) }
                          }))}
                        >
                          <option value={1}>1x sem juros</option>
                          <option value={2}>2x sem juros</option>
                          <option value={3}>3x sem juros</option>
                          <option value={6}>6x com juros</option>
                          <option value={12}>12x com juros</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Coluna do Resumo */}
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <Icon icon="mdi:cart" className="me-2" />
                  Resumo do Pedido
                </h5>
              </div>
              <div className="card-body">
                {/* Itens do Carrinho */}
                <div className="cart-summary">
                  {cart.map((item) => (
                    <div key={item.id} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                      <div>
                        <h6 className="mb-1" style={{ fontSize: '0.9rem' }}>
                          {item.product.name}
                        </h6>
                        {item.plan && (
                          <small className="text-muted d-block">
                            Plano: {item.plan.name}
                          </small>
                        )}
                        <small className="text-muted">
                          Qtd: {item.quantity}
                        </small>
                      </div>
                      <div className="text-end">
                        <div className="fw-semibold">
                          R$ {((item.plan ? item.plan.price : item.product.price) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cupons */}
                <div className="mt-3">
                  <h6>Cupons de Desconto</h6>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Código do cupom"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button
                      className="btn btn-outline-primary"
                      type="button"
                      onClick={handleApplyCoupon}
                    >
                      Aplicar
                    </button>
                  </div>
                  {couponError && (
                    <div className="text-danger small">{couponError}</div>
                  )}
                  
                  {coupons.map((coupon) => (
                    <div key={coupon.code} className="d-flex justify-content-between align-items-center py-1">
                      <span className="badge bg-success">{coupon.code}</span>
                      <button
                        className="btn btn-sm btn-link text-danger p-0"
                        onClick={() => removeCoupon(coupon.code)}
                      >
                        <Icon icon="mdi:close" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Totais */}
                <div className="mt-3 pt-3 border-top">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>R$ {getSubtotal().toFixed(2)}</span>
                  </div>
                  {getDiscount() > 0 && (
                    <div className="d-flex justify-content-between mb-2 text-success">
                      <span>Desconto:</span>
                      <span>- R$ {getDiscount().toFixed(2)}</span>
                    </div>
                  )}
                  <div className="d-flex justify-content-between fw-bold fs-5">
                    <span>Total:</span>
                    <span className="text-primary">R$ {getTotal().toFixed(2)}</span>
                  </div>
                </div>

                {/* Botão Finalizar */}
                <div className="mt-4">
                  <button
                    className="btn btn-primary w-100 btn-lg"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Icon icon="mdi:loading" className="spinning me-2" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <Icon icon="mdi:credit-card" className="me-2" />
                        Finalizar Compra
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default CheckoutPage; 