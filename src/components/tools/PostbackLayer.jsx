import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, Modal, Form, Table, Badge } from "react-bootstrap";

const PostbackLayer = () => {
  const [showModal, setShowModal] = useState(false);
  const [postbacks, setPostbacks] = useState([]);
  const [form, setForm] = useState({
    url: "",
    product: "",
    events: [],
    subscriptionEvents: [],
    method: "POST",
    status: true,
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleOpenModal = (index = null) => {
    if (index !== null) {
      setForm(postbacks[index]);
      setEditingIndex(index);
    } else {
      setForm({ url: "", product: "", events: [], subscriptionEvents: [], method: "POST", status: true });
      setEditingIndex(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setForm({ url: "", product: "", events: [], subscriptionEvents: [], method: "POST", status: true });
    setEditingIndex(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: prev[name].includes(value)
          ? prev[name].filter((item) => item !== value)
          : [...prev[name], value],
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      const updated = [...postbacks];
      updated[editingIndex] = form;
      setPostbacks(updated);
    } else {
      setPostbacks([...postbacks, form]);
    }
    handleCloseModal();
  };

  const handleDelete = (index) => {
    const updated = postbacks.filter((_, i) => i !== index);
    setPostbacks(updated);
  };

  const allEvents = [
    "Abandono de Checkout",
    "Alteração de Vencimento de Boleto",
    "Aguardando Pagamento",
    "Pagamento Aprovado",
    "Cancelada",
    "Chargeback",
    "Devolvida",
    "Em Análise",
    "Estorno Pendente",
    "Em Processamento",
    "Parcialmente Pago",
    "Pagamento Atrasado",
    "Agendado",
    "Frustrada",
    "Código de rastreio adicionado",
    "Status de rastreamento alterado",
    "Status de rastreamento entregue",
    "Status de rastreamento saiu para entrega",
    "Status de rastreamento em atraso",
    "Status de rastreamento endereço incorreto",
    "Status de rastreamento aguardando retirada",
  ];

  const subscriptionEvents = [
    "Iniciada",
    "Ativa",
    "Atrasada",
    "Cancelada pelo suporte",
    "Cancelada pelo cliente",
    "Cancelada pelo vendedor",
    "Cancelada pela plataforma",
    "Inativa",
    "Vencida",
    "Aguardando pagamento",
  ];

  return (
    <div className="card bg-transparent border-0">
      <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-3">
        <h5 className="mb-0 d-flex align-items-center gap-2">
          <Icon icon="mdi:repeat-variant" /> Postback
        </h5>
      </div>

      <div className="px-4 border-bottom d-flex align-items-center gap-4">
        <div className="pb-3 border-bottom border-primary-600 text-primary-600 fw-semibold d-flex align-items-center gap-2">
          <Icon icon="mdi:cog-outline" className="text-lg" /> Configurações
        </div>
        <div className="pb-3 text-secondary-light d-flex align-items-center gap-2">
          <Icon icon="mdi:book-outline" className="text-lg" /> Documentação
        </div>
      </div>

      <div className="card-body pt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">Configurações de postback</h5>
          <Button
            variant="primary"
            className="bg-purple text-white px-4 py-2 radius-8 fw-semibold d-flex align-items-center gap-2"
            onClick={() => handleOpenModal()}
          >
            <Icon icon="mdi:plus" /> Nova configuração
          </Button>
        </div>

        <div className="table-responsive">
          <Table className="colored-row-table text-sm">
            <thead>
              <tr>
                <th>Código</th>
                <th>Url de retorno</th>
                <th>Produto</th>
                <th>Eventos</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {postbacks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-secondary-light">
                    Nenhum registro encontrado
                  </td>
                </tr>
              ) : (
                postbacks.map((pb, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{pb.url}</td>
                    <td>{pb.product}</td>
                    <td>{pb.events.join(", ")}</td>
                    <td>
                      <Badge bg={pb.status ? "success" : "secondary"}>
                        {pb.status ? "Ativo" : "Inativo"}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button variant="outline-primary" size="sm" onClick={() => handleOpenModal(index)}>
                          Editar
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(index)}>
                          Deletar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingIndex !== null ? "Editar Configuração" : "Nova Configuração"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">URL de retorno *</Form.Label>
            <Form.Control
              name="url"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              placeholder="http://www.exemplo.com.br/"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Produto</Form.Label>
            <Form.Select
              name="product"
              value={form.product}
              onChange={(e) => setForm({ ...form, product: e.target.value })}
            >
              <option>Todos os produtos</option>
              <option>Produto A</option>
              <option>Produto B</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Eventos</Form.Label>
            <div className="row">
              {allEvents.map((event, idx) => (
                <div className="col-md-6 mb-2" key={idx}>
                  <Form.Check
                    type="checkbox"
                    label={event}
                    value={event}
                    name="events"
                    checked={form.events.includes(event)}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Eventos Assinatura</Form.Label>
            <div className="row">
              {subscriptionEvents.map((event, idx) => (
                <div className="col-md-6 mb-2" key={idx}>
                  <Form.Check
                    type="checkbox"
                    label={event}
                    value={event}
                    name="subscriptionEvents"
                    checked={form.subscriptionEvents.includes(event)}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Método HTTP</Form.Label>
            <Form.Select
              name="method"
              value={form.method}
              onChange={(e) => setForm({ ...form, method: e.target.value })}
            >
              <option value="POST">POST</option>
              <option value="GET">GET</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PostbackLayer;
