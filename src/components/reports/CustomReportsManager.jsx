import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useReports } from '../../contexts/ReportsContext';

const CustomReportsManager = () => {
  const { 
    reports, 
    loading, 
    filters, 
    setFilters, 
    generateReport, 
    saveReport, 
    exportReport,
    getFilteredData,
    getMetrics 
  } = useReports();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(null);
  const [reportConfig, setReportConfig] = useState({
    name: '',
    description: '',
    type: 'sales',
    format: 'pdf',
    filters: { ...filters }
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleGenerateReport = async () => {
    try {
      const report = await generateReport(reportConfig);
      alert('Relatório gerado com sucesso!');
      setShowCreateModal(false);
      setReportConfig({
        name: '',
        description: '',
        type: 'sales',
        format: 'pdf',
        filters: { ...filters }
      });
    } catch (error) {
      alert('Erro ao gerar relatório: ' + error.message);
    }
  };

  const handleSaveReport = async () => {
    try {
      await saveReport(reportConfig);
      alert('Relatório salvo com sucesso!');
      setShowCreateModal(false);
    } catch (error) {
      alert('Erro ao salvar relatório: ' + error.message);
    }
  };

  const handleExportReport = async (reportId, format) => {
    try {
      const result = await exportReport(reportId, format);
      alert(`Relatório exportado: ${result.fileName}`);
      setShowExportModal(null);
    } catch (error) {
      alert('Erro ao exportar relatório: ' + error.message);
    }
  };

  const filteredData = getFilteredData();
  const metrics = getMetrics(filteredData);

  return (
    <div className="custom-reports-manager">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-md-8">
          <h2 className="mb-2">
            <Icon icon="mdi:file-chart" className="me-2" />
            Relatórios Personalizados
          </h2>
          <p className="text-muted mb-0">
            Crie e gerencie relatórios personalizados com filtros avançados
          </p>
        </div>
        <div className="col-md-4 text-end">
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            <Icon icon="mdi:plus" className="me-2" />
            Novo Relatório
          </button>
        </div>
      </div>

      {/* Filtros Avançados */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="card-title mb-0">
            <Icon icon="mdi:filter-variant" className="me-2" />
            Filtros Avançados
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <label className="form-label">Data Inicial</label>
              <input
                type="date"
                className="form-control"
                value={filters.dateFrom}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Data Final</label>
              <input
                type="date"
                className="form-control"
                value={filters.dateTo}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Categoria</label>
              <select
                className="form-select"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="all">Todas</option>
                <option value="education">Educação</option>
                <option value="ebook">E-book</option>
                <option value="mentoring">Mentoria</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="all">Todos</option>
                <option value="completed">Completados</option>
                <option value="pending">Pendentes</option>
                <option value="cancelled">Cancelados</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">Ações</label>
              <div className="d-grid">
                <button className="btn btn-outline-primary btn-sm">
                  <Icon icon="mdi:refresh" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resumo dos Dados Filtrados */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h4 className="mb-1">{formatCurrency(metrics.totalRevenue)}</h4>
              <small>Receita Total</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h4 className="mb-1">{metrics.totalOrders}</h4>
              <small>Total de Pedidos</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <h4 className="mb-1">{formatCurrency(metrics.avgOrderValue)}</h4>
              <small>Ticket Médio</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body text-center">
              <h4 className="mb-1">{formatCurrency(metrics.totalCommissions)}</h4>
              <small>Comissões</small>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Dados Filtrados */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">
            <Icon icon="mdi:table" className="me-2" />
            Dados Filtrados ({filteredData.length} registros)
          </h5>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
              <p className="mt-3">Carregando dados...</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-5">
              <Icon icon="mdi:table-off" className="text-muted" style={{ fontSize: '4rem' }} />
              <h5 className="mt-3">Nenhum dado encontrado</h5>
              <p className="text-muted">Ajuste os filtros para ver os dados</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Produto</th>
                    <th>Cliente</th>
                    <th>Afiliado</th>
                    <th>Valor</th>
                    <th>Comissão</th>
                    <th>Status</th>
                    <th>Pagamento</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item.id}>
                      <td>{formatDate(item.date)}</td>
                      <td>
                        <strong>{item.product}</strong>
                        <br />
                        <small className="text-muted">{item.category}</small>
                      </td>
                      <td>{item.customer}</td>
                      <td>{item.affiliate}</td>
                      <td>
                        <strong>{formatCurrency(item.amount)}</strong>
                      </td>
                      <td>
                        <span className="text-success">
                          {formatCurrency(item.commission)}
                        </span>
                      </td>
                      <td>
                        <span className={`badge bg-${
                          item.status === 'completed' ? 'success' : 
                          item.status === 'pending' ? 'warning' : 'danger'
                        }`}>
                          {item.status === 'completed' ? 'Completado' :
                           item.status === 'pending' ? 'Pendente' : 'Cancelado'}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-secondary">
                          {item.payment_method === 'credit_card' ? 'Cartão' :
                           item.payment_method === 'pix' ? 'PIX' : 'Boleto'}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-primary" title="Ver detalhes">
                            <Icon icon="mdi:eye" />
                          </button>
                          <button className="btn btn-outline-info" title="Exportar">
                            <Icon icon="mdi:file-export" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Criação de Relatório */}
      {showCreateModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <Icon icon="mdi:file-chart" className="me-2" />
                  Criar Relatório Personalizado
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCreateModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Nome do Relatório *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={reportConfig.name}
                        onChange={(e) => setReportConfig({ ...reportConfig, name: e.target.value })}
                        placeholder="Ex: Relatório de Vendas - Janeiro 2024"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Tipo de Relatório</label>
                      <select
                        className="form-select"
                        value={reportConfig.type}
                        onChange={(e) => setReportConfig({ ...reportConfig, type: e.target.value })}
                      >
                        <option value="sales">Vendas</option>
                        <option value="products">Produtos</option>
                        <option value="affiliates">Afiliados</option>
                        <option value="customers">Clientes</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Descrição</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={reportConfig.description}
                    onChange={(e) => setReportConfig({ ...reportConfig, description: e.target.value })}
                    placeholder="Descreva o objetivo deste relatório..."
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Formato de Exportação</label>
                      <select
                        className="form-select"
                        value={reportConfig.format}
                        onChange={(e) => setReportConfig({ ...reportConfig, format: e.target.value })}
                      >
                        <option value="pdf">PDF</option>
                        <option value="excel">Excel</option>
                        <option value="csv">CSV</option>
                        <option value="json">JSON</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Filtros Aplicados</label>
                      <div className="form-control-plaintext">
                        {Object.entries(filters).map(([key, value]) => (
                          <span key={key} className="badge bg-light text-dark me-1">
                            {key}: {value || 'todos'}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="alert alert-info">
                  <Icon icon="mdi:information" className="me-2" />
                  <strong>Dica:</strong> Este relatório será gerado com base nos filtros atuais e poderá ser salvo para uso futuro.
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={handleSaveReport}
                  disabled={!reportConfig.name.trim()}
                >
                  <Icon icon="mdi:content-save" className="me-2" />
                  Salvar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleGenerateReport}
                  disabled={!reportConfig.name.trim()}
                >
                  <Icon icon="mdi:file-chart" className="me-2" />
                  Gerar Relatório
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Exportação */}
      {showExportModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <Icon icon="mdi:file-export" className="me-2" />
                  Exportar Relatório
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowExportModal(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Formato de Exportação</label>
                  <select className="form-select">
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="csv">CSV</option>
                    <option value="json">JSON</option>
                  </select>
                </div>
                <div className="alert alert-warning">
                  <Icon icon="mdi:alert" className="me-2" />
                  <small>A exportação pode levar alguns segundos dependendo do tamanho dos dados.</small>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowExportModal(null)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleExportReport(showExportModal, 'pdf')}
                >
                  <Icon icon="mdi:download" className="me-2" />
                  Exportar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomReportsManager; 