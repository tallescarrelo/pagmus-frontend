import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useAffiliate } from '../../contexts/AffiliateContext';

const AffiliateDashboard = () => {
  const { performance, affiliates, commissions, loading } = useAffiliate();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'inactive':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'pending':
        return 'Pendente';
      case 'inactive':
        return 'Inativo';
      default:
        return 'Desconhecido';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-3">Carregando dados dos afiliados...</p>
      </div>
    );
  }

  return (
    <div className="affiliate-dashboard">
      {/* Header do Dashboard */}
      <div className="row mb-4">
        <div className="col-md-8">
          <h2 className="mb-2">
            <Icon icon="mdi:account-multiple" className="me-2" />
            Dashboard de Afiliados
          </h2>
          <p className="text-muted mb-0">
            Acompanhe o desempenho dos seus afiliados em tempo real
          </p>
        </div>
        <div className="col-md-4 text-end">
          <select
            className="form-select w-auto"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="week">Última Semana</option>
            <option value="month">Último Mês</option>
            <option value="quarter">Último Trimestre</option>
            <option value="year">Último Ano</option>
          </select>
        </div>
      </div>

      {/* Cards de Métricas */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Total de Afiliados</h6>
                  <h3 className="mb-0">{performance.total_affiliates}</h3>
                  <small className="opacity-75">
                    {performance.active_affiliates} ativos
                  </small>
                </div>
                <Icon icon="mdi:account-multiple" className="text-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Vendas Totais</h6>
                  <h3 className="mb-0">{formatCurrency(performance.total_sales)}</h3>
                  <small className="opacity-75">
                    +{performance.monthly_growth}% este mês
                  </small>
                </div>
                <Icon icon="mdi:currency-usd" className="text-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Comissões</h6>
                  <h3 className="mb-0">{formatCurrency(performance.total_commissions)}</h3>
                  <small className="opacity-75">
                    {performance.total_conversions} conversões
                  </small>
                </div>
                <Icon icon="mdi:percent" className="text-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Taxa de Conversão</h6>
                  <h3 className="mb-0">{performance.average_conversion_rate}%</h3>
                  <small className="opacity-75">
                    {formatNumber(performance.total_clicks)} cliques
                  </small>
                </div>
                <Icon icon="mdi:trending-up" className="text-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos e Análises */}
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <Icon icon="mdi:chart-line" className="me-2" />
                Performance dos Afiliados
              </h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Afiliado</th>
                      <th>Status</th>
                      <th>Vendas</th>
                      <th>Comissões</th>
                      <th>Conversões</th>
                      <th>Taxa</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {affiliates.map((affiliate) => (
                      <tr key={affiliate.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="avatar-sm me-3">
                              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style={{ width: '40px', height: '40px' }}>
                                {affiliate.name.charAt(0)}
                              </div>
                            </div>
                            <div>
                              <h6 className="mb-0">{affiliate.name}</h6>
                              <small className="text-muted">{affiliate.email}</small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`badge bg-${getStatusColor(affiliate.status)}`}>
                            {getStatusText(affiliate.status)}
                          </span>
                        </td>
                        <td>
                          <strong>{formatCurrency(affiliate.total_sales)}</strong>
                        </td>
                        <td>
                          <strong className="text-success">{formatCurrency(affiliate.total_commission)}</strong>
                        </td>
                        <td>
                          <div>
                            <strong>{affiliate.conversions}</strong>
                            <br />
                            <small className="text-muted">{formatNumber(affiliate.clicks)} cliques</small>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="progress me-2" style={{ width: '60px', height: '6px' }}>
                              <div 
                                className="progress-bar bg-success" 
                                style={{ width: `${affiliate.conversion_rate}%` }}
                              ></div>
                            </div>
                            <small>{affiliate.conversion_rate}%</small>
                          </div>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button className="btn btn-outline-primary">
                              <Icon icon="mdi:eye" />
                            </button>
                            <button className="btn btn-outline-success">
                              <Icon icon="mdi:pencil" />
                            </button>
                            <button className="btn btn-outline-info">
                              <Icon icon="mdi:link" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <Icon icon="mdi:trophy" className="me-2" />
                Top Performers
              </h5>
            </div>
            <div className="card-body">
              {performance.top_performers.map((affiliateId, index) => {
                const affiliate = affiliates.find(a => a.id === affiliateId);
                if (!affiliate) return null;

                return (
                  <div key={affiliate.id} className="d-flex align-items-center mb-3">
                    <div className="me-3">
                      <div className={`bg-${index === 0 ? 'warning' : index === 1 ? 'secondary' : 'light'} rounded-circle d-flex align-items-center justify-content-center text-white fw-bold`} style={{ width: '30px', height: '30px', fontSize: '12px' }}>
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-0">{affiliate.name}</h6>
                      <small className="text-muted">
                        {formatCurrency(affiliate.total_sales)} em vendas
                      </small>
                    </div>
                    <div className="text-end">
                      <strong className="text-success">
                        {formatCurrency(affiliate.total_commission)}
                      </strong>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <Icon icon="mdi:chart-pie" className="me-2" />
                Resumo de Comissões
              </h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Pendentes</span>
                  <span>{commissions.filter(c => c.status === 'pending').length}</span>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                  <div 
                    className="progress-bar bg-warning" 
                    style={{ width: `${(commissions.filter(c => c.status === 'pending').length / commissions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Pagas</span>
                  <span>{commissions.filter(c => c.status === 'paid').length}</span>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                  <div 
                    className="progress-bar bg-success" 
                    style={{ width: `${(commissions.filter(c => c.status === 'paid').length / commissions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Rejeitadas</span>
                  <span>{commissions.filter(c => c.status === 'rejected').length}</span>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                  <div 
                    className="progress-bar bg-danger" 
                    style={{ width: `${(commissions.filter(c => c.status === 'rejected').length / commissions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <Icon icon="mdi:lightning-bolt" className="me-2" />
                Ações Rápidas
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3">
                  <button className="btn btn-primary w-100 mb-2">
                    <Icon icon="mdi:account-plus" className="me-2" />
                    Novo Afiliado
                  </button>
                </div>
                <div className="col-md-3">
                  <button className="btn btn-success w-100 mb-2">
                    <Icon icon="mdi:link-plus" className="me-2" />
                    Gerar Links
                  </button>
                </div>
                <div className="col-md-3">
                  <button className="btn btn-info w-100 mb-2">
                    <Icon icon="mdi:file-export" className="me-2" />
                    Exportar Relatório
                  </button>
                </div>
                <div className="col-md-3">
                  <button className="btn btn-warning w-100 mb-2">
                    <Icon icon="mdi:bell" className="me-2" />
                    Configurar Alertas
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDashboard; 