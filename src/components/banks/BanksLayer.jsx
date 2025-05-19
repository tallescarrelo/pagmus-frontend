import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Icon } from '@iconify/react';

const BankAccountsLayer = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      tipo: 'Conta Corrente',
      banco: 'Banco do Brasil',
      agencia: '1234',
      conta: '56789-0'
    },
    {
      id: 2,
      tipo: 'Conta Poupança',
      banco: 'Caixa Econômica',
      agencia: '9876',
      conta: '12345-6'
    }
  ]);

  const [form, setForm] = useState({ tipo: '', banco: '', agencia: '', conta: '' });
  const [accountToDelete, setAccountToDelete] = useState(null);

  const handleAddAccount = () => {
    setAccounts([...accounts, { ...form, id: Date.now() }]);
    setShowModal(false);
    setForm({ tipo: '', banco: '', agencia: '', conta: '' });
  };

  const handleDelete = () => {
    setAccounts(accounts.filter((acc) => acc.id !== accountToDelete));
    setShowDeleteConfirm(false);
    setShowDeleted(true);
    setTimeout(() => setShowDeleted(false), 2000);
  };

  return (
    <div className="card bg-transparent border-0">
      <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-3">
        <h5 className="mb-0 d-flex align-items-center gap-2">
          <Icon icon="mdi:bank-outline" /> Contas Bancárias
        </h5>
        <div className="d-flex align-items-center gap-2">
          <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
            <Icon icon="mdi:plus" className="me-1" /> Cadastrar banco
          </Button>
        </div>
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <table className="table colored-row-table text-sm">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Banco</th>
                <th>Agência</th>
                <th>Conta</th>
                <th className="text-end">Ações</th>
              </tr>
            </thead>
            <tbody>
              {accounts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-secondary-light">
                    Nenhuma conta cadastrada.
                  </td>
                </tr>
              ) : (
                accounts.map((acc) => (
                  <tr key={acc.id}>
                    <td>{acc.tipo}</td>
                    <td>{acc.banco}</td>
                    <td>{acc.agencia}</td>
                    <td>{acc.conta}</td>
                    <td className="text-end">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          setAccountToDelete(acc.id);
                          setShowDeleteConfirm(true);
                        }}
                      >
                        Remover
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Cadastrar Banco */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Conta Bancária</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de conta</Form.Label>
              <Form.Select
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              >
                <option value="">Selecione</option>
                <option>Conta Corrente</option>
                <option>Conta Poupança</option>
                <option>Pix</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Banco</Form.Label>
              <Form.Control
                value={form.banco}
                onChange={(e) => setForm({ ...form, banco: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Agência</Form.Label>
              <Form.Control
                value={form.agencia}
                onChange={(e) => setForm({ ...form, agencia: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Conta</Form.Label>
              <Form.Control
                value={form.conta}
                onChange={(e) => setForm({ ...form, conta: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddAccount}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal confirmação de remoção */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar remoção</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja remover essa conta bancária?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal confirmação de exclusão realizada */}
      <Modal
        show={showDeleted}
        onHide={() => setShowDeleted(false)}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body className="text-center py-5">
          <div className="d-flex flex-column align-items-center gap-3">
            <Icon icon="mdi:check-circle-outline" className="text-success" style={{ fontSize: '3rem' }} />
            <p className="mb-0 fw-semibold">Conta removida com sucesso!</p>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  );
};

export default BankAccountsLayer;