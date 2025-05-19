import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import SalesServices from '../services/api/sales';
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

  const renderModalContent = () => {
    if (!selectedSale) return null;

    if (selectedAction === 'print-invoice') {
      return (
        <div className="card">
          <div className="card-body py-40">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="shadow-4 border radius-8">
                  <div className="p-20 d-flex flex-wrap justify-content-between gap-3 border-bottom">
                    <div>
                      <h3 className="text-xl">Venda #{selectedSale.id}</h3>
                      <p className="mb-1 text-sm">Data do pedido: {selectedSale.created_at}</p>
                      <p className="mb-0 text-sm">Data do pagamento: {selectedSale.payment_date}</p>
                    </div>
                    <div>
                      <img src="/assets/images/logo.png" alt="logo" className="mb-8" />
                      <p className="mb-1 text-sm">Endereço do cliente: {selectedSale.customer?.address}</p>
                      <p className="mb-0 text-sm">{selectedSale.customer?.email}</p>
                    </div>
                  </div>
                  <div className="py-28 px-20">
                    <div className="d-flex flex-wrap justify-content-between align-items-end gap-3">
                      <div>
                        <h6 className="text-md">Comprador:</h6>
                        <table className="text-sm text-secondary-light">
                          <tbody>
                            <tr>
                              <td>Nome</td>
                              <td className="ps-8">: {selectedSale.customer?.name}</td>
                            </tr>
                            <tr>
                              <td>Email</td>
                              <td className="ps-8">: {selectedSale.customer?.email}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <table className="text-sm text-secondary-light">
                          <tbody>
                            <tr>
                              <td>Forma de pagamento</td>
                              <td className="ps-8">: {selectedSale.payment_type}</td>
                            </tr>
                            <tr>
                              <td>Status</td>
                              <td className="ps-8">: {selectedSale.status}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="mt-24">
                      <div className="table-responsive scroll-sm">
                        <table className="table bordered-table text-sm">
                          <thead>
                            <tr>
                              <th>Produto</th>
                              <th>Quantidade</th>
                              <th>Valor</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{selectedSale.product?.name}</td>
                              <td>1</td>
                              <td>R$ {selectedSale.product?.price}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="text-end mt-4">
                        <p><strong>Total:</strong> R$ {selectedSale.product?.price}</p>
                      </div>
                    </div>
                    <div className="mt-64">
                      <p className="text-center text-secondary-light text-sm fw-semibold">
                        Obrigado pela sua compra!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Outras ações
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
      case 'view-details':
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
      {/* ...restante da UI, cards, tabela etc... */}

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Ação: {selectedAction}</Modal.Title>
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
