import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, Modal, Form, Table, Badge } from "react-bootstrap";

const TeamLayer = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    status: true,
    profile: "Funcionario",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleOpenModal = (index = null) => {
    if (index !== null) {
      setForm(users[index]);
      setEditingIndex(index);
    } else {
      setForm({ name: "", email: "", phone: "", password: "", status: true, profile: "Funcionario" });
      setEditingIndex(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setForm({ name: "", email: "", phone: "", password: "", status: true, profile: "Funcionario" });
    setEditingIndex(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      const updated = [...users];
      updated[editingIndex] = form;
      setUsers(updated);
    } else {
      setUsers([...users, form]);
    }
    handleCloseModal();
  };

  const handleDelete = (index) => {
    const updated = users.filter((_, i) => i !== index);
    setUsers(updated);
  };

  const handleGeneratePassword = () => {
    const generated = Math.random().toString(36).slice(-10);
    setForm((prev) => ({ ...prev, password: generated }));
  };

  return (
    <div className="card bg-transparent border-0">
      {/* Cabeçalho */}
      <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-3">
        <h5 className="mb-0 d-flex align-items-center gap-2">
          <Icon icon="mdi:account-multiple-outline" /> Gerenciar usuários
        </h5>
      </div>

      {/* Área de filtros */}
      <div className="card-body pt-0 mt-3">
        <div className="border rounded-4 p-4 mb-4">
          <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2">
            <Icon icon="mdi:filter-outline" /> Filtros
          </h6>
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <Form.Control type="text" placeholder="Nome" />
            </div>
            <div className="col-md-4">
              <Form.Control type="email" placeholder="Email" />
            </div>
            <div className="col-md-4">
              <Form.Select>
                <option>Todos os status</option>
                <option>Ativo</option>
                <option>Inativo</option>
              </Form.Select>
            </div>
          </div>
          <Button variant="primary">
            <Icon icon="mdi:magnify" className="me-1" /> Buscar
          </Button>
        </div>

        {/* Lista de usuários */}
        <div className="border rounded-4 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h6 className="fw-semibold d-flex align-items-center gap-2 mb-0">
              <Icon icon="mdi:account-group-outline" /> Todos os usuários
            </h6>
            <Button
              variant="primary"
              className="bg-purple text-white px-4 py-2 radius-8 fw-semibold d-flex align-items-center gap-2"
              onClick={() => handleOpenModal()}
            >
              <Icon icon="mdi:plus" /> Novo usuário
            </Button>
          </div>

          <div className="table-responsive">
            <Table className="colored-row-table text-sm">
              <thead>
                <tr>
                  <th>Nome/Email</th>
                  <th>Perfil</th>
                  <th>Status</th>
                  <th>Últ. Atividade</th>
                  <th>Últ. Atual. Senha</th>
                  <th>Dois Fatores</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-secondary-light">
                      Clique no botão <strong><Icon icon="mdi:magnify" /> Buscar</strong> para exibir informações.
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.name}<br /><small>{user.email}</small></td>
                      <td>{user.profile}</td>
                      <td>
                        <Badge bg={user.status ? "success" : "secondary"}>
                          {user.status ? "Ativo" : "Inativo"}
                        </Badge>
                      </td>
                      <td>—</td>
                      <td>—</td>
                      <td>—</td>
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
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingIndex !== null ? "Editar usuário" : "Criar Usuário"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column gap-3">
            <Form.Group>
              <Form.Label>Nome:</Form.Label>
              <Form.Control
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nome do usuário"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>E-mail:</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@dominio.com"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Telefone:</Form.Label>
              <Form.Control
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Senha:</Form.Label>
              <div className="d-flex">
                <Form.Control
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Senha inicial do usuário"
                />
                <Button variant="success" onClick={handleGeneratePassword} className="ms-2">
                  Gerar senha
                </Button>
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Status:</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  name="status"
                  id="status-ativo"
                  label="Ativo"
                  checked={form.status === true}
                  onChange={() => setForm((prev) => ({ ...prev, status: true }))}
                />
                <Form.Check
                  inline
                  type="radio"
                  name="status"
                  id="status-inativo"
                  label="Desativado"
                  checked={form.status === false}
                  onChange={() => setForm((prev) => ({ ...prev, status: false }))}
                />
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Perfil de usuário:</Form.Label>
              <Form.Select
                name="profile"
                value={form.profile}
                onChange={handleChange}
              >
                <option>Funcionario</option>
                <option>Admin</option>
                <option>Gerente</option>
              </Form.Select>
            </Form.Group>
          </div>
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

export default TeamLayer;
