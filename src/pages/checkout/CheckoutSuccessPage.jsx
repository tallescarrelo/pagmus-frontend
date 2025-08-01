import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import MasterLayout from '../../masterLayout/MasterLayout';
import Breadcrumb from '../../components/Breadcrumb';

const CheckoutSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return (
      <MasterLayout>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center py-5">
              <Icon icon="mdi:alert-circle" className="text-warning" style={{ fontSize: '5rem' }} />
              <h3 className="mt-3">Pedido não encontrado</h3>
              <p className="text-muted">Não foi possível encontrar os detalhes do pedido.</p>
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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Aguardando Pagamento';
      case 'approved':
        return 'Aprovado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <MasterLayout>
      <Breadcrumb 
        title="Pedido Confirmado" 
        items={[
          { label: 'Produtos', path: '/products' },
          { label: 'Checkout', path: '/checkout' },
          { label: 'Sucesso', path: '/checkout/success' }
        ]}
      />

      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Header de Sucesso */}
            <div className="card border-success">
              <div className="card-body text-center py-5">
                <div className="mb-4">
                  <div className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                    <Icon icon="mdi:check" className="text-white" style={{ fontSize: '2.5rem' }} />
                  </div>
                </div>
                <h2 className="text-success mb-3">Pedido Confirmado!</h2>
                <p className="text-muted mb-4">
                  Seu pedido foi processado com sucesso. Você receberá um email com os detalhes da compra.
                </p>
                <div className="badge bg-success fs-6 px-3 py-2">
                  Pedido #{order.id}
                </div>
              </div>
            </div>

            {/* Detalhes do Pedido */}
            <div className="card mt-4">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <Icon icon="mdi:receipt" className="me-2" />
                  Detalhes do Pedido
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6>Informações do Cliente</h6>
                    <p className="mb-1">
                      <strong>Nome:</strong> {order.customer.name}
                    </p>
                    <p className="mb-1">
                      <strong>Email:</strong> {order.customer.email}
                    </p>
                    <p className="mb-1">
                      <strong>Telefone:</strong> {order.customer.phone}
                    </p>
                    <p className="mb-0">
                      <strong>CPF:</strong> {order.customer.cpf}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h6>Endereço de Cobrança</h6>
                    <p className="mb-1">{order.customer.billing?.address}</p>
                    <p className="mb-1">
                      {order.customer.billing?.city}, {order.customer.billing?.state}
                    </p>
                    <p className="mb-0">
                      CEP: {order.customer.billing?.zipCode}
                    </p>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-md-6">
                    <h6>Forma de Pagamento</h6>
                    <p className="mb-1">
                      <strong>Método:</strong> {
                        order.payment.method === 'credit_card' ? 'Cartão de Crédito' :
                        order.payment.method === 'boleto' ? 'Boleto Bancário' :
                        order.payment.method === 'pix' ? 'PIX' : 'Não informado'
                      }
                    </p>
                    {order.payment.method === 'credit_card' && (
                      <p className="mb-0">
                        <strong>Parcelas:</strong> {order.payment.installments}x
                      </p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <h6>Status do Pedido</h6>
                    <span className={`badge bg-${getStatusColor(order.status)} fs-6`}>
                      {getStatusText(order.status)}
                    </span>
                    <p className="mb-0 mt-2">
                      <strong>Data:</strong> {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Itens do Pedido */}
            <div className="card mt-4">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <Icon icon="mdi:package-variant" className="me-2" />
                  Itens do Pedido
                </h5>
              </div>
              <div className="card-body">
                {order.items.map((item) => (
                  <div key={item.id} className="d-flex align-items-center py-3 border-bottom">
                    <div className="flex-shrink-0 me-3">
                      <img
                        src={item.product.image || '/images/product-placeholder.png'}
                        alt={item.product.name}
                        className="rounded"
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{item.product.name}</h6>
                      {item.plan && (
                        <small className="text-muted d-block">
                          Plano: {item.plan.name}
                        </small>
                      )}
                      <small className="text-muted">
                        Quantidade: {item.quantity}
                      </small>
                    </div>
                    <div className="text-end">
                      <div className="fw-semibold">
                        {formatCurrency((item.plan ? item.plan.price : item.product.price) * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumo Financeiro */}
            <div className="card mt-4">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <Icon icon="mdi:calculator" className="me-2" />
                  Resumo Financeiro
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-8">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(order.subtotal)}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="d-flex justify-content-between mb-2 text-success">
                        <span>Desconto:</span>
                        <span>- {formatCurrency(order.discount)}</span>
                      </div>
                    )}
                    {order.coupons && order.coupons.length > 0 && (
                      <div className="mb-2">
                        <small className="text-muted">Cupons aplicados:</small>
                        {order.coupons.map((coupon) => (
                          <span key={coupon.code} className="badge bg-success me-1">
                            {coupon.code}
                          </span>
                        ))}
                      </div>
                    )}
                    <hr />
                    <div className="d-flex justify-content-between fw-bold fs-5">
                      <span>Total:</span>
                      <span className="text-primary">{formatCurrency(order.total)}</span>
                    </div>
                  </div>
                  <div className="col-md-4 text-center">
                    <div className="bg-light rounded p-3">
                      <Icon icon="mdi:email" className="text-primary mb-2" style={{ fontSize: '2rem' }} />
                      <p className="mb-2">Confirmação enviada para:</p>
                      <strong>{order.customer.email}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="card mt-4">
              <div className="card-body text-center">
                <div className="row">
                  <div className="col-md-4">
                    <button className="btn btn-outline-primary w-100 mb-2">
                      <Icon icon="mdi:download" className="me-2" />
                      Baixar Comprovante
                    </button>
                  </div>
                  <div className="col-md-4">
                    <button className="btn btn-outline-secondary w-100 mb-2">
                      <Icon icon="mdi:email" className="me-2" />
                      Reenviar Email
                    </button>
                  </div>
                  <div className="col-md-4">
                    <button 
                      className="btn btn-primary w-100 mb-2"
                      onClick={() => navigate('/products')}
                    >
                      <Icon icon="mdi:shopping" className="me-2" />
                      Continuar Comprando
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default CheckoutSuccessPage; 