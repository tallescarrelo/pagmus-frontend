import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const IndicatorsLayer = () => {
  const mockData = [
    {
      affiliate: 'João Silva',
      sales: '12 / R$ 1.200,00',
      paidSales: '10 / R$ 1.000,00',
      commission: 'R$ 300,00'
    },
    {
      affiliate: 'Maria Souza',
      sales: '8 / R$ 800,00',
      paidSales: '7 / R$ 700,00',
      commission: 'R$ 210,00'
    }
  ];

  return (
    <div className="card bg-transparent border-0">
      {/* Cabeçalho */}
      <div className="card-header d-flex align-items-center justify-content-between gap-3 mb-4">
        <h5 className="mb-0 d-flex align-items-center gap-2">
          <Icon icon="mdi:chart-line" /> Indicadores
        </h5>
        <Button variant="success" size="sm">
          <Icon icon="mdi:file-excel" className="me-1" /> Excel
        </Button>
      </div>

      {/* Filtro */}
      <div className="card mb-4">
        <div className="card-header d-flex align-items-center gap-2">
          <Icon icon="mdi:magnify" className="text-lg" /> <strong>Filtro</strong>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Produto</label>
              <select className="form-select">
                <option>Selecione um produto</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Participação</label>
              <select className="form-select" disabled>
                <option>Afiliado</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Afiliado/Gerente/Coprodutor/Fornecedor</label>
              <input type="text" className="form-control" placeholder="Nome ou Email" disabled />
            </div>
            <div className="col-md-4">
              <label className="form-label">Período</label>
              <input type="text" className="form-control" disabled />
            </div>
            <div className="col-12 d-flex justify-content-end gap-2">
              <Button variant="warning">
                <Icon icon="mdi:broom" /> Limpar
              </Button>
              <Button variant="primary">
                <Icon icon="mdi:magnify" /> Buscar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Indicadores */}
      <div className="table-responsive">
        <table className="table colored-row-table text-sm">
          <thead>
            <tr>
              <th>Afiliado</th>
              <th>Nº Vendas / Valor Vendas</th>
              <th>Nº Vendas (Pagas) / Valor Vendas</th>
              <th>Valor Comissão (R$)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((item, index) => (
              <tr key={index}>
                <td>{item.affiliate}</td>
                <td>{item.sales}</td>
                <td>{item.paidSales}</td>
                <td>{item.commission}</td>
                <td>
                  <Button variant="outline-primary" size="sm">
                    <Icon icon="mdi:eye-outline" /> Ver mais
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IndicatorsLayer;