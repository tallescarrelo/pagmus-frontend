import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useAffiliate } from '../../contexts/AffiliateContext';

const CommissionManager = () => {
  const { commissions, affiliates, approveCommission, rejectCommission, loading } = useAffiliate();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showRejectModal, setShowRejectModal] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'paid':
        return 'success';
      case 'rejected':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'paid':
        return 'Paga';
      case 'rejected':
        return 'Rejeitada';
      default:
        return 'Desconhecido';
    }
  };

  const getAffiliateName = (affiliateId) => {
    const affiliate = affiliates.find(a => a.id === affiliateId);
    return affiliate ? affiliate.name : 'N/A';
  };

  const handleApproveCommission = async (commissionId) => {
    try {
      await approveCommission(commissionId);
      alert('Comissão aprovada com sucesso!');
    } catch (error) {
      alert('Erro ao aprovar comissão: ' + error.message);
    }
  };

  const handleRejectCommission = async (commissionId) => {
    if (!rejectReason.trim()) {
      alert('Por favor, informe o motivo da rejeição');
      return;
    }

    try {
      await rejectCommission(commissionId, rejectReason);
      setShowRejectModal(null);
      setRejectReason('');
      alert('Comissão rejeitada com sucesso!');
    } catch (error) {
      alert('Erro ao rejeitar comissão: ' + error.message);
    }
  };

  const filteredCommissions = selectedStatus === 'all' 
    ? commissions 
    : commissions.filter(c => c.status === selectedStatus);

  const totalPending = commissions.filter(c => c.status === 'pending').length;
  const totalPaid = commissions.filter(c => c.status === 'paid').length;
  const totalRejected = commissions.filter(c => c.status === 'rejected').length;
  const totalAmount = commissions.reduce((sum, c) => sum + c.amount, 0);
  const totalCommission = commissions.reduce((sum, c) => sum + c.commission, 0);

  return (
    <div className="commission-manager">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-md-8">
          <h2 className="mb-2">
            <Icon icon="mdi:currency-usd" className="me-2" />
            Gerenciar Comissões
          </h2>
          <p className="text-muted mb-0">
            Aprove, rejeite e acompanhe as comissões dos afiliados
          </p>
        </div>
        <div className="col-md-4 text-end">
          <select
            className="form-select w-auto"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">Todas as Comissões</option>
            <option value="pending">Pendentes</option>
            <option value="paid">Pagas</option>
            <option value="rejected">Rejeitadas</option>
          </select>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Pendentes</h6>
                  <h3 className="mb-0">{totalPending}</h3>
                  <small className="opacity-75">
                    Aguardando aprovação
                  </small>
                </div>
                <Icon icon="mdi:clock-outline" className="text-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Pagas</h6>
                  <h3 className="mb-0">{totalPaid}</h3>
                  <small className="opacity-75">
                    Comissões aprovadas
                  </small>
                </div>
                <Icon icon="mdi:check-circle" className="text-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Rejeitadas</h6>
                  <h3 className="mb-0">{totalRejected}</h3>
                  <small className="opacity-75">
                    Comissões rejeitadas
                  </small>
                </div>
                <Icon icon="mdi:close-circle" className="text-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Total</h6>
                  <h3 className="mb-0">{formatCurrency(totalCommission)}</h3>
                  <small className="opacity-75">
                    {formatCurrency(totalAmount)} em vendas
                  </small>
                </div>
                <Icon icon="mdi:currency-usd" className="text-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Comissões */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">
            <Icon icon="mdi:format-list-bulleted" className="me-2" />
            Comissões ({filteredCommissions.length})
          </h5>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
              <p className="mt-3">Carregando comissões...</p>
            </div>
          ) : filteredCommissions.length === 0 ? (
            <div className="text-center py-5">
              <Icon icon="mdi:currency-usd-off" className="text-muted" style={{ fontSize: '4rem' }} />
              <h5 className="mt-3">Nenhuma comissão encontrada</h5>
              <p className="text-muted">
                {selectedStatus === 'all' 
                  ? 'Não há comissões registradas ainda'
                  : `Não há comissões ${selectedStatus === 'pending' ? 'pendentes' : selectedStatus === 'paid' ? 'pagas' : 'rejeitadas'}`
                }
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Afiliado</th>
                    <th>Pedido</th>
                    <th>Cliente</th>
                    <th>Valor da Venda</th>
                    <th>Comissão</th>
                    <th>Data</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCommissions.map((commission) => (
                    <tr key={commission.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-sm me-3">
                            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style={{ width: '35px', height: '35px', fontSize: '12px' }}>
                              {getAffiliateName(commission.affiliate_id).charAt(0)}
                            </div>
                          </div>
                          <div>
                            <h6 className="mb-0" style={{ fontSize: '0.9rem' }}>
                              {getAffiliateName(commission.affiliate_id)}
                            </h6>
                            <small className="text-muted">
                              Pedido #{commission.order_id}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <strong>#{commission.order_id}</strong>
                      </td>
                      <td>
                        <span>{commission.customer}</span>
                      </td>
                      <td>
                        <strong>{formatCurrency(commission.amount)}</strong>
                      </td>
                      <td>
                        <strong className="text-success">
                          {formatCurrency(commission.commission)}
                        </strong>
                      </td>
                      <td>
                        <span>{formatDate(commission.date)}</span>
                      </td>
                      <td>
                        <span className={`badge bg-${getStatusColor(commission.status)}`}>
                          {getStatusText(commission.status)}
                        </span>
                        {commission.rejection_reason && (
                          <small className="d-block text-muted">
                            Motivo: {commission.rejection_reason}
                          </small>
                        )}
                      </td>
                      <td>
                        {commission.status === 'pending' && (
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-success"
                              onClick={() => handleApproveCommission(commission.id)}
                              title="Aprovar"
                            >
                              <Icon icon="mdi:check" />
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => setShowRejectModal(commission.id)}
                              title="Rejeitar"
                            >
                              <Icon icon="mdi:close" />
                            </button>
                          </div>
                        )}
                        {commission.status === 'paid' && (
                          <span className="text-success">
                            <Icon icon="mdi:check-circle" />
                            Aprovada
                          </span>
                        )}
                        {commission.status === 'rejected' && (
                          <span className="text-danger">
                            <Icon icon="mdi:close-circle" />
                            Rejeitada
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Ações em Lote */}
      {selectedStatus === 'pending' && totalPending > 0 && (
        <div className="card mt-4">
          <div className="card-header">
            <h5 className="card-title mb-0">
              <Icon icon="mdi:lightning-bolt" className="me-2" />
              Ações em Lote
            </h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <button className="btn btn-success w-100 mb-2">
                  <Icon icon="mdi:check-all" className="me-2" />
                  Aprovar Todas as Pendentes
                </button>
              </div>
              <div className="col-md-6">
                <button className="btn btn-info w-100 mb-2">
                  <Icon icon="mdi:file-export" className="me-2" />
                  Exportar Relatório
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Rejeição */}
      {showRejectModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <Icon icon="mdi:close-circle" className="me-2" />
                  Rejeitar Comissão
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowRejectModal(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Motivo da Rejeição *</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Informe o motivo da rejeição..."
                  ></textarea>
                </div>
                <div className="alert alert-warning">
                  <Icon icon="mdi:alert" className="me-2" />
                  <strong>Atenção:</strong> Esta ação não pode ser desfeita. A comissão será marcada como rejeitada.
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowRejectModal(null)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRejectCommission(showRejectModal)}
                  disabled={!rejectReason.trim()}
                >
                  <Icon icon="mdi:close" className="me-2" />
                  Rejeitar Comissão
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommissionManager; 