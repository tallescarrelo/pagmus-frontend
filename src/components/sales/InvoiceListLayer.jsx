import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import SalesServices from '../../services/api/sales';
import { Modal, Button } from 'react-bootstrap';


const InvoiceListLayer = () => {
  const [salesData, setSalesData] = useState([]);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedSale, setSelectedSale] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await SalesServices.getMySales();
        setSalesData(response);
      } catch (error) {
        console.error('Erro ao buscar vendas:', error);
      }
    };

    fetchSales();
  }, []);

  const handleExportExcel = () => {
    const dataToExport = salesData.map((sale) => ({
      Venda: sale.id,
      Produto: sale.product?.name,
      Comprador: sale.customer?.name,
      Forma: sale.payment_type,
      'Data do pedido': sale.created_at,
      'Data do pagamento': sale.payment_date,
      Afiliado: sale.affiliate?.name,
      Status: sale.status,
      Comissão: sale.commission,
      Valor: sale.product?.price
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vendas');
    XLSX.writeFile(workbook, 'vendas.xlsx');
  };

  const handleActionChange = (sale, action) => {
    setSelectedSale(sale);
    setSelectedAction(action);
    setShowModal(true);
  };

  const totalVendas = salesData.reduce((total, sale) => {
    const price = parseFloat(sale.product?.price || 0);
      return total + price;
    }, 0);

    const ticketMedio = salesData.length > 0 ? totalVendas / salesData.length : 0;

  const renderModalContent = () => {
    if (!selectedSale) return null;
    switch (selectedAction) {
      case 'label':
        return (
          <>
            <p><strong>Endereço para envio:</strong></p>
            <p>{selectedSale.customer?.name}</p>
            <p>{selectedSale.customer?.address}</p>
            <Button variant="primary">Gerar etiqueta PDF</Button>
          </>
        );
      case 'shipped':
        return <p>Deseja marcar o produto como enviado?</p>;
      case 'refund':
        return <p>Deseja solicitar reembolso para esta venda?</p>;
      case 'resend-email':
        return <p>Deseja reenviar o e-mail de confirmação ao comprador?</p>;
      case 'track':
        return <p>Informações de rastreamento não disponíveis.</p>;
      case 'print-invoice':
        return <p>Gerar recibo em PDF para impressão.</p>;
      case 'Detalhes':
        return (
            <div className="p-3">
            <h5 className="mb-3">Detalhes da Venda #{selectedSale.id}</h5>
            <div className="row">
                <div className="col-md-6">
                <p><strong>Produto:</strong> {selectedSale.product?.name}</p>
                <p><strong>Valor:</strong> R$ {selectedSale.product?.price}</p>
                <p><strong>Comissão:</strong> R$ {selectedSale.commission}</p>
                <p><strong>Forma de pagamento:</strong> {selectedSale.payment_type}</p>
                </div>
                <div className="col-md-6">
                <p><strong>Comprador:</strong> {selectedSale.customer?.name}</p>
                <p><strong>Email:</strong> {selectedSale.customer?.email}</p>
                <p><strong>Endereço:</strong> {selectedSale.customer?.address}</p>
                <p><strong>Status:</strong> {selectedSale.status}</p>
                </div>
            </div>
            <div className="mt-3">
                <p><strong>Data do pedido:</strong> {selectedSale.created_at}</p>
                <p><strong>Data do pagamento:</strong> {selectedSale.payment_date}</p>
                <p><strong>Afiliado:</strong> {selectedSale.affiliate?.name}</p>
            </div>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="card bg-transparent border-0">
      <div className="row g-3 mb-40">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
                <h6 className="text-md text-secondary mb-2">Total das vendas</h6>
                <h3 className="text-primary-600 fw-bold mb-3">
                    R$ {totalVendas.toFixed(2)}
                </h3>
                <div className="d-flex justify-content-between text-sm text-secondary-light">
                    <span>
                    Quantidade de vendas: <strong>{salesData.length}</strong>
                    </span>
                    <span>
                    Tícket médio vendas:{" "}
                    <strong className="text-warning-main">
                        R$ {ticketMedio.toFixed(2)}
                    </strong>
                    </span>
                </div>
            </div>

          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="text-md text-secondary mb-2">Total das comissões</h6>
              <h3 className="text-info-main fw-bold mb-3">R$ 0,00</h3>
              <div className="text-sm text-secondary-light">
                Tícket médio comissões: <strong className="text-info-main">R$ 0,00</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de vendas */}
      <div className="card overflow-auto">
        <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-3">
          <h5 className="mb-0 d-flex align-items-center gap-2">
            <Icon icon="mdi:file-document-outline" /> Vendas
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
                  <th>Venda</th>
                  <th>Produto</th>
                  <th>Comprador</th>
                  <th>Forma</th>
                  <th>Data do pedido</th>
                  <th>Data do pagamento</th>
                  <th>Afiliado</th>
                  <th>Status</th>
                  <th>Comissão</th>
                  <th>Valor</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {salesData.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="text-center py-4 text-secondary-light">
                      Nenhuma venda encontrada.
                    </td>
                  </tr>
                ) : (
                  salesData.map((sale, index) => (
                    <tr key={index}>
                      <td>{sale.id}</td>
                      <td>{sale.product?.name}</td>
                      <td>{sale.customer?.name}</td>
                      <td>{sale.payment_type}</td>
                      <td>{sale.created_at}</td>
                      <td>{sale.payment_date}</td>
                      <td>{sale.affiliate?.name}</td>
                      <td>
                        <span className={`badge ${sale.status === 'Pago' ? 'bg-success' : sale.status === 'Reembolsado' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                          {sale.status}
                        </span>
                      </td>
                      <td>{sale.commission}</td>
                      <td>{sale.product?.price}</td>
                      <td>
                        <select className="form-select form-select-sm" onChange={(e) => handleActionChange(sale, e.target.value)}>
                          <option value="">Ações</option>
                          <option value="shipped">Produto enviado</option>
                          <option value="label">Gerar etiqueta</option>
                          <option value="refund">Solicitar reembolso</option>
                          <option value="resend-email">Reenviar e-mail</option>
                          <option value="track">Rastrear entrega</option>
                          <option value="print-invoice">Imprimir recibo</option>
                          <option value="Detalhes">Ver detalhes</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
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

export default InvoiceListLayer;
