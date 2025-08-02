import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import MasterLayout from '../../masterLayout/MasterLayout';
import Breadcrumb from '../../components/Breadcrumb';

interface Order {
  id: string;
  status: 'pending' | 'approved' | 'cancelled';
  total: number;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  customer: {
    name: string;
    email: string;
  };
  created_at: string;
  [key: string]: any;
}

const CheckoutSuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order: Order | undefined = location.state?.order;

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

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusColor = (status: string): string => {
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

  const getStatusText = (status: string): string => {
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
                    <p><strong>Nome:</strong> {order.customer.name}</p>
                    <p><strong>Email:</strong> {order.customer.email}</p>
                    <p><strong>Data:</strong> {new Date(order.created_at).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div className="col-md-6">
                    <h6>Status do Pedido</h6>
                    <div className={`badge bg-${getStatusColor(order.status)} fs-6 px-3 py-2`}>
                      {getStatusText(order.status)}
                    </div>
                    <p className="mt-2"><strong>Total:</strong> {formatCurrency(order.total)}</p>
                  </div>
                </div>

                {/* Lista de Itens */}
                <div className="mt-4">
                  <h6>Itens do Pedido</h6>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Produto</th>
                          <th>Quantidade</th>
                          <th>Preço Unit.</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item) => (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{formatCurrency(item.price)}</td>
                            <td>{formatCurrency(item.price * item.quantity)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="card mt-4">
              <div className="card-body text-center">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <button className="btn btn-outline-primary w-100" onClick={() => navigate('/products')}>
                      <Icon icon="mdi:shopping" className="me-2" />
                      Continuar Comprando
                    </button>
                  </div>
                  <div className="col-md-6 mb-3">
                    <button className="btn btn-primary w-100" onClick={() => navigate('/dashboard')}>
                      <Icon icon="mdi:view-dashboard" className="me-2" />
                      Ir para Dashboard
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