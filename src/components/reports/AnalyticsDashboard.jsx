import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useReports } from '../../contexts/ReportsContext';

const AnalyticsDashboard = () => {
  const { reports, loading, getMetrics, getChartData } = useReports();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedView, setSelectedView] = useState('overview');

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-3">Carregando dados analíticos...</p>
      </div>
    );
  }

  const metrics = getMetrics();
  const salesByDay = getChartData('sales_by_day');
  const salesByCategory = getChartData('sales_by_category');
  const salesByAffiliate = getChartData('sales_by_affiliate');

  return (
    <div className="analytics-dashboard">
      {/* Header do Dashboard */}
      <div className="row mb-4">
        <div className="col-md-8">
          <h2 className="mb-2">
            <Icon icon="mdi:chart-line" className="me-2" />
            Dashboard Analítico
          </h2>
          <p className="text-muted mb-0">
            Análise completa de vendas, produtos e performance
          </p>
        </div>
        <div className="col-md-4 text-end">
          <div className="btn-group">
            <select
              className="form-select form-select-sm w-auto"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="week">Última Semana</option>
              <option value="month">Último Mês</option>
              <option value="quarter">Último Trimestre</option>
              <option value="year">Último Ano</option>
            </select>
            <select
              className="form-select form-select-sm w-auto ms-2"
              value={selectedView}
              onChange={(e) => setSelectedView(e.target.value)}
            >
              <option value="overview">Visão Geral</option>
              <option value="sales">Vendas</option>
              <option value="products">Produtos</option>
              <option value="affiliates">Afiliados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cards de Métricas Principais */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Receita Total</h6>
                  <h3 className="mb-0">{formatCurrency(metrics.totalRevenue)}</h3>
                  <small className="opacity-75">
                    {formatNumber(metrics.totalOrders)} pedidos
                  </small>
                </div>
                <Icon icon="mdi:currency-usd" className="text-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Ticket Médio</h6>
                  <h3 className="mb-0">{formatCurrency(metrics.avgOrderValue)}</h3>
                  <small className="opacity-75">
                    Por pedido
                  </small>
                </div>
                <Icon icon="mdi:chart-bar" className="text-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Taxa de Conversão</h6>
                  <h3 className="mb-0">{formatPercentage(metrics.conversionRate)}</h3>
                  <small className="opacity-75">
                    Vendas completadas
                  </small>
                </div>
                <Icon icon="mdi:trending-up" className="text-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Comissões</h6>
                  <h3 className="mb-0">{formatCurrency(metrics.totalCommissions)}</h3>
                  <small className="opacity-75">
                    Total pago
                  </small>
                </div>
                <Icon icon="mdi:percent" className="text-xl" />
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
                Vendas por Período
              </h5>
            </div>
            <div className="card-body">
              <div className="chart-container" style={{ height: '300px' }}>
                {salesByDay.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Data</th>
                          <th>Vendas</th>
                          <th>Pedidos</th>
                          <th>Progresso</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salesByDay.map((day, index) => (
                          <tr key={index}>
                            <td>{new Date(day.date).toLocaleDateString('pt-BR')}</td>
                            <td>
                              <strong>{formatCurrency(day.sales)}</strong>
                            </td>
                            <td>{day.orders}</td>
                            <td>
                              <div className="progress" style={{ height: '8px' }}>
                                <div 
                                  className="progress-bar bg-success" 
                                  style={{ 
                                    width: `${(day.sales / Math.max(...salesByDay.map(d => d.sales))) * 100}%` 
                                  }}
                                ></div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Icon icon="mdi:chart-line-off" className="text-muted" style={{ fontSize: '3rem' }} />
                    <p className="text-muted mt-2">Nenhum dado disponível</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <Icon icon="mdi:pie-chart" className="me-2" />
                Vendas por Categoria
              </h5>
            </div>
            <div className="card-body">
              {salesByCategory.length > 0 ? (
                <div>
                  {salesByCategory.map((category, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <h6 className="mb-1">{category.category}</h6>
                        <small className="text-muted">
                          {formatCurrency(category.sales)}
                        </small>
                      </div>
                      <div className="text-end">
                        <div className="progress" style={{ width: '60px', height: '6px' }}>
                          <div 
                            className="progress-bar bg-primary" 
                            style={{ 
                              width: `${(category.sales / Math.max(...salesByCategory.map(c => c.sales))) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <small className="text-muted">
                          {((category.sales / metrics.totalRevenue) * 100).toFixed(1)}%
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <Icon icon="mdi:pie-chart-outline" className="text-muted" style={{ fontSize: '3rem' }} />
                  <p className="text-muted mt-2">Nenhum dado disponível</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Produtos */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <Icon icon="mdi:package-variant" className="me-2" />
                Performance dos Produtos
              </h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Categoria</th>
                      <th>Vendas</th>
                      <th>Pedidos</th>
                      <th>Ticket Médio</th>
                      <th>Taxa de Conversão</th>
                      <th>Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.products?.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <div>
                            <h6 className="mb-1">{product.name}</h6>
                            <small className="text-muted">
                              ID: {product.id}
                            </small>
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-secondary">
                            {product.category}
                          </span>
                        </td>
                        <td>
                          <strong>{formatCurrency(product.total_sales)}</strong>
                        </td>
                        <td>
                          <span>{product.total_orders}</span>
                        </td>
                        <td>
                          <span>{formatCurrency(product.avg_order_value)}</span>
                        </td>
                        <td>
                          <span className="text-success">
                            {formatPercentage(product.conversion_rate)}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="progress me-2" style={{ width: '60px', height: '6px' }}>
                              <div 
                                className="progress-bar bg-success" 
                                style={{ width: `${product.conversion_rate}%` }}
                              ></div>
                            </div>
                            <small>{product.conversion_rate.toFixed(1)}%</small>
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
      </div>

      {/* Análise de Afiliados */}
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <Icon icon="mdi:account-multiple" className="me-2" />
                Top Afiliados
              </h5>
            </div>
            <div className="card-body">
              {salesByAffiliate.length > 0 ? (
                <div>
                  {salesByAffiliate.map((affiliate, index) => (
                    <div key={index} className="d-flex align-items-center mb-3">
                      <div className="me-3">
                        <div className={`bg-${index === 0 ? 'warning' : index === 1 ? 'secondary' : 'light'} rounded-circle d-flex align-items-center justify-content-center text-white fw-bold`} style={{ width: '30px', height: '30px', fontSize: '12px' }}>
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{affiliate.affiliate}</h6>
                        <small className="text-muted">
                          {formatCurrency(affiliate.sales)} em vendas
                        </small>
                      </div>
                      <div className="text-end">
                        <strong className="text-success">
                          {formatCurrency(affiliate.commissions)}
                        </strong>
                        <br />
                        <small className="text-muted">comissão</small>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <Icon icon="mdi:account-multiple-outline" className="text-muted" style={{ fontSize: '3rem' }} />
                  <p className="text-muted mt-2">Nenhum afiliado encontrado</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <Icon icon="mdi:lightning-bolt" className="me-2" />
                Ações Rápidas
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <button className="btn btn-outline-primary w-100">
                    <Icon icon="mdi:file-export" className="me-2" />
                    Exportar Relatório
                  </button>
                </div>
                <div className="col-md-6 mb-3">
                  <button className="btn btn-outline-success w-100">
                    <Icon icon="mdi:chart-line" className="me-2" />
                    Gerar Gráfico
                  </button>
                </div>
                <div className="col-md-6 mb-3">
                  <button className="btn btn-outline-info w-100">
                    <Icon icon="mdi:calendar-clock" className="me-2" />
                    Agendar Relatório
                  </button>
                </div>
                <div className="col-md-6 mb-3">
                  <button className="btn btn-outline-warning w-100">
                    <Icon icon="mdi:cog" className="me-2" />
                    Configurações
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

export default AnalyticsDashboard; 