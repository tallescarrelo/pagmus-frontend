import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useAffiliate } from '../../contexts/AffiliateContext';

const AffiliateLinksManager = () => {
  const { links, affiliates, generateAffiliateLink, loading } = useAffiliate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAffiliate, setSelectedAffiliate] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [showQRCode, setShowQRCode] = useState(null);

  // Simular produtos disponíveis
  const products = [
    { id: 1, name: 'Curso de Marketing Digital', price: 297.00 },
    { id: 2, name: 'E-book: Guia Completo', price: 47.00 },
    { id: 3, name: 'Mentoria Individual', price: 997.00 }
  ];

  const handleGenerateLink = async () => {
    if (!selectedAffiliate || !selectedProduct) {
      alert('Selecione um afiliado e um produto');
      return;
    }

    try {
      await generateAffiliateLink(selectedAffiliate, selectedProduct);
      setShowCreateModal(false);
      setSelectedAffiliate('');
      setSelectedProduct('');
      alert('Link gerado com sucesso!');
    } catch (error) {
      alert('Erro ao gerar link: ' + error.message);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Link copiado para a área de transferência!');
  };

  const generateQRCode = (url) => {
    // Em produção, usar uma biblioteca de QR Code
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const getAffiliateName = (affiliateId) => {
    const affiliate = affiliates.find(a => a.id === affiliateId);
    return affiliate ? affiliate.name : 'N/A';
  };

  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'N/A';
  };

  const getProductPrice = (productId) => {
    const product = products.find(p => p.id === productId);
    return product ? product.price : 0;
  };

  return (
    <div className="affiliate-links-manager">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-md-8">
          <h2 className="mb-2">
            <Icon icon="mdi:link-variant" className="me-2" />
            Gerenciar Links de Afiliado
          </h2>
          <p className="text-muted mb-0">
            Crie e gerencie links de afiliado para seus produtos
          </p>
        </div>
        <div className="col-md-4 text-end">
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            <Icon icon="mdi:link-plus" className="me-2" />
            Novo Link
          </button>
        </div>
      </div>

      {/* Lista de Links */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">
            <Icon icon="mdi:link" className="me-2" />
            Links Ativos
          </h5>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
              <p className="mt-3">Carregando links...</p>
            </div>
          ) : links.length === 0 ? (
            <div className="text-center py-5">
              <Icon icon="mdi:link-off" className="text-muted" style={{ fontSize: '4rem' }} />
              <h5 className="mt-3">Nenhum link criado</h5>
              <p className="text-muted">Crie seu primeiro link de afiliado para começar</p>
              <button
                className="btn btn-primary"
                onClick={() => setShowCreateModal(true)}
              >
                <Icon icon="mdi:link-plus" className="me-2" />
                Criar Primeiro Link
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Afiliado</th>
                    <th>Produto</th>
                    <th>Link</th>
                    <th>Cliques</th>
                    <th>Conversões</th>
                    <th>Taxa</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link) => (
                    <tr key={link.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-sm me-3">
                            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style={{ width: '35px', height: '35px', fontSize: '12px' }}>
                              {getAffiliateName(link.affiliate_id).charAt(0)}
                            </div>
                          </div>
                          <div>
                            <h6 className="mb-0" style={{ fontSize: '0.9rem' }}>
                              {getAffiliateName(link.affiliate_id)}
                            </h6>
                            <small className="text-muted">
                              {formatCurrency(getProductPrice(link.product_id))}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <strong style={{ fontSize: '0.9rem' }}>
                            {getProductName(link.product_id)}
                          </strong>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="input-group input-group-sm">
                            <input
                              type="text"
                              className="form-control"
                              value={link.short_url}
                              readOnly
                              style={{ fontSize: '0.8rem' }}
                            />
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => copyToClipboard(link.url)}
                              title="Copiar link"
                            >
                              <Icon icon="mdi:content-copy" />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-center">
                          <strong>{formatNumber(link.clicks)}</strong>
                        </div>
                      </td>
                      <td>
                        <div className="text-center">
                          <strong className="text-success">{link.conversions}</strong>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="progress me-2" style={{ width: '50px', height: '4px' }}>
                            <div 
                              className="progress-bar bg-success" 
                              style={{ width: `${link.conversion_rate}%` }}
                            ></div>
                          </div>
                          <small>{link.conversion_rate.toFixed(1)}%</small>
                        </div>
                      </td>
                      <td>
                        <span className={`badge bg-${link.is_active ? 'success' : 'secondary'}`}>
                          {link.is_active ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => setShowQRCode(link.id)}
                            title="QR Code"
                          >
                            <Icon icon="mdi:qrcode" />
                          </button>
                          <button
                            className="btn btn-outline-info"
                            onClick={() => copyToClipboard(link.url)}
                            title="Copiar"
                          >
                            <Icon icon="mdi:content-copy" />
                          </button>
                          <button
                            className="btn btn-outline-warning"
                            title="Editar"
                          >
                            <Icon icon="mdi:pencil" />
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            title="Desativar"
                          >
                            <Icon icon="mdi:link-off" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Criação de Link */}
      {showCreateModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <Icon icon="mdi:link-plus" className="me-2" />
                  Criar Novo Link
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCreateModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Selecionar Afiliado *</label>
                      <select
                        className="form-select"
                        value={selectedAffiliate}
                        onChange={(e) => setSelectedAffiliate(e.target.value)}
                      >
                        <option value="">Escolha um afiliado</option>
                        {affiliates.map((affiliate) => (
                          <option key={affiliate.id} value={affiliate.id}>
                            {affiliate.name} ({affiliate.email})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Selecionar Produto *</label>
                      <select
                        className="form-select"
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                      >
                        <option value="">Escolha um produto</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name} - {formatCurrency(product.price)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {selectedAffiliate && selectedProduct && (
                  <div className="alert alert-info">
                    <h6 className="alert-heading">Preview do Link</h6>
                    <p className="mb-2">
                      <strong>Afiliado:</strong> {getAffiliateName(selectedAffiliate)}
                    </p>
                    <p className="mb-2">
                      <strong>Produto:</strong> {getProductName(selectedProduct)}
                    </p>
                    <p className="mb-0">
                      <strong>Link:</strong> pagmus.com/ref/{getAffiliateName(selectedAffiliate).toLowerCase().replace(' ', '')}{selectedProduct}
                    </p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleGenerateLink}
                  disabled={!selectedAffiliate || !selectedProduct}
                >
                  <Icon icon="mdi:link-plus" className="me-2" />
                  Gerar Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal QR Code */}
      {showQRCode && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <Icon icon="mdi:qrcode" className="me-2" />
                  QR Code do Link
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowQRCode(null)}
                ></button>
              </div>
              <div className="modal-body text-center">
                {(() => {
                  const link = links.find(l => l.id === showQRCode);
                  if (!link) return null;
                  
                  return (
                    <div>
                      <img
                        src={generateQRCode(link.url)}
                        alt="QR Code"
                        className="img-fluid mb-3"
                        style={{ maxWidth: '200px' }}
                      />
                      <p className="mb-2">
                        <strong>Link:</strong> {link.short_url}
                      </p>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => copyToClipboard(link.url)}
                      >
                        <Icon icon="mdi:content-copy" className="me-2" />
                        Copiar Link
                      </button>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AffiliateLinksManager; 