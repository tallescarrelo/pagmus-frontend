import React, { useState, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { ProductValidator, ValidationUtils } from '../../utils/validation';
import EnhancedFileUpload from './EnhancedFileUpload';

const ProductPlansManager = ({ 
  productId,
  plans = [],
  onPlansUpdate,
  className = ""
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    max_installments: '',
    max_installments_no_interest: '',
    featured: false,
    available_for_sale: true,
    files: [],
    terms_conditions: '',
    affiliate_commission: {
      type: 'percentage',
      value: ''
    },
    // Configuração da Loja
    payment_discount_enabled: false,
    billing_type: 'single',
    boleto_installments_enabled: false,
    boleto_notification_enabled: true,
    custom_commission_enabled: false,
    hide_from_affiliates: false,
    watermark_enabled: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('store'); // store, payment, affiliation, files, terms

  // Validação em tempo real
  const validateField = useCallback(
    ValidationUtils.debounce((fieldName, value) => {
      const fieldValidation = ProductValidator.validateForm({ [fieldName]: value });
      if (!fieldValidation.isValid) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: fieldValidation.errors[fieldName]
        }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[fieldName];
          return newErrors;
        });
      }
    }, 300),
    []
  );

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, value);
  };

  const handleAffiliateCommissionChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      affiliate_commission: { ...prev.affiliate_commission, [field]: value }
    }));
  };

  const handleFileUpload = (uploadedFile) => {
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, uploadedFile]
    }));
  };

  const handleFileRemove = (fileId) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter(f => f.id !== fileId)
    }));
  };

  const validatePlan = () => {
    const planErrors = {};
    
    if (!formData.name) planErrors.name = 'Nome do plano é obrigatório';
    if (!formData.price) planErrors.price = 'Preço é obrigatório';
    if (formData.price && parseFloat(formData.price) <= 0) {
      planErrors.price = 'Preço deve ser maior que zero';
    }
    
    setErrors(planErrors);
    return Object.keys(planErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      original_price: '',
      max_installments: '',
      max_installments_no_interest: '',
      featured: false,
      available_for_sale: true,
      files: [],
      terms_conditions: '',
      affiliate_commission: {
        type: 'percentage',
        value: ''
      },
      payment_discount_enabled: false,
      billing_type: 'single',
      boleto_installments_enabled: false,
      boleto_notification_enabled: true,
      custom_commission_enabled: false,
      hide_from_affiliates: false,
      watermark_enabled: false
    });
    setErrors({});
    setTouched({});
    setActiveTab('store');
  };

  const handleCreatePlan = () => {
    setEditingPlan(null);
    resetForm();
    setShowCreateModal(true);
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name || '',
      description: plan.description || '',
      price: plan.price ? plan.price.toString() : '',
      original_price: plan.original_price ? plan.original_price.toString() : '',
      max_installments: plan.max_installments ? plan.max_installments.toString() : '',
      max_installments_no_interest: plan.max_installments_no_interest ? plan.max_installments_no_interest.toString() : '',
      featured: plan.featured || false,
      available_for_sale: plan.available_for_sale !== false,
      files: plan.files || [],
      terms_conditions: plan.terms_conditions || '',
      affiliate_commission: {
        type: 'percentage',
        value: plan.commission_rate ? plan.commission_rate.toString() : ''
      },
      payment_discount_enabled: plan.payment_discount_enabled || false,
      billing_type: plan.billing_type || 'single',
      boleto_installments_enabled: plan.boleto_installments_enabled || false,
      boleto_notification_enabled: plan.boleto_notification_enabled !== false,
      custom_commission_enabled: plan.custom_commission_enabled || false,
      hide_from_affiliates: plan.hide_from_affiliates || false,
      watermark_enabled: plan.watermark_enabled || false
    });
    setErrors({});
    setTouched({});
    setActiveTab('store');
    setShowCreateModal(true);
  };

  const handleDeletePlan = (planId) => {
    if (window.confirm('Tem certeza que deseja excluir este plano?')) {
      const updatedPlans = plans.filter(plan => plan.id !== planId);
      onPlansUpdate(updatedPlans);
    }
  };

  const handleSubmit = async () => {
    if (!validatePlan()) return;
    
    setIsSubmitting(true);
    
    try {
      const planData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        commission_rate: formData.affiliate_commission.value ? parseFloat(formData.affiliate_commission.value) : 0,
        featured: formData.featured,
        available_for_sale: formData.available_for_sale,
        max_installments: formData.max_installments ? parseInt(formData.max_installments) : 12,
        max_installments_no_interest: formData.max_installments_no_interest ? parseInt(formData.max_installments_no_interest) : 1,
        payment_discount_enabled: formData.payment_discount_enabled,
        billing_type: formData.billing_type,
        boleto_installments_enabled: formData.boleto_installments_enabled,
        boleto_notification_enabled: formData.boleto_notification_enabled,
        custom_commission_enabled: formData.custom_commission_enabled,
        hide_from_affiliates: formData.hide_from_affiliates,
        terms_conditions: formData.terms_conditions,
        watermark_enabled: formData.watermark_enabled
      };

      let updatedPlans;
      
      if (editingPlan) {
        // Atualizar plano existente
        updatedPlans = plans.map(plan => 
          plan.id === editingPlan.id ? { ...plan, ...planData } : plan
        );
      } else {
        // Criar novo plano
        const newPlan = {
          id: Date.now(), // ID temporário
          ...planData,
          product_id: productId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        updatedPlans = [...plans, newPlan];
      }
      
      await onPlansUpdate(updatedPlans);
      setShowCreateModal(false);
      resetForm();
      
    } catch (error) {
      console.error('Erro ao salvar plano:', error);
      alert('Erro ao salvar plano. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName) => {
    return errors[fieldName] && touched[fieldName] ? errors[fieldName] : '';
  };

  const isFieldValid = (fieldName) => {
    return touched[fieldName] && !errors[fieldName];
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleCurrencyInput = (value) => {
    // Remover caracteres não numéricos exceto vírgula e ponto
    const cleanValue = value.replace(/[^\d,.]/g, '');
    // Converter vírgula para ponto
    const normalizedValue = cleanValue.replace(',', '.');
    return normalizedValue;
  };

  const renderPlanCard = (plan) => (
    <div key={plan.id} className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h6 className="card-title mb-0">{plan.name}</h6>
          <div className="btn-group btn-group-sm">
            <button
              className="btn btn-outline-primary"
              onClick={() => handleEditPlan(plan)}
              title="Editar"
            >
              <Icon icon="mdi:pencil" />
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => handleDeletePlan(plan.id)}
              title="Excluir"
            >
              <Icon icon="mdi:delete" />
            </button>
          </div>
        </div>
        <div className="card-body">
          <p className="card-text text-muted">{plan.description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <strong className="text-success">{formatCurrency(plan.price)}</strong>
              {plan.original_price && plan.original_price > plan.price && (
                <small className="text-muted text-decoration-line-through ms-2">
                  {formatCurrency(plan.original_price)}
                </small>
              )}
            </div>
            <span className={`badge ${plan.featured ? 'bg-warning' : 'bg-secondary'}`}>
              {plan.featured ? 'Destaque' : 'Padrão'}
            </span>
          </div>
          <div className="mt-2">
            <small className="text-muted">
              Parcelas: até {plan.max_installments || 12}x
            </small>
          </div>
        </div>
        <div className="card-footer">
          <small className={`text-${plan.available_for_sale ? 'success' : 'danger'}`}>
            {plan.available_for_sale ? 'Disponível' : 'Indisponível'}
          </small>
        </div>
      </div>
    </div>
  );

  const renderModal = () => (
    <div className={`modal fade ${showCreateModal ? 'show' : ''}`} 
         style={{ display: showCreateModal ? 'block' : 'none' }}
         tabIndex="-1">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {editingPlan ? 'Editar Plano' : 'Criar Novo Plano'}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowCreateModal(false)}
            />
          </div>
          <div className="modal-body">
            {/* Tabs de Navegação */}
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'store' ? 'active' : ''}`}
                  onClick={() => setActiveTab('store')}
                >
                  <Icon icon="mdi:store" />
                  Configuração da Loja
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'payment' ? 'active' : ''}`}
                  onClick={() => setActiveTab('payment')}
                >
                  <Icon icon="mdi:credit-card" />
                  Condições de Pagamento
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'affiliation' ? 'active' : ''}`}
                  onClick={() => setActiveTab('affiliation')}
                >
                  <Icon icon="mdi:account-group" />
                  Afiliação
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'files' ? 'active' : ''}`}
                  onClick={() => setActiveTab('files')}
                >
                  <Icon icon="mdi:file-document" />
                  Arquivos e Ebooks
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'terms' ? 'active' : ''}`}
                  onClick={() => setActiveTab('terms')}
                >
                  <Icon icon="mdi:file-document-edit" />
                  Termos
                </button>
              </li>
            </ul>

            {/* Conteúdo das Tabs */}
            <div className="tab-content">
              {/* Configuração da Loja */}
              {activeTab === 'store' && (
                <div className="tab-pane active">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Nome do Plano *</label>
                        <input
                          type="text"
                          className={`form-control ${getFieldError('name') ? 'is-invalid' : isFieldValid('name') ? 'is-valid' : ''}`}
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Ex: Plano Básico"
                        />
                        {getFieldError('name') && (
                          <div className="invalid-feedback">{getFieldError('name')}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Preço *</label>
                        <input
                          type="text"
                          className={`form-control ${getFieldError('price') ? 'is-invalid' : isFieldValid('price') ? 'is-valid' : ''}`}
                          value={formData.price}
                          onChange={(e) => handleInputChange('price', handleCurrencyInput(e.target.value))}
                          placeholder="0,00"
                        />
                        {getFieldError('price') && (
                          <div className="invalid-feedback">{getFieldError('price')}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Preço Original</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.original_price}
                          onChange={(e) => handleInputChange('original_price', handleCurrencyInput(e.target.value))}
                          placeholder="0,00"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Descrição</label>
                        <textarea
                          className="form-control"
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          rows="3"
                          placeholder="Descreva os benefícios do plano..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={formData.featured}
                            onChange={(e) => handleInputChange('featured', e.target.checked)}
                          />
                          <label className="form-check-label">Plano em Destaque</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={formData.available_for_sale}
                            onChange={(e) => handleInputChange('available_for_sale', e.target.checked)}
                          />
                          <label className="form-check-label">Disponível para Venda</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Condições de Pagamento */}
              {activeTab === 'payment' && (
                <div className="tab-pane active">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Máximo de Parcelas</label>
                        <input
                          type="number"
                          className="form-control"
                          value={formData.max_installments}
                          onChange={(e) => handleInputChange('max_installments', e.target.value)}
                          min="1"
                          max="24"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Parcelas sem Juros</label>
                        <input
                          type="number"
                          className="form-control"
                          value={formData.max_installments_no_interest}
                          onChange={(e) => handleInputChange('max_installments_no_interest', e.target.value)}
                          min="1"
                          max="12"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Tipo de Cobrança</label>
                        <select
                          className="form-select"
                          value={formData.billing_type}
                          onChange={(e) => handleInputChange('billing_type', e.target.value)}
                        >
                          <option value="single">Pagamento Único</option>
                          <option value="recurring">Recorrente</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={formData.payment_discount_enabled}
                            onChange={(e) => handleInputChange('payment_discount_enabled', e.target.checked)}
                          />
                          <label className="form-check-label">Habilitar Desconto no Pagamento</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={formData.boleto_installments_enabled}
                            onChange={(e) => handleInputChange('boleto_installments_enabled', e.target.checked)}
                          />
                          <label className="form-check-label">Parcelamento no Boleto</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={formData.boleto_notification_enabled}
                            onChange={(e) => handleInputChange('boleto_notification_enabled', e.target.checked)}
                          />
                          <label className="form-check-label">Notificação de Boleto</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Afiliação */}
              {activeTab === 'affiliation' && (
                <div className="tab-pane active">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Taxa de Comissão (%)</label>
                        <input
                          type="number"
                          className="form-control"
                          value={formData.affiliate_commission.value}
                          onChange={(e) => handleAffiliateCommissionChange('value', e.target.value)}
                          min="0"
                          max="100"
                          step="0.01"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={formData.custom_commission_enabled}
                            onChange={(e) => handleInputChange('custom_commission_enabled', e.target.checked)}
                          />
                          <label className="form-check-label">Comissão Personalizada</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={formData.hide_from_affiliates}
                            onChange={(e) => handleInputChange('hide_from_affiliates', e.target.checked)}
                          />
                          <label className="form-check-label">Ocultar dos Afiliados</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={formData.watermark_enabled}
                            onChange={(e) => handleInputChange('watermark_enabled', e.target.checked)}
                          />
                          <label className="form-check-label">Habilitar Watermark</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Arquivos e Ebooks */}
              {activeTab === 'files' && (
                <div className="tab-pane active">
                  <div className="mb-3">
                    <label className="form-label">Arquivos do Plano</label>
                    <EnhancedFileUpload
                      onFileUpload={handleFileUpload}
                      onFileRemove={handleFileRemove}
                      files={formData.files}
                      accept=".pdf,.doc,.docx,.zip,.rar"
                      maxFiles={10}
                    />
                  </div>
                </div>
              )}

              {/* Termos */}
              {activeTab === 'terms' && (
                <div className="tab-pane active">
                  <div className="mb-3">
                    <label className="form-label">Termos e Condições</label>
                    <textarea
                      className="form-control"
                      value={formData.terms_conditions}
                      onChange={(e) => handleInputChange('terms_conditions', e.target.value)}
                      rows="8"
                      placeholder="Digite os termos e condições específicos deste plano..."
                    />
                  </div>
                </div>
              )}
            </div>
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
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Salvando...
                </>
              ) : (
                editingPlan ? 'Atualizar Plano' : 'Criar Plano'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`product-plans-manager ${className}`}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-1">Planos do Produto</h4>
          <p className="text-muted mb-0">
            Gerencie os planos e ofertas disponíveis para este produto
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleCreatePlan}
        >
          <Icon icon="mdi:plus" />
          Criar Novo Plano
        </button>
      </div>

      {/* Lista de Planos */}
      {plans.length === 0 ? (
        <div className="text-center py-5">
          <Icon icon="mdi:package-variant" size="3rem" className="text-muted mb-3" />
          <h5 className="text-muted">Nenhum plano criado</h5>
          <p className="text-muted">
            Crie o primeiro plano para este produto
          </p>
          <button
            className="btn btn-primary"
            onClick={handleCreatePlan}
          >
            <Icon icon="mdi:plus" />
            Criar Primeiro Plano
          </button>
        </div>
      ) : (
        <div className="row">
          {plans.map(renderPlanCard)}
        </div>
      )}

      {/* Modal */}
      {renderModal()}
    </div>
  );
};

export default ProductPlansManager; 