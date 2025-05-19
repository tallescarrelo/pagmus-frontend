import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const ReversalLayer = () => {
  return (
    <div className="card bg-transparent border-0">
      {/* Cabeçalho */}
      <div className="card-header d-flex align-items-center justify-content-between gap-3 mb-4">
        <h5 className="mb-0 d-flex align-items-center gap-2">
          <Icon icon="mdi:clipboard-text-outline" /> Solicitações de estorno
        </h5>
      </div>

      {/* Aviso */}
      <div className="alert alert-outline alert-warning d-flex align-items-center gap-2 mb-4">
        <Icon icon="mdi:alert-circle-outline" className="text-xl" />
        <span>
          <strong>Atenção!</strong> As compras que possuem solicitações com status <strong>Pendente</strong>, <strong>Aguardando Cliente</strong> ou <strong>Aguardando Produtor</strong> que não forem resolvidas em <strong>4 dias úteis</strong>, serão estornadas automaticamente.
        </span>
      </div>

      {/* Filtro e Indicadores */}
      <div className="card mb-4">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h6 className="mb-0 d-flex align-items-center gap-2">
            <Icon icon="mdi:cash-refund" /> Solicitações de estorno
          </h6>
          <Button variant="primary" size="sm">
            <Icon icon="mdi:filter-variant" className="me-1" /> Realizar Filtro
          </Button>
        </div>
        <div className="card-body">
          <h4 className="text-primary-600 fw-bold">R$ 0,00</h4>
          <p className="text-sm text-secondary mb-4">0 estorno(s) no total.</p>

          <div className="row g-4">
            {[
              { label: 'Pendentes', color: 'warning' },
              { label: 'Realizados', color: 'success' },
              { label: 'Aguardando', color: 'primary' },
              { label: 'Aguardando Produtor', color: 'purple' },
              { label: 'Aguardando Cliente', color: 'info' },
              { label: 'Revertidos', color: 'danger' },
              { label: 'Devolução', color: 'gray', tooltip: 'Aguardando devolução' },
              { label: 'Pagmus', color: 'indigo', tooltip: 'Intervensão da equipe Pagmus' }
            ].map((item, index) => (
              <div className="col-md-3" key={index}>
                <div className="border rounded-4 p-3 text-center h-100">
                  <div className={`text-${item.color} fw-semibold d-flex align-items-center justify-content-center gap-1`}>
                    {item.label}{' '}
                    {item.tooltip && (
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>{item.tooltip}</Tooltip>}
                      >
                        <span><Icon icon="mdi:information-outline" className="text-muted" /></span>
                      </OverlayTrigger>
                    )}
                  </div>
                  <h6 className="mb-0 text-sm text-muted">R$ 0,00</h6>
                  <small className="text-muted">0 estorno(s)</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabela de estornos */}
      <div className="table-responsive">
        <table className="table colored-row-table text-sm">
          <thead>
            <tr>
              <th>Nome do Cliente</th>
              <th>Produto</th>
              <th>Data da Compra</th>
              <th>Data da Solicitação</th>
              <th>Venda</th>
              <th>Motivo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={8} className="text-center py-4 text-secondary-light">
                Clique no botão <strong>
                  <Icon icon="mdi:filter-variant" className="text-muted" /> Realizar Filtro
                </strong> para filtrar e exibir informações.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReversalLayer;
