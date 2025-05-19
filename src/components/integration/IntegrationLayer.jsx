import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const IntegrationsLayer = () => {
  const integrations = [
    { name: "Bling", logo: "/assets/images/integration/bling.svg", integrated: true },
    { name: "Loggz", logo: "/assets/images/integration/loggz.svg", integrated: true },
    { name: "Correios", logo: "/assets/images/integration/correios.svg", integrated: true },
    { name: "Mailchimp", logo: "/assets/images/integration/mailchimp.png", integrated: true },
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [formData, setFormData] = useState({ name: "", clientId: "", clientSecret: "", user: "", token: "", contract: "" });
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [suggestion, setSuggestion] = useState("");

  const handleOpenModal = (integration) => {
    setSelectedIntegration(integration);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: "", clientId: "", clientSecret: "", user: "", token: "", contract: "" });
  };

  const handleOpenSuggestionModal = () => setShowSuggestionModal(true);
  const handleCloseSuggestionModal = () => setShowSuggestionModal(false);

  return (
    <div className="card bg-transparent border-0">
      {/* Cabeçalho padrão */}
      <div className="card-header d-flex align-items-center justify-content-between gap-3 mb-4">
        <h5 className="mb-0 d-flex align-items-center gap-2">
          <Icon icon="mdi:puzzle-outline" /> Integrações
        </h5>
        <Button variant="primary" size="sm" onClick={handleOpenSuggestionModal}>
          <Icon icon="mdi:plus" className="me-1" /> Sugerir Integração
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-bottom px-24 pt-0">
        <div className="d-flex align-items-center gap-4 overflow-auto pb-2">
          <div className="d-flex align-items-center gap-2 pb-8 pe-24 cursor-pointer border-bottom border-primary-600 text-primary-600 fw-semibold">
            <Icon icon="mdi:check-circle-outline" className="text-lg" /> Disponíveis
          </div>
          <div className="d-flex align-items-center gap-2 pb-8 pe-24 cursor-pointer text-secondary-light">
            <Icon icon="mdi:power" className="text-lg" /> Ativas
          </div>
        </div>
      </div>

      {/* Lista de integrações */}
      <div className="card-body">
        <h6 className="fw-semibold mb-3">Plataformas disponíveis</h6>
        <div className="row g-3">
          {integrations.map((integration, idx) => (
            <div className="col-md-3" key={idx}>
              <div
                className="border radius-12 d-flex justify-content-center align-items-center p-4 h-100 bg-white cursor-pointer"
                onClick={() => handleOpenModal(integration)}
              >
                <img
                  src={integration.logo}
                  alt={integration.name}
                  style={{ maxHeight: "176px", maxWidth: "70%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de configuração */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedIntegration?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedIntegration?.name === "Correios" ? (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Finalidade</Form.Label>
                <Form.Control type="text" value="RASTREAMENTO DE VENDAS AFTER PAY" disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nome de usuário</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nome de usuário no sistema dos correios"
                  value={formData.user}
                  onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Chave de acesso</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Token de validação. Exemplo: a1b2c3..."
                  value={formData.token}
                  onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Número do contrato</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Número de contrato. Ex: 9912345678"
                  value={formData.contract}
                  onChange={(e) => setFormData({ ...formData, contract: e.target.value })}
                />
              </Form.Group>
            </>
          ) : (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Nome da conta</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insira aqui o nome ou apelido da conta"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Identificador (client_id)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insira aqui o identificador (client_id)"
                  value={formData.clientId}
                  onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Chave Secreta (client_secret)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insira aqui a chave (client_secret)"
                  value={formData.clientSecret}
                  onChange={(e) => setFormData({ ...formData, clientSecret: e.target.value })}
                />
              </Form.Group>
              <p className="text-muted small mt-3">
                Após salvar e autorizar sua conta acesse o botão de editar e configure as formas de pagamento utilizadas no Bling.
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="primary" onClick={handleCloseModal}>Salvar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de sugestão de integração */}
      <Modal show={showSuggestionModal} onHide={handleCloseSuggestionModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sugerir Integração</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Observação</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Descreva qual integração você gostaria de sugerir..."
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuggestionModal}>Cancelar</Button>
          <Button variant="primary" onClick={handleCloseSuggestionModal}>Enviar Sugestão</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IntegrationsLayer;
