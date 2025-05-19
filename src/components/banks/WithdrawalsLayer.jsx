import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Icon } from '@iconify/react';

const WithdrawalsLayer = () => {
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
          <Icon icon="mdi:bank-outline" /> Meus saques
        </h5>
      </div>

      <div className="card-body">
        <div className="row g-3 mb-40">
          <div className="col-md-4">
            <div className="card h-100 bg-success">
              <div className="card-body text-white">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Saldo disponível</span>
                  <Button variant="light" size="sm">
                    <Icon icon="mdi:cash" className="me-1" /> Sacar valor
                  </Button>
                </div>
                <h3 className="fw-bold">R$ 0,00</h3>
                <p className="text-sm">Valor mínimo pra solicitar saque: R$ 99,99</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 bg-info">
              <div className="card-body text-white">
                <span>Saque em análise</span>
                <h3 className="fw-bold mt-3">R$ 0,00</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 bg-primary">
              <div className="card-body text-white">
                <span>Total já sacado</span>
                <h3 className="fw-bold mt-3">R$ 0,00</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-3">
            <h5 className="mb-0 d-flex align-items-center gap-2">
              <Icon icon="mdi:credit-card-outline" /> Meus saques
            </h5>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table colored-row-table text-sm">
                <thead>
                  <tr>
                    <th>Solicitação</th>
                    <th>Conta</th>
                    <th>Data da solicitação</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Observação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-secondary-light">
                      Nenhum registro encontrado
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

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

export default WithdrawalsLayer;
