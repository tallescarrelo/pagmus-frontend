import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const PerformanceAffiliatesLayer = () => {
  const [activeTab, setActiveTab] = useState('resultado');

  const resultadoData = [
    {
      afiliado: 'joao@email.com',
      cliques: 150,
      vendas: 10,
      aprovadas: 8,
      conversao: '6.67%',
    },
    {
      afiliado: 'maria@email.com',
      cliques: 200,
      vendas: 25,
      aprovadas: 22,
      conversao: '11.00%',
    },
  ];

  const top10Data = [
    {
      afiliado: 'top1@email.com',
      cliques: 1000,
      vendas: 300,
      aprovadas: 270,
      conversao: '27.00%',
    },
    {
      afiliado: 'top2@email.com',
      cliques: 850,
      vendas: 280,
      aprovadas: 240,
      conversao: '28.24%',
    },
  ];

  const tableData = activeTab === 'resultado' ? resultadoData : top10Data;

  return (
    <div className="card bg-transparent border-0">
      {/* Cabeçalho */}
      <div className="card-header d-flex align-items-center justify-content-between gap-3 mb-4">
        <h5 className="mb-0 d-flex align-items-center gap-2">
          <Icon icon="mdi:star-circle-outline" /> Desempenho de Afiliados
        </h5>
      </div>

      {/* Filtro */}
      <div className="card mb-40">
        <div className="card-header d-flex align-items-center gap-2">
          <Icon icon="mdi:magnify" className="text-lg" /> <strong>Filtro</strong>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Produto</Form.Label>
                <Form.Select>
                  <option>Selecione um produto</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Afiliado</Form.Label>
                <Form.Control placeholder="Email do afiliado" />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Período</Form.Label>
                <Form.Control value="17/02/2025 - 18/05/2025" readOnly />
              </Form.Group>
            </div>
            <div className="col-12 d-flex justify-content-end gap-2 mt-2">
              <Button variant="success">
                <Icon icon="mdi:file-excel" className="me-1" /> Excel
              </Button>
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

      {/* Tabs e Tabela */}
      <div className="card">
        <div className="card-header border-bottom-0">
          <ul className="nav nav-tabs border-bottom gap-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'resultado' ? 'active' : ''}`}
                onClick={() => setActiveTab('resultado')}
              >
                Resultado
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'top10' ? 'active' : ''}`}
                onClick={() => setActiveTab('top10')}
              >
                TOP 10
              </button>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table text-sm mb-0">
              <thead>
                <tr>
                  <th>Afiliado</th>
                  <th>Cliques</th>
                  <th>Total de Vendas</th>
                  <th>Vendas Aprovadas</th>
                  <th>
                    Conversão (%) <Icon icon="mdi:information-outline" className="text-muted ms-1" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-secondary-light">
                      Nenhum registro encontrado
                    </td>
                  </tr>
                ) : (
                  tableData.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.afiliado}</td>
                      <td>{item.cliques}</td>
                      <td>{item.vendas}</td>
                      <td>{item.aprovadas}</td>
                      <td>{item.conversao}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAffiliatesLayer;
