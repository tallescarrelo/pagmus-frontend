import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, Modal, Form, Accordion } from "react-bootstrap";

const FreightLayer = () => {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const regions = [
    {
      name: "Sudeste",
      states: ["Espírito Santo", "Rio de Janeiro", "Minas Gerais", "São Paulo"],
      color: "primary",
    },
    {
      name: "Centro-oeste",
      states: ["Mato Grosso", "Mato Grosso do Sul", "Goiás", "Distrito Federal"],
      color: "teal",
    },
    {
      name: "Sul",
      states: ["Santa Catarina", "Rio Grande do Sul", "Paraná"],
      color: "indigo",
    },
    {
      name: "Norte",
      states: ["Tocantins", "Pará", "Acre", "Rondônia", "Roraima", "Amapá", "Amazonas"],
      color: "warning",
    },
    {
      name: "Nordeste",
      states: [
        "Bahia",
        "Sergipe",
        "Alagoas",
        "Paraíba",
        "Pernambuco",
        "Rio Grande do Norte",
        "Ceará",
        "Piauí",
        "Maranhão",
      ],
      color: "danger",
    },
  ];

  return (
    <div className="card bg-transparent border-0">
      {/* Cabeçalho padrão */}
      <div className="card-header d-flex align-items-center justify-content-between gap-3 mb-4">
        <h5 className="mb-0 d-flex align-items-center gap-2">
          <Icon icon="mdi:truck-outline" /> Minhas configurações de frete
        </h5>
        <Button
          variant="primary"
          className="bg-purple text-white px-4 py-2 radius-8 fw-semibold d-flex align-items-center gap-2"
          onClick={handleOpenModal}
        >
          <Icon icon="mdi:plus" /> Nova Configuração
        </Button>
      </div>

      {/* Conteúdo da tabela */}
      <div className="card-body pt-0 mt-20">
        <div className="table-responsive">
          <table className="table colored-row-table text-sm">
            <thead>
              <tr>
                <th>Descricao</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2} className="text-center py-4 text-secondary-light">
                  Nenhuma configuração de frete cadastrada
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de nova configuração */}
      <Modal show={showModal} onHide={handleCloseModal} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Nova Configuração de Frete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Descrição da configuração</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Insira o nome da configuração de frete"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Valor padrão de frete</Form.Label>
            <Form.Control type="text" placeholder="R$ 0,00" />
          </Form.Group>

          {regions.map((region, idx) => (
            <div className={`border border-${region.color} radius-8 mb-4`} key={idx}>
              <div className={`bg-${region.color} text-white p-2 fw-bold`}>{region.name}</div>
              <div className="table-responsive">
                <table className="table text-sm">
                  <thead>
                    <tr>
                      <th>Estado</th>
                      <th>Tipo de frete</th>
                      <th>Frete Grátis</th>
                      <th>SEDEX</th>
                      <th>Valor PAC</th>
                      <th>Prazo PAC</th>
                      <th>Prazo SEDEX</th>
                      <th>Valor SEDEX</th>
                    </tr>
                  </thead>
                  <tbody>
                    {region.states.map((state, i) => (
                      <tr key={i}>
                        <td>{state}</td>
                        <td>
                          <Form.Select size="sm">
                            <option>Fornecido pelos correios</option>
                          </Form.Select>
                        </td>
                        <td>
                          <Form.Check type="switch" id={`gratis-${region.name}-${i}`} />
                        </td>
                        <td>
                          <Form.Check type="switch" id={`sedex-${region.name}-${i}`} />
                        </td>
                        <td>
                          <Form.Control size="sm" type="text" placeholder="R$ 0,00" />
                        </td>
                        <td>
                          <Form.Control size="sm" type="text" placeholder="Dias" />
                        </td>
                        <td>
                          <Form.Control size="sm" type="text" placeholder="Dias" />
                        </td>
                        <td>
                          <Form.Control size="sm" type="text" placeholder="R$ 0,00" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
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

export default FreightLayer;
