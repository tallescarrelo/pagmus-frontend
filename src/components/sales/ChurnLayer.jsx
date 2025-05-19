import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { Button, Form } from 'react-bootstrap';

const ChurnLayer = () => {
  return (
    <div className="card bg-transparent border-0">
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
                  <option>Selecione...</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Plano</Form.Label>
                <Form.Select disabled>
                  <option>Selecione...</option>
                </Form.Select>
                <small className="text-danger">* Selecione um produto para filtrar por plano</small>
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Período</Form.Label>
                <Form.Control value="19/04/2025 - 18/05/2025" readOnly />
              </Form.Group>
            </div>
            <div className="col-12 d-flex justify-content-end gap-2 mt-2">
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

      {/* Indicadores */}
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-header bg-primary text-white d-flex align-items-center justify-content-between">
              Cancelamentos
              <Icon icon="mdi:information-outline" />
            </div>
            <div className="card-body text-center">
              <h4 className="text-primary fw-bold">0</h4>
              <p className="text-primary">--% em relação ao período anterior</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-header bg-purple text-white d-flex align-items-center justify-content-between">
              Voluntários
              <Icon icon="mdi:information-outline" />
            </div>
            <div className="card-body text-center">
              <h4 className="text-purple fw-bold">0</h4>
              <p className="text-purple">R$ 0,00 por churn</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-header bg-danger text-white d-flex align-items-center justify-content-between">
              Involuntários
              <Icon icon="mdi:information-outline" />
            </div>
            <div className="card-body text-center">
              <h4 className="text-danger fw-bold">0</h4>
              <p className="text-danger">R$ 0,00 por churn</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChurnLayer;
