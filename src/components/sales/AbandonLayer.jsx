import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { Button, Form } from 'react-bootstrap';

const AbandonLayer = () => {
  return (
    <div className="card bg-transparent border-0">
      {/* Cabeçalho */}
      <div className="card-header d-flex align-items-center justify-content-between gap-3 mb-4">
        <h5 className="mb-0 d-flex align-items-center gap-2">
          <Icon icon="mdi:clipboard-text-outline" /> Listagem de Abandonos
        </h5>
        <div className="d-flex align-items-center gap-2">
          <Button variant="primary" size="sm">
            <Icon icon="mdi:filter-variant" className="me-1" /> Realizar Filtro
          </Button>
          <Button variant="success" size="sm">
            <Icon icon="mdi:file-excel" className="me-1" /> Exportar em Excel
          </Button>
        </div>
      </div>

      {/* Filtro lateral flutuante pode ser implementado separadamente */}

      {/* Tabela */}
      <div className="card mb-40">
        <div className="card-header d-flex align-items-center gap-2">
          <Icon icon="mdi:format-list-bulleted" className="text-lg" /> <strong>Todos os Abandonos</strong>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-end align-items-center mb-3 gap-3">
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-success rounded-circle" style={{ width: 10, height: 10 }}></span>
              <span className="text-sm">Convertido</span>
              <span className="badge bg-danger rounded-circle ms-3" style={{ width: 10, height: 10 }}></span>
              <span className="text-sm">Não convertido</span>
            </div>
            <Form.Control type="text" placeholder="Pesquisar" style={{ width: '200px' }} />
          </div>
          <div className="table-responsive">
            <table className="table colored-row-table text-sm">
              <thead>
                <tr>
                  <th>Nome/Contato</th>
                  <th>Produto</th>
                  <th>Plano</th>
                  <th>Afiliado</th>
                  <th>Status</th>
                  <th>Checkout</th>
                  <th>Período</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={8} className="text-center py-4 text-secondary-light">
                    Nenhum registro encontrado
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbandonLayer;
