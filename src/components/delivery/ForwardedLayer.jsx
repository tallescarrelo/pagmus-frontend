import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import SalesServices from '../../services/api/sales';
import { Modal, Button } from 'react-bootstrap';

const ForwardedLayer = () => {
  const [salesData, setSalesData] = useState([]);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedSale, setSelectedSale] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await SalesServices.getMySales();
        const pendingSales = response.filter((sale) => sale.status === 'Pendente');
        setSalesData(pendingSales);
      } catch (error) {
        console.error('Erro ao buscar vendas:', error);
      }
    };

    fetchSales();
  }, []);

  const handleExportExcel = () => {
    const dataToExport = salesData.map((sale) => ({
      ID: sale.id,
      'Número do pedido': sale.order_number,
      Cliente: sale.customer?.name,
      'Data da venda': sale.created_at,
      'Tipo de entrega': sale.delivery_type
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pendentes');
    XLSX.writeFile(workbook, 'entregas_pendentes.xlsx');
  };

  const handleActionChange = (sale, action) => {
    setSelectedSale(sale);
    setSelectedAction(action);
    setShowModal(true);
  };

  const renderModalContent = () => {
    if (!selectedSale) return null;
    if (selectedAction === 'shipped') {
      return (
        <>
          <p>Deseja marcar o pedido #{selectedSale.order_number} como <strong>enviado</strong>?</p>
          <Button variant="success">Confirmar envio</Button>
        </>
      );
    }
    return null;
  };

  return (
    <div className="card bg-transparent border-0">
      <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-3">
        <h5 className="mb-0 d-flex align-items-center gap-2">
          <Icon icon="mdi:truck-outline" /> Entregas Encaminhadas
        </h5>
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-success btn-sm d-flex align-items-center gap-2"
            onClick={handleExportExcel}
          >
            <Icon icon="mdi:download" /> Excel
          </button>
          <button className="btn btn-primary btn-sm d-flex align-items-center gap-2">
            <Icon icon="mdi:filter-variant" /> Realizar filtro
          </button>
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table colored-row-table mb-0 text-sm align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Número do pedido</th>
                <th>Nome do cliente</th>
                <th>Data da venda</th>
                <th>Tipo de entrega</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {salesData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-secondary-light">
                    Nenhuma entrega pendente encontrada.
                  </td>
                </tr>
              ) : (
                salesData.map((sale, index) => (
                  <tr key={index}>
                    <td>{sale.id}</td>
                    <td>
                      <Link to={`/pedido/${sale.order_number}`} className="text-primary-600">
                        #{sale.order_number}
                      </Link>
                    </td>
                    <td>{sale.customer?.name}</td>
                    <td>{sale.created_at}</td>
                    <td>{sale.delivery_type}</td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        onChange={(e) => handleActionChange(sale, e.target.value)}
                      >
                        <option value="">Ações</option>
                        <option value="shipped">Marcar como enviado</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedAction}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderModalContent()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ForwardedLayer;
