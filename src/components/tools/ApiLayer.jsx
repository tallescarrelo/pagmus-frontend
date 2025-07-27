import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const ApiLayer = () => {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="card bg-transparent border-0">
      {/* Cabeçalho */}
      <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-3">
        <h5 className="mb-0 d-flex align-items-center gap-2">
          <Icon icon="mdi:cog-outline" /> API
        </h5>
      </div>

      {/* Tabs */}
      <div className="card-body pt-0 mt-3">
        <ul className="nav nav-tabs mb-4 border-bottom">
          {[
            "Tokens",
            "Vendas",
            "Abandonos",
            "Boletos",
            "Transporte",
            "Produtos",
            "Salva Vendas",
            "Assinaturas",
          ].map((tab, index) => (
            <li className="nav-item" key={index}>
              <button 
                type="button"
                className={`nav-link border-0 bg-transparent ${index === 0 ? "active" : "text-muted"}`}
              >
                <Icon icon="mdi:table" className="me-1" /> {tab}
              </button>
            </li>
          ))}
        </ul>

        {/* Tabela + Botão */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">Tokens ativos</h5>
          <Button variant="primary" className="bg-purple text-white px-4 py-2 radius-8 fw-semibold d-flex align-items-center gap-2" onClick={handleOpenModal}>
            <Icon icon="mdi:plus" /> Novo token
          </Button>
        </div>

        <div className="table-responsive">
          <table className="table colored-row-table text-sm">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2} className="text-center py-4 text-secondary-light">
                  Nenhum registro encontrado
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Novo token</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o uso do token"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ApiLayer;
