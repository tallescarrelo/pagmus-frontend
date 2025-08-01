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
    is_featured: false,
    is_active: true,
    files: [],
    order_bump: {
      enabled: false,
      title: '',
      description: '',
      price: '',
      original_price: ''
    },
    terms_conditions: '',
    affiliate_commission: {
      type: 'percentage',
      value: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleOrderBumpChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      order_bump: { ...prev.order_bump, [field]: value }
    }));
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
    if (formData.max_installments && (formData.max_installments < 1 || formData.max_installments > 12)) {
      planErrors.max_installments = 'Parcelas devem ser entre 1 e 12';
    }
    if (formData.affiliate_commission.value && !formData.affiliate_commission.value) {
      planErrors.affiliate_commission_value = 'Valor da comissão é obrigatório';
    }
    
    setErrors(planErrors);
    return Object.keys(planErrors).length === 0;
  };

  const handleCreatePlan = () => {
    setEditingPlan(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      original_price: '',
      max_installments: '',
      max_installments_no_interest: '',
      is_featured: false,
      is_active: true,
      files: [],
      order_bump: {
        enabled: false,
        title: '',
        description: '',
        price: '',
        original_price: ''
      },
      terms_conditions: '',
      affiliate_commission: {
        type: 'percentage',
        value: ''
      }
    });
    setErrors({});
    setTouched({});
    setShowCreateModal(true);
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name || '',
      description: plan.description || '',
      price: plan.price || '',
      original_price: plan.original_price || '',
      max_installments: plan.max_installments || '',
      max_installments_no_interest: plan.max_installments_no_interest || '',
      is_featured: plan.is_featured || false,
      is_active: plan.is_active !== undefined ? plan.is_active : true,
      files: plan.files || [],
      order_bump: plan.order_bump || {
        enabled: false,
        title: '',
        description: '',
        price: '',
        original_price: ''
      },
      terms_conditions: plan.terms_conditions || '',
      affiliate_commission: plan.affiliate_commission || {
        type: 'percentage',
        value: ''
      }
    });
    setErrors({});
    setTouched({});
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
        ...formData,
        id: editingPlan ? editingPlan.id : Date.now(),
        product_id: productId,
        created_at: editingPlan ? editingPlan.created_at : new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      let updatedPlans;
      if (editingPlan) {
        // Editar plano existente
        updatedPlans = plans.map(plan => 
          plan.id === editingPlan.id ? planData : plan
        );
      } else {
        // Criar novo plano
        updatedPlans = [...plans, planData];
      }

      await onPlansUpdate(updatedPlans);
      setShowCreateModal(false);
      setEditingPlan(null);
      
    } catch (error) {
      console.error('Erro ao salvar plano:', error);
      setErrors({ submit: 'Erro ao salvar plano. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName) => {
    return touched[fieldName] && errors[fieldName];
  };

  const isFieldValid = (fieldName) => {
    return touched[fieldName] && !errors[fieldName] && formData[fieldName];
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return value;
    return numericValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handleCurrencyInput = (value) => {
    const numericValue = value.replace(/[^\d,]/g, '').replace(',', '.');
    const floatValue = parseFloat(numericValue);
    
    if (!isNaN(floatValue)) {
      return formatCurrency(floatValue);
    }
    return value;
  };

  const renderPlanCard = (plan) => (
    <div key={plan.id} className="plan-card">
      <div className="plan-header">
        <div className="plan-info">
          <h5 className="plan-name">{plan.name}</h5>
          <div className="plan-price">
            <span className="current-price">{formatCurrency(plan.price)}</span>
            {plan.original_price && plan.original_price > plan.price && (
              <span className="original-price">{formatCurrency(plan.original_price)}</span>
            )}
          </div>
        </div>
        <div className="plan-actions">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => handleEditPlan(plan)}
          >
            <Icon icon="mdi:pencil" />
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => handleDeletePlan(plan.id)}
          >
            <Icon icon="mdi:delete" />
          </button>
        </div>
      </div>
      
      <div className="plan-details">
        {plan.description && (
          <p className="plan-description">{plan.description}</p>
        )}
        
        <div className="plan-features">
          {plan.max_installments && (
            <span className="feature">
              <Icon icon="mdi:credit-card" />
              Até {plan.max_installments}x
            </span>
          )}
          
          {plan.is_featured && (
            <span className="feature featured">
              <Icon icon="mdi:star" />
              Destaque
            </span>
          )}
          
          <span className={`feature status ${plan.is_active ? 'active' : 'inactive'}`}>
            <Icon icon={plan.is_active ? "mdi:check-circle" : "mdi:cancel"} />
            {plan.is_active ? 'Ativo' : 'Inativo'}
          </span>
        </div>
      </div>
    </div>
  );

  const renderModal = () => (
    <div className={`plan-modal ${showCreateModal ? 'show' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">
            <Icon icon="mdi:package-variant" />
            {editingPlan ? 'Editar Plano' : 'Novo Plano'}
          </h4>
          <button
            className="btn-close"
            onClick={() => setShowCreateModal(false)}
          >
            <Icon icon="mdi:close" />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="form-section">
            <h5 className="section-title">Informações Básicas</h5>
            
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">
                    Nome do Plano *
                    {isFieldValid('name') && (
                      <Icon icon="mdi:check-circle" className="valid-icon" />
                    )}
                  </label>
                  <input
                    type="text"
                    className={`form-control ${getFieldError('name') ? 'is-invalid' : ''} ${isFieldValid('name') ? 'is-valid' : ''}`}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Digite o nome do plano"
                  />
                  {getFieldError('name') && (
                    <div className="invalid-feedback">{getFieldError('name')}</div>
                  )}
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">
                    Preço *
                    {isFieldValid('price') && (
                      <Icon icon="mdi:check-circle" className="valid-icon" />
                    )}
                  </label>
                  <input
                    type="text"
                    className={`form-control ${getFieldError('price') ? 'is-invalid' : ''} ${isFieldValid('price') ? 'is-valid' : ''}`}
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', handleCurrencyInput(e.target.value))}
                    placeholder="R$ 0,00"
                  />
                  {getFieldError('price') && (
                    <div className="invalid-feedback">{getFieldError('price')}</div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Descrição</label>
              <textarea
                className="form-control"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Descreva os benefícios do plano"
                rows={3}
              />
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Preço Original</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.original_price}
                    onChange={(e) => handleInputChange('original_price', handleCurrencyInput(e.target.value))}
                    placeholder="R$ 0,00"
                  />
                  <div className="form-text">
                    Preço riscado para mostrar desconto
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Máximo de Parcelas</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.max_installments}
                    onChange={(e) => handleInputChange('max_installments', e.target.value)}
                    placeholder="12"
                    min="1"
                    max="12"
                  />
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="is_featured"
                  checked={formData.is_featured}
                  onChange={(e) => handleInputChange('is_featured', e.target.checked)}
                />
                <label className="form-check-label" htmlFor="is_featured">
                  Plano em destaque
                </label>
              </div>
            </div>
            
            <div className="form-group">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => handleInputChange('is_active', e.target.checked)}
                />
                <label className="form-check-label" htmlFor="is_active">
                  Plano ativo
                </label>
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h5 className="section-title">Order Bump</h5>
            
            <div className="form-group">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="order_bump_enabled"
                  checked={formData.order_bump.enabled}
                  onChange={(e) => handleOrderBumpChange('enabled', e.target.checked)}
                />
                <label className="form-check-label" htmlFor="order_bump_enabled">
                  Ativar Order Bump
                </label>
              </div>
            </div>
            
            {formData.order_bump.enabled && (
              <div className="order-bump-fields">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Título do Order Bump</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.order_bump.title}
                        onChange={(e) => handleOrderBumpChange('title', e.target.value)}
                        placeholder="Título do produto adicional"
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Preço do Order Bump</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.order_bump.price}
                        onChange={(e) => handleOrderBumpChange('price', handleCurrencyInput(e.target.value))}
                        placeholder="R$ 0,00"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Descrição do Order Bump</label>
                  <textarea
                    className="form-control"
                    value={formData.order_bump.description}
                    onChange={(e) => handleOrderBumpChange('description', e.target.value)}
                    placeholder="Descrição do produto adicional"
                    rows={2}
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="form-section">
            <h5 className="section-title">Comissionamento de Afiliados</h5>
            
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Tipo de Comissão</label>
                  <select
                    className="form-control"
                    value={formData.affiliate_commission.type}
                    onChange={(e) => handleAffiliateCommissionChange('type', e.target.value)}
                  >
                    <option value="percentage">Porcentagem (%)</option>
                    <option value="fixed">Valor Fixo (R$)</option>
                  </select>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Valor da Comissão</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.affiliate_commission.value}
                    onChange={(e) => handleAffiliateCommissionChange('value', e.target.value)}
                    placeholder={formData.affiliate_commission.type === 'percentage' ? '25' : 'R$ 50,00'}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h5 className="section-title">Arquivos do Plano</h5>
            
            <EnhancedFileUpload
              onFileUpload={handleFileUpload}
              onFileRemove={handleFileRemove}
              accept="image/*,.pdf,.doc,.docx,.zip,.rar"
              maxSize={50 * 1024 * 1024}
              maxFiles={10}
              multiple={true}
              showPreview={true}
            />
          </div>
          
          <div className="form-section">
            <h5 className="section-title">Termos e Condições</h5>
            
            <div className="form-group">
              <textarea
                className="form-control"
                value={formData.terms_conditions}
                onChange={(e) => handleInputChange('terms_conditions', e.target.value)}
                placeholder="Termos e condições específicos deste plano"
                rows={4}
              />
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowCreateModal(false)}
            disabled={isSubmitting}
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
                <Icon icon="mdi:loading" className="spinning" />
                Salvando...
              </>
            ) : (
              <>
                <Icon icon="mdi:content-save" />
                {editingPlan ? 'Atualizar' : 'Criar'} Plano
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`product-plans-manager ${className}`}>
      <div className="plans-header">
        <div className="plans-title">
          <h4>
            <Icon icon="mdi:package-variant" />
            Planos do Produto
          </h4>
          <p className="text-muted">
            Gerencie os planos e ofertas do seu produto
          </p>
        </div>
        
        <button
          className="btn btn-primary"
          onClick={handleCreatePlan}
        >
          <Icon icon="mdi:plus" />
          Novo Plano
        </button>
      </div>
      
      <div className="plans-grid">
        {plans.length === 0 ? (
          <div className="empty-state">
            <Icon icon="mdi:package-variant-outline" className="empty-icon" />
            <h5>Nenhum plano criado</h5>
            <p>Clique em "Novo Plano" para criar o primeiro plano do seu produto.</p>
          </div>
        ) : (
          plans.map(renderPlanCard)
        )}
      </div>
      
      {renderModal()}
    </div>
  );
};

export default ProductPlansManager; 